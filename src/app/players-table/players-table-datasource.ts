import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import {Observable, of as observableOf, merge, Subscription} from 'rxjs';
import {PlayerModel} from '../../model/player.model';


export class PlayersTableDataSource extends DataSource<PlayerModel> {
  data: PlayerModel[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  dataSub: Subscription;

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
      this.playerData$,
      this.paginator.page,
      this.sort.sortChange
    ];

    this.dataSub = this.playerData$.subscribe(value => {
      this.data = value.map(value1 => {
        if (!value1.currentTeam) {
          const retval = value1;
          value1.currentTeam = {teamName: ''};
          return retval;
        }
        return value1;
      });
    });

    return merge(...dataMutations).pipe(map(() => {
      console.log(this.data);

      if (this.data) {
        return this.getSortedData(this.data);
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
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: PlayersTableItem[]) {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   return data.splice(startIndex, this.paginator.pageSize);
  // }
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
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'teamName': return compare(a.currentTeam.teamName, b.currentTeam.teamName, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
