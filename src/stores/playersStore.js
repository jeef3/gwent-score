import { observable } from 'mobx';
import cardsStore from './cardsStore';

export class PlayersStore {
  @observable
  playerA = {
    name: 'Haley',
    score: cardsStore.playerAScore
  };

  @observable
  playerB = {
    name: 'Jeff',
    score: cardsStore.playerBScore
  };
}

export default new PlayersStore();
