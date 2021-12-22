import RoomBar from "../components/RoomBar";
import RankedPlayers from "../components/RankedPlayers";
import CreateRoomInput from "../components/CreateRoom";
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface IRoom {
  title: string;
  size: number;
  mode: string;
  started: boolean;
  active_players: number;
}
export default function Lobby() {
  const [rooms, getRooms] = useState<IRoom[]>([]);

  function setRooms() {
    axios.get(`${process.env.REACT_APP_API_URL}/rooms`).then((res: any) => {
      if (res.data?.length > 0) getRooms([...res.data]);
      else
	  getRooms([
		{ title: "arena", size: 7, active_players: 5, mode: "multiplayer", started: false },
		{ title: "league", size: 3, active_players: 1, mode: "multiplayer", started: false },
		{ title: "bdroom", size: 2, active_players: 2, mode: "multiplayer", started: true },
		{ title: "labs", size: 10, active_players: 10, mode: "multiplayer", started: false },
		{ title: "cluster", size: 10, active_players: 1, mode: "multiplayer", started: false }])
    });
    return;
  }
  useEffect(() => {
    setRooms();
  }, []);
  return (
    // Start of left side of the lobby page
    <div className="  min-h-screen flex justify-center items-center shadow-xl">
      <div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
        <div className="bg-white lg:w-7/12 p-4 rounded-lg order-2 lg:order-first">
          <h1 className="text-gray-700 text-xl  font-bold">
            Start your own room now !
          </h1>
          {/*Creat a room input*/}
          <CreateRoomInput />
          {/*End of Creat a room input*/}
          <h1 className="text-gray-700 font-bold text-xl tracking-wider">
            Rooms Online now :
          </h1>
          <div className="my-0">
            {rooms.length === 0 ? (
              <h1 className="text-md">
                No open room available ... create yours now!
              </h1>
            ) : (
              rooms
                .sort((a, b) => a.active_players - b.active_players)
                .map((room) => <RoomBar key={room.title} {...room} />)
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start gap-2">
          <ProfileCard />
          {/*START OF RANKING*/}
          <div className="gap-2 justify-between flex flex-row">
            <div className="w-3/5">
              <RankedPlayers />
            </div>

            <div className="bg-white rounded-lg p-1 pl-0 pr-0 w-full ">
              <h1 className="font-bold tracking-wider text-gray-800 text-xl p-2">
                About :
              </h1>
              <div className="flex flex-col items-center">
                <div className="w-full md:w-full flex flex-col items-center h-60">
                  <div className="w-full px-2 overflow-x-auto">
                    <p>
                      <b>Red-Tetris</b> is an online multiplayer tetris game,
                      realised in following stack [<b>reactJs</b>, <b>redux</b>,{" "}
                      <b>sockets</b>, <b>express</b>] and written in typescript,
					  <br/>
                      it provides many features such playing in open/locked room
                      and specify the size of your current room where you are
                      the owner,<br/>
					  play the game synchronously with joined members
                      with same pieces, where one of you wins the game at the
                      end, each time you clear a row, your opponents receive a n
                      -1 row in their board, so be fast and clear more rows
                      faster,
					  <br/>the game just recently deployed to public so there
                      is more feautures incomming to add and more bugs to fix :)
                    </p>
                    <a
                      href="https://www.buymeacoffee.com/allali"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                        alt="Buy Me A Coffee"
                        style={{ height: "50px", width: "180px" }}
                      />
                    </a>

                    <p>
                      if you ever wanted to contact the creator, please feel
                      free to reach me via : <b>hi@allali.me</b>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*END OF RANKING*/}
        </div>
      </div>
    </div>
  );
}
