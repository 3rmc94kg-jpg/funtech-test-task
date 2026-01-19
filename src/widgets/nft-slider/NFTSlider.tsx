'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchNFTs, NFTCard } from '@/entities/nft';
import styles from './NFTSlider.module.scss';

export const NFTSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.nft);

  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const currentTranslateRef = useRef(0);
  const prevTranslateRef = useRef(0);

  useEffect(() => {
    dispatch(fetchNFTs());
  }, [dispatch]);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setSlidesToShow(1);
      } else if (width < 768) {
        setSlidesToShow(2);
      } else if (width < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const getSlideWidth = useCallback(() => {
    if (!trackRef.current?.children[0] || !trackRef.current?.children[1]) return 0;
    const firstCard = trackRef.current.children[0].getBoundingClientRect();
    const secondCard = trackRef.current.children[1].getBoundingClientRect();
    const gap = secondCard.left - firstCard.right;
    return firstCard.width + gap;
  }, []);

  const slideToIndex = useCallback((index: number, animate = true) => {
    if (!trackRef.current) return;

    const slideWidth = getSlideWidth();
    const offset = -index * slideWidth;

    if (animate) {
      gsap.to(trackRef.current, {
        x: offset,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.set(trackRef.current, { x: offset });
    }

    prevTranslateRef.current = offset;
    currentTranslateRef.current = offset;
  }, [getSlideWidth]);

  useEffect(() => {
    if (items.length > 0 && trackRef.current) {
      const slideWidth = getSlideWidth();
      const offset = -currentIndex * slideWidth;

      gsap.to(trackRef.current, {
        x: offset,
        duration: 0.5,
        ease: 'power2.out',
      });

      prevTranslateRef.current = offset;
      currentTranslateRef.current = offset;
    }
  }, [currentIndex, slidesToShow, items.length, getSlideWidth]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return items.length - slidesToShow;
      }
      return prev - 1;
    });
  }, [items.length, slidesToShow]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= items.length - slidesToShow) {
        return 0;
      }
      return prev + 1;
    });
  }, [items.length, slidesToShow]);

  const getPositionX = (e: React.MouseEvent | React.TouchEvent): number => {
    if ('touches' in e) {
      return e.touches[0].clientX;
    }
    return e.clientX;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX(getPositionX(e));

    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;

    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;
    const newTranslate = prevTranslateRef.current + diff;

    currentTranslateRef.current = newTranslate;
    gsap.set(trackRef.current, { x: newTranslate });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }

    const movedBy = currentTranslateRef.current - prevTranslateRef.current;
    const threshold = getSlideWidth() / 4;

    if (movedBy < -threshold) {
      handleNext();
    } else if (movedBy > threshold) {
      handlePrev();
    } else {
      slideToIndex(currentIndex);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Weekly - Top NFT
          </h2>
        </div>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <span>Loading NFTs...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Weekly - Top NFT
          </h2>
        </div>
        <div className={styles.error}>
          <p>Failed to load NFTs: {error}</p>
          <button onClick={() => dispatch(fetchNFTs())}>Try again</button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Weekly - Top NFT
        </h2>
      </div>

      <div
        ref={sliderRef}
        className={styles.slider}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onContextMenu={handleContextMenu}
      >
        <div ref={trackRef} className={styles.track}>
          {items.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <Image
            src="/images/icons/arrow-left.svg"
            alt=""
            width={14}
            height={9}
          />
        </button>
        <div className={styles.navDivider} />
        <button
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <Image
            src="/images/icons/arrow-right.svg"
            alt=""
            width={14}
            height={9}
          />
        </button>
      </div>
    </section>
  );
};