import {ComponentProps} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getPlayer} from "../reducers/player.reducer";
import {LOGOUT_PLAYER} from "../actions";

export default function ProfileCard(props: ComponentProps<any>) {
    const player = useAppSelector(getPlayer)
    const dispatch = useAppDispatch()
    return (

        <div className="bg-white p-1 rounded-lg text-center">
            <img
                src="https://images.launchbox-app.com/db8057c0-f51e-403f-9d59-46100abed4c6.png"
                alt="deflat"
                className="h-10 w-full object-cover content-center rounded-t-lg"
            />
            <div className="flex justify-center">
                <img
                    src="https://ui-avatars.com/api/?background=B82E1F&bold=true&color=fff&name=Abdellah+Allali"
                    alt="gogba"
                    className="w-10 h-10 rounded-full object-cover content-center -mt-5 border-4 border-white"
                />
            </div>
            <h1 className="text-center font-bold tracking-wider text-gray-700   m-0">
                #{player.nickname}
            </h1>


            <button
                className="bg-blue-100  border-1 border-blue-700 py-2 px-2 rounded-md text-blue-700 text-lg font-bold m-0">
                Level 0
            </button>
            <div className="mt-0 flex justify-between mx-10 mb-1">
                <div className="text-left">
                    <h1 className="text-gray-500">Wins</h1>
                    <p className="text-xl text-gray-800">12</p>
                </div>
                <div className="text-left">
                    <h1 className="text-gray-500">Loses</h1>
                    <p className="text-xl text-gray-800">33</p>
                </div>
                <div className="text-left">
                    <h1 className="text-gray-500">Points</h1>
                    <p className="text-xl text-gray-800">42</p>
                </div>
            </div>

            <div className="w-full mx-auto">
                <div className="flex flex-col flex-1 sm:flex-row gap-1">
                    <button
                        className="bg-red-300 hover:bg-red-700 w-full py-1 px-4 mr-0 rounded-md text-white text-sm font-semibold"
                        onClick={() => dispatch(LOGOUT_PLAYER())}>
                        Leave
                    </button>
                    {props.playboard ?
                        (<button
                            className="bg-green-300 hover:bg-green-700 w-full py-1 px-4 m-0 rounded-md text-white text-sm font-bold"
                        >
                            Start
                        </button>) : null
                    }
                </div>
            </div>


        </div>


    );
}
