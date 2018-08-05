export default {
  showModal: false,
  dialog: null,
  dialogData: null,

  cards: [
    {
      id: 1,
      player: 'a',
      points: 5,
      combat: 'close'
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
    },
    {
      id: 4,
      player: 'b',
      points: 8,
      combat: 'siege',
      attr: 'tight-bond'
    },
    {
      id: 5,
      player: 'b',
      points: 8,
      combat: 'siege',
      attr: 'tight-bond'
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
