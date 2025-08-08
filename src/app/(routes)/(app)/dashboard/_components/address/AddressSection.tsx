'use client';

import { useState } from 'react';
import styles from './AddressSection.module.scss';
import Button from '@/components/ui/Button/Button';
import SectionHeader from '../common/SectionHeader/SectionHeader';
// @ts-ignore
import AddressCard from './AddressCard';

// Mock data for demo purposes
const mockAddresses = [
  {
    id: '1',
    fullname: 'Dele Ja',
    state: 'Lagos',
    lga: 'Ikeja',
    address: '234, Alvan Ikoku Street, Lagos Island, Lagos.',
    phone: '+2349087653423',
    email: 'info@metromellow.com'
  },
  {
    id: '2',
    fullname: 'Dele Ja',
    state: 'Lagos',
    lga: 'Ikeja',
    address: '234, Alvan Ikoku Street, Lagos Island, Lagos.',
    phone: '+2349087653423',
    email: 'info@metromellow.com'
  }
];

interface AddressFormData {
  fullname: string;
  state: string;
  lga: string;
  address: string;
}

const AddressSection = () => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [formData, setFormData] = useState<AddressFormData>({
    fullname: '',
    state: '',
    lga: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Validate form
    if (!formData.fullname || !formData.state || !formData.lga || !formData.address) {
      // Show error message (in a real app you'd use proper form validation)
      alert('Please fill all the fields');
      return;
    }

    if (isEditing && editingAddressId) {
      // Update existing address
      setAddresses(prevAddresses => 
        prevAddresses.map(address => 
          address.id === editingAddressId ? 
          { ...address, ...formData } : 
          address
        )
      );
      setIsEditing(false);
      setEditingAddressId(null);
    } else {
      // Add new address
      const newAddress = {
        id: `${Date.now()}`, // Generate a simple ID
        ...formData,
        phone: '+2349087653423', // Dummy data for demo
        email: 'info@metromellow.com' // Dummy data for demo
      };
      
      setAddresses(prevAddresses => [...prevAddresses, newAddress]);
    }

    // Reset form
    setFormData({
      fullname: '',
      state: '',
      lga: '',
      address: ''
    });
  };

  const handleEdit = (addressId: string) => {
    const addressToEdit = addresses.find(a => a.id === addressId);
    if (addressToEdit) {
      setFormData({
        fullname: addressToEdit.fullname,
        state: addressToEdit.state,
        lga: addressToEdit.lga,
        address: addressToEdit.address
      });
      setIsEditing(true);
      setEditingAddressId(addressId);
    }
  };

  return (
    <div className={styles.addressSection}>
      <div className={styles.addressSection__container}>
        <SectionHeader 
          title="Addresses"
          subtitle="Manage your addresses:"
        />
        
        <div className={styles.addressSection__content}>
          <div className={styles.addressSection__form}>
            <div className={styles.addressSection__formField}>
              <label className={styles.addressSection__label}>Fullname</label>
              <input 
                type="text" 
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className={styles.addressSection__input}
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.addressSection__formField}>
              <label className={styles.addressSection__label}>State</label>
              <select 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={styles.addressSection__select}
              >
                <option value="">Select State</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Rivers">Rivers</option>
                {/* Add more states as needed */}
              </select>
            </div>

            <div className={styles.addressSection__formField}>
              <label className={styles.addressSection__label}>LGA</label>
              <select 
                name="lga"
                value={formData.lga}
                onChange={handleInputChange}
                className={styles.addressSection__select}
              >
                <option value="">Select LGA</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Lagos Island">Lagos Island</option>
                <option value="Lekki">Lekki</option>
                {/* Add more LGAs as needed */}
              </select>
            </div>

            <div className={styles.addressSection__formField}>
              <label className={styles.addressSection__label}>Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={styles.addressSection__textarea}
                placeholder="Enter your full address"
                rows={4}
              />
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleSave}
              className={styles.addressSection__saveButton}
            >
              SAVE
            </Button>
          </div>

          <div className={styles.addressSection__cards}>
            {addresses.map(address => (
              <AddressCard 
                key={address.id}
                address={address}
                onEdit={() => handleEdit(address.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSection;