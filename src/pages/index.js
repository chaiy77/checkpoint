"user client";
import liff from "@line/liff";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import MainComponent from "@/components/main";
import ScanQRComponent from "@/components/scanqr";
import CircularWaitingComponent from "@/components/waiting/circular";
import { callApiLog } from "@/tools/apiLog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [page, setPage] = useState("main");
  const [error, setError] = useState(false);
  const [liffObject, setLiffObject] = useState();
  const [lineToken, setLineToken] = useState();
  const [loading, setLoading] = useState(true);
  const [lineId, setLineId] = useState();
  const [lineName, setLineName] = useState();

  useEffect(() => {
    console.log("Home -> useEffect");
    const getLiff = async () => {
      try {
        await liff.init({ liffId: process.env.LIFF_ID });
        await liff.ready;

        if (!liff.isLoggedIn()) {
          //callApiLog("liff Logging in");
          liff.login();
        }

        //console.log("LIFF OBJECT =", liff.toString());
        // callApiLog(liff);

        const idToken = liff.getIDToken();
        // console.log(idToken); // print idToken object

        callApiLog(idToken);

        if (idToken) {
          setLiffObject(liff);
          callApiLog("set token " + idToken);
          setLineToken(idToken);
        }
        // setLoading(false);
      } catch (error) {
        console.log(`liff.init() failed: ${error}`);
        callApiLog("Liff ERROR = " + JSON.stringify(error));
        // setLiffError(error.toString());  <- comment for test
        setError(true);
        ////// PLEASE DELETE ////////////
        setLineId("U37423011d00f53dbae57cc4e47950140"); // <-- fixed shopId for test  not need line access
        setLineName("chaiy"); // <-- fixed shopId for test  not need line access
        setLoading(false);
        ///////////////////////////////////
      }
    };

    if (typeof window !== "undefined") {
      //  initLiff(); // Ensure this runs only in the browser
      getLiff();
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        callApiLog("get userprofile");
        const profile = await liff.getProfile();
        // callApiLog("Line Token =" + lineToken);
        // console.log("Profile = ", profile.toString());
        callApiLog("Line Token =" + JSON.stringify(profile));
        // console.log("Context = ", context.toString());
        setLineId(profile.userId);
        setLineName(profile.displayName);
        setLoading(false);
      } catch (error) {
        console.log(`liff.getprofile()  failed: ${error}`);
        setLoading(false);
        // setLiffError(error.toString());  <- comment for test
      }
    };
    if (lineToken) {
      // getUserProfile();
    }
  }, [lineToken]);

  const gotoPage = (goto) => {
    console.log("goto page ", goto);
    setPage(goto);
  };

  const PageComponent = () => {
    if (loading) {
      console.log(loading);
      return <CircularWaitingComponent />;
    }

    if (page == "main" && !loading) {
      return (
        <MainComponent
          token={lineToken}
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }
    if (page == "scanQR" && !loading) {
      return (
        <ScanQRComponent
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }

    return <div> Page not found</div>;
  };

  return (
    <div>
      <div className="absolute inset-0  bg-[url('/images/sukhfesta_logo.jpg')]  opacity-40 z-0"></div>
      <PageComponent />
      {/* <MainComponent
        gotoPage={(page) => {
          gotoPage(page);
        }}
      /> */}
      {/* <div className="mx-auto text-[15rem] text-[#55FFDD] ">{point}</div>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/pages/index.js
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            // href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log("click");
              setPoint((p) => {
                console.log(p);
                return p + 1;
              });
            }}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
        </div> */}
      {/* <footer className="row-start-3 z-99 w-full flex gap-[24px] flex-wrap items-center justify-center">
        <div className="flex w-full items-center justify-center">
          {" "}
          <button
            type="button"
            className=" w-11/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              console.log("test");
            }}
          >
            Check Point
          </button>
        </div>

        <a
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
        </a>
      </footer> */}
    </div>
  );
}
