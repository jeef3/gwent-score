import { observable, action, computed } from 'mobx';
import uuid from 'uuid';

export class CardsStore {
  @observable cardsRegistry = observable.map();

  @computed
  get cards() {
    return this.cardsRegistry.values();
  }

  @computed
  get fullBoard() {
    return {
      playerA: {
        close: {
          cards: [],
          score: 0
        }
      },

      playerB: {
        close: {
          cards: [],
          score: 0
        }
      }
    };
  }

  @computed
  get playerAScore() {
    return 10;
  }

  @computed
  get playerBScore() {
    return 20;
  }

  @computed
  get activeWeather() {
    return this.cardsRegistry
      .values()
      .filter(card => card.special === 'weather');
  }

  reset() {
    this.cardsRegistry.clear();
  }

  @action
  playCard(card) {
    this.cardsRegistry.set(uuid(), card);
  }

  @action
  clearWeather() {
    const weatherCards = this.cardsRegistry
      .values()
      .filter(card => card.special === 'weather');

    weatherCards.forEach(card => this.cardsRegistry.delete(card.id));
  }
}

export default new CardsStore();
