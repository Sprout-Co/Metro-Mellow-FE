import React from 'react';
import { motion } from 'framer-motion';
import styles from './PropertySelector.module.scss';

interface RoomsType {
  bedroom: number;
  livingRoom: number;
  bathroom: number;
  kitchen: number;
  balcony: number;
  studyRoom: number;
}

interface PropertySelectorProps {
  houseType: string;
  rooms: RoomsType;
  onHouseTypeChange: (type: string) => void;
  onRoomsChange: (rooms: RoomsType) => void;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  houseType,
  rooms,
  onHouseTypeChange,
  onRoomsChange
}) => {
  // Handle room count change
  const handleRoomChange = (roomType: keyof RoomsType, change: number) => {
    const newCount = Math.max(0, rooms[roomType] + change);
    const newRooms = { ...rooms, [roomType]: newCount };
    onRoomsChange(newRooms);
  };
  
  return (
    <div className={styles.property}>
      <h3 className={styles.property__heading}>House information.</h3>
      
      {/* House type selector */}
      <div className={styles.property__types}>
        <div 
          className={`${styles.property__type} ${houseType === 'flat' ? styles.property__type_selected : ''}`}
          onClick={() => onHouseTypeChange('flat')}
        >
          <h4 className={styles.property__type_title}>Flat</h4>
          <p className={styles.property__type_description}>A house with only one floor</p>
        </div>
        
        <div 
          className={`${styles.property__type} ${houseType === 'duplex' ? styles.property__type_selected : ''}`}
          onClick={() => onHouseTypeChange('duplex')}
        >
          <h4 className={styles.property__type_title}>Duplex</h4>
          <p className={styles.property__type_description}>A house with more than one floor</p>
        </div>
      </div>
      
      {/* Room selector section */}
      <div className={styles.property__rooms_section}>
        <h3 className={styles.property__subheading}>Tell us about your home</h3>
        
        <div className={styles.property__rooms}>
          {/* Bedrooms */}
          <div className={styles.property__room}>
            <span className={styles.property__room_name}>Bedroom</span>
            
            <div className={styles.property__room_counter}>
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('bedroom', -1)}
                disabled={rooms.bedroom === 0}
              >
                -
              </button>
              
              <span className={styles.property__room_count}>{rooms.bedroom}</span>
              
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('bedroom', 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Living Room */}
          <div className={styles.property__room}>
            <span className={styles.property__room_name}>Living Room</span>
            
            <div className={styles.property__room_counter}>
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('livingRoom', -1)}
                disabled={rooms.livingRoom === 0}
              >
                -
              </button>
              
              <span className={styles.property__room_count}>{rooms.livingRoom}</span>
              
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('livingRoom', 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Bathroom */}
          <div className={styles.property__room}>
            <span className={styles.property__room_name}>Bathroom</span>
            
            <div className={styles.property__room_counter}>
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('bathroom', -1)}
                disabled={rooms.bathroom === 0}
              >
                -
              </button>
              
              <span className={styles.property__room_count}>{rooms.bathroom}</span>
              
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('bathroom', 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Kitchen */}
          <div className={styles.property__room}>
            <span className={styles.property__room_name}>Kitchen</span>
            
            <div className={styles.property__room_counter}>
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('kitchen', -1)}
                disabled={rooms.kitchen === 0}
              >
                -
              </button>
              
              <span className={styles.property__room_count}>{rooms.kitchen}</span>
              
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('kitchen', 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Balcony */}
          <div className={styles.property__room}>
            <span className={styles.property__room_name}>Balcony</span>
            
            <div className={styles.property__room_counter}>
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('balcony', -1)}
                disabled={rooms.balcony === 0}
              >
                -
              </button>
              
              <span className={styles.property__room_count}>{rooms.balcony}</span>
              
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('balcony', 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Study Room */}
          <div className={styles.property__room}>
            <span className={styles.property__room_name}>Study Room</span>
            
            <div className={styles.property__room_counter}>
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('studyRoom', -1)}
                disabled={rooms.studyRoom === 0}
              >
                -
              </button>
              
              <span className={styles.property__room_count}>{rooms.studyRoom}</span>
              
              <button 
                className={styles.property__room_btn}
                onClick={() => handleRoomChange('studyRoom', 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySelector;