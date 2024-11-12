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
const clubs = ['Liverpool', 'Man City', 'Arsenal', 'Chelsea', 'Man Utd', 'Tottenham', 'Brighton', 'Crystal Palace', 'Everton', 'Wolves'];
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

console.log(clubs);