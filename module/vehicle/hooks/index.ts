import { vehicleApi } from "@/module/vehicle/api/vehicle.api";
import { vehicleKeys } from "@/module/vehicle/constants/vehicle.key";
import { useQuery } from "@tanstack/react-query";

export const useAvailableVehicles = () =>
  useQuery({
    queryKey: vehicleKeys.list(),
    queryFn: vehicleApi.listVehicles,
  });
