'use client';

import { useTranslation } from "react-i18next";

import {
  contactEmail,
  contactMailtoHref,
  contactPerson,
  contactPhoneHref,
} from "@/lib/contact";

const wrapperClasses =
  "flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-white/95 p-10 text-left shadow-xl shadow-neutral-900/10 backdrop-blur";

const labelClasses = "text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500";

const valueClasses = "text-lg font-semibold text-neutral-900";

export function ContactInfo() {
  const { t } = useTranslation("common");

  return (
    <div className={wrapperClasses}>
      <div className="space-y-2">
        <p className={labelClasses}>{t("contact.title")}</p>
        <p className="text-sm text-neutral-600">{contactPerson}</p>
      </div>
      <div className="space-y-2">
        <p className={labelClasses}>{t("contact.phone")}</p>
        <a className={valueClasses} href={contactPhoneHref}>
          +420 737 340 795
        </a>
      </div>
      <div className="space-y-2">
        <p className={labelClasses}>{t("contact.email")}</p>
        <a className={valueClasses} href={contactMailtoHref}>
          {contactEmail}
        </a>
      </div>
    </div>
  );
}
