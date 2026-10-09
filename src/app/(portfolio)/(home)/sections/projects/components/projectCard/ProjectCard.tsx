'use client';

import { cn } from '@/utills';
import type { FC } from 'react';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import AnimateCharacterByCharacter from '@/components/AnimateCharacterByCharacter';

type ProjectCardProps = {
  img: string;
  id: number;
  name: string;
  year: string;
  deployedUrl?: string;
  tools?: string[];
};

const defaultTools: Record<number, string[]> = {
  1: ['Next.js', 'Firebase', 'TailwindCSS'],
  2: ['Next.js', 'TypeScript', 'Framer Motion'],
  3: ['React', 'OpenAI GPT', 'TailwindCSS'],
  4: ['React', 'OpenAI GPT', 'TMDB API'],
  5: ['React', 'TailwindCSS', 'JavaScript'],
};

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { img, id, name, year, deployedUrl, tools } = props;
  const currentCardId = useAppSelector((state) => state.projectCardHover.cardId);
  const isHovered = currentCardId === id;
  const indexStr = String(id).padStart(2, '0');
  const projectTools = tools && tools.length > 0 ? tools : defaultTools[id] || ['React', 'Next.js', 'TypeScript'];
  const displayTools = projectTools.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className={cn(
        'relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-500',
        isHovered
          ? 'border-light-green/45 bg-dark-blue shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(76,252,15,0.15)]'
          : 'border-white/15 bg-dark-blue/90 shadow-2xl',
      )}
    >
      {/* Image Background & Zoom */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <Image
            src={img}
            alt={name || img}
            width={1200}
            height={800}
            priority
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Multi-tier Gradient Vignette Overlays */}
        <div className="pointer-events-none absolute inset-0 h-32 bg-gradient-to-b from-dark-blue/80 via-transparent to-transparent" />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-500',
            isHovered
              ? 'bg-gradient-to-t from-dark-blue via-dark-blue/60 to-dark-blue/20 opacity-95'
              : 'bg-gradient-to-t from-dark-blue/95 via-dark-blue/60 to-black/30 opacity-90',
          )}
        />
      </div>

      {/* Card Header Bar (Always Visible) */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 p-5 lg:p-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-dark-blue/70 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/90 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-light-green" />
          <span>
            [{indexStr} {isHovered ? '// FEATURED' : ''}]
          </span>
        </div>

        {year && (
          <span className="rounded-full border border-white/10 bg-dark-blue/70 px-2.5 py-1 font-mono text-xs tracking-wider text-white/70 backdrop-blur-md">
            {year}
          </span>
        )}
      </div>

      {/* Card Bottom Area */}
      <div className="relative z-20 overflow-hidden p-5 lg:p-6">
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              {/* Tech Stack Pills (Animated one at a time) */}
              <div className="flex flex-wrap items-center gap-2">
                {displayTools.map((tool, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.04 + idx * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-light-green/30 bg-light-green/10 px-3 py-1 font-mono text-[11px] tracking-wider text-light-green shadow-sm backdrop-blur-md"
                  >
                    <span className="h-1 w-1 rounded-full bg-light-green" />
                    <span>{tool}</span>
                  </motion.span>
                ))}
              </div>

              {/* Project Name (Animated word by word) */}
              <h3 className="text-3xl font-extrabold capitalize leading-tight tracking-tight text-white drop-shadow-lg lg:text-5xl">
                {name ? <AnimateCharacterByCharacter wordGap={10} paragraph={name} /> : null}
              </h3>

              <div className="flex items-center gap-3 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.04 + displayTools.length * 0.06 + (name ? name.split(' ').length : 1) * 0.06 + 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-light-green/40 bg-light-green/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-light-green shadow-lg shadow-black/40 backdrop-blur-md"
                >
                  <span>Explore Project</span>
                  <FiArrowUpRight size={15} />
                </motion.div>

                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.04 + displayTools.length * 0.06 + (name ? name.split(' ').length : 1) * 0.06 + 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-mono text-xs text-white/50"
                >
                  [Click to launch]
                </motion.span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-1"
            >
              <span className="truncate font-mono text-[11px] uppercase tracking-wider text-light-green/80">
                {displayTools[0]}
              </span>
              <h4 className="line-clamp-1 truncate text-lg font-bold tracking-tight text-white lg:text-xl">{name}</h4>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
