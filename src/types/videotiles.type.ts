export type Video = {
  title: string;
  id: string;
  author: string;
  description: string;
  thumbnails: VideoThumbnail;
};

export type VideoThumbnail = {
  default: VideoThumbnailItem;
  medium: VideoThumbnailItem;
  high: VideoThumbnailItem;
  standard: VideoThumbnailItem;
  maxres: VideoThumbnailItem;
};

export type VideoThumbnailItem = {
  url: string;
  width: number;
  height: number;
};
