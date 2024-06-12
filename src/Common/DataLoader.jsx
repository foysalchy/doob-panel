import { useEffect, useState } from "react";

export const DataLoader = ({ isLoading }) => {
  const [progressNumber, setProgressNumber] = useState(0);
  const ProgressNumberPercent = 100;
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressNumber((prevNumber) =>
        prevNumber === ProgressNumberPercent
          ? 0
          : isLoading
          ? prevNumber + 1
          : prevNumber < 80
          ? prevNumber + 1
          : prevNumber
      );
    }, 150); // Adjust the interval as per your requirement
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, [isLoading]); // adjust the number to increase the progress number
  return (
    <div className="w-full mx-auto">
      {isLoading && (
        <div className="mx-auto flex w-[300px] flex-col gap-2">
          <div
            className={`flex h-3 w-full  items-center justify-center rounded-full bg-sky-300`}
          >
            <div
              style={{ width: `${progressNumber}%` }}
              className={`transition-width mr-auto h-3 w-0 rounded-full  bg-sky-600 duration-[1ms]`}
            ></div>
          </div>
          <span
            style={{ marginLeft: `${progressNumber - 7}%` }}
            className="flex text-lg font-medium  text-sky-500"
          >
            {progressNumber}%
          </span>
        </div>
      )}
    </div>
  );
};
