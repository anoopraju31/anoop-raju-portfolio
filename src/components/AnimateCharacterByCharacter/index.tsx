'use client';

import { motion, useInView } from 'framer-motion';
import React, { FC, useRef } from 'react';
import { cn } from '@/utills';

type AnimateCharacterByCharacterProps = {
  paragraph: string;
  wordGap?: number | string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  yOffset?: number | string;
};

export default function AnimateCharacterByCharacter({
  paragraph,
  wordGap = '0.25em',
  className,
  delay = 0,
  duration = 0.25,
  stagger = 0.02,
  once = true,
  yOffset = 0,
}: AnimateCharacterByCharacterProps) {
  const container = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(container, {
    once,
    amount: 'some',
  });

  const words = paragraph.split(' ');

  let globalCharCount = 0;

  return (
    <span
      ref={container}
      style={{ gap: wordGap }}
      className={cn('flex flex-wrap', className)}
    >
      {words.map((word, wordIdx) => {
        const startCharIndex = globalCharCount;
        globalCharCount += word.length;

        return (
          <Word
            key={wordIdx}
            word={word}
            isInView={isInView}
            startCharIndex={startCharIndex}
            delay={delay}
            duration={duration}
            stagger={stagger}
            yOffset={yOffset}
          />
        );
      })}
    </span>
  );
}

type WordProps = {
  word: string;
  isInView: boolean;
  startCharIndex: number;
  delay: number;
  duration: number;
  stagger: number;
  yOffset: number | string;
};

const Word: FC<WordProps> = ({
  word,
  isInView,
  startCharIndex,
  delay,
  duration,
  stagger,
  yOffset,
}) => {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {word.split('').map((char, charIdx) => {
        const charGlobalIndex = startCharIndex + charIdx;
        const charDelay = delay + charGlobalIndex * stagger;

        return (
          <Char
            key={`c_${charIdx}`}
            char={char}
            isInView={isInView}
            delay={charDelay}
            duration={duration}
            yOffset={yOffset}
          />
        );
      })}
    </span>
  );
};

type CharProps = {
  char: string;
  isInView: boolean;
  delay: number;
  duration: number;
  yOffset: number | string;
};

const Char: FC<CharProps> = ({
  char,
  isInView,
  delay,
  duration,
  yOffset,
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: yOffset }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: yOffset }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
};
