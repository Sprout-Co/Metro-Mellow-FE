"use client";
import { useState } from "react";
import AdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./settings.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  // Mock company settings data
  const [companySettings, setCompanySettings] = useState({
    companyName: "Metro Mellow Home Services",
    contactEmail: "info@metromellow.com",
    contactPhone: "(555) 123-4567",
    address: "123 Main Street, Anytown, CA 94567",
    website: "www.metromellow.com",
    workingHours: "8:00 AM - 6:00 PM, Monday to Saturday",
  });

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    bookingConfirmations: true,
    serviceReminders: true,
    marketingUpdates: false,
    staffNotifications: true,
  });

  // Mock payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCards: true,
    acceptPaypal: true,
    acceptBankTransfer: false,
    requireDeposit: true,
    depositPercentage: 15,
    sendAutomaticInvoices: true,
    paymentTermDays: 7,
  });

  // Mock service settings
  const [serviceSettings, setServiceSettings] = useState({
    minimumBookingNotice: "24 hours",
    cancellationPolicy: "48 hours",
    refundPolicy:
      "Full refund if cancelled 48 hours before, 50% if cancelled 24 hours before",
    serviceWarranty: "7 days satisfaction guarantee",
    allowRescheduling: true,
    maxReschedulesAllowed: 2,
  });

  // Handle input changes for company settings
  const handleCompanySettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanySettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle toggle for notification settings
  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  // Handle toggle for payment settings
  const handlePaymentToggle = (setting: string) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  // Handle payment setting changes
  const handlePaymentSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPaymentSettings((prev) => ({
      ...prev,
      [name]:
        name === "depositPercentage" || name === "paymentTermDays"
          ? parseInt(value)
          : value,
    }));
  };

  // Handle service setting changes
  const handleServiceSettingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setServiceSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle service setting toggle
  const handleServiceToggle = (setting: string) => {
    setServiceSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  // Handle save settings
  const handleSaveSettings = () => {
    // This would typically make an API call to save the settings
    alert("Settings saved successfully!");
  };

  return (
    <AdminDashboardLayout
      title="Settings"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Settings", path: "/admin/settings" },
      ]}
    >
      <div className={styles.settings_page}>
        <div className={styles.settings_page__header}>
          <h2 className={styles.settings_page__title}>System Settings</h2>
          <p className={styles.settings_page__subtitle}>
            Configure your system preferences
          </p>
        </div>

        <div className={styles.settings_page__container}>
          <div className={styles.settings_page__tabs}>
            <button
              className={`${styles.settings_page__tab} ${activeTab === "general" ? styles["settings_page__tab--active"] : ""}`}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
            <button
              className={`${styles.settings_page__tab} ${activeTab === "notifications" ? styles["settings_page__tab--active"] : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={`${styles.settings_page__tab} ${activeTab === "payments" ? styles["settings_page__tab--active"] : ""}`}
              onClick={() => setActiveTab("payments")}
            >
              Payments
            </button>
            <button
              className={`${styles.settings_page__tab} ${activeTab === "services" ? styles["settings_page__tab--active"] : ""}`}
              onClick={() => setActiveTab("services")}
            >
              Services
            </button>
            <button
              className={`${styles.settings_page__tab} ${activeTab === "security" ? styles["settings_page__tab--active"] : ""}`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>

          <div className={styles.settings_page__content}>
            <Card className={styles.settings_page__card}>
              {activeTab === "general" && (
                <div className={styles.settings_page__form}>
                  <h3 className={styles.settings_page__section_title}>
                    Company Information
                  </h3>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={companySettings.companyName}
                      onChange={handleCompanySettingChange}
                      className={styles.settings_page__input}
                    />
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={companySettings.contactEmail}
                      onChange={handleCompanySettingChange}
                      className={styles.settings_page__input}
                    />
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={companySettings.contactPhone}
                      onChange={handleCompanySettingChange}
                      className={styles.settings_page__input}
                    />
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={companySettings.address}
                      onChange={handleCompanySettingChange}
                      className={styles.settings_page__textarea}
                      rows={3}
                    />
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      value={companySettings.website}
                      onChange={handleCompanySettingChange}
                      className={styles.settings_page__input}
                    />
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Working Hours
                    </label>
                    <input
                      type="text"
                      name="workingHours"
                      value={companySettings.workingHours}
                      onChange={handleCompanySettingChange}
                      className={styles.settings_page__input}
                    />
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className={styles.settings_page__form}>
                  <h3 className={styles.settings_page__section_title}>
                    Notification Preferences
                  </h3>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Email Notifications</span>
                      <p className={styles.settings_page__toggle_description}>
                        Receive notifications via email
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${notificationSettings.emailNotifications ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() =>
                        handleNotificationToggle("emailNotifications")
                      }
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>SMS Notifications</span>
                      <p className={styles.settings_page__toggle_description}>
                        Receive notifications via text message
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${notificationSettings.smsNotifications ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() =>
                        handleNotificationToggle("smsNotifications")
                      }
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Booking Confirmations</span>
                      <p className={styles.settings_page__toggle_description}>
                        Send confirmation messages to customers after booking
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${notificationSettings.bookingConfirmations ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() =>
                        handleNotificationToggle("bookingConfirmations")
                      }
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Service Reminders</span>
                      <p className={styles.settings_page__toggle_description}>
                        Send reminders before scheduled services
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${notificationSettings.serviceReminders ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() =>
                        handleNotificationToggle("serviceReminders")
                      }
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Marketing Updates</span>
                      <p className={styles.settings_page__toggle_description}>
                        Send promotional messages and updates to customers
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${notificationSettings.marketingUpdates ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() =>
                        handleNotificationToggle("marketingUpdates")
                      }
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Staff Notifications</span>
                      <p className={styles.settings_page__toggle_description}>
                        Send notifications to staff about new bookings and
                        schedule changes
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${notificationSettings.staffNotifications ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() =>
                        handleNotificationToggle("staffNotifications")
                      }
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "payments" && (
                <div className={styles.settings_page__form}>
                  <h3 className={styles.settings_page__section_title}>
                    Payment Settings
                  </h3>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Accept Credit Cards</span>
                      <p className={styles.settings_page__toggle_description}>
                        Allow payments using credit/debit cards
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${paymentSettings.acceptCreditCards ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() => handlePaymentToggle("acceptCreditCards")}
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Accept PayPal</span>
                      <p className={styles.settings_page__toggle_description}>
                        Allow payments using PayPal
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${paymentSettings.acceptPaypal ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() => handlePaymentToggle("acceptPaypal")}
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Accept Bank Transfer</span>
                      <p className={styles.settings_page__toggle_description}>
                        Allow payments using direct bank transfer
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${paymentSettings.acceptBankTransfer ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() => handlePaymentToggle("acceptBankTransfer")}
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Require Deposit</span>
                      <p className={styles.settings_page__toggle_description}>
                        Require customers to pay a deposit when booking
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${paymentSettings.requireDeposit ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() => handlePaymentToggle("requireDeposit")}
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  {paymentSettings.requireDeposit && (
                    <div className={styles.settings_page__form_group}>
                      <label className={styles.settings_page__label}>
                        Deposit Percentage
                      </label>
                      <select
                        name="depositPercentage"
                        value={paymentSettings.depositPercentage}
                        onChange={handlePaymentSettingChange}
                        className={styles.settings_page__select}
                      >
                        <option value={10}>10%</option>
                        <option value={15}>15%</option>
                        <option value={20}>20%</option>
                        <option value={25}>25%</option>
                        <option value={30}>30%</option>
                        <option value={50}>50%</option>
                      </select>
                    </div>
                  )}

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Send Automatic Invoices</span>
                      <p className={styles.settings_page__toggle_description}>
                        Automatically send invoices after service completion
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${paymentSettings.sendAutomaticInvoices ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() =>
                        handlePaymentToggle("sendAutomaticInvoices")
                      }
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Payment Term (Days)
                    </label>
                    <select
                      name="paymentTermDays"
                      value={paymentSettings.paymentTermDays}
                      onChange={handlePaymentSettingChange}
                      className={styles.settings_page__select}
                    >
                      <option value={1}>1 day</option>
                      <option value={3}>3 days</option>
                      <option value={7}>7 days</option>
                      <option value={14}>14 days</option>
                      <option value={30}>30 days</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "services" && (
                <div className={styles.settings_page__form}>
                  <h3 className={styles.settings_page__section_title}>
                    Service Settings
                  </h3>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Minimum Booking Notice
                    </label>
                    <select
                      name="minimumBookingNotice"
                      value={serviceSettings.minimumBookingNotice}
                      onChange={handleServiceSettingChange}
                      className={styles.settings_page__select}
                    >
                      <option value="6 hours">6 hours</option>
                      <option value="12 hours">12 hours</option>
                      <option value="24 hours">24 hours</option>
                      <option value="48 hours">48 hours</option>
                      <option value="72 hours">72 hours</option>
                    </select>
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Cancellation Policy
                    </label>
                    <select
                      name="cancellationPolicy"
                      value={serviceSettings.cancellationPolicy}
                      onChange={handleServiceSettingChange}
                      className={styles.settings_page__select}
                    >
                      <option value="24 hours">24 hours</option>
                      <option value="48 hours">48 hours</option>
                      <option value="72 hours">72 hours</option>
                    </select>
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Refund Policy
                    </label>
                    <textarea
                      name="refundPolicy"
                      value={serviceSettings.refundPolicy}
                      onChange={handleServiceSettingChange}
                      className={styles.settings_page__textarea}
                      rows={3}
                    />
                  </div>

                  <div className={styles.settings_page__form_group}>
                    <label className={styles.settings_page__label}>
                      Service Warranty
                    </label>
                    <input
                      type="text"
                      name="serviceWarranty"
                      value={serviceSettings.serviceWarranty}
                      onChange={handleServiceSettingChange}
                      className={styles.settings_page__input}
                    />
                  </div>

                  <div className={styles.settings_page__toggle_group}>
                    <div className={styles.settings_page__toggle_label}>
                      <span>Allow Rescheduling</span>
                      <p className={styles.settings_page__toggle_description}>
                        Allow customers to reschedule their bookings
                      </p>
                    </div>
                    <div
                      className={`${styles.settings_page__toggle} ${serviceSettings.allowRescheduling ? styles["settings_page__toggle--active"] : ""}`}
                      onClick={() => handleServiceToggle("allowRescheduling")}
                    >
                      <div
                        className={styles.settings_page__toggle_button}
                      ></div>
                    </div>
                  </div>

                  {serviceSettings.allowRescheduling && (
                    <div className={styles.settings_page__form_group}>
                      <label className={styles.settings_page__label}>
                        Max Reschedules Allowed
                      </label>
                      <select
                        name="maxReschedulesAllowed"
                        value={serviceSettings.maxReschedulesAllowed}
                        onChange={handleServiceSettingChange}
                        className={styles.settings_page__select}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "security" && (
                <div className={styles.settings_page__form}>
                  <h3 className={styles.settings_page__section_title}>
                    Security Settings
                  </h3>

                  <div className={styles.settings_page__security_section}>
                    <h4 className={styles.settings_page__subsection_title}>
                      Password Policy
                    </h4>

                    <div className={styles.settings_page__toggle_group}>
                      <div className={styles.settings_page__toggle_label}>
                        <span>Require Strong Passwords</span>
                        <p className={styles.settings_page__toggle_description}>
                          Require passwords with at least 8 characters,
                          including numbers and special characters
                        </p>
                      </div>
                      <div
                        className={`${styles.settings_page__toggle} ${styles["settings_page__toggle--active"]}`}
                      >
                        <div
                          className={styles.settings_page__toggle_button}
                        ></div>
                      </div>
                    </div>

                    <div className={styles.settings_page__toggle_group}>
                      <div className={styles.settings_page__toggle_label}>
                        <span>Password Expiry</span>
                        <p className={styles.settings_page__toggle_description}>
                          Require users to change passwords every 90 days
                        </p>
                      </div>
                      <div className={styles.settings_page__toggle}>
                        <div
                          className={styles.settings_page__toggle_button}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.settings_page__security_section}>
                    <h4 className={styles.settings_page__subsection_title}>
                      Login Settings
                    </h4>

                    <div className={styles.settings_page__toggle_group}>
                      <div className={styles.settings_page__toggle_label}>
                        <span>Two-Factor Authentication</span>
                        <p className={styles.settings_page__toggle_description}>
                          Require two-factor authentication for staff logins
                        </p>
                      </div>
                      <div
                        className={`${styles.settings_page__toggle} ${styles["settings_page__toggle--active"]}`}
                      >
                        <div
                          className={styles.settings_page__toggle_button}
                        ></div>
                      </div>
                    </div>

                    <div className={styles.settings_page__toggle_group}>
                      <div className={styles.settings_page__toggle_label}>
                        <span>Account Lockout</span>
                        <p className={styles.settings_page__toggle_description}>
                          Lock accounts after 5 failed login attempts
                        </p>
                      </div>
                      <div
                        className={`${styles.settings_page__toggle} ${styles["settings_page__toggle--active"]}`}
                      >
                        <div
                          className={styles.settings_page__toggle_button}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.settings_page__security_section}>
                    <h4 className={styles.settings_page__subsection_title}>
                      Data Privacy
                    </h4>

                    <div className={styles.settings_page__toggle_group}>
                      <div className={styles.settings_page__toggle_label}>
                        <span>Data Encryption</span>
                        <p className={styles.settings_page__toggle_description}>
                          Encrypt sensitive customer data
                        </p>
                      </div>
                      <div
                        className={`${styles.settings_page__toggle} ${styles["settings_page__toggle--active"]}`}
                      >
                        <div
                          className={styles.settings_page__toggle_button}
                        ></div>
                      </div>
                    </div>

                    <div className={styles.settings_page__toggle_group}>
                      <div className={styles.settings_page__toggle_label}>
                        <span>GDPR Compliance</span>
                        <p className={styles.settings_page__toggle_description}>
                          Enable features to comply with GDPR requirements
                        </p>
                      </div>
                      <div
                        className={`${styles.settings_page__toggle} ${styles["settings_page__toggle--active"]}`}
                      >
                        <div
                          className={styles.settings_page__toggle_button}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.settings_page__actions}>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </Button>
                <Button variant="outline" size="medium">
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
