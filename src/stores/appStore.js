import { action, computed, observable } from 'mobx';

export class AppStore {
  @observable dialog = null;

  @observable dialogData = null;

  @computed
  get dialogVisible() {
    return !!this.dialog;
  }

  @action.bound
  closeDialog() {
    this.dialog = null;
    this.dialogData = null;
  }

  @action.bound
  showUnitDialog(card) {
    this.dialog = 'unit';
    this.data = card;
  }

  @action.bound
  showWeatherDialog() {
    this.dialog = 'weather';
    this.data = {};
  }
}

export default new AppStore();
