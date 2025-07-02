"use client";
import Image from "next/image";
import { dummyMyPoint } from "@/tools/dummyData";
import { usePointContext } from "@/context/pointContext";

export default function StarTable() {
  const { pointDataList } = usePointContext();
  return (
    <div className="py-4">
      <h1 className="text-xl font-bold mb-4">ตารางคะแนน</h1>

      <div
        className="
        grid gap-0
        grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7
        place-items-center
      "
      >
        {pointDataList.map((point, i) => {
          console.log(point);
          if (point.typeOfPoint == "extra") {
            return (
              <div
                key={i}
                className="border border-gray-300 flex items-center justify-center  aspect-square"
              >
                <Image
                  src="/images/extraStar.webp"
                  alt="Star"
                  width={60}
                  height={60}
                  className="w-14 h-14"
                />
              </div>
            );
          }
          return (
            <div
              key={i}
              className="border border-gray-300 flex items-center justify-center  aspect-square"
            >
              <Image
                src="/images/normalStar.webp"
                alt="Star"
                width={60}
                height={60}
                className="w-14 h-14"
              />
            </div>
          );
        })}
        <div
          key={pointDataList.length + 1}
          className="border border-gray-300 flex items-center justify-center aspect-square"
        >
          <Image
            src="/images/blankStar.svg"
            alt="Star"
            width={60}
            height={60}
            className="w-14 h-14"
          />
        </div>
      </div>
    </div>
  );
}
