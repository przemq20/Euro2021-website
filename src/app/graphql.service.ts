import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { GroupModel } from '../model/group.model';
import { Observable } from 'rxjs';
import { PlayerModel } from '../model/player.model';
import { MatchModel } from '../model/match.model';

const GROUP_QUERY = gql`
  query AllTournaments {
    allTournaments {
      edges {
        node {
          groups {
            id
            groupName
            teams {
              teamName
            }
          }
        }
      }
    }
  }
`;

const ALL_PLAYERS_QUERY = gql`
  query AllPlayers {
    allPlayers {
      edges {
        node {
          firstName
          lastName
          birthDate
          currentTeam {
            teamName
          }
        }
      }
    }
  }
`;

const ALL_MATCHES_QUERY = gql`
  {
    query
    allTournaments {
      edges {
        node {
          schedules {
            matchLocation
            matchTime
            team1 {
              teamName
            }
            team2 {
              teamName
            }
            phase {
              id
            }
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private groupsQuery: QueryRef<any>;
  private allPlayersQuery: QueryRef<any>;
  private matchesQuery: QueryRef<any>;

  public refetchGroups() {
    this.groupsQuery.refetch();
  }

  get allPlayers$(): Observable<PlayerModel[]> {
    return this.allPlayersQuery.valueChanges.pipe(
      map((value) => {
        return value.data.allPlayers.edges.map((value1) => {
          return value1.node as PlayerModel;
        }) as PlayerModel[];
      })
    );
  }

  get groups$(): Observable<GroupModel[]> {
    return this.groupsQuery.valueChanges.pipe(
      map((value) => {
        return value.data.allTournaments.edges[0].node.groups as GroupModel[];
      })
    );
  }
  // Nie wiem czy to ma sens dlatego dałem w komentarz
  // get matches$(): Observable<MatchModel[]> {
  //   return this.matchesQuery.valueChanges.pipe(
  //     map((value) => {
  //       return value.data.allTournaments.edges[0].node.matches as MatchModel[];
  //     })
  //   );
  // }

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'http://www.euro2021.przemq20.ct8.pl/graphql',
      }),
      cache: new InMemoryCache(),
    });

    this.groupsQuery = apollo.watchQuery({
      query: GROUP_QUERY,
      pollInterval: 10 * 1000,
    });

    this.allPlayersQuery = apollo.watchQuery({
      query: ALL_PLAYERS_QUERY,
      pollInterval: 30 * 1000,
    });

    this.matchesQuery = apollo.watchQuery({
      query: ALL_MATCHES_QUERY,
      pollInterval: 10 * 1000,
    });
  }
}
