import { Socket } from "dgram";

let io: Socket;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const init = (server: any) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["my-custom-header"],
      transports: ["websockets"],
    },
  });

  io.on("connection", (socket: unknown) => {
    console.log(socket);
    console.log("a user connected");
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMessage = (message: any) => {
  return io.emit(message.eventType, message.eventData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMessageByTypeAndData = (eventType: any, eventData: any) => {
  return io.emit(eventType, eventData);
};
