// Load shared environment variables
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve("../config.env"),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.API_BASE_URL,
    },
};

export default nextConfig;
