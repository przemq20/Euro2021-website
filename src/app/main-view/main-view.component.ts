import { Component } from '@angular/core';
import {GraphqlService} from '../graphql.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {
  constructor(public service: GraphqlService) {}
}
