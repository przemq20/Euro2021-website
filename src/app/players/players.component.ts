import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  constructor(public service: GraphqlService) {}

  ngOnInit(): void {}
}
