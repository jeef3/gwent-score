import { observable, action, computed } from 'mobx';

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
  get playerAScore() {}

  @computed
  get playerBScore() {}

  @computed
  get activeWeather() {}

  reset() {
    this.cardsRegistry.clear();
  }

  @action
  playCard(card) {
    this.cardsRegistry.set('a', card);
  }

  @action
  clearWeather() {
    const weatherCards = this.cardsRegistry.filter(
      card => card.special === 'weather'
    );
  }
}

export default new CardsStore();
