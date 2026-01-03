'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const primaryButtonClasses =
  "rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-50 shadow-lg transition hover:bg-neutral-700";
const secondaryButtonClasses =
  "rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:text-neutral-900";

export function Hero({ latestProject, translation }: { latestProject?: any; translation?: any }) {
  const { t } = useTranslation("home");

  const buttonHref = "/projects";
  const projectHref = latestProject ? `/projects/${latestProject.id}` : "/projects";

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,15,15,0.08),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
        <div className="space-y-8">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="max-w-xl text-base text-neutral-600 sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={buttonHref} className={primaryButtonClasses}>
              {t("hero.ctaPrimary")}
            </Link>
            <a href="#contact" className={secondaryButtonClasses}>
              {t("hero.ctaSecondary")}
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-neutral-500 sm:flex-row sm:items-center">
            <span className="font-semibold text-neutral-700">{t("hero.meta.projects")}</span>
            <span className="hidden h-px flex-1 bg-neutral-200 sm:block" />
            <span>{t("hero.meta.subtitle")}</span>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-50 shadow-2xl shadow-neutral-900/10 transition hover:-translate-y-1 hover:shadow-xl">
          <Link href={projectHref} className="block">
            <div className="relative aspect-4/3 overflow-hidden">
              {latestProject ? (
                <Image
                  src={latestProject.coverImage}
                  alt={translation?.name || "Latest project"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="aspect-4/3 bg-[url('https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
              )}
              {latestProject && (
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-stone-900/80 via-transparent">
                  <div className="absolute bottom-6 left-6 right-6 space-y-2 text-stone-50">
                    <h3 className="text-2xl font-semibold leading-tight">
                      {translation?.name}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </Link>
          <div className="flex items-center justify-between border-t border-neutral-200 bg-white/80 px-6 py-4 text-xs text-neutral-500">
            <span className="font-semibold uppercase tracking-[0.3em] text-neutral-700">
              {t("hero.meta.caption")}
            </span>
            <span>{latestProject?.location || t("hero.meta.location")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
