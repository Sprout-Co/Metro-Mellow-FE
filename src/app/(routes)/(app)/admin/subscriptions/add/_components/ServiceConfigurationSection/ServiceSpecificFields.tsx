import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import {
  ServiceCategory,
  HouseType,
  RoomQuantitiesInput,
  LaundryType,
  LaundryItemsInput,
  Severity,
  TreatmentType,
  MealType,
  MealDeliveryInput,
  ScheduleDays,
  CleaningType,
} from "@/graphql/api";
import { ServiceConfiguration } from "@/app/(routes)/(app)/admin/subscriptions/add/types/subscription";
import { formatToNaira } from "@/utils/string";
import styles from "./ServiceConfigurationSection.module.scss";

interface ServiceSpecificFieldsProps {
  serviceCategory: ServiceCategory;
  config: ServiceConfiguration;
  onConfigurationUpdate: (
    serviceId: string,
    config: Partial<ServiceConfiguration>
  ) => void;
  serviceId: string;
}

const ServiceSpecificFields: React.FC<ServiceSpecificFieldsProps> = ({
  serviceCategory,
  config,
  onConfigurationUpdate,
  serviceId,
}) => {
  // Room labels for cleaning services
  const roomLabels: Record<keyof RoomQuantitiesInput, string> = {
    bedroom: "Bedroom",
    livingRoom: "Living Room",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
    balcony: "Balcony",
    studyRoom: "Study Room",
    lobby: "Lobby",
    outdoor: "Outdoor",
    other: "Other",
  };

  // Update room quantity
  const updateRoomQuantity = (
    room: keyof RoomQuantitiesInput,
    increment: boolean
  ) => {
    const currentQuantities = config.cleaning?.rooms || {
      balcony: 0,
      bathroom: 1,
      bedroom: 1,
      kitchen: 1,
      livingRoom: 1,
      lobby: 1,
      other: 0,
      outdoor: 0,
      studyRoom: 0,
    };

    const updatedQuantities = {
      ...currentQuantities,
      [room]: Math.max(0, currentQuantities[room] + (increment ? 1 : -1)),
    };

    onConfigurationUpdate(serviceId, {
      cleaning: {
        cleaningType:
          config.cleaning?.cleaningType || CleaningType.StandardCleaning,
        houseType: config.cleaning?.houseType || HouseType.Flat,
        rooms: updatedQuantities,
      },
    });
  };

  // Update laundry bags
  const updateLaundryBags = (increment: boolean) => {
    const currentBags = config.laundry?.bags || 1;
    const newBags = Math.max(1, currentBags + (increment ? 1 : -1));

    onConfigurationUpdate(serviceId, {
      laundry: {
        bags: newBags,
        laundryType: config.laundry?.laundryType || LaundryType.StandardLaundry,
        items: config.laundry?.items,
      },
    });
  };

  // Update laundry items
  const updateLaundryItems = (
    itemType: keyof LaundryItemsInput,
    increment: boolean
  ) => {
    const currentItems = config.laundry?.items || {
      shirts: 0,
      pants: 0,
      dresses: 0,
      suits: 0,
      others: 0,
    };

    const updatedItems = {
      ...currentItems,
      [itemType]: Math.max(0, currentItems[itemType] + (increment ? 1 : -1)),
    };

    onConfigurationUpdate(serviceId, {
      laundry: {
        bags: config.laundry?.bags || 1,
        laundryType: config.laundry?.laundryType || LaundryType.StandardLaundry,
        items: updatedItems,
      },
    });
  };

  // Update pest control areas
  const updatePestControlAreas = (area: string, checked: boolean) => {
    const currentAreas = config.pestControl?.areas || [];
    const updatedAreas = checked
      ? [...currentAreas, area]
      : currentAreas.filter((a) => a !== area);

    onConfigurationUpdate(serviceId, {
      pestControl: {
        areas: updatedAreas,
        severity: config.pestControl?.severity || Severity.Medium,
        treatmentType:
          config.pestControl?.treatmentType || TreatmentType.Residential,
      },
    });
  };

  // Update cooking meal deliveries
  const updateMealDeliveries = (day: ScheduleDays, count: number) => {
    const currentDeliveries = config.cooking?.mealsPerDelivery || [];
    const existingIndex = currentDeliveries.findIndex((d) => d.day === day);

    let updatedDeliveries;
    if (count === 0) {
      // Remove delivery for this day
      updatedDeliveries = currentDeliveries.filter((d) => d.day !== day);
    } else if (existingIndex >= 0) {
      // Update existing delivery
      updatedDeliveries = [...currentDeliveries];
      updatedDeliveries[existingIndex] = { day, count };
    } else {
      // Add new delivery
      updatedDeliveries = [...currentDeliveries, { day, count }];
    }

    onConfigurationUpdate(serviceId, {
      cooking: {
        mealType: config.cooking?.mealType || MealType.Standard,
        mealsPerDelivery: updatedDeliveries,
      },
    });
  };

  // Render cleaning-specific fields
  const renderCleaningFields = () => (
    <div className={styles.service_configuration__specific_fields}>
      <div className={styles.service_configuration__field}>
        <label>Property Type</label>
        <select
          value={config.cleaning?.houseType || HouseType.Flat}
          onChange={(e) =>
            onConfigurationUpdate(serviceId, {
              cleaning: {
                cleaningType:
                  config.cleaning?.cleaningType ||
                  CleaningType.StandardCleaning,
                houseType: e.target.value as HouseType,
                rooms: config.cleaning?.rooms || {
                  balcony: 0,
                  bathroom: 1,
                  bedroom: 1,
                  kitchen: 1,
                  livingRoom: 1,
                  lobby: 1,
                  other: 0,
                  outdoor: 0,
                  studyRoom: 0,
                },
              },
            })
          }
          className={styles.service_configuration__select}
        >
          <option value={HouseType.Flat}>Flat/Apartment</option>
          <option value={HouseType.Duplex}>Duplex</option>
        </select>
      </div>

      <div className={styles.service_configuration__field}>
        <label>Room Quantities</label>
        <div className={styles.service_configuration__rooms_grid}>
          {Object.entries(roomLabels).map(([room, label]) => (
            <div key={room} className={styles.service_configuration__room_item}>
              <span className={styles.service_configuration__room_label}>
                {label}
              </span>
              <div className={styles.service_configuration__room_controls}>
                <button
                  type="button"
                  onClick={() =>
                    updateRoomQuantity(room as keyof RoomQuantitiesInput, false)
                  }
                  className={styles.service_configuration__quantity_btn}
                >
                  <Icon name="minus" size={16} />
                </button>
                <span
                  className={styles.service_configuration__quantity_display}
                >
                  {config.cleaning?.rooms?.[
                    room as keyof RoomQuantitiesInput
                  ] || 0}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateRoomQuantity(room as keyof RoomQuantitiesInput, true)
                  }
                  className={styles.service_configuration__quantity_btn}
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render laundry-specific fields
  const renderLaundryFields = () => (
    <div className={styles.service_configuration__specific_fields}>
      <div className={styles.service_configuration__field}>
        <label>Laundry Type</label>
        <select
          value={config.laundry?.laundryType || LaundryType.StandardLaundry}
          onChange={(e) =>
            onConfigurationUpdate(serviceId, {
              laundry: {
                bags: config.laundry?.bags || 1,
                laundryType: e.target.value as LaundryType,
                items: config.laundry?.items,
              },
            })
          }
          className={styles.service_configuration__select}
        >
          <option value={LaundryType.StandardLaundry}>Wash & Fold</option>
          <option value={LaundryType.PremiumLaundry}>Wash & Iron</option>
          <option value={LaundryType.DryCleaning}>Dry Cleaning</option>
        </select>
      </div>

      <div className={styles.service_configuration__field}>
        <label>Number of Bags</label>
        <div className={styles.service_configuration__bags_control}>
          <button
            type="button"
            onClick={() => updateLaundryBags(false)}
            className={styles.service_configuration__quantity_btn}
          >
            <Icon name="minus" size={16} />
          </button>
          <span className={styles.service_configuration__quantity_display}>
            {config.laundry?.bags || 1}
          </span>
          <button
            type="button"
            onClick={() => updateLaundryBags(true)}
            className={styles.service_configuration__quantity_btn}
          >
            <Icon name="plus" size={16} />
          </button>
        </div>
      </div>

      <div className={styles.service_configuration__field}>
        <label>Item Breakdown (Optional)</label>
        <div className={styles.service_configuration__items_grid}>
          {[
            { key: "shirts", label: "Shirts" },
            { key: "pants", label: "Pants" },
            { key: "dresses", label: "Dresses" },
            { key: "suits", label: "Suits" },
            { key: "others", label: "Others" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className={styles.service_configuration__item_control}
            >
              <span className={styles.service_configuration__item_label}>
                {label}
              </span>
              <div className={styles.service_configuration__item_controls}>
                <button
                  type="button"
                  onClick={() =>
                    updateLaundryItems(key as keyof LaundryItemsInput, false)
                  }
                  className={styles.service_configuration__quantity_btn}
                >
                  <Icon name="minus" size={16} />
                </button>
                <span
                  className={styles.service_configuration__quantity_display}
                >
                  {config.laundry?.items?.[key as keyof LaundryItemsInput] || 0}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateLaundryItems(key as keyof LaundryItemsInput, true)
                  }
                  className={styles.service_configuration__quantity_btn}
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render pest control-specific fields
  const renderPestControlFields = () => (
    <div className={styles.service_configuration__specific_fields}>
      <div className={styles.service_configuration__field}>
        <label>Infestation Severity</label>
        <select
          value={config.pestControl?.severity || Severity.Medium}
          onChange={(e) =>
            onConfigurationUpdate(serviceId, {
              pestControl: {
                areas: config.pestControl?.areas || [],
                severity: e.target.value as Severity,
                treatmentType:
                  config.pestControl?.treatmentType ||
                  TreatmentType.Residential,
              },
            })
          }
          className={styles.service_configuration__select}
        >
          <option value={Severity.Low}>Low</option>
          <option value={Severity.Medium}>Medium</option>
          <option value={Severity.High}>High</option>
        </select>
      </div>

      <div className={styles.service_configuration__field}>
        <label>Treatment Type</label>
        <select
          value={config.pestControl?.treatmentType || TreatmentType.Residential}
          onChange={(e) =>
            onConfigurationUpdate(serviceId, {
              pestControl: {
                areas: config.pestControl?.areas || [],
                severity: config.pestControl?.severity || Severity.Medium,
                treatmentType: e.target.value as TreatmentType,
              },
            })
          }
          className={styles.service_configuration__select}
        >
          <option value={TreatmentType.Residential}>Residential</option>
          <option value={TreatmentType.Commercial}>Commercial</option>
        </select>
      </div>

      <div className={styles.service_configuration__field}>
        <label>Areas to Treat</label>
        <div className={styles.service_configuration__areas_grid}>
          {[
            "Living Room",
            "Kitchen",
            "Bathroom",
            "Bedroom",
            "Dining Room",
            "Study",
            "Balcony",
            "Garden",
          ].map((area) => (
            <label
              key={area}
              className={styles.service_configuration__area_checkbox}
            >
              <input
                type="checkbox"
                checked={config.pestControl?.areas?.includes(area) || false}
                onChange={(e) => updatePestControlAreas(area, e.target.checked)}
              />
              <span>{area}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Render cooking-specific fields
  const renderCookingFields = () => (
    <div className={styles.service_configuration__specific_fields}>
      <div className={styles.service_configuration__field}>
        <label>Meal Type</label>
        <select
          value={config.cooking?.mealType || MealType.Standard}
          onChange={(e) =>
            onConfigurationUpdate(serviceId, {
              cooking: {
                mealType: e.target.value as MealType,
                mealsPerDelivery: config.cooking?.mealsPerDelivery || [],
              },
            })
          }
          className={styles.service_configuration__select}
        >
          <option value={MealType.Basic}>Basic</option>
          <option value={MealType.Standard}>Standard</option>
        </select>
      </div>

      <div className={styles.service_configuration__field}>
        <label>Meals Per Day</label>
        <div className={styles.service_configuration__meals_grid}>
          {Object.values(ScheduleDays).map((day) => (
            <div key={day} className={styles.service_configuration__meal_day}>
              <span className={styles.service_configuration__day_label}>
                {day.charAt(0) + day.slice(1).toLowerCase()}
              </span>
              <div className={styles.service_configuration__meal_controls}>
                <button
                  type="button"
                  onClick={() =>
                    updateMealDeliveries(
                      day,
                      Math.max(
                        0,
                        (config.cooking?.mealsPerDelivery?.find(
                          (d) => d.day === day
                        )?.count || 0) - 1
                      )
                    )
                  }
                  className={styles.service_configuration__quantity_btn}
                >
                  <Icon name="minus" size={16} />
                </button>
                <span
                  className={styles.service_configuration__quantity_display}
                >
                  {config.cooking?.mealsPerDelivery?.find((d) => d.day === day)
                    ?.count || 0}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateMealDeliveries(
                      day,
                      (config.cooking?.mealsPerDelivery?.find(
                        (d) => d.day === day
                      )?.count || 0) + 1
                    )
                  }
                  className={styles.service_configuration__quantity_btn}
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render based on service category
  switch (serviceCategory) {
    case ServiceCategory.Cleaning:
      return renderCleaningFields();
    case ServiceCategory.Laundry:
      return renderLaundryFields();
    case ServiceCategory.PestControl:
      return renderPestControlFields();
    case ServiceCategory.Cooking:
      return renderCookingFields();
    default:
      return null;
  }
};

export default ServiceSpecificFields;
