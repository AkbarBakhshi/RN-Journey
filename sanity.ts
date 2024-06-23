import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "your-project-id",
  dataset: "your-dataset-name",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
};
export const sanityClient = createClient(config);
