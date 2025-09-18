// deskStructure.ts
import { StructureBuilder } from "sanity/structure";

export const MyStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Wiki Gallery
      S.listItem()
        .title("Wiki Gallery")
        .schemaType("wikiGallery")
        .child(S.documentTypeList("wikiGallery").title("Wiki Gallery")),

      // Manga
      S.listItem()
        .title("Manga")
        .schemaType("manga")
        .child(S.documentTypeList("manga").title("Manga")),

      // Birthday Calendar
      S.listItem()
        .title("Birthday Calendar")
        .child(
            S.documentTypeList("birthdayCalendar").title("Birthday Calendar")
        ),
    ]);
