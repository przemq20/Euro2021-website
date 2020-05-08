import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PlayersTableDataSource} from './players-table-datasource';
import {Observable} from 'rxjs';
import {PlayerModel} from '../../model/player.model';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements AfterViewInit, OnInit {
  @Input() playersData: Observable<PlayerModel[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PlayerModel>;
  dataSource: PlayersTableDataSource;

  displayedColumns = ['firstName', 'lastName', 'birthDate', 'teamName'];

  ngOnInit() {
    this.dataSource = new PlayersTableDataSource(this.playersData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
