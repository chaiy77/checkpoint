// import { google } from "googleapis";

// const shopListName = "shopList"; // Sheet name in google sheet

export default async function handler(req, res) {
  try {
    console.log("Call API Log => ", req.body);
    let result = { success: true };
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ success: false, error: error.message });
    //console.log(error);
  }
}
