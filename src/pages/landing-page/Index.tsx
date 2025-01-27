import { Label } from "@/components/ui/label";
import { LoginForm } from "./LoginForm";
import Team from "./Team";
import {
  CameraIcon,
  LayoutDashboardIcon,
  LocateIcon,
  MapIcon,
  Users2Icon,
} from "lucide-react";

const LandingPage = () => {
  return (
    <>
      <div className=" bg-gradient-to-br from-green-600 via-green-400 to-blue-300 relative w-full h-screen">
        <div className="absolute inset-0 bg-stripes opacity-10"></div>
        <div className="relative py-20 xl:pt-16 xl:pb-24">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-20 lg:mb-0">
                <div className="flex-1 ">
                  <h1 className=" text-5xl mb-1 font-bold text-white">
                    Geofence Attendance System
                  </h1>
                  <h2 className=" text-2xl mb-10 text-white text-gray-600 ml-1">
                    F.L. Vargas College, Abulug Campus
                  </h2>
                  <h3 className=" text-3md mb-10 text-white text-gray-600">
                    <div className="flex flex-row">
                      <MapIcon className="mr-4" /> Geofencing - virtual
                      perimeter for a geographic area.
                    </div>
                    <div className="flex flex-row mt-4">
                      <LocateIcon className="mr-4" /> Location - determining the
                      approximate latitude and longitude of a device.
                    </div>
                    <div className="flex flex-row mt-4">
                      <CameraIcon className="mr-4" /> Camera capture during
                      employee time-in & time-out.
                    </div>
                    <div className="flex flex-row mt-4">
                      <LayoutDashboardIcon className="mr-4" /> Admin dashboard -
                      add employee & geofence configuration.
                    </div>
                    <div className="flex flex-row mt-4">
                      <Users2Icon className="mr-4" />
                      Employee dashboard, time-in & time-out
                    </div>
                  </h3>
                  <Label></Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex-1 ml-1 -mt-20 lg:m-20">
                  <div className="flex justify-center">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Team />
    </>
  );
};

export default LandingPage;
