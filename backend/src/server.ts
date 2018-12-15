import dgram from "dgram";
import { AddressInfo } from "net";

const PORT_COMMAND_SEND_RECEIVE = 8889;
const PORT_STATE_RECEIVE = 8890;
const PORT_VIDEO_RECEIVE = 11111;

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address: AddressInfo = <AddressInfo>server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

// todo:sw - bind multiple ports
server.bind(PORT_STATE_RECEIVE);
// server listening 0.0.0.0:41234

server.send("Hello", PORT_COMMAND_SEND_RECEIVE, "192.168.1.1", (error: Error | null, bytes: number) => {
  if (error) {
    console.log(`Send error ${error}`);
    return;
  }
  console.log(`Send receive data ${bytes}`);
})

export default server;
