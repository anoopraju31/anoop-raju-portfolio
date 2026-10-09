'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

import useAppSelector from '@/hooks/useAppSelector';
import { cn } from '@/utills';

import styles from './styles.module.css';

export type ProjectCardProps = {
  id: number;
  number?: string;
  name: string;
  subtitle?: string;
  description?: string;
  img: string;
  alt: string;
  link: string;
  github?: string;
  year: string;
  category?: string;
  tools: string | string[];
  featured?: boolean;
  siteDomain?: string;
};

const ProjectCard: FC<ProjectCardProps> = ({
  id,
  number,
  name,
  subtitle,
  description,
  img,
  alt,
  tools,
  year,
  link,
  github,
  category,
  featured,
  siteDomain,
}) => {
  const currentCardId = useAppSelector((state) => state.projectCardHover.cardId);
  const isHovered = currentCardId === id;

  const toolsList = Array.isArray(tools) ? tools : tools.split('•').map((t) => t.trim());
  const displayDomain = siteDomain || link.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className={styles.cardWrapper}>
      {/* Browser Chrome Header */}
      <div className={cn(styles.chromeBar, styles.chromeBarRegular)}>
        <div className={styles.windowDots}>
          <span className={cn(styles.windowDot, styles.windowDotRed)} />
          <span className={cn(styles.windowDot, styles.windowDotYellow)} />
          <span className={cn(styles.windowDot, styles.windowDotGreen)} />
        </div>
        <span className={cn(styles.windowUrl, styles.windowUrlRegular)}>{displayDomain}</span>
        <span className="font-mono text-[11px] text-white/40">{year}</span>
      </div>

      {/* Interactive Image Frame */}
      <motion.div
        animate={{
          borderColor: isHovered ? 'rgba(76, 252, 15, 0.45)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered ? '0 20px 40px -15px rgba(76, 252, 15, 0.15)' : '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
        }}
        transition={{ duration: 0.4 }}
        className={cn(styles.imageFrame, styles.imageFrameRegular)}
      >
        {featured && (
          <div className={cn(styles.floatingBadge, styles.floatingBadgeRegular)}>
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-light-green" />
            <span>Featured</span>
          </div>
        )}

        <div className={styles.imageAspect}>
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <Image className={styles.img} src={img} alt={alt} width={1200} height={750} priority={id === 1} />
          </motion.div>
          <div className={cn(styles.imageOverlay, styles.imageOverlayRegular)} />
        </div>
      </motion.div>

      {/* Card Details & Metadata */}
      <div className={styles.detailsContainer}>
        <div className={cn(styles.metaHeader, styles.metaHeaderRegular)}>
          <span className={styles.numberBadge}>{number || `0${id}`}</span>
          {category && <span className={cn(styles.categoryPill, styles.categoryPillRegular)}>{category}</span>}
        </div>

        <div className={styles.titleGroup}>
          <h3 className={cn(styles.projectName, styles.projectNameRegular)}>{name}</h3>
          {subtitle && <p className={cn(styles.projectSubtitle, styles.projectSubtitleRegular)}>{subtitle}</p>}
        </div>

        {description && (
          <p className={cn(styles.projectDescription, styles.projectDescriptionRegular)}>{description}</p>
        )}

        {/* Tech Stack Pills */}
        <div className={styles.tagsContainer}>
          {toolsList.map((tool, idx) => (
            <span key={idx} className={cn(styles.tagPill, styles.tagPillRegular)}>
              {tool}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className={styles.actionsRow}>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.actionButton, styles.actionPrimaryRegular)}
            >
              <span>Live Preview</span>
              <FiArrowUpRight size={16} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.actionButton, styles.actionSecondaryRegular)}
              title="View Source Code"
            >
              <FaGithub size={16} />
              <span>Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
