import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom'
import Home from './pages/home'
import Lobby from './pages/lobby'
import {
    getPlayer,
} from './reducers/player.reducer';
import {useAppSelector} from "./app/hooks";
import PlayBoard from "./pages/playboard";
 
  
function App() {
    const player = useAppSelector(getPlayer)
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
