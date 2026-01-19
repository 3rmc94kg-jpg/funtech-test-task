export interface NFTApiItem {
  id: string;
  contract_address: string | null;
  name: string;
  asset_platform_id: string;
  symbol: string;
}

export interface NFTCard {
  id: string;
  name: string;
  author: string;
  image: string;
  currentBid: number;
  endTime: string;
}

export interface NFTState {
  items: NFTCard[];
  loading: boolean;
  error: string | null;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'outline-accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export interface NFTCardProps {
  nft: NFTCard;
}

export interface SliderProps {
  children: React.ReactNode;
  slidesToShow?: number;
  slidesToScroll?: number;
}