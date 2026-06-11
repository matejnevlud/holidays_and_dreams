import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ChevronDown,
  Check,
  Route as RouteIcon,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import heroOcean from "@/assets/hero-ocean.jpg";
import brazilRio from "@/assets/brazil-rio.jpg";
import brazilIguazu from "@/assets/brazil-iguazu.jpg";
import brazilNoronha from "@/assets/brazil-noronha.jpg";
import brazilSalvador from "@/assets/brazil-salvador.jpg";
import logoAsset from "@/assets/logo.png.asset.json";
import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useCountUp, formatThousands } from "@/hooks/use-count-up";

const EASE = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Holidays and Dreams — Dovolená navržená jako celek" },
      {
        name: "description",
        content:
          "Travel architekt. Návrh dovolené na míru — trasa, hotely, lety, zážitky a logistika promyšlené do detailu.",
      },
      {
        property: "og:title",
        content: "Holidays and Dreams — Travel architekt",
      },
      {
        property: "og:description",
        content:
          "Dovolená navržená jako celek. Individuální plán cesty pro lidi, kteří chtějí cestovat lépe a bez stresu.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grain" aria-hidden />
      <SiteHeader />
      <Hero />
      <NotAnAgency />
      <WhatYouGet />
      <HowItWorks />
      <Pricing />
      <Showcase />
      <About />
      <Contact />
      <SiteFooter />
    </main>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle parallax: image drifts down + fades slightly as you scroll past.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.img
        src={heroOcean}
        alt="Oceán a palmy při západu slunce"
        width={1920}
        height={1280}
        style={{ y: imageY }}
        className="ken-burns absolute inset-0 -z-10 h-[115%] w-full object-cover"
      />
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)", opacity: overlayOpacity }}
      />

      <motion.div
        className="mx-auto w-full max-w-6xl px-6 pt-32 pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={item} className="eyebrow">
            <span className="inline-block h-px w-8 bg-neon-cyan" />
            Travel architekt
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-6 text-balance fluid-hero font-display leading-[1.05] text-cream"
          >
            Dovolená navržená{" "}
            <em className="text-shimmer not-italic">jako celek</em>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-cream/85"
          >
            Jako travel architekt připravím cestu na míru — promyšlenou do
            detailu, bez zbytečného stresu a drahých chyb.
          </motion.p>
          <motion.p
            variants={item}
            className="mt-3 max-w-2xl text-muted-foreground"
          >
            Pro lidi, kteří chtějí cestovat lépe, pohodlněji a bez nekonečného
            hledání.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#kontakt"
              className="btn-primary"
              whileTap={{ scale: 0.96 }}
            >
              Chci navrhnout dovolenou
            </motion.a>
            <motion.a
              href="#jak-to-funguje"
              className="btn-ghost"
              whileTap={{ scale: 0.96 }}
            >
              Jak to funguje
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sluzba"
        aria-label="Posunout dolů"
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-cream/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-[0.65rem] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>

      <div className="absolute inset-x-0 bottom-0 neon-divider" />
    </section>
  );
}

/* ---------------- Section helpers ---------------- */
function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}
    >
      <Reveal>
        {eyebrow && (
          <span className="eyebrow">
            <span className="inline-block h-px w-8 bg-neon-cyan" />
            {eyebrow}
          </span>
        )}
        <h2 className="mt-5 max-w-3xl text-balance fluid-h2 font-display leading-tight text-cream">
          {title}
        </h2>
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/* ---------------- 2. Not an agency ---------------- */
function NotAnAgency() {
  return (
    <Section id="sluzba" eyebrow="Co dělám" title="Nejsem cestovní kancelář">
      <div className="grid gap-10 text-pretty text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
        <Reveal delay={0.05} as="p">
          Nenabízím katalogové zájezdy ani univerzální itineráře. Každou cestu
          navrhuji individuálně podle stylu, rozpočtu a očekávání klienta.
        </Reveal>
        <Reveal delay={0.15} as="p">
          Cílem není jen vybrat hotel a letenky. Cílem je vytvořit dovolenou,
          která dobře navazuje, má správné tempo a přinese zážitky, které by
          klient často sám nenašel.
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- 3. What you get ---------------- */
const WHAT_YOU_GET_GROUPS = [
  {
    label: "Trasa & doprava",
    icon: RouteIcon,
    items: ["Návrh trasy cesty", "Doporučené lety", "Logistika přesunů"],
  },
  {
    label: "Program & pobyt",
    icon: CalendarDays,
    items: [
      "Výběr hotelů",
      "Denní plán",
      "Restaurace a bary",
      "Zážitky a zajímavá místa",
    ],
  },
  {
    label: "Tipy & ochrana",
    icon: ShieldCheck,
    items: ["Praktické tipy", "Upozornění na chyby, kterým se vyhnout"],
  },
];

function WhatYouGet() {
  return (
    <Section eyebrow="Obsah návrhu" title="Co získáte">
      <Reveal as="p" className="max-w-3xl text-lg text-muted-foreground">
        Součástí návrhu může být vše, co je potřeba pro dobře promyšlenou
        dovolenou bez zbytečných chyb a ztráty času.
      </Reveal>
      <Stagger
        as="ul"
        each={0.12}
        className="mt-14 grid list-none grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border"
      >
        {WHAT_YOU_GET_GROUPS.map((group) => (
          <StaggerItem
            key={group.label}
            as="li"
            className="md:px-10 md:first:pl-0 md:last:pr-0"
          >
            <div className="flex items-center gap-3">
              <group.icon
                className="h-5 w-5 text-neon-cyan"
                strokeWidth={1.5}
              />
              <h3 className="text-xs font-medium tracking-[0.2em] text-neon-cyan uppercase">
                {group.label}
              </h3>
            </div>
            <ul className="mt-7 space-y-4">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-neon-pink"
                    strokeWidth={2.5}
                  />
                  <span className="text-cream/90">{item}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------- 4. How it works ---------------- */
function HowItWorks() {
  const steps = [
    {
      t: "Pošlete mi poptávku",
      d: "Napíšete mi základní představu, kam chcete jet, kdy, s kým a jaký máte přibližný rozpočet.",
    },
    {
      t: "Upřesníme styl cesty",
      d: "Podíváme se na to, jestli hledáte odpočinek, zážitky, dobrodružství, komfort nebo kombinaci všeho.",
    },
    {
      t: "Připravím návrh dovolené na míru",
      d: "Navrhnu cestu tak, aby dávala smysl jako celek — od trasy přes hotely až po konkrétní doporučení.",
    },
    {
      t: "Vy si vše jednoduše rezervujete",
      d: "Dostanete připravený plán, podle kterého si jednotlivé části cesty můžete zarezervovat.",
    },
  ];
  return (
    <Section id="jak-to-funguje" eyebrow="Postup" title="Jak to funguje">
      <Stagger
        as="ol"
        className="grid list-none gap-8 md:grid-cols-2"
        each={0.1}
      >
        {steps.map((s, i) => (
          <StaggerItem
            key={s.t}
            as="li"
            className="card-glow group relative rounded-2xl border border-border bg-card/80 p-8 transition hover:-translate-y-1"
          >
            <span className="font-display text-5xl text-neon-cyan/60 transition group-hover:text-neon-cyan">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl text-cream">{s.t}</h3>
            <p className="mt-3 text-muted-foreground">{s.d}</p>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal
        as="p"
        delay={0.1}
        className="mt-10 max-w-2xl text-muted-foreground"
      >
        Pokud bude potřeba, můžeme si dát krátký videohovor a doladit detaily
        osobně.
      </Reveal>
    </Section>
  );
}

/* ---------------- 5. Pricing ---------------- */
function Pricing() {
  const { ref, display } = useCountUp(7000, { format: formatThousands });
  return (
    <section id="cena" className="border-y border-white/5 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="inline-block h-px w-8 bg-neon-cyan" />
              Cena
            </span>
            <h2 className="mt-5 fluid-h2 font-display text-cream">
              Kompletní návrh dovolené na míru
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative mx-auto mt-10 inline-block rounded-3xl border border-border bg-background/70 px-12 py-10 backdrop-blur"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              <motion.div
                className="absolute -inset-px rounded-3xl blur-lg"
                style={{ background: "var(--gradient-neon)" }}
                aria-hidden
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative">
                <p className="fluid-price font-display text-cream">
                  <span ref={ref}>{display}</span> Kč
                </p>
                <p className="mt-3 text-sm tracking-widest text-neon-pink/90 uppercase">
                  Jednorázová cena
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 text-muted-foreground">
              Jednorázová cena za individuálně připravený plán cesty.
            </p>
            <p className="mt-2 text-sm text-muted-foreground/80">
              U složitějších cest nebo prémiového rozsahu může být cena
              stanovena individuálně.
            </p>
            <div className="mt-10">
              <motion.a
                href="#kontakt"
                className="btn-primary"
                whileTap={{ scale: 0.96 }}
              >
                Chci navrhnout dovolenou
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. Showcase ---------------- */
function Showcase() {
  const bullets = [
    "Kombinace města, přírody a tropického ostrova",
    "Promyšlené přesuny bez zbytečného chaosu",
    "Výběr hotelů podle lokality a celkového konceptu cesty",
    "Prostor na zážitky i odpočinek",
    "Reálně otestované včetně cestování s dětmi",
  ];
  return (
    <Section id="ukazka" eyebrow="Případová studie" title="Ukázka reálné cesty">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal as="p" className="text-lg text-cream/90">
            Rodinná dovolená v Brazílii navržená kompletně na míru.
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="mt-5 font-display text-xl text-neon-cyan"
          >
            Rio de Janeiro → Iguazú → Salvador → Fortaleza → Fernando de Noronha
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 text-muted-foreground">
            Kombinace ikonických míst, autentické kultury a tropického relaxu,
            navržená tak, aby dávala smysl jako celek a zároveň byla
            zvládnutelná i s dětmi.
          </Reveal>
          <Reveal as="p" delay={0.15} className="mt-4 text-muted-foreground">
            Celá cesta byla plánovaná s důrazem na komfort, plynulou logistiku a
            vyvážený program bez zbytečného stresu.
          </Reveal>
          <Stagger as="ul" className="mt-8 space-y-3">
            {bullets.map((b) => (
              <StaggerItem key={b} as="li" className="flex gap-3 text-cream/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-pink" />
                {b}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal
            as="p"
            delay={0.1}
            className="mt-8 text-sm italic text-muted-foreground"
          >
            Každou cestu navrhuji individuálně podle klienta. Žádný plán není
            univerzální.
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-2 gap-4 lg:col-span-3" each={0.12}>
          <ShowcaseImage
            src={brazilRio}
            alt="Rio de Janeiro"
            className="col-span-2 aspect-[16/10]"
          />
          <ShowcaseImage
            src={brazilIguazu}
            alt="Vodopády Iguazú"
            className="aspect-square"
          />
          <ShowcaseImage
            src={brazilNoronha}
            alt="Fernando de Noronha"
            className="aspect-square"
          />
          <ShowcaseImage
            src={brazilSalvador}
            alt="Salvador, Bahia"
            className="col-span-2 aspect-[16/9]"
          />
        </Stagger>
      </div>
    </Section>
  );
}

function ShowcaseImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <StaggerItem as="figure" className="group overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={1280}
        className={`w-full object-cover transition duration-700 ease-out group-hover:scale-105 ${className}`}
      />
    </StaggerItem>
  );
}

/* ---------------- 7. About ---------------- */
function About() {
  const countries = useCountUp(50);
  const years = useCountUp(2);
  return (
    <section id="o-mne" className="border-y border-white/5 bg-card/20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-3 md:py-32">
        <div className="md:col-span-2">
          <Reveal>
            <span className="eyebrow">
              <span className="inline-block h-px w-8 bg-neon-cyan" />
              Kdo za tím stojí
            </span>
            <h2 className="mt-5 fluid-h2 font-display text-cream">
              Reálné cestovatelské zkušenosti, žádná cestovka
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <Reveal as="p" delay={0.05}>
              Holidays and Dreams je osobní projekt postavený na reálných
              cestovatelských zkušenostech.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Procestoval jsem více než{" "}
              <span className="text-cream">50 zemí</span>, dva roky žil v{" "}
              <span className="text-cream">Miami</span> a dlouhodobě se věnuji
              plánování cest, které kombinují pohodlí, zážitky, dobrou logistiku
              a autentická místa.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              Nenabízím katalogové zájezdy. Každou cestu navrhuji individuálně
              podle stylu, rozpočtu a očekávání klienta.
            </Reveal>
          </div>

          <Stagger className="mt-10 flex gap-10" each={0.12}>
            <StaggerItem>
              <p className="font-display text-4xl text-cream">
                <span ref={countries.ref}>{countries.display}</span>+
              </p>
              <p className="mt-1 text-sm tracking-widest text-muted-foreground uppercase">
                Zemí procestováno
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-display text-4xl text-cream">
                <span ref={years.ref}>{years.display}</span> roky
              </p>
              <p className="mt-1 text-sm tracking-widest text-muted-foreground uppercase">
                Život v Miami
              </p>
            </StaggerItem>
          </Stagger>
        </div>

        <Reveal from="right" className="flex items-start md:justify-end">
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-full blur-2xl"
              style={{ background: "var(--gradient-neon)" }}
              aria-hidden
              animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <img
              src={logoAsset.url}
              alt="Holidays and Dreams logo"
              className="relative h-48 w-48 rounded-full object-cover ring-1 ring-white/10"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 8. Contact ---------------- */
function Contact() {
  return (
    <Section
      id="kontakt"
      eyebrow="Kontakt"
      title="Chcete navrhnout dovolenou na míru?"
    >
      <Reveal as="p" className="max-w-2xl text-lg text-muted-foreground">
        Pošlete mi základní informace a ozvu se vám s dalším postupem.
      </Reveal>
      <Reveal
        delay={0.1}
        className="mt-12 rounded-3xl border border-border bg-card/40 p-6 backdrop-blur md:p-10"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        <ContactForm />
      </Reveal>
    </Section>
  );
}

/* ---------------- Footer ---------------- */
function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Holidays and Dreams
          </p>
        </div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Travel architekt — návrh dovolené na míru
        </p>
      </div>
    </footer>
  );
}
