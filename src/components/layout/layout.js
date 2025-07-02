// import { OrderContextProvider } from "@/context/orderContext";
// import { MenuContextProvider } from "@/context/menuContext";
// import { ShopContextProvider } from "@/context/shopContext";
// import { LiffContextProvider } from "@/context/liffContext";
import { PointContextProvider } from "@/context/pointContext";
const RootLayout = ({ children }) => {
  return (
    <div
      className="container  justify-items-center 
        min-h-screen py-4 sm:px-8 max-w-full"
    >
      <div className="flex flex-col w-full">
        <div className="flex-1 overflow-auto ">
          {/* <OrderContextProvider> {children} </OrderContextProvider> */}
          <PointContextProvider> {children}</PointContextProvider>
        </div>

        {/* <MenuPageButton /> */}
      </div>
    </div>
  );
};

export default RootLayout;
