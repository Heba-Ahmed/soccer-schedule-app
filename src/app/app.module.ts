import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyTeamsPage } from '../pages/pages';
import { TournamentsPage } from '../pages/pages';
import { GamePage } from '../pages/pages';
import { TeamsPage } from '../pages/pages';
import { TeamDetailPage } from '../pages/pages';
import { TeamHomePage } from '../pages/pages';
import { StandingsPage } from '../pages/pages';
import { LoginPage } from '../pages/pages';
import { RegisterPage } from '../pages/pages';


import { EliteApi } from '../shared/shared';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage ,
    TournamentsPage ,
    GamePage ,
    TeamsPage ,
    TeamDetailPage ,
    TeamHomePage ,
    StandingsPage    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage ,
    TournamentsPage ,
    GamePage ,
    TeamsPage ,
    TeamDetailPage,
    TeamHomePage ,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
