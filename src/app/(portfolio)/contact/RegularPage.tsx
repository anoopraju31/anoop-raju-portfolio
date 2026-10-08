'use client';

import { type FC } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiArrowUpRight } from 'react-icons/fi';
import ContactForm from './components/contactForm';
import ContactWrapper from './components/contactWrapper/ContactWrapper';
import styles from './styles.module.css';

const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/anoopraju31', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anoop-raju', icon: FiLinkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/', icon: FiInstagram },
];

const RegularPage: FC = () => {
  return (
    <section className={styles.contact__page}>
      <div className={styles.wrapper}>
        {/* Editorial Header */}
        <div className={styles.hero_header}>
          <div className={styles.eyebrow}>
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-light-green" />
            <span>{'//'} INITIATE CONTACT</span>
          </div>

          <h1 className={styles.heading}>
            Let&apos;s build something{' '}
            <span className="text-light-green underline decoration-light-green/30 decoration-wavy underline-offset-8">
              exceptional
            </span>{' '}
            together.
          </h1>

          <p className={styles.subheading}>
            Have an ambitious project, creative concept, or engineering challenge? Whether it&apos;s crafting
            high-performance full-stack web applications, interactive visual experiences, or resilient cloud
            architecture — my inbox is always open.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className={styles.container}>
          {/* Left: Contact Info & Availability */}
          <div className={styles.contact__container}>
            {/* Availability Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-light-green opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-light-green" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-light-green">
                  Available for new opportunities
                </span>
              </div>
              <p className="text-sm font-light leading-relaxed text-white/80 sm:text-base">
                Open to freelance contracts, consulting, and full-time engineering roles. Typically responding within 24
                hours.
              </p>
            </div>

            {/* Contact Items */}
            <div className={styles.contact__inner__container}>
              <ContactWrapper
                id="email_address"
                label="Email"
                content="anoop2019@iiitkottayam.ac.in"
                href="mailto:anoop2019@iiitkottayam.ac.in"
                icon={<FiMail />}
                copyable
              />

              <ContactWrapper
                id="phone_number"
                label="Phone"
                content="+91 8921222748"
                href="tel:+918921222748"
                icon={<FiPhone />}
                copyable
              />

              <ContactWrapper id="location" label="Location" content="Bengaluru & Kerala, India" icon={<FiMapPin />} />
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                {'//'} CONNECT ON SOCIALS
              </span>
              <div className="flex flex-wrap gap-2.5">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-light-green hover:bg-light-green hover:text-dark-blue sm:text-sm"
                    >
                      <Icon className="text-sm" />
                      <span>{social.name}</span>
                      <FiArrowUpRight className="text-xs opacity-60 transition-transform duration-300 group-hover:rotate-45" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Glassmorphic Contact Form */}
          <div className={styles.form__container}>
            {/* Ambient Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-light-green/10 blur-[80px]" />

            <div className="relative z-10 mb-6">
              <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-light-green">
                {'//'} SEND A MESSAGE
              </span>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Let&apos;s start a project</h2>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegularPage;
