"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
    { label: "Users", href: "/users" },
  ];

  const currentPath = usePathname();
  const firstPath = "/" + currentPath.split("/")[1];

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          key={link.label}
          className={`navbar-link ${
            firstPath === link.href &&
            "cursor-default text-primary/70 hover:text-primary/60"
          }`}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
export default MainNavLinks;
