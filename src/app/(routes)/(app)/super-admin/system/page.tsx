"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./system.module.scss";
import Card from "@/app/(routes)/(app)/admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/admin/_components/UI/Button/Button";
import { motion } from "framer-motion";

export default function SystemConfigPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saveStatus, setSaveStatus] = useState<
    null | "saving" | "saved" | "error"
  >(null);

  // Company settings
  const [companySettings, setCompanySettings] = useState({
    companyName: "Metromellow Home Services",
    supportEmail: "team@metromellow.com",
    contactPhone: "(555) 123-4567",
    website: "www.metromellow.com",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  });

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.metromellow.com",
    smtpPort: "587",
    smtpUsername: "team@metromellow.com",
    smtpPassword: "••••••••••••",
    fromName: "Metromellow Services",
    fromEmail: "team@metromellow.com",
    enableSsl: true,
  });

  // SMS settings
  const [smsSettings, setSmsSettings] = useState({
    provider: "Twilio",
    accountSid: "AC87e6d7b••••••••••••••••••••",
    authToken: "••••••••••••••••••••••••••••",
    fromNumber: "+15551234567",
    enableSms: true,
  });

  // API settings
  const [apiSettings, setApiSettings] = useState({
    enableApi: true,
    rateLimitRequests: 100,
    rateLimitPeriod: "minute",
    apiKey: "mm_api_5f8a7d6e3b2c9••••••••••••",
    webhookUrl: "https://webhooks.metromellow.com/api/events",
    allowCors: true,
    corsOrigins: "metromellow.com,admin.metromellow.com",
  });

  // Localization settings
  const [localizationSettings, setLocalizationSettings] = useState({
    defaultLanguage: "en-US",
    supportedLanguages: ["en-US", "es-ES", "fr-FR"],
    defaultCurrency: "USD",
    currencySymbol: "$",
    measurementSystem: "imperial",
  });

  // Handle form input changes
  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCompanySettings({
      ...companySettings,
      [name]: value,
    });
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setEmailSettings({
      ...emailSettings,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSmsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setSmsSettings({
      ...smsSettings,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleApiChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setApiSettings({
      ...apiSettings,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Save settings
  const handleSaveSettings = () => {
    setSaveStatus("saving");

    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");

      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 1500);
  };

  // Generate new API key
  const handleGenerateApiKey = () => {
    const newApiKey =
      "mm_api_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setApiSettings({
      ...apiSettings,
      apiKey: newApiKey,
    });
  };

  // Toggle checkbox settings
  const handleToggle = (settingType: string, name: string) => {
    if (settingType === "email") {
      setEmailSettings({
        ...emailSettings,
        [name]: !emailSettings[name as keyof typeof emailSettings],
      });
    } else if (settingType === "sms") {
      setSmsSettings({
        ...smsSettings,
        [name]: !smsSettings[name as keyof typeof smsSettings],
      });
    } else if (settingType === "api") {
      setApiSettings({
        ...apiSettings,
        [name]: !apiSettings[name as keyof typeof apiSettings],
      });
    }
  };

  return (
    <SuperAdminDashboardLayout
      title="System Configuration"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "System Configuration", path: "/super-admin/system" },
      ]}
    >
      <div className={styles.system_page}>
        <div className={styles.system_page__header}>
          <div>
            <h2 className={styles.system_page__title}>System Configuration</h2>
            <p className={styles.system_page__description}>
              Configure global system settings and integrations
            </p>
          </div>

          <div className={styles.system_page__actions}>
            <Button
              variant="primary"
              size="medium"
              onClick={handleSaveSettings}
              disabled={saveStatus === "saving"}
            >
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                  ? "Saved!"
                  : "Save Settings"}
            </Button>
          </div>
        </div>

        <div className={styles.system_page__tabs}>
          <button
            className={`${styles.system_page__tab} ${activeTab === "general" ? styles["system_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`${styles.system_page__tab} ${activeTab === "email" ? styles["system_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("email")}
          >
            Email
          </button>
          <button
            className={`${styles.system_page__tab} ${activeTab === "sms" ? styles["system_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("sms")}
          >
            SMS
          </button>
          <button
            className={`${styles.system_page__tab} ${activeTab === "api" ? styles["system_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("api")}
          >
            API & Integrations
          </button>
          <button
            className={`${styles.system_page__tab} ${activeTab === "localization" ? styles["system_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("localization")}
          >
            Localization
          </button>
        </div>

        <Card className={styles.system_page__content}>
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={styles.system_page__form}
            >
              <h3 className={styles.system_page__section_title}>
                General Company Settings
              </h3>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={companySettings.companyName}
                    onChange={handleCompanyChange}
                    className={styles.system_page__input}
                  />
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Support Email
                  </label>
                  <input
                    type="email"
                    name="supportEmail"
                    value={companySettings.supportEmail}
                    onChange={handleCompanyChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={companySettings.contactPhone}
                    onChange={handleCompanyChange}
                    className={styles.system_page__input}
                  />
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>Website</label>
                  <input
                    type="text"
                    name="website"
                    value={companySettings.website}
                    onChange={handleCompanyChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>Timezone</label>
                  <select
                    name="timezone"
                    value={companySettings.timezone}
                    onChange={handleCompanyChange}
                    className={styles.system_page__select}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </option>
                    <option value="America/Anchorage">Alaska Time (AKT)</option>
                    <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                  </select>
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Date Format
                  </label>
                  <select
                    name="dateFormat"
                    value={companySettings.dateFormat}
                    onChange={handleCompanyChange}
                    className={styles.system_page__select}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Time Format
                  </label>
                  <select
                    name="timeFormat"
                    value={companySettings.timeFormat}
                    onChange={handleCompanyChange}
                    className={styles.system_page__select}
                  >
                    <option value="12h">12-hour (AM/PM)</option>
                    <option value="24h">24-hour</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "email" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={styles.system_page__form}
            >
              <h3 className={styles.system_page__section_title}>
                Email Configuration
              </h3>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    SMTP Server
                  </label>
                  <input
                    type="text"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailChange}
                    className={styles.system_page__input}
                  />
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>SMTP Port</label>
                  <input
                    type="text"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                    className={styles.system_page__input}
                  />
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    name="smtpPassword"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>From Name</label>
                  <input
                    type="text"
                    name="fromName"
                    value={emailSettings.fromName}
                    onChange={handleEmailChange}
                    className={styles.system_page__input}
                  />
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    From Email
                  </label>
                  <input
                    type="email"
                    name="fromEmail"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <div className={styles.system_page__checkbox_group}>
                    <input
                      type="checkbox"
                      id="enableSsl"
                      name="enableSsl"
                      checked={emailSettings.enableSsl}
                      onChange={() => handleToggle("email", "enableSsl")}
                      className={styles.system_page__checkbox}
                    />
                    <label
                      htmlFor="enableSsl"
                      className={styles.system_page__checkbox_label}
                    >
                      Enable SSL/TLS
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.system_page__button_group}>
                <Button variant="secondary" size="small">
                  Test Email Configuration
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "sms" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={styles.system_page__form}
            >
              <h3 className={styles.system_page__section_title}>
                SMS Configuration
              </h3>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <div className={styles.system_page__checkbox_group}>
                    <input
                      type="checkbox"
                      id="enableSms"
                      name="enableSms"
                      checked={smsSettings.enableSms}
                      onChange={() => handleToggle("sms", "enableSms")}
                      className={styles.system_page__checkbox}
                    />
                    <label
                      htmlFor="enableSms"
                      className={styles.system_page__checkbox_label}
                    >
                      Enable SMS Notifications
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    SMS Provider
                  </label>
                  <select
                    name="provider"
                    value={smsSettings.provider}
                    onChange={handleSmsChange}
                    className={styles.system_page__select}
                  >
                    <option value="Twilio">Twilio</option>
                    <option value="Nexmo">Nexmo (Vonage)</option>
                    <option value="AWS SNS">AWS SNS</option>
                  </select>
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Account SID
                  </label>
                  <input
                    type="text"
                    name="accountSid"
                    value={smsSettings.accountSid}
                    onChange={handleSmsChange}
                    className={styles.system_page__input}
                  />
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Auth Token
                  </label>
                  <input
                    type="password"
                    name="authToken"
                    value={smsSettings.authToken}
                    onChange={handleSmsChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    From Number
                  </label>
                  <input
                    type="text"
                    name="fromNumber"
                    value={smsSettings.fromNumber}
                    onChange={handleSmsChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__button_group}>
                <Button variant="secondary" size="small">
                  Test SMS Configuration
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "api" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={styles.system_page__form}
            >
              <h3 className={styles.system_page__section_title}>
                API & Integration Settings
              </h3>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <div className={styles.system_page__checkbox_group}>
                    <input
                      type="checkbox"
                      id="enableApi"
                      name="enableApi"
                      checked={apiSettings.enableApi}
                      onChange={() => handleToggle("api", "enableApi")}
                      className={styles.system_page__checkbox}
                    />
                    <label
                      htmlFor="enableApi"
                      className={styles.system_page__checkbox_label}
                    >
                      Enable API Access
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Rate Limit (Requests)
                  </label>
                  <input
                    type="number"
                    name="rateLimitRequests"
                    value={apiSettings.rateLimitRequests}
                    onChange={handleApiChange}
                    className={styles.system_page__input}
                  />
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Rate Limit Period
                  </label>
                  <select
                    name="rateLimitPeriod"
                    value={apiSettings.rateLimitPeriod}
                    onChange={handleApiChange}
                    className={styles.system_page__select}
                  >
                    <option value="second">Per Second</option>
                    <option value="minute">Per Minute</option>
                    <option value="hour">Per Hour</option>
                    <option value="day">Per Day</option>
                  </select>
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>API Key</label>
                  <div className={styles.system_page__append_group}>
                    <input
                      type="text"
                      name="apiKey"
                      value={apiSettings.apiKey}
                      onChange={handleApiChange}
                      className={styles.system_page__input}
                      readOnly
                    />
                    <button
                      className={styles.system_page__append_button}
                      onClick={handleGenerateApiKey}
                    >
                      Generate New
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Webhook URL
                  </label>
                  <input
                    type="text"
                    name="webhookUrl"
                    value={apiSettings.webhookUrl}
                    onChange={handleApiChange}
                    className={styles.system_page__input}
                  />
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <div className={styles.system_page__checkbox_group}>
                    <input
                      type="checkbox"
                      id="allowCors"
                      name="allowCors"
                      checked={apiSettings.allowCors}
                      onChange={() => handleToggle("api", "allowCors")}
                      className={styles.system_page__checkbox}
                    />
                    <label
                      htmlFor="allowCors"
                      className={styles.system_page__checkbox_label}
                    >
                      Allow Cross-Origin Requests (CORS)
                    </label>
                  </div>
                </div>
              </div>

              {apiSettings.allowCors && (
                <div className={styles.system_page__form_row}>
                  <div className={styles.system_page__form_group}>
                    <label className={styles.system_page__label}>
                      Allowed Origins (comma separated)
                    </label>
                    <input
                      type="text"
                      name="corsOrigins"
                      value={apiSettings.corsOrigins}
                      onChange={handleApiChange}
                      className={styles.system_page__input}
                      placeholder="domain1.com,domain2.com"
                    />
                  </div>
                </div>
              )}

              <div className={styles.system_page__integration_buttons}>
                <div className={styles.system_page__integration_button}>
                  <div className={styles.system_page__integration_icon}>💰</div>
                  <div className={styles.system_page__integration_label}>
                    <span>Payment Gateway</span>
                    <small>Configure</small>
                  </div>
                </div>

                <div className={styles.system_page__integration_button}>
                  <div className={styles.system_page__integration_icon}>📅</div>
                  <div className={styles.system_page__integration_label}>
                    <span>Calendar</span>
                    <small>Configure</small>
                  </div>
                </div>

                <div className={styles.system_page__integration_button}>
                  <div className={styles.system_page__integration_icon}>📊</div>
                  <div className={styles.system_page__integration_label}>
                    <span>Analytics</span>
                    <small>Configure</small>
                  </div>
                </div>

                <div className={styles.system_page__integration_button}>
                  <div className={styles.system_page__integration_icon}>💬</div>
                  <div className={styles.system_page__integration_label}>
                    <span>Chat Integration</span>
                    <small>Configure</small>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "localization" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={styles.system_page__form}
            >
              <h3 className={styles.system_page__section_title}>
                Localization Settings
              </h3>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Default Language
                  </label>
                  <select
                    name="defaultLanguage"
                    value={localizationSettings.defaultLanguage}
                    className={styles.system_page__select}
                  >
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="zh-CN">Chinese (Simplified)</option>
                  </select>
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Default Currency
                  </label>
                  <select
                    name="defaultCurrency"
                    value={localizationSettings.defaultCurrency}
                    className={styles.system_page__select}
                  >
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                    <option value="CAD">Canadian Dollar (CA$)</option>
                    <option value="AUD">Australian Dollar (A$)</option>
                  </select>
                </div>

                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Measurement System
                  </label>
                  <select
                    name="measurementSystem"
                    value={localizationSettings.measurementSystem}
                    className={styles.system_page__select}
                  >
                    <option value="imperial">Imperial (mi, ft, lb)</option>
                    <option value="metric">Metric (km, m, kg)</option>
                  </select>
                </div>
              </div>

              <div className={styles.system_page__form_row}>
                <div className={styles.system_page__form_group}>
                  <label className={styles.system_page__label}>
                    Supported Languages
                  </label>
                  <div className={styles.system_page__checkbox_list}>
                    <div className={styles.system_page__checkbox_group}>
                      <input
                        type="checkbox"
                        id="lang_en"
                        checked={true}
                        disabled
                        className={styles.system_page__checkbox}
                      />
                      <label
                        htmlFor="lang_en"
                        className={styles.system_page__checkbox_label}
                      >
                        English (US) - Default
                      </label>
                    </div>

                    <div className={styles.system_page__checkbox_group}>
                      <input
                        type="checkbox"
                        id="lang_es"
                        checked={localizationSettings.supportedLanguages.includes(
                          "es-ES"
                        )}
                        className={styles.system_page__checkbox}
                      />
                      <label
                        htmlFor="lang_es"
                        className={styles.system_page__checkbox_label}
                      >
                        Spanish
                      </label>
                    </div>

                    <div className={styles.system_page__checkbox_group}>
                      <input
                        type="checkbox"
                        id="lang_fr"
                        checked={localizationSettings.supportedLanguages.includes(
                          "fr-FR"
                        )}
                        className={styles.system_page__checkbox}
                      />
                      <label
                        htmlFor="lang_fr"
                        className={styles.system_page__checkbox_label}
                      >
                        French
                      </label>
                    </div>

                    <div className={styles.system_page__checkbox_group}>
                      <input
                        type="checkbox"
                        id="lang_de"
                        checked={false}
                        className={styles.system_page__checkbox}
                      />
                      <label
                        htmlFor="lang_de"
                        className={styles.system_page__checkbox_label}
                      >
                        German
                      </label>
                    </div>

                    <div className={styles.system_page__checkbox_group}>
                      <input
                        type="checkbox"
                        id="lang_zh"
                        checked={false}
                        className={styles.system_page__checkbox}
                      />
                      <label
                        htmlFor="lang_zh"
                        className={styles.system_page__checkbox_label}
                      >
                        Chinese (Simplified)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.system_page__button_group}>
                <Button variant="secondary" size="small">
                  Manage Translations
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      </div>
    </SuperAdminDashboardLayout>
  );
}
