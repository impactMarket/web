import { Cover } from '../apis/types';

export const getThumbnailCoverImage = (cover: Cover) =>
    cover?.thumbnails.find(({ width }) => width === 392)?.url || cover?.url;
