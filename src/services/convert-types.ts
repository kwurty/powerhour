import { Video, YoutubeResponseVideo } from "../types/youtubesearch.type";
export function convertVideoToResponseVideo(video: Video) {
  const responseVideo: YoutubeResponseVideo = {
    kind: video.kind,
    etag: video.etag,
    id: video.id,
    snippet: {
      publishedAt: "",
      channelId: "",
      title: video.name || "",
      description: video.description,
      thumbnails: {
        default: {
          url: video.thumbnails.default.url,
          width: 0,
          height: 0,
        },
        medium: {
          url: video.thumbnails.medium.url,
          width: 0,
          height: 0,
        },
        high: {
          url: video.thumbnails.high.url,
          width: 0,
          height: 0,
        },
      },
      channelTitle: "",
      tags: [],
      categoryId: "",
      liveBroadcastContent: "",
      localized: {
        title: "",
        description: "",
      },
      defaultAudioLanguage: "",
    },
    contentDetails: {
      caption: "",
      contentRating: "",
      definition: "",
      dimension: "",
      duration: video.contentDetails.duration,
      licensedContent: false,
      projection: "",
    },
  };
}

export function convertResponseVideoToVideo(
  responseVideo: YoutubeResponseVideo
) {
  const video: Video = {
    kind: responseVideo.kind,
    etag: responseVideo.etag,
    id: responseVideo.id,
    duration: responseVideo.contentDetails?.duration || "0",
    description: responseVideo.snippet.description,
    name: responseVideo.snippet.title,
    thumbnails: responseVideo.snippet.thumbnails,
    contentDetails: responseVideo.contentDetails,
  };
  return video;
}
