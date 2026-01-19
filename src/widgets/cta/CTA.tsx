'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Button } from '@/shared/ui';
import styles from './CTA.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const CTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.cta}>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <h2 className={styles.title}>Create and Sell NFTs</h2>
          <p className={styles.description}>
            World&apos;s Largest NFT Place
          </p>
          <div className={styles.actions}>
            <Button variant="accent" size="large" className={styles.exploreButton}>
              Explore More
            </Button>
            <Button variant="outline-accent" size="large" className={styles.sellButton}>
              Sell Artwork
            </Button>
          </div>
        </div>
        <div ref={imageRef} className={styles.imageWrapper}>
          <Image
            src="/images/nft/card-2.png"
            alt="NFT Art"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};
