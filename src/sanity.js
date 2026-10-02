import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const client = createClient({
  projectId: "322gfyp6",
  dataset: "production",
  apiVersion: "2026-09-29",
  perspective: "published",
  useCdn: false,
});

const imageBuilder = createImageUrlBuilder(client);

export function imageUrl(image) {
  return imageBuilder.image(image);
}

const contentQuery = `
  *[_type in ["publication", "event"]]
    | order(date desc)[0...100] {
      _id,
      _type,
      kind,
      title,
      date,
      summary,
<<<<<<< HEAD
      cover,
      body,
=======
      "cover": cover{alt, "url": asset->url},
      body[]{
        ...,
        _type == "image" => {alt, caption, "url": asset->url}
      },
>>>>>>> e95caf3791032bc8607add31e751499ec8eafd52
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
