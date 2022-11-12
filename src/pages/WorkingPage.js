import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
const WorkingPage = () => {
      const socketRef = useRef(null);
      const codeRef = useRef(null);
      const location = useLocation();
      const { roomId } = useParams();
      const reactNavigator = useNavigate();
      const [clients, setClients] = useState([
        {socketId: 1, username: 'Aman Jain'},
        {socketId: 2, username: 'sunil Jain'},
        {socketId: 3, username: 'tunil Jain'},
      ]);

      useEffect(() => {
        const init = async () => {
          socketRef.current = await initSocket();
          socketRef.current.on("connect_error", (err) => handleErrors(err));
          socketRef.current.on("connect_failed", (err) => handleErrors(err));

          function handleErrors(e) {
            console.log("socket error", e);
            toast.error("Socket connection failed, try again later.");
            reactNavigator("/");
          }

          socketRef.current.emit(ACTIONS.JOIN, {
            roomId,
            username: location.state?.username,
          });

          // Listening for joined event
          socketRef.current.on(
            ACTIONS.JOINED,
            ({ clients, username, socketId }) => {
              if (username !== location.state?.username) {
                toast.success(`${username} joined the room.`);
                console.log(`${username} joined`);
              }
              setClients(clients);
              socketRef.current.emit(ACTIONS.SYNC_CODE, {
                code: codeRef.current,
                socketId,
              });
            }
          );

          // Listening for disconnected
          socketRef.current.on(
            ACTIONS.DISCONNECTED,
            ({ socketId, username }) => {
              toast.success(`${username} left the room.`);
              setClients((prev) => {
                return prev.filter((client) => client.socketId !== socketId);
              });
            }
          );
        };
        init();
        return () => {
          socketRef.current.disconnect();
          socketRef.current.off(ACTIONS.JOINED);
          socketRef.current.off(ACTIONS.DISCONNECTED);
        };
      }, []);
  async function copyRoomId() {
    try {
      // await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  function leaveRoom() {
      reactNavigator("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="left-side bg-[#1c1e29] p-4 text-white flex flex-col">
        <div className="asideInner flex-1 ">
          <div className="logo pb-3 border-b border-[#4aee88]">
            <img src="/logo.png" alt="logo" className="h-12" />
          </div>
          <h3 className="font-bold py-2">Connected</h3>
          <div className="teamList flex items-center flex-wrap gap-5">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn font-bold" onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn mt-5" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      {/* <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div> */}
    </div>
  );
};

export default WorkingPage;
