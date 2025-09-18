// shoumeisho-sanity/schemas/birthdayCalendar.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "birthdayCalendar",
  title: "Birthday Calendar",
  type: "document",
  fields: [
    defineField({
      name: "character",
      title: "Tên Vocal/Synth:",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Sinh Nhật:",
      type: "date",
      options: { dateFormat: "DD-MM" },
    }),
  ],
});
