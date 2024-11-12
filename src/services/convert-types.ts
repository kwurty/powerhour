import { Video, YoutubeResponseVideo } from "../types/youtubesearch.type"
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
                    url: "",
                    width: 0,
                    height: 0
                },
                medium: {
                    url: "",
                    width: 0,
                    height: 0
                },
                high: {
                    url: "",
                    width: 0,
                    height: 0
                }
            },
            channelTitle: "",
            tags: [],
            categoryId: "",
            liveBroadcastContent: "",
            localized: {
                title: "",
                description: ""
            },
            defaultAudioLanguage: ""
        }
    }
}

export function convertResponseVideoToVideo(responseVideo: YoutubeResponseVideo) {
    const video: Video = {
        kind: responseVideo.kind,
        etag: responseVideo.etag,
        id: responseVideo.id,
        duration: responseVideo.contentDetails?.duration || "0",
        description: responseVideo.snippet.description,
        name: responseVideo.snippet.title
    }
    return video;
}