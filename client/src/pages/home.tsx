import { useEffect, useState } from "react";
import { useAppDispatch } from '../app/hooks';
import home_wallpaper from "../assets/images/tetris_home_wallpaper.jpg"
import { SET_PLAYER } from "../app/actions";
export default function Home() {
	const [nickname, setNickName] = useState<string>("")
	const [error, setError] = useState<string>("")
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (nickname?.length > 0 && /^[a-zA-Z0-9]{1,10}$/.test(nickname)) {
			setError("")
		} else
			setError("nickname should be alphabetics or number or alphanumeric and 10 characters maximum ")
	}, [nickname])

	function setName(e: any) {
		dispatch(SET_PLAYER({ name: nickname }))
	}
	return (

		<div className="min-h-screen   flex justify-center items-center" style={{
			background:
				`url("${home_wallpaper}") no-repeat`,
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		}}>

			<div className="py-10 px-10 bg-white rounded-2xl shadow-xl z-20 " style={{ width: "400px" }}>
				<div>
					<h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
						Welcome to DarkTetris
					</h1>
					<p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
						choose a nickname to start playing
					</p>
				</div>
				<div className="space-y-4 ">
					<input
						type="text"
						placeholder="nickname..."
						className="block text-2xl py-3 px-4 rounded-lg w-full border outline-none"
						value={nickname}
						onChange={(e) => setNickName(e.target.value.trim())}
					/>
					<p className="text-red-500 text-md p-1 ">{error}</p>
				</div>
				<div className="text-center mt-6">
					<button className={"py-3 w-64 text-xl font-bold  text-2xl text-white  rounded-2xl" + (error ? " bg-gray-300" : " bg-gray-900")}
						onClick={setName}
						data-testid="play"
						disabled={!error ? false : true}>
						PLAY
					</button>

				</div>
			</div>

		</div>)
}
