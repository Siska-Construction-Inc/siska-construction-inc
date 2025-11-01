'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { contactMailtoHref } from "@/lib/contact";

const linkClasses =
  "text-sm font-semibold text-neutral-600 transition hover:text-neutral-900 data-[active=true]:text-neutral-900";

const actionButtonClasses =
  "rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-neutral-50 shadow-sm transition hover:bg-neutral-700";

export function Header() {
  const { t } = useTranslation("common");
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { href: "/", label: t("navigation.home") },
      { href: "/#about", label: t("navigation.about") },
      { href: "/projects", label: t("navigation.projects") },
      { href: "/#contact", label: t("navigation.contact") },
    ],
    [t],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold uppercase tracking-[0.2em] text-neutral-900"
        >
          Siska Construction
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const baseHref = link.href.replace(/#.*/, "");
            const isActive =
              baseHref === "/"
                ? pathname === "/"
                : pathname.startsWith(baseHref);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses}
                data-active={isActive}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a href={contactMailtoHref} className={actionButtonClasses}>
            {t("cta.requestQuote")}
          </a>
        </div>
      </div>
    </header>
  );
}
