import {ComponentProps} from "react";

export default function RankedPlayers(props: ComponentProps<any>) {
    const ranksPlayers = [
        {
            image: "https://randomuser.me/api/portraits/men/62.jpg",
            name: "aallali",
            rank: 1,
            points: 3456,
        },
        {
            image: "https://randomuser.me/api/portraits/men/87.jpg",
            name: "mouad",
            rank: 2,
            points: 124,
        },
        {
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            name: "amina",
            rank: 3,
            points: 100,
        },
        {
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            name: "golden",
            rank: 4,
            points: 80,
        },
        {
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            name: "crimpo",
            rank: 5,
            points: 50,
        },
        {
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            name: "byno",
            rank: 6,
            points: 33,
        }
    ].sort((a, b) => a.rank - b.rank)
    return (
        <div className="bg-white rounded-lg p-1 pl-0 pr-0 w-full ">
            <h1 className="font-bold tracking-wider text-gray-800 text-xl p-2">
                Top  Ranked Players
            </h1>
            <div className="flex flex-col items-center">
                <div className="w-full md:w-full flex flex-col items-center h-60">
                    <div className="w-full px-0">
                        <div className="flex flex-col items-center relative">
                            <div
                                className="absolute shadow bg-white top-100 z-40 lef-0 p-2 rounded max-h-select overflow-y-auto">
                                <table className="table-fixed w-full">
                                    <thead className="">
                                    <tr className="border-b-0 border-black text-sm">
                                        <th className="w-2/12 bg-gray-100 text-left px-1">Rank</th>
                                        <th className="w-2/12 bg-gray-100 text-left px-1">level</th>
                                        <th className="w-8/12 bg-gray-100 text-left px-1">nickname</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-400">
                                    {ranksPlayers.map(p => (
                                        <tr key={p.rank}>


                                            <td className="text-left px-1">#{p.rank}</td>
                                            <td className="px-1 text-right">{p.points}</td>
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
