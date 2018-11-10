# Using The Speedometer Server

The speedometer server is written in nodejs and must be started manually. On my Mac:

```bash
$ cd whereever-the-server-script-is/htdocs/speedometer-server/
$ node server

- - - - - - - - - - - - - - - - - - - - -
a http server runs on port 1337,
press strg-c to stop it.
- - - - - - - - - - - - - - - - - - - - -
local ip: 192.168.x.x
- - - - - - - - - - - - - - - - - - - - -
```
It generates and delivers random data via a websocket service and using the port 1337. The port number must be configured in ```server.js```. The browser script uses ```ws://192.168.x.x:1337``` to connect the websocket servive and to receive the data.

```javascript
// declaration
let
  ipAddress = '192.168.x.x',
  socket = new WebSocket('ws://' + ipAddress + ':1337'),
  ...
```

## Installing The Server Script
There is a package.json. The ```$ npm install``` command installs the required ```websocket``` library. I'm using  node ```v10.8.0```.
