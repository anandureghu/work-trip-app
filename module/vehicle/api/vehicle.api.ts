import { supabase } from "@/integrations/supabase/supabase";
import {
  Vehicle,
  vehicleSchema,
} from "@/module/vehicle/schemas/vehicle.schema";
import { z } from "zod";

export const vehicleApi = {
  async listVehicles(): Promise<Vehicle[]> {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true);

    if (error) {
      throw new Error(error.message);
    }

    return z.array(vehicleSchema).parse(data ?? []);
  },
};
