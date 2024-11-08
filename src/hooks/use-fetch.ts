import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";

export function useFetch<T>() {
  const [data, setData] = useState<T | null>();
  const [count, setCount] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null | unknown>(null);

  const fetch = async (asyncFunction: any, params?: any) => {
    setIsLoading(true);
    try {
      setData(null);
      const { data, count, error } = await asyncFunction(params);
      if (error) throw error;
      setData(data);
      setCount(count);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { data, count, isLoading, error, fetch };
}
