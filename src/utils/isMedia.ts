import {Media} from "@/payload-types";

export function isMedia(picture: unknown): picture is Media {
  return typeof picture === "object" && picture !== null && "url" in picture;
}

export function getMediaUrl(picture: unknown, defaultUrl = ""): string {
  if (isMedia(picture)) {
    return picture.url || defaultUrl;
  }
  return defaultUrl;
}