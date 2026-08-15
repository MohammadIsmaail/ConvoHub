import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket: Socket | null = null;

export const connectSocket = (
    token: string
): Socket => {

    if (!socket) {
        socket = io(SOCKET_URL, {
            auth: {
                token
            }
        });
    }

    return socket;
};

export const getSocket = (): Socket | null => {
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
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