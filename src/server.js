const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3001
});

let gameState = {
  cards: [],

  players: {
    playerA: {
      id: 'a',
      name: 'Haley',
      faction: 'monsters'
    },
    playerB: {
      id: 'b',
      name: 'Jeff',
      faction: 'northern-realms'
    }
  }
};

wss.on('connection', ws => {
  console.log('user connected');

  ws.on('message', message => {
    gameState = JSON.parse(message);

    console.log('received game update', gameState);

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(gameState));
      }
    });
  });

  ws.send(JSON.stringify(gameState));
});
