export interface TeamModel {
  teamName: string;
  scheduledMatchesAs1: {
    team2: {
      teamName: string;
    };
    phase: {
      id: number;
    };
  };
  currentPlayers: {
    firstName: string;
    lastName: string;
  };
}
