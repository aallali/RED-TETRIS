import {useEffect, useRef, useState} from "react";
import { useAppDispatch} from '../../app/hooks';

import {SET_PLAYER} from "../../actions";
export default function Home() {
    const [nickname, setNickName] = useState("")
    const dispatch = useAppDispatch()




    const isMounted = useRef(false)
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    return (

        <div className="min-h-screen   flex justify-center items-center" style={{
            background:
                'url("https://www.pixelstalk.net/wp-content/uploads/images1/Tetris-Game-Photos-Download.jpg") no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        }}>

            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>

                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                        Welcome to Red Tetris
                    </h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                        choose a nickname to start playing this shit
                    </p>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="nickname..."
                        className="block text-2xl py-3 px-4 rounded-lg w-full border outline-none"
                        // value={player.nickname}
                        onChange={(e) => setNickName(e.target.value)}
                    />

                </div>
                <div className="text-center mt-6">
                    <button className="py-3 w-64 text-xl font-bold  text-2xl text-white bg-gray-600 rounded-2xl"
                    onClick={() => dispatch(SET_PLAYER(nickname))}>
                        PLAY
                    </button>

                </div>
            </div>

        </div>)
}
