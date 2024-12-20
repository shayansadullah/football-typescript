interface FootballClub {
    club: string,
    matchesPlayed : number,
    won: number,
    drawn: number,
    lost: number,
    scored: number,
    conceded: number,
    goalsFor: number,
    goalsAway: number,
    goalDifference: number,
    points: number
}
interface Match {
    homeTeam: string,
    awayTeam: string,
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
                points: 0});
        });
        return clubMap;
    }

    initaliseMatches(clubs: string[]): Match[] {
        let allMatches: Match[] = [];
        clubs.forEach((club, index) => {
            let otherClubs: string[] = [];
            otherClubs = this.getAllOtherClubsExceptIndexedClub(index);
            console.log(`Current club: ${index}: ${club}`);
            console.log(`Other Clubs: ${otherClubs}`);
            let clubMatches: Match[] = [];
            otherClubs.forEach(otherClub => {
                clubMatches.push({homeTeam: club, awayTeam: otherClub});
            });
            allMatches = allMatches.concat(clubMatches);
        });
        //console.log(allMatches);
        return allMatches;
    }

    private getAllOtherClubsExceptIndexedClub(index: number): string[] {
        console.log(`Clubs: ${clubs[index]}`);
        return clubs.filter((_, i) => i !== index);
    }
}

const clubs = ['Liverpool', 'Man City', 'Arsenal', 'Chelsea', 'Man Utd', 'Tottenham', 'Brighton', 'Crystal Palace', 'Everton', 'Wolves', 'Brentford', 'Southampton', 'Notts Forest', 'Fullham', 'Newcastle', 'Aston Villa', 'Bournemouth', 'West Ham', 'Leicester City', 'Crystal Palace', 'Ipswich Town', 'West Ham'];
const footballGame = new FootballGame();

//Get a list of all the clubs and initialise the
//club results to 0 as no matched have been played yet
const initialisedClubs = footballGame.initialiseClubs(clubs);
const arrayAllclubsInitialised = Array.from(initialisedClubs);
//console.log(arrayAllclubsInitialised.sort());

//Get a list of all the matches that need to be played
const allMatches = footballGame.initaliseMatches(clubs);

//Simulate the matches


