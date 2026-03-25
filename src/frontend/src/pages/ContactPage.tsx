import { Clock, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import GoldButton from "../components/GoldButton";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Please enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  function update(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  return (
    <main className="min-h-screen pt-36 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-3">
            Get in Touch
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">
            Contact <span className="text-coral-main">Us</span>
          </h1>
          <div className="w-16 h-1 bg-coral-main rounded" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Left: info */}
          <div className="md:col-span-2 space-y-8">
            <p className="font-nunito text-sm text-foreground/60 leading-relaxed">
              We love to hear from collectors, stockists, and those simply
              curious about the craft. We read every message personally and
              respond within 2 business days.
            </p>

            {(
              [
                { icon: Mail, label: "Email", value: "hello@yourlogo.com" },
                {
                  icon: MapPin,
                  label: "Studio",
                  value: "Available by appointment",
                },
                {
                  icon: Clock,
                  label: "Response",
                  value: "Within 2 business days",
                },
              ] as const
            ).map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <Icon
                  size={16}
                  className="text-coral-main mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="font-nunito text-[11px] tracking-[0.2em] uppercase text-teal-main mb-1">
                    {label}
                  </p>
                  <p className="font-nunito text-sm text-foreground/60">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: form */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="contact.success_state"
                className="border border-teal-main/30 bg-teal-main/5 px-8 py-10 text-center rounded-lg"
              >
                <div className="w-12 h-1 bg-coral-main rounded mx-auto mb-6" />
                <h3 className="font-playfair text-2xl text-foreground mb-3">
                  Thank You
                </h3>
                <p className="font-nunito text-sm text-foreground/60">
                  Your message has been received. We&apos;ll be in touch soon.
                </p>
                <div className="w-12 h-1 bg-coral-main rounded mx-auto mt-6" />
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
                data-ocid="contact.modal"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-nunito text-[11px] tracking-[0.2em] uppercase text-foreground/50 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    autoComplete="name"
                    data-ocid="contact.input"
                    className="w-full bg-white border border-border text-foreground placeholder:text-foreground/30 px-4 py-3 text-sm font-nunito focus:outline-none focus:border-coral-main transition-colors rounded shadow-sm"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p
                      className="mt-1.5 text-xs text-destructive font-nunito"
                      data-ocid="contact.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-nunito text-[11px] tracking-[0.2em] uppercase text-foreground/50 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    autoComplete="email"
                    data-ocid="contact.input"
                    className="w-full bg-white border border-border text-foreground placeholder:text-foreground/30 px-4 py-3 text-sm font-nunito focus:outline-none focus:border-coral-main transition-colors rounded shadow-sm"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p
                      className="mt-1.5 text-xs text-destructive font-nunito"
                      data-ocid="contact.error_state"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-nunito text-[11px] tracking-[0.2em] uppercase text-foreground/50 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update("message")}
                    rows={5}
                    data-ocid="contact.textarea"
                    className="w-full bg-white border border-border text-foreground placeholder:text-foreground/30 px-4 py-3 text-sm font-nunito focus:outline-none focus:border-coral-main transition-colors resize-none rounded shadow-sm"
                    placeholder="Tell us how we can help…"
                  />
                  {errors.message && (
                    <p
                      className="mt-1.5 text-xs text-destructive font-nunito"
                      data-ocid="contact.error_state"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <GoldButton
                  type="submit"
                  size="lg"
                  data-ocid="contact.submit_button"
                >
                  Send Message
                </GoldButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
