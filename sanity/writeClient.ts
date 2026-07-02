import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

const token = process.env.SANITY_API_WRITE_TOKEN;

/** Server-only client with write access — used to persist form leads. */
export const writeClient =
  projectId && token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false,
      })
    : null;

export async function createLead(doc: Record<string, unknown>) {
  if (!writeClient) return null;
  return writeClient.create({ _type: "lead", createdAt: new Date().toISOString(), ...doc });
}
