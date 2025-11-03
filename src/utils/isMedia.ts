import {Media} from "@/payload-types";

export function isMedia(picture: unknown): picture is Media {
  return typeof picture === "object" && picture !== null && "url" in picture;
}