import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const NAV = [
  { href: "sluzba", label: "Služba" },
  { href: "jak-to-funguje", label: "Jak to funguje" },
  { href: "cena", label: "Cena" },
  { href: "ukazka", label: "Ukázka" },
  { href: "o-mne", label: "O mně" },
];

/** Thin neon line along the top edge showing reading progress. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
      style={{ scaleX, background: "var(--gradient-neon)" }}
    />
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useScrollSpy(NAV.map((n) => n.href));

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <ScrollProgress />
      <div className="px-4 pt-4">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "oklch(0.16 0.012 260 / 0.72)"
              : "oklch(0.16 0.012 260 / 0.28)",
            borderColor: scrolled
              ? "oklch(0.96 0.01 80 / 0.1)"
              : "oklch(0.96 0.01 80 / 0.05)",
            boxShadow: scrolled
              ? "0 16px 40px -20px oklch(0 0 0 / 0.7)"
              : "0 0 0 0 oklch(0 0 0 / 0)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-xl sm:px-5"
          // Pin the blurred bar to its own GPU layer. Without this, Safari
          // re-tears the backdrop every frame as high-contrast content (the grid
          // tiles / step cards) scrolls underneath, which reads as flicker.
          style={{ transform: "translateZ(0)", willChange: "backdrop-filter" }}
        >
          <a href="#top" className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="hidden text-sm tracking-[0.18em] text-cream/80 sm:inline">
              HOLIDAYS &amp; DREAMS
            </span>
          </a>

          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                className="group relative py-1 transition hover:text-cream"
                data-active={active === item.href}
              >
                <span
                  className={active === item.href ? "text-cream" : undefined}
                >
                  {item.label}
                </span>
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-300 group-hover:w-full"
                  style={{ width: active === item.href ? "100%" : "0%" }}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#kontakt" className="hidden btn-ghost sm:inline-flex">
              Kontakt
            </a>
            <button
              type="button"
              aria-label="Otevřít menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-neon-pink hover:text-neon-pink md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string | null;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="flex items-center gap-3 text-sm tracking-[0.18em] text-cream/80">
              <Logo className="h-8 w-8" />
              HOLIDAYS &amp; DREAMS
            </span>
            <button
              type="button"
              aria-label="Zavřít menu"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-neon-pink hover:text-neon-pink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <motion.nav
            className="flex flex-1 flex-col justify-center gap-2 px-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
            }}
          >
            {[...NAV, { href: "kontakt", label: "Kontakt" }].map((item) => (
              <motion.a
                key={item.href}
                href={`#${item.href}`}
                onClick={onClose}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="font-display text-3xl text-cream/90 transition hover:text-neon-pink"
                data-active={active === item.href}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
