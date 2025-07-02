import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import StarTable from "./table/starTable";
import Image from "next/image";
import { usePointContext } from "@/context/pointContext";
import { dummyMyPoint } from "@/tools/dummyData";
import { callApiLog } from "@/tools/apiLog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function MainComponent({ gotoPage }) {
  const [point, setPoint] = useState(0);
  const { pointDataList } = usePointContext();

  useEffect(() => {
    setPoint(pointDataList.length);
    // callApiLog(JSON.stringify(pointDataList));
  }, [pointDataList]);
  return (
    <div
      className={`${geistSans.className} ${geistMono.className}   grid grid-rows-[10px_1fr_20px] items-center justify-items-center min-h-screen  pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] z-99 row-start-2 items-center sm:items-start md:items-start">
        <div className="flex flex-col w-full">
          <div
            className={
              point > 99
                ? "mx-auto  text-[#55FFDD] text-[8rem]"
                : "mx-auto  text-[#55FFDD] text-[10rem]"
            }
          >
            {point}
          </div>
          <div>
            <StarTable />
          </div>
        </div>
      </main>
      <footer className="row-start-3 z-99 w-full flex gap-[24px] flex-wrap items-center justify-center">
        <div className="flex w-full items-center justify-center">
          {" "}
          <button
            type="button"
            className=" w-11/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              console.log("test");
              gotoPage("scanQR");
            }}
          >
            Check Point
          </button>
        </div>

        {/* <a
         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
         target="_blank"
         rel="noopener noreferrer"
       >
         <Image
           aria-hidden
           src="/file.svg"
           alt="File icon"
           width={16}
           height={16}
         />
         Learn
       </a>
       <a
         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
         target="_blank"
         rel="noopener noreferrer"
       >
         <Image
           aria-hidden
           src="/window.svg"
           alt="Window icon"
           width={16}
           height={16}
         />
         Examples
       </a>
       <a
         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
         href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
         target="_blank"
         rel="noopener noreferrer"
       >
         <Image
           aria-hidden
           src="/globe.svg"
           alt="Globe icon"
           width={16}
           height={16}
         />
         Go to nextjs.org →
       </a> */}
      </footer>
    </div>
  );
}
