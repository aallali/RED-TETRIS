
import ProfileCard from "../component/profileCard";
import Opponents from "../component/opponents"
import styled from "styled-components";
import Display from '../component/tetris/Display/Display';

import Tetris from "../component/tetris";
import { socket } from "../app/hooks";
import { useCallback, useEffect, useState } from "react";
import Error from "../component/Error"
// import { getPlayer } from "../../reducers/player.reducer";


export const HashParser = (window_hash: string) => {
	const regexp = /(?<roomname>[a-zA-Z0-9]{1,10})\[(?<username>[a-zA-Z0-9]{1,10})\]/;
	const result = window_hash.match(regexp);
	if (result)
		return result;
	return false;
};




export const StyledOverlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333333;
  z-index: 2;
  outline: 4px solid #333333;
  opacity: 0.9;
`
export default function Playboard() {
	console.log("__PLAYBOARD")

	const checkHash = 1 + 1 === 2
	if (checkHash === false) {
		return (
			<div className="flex flex-col h-screen bg-gray-800">
				<div className="grid place-items-center mx-0 my-0 sm:my-auto">
					<div className="bg-white p-3 rounded-xl shadow">
						<div className="m-auto space-y-10">
							<div className="flex gap-4 bg-red-100 p-4 rounded-md">
								<div className="w-max">
									<div className="h-10 w-10 flex rounded-full bg-gradient-to-b from-red-100 to-red-300 text-red-700">

									</div>
								</div>
								<div className="space-y-1 text-sm">
									<h6 className="font-medium text-red-900">OUUPS!</h6>
									<p className="text-red-700 leading-tight">
										Invalid Hash Query please respect the following format
									</p>
									<p className="text-red-700 leading-tight">while the (room/player) names should be alphabetics between 1-10 character
									</p>


									<p>http://&lt;server_name_or_ip&gt;:&lt;port&gt;/#&lt;room&gt;[&lt;player_name&gt;] </p>
									<p><b>Example : </b> http://localhost:3003/#arena[aallali]</p>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

		)
	}
	else {
		return (
			// Start of left side of the lobby page
			<div className="bg-gray-200 min-h-screen flex justify-center items-center shadow-xl">
				<div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
					<div className="bg-white lg:w-7/12 p-4 rounded-sm ">

						<div className="w-full mx-auto">
							<div className="flex flex-col sm:flex-row gap-1 content-center">
								{/* <StyledOverlay> */}
								<div style={{ width: "100%" }}>1</div>
								<div style={{ width: "100%" }}>2</div>


								<div style={{ width: "100%" }}><Tetris /></div>
								<div style={{ width: "100%" }}>4</div>
								<div style={{ width: "100%" }}>5</div>


								{/* </StyledOverlay> */}
							</div>
						</div>
					</div>
					<div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start gap-1">
						<ProfileCard playboard={true} />
						<div className="w-full mx-auto">

							<Opponents />

						</div>
					</div>
				</div>
			</div>
		)
	}
}
