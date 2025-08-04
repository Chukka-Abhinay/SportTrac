import { io } from "socket.io-client";

// ✅ use your actual backend port
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const socket = io(BACKEND_URL, {
  transports: ["websocket"],  // optional but helpful
  withCredentials: true       // matches your server CORS
});

// if (typeof window !== 'undefined') {
//   window.socket = socket;
// }
export default socket;
