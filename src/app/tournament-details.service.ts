import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {GroupModel} from '../model/group.model';
import {Observable} from 'rxjs';

const GROUP_QUERY =
  gql`query AllTournaments{
    allTournaments{
      edges{
        node{
          groups {
              id,
              groupName,
              teams {
              teamName
            }
          }
        }
      }
    }
  }`;

@Injectable({
  providedIn: 'root'
})
export class TournamentDetailsService {
  private groupsQuery: QueryRef<any>;

  public refetchGroups() {
    this.groupsQuery.refetch();
  }

  get groups$(): Observable<GroupModel[]> {
    return this.groupsQuery.valueChanges.pipe(
      map(value => {
        return value
          .data
          .allTournaments
          .edges[0]
          .node
          .groups as GroupModel[];
      })
    );
  }


  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://www.euro2021.przemq20.ct8.pl/graphql' }),
      cache: new InMemoryCache()
    });

    this.groupsQuery  = apollo.watchQuery({
      query: GROUP_QUERY,
      pollInterval: 10 * 1000,
    });

  }
}
