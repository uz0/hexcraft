'use strict';

import http from '../../http';
import Hex from '../../../../_shared/game/hex';
import hexcraft from '../../../application';
import Lobby from '../../lobby/lobby';
import Splash from '../../splash/splash';

export default class Online {
  constructor(gameData) {
    this.id = gameData.id;
    this.player1 = gameData.player1;
    this.player2 = gameData.player2;
    this.Map = gameData.Map;
    this.board = gameData.board;

    let userId = window.localStorage.getItem('userId');
    this.board.userId = parseInt(userId);
    this.board.player = (this.player1.id === this.board.userId)? 'player1' : 'player2';

    this.loop = new window.EventSource(`/api/games/${this.id}/loop`);
    this.loop.addEventListener('message', this.onEvent.bind(this));
  }

  surrender() {
    const token = window.localStorage.getItem('token');
    http.post(`/api/games/${this.id}/surrender`, {
      token: token
    });

    new window.Audio(hexcraft.resources.buttonClick.blobUrl).play();
  }

  onStep(current, old) {
    let token = window.localStorage.getItem('token');
    let index = Hex.coordinatesToIndex(current.x, current.y);
    let oldIndex = Hex.coordinatesToIndex(old.x, old.y);

    http.post(`/api/games/${this.id}`, {
      token: token,
      step: {
        current: index,
        old: oldIndex
      }
    }).catch(() => {
      // rollback chip, after failure request
      Hex.findByIndex(this.board.chips.children, index.i, index.j).setPosition(oldIndex);
    });
  }

  // EVENTS
  onEvent(event) {
    let data = JSON.parse(event.data);
    this[`${data.event}Event`](data.data, data.player);
  }

  stepEvent(step, player) {
    let nextUserStep = (player === 'player1') ? 'player2' : 'player1';
    this.board.changeMode(nextUserStep);

    let text = (this.board.player === nextUserStep) ? `Ваш ход`:
                                                      `Ходит ${this[nextUserStep].username}`;
    let splash = new Splash(text);
    this.board.addChild(splash);

    if(this.board.player === player) {
      return;
    }

    Hex.findByIndex(this.board.chips.children, step.old.i, step.old.j).setPosition(step.current);

    Hex.findByIndex(this.Map.MapData, step.old.i, step.old.j).cellstate = 'empty';
    Hex.findByIndex(this.Map.MapData, step.current.i, step.current.j).cellstate = player;

  }

  chipEvent(coordinates, player) {
    this.board.addChip(coordinates.i, coordinates.j, player);

    Hex.findByIndex(this.Map.MapData, coordinates.i, coordinates.j).cellstate = player;
  }

  ownerEvent(coordinatesArray, player) {
    coordinatesArray.forEach(coordinates => {
      Hex.findByIndex(this.board.chips.children, coordinates.i, coordinates.j).changeOwner(player);

      Hex.findByIndex(this.Map.MapData, coordinates.i, coordinates.j).cellstate = player;
    });
  }

  overEvent(winner) {
    this.loop.close();

    let text = `${this[winner].username} победил`;
    let splash = new Splash(text, () => {
      hexcraft.setStage(Lobby, 'Игра окончена');
    });
    this.board.addChild(splash);
  }

  mapUpdated (){}
}