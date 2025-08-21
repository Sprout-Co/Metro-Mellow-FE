import React from "react";
import { motion } from "framer-motion";
import { HouseType, CleaningType, SubscriptionServiceInput } from "@/graphql/api";
import styles from "../ServiceConfigDrawer.module.scss";

interface CleaningServiceConfigProps {
  configuration: SubscriptionServiceInput;
  onUpdate: (update: Partial<SubscriptionServiceInput>) => void;
}

const CleaningServiceConfig: React.FC<CleaningServiceConfigProps> = ({
  configuration,
  onUpdate,
}) => {
  const propertyTypes = [
    { value: HouseType.Flat, label: "Flat/Apartment", icon: "🏢" },
    { value: HouseType.Duplex, label: "Duplex/House", icon: "🏠" },
  ];

  const roomTypes = [
    { key: "bedroom", label: "Bedroom", icon: "🛏️" },
    { key: "livingRoom", label: "Living Room", icon: "🛋️" },
    { key: "bathroom", label: "Bathroom", icon: "🚿" },
    { key: "kitchen", label: "Kitchen", icon: "🍳" },
    { key: "balcony", label: "Balcony", icon: "🌿" },
    { key: "studyRoom", label: "Study Room", icon: "📚" },
  ];

  const updateRoomCount = (room: string, increment: boolean) => {
    const currentRooms = configuration.serviceDetails.cleaning?.rooms || {
      bedroom: 1,
      livingRoom: 1,
      bathroom: 1,
      kitchen: 1,
      balcony: 0,
      studyRoom: 0,
      lobby: 0,
      other: 0,
      outdoor: 0,
    };

    const newCount = Math.max(
      0,
      (currentRooms[room as keyof typeof currentRooms] || 0) + (increment ? 1 : -1)
    );

    onUpdate({
      serviceDetails: {
        ...configuration.serviceDetails,
        cleaning: {
          cleaningType: configuration.serviceDetails.cleaning?.cleaningType || CleaningType.StandardCleaning,
          houseType: configuration.serviceDetails.cleaning?.houseType || HouseType.Flat,
          rooms: {
            ...currentRooms,
            [room]: newCount,
          },
        },
      },
    });
  };

  return (
    <>
      {/* Property Type */}
      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Property Type</label>
        <div className={styles.drawer__propertyGrid}>
          {propertyTypes.map((type) => (
            <motion.button
              key={type.value}
              className={`${styles.drawer__propertyCard} ${
                configuration.serviceDetails.cleaning?.houseType === type.value
                  ? styles["drawer__propertyCard--active"]
                  : ""
              }`}
              onClick={() =>
                onUpdate({
                  serviceDetails: {
                    ...configuration.serviceDetails,
                    cleaning: {
                      ...configuration.serviceDetails.cleaning!,
                      houseType: type.value,
                    },
                  },
                })
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={styles.drawer__propertyIcon}>{type.icon}</span>
              <span>{type.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Room Configuration */}
      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Room Configuration</label>
        <div className={styles.drawer__roomsGrid}>
          {roomTypes.map((room) => (
            <div key={room.key} className={styles.drawer__roomCard}>
              <div className={styles.drawer__roomInfo}>
                <span className={styles.drawer__roomIcon}>{room.icon}</span>
                <span className={styles.drawer__roomLabel}>{room.label}</span>
              </div>
              <div className={styles.drawer__roomCounter}>
                <button
                  onClick={() => updateRoomCount(room.key, false)}
                  disabled={
                    !configuration.serviceDetails.cleaning?.rooms?.[
                      room.key as keyof typeof configuration.serviceDetails.cleaning.rooms
                    ]
                  }
                >
                  −
                </button>
                <span>
                  {configuration.serviceDetails.cleaning?.rooms?.[
                    room.key as keyof typeof configuration.serviceDetails.cleaning.rooms
                  ] || 0}
                </span>
                <button onClick={() => updateRoomCount(room.key, true)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CleaningServiceConfig;