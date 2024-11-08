import { supabase } from "@/App";
import { useFetch } from "./use-fetch";

export const useGetAttendance = () => {
  const { data, isLoading, error, fetch } = useFetch<any>();
  const get = () => {
    fetch(async () => {
      return await supabase.from("attendance_view").select("*").limit(5);
    });
  };

  return {
    data,
    isLoading,
    error,
    get,
  };
};

export const useGetLatestAttendance = () => {
  const { data, isLoading, error, fetch } = useFetch<any>();
  const get = () => {
    fetch(async () => {
      return await supabase
        .from("attendance_view")
        .select("*")
        .limit(1)
        .single();
    });
  };

  return {
    data,
    isLoading,
    error,
    get,
  };
};

export const useTimeOutAttendance = () => {
  const { data, isLoading, error, fetch } = useFetch<any>();
  const timeOut = (id: number, image_path: string) => {
    fetch(async () => {
      return await supabase.rpc("on_set_time_out", {
        p_attendance_id: id,
        p_image_path: image_path,
      });
    });
  };

  return {
    data,
    isLoading,
    error,
    timeOut,
  };
};

export const useCreateAttendance = () => {
  const { data, isLoading, error, fetch } = useFetch<any>();
  const get = (image_path: string) => {
    fetch(async () => {
      return await supabase
        .from("attendance")
        .insert({ image_in: image_path })
        .select("id")
        .limit(1)
        .single();
    });
  };

  return {
    data,
    isLoading,
    error,
    insert: get,
  };
};
