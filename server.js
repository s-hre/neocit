import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });

console.log('🌐 Announcement WebSocket running on ws://localhost:8080');

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log('Received:', message.toString());

    // Broadcast message to everyone
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});
