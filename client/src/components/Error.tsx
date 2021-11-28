import React from "react"
import { IError } from "../types"

const Error: React.FC<IError> = ({ title, message, secondaryMessage }) => {
	if (title === "hash_query_error")
		return (<div className="flex flex-col h-screen bg-gray-800">
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
									Invalid Hash Query, please respect the following format
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
		</div>)
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
								<h6 className="font-medium text-red-900">{title}</h6>
								<p className="text-red-700 leading-tight">
									{message}
								</p>
								<p> {secondaryMessage}</p>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

	)
}


export default Error