import { WebSocketServer } from 'ws';
import express from 'express';
import http from 'http';

// Express app for Render’s HTTP health checks
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ server });

app.get('/', (req, res) => {
  res.send('✅ Announcement WebSocket server is running.');
});

wss.on('connection', ws => {
  console.log('✅ Client connected');

  ws.on('message', msg => {
    console.log('📢 Announcement:', msg.toString());

    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on('close', () => console.log('❌ Client disconnected'));
});

server.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
