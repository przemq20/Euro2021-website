import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge, Subscription, Subject } from 'rxjs';
import { PlayerModel } from '../../model/player.model';

export class PlayersTableDataSource extends DataSource<PlayerModel> {
  data: PlayerModel[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  dataSub: Subscription;
  updateData$ = new Subject<void>();

  constructor(private playerData$: Observable<PlayerModel[]>) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PlayerModel[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.updateData$,
      this.paginator.page,
      this.sort.sortChange,
    ];

    this.dataSub = this.playerData$.subscribe((value) => {
      this.data = value.map((value1) => {
        if (!value1.currentTeam) {
          const retval = value1;
          value1.currentTeam = { teamName: '' };
          return retval;
        }
        return value1;
      });
      this.paginator.length = this.data.length;
      this.updateData$.next();
    });

    return merge(...dataMutations).pipe(
      map(() => {
        if (this.data) {
          // todo: move to server-side
          const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
          return this.getSortedData(this.data).slice(
            startIndex,
            this.paginator.pageSize + startIndex
          );
        }
        return [];
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.dataSub.unsubscribe();
  }
  //
  // /**
  //  * Sort the data (client-side). If you're using server-side sorting,
  //  * this would be replaced by requesting the appropriate data from the server.
  //  */
  private getSortedData(data: PlayerModel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'teamName':
          return compare(a.currentTeam.teamName, b.currentTeam.teamName, isAsc);
        case 'birthDate':
          return compareDate(a.birthDate, b.birthDate, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
