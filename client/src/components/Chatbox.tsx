
/* eslint-disable react-hooks/exhaustive-deps */

import { createRef, useEffect, useState } from "react";
import { socket, useAppDispatch, useAppSelector } from "../app/hooks";
import { ADD_MSG, getChatMsgs } from "../reducers/chat.reducer";
import { getOpponents } from "../reducers/opponent.reducer";
import "./css/chatbox.css"

const SentMsg = ({ msg }: { msg: string }) => (<div className="message bg-black text-white p-1 self-end my-1 rounded-md shadow ml-3">
	{msg}
</div>)
const ReveicedMsg = ({ from, msg }: { from: string, msg: string }) => (<div className="message bg-white text-gray-700 p-1 self-start my-1 rounded-md shadow mr-3">
	<b>[{from}]</b>:{msg}
</div>)
function ChatBox() {
	const dispatch = useAppDispatch()
	const boxRef = createRef<any>()
	const friends = useAppSelector(getOpponents).map(l => l.name)
	const [msg, setMsg] = useState<string>("")
	const chatMsgs = useAppSelector(getChatMsgs)
	const [newMsgs, setNewMsg] = useState(false)
	const [chatOpen, setChatOpen] = useState(false)
	const handleMsg = (v: string) => {
		if (v?.length <= 100)
			setMsg(v)
	}

	const handleSendMsg = () => {
		if (msg?.trim().length > 0) {
			dispatch(ADD_MSG({ from: "sssss", msg: msg }))
			socket.emit("CHAT_MSG", { msg: msg })
			setMsg("")
		}
	}

	const handleKeyDown = ({ key }: { key: string }) => {
		if (key === 'Enter') {
			handleSendMsg()
		}
	}

	const closeModel = () => {
		const chatModal: Element | null = document.querySelector('.chat-modal');
		const chatServices: Element | null = document.querySelector('.chat-services');
		const showChat: Element | null = document.querySelector('.show-chat');

		setTimeout(() => {
			showChat?.classList.remove('hidden')
		}, 820);
		chatServices?.classList.remove('expand')
		setTimeout(() => {
			chatModal?.classList.remove('show')
		}, 500);
		setChatOpen(false)
		setNewMsg(false)
		return true
	}

	const showModel = () => {
		const chatModal: Element | null = document.querySelector('.chat-modal');
		const chatServices: Element | null = document.querySelector('.chat-services');
		const showChat: Element | null = document.querySelector('.show-chat');

		chatModal?.classList.add('show')
		showChat?.classList.add('hidden')
		setTimeout(() => {
			chatServices?.classList.add('expand')
		}, 500);
		setNewMsg(false)
		setChatOpen(true)
		return true
	}
	useEffect(() => {
		if (boxRef.current)
			boxRef.current.scrollTop = boxRef.current.scrollHeight;
		setNewMsg(true)
	}, [chatMsgs])

	useEffect(() => {
		// closeModel()
		setTimeout(() => {
			showModel()
		}, 500)
	}, [])
	useEffect(() => {
		const showChat: Element | null = document.querySelector('.show-chat');
		if (newMsgs && !chatOpen) {
			showChat?.classList.add('blob')
			showChat?.classList.add('red')
		}
		else {
			showChat?.classList.remove('blob')
			showChat?.classList.remove('red')
		}
	}, [newMsgs, chatOpen])
	return (
		<div>

			<div className="fixed bottom-0 right-0 flex flex-col items-end ml-6  w-auto ">
				<div className={"chat-modal mr-1 flex flex-col mb-5 shadow-lg w-full"}
					data-testid="chat-modal">
					<div
						className="close-chat bg-red-500 hover:bg-red-600 text-white mb-1 w-10 flex justify-center items-center px-2 py-1 rounded self-end cursor-pointer"
						data-testid="closeModal"
						onClick={() => closeModel()}
					>
						<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd"
								d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
							<path fillRule="evenodd"
								d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
						</svg>
					</div>

					<div
						className="flex justify-between items-center text-white p-1 pl-4 bg-black border shadow-lg mr-5 w-full rounded-t-lg">
						<div className="flex items-center">
							{
								friends.map(l => (<img
									src={"https://ui-avatars.com/api/?background=B82E1F&bold=true&color=fff&name=" + l}
									alt={l}
									key={l}
									className="rounded-full w-8 h-8 mr-1 -ml-3 border-2 border-white">
								</img>))
							}

							<h2 className="font-semibold tracking-wider">{friends.join(',')}</h2>

						</div>

					</div>

					<div className={"flex flex-col bg-gray-200 px-2 chat-services overflow-auto "} ref={boxRef}
						data-testid="chat-services"
					>
						{
							chatMsgs.map((l, i) => {
								if (!l.from) return <SentMsg key={i} msg={l.msg} />
								return <ReveicedMsg key={i} from={l.from} msg={l.msg} />
							})
						}
					</div>
					<div className="relative bg-white ">
						<input type="text" name="message" placeholder="write your message here ..."
							className="pl-4 pr-16 py-2 border border-black-500 focus:outline-none w-full"
							value={msg}
							onChange={(e) => handleMsg(e.target.value)}
							onKeyDown={handleKeyDown}
						>
						</input>
						<button
							className="absolute right-0 bottom-0 text-black bg-white  hover:text-blue-500 m-1 px-3 py-1 w-auto transistion-color duration-100 focus:outline-none"
							data-testid="send"
							onClick={() => handleSendMsg()}
						>Send
						</button>
					</div>
				</div>
				<div
					className={"show-chat mx-10 mb-6 mt-4 text-white hover:text-gray-500 flex justify-center items-center cursor-pointer "}
					data-testid="show-chat"
					onClick={() => showModel()}
				>
					<svg width="4em" height="2em" viewBox="0 0 16 16" className="bi bi-chat-text-fill" fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd"
							d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
					</svg>
				</div>
			</div>

		</div>
	)
};

export default ChatBox
