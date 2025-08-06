"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./users.module.scss";
import Card from "@/app/(routes)/(app)/admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/admin/_components/UI/Button/Button";
import { motion } from "framer-motion";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("admins");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock admin users data
  const adminUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@metromellow.com",
      role: "Regional Manager",
      permissions: "Full Admin",
      lastActive: "10 minutes ago",
      status: "active",
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@metromellow.com",
      role: "Operations Manager",
      permissions: "Full Admin",
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Wilson",
      email: "michael.wilson@metromellow.com",
      role: "Service Manager",
      permissions: "Limited Admin",
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Thompson",
      email: "sarah.thompson@metromellow.com",
      role: "Finance Manager",
      permissions: "Finance Admin",
      lastActive: "3 days ago",
      status: "inactive",
    },
    {
      id: 5,
      name: "David Martinez",
      email: "david.martinez@metromellow.com",
      role: "HR Manager",
      permissions: "HR Admin",
      lastActive: "5 hours ago",
      status: "active",
    },
  ];

  // Mock roles and permissions
  const roles = [
    {
      id: 1,
      name: "Full Admin",
      description: "Complete access to all system features",
      users: 2,
      permissions: "All",
    },
    {
      id: 2,
      name: "Service Admin",
      description: "Manage services, staff, and scheduling",
      users: 1,
      permissions: "Services, Staff, Scheduling",
    },
    {
      id: 3,
      name: "Finance Admin",
      description: "Manage billing, payments, and reports",
      users: 1,
      permissions: "Finance, Reports",
    },
    {
      id: 4,
      name: "HR Admin",
      description: "Manage staff profiles and HR functions",
      users: 1,
      permissions: "Staff, HR",
    },
    {
      id: 5,
      name: "Limited Admin",
      description: "Limited access with specific permissions",
      users: 3,
      permissions: "Custom",
    },
  ];

  // Filter users based on search query
  const filteredUsers = adminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter roles based on search query
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SuperAdminDashboardLayout
      title="User Management"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "User Management", path: "/super-admin/users" },
      ]}
    >
      <div className={styles.users_page}>
        <div className={styles.users_page__header}>
          <div>
            <h2 className={styles.users_page__title}>
              User & Permission Management
            </h2>
            <p className={styles.users_page__description}>
              Manage admin users, roles, and system permissions
            </p>
          </div>

          <div className={styles.users_page__actions}>
            <Button variant="primary" size="medium">
              Add New User
            </Button>
          </div>
        </div>

        <div className={styles.users_page__tabs}>
          <button
            className={`${styles.users_page__tab} ${activeTab === "admins" ? styles["users_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("admins")}
          >
            Admin Users
          </button>
          <button
            className={`${styles.users_page__tab} ${activeTab === "roles" ? styles["users_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("roles")}
          >
            Roles & Permissions
          </button>
          <button
            className={`${styles.users_page__tab} ${activeTab === "activity" ? styles["users_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            User Activity
          </button>
        </div>

        <div className={styles.users_page__search}>
          <input
            type="text"
            placeholder={`Search ${activeTab === "admins" ? "users" : activeTab === "roles" ? "roles" : "activity"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.users_page__search_input}
          />
        </div>

        {activeTab === "admins" && (
          <Card className={styles.users_page__content}>
            <div className={styles.users_page__table_container}>
              <table className={styles.users_page__table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Last Active</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={styles.users_page__permission_badge}>
                          {user.permissions}
                        </span>
                      </td>
                      <td>{user.lastActive}</td>
                      <td>
                        <span
                          className={`${styles.users_page__status} ${styles[`users_page__status--${user.status}`]}`}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className={styles.users_page__actions_cell}>
                          <button
                            className={`${styles.users_page__action_btn} ${styles["users_page__action_btn--edit"]}`}
                          >
                            Edit
                          </button>
                          <button
                            className={`${styles.users_page__action_btn} ${styles["users_page__action_btn--delete"]}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "roles" && (
          <Card className={styles.users_page__content}>
            <div className={styles.users_page__roles_container}>
              {filteredRoles.map((role) => (
                <motion.div
                  key={role.id}
                  className={styles.users_page__role_card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.users_page__role_header}>
                    <h3 className={styles.users_page__role_name}>
                      {role.name}
                    </h3>
                    <span className={styles.users_page__role_users}>
                      {role.users} users
                    </span>
                  </div>
                  <p className={styles.users_page__role_description}>
                    {role.description}
                  </p>
                  <div className={styles.users_page__permissions}>
                    <h4 className={styles.users_page__permissions_title}>
                      Permissions:
                    </h4>
                    <p className={styles.users_page__permissions_list}>
                      {role.permissions}
                    </p>
                  </div>
                  <div className={styles.users_page__role_actions}>
                    <button className={styles.users_page__role_btn}>
                      Edit Role
                    </button>
                    <button className={styles.users_page__role_btn}>
                      Duplicate
                    </button>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className={`${styles.users_page__role_card} ${styles["users_page__role_card--new"]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className={styles.users_page__new_role}>
                  <div className={styles.users_page__new_role_icon}>+</div>
                  <h3 className={styles.users_page__new_role_title}>
                    Create New Role
                  </h3>
                  <p className={styles.users_page__new_role_description}>
                    Define custom permissions for your team
                  </p>
                </div>
              </motion.div>
            </div>
          </Card>
        )}

        {activeTab === "activity" && (
          <Card className={styles.users_page__content}>
            <div className={styles.users_page__activity_header}>
              <h3 className={styles.users_page__activity_title}>
                Recent User Activities
              </h3>
              <div className={styles.users_page__activity_filter}>
                <select className={styles.users_page__activity_select}>
                  <option value="all">All Activities</option>
                  <option value="login">Login Events</option>
                  <option value="changes">System Changes</option>
                  <option value="critical">Critical Actions</option>
                </select>
              </div>
            </div>

            <div className={styles.users_page__activity_list}>
              <div className={styles.users_page__activity_item}>
                <div className={styles.users_page__activity_time}>
                  10 minutes ago
                </div>
                <div className={styles.users_page__activity_user}>
                  John Smith
                </div>
                <div className={styles.users_page__activity_action}>
                  Modified service pricing for House Cleaning
                </div>
                <div className={styles.users_page__activity_ip}>
                  192.168.1.45
                </div>
              </div>

              <div className={styles.users_page__activity_item}>
                <div className={styles.users_page__activity_time}>
                  2 hours ago
                </div>
                <div className={styles.users_page__activity_user}>
                  Emily Davis
                </div>
                <div className={styles.users_page__activity_action}>
                  Added new admin user Robert Johnson
                </div>
                <div className={styles.users_page__activity_ip}>
                  192.168.1.112
                </div>
              </div>

              <div className={styles.users_page__activity_item}>
                <div className={styles.users_page__activity_time}>
                  3 hours ago
                </div>
                <div className={styles.users_page__activity_user}>
                  John Smith
                </div>
                <div className={styles.users_page__activity_action}>
                  Logged in to Super Admin dashboard
                </div>
                <div className={styles.users_page__activity_ip}>
                  192.168.1.45
                </div>
              </div>

              <div className={styles.users_page__activity_item}>
                <div className={styles.users_page__activity_time}>
                  5 hours ago
                </div>
                <div className={styles.users_page__activity_user}>
                  Michael Wilson
                </div>
                <div className={styles.users_page__activity_action}>
                  Updated system settings
                </div>
                <div className={styles.users_page__activity_ip}>
                  192.168.1.78
                </div>
              </div>

              <div className={styles.users_page__activity_item}>
                <div className={styles.users_page__activity_time}>
                  Yesterday, 16:42
                </div>
                <div className={styles.users_page__activity_user}>
                  Sarah Thompson
                </div>
                <div className={styles.users_page__activity_action}>
                  Generated global financial report
                </div>
                <div className={styles.users_page__activity_ip}>
                  192.168.1.23
                </div>
              </div>

              <div className={styles.users_page__activity_item}>
                <div className={styles.users_page__activity_time}>
                  Yesterday, 10:15
                </div>
                <div className={styles.users_page__activity_user}>
                  David Martinez
                </div>
                <div className={styles.users_page__activity_action}>
                  Modified permissions for Staff Role Group
                </div>
                <div className={styles.users_page__activity_ip}>
                  192.168.1.55
                </div>
              </div>
            </div>

            <div className={styles.users_page__activity_pagination}>
              <button className={styles.users_page__pagination_btn}>
                Previous
              </button>
              <div className={styles.users_page__pagination_pages}>
                <button
                  className={`${styles.users_page__pagination_page} ${styles["users_page__pagination_page--active"]}`}
                >
                  1
                </button>
                <button className={styles.users_page__pagination_page}>
                  2
                </button>
                <button className={styles.users_page__pagination_page}>
                  3
                </button>
                <span>...</span>
                <button className={styles.users_page__pagination_page}>
                  12
                </button>
              </div>
              <button className={styles.users_page__pagination_btn}>
                Next
              </button>
            </div>
          </Card>
        )}
      </div>
    </SuperAdminDashboardLayout>
  );
}
