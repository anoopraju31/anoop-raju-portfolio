'use client';

import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';
import { projectCardMouseEnter } from '@/redux/features/projectCardSlice';
import { motion } from 'framer-motion';
import styles from './horizontalSlide.module.css';

type SlideLgMaskProps = {
  id: number;
  deployedUrl: string;
};

const HorizontalSlideMask = (props: SlideLgMaskProps) => {
  const { id, deployedUrl } = props;
  const dispatch = useAppDispatch();
  const cardId = useAppSelector((state) => state.projectCardHover.cardId);
  const isHovered = cardId === id;

  const handleCardHoverStart = () => {
    if (cardId !== id) {
      dispatch(projectCardMouseEnter({ cardId: id, link: deployedUrl }));
    }
  };

  const handleClick = () => {
    if (deployedUrl) window.open(deployedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={handleCardHoverStart}
      onMouseMove={handleCardHoverStart}
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
    />
  );
};

export default HorizontalSlideMask;
