import { observable } from 'mobx';
import boardStore from './boardStore';

export class PlayersStore {
  @observable
  playerA = {
    name: 'Haley',
    score: boardStore.playerAScore
  };

  @observable
  playerB = {
    name: 'Jeff',
    score: boardStore.playerBScore
  };
}

export default new PlayersStore();
