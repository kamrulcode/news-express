export interface Headlinges {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
  rank: number;
}

export type Article = {
  id: string;
  title: string;
  description?: {
    blocks?: {
      type: string;
      model?: {
        blocks?: {
          type: string;
          model?: {
            text?: string;
          };
        }[];
      };
    }[];
  };
  link?: string;
  firstPublished?: string;
  lastPublished?: string;
  byline?: string[];
  imageUrl?: string;
  body?: {
    type: string;
    text?: string;
  }[];
  text?: string;
  wordCount?: number;
  source?: string;
  sourceUrl?: string;
};
