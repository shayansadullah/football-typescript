interface FootballClub {
  club: string;
  matchesPlayed: number;
  won: number;
  drawn: number;
  lost: number;
  scored: number;
  conceded: number;
  goalsFor: number;
  goalsAway: number;
  goalDifference: number;
  points: number;
}
interface Match {
  homeTeam: string;
  awayTeam: string;
}

class FootballGame {
  initialiseClubs(clubs: string[]): Map<string, FootballClub> {
    const clubMap = new Map<string, FootballClub>();
    clubs.forEach(club => {
      clubMap.set(club, {
        club: club,
        matchesPlayed: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        scored: 0,
        conceded: 0,
        goalsFor: 0,
        goalsAway: 0,
        goalDifference: 0,
        points: 0,
      });
    });
    return clubMap;
  }

  createAllMatches(clubs: string[]): Match[] {
    let allMatches: Match[] = [];
    clubs.forEach((club, index) => {
      let otherClubs: string[] = [];
      otherClubs = this.getAllOtherClubsExceptIndexedClub(index);
      let clubMatches: Match[] = [];
      otherClubs.forEach(otherClub => {
        clubMatches.push({ homeTeam: club, awayTeam: otherClub });
      });
      allMatches = allMatches.concat(clubMatches);
    });
    return allMatches;
  }

  private getAllOtherClubsExceptIndexedClub(index: number): string[] {
    return ArrayOfAllClubs.filter((_, i) => i !== index);
  }

  matchesToPlay(): Match[] {
    //Mix the set of matches:
    const mixedMatches: Match[] = [];
    const allclubs = ArrayOfAllClubs;
    ArrayOfAllClubs.forEach((_, index) => {
      if (index % 2 === 0) {
        mixedMatches.push({ homeTeam: ArrayOfAllClubs[index], awayTeam: ArrayOfAllClubs[index + 1] });
      }
    });
    return mixedMatches;
  }

  filteredPlayedMatches(allMatches: Match[], matchesToPlay: Match[]): Match[] {
    let filteredMatches: Match[] = [];
    filteredMatches = allMatches;
    matchesToPlay.forEach((match, index) => {
      console.log(`im here: ${JSON.stringify(index)}:${JSON.stringify(match)}`);
      filteredMatches.forEach((filterdMatch, filteredIndex) => {
        if (filterdMatch.homeTeam === match.homeTeam && filterdMatch.awayTeam === match.awayTeam) {
          console.log(`Match Found: ${JSON.stringify(filteredIndex)}: ${JSON.stringify(filterdMatch)}`);
          filteredMatches = filteredMatches.filter((_, index) => index !== filteredIndex);
        }
      });
    });
    return filteredMatches;
  }
}

const ArrayOfAllClubs = [
  'Liverpool',
  'Man City',
  'Arsenal',
  'Chelsea',
  'Man Utd',
  'Tottenham',
  'Brighton',
  'Crystal Palace',
  'Everton',
  'Wolves',
  'Brentford',
  'Southampton',
  'Notts Forest',
  'Fullham',
  'Newcastle',
  'Aston Villa',
  'Bournemouth',
  'West Ham',
  'Leicester City',
  'Ipswich Town',
];
const footballGame = new FootballGame();

//Get a list of all the clubs and initialise the
//club results to 0 as no matched have been played yet
const initialisedClubs = footballGame.initialiseClubs(ArrayOfAllClubs);
const arrayAllclubsInitialised = Array.from(initialisedClubs);

//Get a list of all the matches that need to be played:
const allMatches = footballGame.createAllMatches(ArrayOfAllClubs);

//Get a list of matches left to play:
const matchesToPlay = footballGame.matchesToPlay();
//console.log(`All Matches: ${JSON.stringify(allMatches)}`);

console.log(`Matches to Play: ${JSON.stringify(matchesToPlay)}`);

const filteredPlayedMatches = footballGame.filteredPlayedMatches(allMatches, matchesToPlay);
console.log(`Filtered Played Matches: ${JSON.stringify(filteredPlayedMatches)}`);
