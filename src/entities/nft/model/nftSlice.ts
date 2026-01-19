import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { NFTApiItem, NFTCard, NFTState } from '@/shared/types';

const NFT_IMAGES = [
  '/images/nft/card-1.png',
  '/images/nft/card-2.png',
  '/images/nft/card-3.png',
  '/images/nft/card-4.png',
  '/images/nft/card-5.png',
];

const AUTHORS = [
  'MrFox',
  'CryptoKing',
  'ArtMaster',
  'DigitalDreamer',
  'NFTWizard',
  'PixelPunk',
  'MetaCreator',
  'BlockArtist',
];

const getRandomImage = (): string => {
  return NFT_IMAGES[Math.floor(Math.random() * NFT_IMAGES.length)];
};

const getRandomAuthor = (): string => {
  return AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
};

const getRandomBid = (): number => {
  return Math.round((Math.random() * 9.9 + 0.1) * 100) / 100;
};

const getRandomEndTime = (): string => {
  const now = new Date();
  const hoursToAdd = Math.floor(Math.random() * 24) + 1;
  return new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000).toISOString();
};

const transformNFTData = (apiItems: NFTApiItem[]): NFTCard[] => {
  return apiItems.slice(0, 20).map((item) => ({
    id: item.id,
    name: item.name,
    author: getRandomAuthor(),
    image: getRandomImage(),
    currentBid: getRandomBid(),
    endTime: getRandomEndTime(),
  }));
};

export const fetchNFTs = createAsyncThunk<NFTCard[], void, { rejectValue: string }>(
  'nft/fetchNFTs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/nfts/list');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NFTApiItem[] = await response.json();
      return transformNFTData(data);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch NFTs'
      );
    }
  }
);

const initialState: NFTState = {
  items: [],
  loading: false,
  error: null,
};

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNFTs.fulfilled, (state, action: PayloadAction<NFTCard[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNFTs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error occurred';
      });
  },
});

export const { clearError } = nftSlice.actions;
export default nftSlice.reducer;