import { observable, action, computed } from 'mobx';

import { calcScore, sum } from '../score';
import scorch from '../scorch';
import appStore from './appStore';

const isVisible = card => card.points !== null && card.points !== undefined;

export class CardsStore {
  @observable cards = [];

  @computed
  get fullBoard() {
    const playerACards = this.cards.filter(c => c.player === 'a' || !c.player);
    const playerBCards = this.cards.filter(c => c.player === 'b' || !c.player);

    const playerACloseCards = calcScore(
      playerACards.filter(c => c.combat === 'close')
    );
    const playerARangedCards = calcScore(
      playerACards.filter(c => c.combat === 'ranged')
    );
    const playerASiegeCards = calcScore(
      playerACards.filter(c => c.combat === 'siege')
    );

    const playerBCloseCards = calcScore(
      playerBCards.filter(c => c.combat === 'close')
    );
    const playerBRangedCards = calcScore(
      playerBCards.filter(c => c.combat === 'ranged')
    );
    const playerBSiegeCards = calcScore(
      playerBCards.filter(c => c.combat === 'siege')
    );

    return {
      playerA: {
        close: {
          cards: playerACloseCards.filter(isVisible),
          score: sum(playerACloseCards)
        },
        ranged: {
          cards: playerARangedCards.filter(isVisible),
          score: sum(playerARangedCards)
        },
        siege: {
          cards: playerASiegeCards.filter(isVisible),
          score: sum(playerASiegeCards)
        }
      },
      playerB: {
        close: {
          cards: playerBCloseCards.filter(isVisible),
          score: sum(playerBCloseCards)
        },
        ranged: {
          cards: playerBRangedCards.filter(isVisible),
          score: sum(playerBRangedCards)
        },
        siege: {
          cards: playerBSiegeCards.filter(isVisible),
          score: sum(playerBSiegeCards)
        }
      }
    };
  }

  @computed
  get playerAScore() {
    const { playerA } = this.fullBoard;

    return playerA.close.score + playerA.ranged.score + playerA.siege.score;
  }

  @computed
  get playerBScore() {
    const { playerB } = this.fullBoard;

    return playerB.close.score + playerB.ranged.score + playerB.siege.score;
  }

  @computed
  get activeWeather() {
    return this.cards.filter(card => card.special === 'weather');
  }

  @action.bound
  restart() {
    this.cards = [];
  }

  @action.bound
  playCard(card) {
    this.cards.push(card);

    if (appStore.showDialog) {
      appStore.closeDialog();
    }
  }

  @action.bound
  updateCard(card) {
    const index = this.cards.findIndex(c => c.id === card.id);

    this.cards[index] = card;

    if (appStore.showDialog) {
      appStore.closeDialog();
    }
  }

  @action.bound
  removeCard(card) {
    this.cards = this.cards.filter(c => c.id !== card.id);

    if (appStore.showDialog) {
      appStore.closeDialog();
    }
  }

  @action.bound
  clearWeather() {
    this.cards = this.cards.filter(card => card.special !== 'weather');
  }

  @action.bound
  scorch(options) {
    this.cards = scorch(this.cards, options);
  }
}

export default new CardsStore();
