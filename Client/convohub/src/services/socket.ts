import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const connectSocket = (token: string): Socket => {
    const socket = io(SOCKET_URL, {
        auth: {
            token
        }
    });

    return socket;
};


// import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:5000";

// export const connectSocket = (): Socket => {
//     const token = localStorage.getItem("token");

//     const socket = io(SOCKET_URL, {
//         auth: {
//             token
//         }
//     });

//     return socket;
// };