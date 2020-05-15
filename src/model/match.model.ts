export interface MatchModel {
  matchLocation: string;
  matchTime: Date;
  phase: {
    id: number;
  };
  team1: {
    teamName: string;
  };
  team2: {
    teamName: string;
  };
}
