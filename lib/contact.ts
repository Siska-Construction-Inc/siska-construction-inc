import type { Locale } from "@/lib/i18n/settings";
import {
  CONTACT_EMAIL,
  CONTACT_PERSON,
  MAIL_BODY_CS,
  MAIL_BODY_EN,
  MAIL_SUBJECT_CS,
  MAIL_SUBJECT_EN,
  PHONE_DISPLAY_CS,
  PHONE_HREF_CS,
  PHONE_DISPLAY_EN,
  PHONE_HREF_EN,
} from "@/components/constants";

export const contactEmail = CONTACT_EMAIL;
export const contactPerson = CONTACT_PERSON;
const mailMap: Record<Locale, { subject: string; body: string }> = {
  cs: {
    subject: MAIL_SUBJECT_CS,
    body: MAIL_BODY_CS,
  },
  en: {
    subject: MAIL_SUBJECT_EN,
    body: MAIL_BODY_EN,
  },
};

export function getContactMailto(locale: Locale) {
  const parts = mailMap[locale] ?? mailMap.cs;
  return `mailto:${CONTACT_EMAIL}?subject=${parts.subject}&body=${parts.body}`;
}

const phoneMap: Record<Locale, { display: string; href: string }> = {
  cs: {
    display: PHONE_DISPLAY_CS,
    href: PHONE_HREF_CS,
  },
  en: {
    display: PHONE_DISPLAY_EN,
    href: PHONE_HREF_EN,
  },
};

export function getContactPhone(locale: Locale) {
  return phoneMap[locale] ?? phoneMap.cs;
}
