// shoumeisho-sanity/schemas/index.ts
import birthdayCalendar from "./birthdayCalendar";
import chapter from "./chapter";
import galleryImage from "./galleryImage";
import manga from "./manga";
import wikiGallery from "./wikiGallery";

export const schemaTypes = [
  manga,
  chapter,
  galleryImage,
  wikiGallery,
  birthdayCalendar,
];
