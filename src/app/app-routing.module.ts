import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { PlayersComponent } from './players/players.component';
import { GroupsComponent } from './groups/groups.component';
import { TeamsComponent } from './teams/teams.component';
import { FutureMatchesComponent } from './future-matches/future-matches.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'matches', component: FutureMatchesComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
