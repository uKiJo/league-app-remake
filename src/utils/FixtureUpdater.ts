import { TableUpdater } from './TableUpdater';

interface Game {
  homeTeam: { name?: string; goal?: string };
  awayTeam: { name?: string; goal?: string };
  id: number;
}

export class FixtureUpdater {
  constructor(public fixture: Game[][]) {}

  getDayIdx(game: Game): number {
    const arr = this.fixture.map((day) =>
      day.findIndex((dayGame) => dayGame.id === game.id)
    );

    return arr.findIndex((e) => e !== -1);
  }

  getGameIdx(game: Game) {
    const arr = this.fixture.map((day) =>
      day.findIndex((dayGame) => dayGame.id === game.id)
    );

    const index = arr.find((e) => e !== -1);
    if (index || index === 0) {
      return index;
    } else {
      return -1;
    }
  }

  replaceItemAtIndex(arr: any[], index: number, newValue: any) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  update(game: Game, result: string) {
    // debugger;
    const dayIdx = this.getDayIdx(game);
    const gameIdx = this.getGameIdx(game);
    const selectedGame = this.fixture[dayIdx][gameIdx];
    const selectDay = this.fixture[dayIdx];
    const updateSelectedGame = this.replaceItemAtIndex(
      selectDay,
      gameIdx,
      this.updateGameObject(selectedGame, result)
    );

    return this.replaceItemAtIndex(this.fixture, dayIdx, updateSelectedGame);
  }

  updateGameObject(game: Game, result: string): Game {
    const score = result.split('-');
    return {
      ...game,
      homeTeam: {
        ...game.homeTeam,
        goal: score[0],
      },
      awayTeam: {
        ...game.awayTeam,
        goal: score[1],
      },
    };
  }
}
