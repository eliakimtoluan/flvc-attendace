import { supabase } from "@/App";
import { useFetch } from "./use-fetch";

export const useGetProfiles = () => {
  const { data, isLoading, error, fetch } = useFetch<any>();
  const get = () => {
    fetch(async () => {
      return await supabase.from("profiles").select("*");
    });
  };

  return {
    data,
    isLoading,
    error,
    get,
  };
};