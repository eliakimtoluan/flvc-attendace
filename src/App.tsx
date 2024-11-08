import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import LandingPage from "./pages/landing-page/Index";
import { Role, useProfileStore } from "./store/profile.store";
import toast, { Toaster } from "react-hot-toast";
import EmployeePortal from "./pages/employee-portal/Index";
import { useGetGeofence } from "./hooks/use-geofence";
import { useGeofenceStore } from "./store/geofence.store";
import AdminPortal from "./pages/admin-portal/Index";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
