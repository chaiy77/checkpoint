"use client";
import { createContext, useContext, useState } from "react";
import { dummyMyPoint } from "@/tools/dummyData";

// Create Context
const PointContext = createContext();

// Create Provider
export function PointContextProvider({ children }) {
  const [pointDataList, setPointDataList] = useState(dummyMyPoint);

  const addPointToMyList = (newObject) => {
    setPointDataList((prevArray) => [...prevArray, newObject]); // Immutably add object
  };

  // const dummyMyPoint = [
  //   {
  //     namtEN: "Si Satchanalai National Park",
  //     nameTH: "อุทยานแห่งชาติศรีสัชนาลัย",
  //     typeOfPlace: "NationalPark",
  //     typeOfPoint: "normal",
  //   },
  // ];

  return (
    <PointContext.Provider value={{ pointDataList, addPointToMyList }}>
      {children}
    </PointContext.Provider>
  );
}

// Create a custom hook
export const usePointContext = () => useContext(PointContext);
