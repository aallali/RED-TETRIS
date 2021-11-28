import axios from "axios";
import { ComponentProps, useEffect, useState } from "react";

export default function RankedPlayers(props: ComponentProps<any>) {
	const [ranksPlayers, setRanks] = useState([])
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/top`)
			.then((res: any) => {
				setRanks(prev => {
					prev = res.data.split("\n").map((l: string) => l.split(","))
					 
					return prev
				})
			})
		return () => {

		};
	}, []);
	return (
		<div className="bg-white rounded-lg p-1 pl-0 pr-0 w-full ">
			<h1 className="font-bold tracking-wider text-gray-800 text-md p-2">
				Top  Ranked Players :
			</h1>
			<div className="flex flex-col items-center">
				<div className="w-full md:w-full flex flex-col items-center h-60">
					<div className="w-full px-0">
						<div className="flex flex-col items-center relative"> 
								<table className="table-fixed w-full">
									<thead className="">
										<tr className="border-b-0 border-black text-sm">
											<th className="w-2/12 bg-gray-100 text-left px-1">Rank</th>
											<th className="w-2/12 bg-gray-100 text-left px-1">level</th>
											<th className="w-5/12 bg-gray-100 text-left px-1">nickname</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-400">
										{ranksPlayers.map((p, i) => (
											<tr key={i + 1}>


												<td className="text-left px-1">[{i + 1}]</td>
												<td className="px-1 text-right">{p[1]}</td>
												<td className="px-1">{p[0]}</td>
											</tr>
										))}

									</tbody>
								</table>

						 
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
