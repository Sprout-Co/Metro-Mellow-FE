import React, { useState, useEffect } from 'react';
import styles from './ScheduleSelector.module.scss';

interface ScheduleSelectorProps {
  type: 'cleaning' | 'food' | 'laundry';
  frequency: number;
  days: string[];
  time?: string;
  onFrequencyChange: (frequency: number) => void;
  onDaysChange: (days: string[]) => void;
  onTimeChange?: (time: string) => void;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  type,
  frequency,
  days,
  time = '8am',
  onFrequencyChange,
  onDaysChange,
  onTimeChange
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(days);
  const [summary, setSummary] = useState<string>('');
  
  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];
  
  const timeOptions = [
    '8am',
    '12pm',
    '4pm'
  ];
  
  // Update summary text based on selections
  useEffect(() => {
    let text = '';
    
    if (type === 'cleaning') {
      text = `Your home will be cleaned every week on ${selectedDays[0]} at ${time}`;
    } else if (type === 'food') {
      text = `You will receive your food every week on ${selectedDays.join(',')}`;
    } else if (type === 'laundry') {
      text = `Your laundry will be picked up every week on ${selectedDays[0]}`;
    }
    
    setSummary(text);
  }, [type, selectedDays, time]);
  
  // Handle day selection
  const toggleDay = (day: string) => {
    if (type === 'cleaning' || type === 'laundry') {
      // Single day selection
      if (selectedDays.includes(day)) {
        return; // Don't allow deselecting the only day
      }
      setSelectedDays([day]);
      onDaysChange([day]);
    } else {
      // Multiple day selection (for food)
      let newDays = [...selectedDays];
      
      if (selectedDays.includes(day)) {
        // Check if we're trying to remove the last day
        if (selectedDays.length <= frequency) {
          return; // Don't allow removing if it would make less than the frequency
        }
        newDays = newDays.filter(d => d !== day);
      } else {
        // Add day if not exceeding frequency
        if (selectedDays.length < frequency) {
          newDays.push(day);
        } else {
          // Replace the first day if at limit
          newDays.shift();
          newDays.push(day);
        }
      }
      
      setSelectedDays(newDays);
      onDaysChange(newDays);
    }
  };
  
  // Handle frequency change
  const handleFrequencyChange = (change: number) => {
    const newFrequency = Math.max(1, frequency + change);
    onFrequencyChange(newFrequency);
    
    // Adjust selected days if needed
    if (type === 'food' && selectedDays.length > newFrequency) {
      const newDays = selectedDays.slice(0, newFrequency);
      setSelectedDays(newDays);
      onDaysChange(newDays);
    }
  };
  
  // Get prompt text
  const getPromptText = () => {
    switch (type) {
      case 'cleaning':
        return 'How many times a week do you want your house cleaned?';
      case 'food':
        return 'How many days a week do you want meals delivered?';
      case 'laundry':
        return 'How many days a week do you want us to pick up your laundry?';
      default:
        return 'Select frequency';
    }
  };
  
  return (
    <div className={styles.schedule}>
      <h3 className={styles.schedule__heading}>
        {getPromptText()}
      </h3>
      
      {/* Frequency Selector */}
      <div className={styles.schedule__frequency}>
        <button 
          className={styles.schedule__frequency_btn}
          onClick={() => handleFrequencyChange(-1)}
          disabled={frequency <= 1}
        >
          -
        </button>
        
        <span className={styles.schedule__frequency_value}>{frequency}</span>
        
        <button 
          className={styles.schedule__frequency_btn}
          onClick={() => handleFrequencyChange(1)}
          disabled={type !== 'food' && frequency >= 1}
        >
          +
        </button>
      </div>
      
      {/* Days Selection */}
      <div className={styles.schedule__days_section}>
        <h3 className={styles.schedule__subheading}>
          Select your {type === 'cleaning' ? 'cleaning' : type === 'food' ? 'delivery' : 'pickup'} days
          {type === 'food' && <span> {selectedDays.length} / {frequency}</span>}
          {(type === 'cleaning' || type === 'laundry') && <span> (pick just 1)</span>}
        </h3>
        
        <div className={styles.schedule__days}>
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={`${styles.schedule__day} ${selectedDays.includes(day) ? styles.schedule__day_selected : ''}`}
              onClick={() => toggleDay(day)}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Time Selector for Cleaning */}
      {type === 'cleaning' && onTimeChange && (
        <div className={styles.schedule__time_section}>
          <h3 className={styles.schedule__subheading}>
            Select your cleaning time
          </h3>
          
          <div className={styles.schedule__times}>
            {timeOptions.map((timeOption) => (
              <button
                key={timeOption}
                className={`${styles.schedule__time} ${time === timeOption ? styles.schedule__time_selected : ''}`}
                onClick={() => onTimeChange(timeOption)}
              >
                {timeOption}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Summary */}
      {summary && (
        <div className={styles.schedule__summary}>
          <span className={styles.schedule__summary_text}>{summary}</span>
          <button className={styles.schedule__summary_close}>×</button>
        </div>
      )}
    </div>
  );
};

export default ScheduleSelector;