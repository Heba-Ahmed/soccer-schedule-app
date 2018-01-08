import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import {EliteApi} from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game : any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              private eliteApi: EliteApi) {
    this.game = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  teamTapped(teamId){
    let tournyData = this.eliteApi.getCurrentTorny();
    console.log("team id : "+teamId);

    let team = tournyData.teams.find(t=> t.id === teamId);
    this.navCtrl.push(TeamHomePage , team);
  }
}
