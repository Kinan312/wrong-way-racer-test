import { io } from "socket.io-client";
const API_URL = "https://wrongway-racer-api.spls.ae/";

export const socket = io(API_URL);
socket.connect();
socket.on("connect", () => {
    console.log("connected", socket); // true
});

socket.on("disconnect", () => {
    console.log("connected", socket.connected); // false
});