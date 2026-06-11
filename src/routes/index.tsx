import { useRef, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ChevronDown,
  Check,
  Route as RouteIcon,
  CalendarDays,
  ShieldCheck,
  ArrowUpRight,
  Sparkle,
} from "lucide-react";
import heroOcean from "@/assets/hero-ocean.jpg";
import brazilRio from "@/assets/brazil-rio.jpg";
import brazilIguazu from "@/assets/brazil-iguazu.jpg";
import brazilNoronha from "@/assets/brazil-noronha.jpg";
import brazilSalvador from "@/assets/brazil-salvador.jpg";
import { ContactForm } from "@/components/ContactForm";
import { Logo } from "@/components/Logo";
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
      { property: "og:image", content: heroOcean },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen text-foreground">
      <div className="aurora" aria-hidden />
      <div className="grain" aria-hidden />
      <SiteHeader />
      <Hero />
      <DestinationsMarquee />
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
          <motion.p
            variants={item}
            className="mt-8 flex items-center gap-2.5 text-sm text-cream/60"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            Přijímám nové poptávky na rok {new Date().getFullYear()}
          </motion.p>
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

/* ---------------- Destinations marquee ---------------- */
const DESTINATIONS = [
  "Rio de Janeiro",
  "Fernando de Noronha",
  "Tokio",
  "Bali",
  "Maledivy",
  "Miami",
  "Kapské Město",
  "Amalfi",
  "Patagonie",
  "Santorini",
];

function DestinationsMarquee() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-b border-white/5 py-5"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-14 pr-14">
            {DESTINATIONS.map((d) => (
              <span
                key={d}
                className="flex items-center gap-14 text-xs tracking-[0.35em] whitespace-nowrap text-cream/45 uppercase"
              >
                {d}
                <Sparkle className="h-3 w-3 text-neon-cyan/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
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
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-border">
                <group.icon
                  className="h-5 w-5 text-neon-cyan"
                  strokeWidth={1.5}
                />
              </span>
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
          <StaggerItem key={s.t} as="li" className="h-full">
            <SpotlightCard className="card-glow group relative h-full rounded-2xl border border-border bg-card/80 p-8 transition hover:-translate-y-1">
              <span className="font-display text-5xl text-neon-cyan/60 transition group-hover:text-neon-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl text-cream">{s.t}</h3>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </SpotlightCard>
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

/** Card wrapper that feeds the pointer position to the .card-spotlight halo. */
function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
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
              className="relative mx-auto mt-10 inline-block rounded-3xl gradient-border px-12 py-10 backdrop-blur"
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
            tag="Ikonické město"
            className="col-span-2 aspect-[16/10]"
          />
          <ShowcaseImage
            src={brazilIguazu}
            alt="Vodopády Iguazú"
            tag="Příroda"
            className="aspect-square"
          />
          <ShowcaseImage
            src={brazilNoronha}
            alt="Fernando de Noronha"
            tag="Tropický ostrov"
            className="aspect-square"
          />
          <ShowcaseImage
            src={brazilSalvador}
            alt="Salvador de Bahia"
            tag="Kultura"
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
  tag,
  className,
}: {
  src: string;
  alt: string;
  tag: string;
  className: string;
}) {
  return (
    <StaggerItem
      as="figure"
      className={`group relative overflow-hidden rounded-2xl ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={1280}
        className="img-reveal h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 pt-14">
        <span className="font-display text-lg leading-tight text-cream">
          {alt}
        </span>
        <span className="mb-1 text-[0.6rem] tracking-[0.25em] whitespace-nowrap text-cream/70 uppercase">
          {tag}
        </span>
      </figcaption>
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
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-card/50 backdrop-blur">
              <Logo className="h-28 w-28" />
            </div>
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
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal as="p" className="max-w-md text-lg text-muted-foreground">
            Pošlete mi základní informace a ozvu se vám s dalším postupem.
            Poptávka je nezávazná.
          </Reveal>
          <Reveal delay={0.05}>
            <a
              href="mailto:info@holidayanddreams.cz"
              className="group mt-8 inline-flex items-center gap-2 font-display text-xl text-cream transition hover:text-neon-cyan md:text-2xl"
            >
              info@holidayanddreams.cz
              <ArrowUpRight className="h-5 w-5 text-neon-cyan transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
          <Stagger as="ul" delay={0.1} className="mt-10 space-y-3">
            {[
              "Odpovídám zpravidla do 24 hodin",
              "Konzultace online i osobně",
              "Návrh na míru, žádný katalog",
            ].map((t) => (
              <StaggerItem
                key={t}
                as="li"
                className="flex items-center gap-3 text-cream/80"
              >
                <Check
                  className="h-4 w-4 shrink-0 text-neon-pink"
                  strokeWidth={2.5}
                />
                {t}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal
          delay={0.1}
          from="right"
          className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur lg:col-span-3 md:p-10"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Footer ---------------- */
function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-x-0 top-0 neon-divider" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo className="h-12 w-12" />
            <p className="mt-6 font-display text-3xl text-cream">
              Holidays <em className="text-shimmer not-italic">&amp;</em> Dreams
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Travel architekt — návrh dovolené na míru
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm md:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
              {[
                { href: "#sluzba", label: "Služba" },
                { href: "#jak-to-funguje", label: "Jak to funguje" },
                { href: "#cena", label: "Cena" },
                { href: "#kontakt", label: "Kontakt" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition hover:text-cream"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href="mailto:info@holidayanddreams.cz"
              className="text-cream/80 transition hover:text-neon-cyan"
            >
              info@holidayanddreams.cz
            </a>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Holidays and Dreams</p>
          <p className="tracking-[0.2em] uppercase">
            Navrženo s láskou k cestování
          </p>
        </div>
      </div>
    </footer>
  );
}
