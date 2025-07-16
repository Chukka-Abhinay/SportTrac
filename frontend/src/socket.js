import { io } from "socket.io-client";

// ✅ use your actual backend port
const BACKEND_URL = "http://localhost:3000";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],  // optional but helpful
  withCredentials: true       // matches your server CORS
});

// if (typeof window !== 'undefined') {
//   window.socket = socket;
// }
export default socket;
