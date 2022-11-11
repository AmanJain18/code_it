import React, {useState} from 'react'
import {v4 as uidv4} from 'uuid';
// import  from 'react-router-dom';

const Home = () => {
   const [Username, setUsername] = useState('');
    const createRoomId = (e) => {
        e.preventDefault();
        const uid = uidv4();
        setRoomId(uid);
    }
  return (
    <div className="hpw flex justify-center items-center text-white h-[100vh]">
      <div className="loginform bg-[#282a36] p-5 rounded-[10px] shadow-white max-w-[90%] w-[450px]">
        <img src="/logo.png" alt="logo" className="h-20" />
        <h4 className="mainlabel mb-5 mt-0 font-semibold">
          Enter Invite Room Id
        </h4>
        <div className="inputGroup flex flex-col">
          <input
            type="text"
            className="inputBox p-3 rounded outline-none border-none mb-4 bg-teal-50 text-black font-bold text-[16px]"
            value={RoomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="ROOM ID"
          />
          <input
            type="text"
            className="inputBox p-3 rounded outline-none border-none mb-4 bg-teal-50 text-black font-bold text-[16px]"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
          />
          <button className="btn joinBtn">Join</button>
          <span className="createInfo mx-auto mt-3 font-bold">
            Don't have an invite, create &nbsp;
            <a
              href="/"
              className="createInvite text-[#4aee88] transition-all duration-300 ease-in-out hover:text-[#1e944b] border-b border-[#4aee88]"
              onClick={createRoomId}
            >
              Your's Room
            </a>
          </span>
        </div>
      </div>
      <footer className="fixed bottom-10">
        <h4>
          Built by &nbsp;
          <a
            className="text-[#4aee88] transition-all duration-300 ease-in-out hover:text-[#1e944b] border-b border-[#4aee88]"
            href="/"
          >
            Aman Jain
          </a>
        </h4>
      </footer>
    </div>
  );
}

export default Home