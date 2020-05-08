import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { GroupTablesDataSource } from './group-tables-datasource';
import {TournamentDetailsService} from '../tournament-details.service';
import {TeamGroupInfo} from '../../model/group.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-group-tables',
  templateUrl: './group-tables.component.html',
  styleUrls: ['./group-tables.component.css']
})
export class GroupTablesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TeamGroupInfo>;

  groupIndex = 0;
  groupNames$;
  dataSource: GroupTablesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['teamName'];

  constructor(private service: TournamentDetailsService) {
  }

  onSelectedGroupChange(val) {
    this.dataSource.changeGroup(val);
  }

  ngOnInit() {
    this.dataSource = new GroupTablesDataSource(this.service);
    this.groupNames$ = this.service.groups$.pipe(
      map(value => value.map(value1 => value1.groupName))
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
    this.service.refetchGroups();
  }
}
