import express from "express";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import cors from "cors";

const app = express();
const PORT = 9000;

connectToMongo();

app.use(cors());        //Cross-Origin Resource Sharing (CORS)
app.use(express.json());

app.use(express.static("public/upload"));

app.get("/",(req,res)=>{
    res.send("Api is running...");
});

// API ROUTES
app.use("/api/v1", authRoutes);  
 
app.listen(PORT,()=>{
    console.log(`Api is running at http://localhost:${PORT}`);
});