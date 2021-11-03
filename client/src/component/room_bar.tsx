import {ComponentProps} from "react";

export default function RoomBar(props:ComponentProps<any>) {
     return (
        <div className="flex justify-between items-center mt-5 border-b-4 rounded-md">
            <div className="flex justify-items-start gap-3 items-stretch rounded-md">
                <img className="rounded-l-md h-14 "
                     src={"https://ui-avatars.com/api/?background=B82E1F&bold=true&color=fff&name=" + props.name}
                     alt=""/>
                <div>
                    <h1 className="font-bold text-gray-700">Room : #{props.name}</h1>
                    <p className="text-sm text-gray-500">{props.active_players}/5 Players</p>
                </div>
            </div>
            <div className="">
                <button
                    className={"bg-blue-500 h-14 hover:bg-blue-400 text-white font-bold py-2 px-4 " +
                    "order-b-4 border-blue-700 hover:border-blue-500 rounded-r " + (props.active_players === 5 ? "opacity-50 cursor-not-allowed" : null)}
                >
                    JOIN
                </button>
            </div>
        </div>    );
}
