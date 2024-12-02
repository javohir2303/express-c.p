import express from "express";
import cors from "cors";
import { router } from "./modules/module.routes.js";
import { ResData } from "./lib/resData.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", router);

// Error handling middleware
server.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const resData = new ResData(statusCode, err.message || "Internal Server Error");
    res.status(resData.statusCode).json(resData);
});

server.listen(7777, () => {
    console.log("Server is running on http://localhost:7777");
});
