import {ComponentProps} from "react";

export default function RankedPlayers(props: ComponentProps<any>) {
    const ranksPlayers = [
        {
            image: "https://randomuser.me/api/portraits/men/62.jpg",
            name: "Abdellah ALLALI",
            rank: 1,
            points: 3456,
        },
        {
            image: "https://randomuser.me/api/portraits/men/87.jpg",
            name: "Bernard ZRG",
            rank: 2,
            points: 124,
        },
        {
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            name: "JUHA BIKRAK",
            rank: 3,
            points: 33,
        }
    ].sort((a, b) => a.rank - b.rank)
    return (
        <div className="bg-white rounded-lg p-1">
            <h1 className="font-bold tracking-wider text-gray-800 text-2xl p-2">
                Top  Ranked Players
            </h1>
            <br/>
            <div className="flex flex-col items-center">
                <div className="w-full md:w-full flex flex-col items-center h-64">
                    <div className="w-full px-0">
                        <div className="flex flex-col items-center relative">
                            <div className="w-full">
                                <div className="my-0 p-1 bg-white flex border border-gray-200 rounded">
                                    <div className="flex flex-auto flex-wrap"/>
                                    <input
                                        placeholder="Search by position"
                                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                    />
                                    <div
                                        className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                                        <button
                                            className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="100%"
                                                height="100%"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-chevron-up w-4 h-4"
                                            >
                                                <polyline points="18 15 12 9 6 15"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                                <table className="table-fixed   w-full    ">
                                    <thead className="">
                                    <tr className="border-b-0 border-black">
                                        <th className="w-2/12 bg-gray-100 text-left px-1 ">rank</th>
                                        <th className="w-2/12 bg-gray-100 text-left px-1">pts.</th>
                                        <th className="w-8/12 bg-gray-100 text-left px-1">nickname</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-400">
                                    {ranksPlayers.map(p => (
                                        <tr key={p.rank}>


                                            <td className="text-left px-1">#{p.rank}</td>
                                            <td className="px-1">{p.points}</td>
                                            <td className="px-1">{p.name}</td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
