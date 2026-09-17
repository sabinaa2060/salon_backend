import app from "./app";
import connectDB from "./config/db.config";
connectDB();
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});