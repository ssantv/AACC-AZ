import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "322gfyp6",
  dataset: "production",
  apiVersion: "2026-09-29",
  perspective: "published",
  useCdn: false,
});

const contentQuery = `
  *[_type in ["publication", "event"]]
    | order(date desc)[0...100] {
      _id,
      _type,
      kind,
      title,
      date,
      summary,
      body,
      location,
      registrationUrl
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
