const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3001
});

let gameState = {
  cards: [
    {
      id: '123',
      player: 'b',
      points: 15,
      hero: true,
      combat: 'ranged'
    }
  ],
  players: {
    playerA: {
      id: 'a',
      name: 'Bob',
      faction: 'monsters'
    },
    playerB: {
      id: 'b',
      name: 'J',
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
