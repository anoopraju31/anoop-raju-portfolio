'use client';

import useAppDispatch from '@/hooks/useAddDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { projectCardMouseEnter } from '@/redux/features/projectCardSlice';
import { motion } from 'framer-motion';
import ProjectCard from '../projectCard/ProjectCard';
import styles from './horizontalSlide.module.css';

type HorizontalSlideProps = {
  id: number;
  img: string;
  name: string;
  year: string;
  deployedUrl?: string;
  tools?: string[];
};

const HorizontalSlide = (props: HorizontalSlideProps) => {
  const { id, deployedUrl } = props;
  const dispatch = useAppDispatch();
  const currentCardId = useAppSelector((state) => state.projectCardHover.cardId);
  const isHovered = id === currentCardId;

  const handleMouseEnter = () => {
    if (currentCardId !== id) {
      dispatch(projectCardMouseEnter({ cardId: id, link: deployedUrl }));
    }
  };

  const handleClick = () => {
    if (deployedUrl) window.open(deployedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        flexGrow: isHovered ? 5 : 1,
      }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flexBasis: '0%',
        flexShrink: 1,
        willChange: 'flex-grow',
      }}
      className={styles.container}
    >
      <ProjectCard {...props} />
    </motion.div>
  );
};

export default HorizontalSlide;
