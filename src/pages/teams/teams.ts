import { Component } from '@angular/core';
import { LoadingController , IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import {EliteApi} from '../../shared/shared';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import * as _ from 'lodash';


@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams = [];

  private allTeams : any;
  private allTeamsDivisions : any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams ,
              private eliteApi : EliteApi ,
              private loadingController : LoadingController) {
          
  }

  ionViewDidLoad() {
    let selectedTorny = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'getting data ... '
    });
    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTorny.id).subscribe( (data) => {
        this.allTeams = data["teams"];
        this.allTeamsDivisions = 
        _.chain(data["teams"])
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName' , 'divisionTeams'] , item))
        .value();
        console.log(this.allTeamsDivisions);
        this.teams = this.allTeamsDivisions;
        loader.dismiss();
       }, error => {
         console.log(error);
       });
    });
  }

  itemTabbed($event , team) {
    this.navCtrl.push(TeamHomePage , team);
  }
}
