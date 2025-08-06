"use client";

import { useState } from "react";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function AddressManagement() {
  const { handleAddAddress } = useAuthOperations();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [formData, setFormData] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleAddAddress({
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        label: "Default",
      });
      setAddresses((prev) => [...prev, formData]);
      setFormData({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Addresses</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="street">Street Address</label>
          <input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="zipCode">ZIP Code</label>
          <input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Address
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address, index) => (
          <div key={index} className="border rounded p-4">
            <h3 className="font-medium">{address.street}</h3>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-sm text-gray-600">{address.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
