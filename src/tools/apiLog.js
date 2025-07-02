export const callApiLog = async (data) => {
  try {
    const response = await fetch("api/apiLog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // shopId: "9a51a65f-9849-4a34-9e87-942563e9795e", // <-- fixed shopId for test  not need line access
        data: data, // <-- use this for line access
      }),
    });
    const result = await response.json();
    // console.log("callApiLog result  =", result);
    // if (result.success) {
    //   console.log("tools => call apiLogresult= ", result);
    return result;
    // }
  } catch (error) {
    console.error("Error sending message:", error);
    // return ressult;
    //console.log(error);
  }
};
