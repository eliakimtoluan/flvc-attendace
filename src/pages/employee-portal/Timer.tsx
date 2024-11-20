import { formatDate } from "@/utils/format-date";
import { useState } from "react";

const Timer = () => {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-center text-1xl text-gray-600">
        {formatDate(`${new Date()}`, "MMMM DD, YYYY")}
      </h2>
      <h1 className="text-6xl">{ctime}</h1>
    </div>
  );
};

export default Timer;
