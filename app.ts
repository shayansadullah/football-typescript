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
  initialiseClubs(clubs: string[]): [string, FootballClub][] {
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
    return Array.from(clubMap);
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

  matchesToPlay(week: number): [number, Match[]] {
    //Mix the set of matches:
    const matchesForTheWeek: Match[] = [];
    ArrayOfAllClubs.forEach((_, index) => {
      if (index % 2 === 0) {
        matchesForTheWeek.push({ homeTeam: ArrayOfAllClubs[index], awayTeam: ArrayOfAllClubs[index + 1] });
      }
    });
    return [week, matchesForTheWeek];
  }

  filterMatchesToBePlayed(allMatches: Match[], matchesToPlay: Match[]): Match[] {
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

let continuingListOfAllMatches: Match[] = [];

//Initialise the football game:
const footballGame = new FootballGame();

//Array of all clubs:
console.log(`Array of all clubs: ${JSON.stringify(ArrayOfAllClubs)}`);

//Get a list of all the clubs and initialise these clubs:
const arrayAllclubsInitialised = footballGame.initialiseClubs(ArrayOfAllClubs);
console.log(`Initialised Clubs: ${JSON.stringify(arrayAllclubsInitialised)}`);

//Get a list of all the matches that need to be played:
const allMatches = footballGame.createAllMatches(ArrayOfAllClubs);
console.log(`All Matches: ${JSON.stringify(allMatches)}`);

//Get a list of matches to play for a set period:
const matchWeeks = 38;
for (let i = 1; i <= matchWeeks; i++) {
  const matchestoPlay = footballGame.matchesToPlay(i);
  console.log(`Week: ${matchestoPlay[0]}: Matches to Play: ${JSON.stringify(matchestoPlay[1])}`);
}

//const matchestoPlay = footballGame.matchesToPlay(1);
//console.log(`Week: ${matchestoPlay[0]}: Matches to Play: ${JSON.stringify(matchestoPlay[1])}`);

//Filter matches to be played:
//const filterMatchesToBePlayed = footballGame.filterMatchesToBePlayed(allMatches, matchestoPlay[1]);
//continuingListOfAllMatches = filterMatchesToBePlayed;
//console.log(`Continuing List of All Matches: ${JSON.stringify(continuingListOfAllMatches)}`);
