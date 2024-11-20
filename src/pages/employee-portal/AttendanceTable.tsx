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
import React, { useEffect, useState } from "react";
import { supabase } from "@/App";
import { Profile, Role, useProfileStore } from "@/store/profile.store";
import { useGetProfiles } from "@/hooks/use-profile";
import { Badge } from "@/components/ui/badge";
import {
  useCreateAttendance,
  useGetAttendance,
  useGetLatestAttendance,
  useTimeOutAttendance,
} from "@/hooks/use-attendance";
import {
  formatDate,
  formatTime,
  getHoursDifference,
} from "@/utils/format-date";
import Timer from "./Timer";
import { Progress } from "@/components/ui/progress";
import LocationDialog from "./LocationDialog";
import { SquareUserIcon } from "lucide-react";
import { AttendanceImage } from "./ImageDialog";

const AttendanceTable = ({
  employeeId,
  viewOnly,
}: {
  employeeId: string;
  viewOnly?: boolean;
}) => {
  const { data, isLoading, error, get: getList } = useGetAttendance(employeeId);
  const { data: newData, insert } = useCreateAttendance();
  const {
    data: latest,
    isLoading: latestLoading,
    get: getLatest,
  } = useGetLatestAttendance(employeeId);
  const { data: timeOutData, timeOut } = useTimeOutAttendance();
  const loading = isLoading || latestLoading;
  console.log("🚀 ~ EmployeeTable ~ latest:", latest);

  useEffect(() => {
    getLatest();
    getList();
  }, []);

  useEffect(() => {
    if (newData) {
      getLatest();
      getList();
    }
  }, [newData]);

  useEffect(() => {
    if (timeOutData) {
      getLatest();
      getList();
    }
  }, [timeOutData]);

  return (
    <>
      <section className="bg-coolGray-50 py-4">
        {!viewOnly && (
          <div className="container px-4 mb-8 mx-auto mt-9">
            <div className="flex items-center justify-center flex-col ">
              <div className="mt-4">
                <Timer />
              </div>
              <LocationDialog
                latest={latest}
                loading={loading}
                onTimeIn={(image_path) => {
                  insert(image_path);
                }}
                onTimeOut={(image_path) => {
                  timeOut(latest.id, image_path);
                }}
              />
            </div>
          </div>
        )}
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between -m-2 mb-4">
            <div className="w-full md:w-1/2 p-2">
              <p className="font-semibold text-xl text-coolGray-800">
                Attendance
              </p>
            </div>
            <div className="w-full md:w-1/2 p-2"></div>
          </div>
          <div className="mb-6 border border-coolGray-100" />
          <div className="overflow-hidden border border-coolGray-100 rounded-md shadow-dashboard">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time-In</TableHead>
                    <TableHead>Time-Out</TableHead>
                    <TableHead>Time Spend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((i: any, index: number) => {
                    const { hours, minutes, seconds } = i.time_out
                      ? getHoursDifference(
                          new Date(i.time_in),
                          new Date(i.time_out)
                        )
                      : { hours: 0, minutes: 0, seconds: 0 };

                    let spend = "";
                    if (hours > 0) {
                      spend = `${hours}:${minutes} hrs`;
                    } else if (minutes > 0) {
                      spend = `${minutes} min`;
                    } else if (seconds > 0) {
                      spend = `${seconds} seconds`;
                    }

                    return (
                      <TableRow>
                        <TableCell className="font-medium">
                          {formatDate(i.time_in, "MMMM DD, YYYY")}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-row items-center">
                            {formatTime(i.time_in, "hh:mm:ss A")}{" "}
                            <AttendanceImage data={i} isTimeIn={true} />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-row items-center">
                            {formatTime(i.time_out, "hh:mm:ss A")}{" "}
                            <AttendanceImage data={i} isTimeIn={false} />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {i.time_out ? spend : ""}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(AttendanceTable);
