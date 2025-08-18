
import WebSocket, { WebSocketServer } from 'ws';    

type UserSocket = {
    userId: string
    socket: WebSocket
}

let sockets: UserSocket[] = [];


export const initSocket = () => {

    const PORT = Number(process.env.SOCKET_PORT) || 8080;
    
    const server = new WebSocketServer({ port: PORT });

    server.on('connection', function (socket: WebSocket) {

        socket.on('message', function (msg: WebSocket.RawData) {

        const socketMsg = JSON.parse(msg.toString());

        if(socketMsg.type==='identify'){
            const userId = socketMsg.id
            sockets.push({ userId, socket });
        }
            
     });
      
    //  mensagem de teste
    //  setTimeout(()=> {
    //   socket.send(JSON.stringify({ type: 'notification', message: 'Olá mundo' }));
    //  },3000)

    socket.on('close', () => {
        sockets = sockets.filter(userSocket => userSocket.socket !== socket);
    });

});
    
}

//Função para enviar notificações utilizando o web socket
export const sendNotification = (id:string, notification:string) => {


    setTimeout(() => {

        const userSocket = sockets.find(us => String(us.userId) === String(id));

        if (userSocket) {
    
            userSocket.socket.send(JSON.stringify({ type: 'notification', message: notification }));
            console.log(`Sent notification to user ${id}`);
      
          } else {
      
            console.log(`User ${id} is not connected.`);
      
          }
    },3000);

}