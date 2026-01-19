'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Button } from '@/shared/ui';
import styles from './Hero.module.scss';

const STATS = [
  { value: '430K+', label: 'Art Works' },
  { value: '159K+', label: 'Creators' },
  { value: '87K+', label: 'Collections' },
];

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
      .from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from(actionsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from(statsRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4');

      gsap.fromTo(
        [card1Ref.current, card2Ref.current],
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.25,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        arrowRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 1.1,
          ease: 'power2.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeLine} />
            <span className={styles.badgeText}>Over 1m creators</span>
          </div>
          <h1 ref={titleRef} className={styles.title}>
            Discover And Create NFTs
          </h1>
          <p ref={descriptionRef} className={styles.description}>
            Discover, Create and Sell NFTs On Our NFT Marketplace With Over
            Thousands Of NFTs And Get a <span className={styles.highlight}>$20 bonus</span>.
          </p>

          <div ref={actionsRef} className={styles.actions}>
            <Button variant="primary" size="large" className={styles.exploreButton}>
              Explore More
            </Button>
            <Button variant="outline" size="large" className={styles.createButton}>
              Create NFT
            </Button>
          </div>

          <div ref={statsRef} className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={imagesRef} className={styles.images}>
          <div className={styles.dotsTop} aria-hidden="true" />
          <div className={styles.dotsBottom} aria-hidden="true" />

          <div ref={card1Ref} className={styles.cardLarge}>
            <div className={styles.cardShadow}>
              <Image
                src="/images/nft/card-2.png"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
            <div className={styles.cardImage}>
              <Image
                src="/images/nft/card-2.png"
                alt="NFT Art"
                fill
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            </div>
          </div>

          <div ref={arrowRef} className={styles.arrow}>
            <Image
              src="/images/hero/arrow.svg"
              alt=""
              width={131}
              height={135}
            />
          </div>

          <div ref={card2Ref} className={styles.cardSmall}>
            <div className={styles.cardShadow}>
              <Image
                src="/images/nft/card-1.png"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
            <div className={styles.cardImage}>
              <Image
                src="/images/nft/card-1.png"
                alt="NFT Art"
                fill
                sizes="(max-width: 1024px) 220px, 320px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};