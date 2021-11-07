
import { socket } from "../app/hooks"
import { SET_STAGE } from '../reducers/stage.reducer';
import { useAppDispatch } from '../app/hooks';
export default (dispatcher: any, getState: any) => {
	const dispatch = useAppDispatch()

	socket.on("stage", function (pyld: any) {
		dispatch(SET_STAGE(JSON.parse(pyld.stage)))
	})
}