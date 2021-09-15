import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Button from './components/CustomButton';
import JoystickArea from './components/Joystick';
import config from './config';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import useScreenOrientation from 'react-hook-screen-orientation'
const { v4: uuidv4 } = require('uuid');

function App() {

  const [socket, setSocket] = useState<any | null>(null);

  const [uid, setUid] = useState<any | null>(null);

  useEffect(() => {
    const newSocket = io(config.socket.url);
    setSocket(newSocket);
    setUid(uuidv4());
    return () => { newSocket.close() };
  }, [setSocket]);

  const screenOrientation = useScreenOrientation();

  return (
    <Grid container spacing={0} style={{ height: "100%" }} justifyContent="center">
      {screenOrientation === "portrait-primary" ? <><Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" maxHeight='50vh' className="joystick">
          <JoystickArea
            title="Dynamic"
            options={{ mode: "dynamic", color: "#1f22b3" }}
            height={"80vh"}
            socket={socket}
            uid={uid} />
        </Box>
      </Grid><Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center" maxHeight='50vh' className="buttonBox">
            <Button buttonId='1' height="100" width="100" socket={socket} uid={uid} />
            <Button buttonId='2' height="100" width="100" socket={socket} uid={uid} />
          </Box>
        </Grid></> 
        : <><Grid item xs={6}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh' className="joystick">
            <JoystickArea
              title="Dynamic"
              options={{ mode: "dynamic", color: "#1f22b3" }}
              height={"100vh"}
              socket={socket}
              uid={uid} />
          </Box>
        </Grid><Grid item xs={6}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh' className="buttonBox">
            <Button buttonId='1' height="100" width="100" socket={socket} uid={uid} />
            <Button buttonId='2' height="100" width="100" socket={socket} uid={uid} />
          </Box>
        </Grid></>}
      
    </Grid>
  );
}

export default App;
