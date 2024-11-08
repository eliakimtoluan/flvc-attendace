import { createClient, Session } from "@supabase/supabase-js";
import { LoginForm } from "./pages/landing-page/LoginForm";
import { useEffect, useState } from "react";
import AdminPortal from "./pages/admin-portal/index";
import LandingPage from "./pages/landing-page/Index";
import { Role, useProfileStore } from "./store/profile.store";
import toast, { Toaster } from "react-hot-toast";
import EmployeePortal from "./pages/employee-portal/Index";
import { useGetGeofence } from "./hooks/use-geofence";
import { useGeofenceStore } from "./store/geofence.store";

export const supabase = createClient(
  "https://szcjrfuerbvwgvzoisyv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Y2pyZnVlcmJ2d2d2em9pc3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MDQ3ODAsImV4cCI6MjA0NjI4MDc4MH0.eGAZk7u257bxWHeZBaA_egyrb7KYuIIBN38mLwWtXrU"
);

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const { profile, setProfile } = useProfileStore();
  const { geofence, get: getGeoFence } = useGetGeofence();
  const { setGeofence } = useGeofenceStore();

  const getProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .limit(1)
      .single();
    setProfile(data);
  };

  useEffect(() => {
    getGeoFence();
  }, []);

  useEffect(() => {
    if (geofence) {
      setGeofence({
        longitude: geofence.longitude,
        latitude: geofence.latitude,
        radius: geofence.radius,
      });
    }
  }, [geofence]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user.id) {
        toast.error("No user profile found ");
        return;
      }
      getProfile(session?.user.id);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_IN") {
        if (session?.user.id) {
          getProfile(session?.user.id);
        }
      }
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const Portal = () => {
    if (profile.role === Role.ADMIN) {
      return <AdminPortal />;
    }
    if (profile.role === Role.EMPLOYEE) {
      return <EmployeePortal />;
    }
  };

  return (
    <>
      {!session ? <LandingPage /> : <Portal />}
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
