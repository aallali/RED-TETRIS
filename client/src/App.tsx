import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom'
import Home from './pages/home'
import Lobby from './pages/lobby'
import {
    getPlayer,
} from './reducers/player.reducer';
import {useAppSelector} from "./app/hooks";
import PlayBoard from "./pages/playboard";
import io from "socket.io-client"

const socket:any = io("http://localhost:4242")
socket.on("connection", function (result:any) {
   console.log(result)
  });
//:LEAVE:Client Supplied Room
socket.on('unsubscribe', function(room:any){  
	try{
	  console.log('[socket]','leave room :', room);
	  socket.leave(room);
	  socket.to(room).emit('user left', socket.id);
	}catch(e){
	  console.log('[error]','leave room :', e);
	  socket.emit('error','couldnt perform requested action');
	}
  })
  
function App() {
    const player = useAppSelector(getPlayer)
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
