import * as z from "zod";

export const vehicleSchema = z.object({
  id: z.uuid(),
  company_id: z.uuid().nullable().optional(),
  vehicle_number: z.string(),
  vehicle_type: z.string(),
  is_active: z.boolean(),
  created_at: z.string().optional(), // timestamptz
  updated_at: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
