import React, { useEffect } from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom'
import Home from './pages/home'
import Lobby from './pages/lobby'
import {
    getPlayer,
} from './reducers/player.reducer';

import PlayBoard from "./pages/playboard";
import { socket } from "./app/hooks"
import { SET_STAGE } from './reducers/stage.reducer';

import { useAppSelector, useAppDispatch  } from "./app/hooks"
import listenerSetter from "./listeners"




function App() {
	listenerSetter(useAppDispatch, useAppSelector)
    const player = useAppSelector(getPlayer)
	console.log("RE-RENDER APP COMPONENT...")
	if (player.nickname) {}
    return (


        <HashRouter hashType="noslash">
            <div>
                <Switch>


                    <Route exact path="/">
                        {!player.nickname ? (<Home/>) : (<Lobby/>)}
                    </Route>)

                    <Route path="/:roomName">
                        {!player.nickname ? (<Home/>) : (<PlayBoard/>)}
                    </Route>
                    <Route>
                        <h1 className="text-9xl font-bold text-gray-700">404 Page Not Found :(</h1>
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    )
        ;
}

export default App;
