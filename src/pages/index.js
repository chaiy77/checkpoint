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
        // callApiLog("Line Token =" + JSON.stringify(profile));
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
      getUserProfile();
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
      <div className="absolute inset-0  bg-[url('/images/background.webp')] md:bg-[url('/images/background_wide.webp')] bg-cover fixed opacity-40 z-0"></div>
      <PageComponent />
      {/* <MainComponent
        gotoPage={(page) => {
          gotoPage(page);
        }}
      /> */}
    </div>
  );
}
