import { cn } from '@/utills';
import { Gantari } from 'next/font/google';
import Link from 'next/link';
import ScrollText from './scrollText';
import styles from './styles.module.css';

const gantari = Gantari({ weight: '400', subsets: ['latin'] });

const FooterScrollText = () => {
  return (
    <Link
      href="/contact"
      className={cn('group', styles['outter-container'], gantari.className)}
      title="Let's talk - Get in touch"
    >
      <div className={styles['inner-container']}>
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
      </div>
      <div className={styles['inner-container']}>
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
        <ScrollText text="Let's talk" />
      </div>
    </Link>
  );
};

export default FooterScrollText;
