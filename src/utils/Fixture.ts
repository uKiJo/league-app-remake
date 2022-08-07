interface FixtureShape {
  homeTeam: { name?: string };
  awayTeam: { name?: string };
  id: number;
}

interface TableShape {
  name?: string;
}

var i = 0;

export class Fixture {
  overallFixture: FixtureShape[][] = [];
  home: FixtureShape[][] = [];
  away: FixtureShape[][] = [];
  private teamPot: TableShape[] = [];
  dispensedTeam: TableShape = {};

  constructor(public teams: TableShape[]) {}

  generate(): void {
    this.generateHomeFixture();
    this.generateAwayFixture();

    this.overallFixture = this.home.concat(this.away);
  }

  generateHomeFixture(): void {
    this.generateFirstDay(this.teams);
    this.generateRestOfHomeDays();

    this.overallFixture = this.home;
  }

  generateAwayFixture() {
    if (this.home) this.generateAway();
    this.away = this.shuffle(this.away);
  }

  private generateFirstDay(teams: TableShape[]): void {
    let day: FixtureShape[] = [];
    this.teamPot = teams;
    let isTeamNumOdd = teams.length % 2 === 1;

    while (this.teamPot.length) {
      let game: FixtureShape;

      if (isTeamNumOdd && this.teamPot.length === 1) {
        this.dispensedTeam = this.pickTeam();
        break;
      }

      let homeTeam = this.pickTeam();
      let awayTeam = this.pickTeam();

      game = { id: this.getId(), homeTeam, awayTeam };

      day = [...day, game];
    }
    this.home.push(day);
  }

  private generateRestOfHomeDays() {
    let homeDayNumber = this.teams.length / 2 - 1;
    let isNumberOfTeamsOdd = this.teams.length % 2 === 1;
    let day = 0;

    if (isNumberOfTeamsOdd) {
      while (day !== this.teams.length - 1) {
        let fix = this.oddCaseOne();
        this.home.push(fix);
        day++;
      }
    } else {
      while (day !== homeDayNumber) {
        let even = this.generateEvenDays(this.teams);
        this.home.push(even);

        let odd = this.generateOddDays(this.teams);
        this.home.push(odd);

        day++;
      }
    }
  }

  private generateEvenDays(teams: TableShape[]): FixtureShape[] {
    var day: FixtureShape[] = [];
    let rest: FixtureShape[] = [];
    let lastDay = this.home[this.home.length - 1];

    const isOdd = teams.length % 2 === 1;
    const lessThanFour = teams.length <= 4;

    const evenAndLessThanFour = !isOdd && lessThanFour;

    if (evenAndLessThanFour) return this.evenCaseOne(lastDay, day);

    return this.evenCaseTwo(lastDay, rest, day);
  }

  private oddCaseOne(): FixtureShape[] {
    // day: FixtureShape[] // rest: FixtureShape[], // lastDay: FixtureShape[],
    let day: FixtureShape[] = [];
    let rest: FixtureShape[] = [];
    let lastDay = this.home[this.home.length - 1];
    let isdayGamesNumberEven = ((this.teams.length - 1) / 2) % 2 === 0;

    let game1 = {
      id: this.getId(),
      homeTeam: this.dispensedTeam,
      awayTeam: lastDay[1].homeTeam,
    };

    this.dispensedTeam = lastDay[0].awayTeam;

    for (let i = 1; i < lastDay.length - 1; i += 2) {
      let patternOne = {
        id: this.getId(),
        homeTeam: lastDay[i + 1].awayTeam,
        awayTeam: lastDay[i - 1].homeTeam,
      };

      if (lastDay[i + 2]) {
        let patternTwo = {
          id: this.getId(),
          homeTeam: lastDay[i].awayTeam,
          awayTeam: lastDay[i + 2].homeTeam,
        };
        rest = [...rest, patternOne, patternTwo];
      } else {
        rest = [...rest, patternOne];
      }
    }

    var lastGame = {
      id: this.getId(),
      homeTeam: isdayGamesNumberEven
        ? lastDay[lastDay.length - 1].awayTeam
        : lastDay[lastDay.length - 2].awayTeam,
      awayTeam: isdayGamesNumberEven
        ? lastDay[lastDay.length - 2].homeTeam
        : lastDay[lastDay.length - 1].homeTeam,
    };

    return [...day, game1, ...rest, lastGame];
  }

  private evenCaseTwo(
    lastDay: FixtureShape[],
    rest: FixtureShape[],
    day: FixtureShape[]
  ) {
    let game1 = {
      id: this.getId(),
      homeTeam: lastDay[1].awayTeam,
      awayTeam: lastDay[0].homeTeam,
    };

    let game2 = {
      id: this.getId(),
      homeTeam: lastDay[2].awayTeam,
      awayTeam: lastDay[0].awayTeam,
    };

    for (let i = 3; i < lastDay.length; i++) {
      let game = {
        id: this.getId(),
        homeTeam: lastDay[i].awayTeam,
        awayTeam: lastDay[i - 2].homeTeam,
      };
      rest = [...rest, game];
    }

    let lastGame = {
      id: this.getId(),
      homeTeam: lastDay[lastDay.length - 1].homeTeam,
      awayTeam: lastDay[lastDay.length - 2].homeTeam,
    };
    return [...day, game1, game2, ...rest, lastGame];
  }

  private evenCaseOne(lastDay: FixtureShape[], day: FixtureShape[]) {
    let game1 = {
      id: this.getId(),
      homeTeam: lastDay[1].awayTeam,
      awayTeam: lastDay[0].homeTeam,
    };

    let game2 = {
      id: this.getId(),
      homeTeam: lastDay[1].homeTeam,
      awayTeam: lastDay[0].awayTeam,
    };

    return [...day, game1, game2];
  }

  private generateOddDays(
    // fixture: FixtureShape[][],
    teams: TableShape[]
  ): FixtureShape[] {
    var day: FixtureShape[] = [];
    let rest: FixtureShape[] = [];
    let lastDay = this.home[this.home.length - 1];

    const isOdd = teams.length % 2 === 1;
    const lessThanFour = teams.length <= 4;

    const evenAndLessThanFour = !isOdd && lessThanFour;

    if (evenAndLessThanFour) return this.thirdCase(lastDay, day);

    return this.fourthCase(lastDay, rest, day);
  }

  private fourthCase(
    lastDay: FixtureShape[],
    rest: FixtureShape[],
    day: FixtureShape[]
  ) {
    let game1 = {
      id: this.getId(),
      homeTeam: lastDay[0].awayTeam,
      awayTeam: lastDay[1].homeTeam,
    };
    let game2 = {
      id: this.getId(),
      homeTeam: lastDay[0].homeTeam,
      awayTeam: lastDay[2].homeTeam,
    };

    for (let i = 3; i < lastDay.length; i++) {
      let game = {
        id: this.getId(),
        homeTeam: lastDay[i - 2].awayTeam,
        awayTeam: lastDay[i].homeTeam,
      };
      rest = [...rest, game];
    }

    let lastGame = {
      id: this.getId(),
      homeTeam: lastDay[lastDay.length - 2].awayTeam,
      awayTeam: lastDay[lastDay.length - 1].awayTeam,
    };
    return [...day, game1, game2, ...rest, lastGame];
  }

  private thirdCase(lastDay: FixtureShape[], day: FixtureShape[]) {
    let game1 = {
      id: this.getId(),
      homeTeam: lastDay[0].awayTeam,
      awayTeam: lastDay[1].homeTeam,
    };

    let game2 = {
      id: this.getId(),
      homeTeam: lastDay[0].homeTeam,
      awayTeam: lastDay[1].awayTeam,
    };

    return [...day, game1, game2];
  }

  private generateAway(): void {
    this.away = this.home.map((day) => {
      return day.map((game) => {
        var copy = this.clone(game);
        const temp = copy.homeTeam;
        copy.homeTeam = copy.awayTeam;
        copy.awayTeam = temp;
        copy.id = this.getId();
        return copy;
      });
    });
  }

  private shuffle(array: FixtureShape[][]) {
    return array.sort((a, b) => 0.5 - Math.random());
  }

  private clone(obj: any): FixtureShape {
    if (null == obj || 'object' !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  private pickTeam() {
    let randomIdx = Math.floor(Math.random() * this.teamPot.length);
    let pickedTeam = this.teamPot[randomIdx];

    this.teamPot = [
      ...this.teamPot.slice(0, randomIdx),
      ...this.teamPot.slice(randomIdx + 1),
    ];

    return pickedTeam;
  }

  private getId(): number {
    return i++;
  }
}
