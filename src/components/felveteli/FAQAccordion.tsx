"use client";

import React from "react";
import { ExpandableSection } from "@/components/ExpendableSection";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/utils";

export function FAQAccordion() {
  const { lang } = useLanguage();

  const faqs = [
    {
      q: t(lang, "Miben más a Rajk, mint egy sima kollégium?", "How is Rajk different from a regular dorm?"),
      a: t(lang, 
        "A legtöbb egyetemi kollégium csupán lakhatást nyújt, a Rajkban viszont egy szoros, vitákra és közös gondolkodásra épülő közösségben élünk. Nemcsak egymás mellett lakunk: a kollégiumunk egyfajta minidemokráciaként működik, ahol minden fontos döntést maguk a kollégisták hoznak meg. A rajkosság tehát nem csak tagság, hanem aktív szerepvállalás. Itt olyan készségeket és felelősségtudatot kapsz, amit az egyetemi padsorokban nem lehet elsajátítani. Ez a közösségi élmény és szakmai alap egy életre szól.",
        "Most university dorms only provide housing, but in Rajk, we live in a close-knit community built on debates and collective thinking. We don't just live next to each other: our college operates as a kind of mini-democracy where all important decisions are made by the students themselves. Being a member of Rajk is not just membership, but active involvement. Here you gain skills and a sense of responsibility that cannot be acquired in university lecture halls. This community experience and professional foundation last a lifetime."
      )
    },
    {
      q: t(lang, "Csak egy szakkollégiumba lehet jelentkezni?", "Can you only apply to one college for advanced studies?"),
      a: t(lang, 
        "Igen. Ezért is ajánljuk, hogy vegyetek részt minél több programon és találjátok meg a hozzátok legjobban illő szakkollégiumot.",
        "Yes. That's why we recommend participating in as many programs as possible and finding the college that best fits you."
      )
    },
    {
      q: t(lang, "Mik a végzés feltételei?", "What are the requirements for graduation?"),
      a: t(lang, 
        "A Rajkban kritérium félévente egy kurzus teljesítése, és a végzésig egy elfogadott TDK megírása. Ezen felül egy budapesti mesterszak elvégzése az alapszak után.",
        "In Rajk, the criteria include completing one course per semester and writing an accepted TDK thesis by graduation. Additionally, completing a master's degree in Budapest after the undergraduate degree is required."
      )
    },
    {
      q: t(lang, "Milyen kurzusokon vehetek részt?", "What kind of courses can I participate in?"),
      a: t(lang, 
        "Bármilyenen, ami érdekel! A kurzusszervezésben a kollégisták aktívan részt vehetnek, egy kurzuson nagyjából 4-8 fő vesz részt. Amellett, hogy szakmailag kiváló tanárokat kérünk fel, az alacsony létszám lehetővé teszi az interaktivitást, ami igazi felüdülés a frontális oktatás után.",
        "Anything that interests you! Students are actively involved in organizing courses, with roughly 4-8 participants per course. Besides inviting professionally excellent teachers, the small number of participants allows for interactivity, which is a real refreshment after frontal education."
      )
    },
    {
      q: t(lang, "Kötelező beköltözni?", "Is it mandatory to move in?"),
      a: t(lang, 
        "A felvétellel minden új tag automatikusan kap helyet a kollégiumban. A beköltözés nem kötelező, viszont annál jobban ajánlott. Tapasztalataink szerint a Budapest és agglomerációban lakók is a hét nagy részét bent töltik, hiszen rengeteg spontán szerveződő program, tartalmas beszélgetés és közös bulizás várja őket.",
        "With admission, every new member automatically receives a spot in the dormitory. Moving in is not mandatory, but highly recommended. In our experience, even those living in Budapest and its agglomeration spend most of their week inside, as plenty of spontaneously organized programs, meaningful conversations, and parties await them."
      )
    },
    {
      q: t(lang, "Kell kollégiumi díjat fizetni?", "Do I have to pay a dormitory fee?"),
      a: t(lang, 
        "Mint minden szakkollégiumban és kollégiumban, a Rajkban is kell fizetni egy meghatározott havi díjat. Ez azonban nem csak a lakhatást fedezi, hanem a kurzusokat és az olyan exkluzív szakmai programokat is, mint a díjas mesterkurzusokon való részvétel. Kollégiumi díjrendszerünk sávos, ami azt jelenti, hogy az aktuális standard sávon kívül a kollégisták fizethetnek alacsonyabb vagy magasabb díjat anyagi helyzetüktől függően.",
        "Like in every college for advanced studies and dormitory, a specific monthly fee must be paid in Rajk. However, this covers not only housing but also courses and exclusive professional programs like participating in award-winning masterclasses. Our dormitory fee system is tiered, meaning that besides the current standard tier, students can pay lower or higher fees depending on their financial situation."
      )
    },
    {
      q: t(lang, "Kiket várunk a Rajkba?", "Who are we looking for in Rajk?"),
      a: t(lang, 
        "Első- és másodéves hallgatók adhatják le a jelentkezésüket a Corvinus minden szakáról és az ELTE TáTK-ról. Téged várunk, ha érdekel a körülötted lévő világ, és többet szeretnél kihozni az egyetemi évekből. Ha keresed a szakmai utadat. Ha szeretnél fejlődni emberileg. Ha fentmaradnál hajnalig az élet értelméről beszélgetni.",
        "First- and second-year students can apply from all Corvinus majors and ELTE TáTK. We are looking for you if you're interested in the world around you and want to get more out of your university years. If you're looking for your professional path. If you want to grow as a person. If you'd stay up until dawn talking about the meaning of life."
      )
    },
    {
      q: t(lang, "Mire figyeljek a felvételin, mivel kell készülni?", "What should I pay attention to during admission, and how should I prepare?"),
      a: t(lang, 
        "Arra, hogy add önmagadat! A felvételin arra leszünk kíváncsiak szóban és írásban is, hogy hogyan vélekedsz a téged körülvevő világról.",
        "Be yourself! During the admission process, both orally and in writing, we are interested in your views on the world surrounding you."
      )
    },
    {
      q: t(lang, "Tudok dolgozni rajkosság mellett?", "Can I work while being a member of Rajk?"),
      a: t(lang, 
        "Jelenleg az aktív tagság mellett többen is dolgoznak, végeznek szakmai gyakorlatot.",
        "Currently, several active members work or do internships alongside their membership."
      )
    },
    {
      q: t(lang, "Lesz lehetőségem Erasmus féléven részt venni, ha Rajkos leszek?", "Will I have the opportunity to participate in an Erasmus semester if I'm in Rajk?"),
      a: t(lang, 
        "A rajkosság mellett semmi akadálya a külföldi félévnek. Ezen felül az Odüsszeusz programunkkal anyagilag támogatjuk a téli és nyári egyetemeken való részvételt a tagság számára.",
        "Being a member of Rajk is no obstacle to a semester abroad. Additionally, through our Odysseus program, we financially support participation in winter and summer universities for our members."
      )
    },
    {
      q: t(lang, "Hányan vannak a Rajkban?", "How many people are in Rajk?"),
      a: t(lang, 
        "90 fő körül mozog az aktív tagság létszáma.",
        "The number of active members is around 90."
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-black mb-12 text-rajk-green underline">
        {t(lang, "Gyakran Ismételt Kérdések", "Frequently Asked Questions")}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-rajk-green/20 pb-2">
            <ExpandableSection 
              title={faq.q} 
              className="text-rajk-green font-bold"
            >
              <p className="text-black font-normal leading-relaxed pb-4">
                {faq.a}
              </p>
            </ExpandableSection>
          </div>
        ))}
      </div>
    </div>
  );
}
