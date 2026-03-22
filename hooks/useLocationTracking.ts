import { useUpdateLocationMutation } from "@/module/trip/hooks";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner-native";

export function useLocationTracking(tripId: string | null) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { mutateAsync: updateLocation } = useUpdateLocationMutation();

  const requestPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      toast.error("Location permission denied");
      return false;
    }
    return true;
  }, []);

  const fetchAndUpdateLocation = useCallback(async () => {
    if (!tripId) return;

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      await updateLocation({
        tripId,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      console.error("Failed to fetch/update location", err);
    }
  }, [tripId, updateLocation]);

  useEffect(() => {
    if (!tripId) return;

    const init = async () => {
      const granted = await requestPermission();
      if (!granted) return;

      fetchAndUpdateLocation();
      intervalRef.current = setInterval(fetchAndUpdateLocation, 5 * 60 * 1000);
    };

    init();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tripId, fetchAndUpdateLocation, requestPermission]);
}
