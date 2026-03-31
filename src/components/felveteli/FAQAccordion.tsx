"use client";

import React from "react";
import { ExpandableSection } from "@/components/ExpendableSection";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Faq } from "@/payload-types";

export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-black mb-12 text-rajk-green underline">
        {t(lang, "Gyakran Ismételt Kérdések", "Frequently Asked Questions")}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border-b border-rajk-green/20 pb-2">
            <ExpandableSection
              title={faq.question}
              className="text-rajk-green font-bold"
            >
              <div className="text-black font-normal leading-relaxed pb-4">
                <RichText data={faq.answer} />
              </div>
            </ExpandableSection>
          </div>
        ))}
      </div>
    </div>
  );
}
