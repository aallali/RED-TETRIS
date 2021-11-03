
import ProfileCard from "../../component/profileCard";
import {ComponentProps} from "react";
import Tetris from "../../component/tetris/board";
import Stage from "../../component/tetris/Stage";
import {getStage} from "../../reducers/stage.reducer";
import {useAppSelector} from "../../app/hooks";
function Opponent(props: ComponentProps<any>) {
    const miniStage = useAppSelector(getStage)
    return (<div className="sm:w-1/4 p-0">
        <div className="bg-white p-1 rounded-lg shadow-lg text-center">
            <h2 className="text-md font-bold text-gray-700">#{props.name}</h2>
            <div className="">
                {miniStage ? <Stage  gridSize={10} stage={miniStage}/> : null}
            </div>
            <span className="text-red-500 font-bold block mb-1">LOST</span>
        </div>
    </div>)
}

export default function Playboard() {
    console.log("Rerender mini stage")

    return (
        // Start of left side of the lobby page
        <div className="bg-gray-200 min-h-screen flex justify-center items-center shadow-xl">
            <div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
                <div className="bg-white lg:w-7/12 p-4 rounded-lg order-2 lg:order-first">

                    <div className="w-full mx-auto">
                        <div className="flex flex-col flex-1 sm:flex-row gap-0">
                            <Tetris/>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start gap-2">

                    {/*START OF RANKING*/}
                    <div className="w-full mx-auto">
                        <div className="flex flex-row sm:flex-row gap-1">
                            {/* Oponent 1 */}
                            <Opponent name={"user1"}/>
                            {/* Oponent 2 */}
                            <Opponent name={"user2"}/>
                            {/* Oponent 3 */}
                            <Opponent name={"user3"}/>
                            {/* Oponent 4 */}
                            <Opponent name={"user4"}/>


                        </div>
                    </div>
                    {/*END OF RANKING*/}
                    <ProfileCard playboard={true}/>
                </div>
            </div>
        </div>
    );
}
