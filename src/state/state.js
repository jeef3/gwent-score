export default {
  showModal: false,
  dialog: null,
  dialogData: null,

  cards: [
    {
      id: 1,
      player: 'a',
      points: 5,
      combat: 'close',
      scorched: true
    },
    {
      id: 2,
      player: 'a',
      points: 4,
      combat: 'ranged'
    },
    {
      id: 3,
      player: 'a',
      points: 4,
      combat: 'close'
    }
  ],

  players: {
    playerA: {
      name: 'Haley'
    },
    playerB: {
      name: 'Jeff'
    }
  }
};
