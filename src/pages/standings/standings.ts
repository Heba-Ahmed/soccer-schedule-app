import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  allStandings : any [];
  standings : any[];
  team : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams ,
              private eliteApi : EliteApi) {
    this.team = navParams.data;
  }

  ionViewDidLoad() {
    let tournyData = this.eliteApi.getCurrentTorny();
    this.standings = tournyData.standings;

    this.allStandings = 
    _.chain(this.standings)
     .groupBy('division')
     .toPairs()
     .map(item => _.zipObject(['divisionName' , 'divisionStandings'] , item) )
     .value();
}

}
