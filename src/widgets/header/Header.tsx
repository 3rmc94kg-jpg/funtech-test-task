'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { label: 'Discover', href: '#' },
  { label: 'Creators', href: '#' },
  { label: 'Sell', href: '#' },
  { label: 'Stats', href: '#' },
];

const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.95248 0C11.283 0.0473476 12.661 0.0473476 13.9916 0.094689C15.1795 0.14203 16.2724 0.331406 17.3178 0.94687C18.6484 1.75171 19.4562 2.9353 19.7413 4.45029C19.8838 5.34982 19.9314 6.29668 19.9789 7.19622C20.0264 9.18464 19.9789 11.1731 19.9789 13.1615C19.9789 14.2031 19.9314 15.2446 19.5987 16.2388C18.9335 18.1799 17.5554 19.3635 15.5597 19.7422C14.6568 19.9316 13.7064 19.9316 12.8036 19.979C10.8078 20.0263 8.85956 19.979 6.86378 19.979C5.81837 19.979 4.77297 19.9316 3.77508 19.6002C1.82682 18.9374 0.63886 17.5644 0.25871 15.576C0.0686398 14.6765 0.0686398 13.7296 0.0211206 12.8301C-0.0264007 10.8417 0.0211206 8.85324 0.0211206 6.86481C0.0211206 5.82326 0.0686398 4.7817 0.401268 3.78748C1.06653 1.84639 2.44456 0.662814 4.44033 0.284064C5.34319 0.0946952 6.29356 0.0946952 7.19641 0.0473476C8.09926 0 9.00211 0 9.95248 0V0ZM18.1738 9.80023C18.1738 9.80023 18.1263 9.80023 18.1738 9.80023C18.1263 8.99539 18.1263 8.23789 18.1263 7.43305C18.1263 6.67556 18.0788 5.91806 17.9837 5.16057C17.7937 3.45619 16.7958 2.31995 15.1326 1.98855C14.2773 1.79918 13.3269 1.79918 12.4716 1.79918C10.7609 1.75183 9.09779 1.75183 7.38712 1.79918C6.53179 1.79918 5.67646 1.84651 4.86864 1.98855C3.44309 2.22526 2.4452 3.0301 2.01754 4.45041C1.87498 4.92384 1.82746 5.39728 1.77994 5.87071C1.73242 7.66977 1.73242 9.46882 1.73242 11.2679C1.73242 12.4041 1.77994 13.5877 1.87498 14.724C2.01754 16.4283 3.06294 17.6119 4.77361 17.896C5.62894 18.038 6.53179 18.0853 7.43464 18.0853C9.09779 18.1327 10.7609 18.0853 12.4716 18.0853C13.2319 18.0853 13.9922 18.038 14.7525 17.9433C15.4653 17.896 16.1305 17.6592 16.7007 17.1858C17.6511 16.4283 17.9837 15.4341 18.0313 14.2979C18.1263 12.8775 18.1263 11.3626 18.1738 9.80023Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0838 9.98941C15.0838 12.83 12.8029 15.1025 9.95183 15.1025C7.10071 15.1025 4.81982 12.83 4.81982 9.94207C4.81982 7.14881 7.14823 4.87634 9.99934 4.87634C12.8029 4.87634 15.0838 7.14881 15.0838 9.98941ZM9.95239 13.3033C11.7581 13.3033 13.2787 11.7883 13.2787 9.98927C13.2787 8.19023 11.7581 6.67524 9.95239 6.67524C8.09916 6.67524 6.62608 8.19023 6.62608 9.98927C6.57857 11.7883 8.09916 13.3033 9.95239 13.3033Z"
      fill="currentColor"
    />
    <path
      d="M16.4624 4.63921C16.4624 5.30203 15.9399 5.87016 15.2748 5.87016C14.6098 5.87016 14.0397 5.30203 14.0872 4.63921C14.0872 3.97641 14.6098 3.45562 15.2748 3.45562C15.9399 3.45562 16.4624 3.9764 16.4624 4.63921Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 14.2599V22H17.6874V14.7684C17.6874 12.9605 17.0944 11.7175 15.5311 11.7175C14.3452 11.7175 13.6444 12.565 13.3209 13.3559C13.2131 13.6384 13.1592 14.0339 13.1592 14.4294V22H8.84666C8.84666 22 8.90057 9.74012 8.84666 8.49719H13.1592V10.4181C13.1592 10.4181 13.1592 10.4746 13.1053 10.4746H13.1592V10.4181C13.7522 9.51414 14.7225 8.1582 17.0405 8.1582C19.8437 8.1582 22 10.1356 22 14.2599V14.2599ZM4.42582 2C2.97033 2 2 3.01695 2 4.31639C2 5.61581 2.91642 6.63278 4.37191 6.63278H4.42582C5.93522 6.63278 6.85164 5.61582 6.85164 4.31639C6.79774 3.01695 5.88131 2 4.42582 2V2ZM2.21604 22H6.47471V8.49719H2.21604V22Z"
      fill="currentColor"
    />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6296 12H13.6138V22H9.1164V13.6361V12H7V8.47059H9.1164V6.16667C9.1164 4.54902 9.96297 2 13.6138 2H16.9471V5.43137H14.5661C14.1958 5.43137 13.6138 5.62745 13.6138 6.41177V8.47059H17L16.6296 12Z"
      fill="currentColor"
    />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 5.13295C21.2471 5.49711 20.4941 5.75723 19.6471 5.86127C20.4941 5.28902 21.1529 4.40463 21.4353 3.36416C20.6353 3.88439 19.7412 4.24855 18.8471 4.45664C18.0941 3.57225 17.0118 3 15.8353 3C13.5765 3 11.7412 5.0289 11.7412 7.52601C11.7412 7.89018 11.7882 8.25433 11.8353 8.56648C8.4 8.35838 5.38824 6.58959 3.3647 3.83237C2.98823 4.50867 2.8 5.28902 2.8 6.12139C2.8 7.68209 3.50588 9.08671 4.63529 9.91907C3.97647 9.91907 3.31765 9.71099 2.75294 9.34682V9.39884C2.75294 11.5838 4.16471 13.4566 6.04706 13.8728C5.71764 13.9769 5.34118 14.0289 4.9647 14.0289C4.68235 14.0289 4.44706 13.9769 4.21177 13.9249C4.72941 15.7457 6.2353 17.0462 8.07058 17.0983C6.65882 18.2948 4.91764 19.0231 2.98823 19.0231C2.65882 19.0231 2.32941 19.0231 2 18.9711C3.8353 20.2717 5.95294 21 8.30588 21C15.8824 21 19.9765 14.0809 19.9765 8.09827C19.9765 7.89018 19.9765 7.68209 19.9765 7.52601C20.7765 6.84972 21.4823 6.01734 22 5.13295V5.13295Z"
      fill="currentColor"
    />
  </svg>
);

const SOCIAL_LINKS = [
  { name: 'Instagram', Icon: InstagramIcon },
  { name: 'LinkedIn', Icon: LinkedInIcon },
  { name: 'Facebook', Icon: FacebookIcon },
  { name: 'Twitter', Icon: TwitterIcon },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo-wave.svg"
            alt="DiveSea"
            width={53}
            height={53}
            className={styles.logoIcon}
            priority
          />
          <span className={styles.logoText}>DiveSea</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button variant="primary" className={styles.connectButton}>Connect Wallet</Button>
        </div>

        <button
          className={styles.burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <Image
              src="/logo-wave.svg"
              alt="DiveSea"
              width={46}
              height={46}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>DiveSea</span>
          </Link>
          <button
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.mobileMenuDivider} />

        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.mobileNavLink} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileMenuSocials}>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href="#"
              className={styles.socialLink}
              aria-label={social.name}
            >
              <social.Icon />
            </a>
          ))}
        </div>

        <div className={styles.mobileMenuFooter}>
          <Button variant="primary" className={styles.mobileConnectButton} onClick={closeMenu}>
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};
