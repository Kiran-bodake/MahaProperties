import { z } from "zod";

export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");
export const otpSchema   = z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must be numeric");

export const leadSchema = z.object({
  name:       z.string().min(2),
  phone:      phoneSchema,
  email:      z.string().email().optional().or(z.literal("")),
  message:    z.string().max(500).optional(),
  propertyId: z.string().optional(),
  source:     z.enum(["enquiry","ai-chat","callback","whatsapp"]).default("enquiry"),
});

export const propertyFilterSchema = z.object({
  category:           z.string().optional(),
  locality:           z.string().optional(),
  priceMin:           z.coerce.number().optional(),
  priceMax:           z.coerce.number().optional(),
  areaMin:            z.coerce.number().optional(),
  areaMax:            z.coerce.number().optional(),
  constructionStatus: z.string().optional(),
  postedBy:           z.string().optional(),
  isRERA:             z.coerce.boolean().optional(),
  isZeroBrokerage:    z.coerce.boolean().optional(),
  q:                  z.string().optional(),
  sortBy:             z.enum(["price_asc","price_desc","newest","popular"]).optional(),
  page:               z.coerce.number().default(1),
  limit:              z.coerce.number().max(48).default(12),
});

export type LeadInput           = z.infer<typeof leadSchema>;
export type PropertyFilterInput = z.infer<typeof propertyFilterSchema>;
