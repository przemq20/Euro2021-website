import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainViewComponent } from './main-view/main-view.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { GroupTablesComponent } from './group-tables/group-tables.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GraphqlService } from './graphql.service';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PlayersTableComponent } from './players-table/players-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { PlayersComponent } from './players/players.component';
import { GroupsComponent } from './groups/groups.component';
import { TeamsComponent } from './teams/teams.component';
import { FooterComponent } from './footer/footer.component';
import { FutureMatchesComponent } from './future-matches/future-matches.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    GroupTablesComponent,
    PlayersTableComponent,
    NavbarComponent,
    PlayersComponent,
    GroupsComponent,
    TeamsComponent,
    FooterComponent,
    FutureMatchesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatToolbarModule,
  ],
  providers: [GraphqlService],
  bootstrap: [AppComponent],
})
export class AppModule {}
