import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Sidebar.module.scss";
import {
  Home,
  CalendarDays,
  Repeat,
  CreditCard,
  Gift,
  User,
  MessageSquare,
  ChevronRight,
  List,
  MapPin,
  Heart,
  Bell,
  Settings,
  LogOut,
  PlusCircle,
  HelpCircle,
  Wallet,
  Clock,
} from "lucide-react";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLink {
  href?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: any;
}

interface NavSection {
  title: string | null;
  links: NavLink[];
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  color: string;
  onClick?: () => void;
}

import AddressSelector from "@/components/ui/AddressSelector/AddressSelector";
import AddressModal from "../../../addresses/_components/AddressModal";
import RescheduleDrawer from "./RescheduleDrawer/RescheduleDrawer";
import ServicesListDrawer from "./ServicesListDrawer/ServicesListDrawer";
import QuickHelpDrawer from "./QuickHelpDrawer/QuickHelpDrawer";
import { openServicesListDrawer } from "@/lib/redux/slices/uiSlice";
import { useDispatch } from "react-redux";
import { Routes } from "@/constants/routes";

// Mock addresses data
const mockAddresses = [
  {
    id: "1",
    label: "Home",
    type: "home" as const,
    street: "24 Emmanuel Osakwe Street",
    area: "Chevron Drive",
    city: "Lekki",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    type: "work" as const,
    street: "45 Admiralty Way",
    area: "Admiralty",
    city: "Lekki Phase 1",
    isDefault: false,
  },
];

interface QuickAddressDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: any) => void;
}

const QuickAddressDrawer: React.FC<QuickAddressDrawerProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("1");

  const handleSelectAddress = (address: any) => {
    setSelectedAddressId(address.id);
    onAddressSelect(address);
    // Optionally close the drawer after selection
    setTimeout(() => onClose(), 300);
  };

  const handleAddNewAddress = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewAddress = (addressData: any) => {
    // Handle saving new address
    console.log("New address:", addressData);
    setIsAddModalOpen(false);
  };

  return (
    <>
      <ModalDrawer isOpen={isOpen} onClose={onClose} width="sm">
        <AddressSelector
          addresses={mockAddresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={handleSelectAddress}
          onAddNewAddress={handleAddNewAddress}
          variant="drawer"
        />
      </ModalDrawer>

      <AddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewAddress}
      />
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const dispatch = useDispatch();
  // States for the new drawers
  const [isRescheduleDrawerOpen, setIsRescheduleDrawerOpen] = useState(false);
  const [isServicesListDrawerOpen, setIsServicesListDrawerOpen] =
    useState(false);
  const [isQuickHelpDrawerOpen, setIsQuickHelpDrawerOpen] = useState(false);

  const quickActions: QuickAction[] = [
    {
      icon: PlusCircle,
      label: "New Booking",
      // href: "/dashboard/bookings/new",
      color: styles.quickActionPrimary,
      onClick: () => dispatch(openServicesListDrawer()),
    },
    {
      icon: Repeat,
      label: "New Subscription",
      href: Routes.DASHBOARD_SUBSCRIPTIONS_ADD,
      color: styles.quickActionSecondary,
      onClick: () => dispatch(openServicesListDrawer()),
    },
    {
      icon: HelpCircle,
      label: "Get Help",
      onClick: () => setIsQuickHelpDrawerOpen(true),
      color: styles.quickActionAccent,
    },
    {
      icon: Clock,
      label: "Reschedule",
      onClick: () => setIsRescheduleDrawerOpen(true),
      color: styles.quickActionNeutral,
    },
  ];

  const navSections: NavSection[] = [
    {
      title: null,
      links: [
        { href: "/dashboard", label: "Home", icon: Home },
        {
          href: "/dashboard/bookings",
          label: "My Bookings",
          icon: CalendarDays,
        },
        {
          href: "/dashboard/subscriptions",
          label: "Subscriptions",
          icon: Repeat,
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          href: "/dashboard/account",
          label: "Personal Info",
          icon: User,
        },
        {
          href: "/dashboard/account/addresses",
          label: "Address Book",
          icon: MapPin,
          // onClick: () => setIsAddressDrawerOpen(true),
        },

        {
          href: "/dashboard/payments",
          label: "Payment Methods",
          icon: CreditCard,
        },
        { href: "/dashboard/rewards", label: "Loyalty Program", icon: Gift },
        {
          href: "/dashboard/rewards/refer",
          label: "Refer a Friend",
          icon: User,
        },
      ],
    },
    {
      title: "Support & Settings",
      links: [
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
        { href: "/dashboard/support", label: "Support", icon: MessageSquare },

        { href: "/logout", label: "Log Out", icon: LogOut },
      ],
    },
  ];

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: 20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.includes(path);
  };

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="sm">
      <div className={styles.sidebar__header}>
        <motion.h2 className={styles.sidebar__title} variants={itemVariants}>
          Menu
        </motion.h2>
        <motion.button
          className={styles.sidebar__closeButton}
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          &times;
        </motion.button>
      </div>

      <motion.div
        className={styles.sidebar__quickActions}
        variants={itemVariants}
      >
        <h3 className={styles.sidebar__quickActionsTitle}>Quick Actions</h3>
        <div className={styles.sidebar__quickActionsGrid}>
          {quickActions.map((action) =>
            action.href ? (
              <Link
                key={action.href}
                href={action.href}
                className={styles.sidebar__quickAction}
              >
                <motion.div
                  className={`${styles.sidebar__quickActionItem} ${action.color}`}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{
                    y: 0,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  <action.icon className={styles.sidebar__quickActionIcon} />
                  <span className={styles.sidebar__quickActionLabel}>
                    {action.label}
                  </span>
                </motion.div>
              </Link>
            ) : (
              <div
                key={action.label}
                className={styles.sidebar__quickAction}
                onClick={action.onClick}
              >
                <motion.div
                  className={`${styles.sidebar__quickActionItem} ${action.color}`}
                  onClick={action.onClick}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{
                    y: 0,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  <action.icon className={styles.sidebar__quickActionIcon} />
                  <span className={styles.sidebar__quickActionLabel}>
                    {action.label}
                  </span>
                </motion.div>
              </div>
            )
          )}
        </div>
      </motion.div>

      <nav className={styles.sidebar__nav}>
        {navSections.map((section, index) => (
          <div key={section.title || `section-${index}`}>
            {section.title && (
              <motion.div
                className={styles.sidebar__sectionTitle}
                variants={itemVariants}
              >
                {section.title}
              </motion.div>
            )}
            <motion.ul
              className={styles.sidebar__navSection}
              variants={itemVariants}
            >
              {section.links.map((link) => (
                <motion.li
                  key={link.href ?? link.label}
                  className={`${styles.sidebar__navItem} ${link.href && isActive(link.href) ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  {link.href ? (
                    <Link href={link.href} className={styles.sidebar__navLink}>
                      <link.icon className={styles.sidebar__icon} />
                      <span>{link.label}</span>
                    </Link>
                  ) : (
                    <div
                      className={styles.sidebar__navLink}
                      onClick={link.onClick}
                    >
                      <link.icon className={styles.sidebar__icon} />
                      <span>{link.label}</span>
                    </div>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </nav>

      <motion.div className={styles.sidebar__footer} variants={itemVariants}>
        <Image
          src="/images/brand/brand-logo/transparent-bg/green.png"
          alt="Metro Mellow"
          width={120}
          height={40}
          className={styles.sidebar__footerLogo}
        />
      </motion.div>
      {/* <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.sidebar__overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.sidebar}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
        
          </motion.div>
          </>
        )}
      </AnimatePresence> */}
      {isAddressDrawerOpen && (
        <QuickAddressDrawer
          isOpen={isAddressDrawerOpen}
          onClose={() => setIsAddressDrawerOpen(false)}
          onAddressSelect={(address) => {
            setSelectedAddress(address);
            console.log("Selected address:", address);
          }}
        />
      )}
      {isRescheduleDrawerOpen && (
        <RescheduleDrawer
          isOpen={isRescheduleDrawerOpen}
          onClose={() => setIsRescheduleDrawerOpen(false)}
        />
      )}
      {/* {isServicesListDrawerOpen && (
        <ServicesListDrawer
          isOpen={isServicesListDrawerOpen}
          onClose={() => setIsServicesListDrawerOpen(false)}
        />
      )} */}
      {isQuickHelpDrawerOpen && (
        <QuickHelpDrawer
          isOpen={isQuickHelpDrawerOpen}
          onClose={() => setIsQuickHelpDrawerOpen(false)}
        />
      )}
    </ModalDrawer>
  );
};

export default Sidebar;
