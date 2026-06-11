import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const FIELDS = [
  {
    name: "name",
    label: "Jméno",
    placeholder: "Vaše jméno",
    type: "text",
    required: true,
    full: false,
  },
  {
    name: "email",
    label: "E-mail",
    placeholder: "vy@email.cz",
    type: "email",
    required: true,
    full: false,
  },
  {
    name: "destination",
    label: "Kam chcete jet?",
    placeholder: "Např. Brazílie, Japonsko…",
    type: "text",
    required: false,
    full: false,
  },
  {
    name: "when",
    label: "Kdy přibližně?",
    placeholder: "Měsíc / rok",
    type: "text",
    required: false,
    full: false,
  },
  {
    name: "people",
    label: "Kolik osob cestuje?",
    placeholder: "Např. 2 dospělí + 1 dítě",
    type: "text",
    required: false,
    full: false,
  },
  {
    name: "budget",
    label: "Orientační rozpočet",
    placeholder: "Přibližně",
    type: "text",
    required: false,
    full: false,
  },
  {
    name: "style",
    label: "Jaký styl dovolené hledáte?",
    placeholder: "Odpočinek, zážitky, dobrodružství, komfort…",
    type: "text",
    required: false,
    full: true,
  },
] as const;

const inputCls =
  "w-full rounded-lg border border-border bg-input/40 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-neon-pink focus:bg-input/80 focus:ring-2 focus:ring-neon-pink/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body =
      `Jméno: ${fd.get("name")}\n` +
      `E-mail: ${fd.get("email")}\n` +
      `Kam: ${fd.get("destination")}\n` +
      `Kdy: ${fd.get("when")}\n` +
      `Počet osob: ${fd.get("people")}\n` +
      `Rozpočet: ${fd.get("budget")}\n` +
      `Styl dovolené: ${fd.get("style")}\n\n` +
      `Zpráva:\n${fd.get("message")}`;
    const mail = `mailto:info@holidayanddreams.cz?subject=${encodeURIComponent(
      "Poptávka — návrh dovolené na míru",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mail;
    setSent(true);
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border bg-card/60 p-10 text-center backdrop-blur"
        >
          <motion.span
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink to-neon-cyan text-background"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
          >
            <Check className="h-7 w-7" strokeWidth={3} />
          </motion.span>
          <p className="mt-5 font-display text-2xl text-cream">
            Děkuji za zprávu.
          </p>
          <p className="mt-3 text-muted-foreground">Ozvu se vám co nejdříve.</p>
        </motion.div>
      ) : (
        <Stagger
          key="form"
          as="form"
          each={0.06}
          onSubmit={onSubmit}
          className="grid gap-5 md:grid-cols-2"
        >
          {FIELDS.map((f) => (
            <StaggerItem
              key={f.name}
              className={f.full ? "md:col-span-2" : "md:col-span-1"}
            >
              <label className="mb-2 block text-sm text-muted-foreground">
                {f.label}
              </label>
              <input
                name={f.name}
                type={f.type}
                required={f.required}
                className={inputCls}
                placeholder={f.placeholder}
              />
            </StaggerItem>
          ))}
          <StaggerItem className="md:col-span-2">
            <label className="mb-2 block text-sm text-muted-foreground">
              Zpráva
            </label>
            <textarea
              name="message"
              rows={5}
              className={inputCls}
              placeholder="Cokoliv, co je dobré vědět."
            />
          </StaggerItem>
          <StaggerItem className="md:col-span-2 mt-2 flex justify-center">
            <motion.button
              type="submit"
              className="btn-primary"
              whileTap={{ scale: 0.96 }}
            >
              Odeslat poptávku
            </motion.button>
          </StaggerItem>
        </Stagger>
      )}
    </AnimatePresence>
  );
}
