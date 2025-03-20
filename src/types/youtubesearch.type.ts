export type Search = {
  searchQuery: string;
};

export type ContentDetails = {
  caption: string;
  contentRating: any;
  definition: string;
  dimension: string;
  duration: string;
  licensedContent: boolean;
  projection: string;
};

export type YoutubeSearchResult = {
  kind: string;
  etag: string;
  contentDetails: ContentDetails;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: YoutubeResponseVideo[];
};
export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};
export type ItemsEntity = {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  contentDetails?: ContentDetails;
};
export type Id = {
  kind: string;
  videoId: string;
};
export type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
};
export type Localized = {
  title: string;
  description: string;
};
export type YoutubeResponseVideo = {
  user_id?: number;
  user_name?: string;
  kind: string;
  etag: string;
  id: string;
  starttime?: number;
  snippet: Snippet;
  contentDetails: ContentDetails;
};

export type Thumbnails = {
  default: DefaultOrMediumOrHigh;
  medium: DefaultOrMediumOrHigh;
  high: DefaultOrMediumOrHigh;
};
export type DefaultOrMediumOrHigh = {
  url: string;
  width: number;
  height: number;
};

export type Video = {
  kind: string;
  etag: string;
  id: string;
  starttime?: number;
  duration: string;
  name?: string;
  description: string;
  thumbnails: Thumbnails;
  contentDetails: ContentDetails;
};
