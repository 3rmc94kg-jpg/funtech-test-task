'use client';

import Image from 'next/image';
import { Button } from '@/shared/ui';
import { useCountdown, formatTime } from '@/shared/lib';
import type { NFTCardProps } from '@/shared/types';
import styles from './NFTCard.module.scss';

export const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const { hours, minutes, seconds, isExpired } = useCountdown(nft.endTime);

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image
          src={nft.image}
          alt={nft.name}
          width={253}
          height={253}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
        <div className={styles.timer}>
          {isExpired ? (
            <span>Ended</span>
          ) : (
            <span>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</span>
          )}
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{nft.name}</h3>
        <div className={styles.cardFooter}>
          <div className={styles.bid}>
            <span className={styles.bidLabel}>Current Bid</span>
            <span className={styles.bidValue}>
              <Image
                src="/images/nft/ethereum.svg"
                alt=""
                width={22}
                height={22}
                className={styles.ethIcon}
              />
              {nft.currentBid}
            </span>
          </div>
          <Button variant="primary" size="small" className={styles.placeBidButton}>
            Place Bid
          </Button>
        </div>
      </div>
    </div>
  );
};
