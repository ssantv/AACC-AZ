import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "322gfyp6",
  dataset: "production",
  apiVersion: "2026-09-29",
  perspective: "published",
  useCdn: false,
});

const contentQuery = `
  *[_type in ["publication", "event", "testimonial"]]
    | order(date desc)[0...100] {
      _id,
      _type,
      kind,
      title,
      date,
      datetime,
      summary,
      "cover": cover{alt, "url": asset->url},
      body[]{
        ...,
        _type == "image" => {alt, caption, "url": asset->url}
      },
      location,
      registrationUrl,
      interviewee,
      interviewer,
      series,
      relationship,
      relationshipDetail,
      quote,
      "story": story[]{
        ...,
        _type == "image" => {alt, caption, "url": asset->url}
      }
    }
`;

let contentRequest;

export function fetchPublishedContent() {
  if (!contentRequest) {
    contentRequest = client.fetch(contentQuery).catch((error) => {
      contentRequest = undefined;
      throw error;
    });
  }
  return contentRequest;
}