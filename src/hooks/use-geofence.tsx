import { supabase } from "@/App";
import { useFetch } from "./use-fetch";

export const useGetGeofence = () => {
  const { data, isLoading, error, fetch } = useFetch<any>();
  const get = () => {
    fetch(async () => {
      return await supabase.from("geofence").select("*").limit(1).single();
    });
  };

  return {
    geofence: data,
    isLoading,
    error,
    get,
  };
};

export const useUpdateGeofence = () => {
  const { data, isLoading, error, fetch } = useFetch<any>();
  const update = ({ latitude, longitude, radius }: any) => {
    fetch(async () => {
      return await supabase
        .from("geofence")
        .update({
          latitude,
          longitude,
          radius,
        })
        .eq("id", 1)
        .select("*");
    });
  };

  return {
    updated: data,
    isLoading,
    error,
    update,
  };
};
