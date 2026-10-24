import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from './sanity.types';

export interface BlogsCoverImage {
  alt: string;
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface Blogs {
  _id: string;
  title: string;
  slug: string;
  // category: string;
  coverImage: BlogsCoverImage;
  date: string;
  tags?: string[];
  readTime: number;
  author: {
    name: string;
    picture: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: 'image';
    };
  };
}

export type UserStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE' | 'LOGOUT';

export type UserAuth = {

};

export type AuthSlice = {
  user: UserAuth | null;
  status: UserStatus;
};

export type LogoutResponse = {
  message: string;
  success: boolean;
};
