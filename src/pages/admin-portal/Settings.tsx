import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewEmployeeDialog } from "./NewEmployeeDialog";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/App";
import { Profile, Role } from "@/store/profile.store";
import { useGetProfiles } from "@/hooks/use-profile";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetGeofence, useUpdateGeofence } from "@/hooks/use-geofence";
import toast from "react-hot-toast";

const Settings = () => {
  const { geofence, get } = useGetGeofence();
  const lat = useRef<string>();
  const long = useRef<string>();
  const radius = useRef<string>();
  const [isUpdating, setUpdating] = useState<boolean>(false);
  const { updated, update } = useUpdateGeofence();

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (updated) {
      setTimeout(() => {
        setUpdating(false);
        toast.success("Successfully updated!");
      }, 1000);
    }
  }, [updated]);

  return (
    <>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between -m-2 mb-4">
            <div className="w-full md:w-1/2 p-2">
              <p className="font-semibold text-xl text-coolGray-800">
                Geofence
              </p>
            </div>
            <div className="w-full md:w-1/2 p-2"></div>
          </div>
          <div className=" border border-coolGray-100" />
          <div className="flex  items-center justify-center">
            <div className="  grid gap-4 py-4 w-96">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="latitude" className="text-right">
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  defaultValue={geofence?.latitude}
                  onChange={(e) => (lat.current = e.target.value)}
                  className="col-span-3"
                  disabled={isUpdating}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="longitude" className="text-right">
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  disabled={isUpdating}
                  defaultValue={geofence?.longitude}
                  onChange={(e) => (long.current = e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Radius (m)
                </Label>
                <Input
                  id="radius"
                  disabled={isUpdating}
                  defaultValue={geofence?.radius}
                  onChange={(e) => (radius.current = e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="flex  items-center justify-center">
                <Button
                  size={"sm"}
                  className="w-36"
                  disabled={isUpdating && !geofence}
                  onClick={() => {
                    setUpdating(true);
                    update({
                      latitude: lat.current,
                      longitude: long.current,
                      radius: radius.current,
                    });
                  }}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-hidden border border-coolGray-100 rounded-md shadow-dashboard"></div>
        </div>
      </section>
    </>
  );
};

export default Settings;
