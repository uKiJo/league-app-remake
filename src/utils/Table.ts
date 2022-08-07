import { FixtureUpdater } from './FixtureUpdater';

interface TeamList {
  name: string;
  points?: number;
}

interface Game {
  homeTeam: { name?: string };
  awayTeam: { name?: string };
  id: number;
}

export class Table {
  table: TeamList[] = [];

  constructor(public teams: TeamList[], public game?: Game) {}

  generate() {
    this.table = this.teams.map((team) => this.addPropsToTable(team));
  }

  addPropsToTable(team: TeamList): TeamList {
    const TableProperties = [
      'points',
      'pointsArr',
      'goals',
      'goalsArr',
      'ga',
      'gaArr',
      'gd',
      'w',
      'wArr',
      'd',
      'dArr',
      'l',
      'lArr',
      'p',
      'rank',
    ];
    let isOdd = this.teams.length % 2 === 1;
    let days = isOdd ? this.teams.length * 2 : (this.teams.length - 1) * 2;
    let obj = {};

    TableProperties.map((prop) => {
      return /Arr/.test(prop)
        ? (obj = { ...obj, [`${prop}`]: Array(days).fill(0) })
        : (obj = { ...obj, [`${prop}`]: 0 });
    });

    return {
      ...team,
      ...obj,
    };
  }
}
