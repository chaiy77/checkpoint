import { useEffect, useState } from "react";
import { callApiLog } from "@/tools/apiLog";
import liff from "@line/liff";
import { usePointContext } from "@/context/pointContext";
import { dummyPointList } from "@/tools/dummyData";
import CircularWaitingComponent from "./waiting/circular";

export default function ScanQRComponent({ gotoPage }) {
  const [liffObject, setLiffObject] = useState();
  const [qrData, setQrData] = useState(null);
  const [wating, setWaiting] = useState(true);

  const { addPointToMyList } = usePointContext();

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: process.env.LIFF_ID }); // replace with your LIFF ID
        await liff.ready;
        callApiLog(JSON.stringify(liff));
        if (!liff.isLoggedIn()) {
          liff.login();
        }

        if (!liff.isInClient()) {
          // setError('กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code')
          callApiLog("กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code");
          return;
        }

        setLiffObject(liff);
      } catch (err) {
        callApiLog("กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code");
      }
    };
    initLiff();
  }, []);

  useEffect(() => {
    const initLiffAndScan = async () => {
      try {
        const result = await liff.scanCode();
        callApiLog("scan QR -> 41 -> scan result= " + JSON.stringify(result));
        setQrData(result.value);
        handleQRCodedata(result.value);
      } catch (err) {
        callApiLog("Scan failed:", err);
        callApiLog("กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code");
      }
    };
    if (liffObject) {
      initLiffAndScan();
    }
  }, [liffObject]);

  const handleQRCodedata = (data) => {
    if (data) {
      let dataPointName = data.replace(/\s/g, "").toLowerCase();

      for (let i = 0; i < dummyPointList.length; i++) {
        let pointName = dummyPointList[i]["nameEN"]
          .replace(/\s/g, "")
          .toLowerCase();

        if (dataPointName === pointName) {
          callApiLog(
            "SCAN QR -> 64 -> add Point -> " + JSON.stringify(dataPointName)
          );
          addPointToMyList(dummyPointList[i]);
        }
      }
    }
  };

  if (qrData) {
    return (
      <div
        className={`  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="flex flex-col gap-[32px] z-99 row-start-2 items-center sm:items-start md:items-start">
          <div> Welcome to {qrData} </div>
        </main>
        <footer className="row-start-3 z-99 w-full flex gap-[24px] flex-wrap items-center justify-center">
          <div className="flex w-full items-center justify-center">
            {" "}
            <button
              type="button"
              className=" w-11/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                gotoPage("main");
              }}
            >
              Back
            </button>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <CircularWaitingComponent />
    // <div
    //   className={`  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    // >
    //   <main className="flex flex-col gap-[32px] z-99 row-start-2 items-center sm:items-start md:items-start">
    //     <CircularWaitingComponent />
    //   </main>
    //   <footer className="row-start-3 z-99 w-full flex gap-[24px] flex-wrap items-center justify-center">
    //     <div className="flex w-full items-center justify-center">
    //       {" "}
    //       <button
    //         type="button"
    //         className=" w-11/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    //         onClick={() => {
    //           gotoPage("main");
    //         }}
    //       >
    //         Back
    //       </button>
    //     </div>
    //   </footer>
    // </div>
  );
}
