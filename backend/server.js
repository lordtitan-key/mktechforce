import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 MKTechForce Backend Started");
    console.log(`🌐 Server: http://localhost:${PORT}`);
    console.log("=================================");
});