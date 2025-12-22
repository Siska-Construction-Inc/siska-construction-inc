'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ProjectsHeader() {
  const { t } = useTranslation("home");

  return (
    <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">{t("projects.title")}</p>
      </div>
      <Link href="/projects" className="text-sm font-semibold text-neutral-700 transition hover:text-neutral-900">
        {t("projects.cta")}
      </Link>
    </div>
  );
}