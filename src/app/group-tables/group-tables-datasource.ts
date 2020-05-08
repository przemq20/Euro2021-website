import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import {Observable, of as observableOf, merge, of, Subject} from 'rxjs';
import {TournamentDetailsService} from '../tournament-details.service';
import {GroupModel, TeamGroupInfo} from '../../model/group.model';


/**
 * Data source for the GroupTables view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GroupTablesDataSource extends DataSource<TeamGroupInfo> {
  data: GroupModel[] = [];
  sort: MatSort;
  private selectedGroup = 0;
  private group$ = new Subject();

  constructor(private service: TournamentDetailsService) {
    super();
  }

  public changeGroup(group: number) {
    this.selectedGroup = group;
    this.group$.next(group);
  }

  connect(): Observable<TeamGroupInfo[]> {
    const dataMutations = [
      this.service.groups$,
      this.sort.sortChange,
      this.group$
    ];
    this.service.groups$.subscribe(value => {
      this.data = value;
    });

    return merge(...dataMutations).pipe(map(() => {
      if (this.data[this.selectedGroup]){
        return this.getSortedData(this.data[this.selectedGroup].teams);
      }
      return [];
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TeamGroupInfo[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'teamName': return compare(a.teamName, b.teamName, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
