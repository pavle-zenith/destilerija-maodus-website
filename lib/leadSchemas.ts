import { z } from "zod";

const req = "Ovo polje je obavezno.";

/** Shared contact field: at least a phone or email typed by the visitor. */
const contact = z.string().min(4, "Unesite telefon ili mejl.");

export const inquirySchema = z.object({
  name: z.string().min(2, req),
  contact,
  city: z.string().min(2, req),
  rakija: z.string().optional().default(""),
  quantity: z.string().optional().default(""),
  occasion: z.string().optional().default(""),
  message: z.string().optional().default(""),
  // honeypot — must stay empty
  company: z.string().max(0).optional().default(""),
});

export const wholesaleSchema = z.object({
  businessName: z.string().min(2, req),
  name: z.string().min(2, req),
  contact,
  city: z.string().min(2, req),
  message: z.string().optional().default(""),
  company: z.string().max(0).optional().default(""),
});

export const newsletterSchema = z.object({
  email: z.string().email("Unesite ispravnu mejl adresu."),
  company: z.string().max(0).optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type WholesaleInput = z.infer<typeof wholesaleSchema>;

export type ActionState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export const idleState: ActionState = { ok: false };
