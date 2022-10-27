import { sortBy, prop } from 'ramda';

interface Game {
  homeTeam: { name?: string };
  awayTeam: { name?: string };
  id: number;
}

interface TeamList {
  name: string;
  pointsArr?: number[];
}

export class TableUpdater {
  constructor(public game: Game) {
    //TODO: decouple table creation from table update
  }

  gameStats(result: string) {
    let scoreStrings = result.split('-');
    let score = scoreStrings.map((e) => {
      return e === '' ? 'n' : +e;
    });

    if (score[0] == 'n' || score[1] == 'n') {
      const homeGameStats = Array(7).fill(0);
      const awayGameStats = Array(7).fill(0);

      return [homeGameStats, awayGameStats];
    } else {
      const homePts = score[0] > score[1] ? 3 : score[0] < score[1] ? 0 : 1;
      const homeWin = score[0] > score[1] ? 1 : 0;
      const homeLoss = score[0] < score[1] ? 1 : 0;
      const homeDraw = score[0] === score[1] ? 1 : 0;
      const goalFor = typeof score[0] == 'number' ? score[0] : 0;
      const goalA = typeof score[1] == 'number' ? score[1] : 0;

      const awayPts = score[0] < score[1] ? 3 : score[0] > score[1] ? 0 : 1;
      const awayWin = score[0] < score[1] ? 1 : 0;
      const awayLoss = score[0] > score[1] ? 1 : 0;
      const awayDraw = score[0] === score[1] ? 1 : 0;

      const homeGameStats = [
        `h${homePts}`,
        `h${goalFor}`,
        `h${goalA}`,
        `h${homeWin}`,
        `h${homeDraw}`,
        `h${homeLoss}`,
        `h${homePts + (goalFor - goalA) * 0.1 + goalFor * 0.01}`,
        // homePts,
        // goalFor,
        // goalA,
        // homeWin,
        // homeDraw,
        // homeLoss,
        // homePts + (goalFor - goalA) * 0.1 + goalFor * 0.01,
      ];
      const awayGameStats = [
        `a${awayPts}`,
        `a${goalA}`,
        `a${goalFor}`,
        `a${awayWin}`,
        `a${awayDraw}`,
        `a${awayLoss}`,
        `a${awayPts + (goalA - goalFor) * 0.1 + goalA * 0.01}`,
        // awayPts,
        // goalA,
        // goalFor,
        // awayWin,
        // awayDraw,
        // awayLoss,
        // awayPts + (goalA - goalFor) * 0.1 + goalA * 0.01,
      ];

      return [homeGameStats, awayGameStats];
    }
  }

  getGameTeams(game: Game, table: TeamList[]) {
    const homeTeamIdx = table.findIndex(
      (team) => team.name === game.homeTeam.name
    );

    const awayTeamIdx = table.findIndex(
      (team) => team.name === game.awayTeam.name
    );

    return [homeTeamIdx, awayTeamIdx];
  }

  updatePropArray(table: any[], dayIdx: number, res: string) {
    debugger;
    const TableProperties = [
      'pointsArr',
      'goalsArr',
      'gaArr',
      'wArr',
      'dArr',
      'lArr',
      'rankArr',
    ];

    const gameTeams = this.getGameTeams(this.game, table);

    const gameStats = this.gameStats(res);

    const updateGameArray = gameStats.map((_, idx) => {
      return TableProperties.map((e, index) => {
        return this.replaceItemAtIndex(
          table[gameTeams[idx]][e],
          dayIdx,
          gameStats[idx][index]
        );
      });
    });

    const game = updateGameArray.map((_, index) => {
      return this.entry(TableProperties, updateGameArray[index]);
    });

    const updateHome = this.updateTable(gameTeams[0], table, game[0]);
    const newTable = this.updateTable(gameTeams[1], updateHome, game[1]);

    const sortByPoints = sortBy(prop('rank'));
    console.log(newTable);
    const sorted = sortByPoints(newTable).reverse();

    return sorted;
  }

  replaceItemAtIndex(arr: any[], index: number, newValue: number) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  entry(props: string[], stats: number[][]) {
    const obj: any = {};

    props.forEach((element, index) => {
      obj[element] = stats[index];
      obj[`${element}`.slice(0, -3)] = [
        this.filterAll(stats[index]),
        this.filter(stats[index], 'h'),
        this.filter(stats[index], 'a'),
      ];
    });

    return obj;
  }

  updateTable(idx: number, table: any[], newVal: any) {
    return this.replaceItemAtIndex(table, idx, {
      ...table[idx],
      ...newVal,
    });
  }

  reducer(previousValue: number, currentValue: number) {
    return previousValue + currentValue;
  }

  reduceProp(prop: number[]) {
    return prop.reduce(this.reducer, 0);
  }

  filter = (arr: any[], filter: string) => {
    return arr
      .filter((el) => typeof el === 'string' && el.startsWith(filter))
      .map((el) => this.getNumber(el))
      .reduce((prev, val) => prev + val, 0);
  };

  filterAll = (arr: any[]) => {
    return arr
      .filter((el) => typeof el === 'string')
      .map((el) => this.getNumber(el))
      .reduce((prev, val) => prev + val, 0);
  };

  getNumber(element: string) {
    return Number(element.substring(1));
  }
}
