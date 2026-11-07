"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSidebar } from "../context/SidebarContext";

import {
  GridIcon,
  HorizontaLDots,
  ListIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";

type NavItem = {
  key: string;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  target?: string;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    key: "dashboard",
    path: "/",
  },
  {
    key: "forms",
    icon: <ListIcon />,
    path: "/data-kades",
  },
  {
    key: "tables",
    icon: <TableIcon />,
    path: "/petugas-tps",
  },
  {
    icon: <UserCircleIcon />,
    key: "userProfile",
    path: "/profile",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  const pathname = usePathname();
  const t = useTranslations("sidebar");

  const isActive = (path: string) => path === pathname;

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-1">
      {items.map((nav) => (
        <li key={nav.key}>
          {nav.path && (
            <Link
              href={nav.path}
              target={nav.target}
              className={cn(
                "group menu-item",
                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive",
              )}
            >
              <span
                className={cn(
                  isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive",
                )}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{t(`items.${nav.key}`)}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out xl:mt-0 rtl:right-0 rtl:left-auto rtl:border-r-0 rtl:border-l dark:border-gray-800 dark:bg-gray-900 ${
        isExpanded || isMobileOpen ? "w-72.5" : isHovered ? "w-72.5" : "w-22.5"
      } ${
        isMobileOpen
          ? "translate-x-0"
          : "-translate-x-full rtl:translate-x-full"
      } xl:translate-x-0 xl:rtl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={`flex py-4 ${
          !isExpanded && !isHovered ? "xl:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/village.png"
                alt="Logo"
                width={120}
                height={40}
                priority
                style={{ width: "auto", height: "auto" }}
              />

              <Image
                className="hidden dark:block"
                src="/images/logo/village.png"
                alt="Logo"
                width={120}
                height={40}
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs leading-5 text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "xl:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("groups.menu")
                ) : (
                  <HorizontaLDots />
                )}
              </h2>

              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
