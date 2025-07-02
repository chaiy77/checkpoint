// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  try {
    console.log("Call   API => data :", req.body);
    const method = req.body?.method;
    switch (method) {
      case "apiLog":
        apiLog(req.body.data);
    }
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ success: false, error: error.message });
    //console.log(error);
  }
}

const apiLog = async (message) => {
  console.log("API LOG => ", message);
};
