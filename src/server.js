const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3001
});

const gameState = {
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
    console.log('received:', message);

    wss.clients.forEach(client => {
      if (client !== ws && client.readState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send(
    JSON.stringify({
      type: '→ GAME_STATE_UPDATED',
      payload: gameState
    })
  );
});
