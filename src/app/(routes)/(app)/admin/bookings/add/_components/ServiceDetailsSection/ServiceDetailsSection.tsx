import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import CounterControl from "../../../../_components/UI/CounterControl/CounterControl";
import RadioGroup from "../../../../_components/UI/RadioGroup/RadioGroup";
import {
  Service,
  ServiceId,
  HouseType,
  RoomQuantitiesInput,
  Severity,
  TreatmentType,
} from "@/graphql/api";
import styles from "./ServiceDetailsSection.module.scss";

interface ServiceDetailsSectionProps {
  selectedService: Service | undefined;
  propertyType: HouseType;
  roomQuantities: RoomQuantitiesInput;
  laundryBags: number;
  severity: Severity;
  treatmentType: TreatmentType;
  onPropertyTypeChange: (type: HouseType) => void;
  onRoomQuantityChange: (
    room: keyof RoomQuantitiesInput,
    increment: boolean
  ) => void;
  onLaundryBagsChange: (bags: number) => void;
  onSeverityChange: (severity: Severity) => void;
  onTreatmentTypeChange: (type: TreatmentType) => void;
}

const ServiceDetailsSection: React.FC<ServiceDetailsSectionProps> = ({
  selectedService,
  propertyType,
  roomQuantities,
  laundryBags,
  severity,
  treatmentType,
  onPropertyTypeChange,
  onRoomQuantityChange,
  onLaundryBagsChange,
  onSeverityChange,
  onTreatmentTypeChange,
}) => {
  if (!selectedService) return null;

  const propertyTypeOptions = [
    { value: HouseType.Flat, label: "Flat / Apartment" },
    { value: HouseType.Duplex, label: "Duplex / House" },
  ];

  const severityOptions = [
    { value: Severity.Low, label: "Low" },
    { value: Severity.Medium, label: "Medium" },
    { value: Severity.High, label: "High" },
  ];

  const treatmentTypeOptions = [
    { value: TreatmentType.PestControlResidential, label: "Residential" },
    { value: TreatmentType.PestControlCommercial, label: "Commercial" },
  ];

  const roomLabels: Record<keyof RoomQuantitiesInput, string> = {
    balcony: "Balcony",
    bathroom: "Bathroom",
    bedroom: "Bedroom",
    kitchen: "Kitchen",
    livingRoom: "Living Room",
    lobby: "Lobby",
    other: "Other",
    outdoor: "Outdoor",
    studyRoom: "Study Room",
  };

  return (
    <Card className={styles.service_details}>
      <h3 className={styles.service_details__title}>
        <Icon name="settings" />
        Service Details
      </h3>

      {/* Cleaning Details */}
      {selectedService.service_id === ServiceId.Cleaning && (
        <>
          <div className={styles.service_details__field}>
            <label className={styles.service_details__label}>
              Property Type
            </label>
            <RadioGroup
              name="propertyType"
              options={propertyTypeOptions}
              value={propertyType}
              onChange={(value) => onPropertyTypeChange(value as HouseType)}
            />
          </div>

          <div className={styles.service_details__field}>
            <label className={styles.service_details__label}>
              Rooms to Clean
            </label>
            <div className={styles.service_details__counter_grid}>
              {Object.entries(roomQuantities).map(([room, quantity]) => (
                <CounterControl
                  key={room}
                  label={roomLabels[room as keyof RoomQuantitiesInput]}
                  value={quantity as number}
                  onIncrement={() =>
                    onRoomQuantityChange(
                      room as keyof RoomQuantitiesInput,
                      true
                    )
                  }
                  onDecrement={() =>
                    onRoomQuantityChange(
                      room as keyof RoomQuantitiesInput,
                      false
                    )
                  }
                  className={styles.service_details__counter}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Laundry Details */}
      {selectedService.service_id === ServiceId.Laundry && (
        <div className={styles.service_details__field}>
          <label className={styles.service_details__label}>
            Number of Laundry Bags
          </label>
          <CounterControl
            label="Bags (approx. 30 items each)"
            value={laundryBags}
            min={1}
            onIncrement={() => onLaundryBagsChange(laundryBags + 1)}
            onDecrement={() =>
              onLaundryBagsChange(Math.max(1, laundryBags - 1))
            }
            className={styles.service_details__counter}
          />
        </div>
      )}

      {/* Pest Control Details */}
      {(selectedService.service_id === ServiceId.PestControl ||
        selectedService.service_id === ServiceId.PestControlResidential ||
        selectedService.service_id === ServiceId.PestControlCommercial) && (
        <>
          <div className={styles.service_details__field}>
            <label className={styles.service_details__label}>
              Severity Level
            </label>
            <RadioGroup
              name="severity"
              options={severityOptions}
              value={severity}
              onChange={(value) => onSeverityChange(value as Severity)}
            />
          </div>

          <div className={styles.service_details__field}>
            <label className={styles.service_details__label}>
              Treatment Type
            </label>
            <RadioGroup
              name="treatmentType"
              options={treatmentTypeOptions}
              value={treatmentType}
              onChange={(value) =>
                onTreatmentTypeChange(value as TreatmentType)
              }
            />
          </div>
        </>
      )}
    </Card>
  );
};

export default ServiceDetailsSection;
