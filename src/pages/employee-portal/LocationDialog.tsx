import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetLatestAttendance } from "@/hooks/use-attendance";
import { formatDate } from "@/utils/format-date";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import Webcam from "react-webcam";
import { supabase } from "@/App";
import { useGetGeofence } from "@/hooks/use-geofence";
import { useGeofenceStore } from "@/store/geofence.store";
import { CameraIcon, LocateIcon, MapIcon, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const LocationDialog = ({
  latest,
  loading,
  onTimeIn,
  onTimeOut,
}: {
  latest: any;
  loading: boolean;
  onTimeIn: (image_url: string) => void;
  onTimeOut: (image_url: string) => void;
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const isTimeOut = latest && !latest?.time_out;
  const isTimeIn = !latest || !!latest?.time_out;
  const { geofence } = useGeofenceStore();
  const [open, setOpen] = useState(false);
  const [isWithinGeofenceState, setIsWithinGeofenceState] = useState(null);
  const [userLocation, setUserLocation] = useState<any>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [camera, setCamera] = useState<any>();
  console.log("🚀 ~ camera:", camera);

  // const geofence = {
  //   latitude: 13.197063351599297,
  //   longitude: 121.24365579229476,
  //   radius: 1000, // Set the radius within which users can check in
  // };
  // latitude: 13.1960249, longitude: 121.2410402,

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error)
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      } catch (error) {
        console.log("🚀 ~ getUserLocation ~ error:", error);
        // setErrorMessage(error.message)
      }
    });
  };

  const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const toRad = (value: any) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth’s radius in meters

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const isWithinGeofence = async () => {
    try {
      const distance = calculateDistance(
        geofence.latitude,
        geofence.longitude,
        userLocation.latitude,
        userLocation.longitude
      );

      console.log("🚀 ~ isWithinGeofence ~ distance:", distance);
      console.log("🚀 ~ isWithinGeofence ~ geofence.radius:", geofence.radius);
      return distance <= geofence.radius;
    } catch (error) {
      console.error("Error fetching user location:", error);
      return false;
    }
  };

  useEffect(() => {
    if (open && !userLocation) {
      const getLocation = async () => {
        try {
          const userLocation = await getUserLocation();
          console.log("🚀 ~ getLocation ~ userLocation:", userLocation);
          setErrorMessage(null);
          setUserLocation(userLocation);
        } catch (error) {
          setErrorMessage(`${error?.message}`);
          toast.error(error?.message);
          console.log("🚀 ~ useEffect ~ error:", error);
        }
      };
      getLocation();
    }
  }, [open]);

  useEffect(() => {
    if (userLocation) {
      const getGeoFence = async () => {
        const withinGeofence = await isWithinGeofence();
        console.log("🚀 ~ capture ~ withinGeofence:", withinGeofence);

        if (withinGeofence) {
          setIsWithinGeofenceState(true);
          console.log("Clock-in successful!");
        } else {
          setIsWithinGeofenceState(false);
        }
      };
      getGeoFence();
    }
  }, [userLocation]);

  // const handleClockIn = async () => {
  //   console.log("🚀 ~ handleClockIn ~ handleClockIn:");
  //   const withinGeofence = await isWithinGeofence();

  //   if (withinGeofence) {
  //     // Proceed with clock-in logic
  //     console.log("Clock-in successful!");
  //   } else {
  //     alert(
  //       "You are not within the geofence area. Please move closer to the workplace."
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (open) {
  //     // const openCam = async () => {
  //     //   await startCamera();
  //     // };
  //     // openCam();
  //   }
  // }, [open]);

  function dataURLtoFile(dataurl: any, filename: string) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const webcamRef = React.useRef(null);

  useEffect(() => {
    // if (webcamRef.current) {
    console.log("🚀 ~ useEffect ~ webcamRef.current:", camera);
    if (!camera) {
      setErrorMessage("Please turn on your camera!");
    } else {
      setErrorMessage(null);
    }
    // }
  }, [camera]);

  console.log("🚀 ~ webcamRef:", camera);

  const capture = React.useCallback(async () => {
    try {
      setLoading(true);
      const imageSrc = webcamRef.current.getScreenshot();

      const file = dataURLtoFile(imageSrc, "image.jpeg");
      const file_path = `${isTimeIn ? "in" : "out"}_${
        latest?.id || "first"
      }_${new Date().valueOf()}`;
      console.log("FILE: ", file);
      console.log("🚀 ~ onSubmit ~ file_path:", file_path);
      const { data, error } = await supabase.storage
        .from("attendance")
        .upload(file_path, file);
      if (data?.path) {
        if (isTimeIn) {
          onTimeIn(data?.path);
        } else {
          onTimeOut(data?.path);
        }
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }, [webcamRef, latest]);

  const Render = useCallback(() => {
    return (
      <>
        <DialogDescription className="text-xs mt-4">
          <MapPin /> Current Location:{" "}
          {`${userLocation?.latitude}(lat) ${userLocation?.longitude}(long)`}
        </DialogDescription>
        <DialogDescription className="text-xs">
          <MapIcon />
          Geofence: {`${geofence?.latitude}(lat) ${geofence?.longitude}(long)`}
        </DialogDescription>
        <DialogDescription className="text-xs">
          Radius: {`${geofence?.radius}`} meters
        </DialogDescription>
        <DialogDescription className="text-xs">
          Within Geofence: {`${!!isWithinGeofenceState}`}
        </DialogDescription>
        <DialogDescription className="text-xs mb-10">
          <CameraIcon />
          Camera: {!!camera ? "On" : "Off"}
        </DialogDescription>
        {isWithinGeofenceState && !errorMessage && (
          <Button
            onClick={capture}
            className=" w-full"
            disabled={isLoading || !geofence || !userLocation?.latitude}
            variant={isTimeIn ? "default" : "destructive"}
          >
            Time-{isTimeOut ? "Out" : "In"}
          </Button>
        )}
        {!errorMessage && isWithinGeofenceState === null && (
          <Button className=" w-full" disabled={true} variant={"ghost"}>
            Checking...
          </Button>
        )}
        {isWithinGeofenceState === false && (
          <Button
            className="w-full text-red-600"
            disabled={true}
            variant={"outline"}
          >
            Outside of a Geofence
          </Button>
        )}
        {!!errorMessage && (
          <Button
            className="w-full text-red-600"
            disabled={true}
            variant={"outline"}
          >
            {errorMessage}
          </Button>
        )}
      </>
    );
  }, [
    camera,
    isWithinGeofenceState,
    errorMessage,
    isLoading,
    userLocation,
    geofence,
  ]);

  return (
    <>
      {!loading && (
        <div className="mt-10">
          {isTimeOut ? (
            <Button
              variant={"destructive"}
              size={"lg"}
              onClick={() => {
                // timeOut(latest.id)
                setOpen(true);
                // handleClockIn();
              }}
            >
              Time Out
            </Button>
          ) : (
            <Button
              size={"lg"}
              onClick={() => {
                // handleClockIn();
                setOpen(true);
                // insert()
              }}
            >
              Time In
            </Button>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Time-{isTimeOut ? "Out" : "In"}</DialogTitle>
          </DialogHeader>
          <Timer />
          <div className="w-100">
            <Webcam
              audio={false}
              height={720}
              ref={(ref) => {
                console.log("🚀 ~ ref:", ref);
                webcamRef.current = ref;
                setCamera(ref);
              }}
              screenshotFormat="image/jpeg"
              width={720}
              videoConstraints={videoConstraints}
            ></Webcam>
            <Render />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// const LocationDialog = React.memo(MyDialog);
export default React.memo(LocationDialog);
