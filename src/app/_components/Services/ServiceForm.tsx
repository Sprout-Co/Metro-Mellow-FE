'use client';

import React, { useState } from 'react';
import styles from './ServiceForm.module.scss';

interface ServiceOption {
    value: string;
    label: string;
}

const serviceOptions = [
    { value: 'cleaning', label: 'Home Cleaning' },
    { value: 'laundry', label: 'Laundry' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'errands', label: 'Errands' },
    { value: 'pest-control', label: 'Pest Control' }
];

export const ServiceForm = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (isDropdownOpen) setIsDatePickerOpen(false);
    };

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
        if (isDatePickerOpen) setIsDropdownOpen(false);
    };

    const selectService = (option: ServiceOption) => {
        setSelectedService(option);
        setIsDropdownOpen(false);
    };

    const selectDate = (date: string) => {
        setSelectedDate(date);
        setIsDatePickerOpen(false);
    };

    return (
        <div className={styles.serviceForm}>
            <div className={styles.serviceForm__container}>
                <div className={styles.serviceForm__field}>
                    <button
                        className={styles.serviceForm__dropdownTrigger}
                        onClick={toggleDropdown}
                        aria-expanded={isDropdownOpen}
                    >
                        <span>{selectedService ? selectedService.label : 'Dropdown Text'}</span>
                        <svg
                            className={`${styles.serviceForm__dropdownIcon} ${isDropdownOpen ? styles['serviceForm__dropdownIcon--open'] : ''}`}
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className={styles.serviceForm__dropdown}>
                            <ul className={styles.serviceForm__dropdownOptions}>
                                {serviceOptions.map((option) => (
                                    <li key={option.value}>
                                        <button
                                            className={`${styles.serviceForm__dropdownOption} ${selectedService?.value === option.value ? styles['serviceForm__dropdownOption--selected'] : ''}`}
                                            onClick={() => selectService(option)}
                                        >
                                            {option.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles.serviceForm__field}>
                    <button
                        className={styles.serviceForm__dateTrigger}
                        onClick={toggleDatePicker}
                        aria-expanded={isDatePickerOpen}
                    >
                        <span>{selectedDate || 'Select Date'}</span>
                        <svg
                            className={styles.serviceForm__calendarIcon}
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M14.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V4.5C15.75 3.67157 15.0784 3 14.25 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.25 7.5H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {isDatePickerOpen && (
                        <div className={styles.serviceForm__datepicker}>
                            {/* Simple date selection for demo - in real app use a date picker library */}
                            <div className={styles.serviceForm__dateGrid}>
                                {['Today', 'Tomorrow', 'In 2 days', 'In 3 days', 'In a week', 'Custom'].map((date) => (
                                    <button
                                        key={date}
                                        className={styles.serviceForm__dateOption}
                                        onClick={() => selectDate(date)}
                                    >
                                        {date}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button className={styles.serviceForm__detailsBtn}>
                    See Details
                </button>
            </div>
        </div>
    );
};

export default ServiceForm;