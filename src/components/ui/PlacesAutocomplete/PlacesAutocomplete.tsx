"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, Loader2 } from "lucide-react";
import styles from "./PlacesAutocomplete.module.scss";

// --- CUSTOM DEBOUNCE HOOK ---
// This ensures we only call the API when the user STOPS typing for 300ms
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface PlacesAutocompleteProps {
  onSelect: (
    address: string,
    coordinates: { lat: number; lng: number }
  ) => void;
  onChange?: (address: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}

export const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onSelect,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Enter your address",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [sessionToken, setSessionToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Use the debounce hook - this is the value that triggers the API
  const debouncedSearchTerm = useDebounce(inputValue, 400);

  // Generate a fresh session token on mount
  useEffect(() => {
    setSessionToken(crypto.randomUUID());
  }, []);

  // Effect: Trigger API ONLY when debounced value changes
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSuggestions([]);
      return;
    }

    // Only search if user hasn't selected an item yet (prevents researching after clicking)
    if (!isOpen) return;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          "https://places.googleapis.com/v1/places:autocomplete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            },
            body: JSON.stringify({
              input: debouncedSearchTerm,
              sessionToken, // ⚡️ SAVES COST: Groups typing into one billable event
              locationBias: {
                circle: {
                  center: { latitude: 6.5244, longitude: 3.3792 }, // Bias to Lagos
                  radius: 50000, // 50km
                },
              },
              // Restrict results to Nigeria only
              includedRegionCodes: ["ng"],
            }),
          }
        );
        const data = await response.json();
        console.log("data from suggestions", data);
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm, sessionToken]); // Dependencies

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
    setIsOpen(true); // Re-open dropdown when typing
  };

  const handleSelect = async (suggestion: any) => {
    const placeId = suggestion.placePrediction.placeId;
    const mainText = suggestion.placePrediction.text.text;

    // UI Updates
    setInputValue(mainText);
    setSuggestions([]);
    setIsOpen(false); // Close dropdown
    setLoading(true);

    try {
      // ⚡️ BILLABLE EVENT: This is the only part you pay for (~$0.017)
      // We explicitly fetch only 'location' and 'formattedAddress' to keep it "Basic" tier
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?fields=location,formattedAddress`,
        {
          headers: {
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            "X-Goog-FieldMask": "location,formattedAddress",
          },
        }
      );
      const data = await response.json();
      console.log("data from place details", data);
      if (data.location) {
        onSelect(data.formattedAddress, {
          lat: data.location.latitude,
          lng: data.location.longitude,
        });
      }

      // ⚡️ CRITICAL: Reset Token after selection to start a fresh "free" session
      setSessionToken(crypto.randomUUID());
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["places-autocomplete"]}>
      <div className={styles["places-autocomplete__input-wrapper"]}>
        <Search
          size={18}
          className={styles["places-autocomplete__search-icon"]}
        />
        <input
          type="text"
          className={styles["places-autocomplete__input"]}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            onFocus?.();
          }}
          onBlur={() => {
            // Delay blur to allow clicking on suggestions
            setTimeout(() => {
              setIsOpen(false);
              onBlur?.();
            }, 200);
          }}
        />
        {loading && (
          <Loader2
            size={16}
            className={styles["places-autocomplete__loader"]}
          />
        )}
        {inputValue && !loading && (
          <button
            type="button"
            onClick={() => {
              setInputValue("");
              setSuggestions([]);
              setIsOpen(false);
            }}
            className={styles["places-autocomplete__clear-btn"]}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className={styles["places-autocomplete__suggestions"]}>
          {suggestions.map((suggestion: any) => (
            <li
              key={suggestion.placePrediction.placeId}
              onClick={() => handleSelect(suggestion)}
              className={styles["places-autocomplete__suggestion-item"]}
            >
              <div className={styles["places-autocomplete__icon-wrapper"]}>
                <MapPin size={16} />
              </div>
              <div className={styles["places-autocomplete__text-wrapper"]}>
                <span className={styles["places-autocomplete__main-text"]}>
                  {suggestion.placePrediction.structuredFormat.mainText.text}
                </span>
                <span className={styles["places-autocomplete__secondary-text"]}>
                  {
                    suggestion.placePrediction.structuredFormat.secondaryText
                      ?.text
                  }
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
