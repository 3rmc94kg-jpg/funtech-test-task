import Head from 'next/head';
import { Header } from '@/widgets/header';
import { Hero } from '@/widgets/hero';
import { NFTSlider } from '@/widgets/nft-slider';
import { CTA } from '@/widgets/cta';
import { Footer } from '@/widgets/footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>DiveSea - Discover And Create NFTs</title>
        <meta
          name="description"
          content="Discover, Create and Sell NFTs on our NFT Marketplace with over thousands of NFTs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Hero />
        <NFTSlider />
        <CTA />
      </main>

      <Footer />
    </>
  );
}