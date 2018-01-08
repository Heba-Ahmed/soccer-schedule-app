import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage , StandingsPage , TeamDetailPage} from '../pages';


@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  team:any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {    
    this.team = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome(){
    //this.navCtrl.push(MyTeamsPage);
    this.navCtrl.popToRoot();
  }
}
