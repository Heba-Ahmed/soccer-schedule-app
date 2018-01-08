import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyTeamsPage, GamePage } from '../pages';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EliteApi } from '../../shared/shared';
import { MomentModule } from 'angular2-moment';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  useDateFilter = false;
  allGames : any [];
  dateFilter: string;
  team: any[];
  games: any;
  private tornyData: any;
  private teamStanding: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
    this.team = this.navParams.data;
    this.tornyData = this.eliteApi.getCurrentTorny();
    this.teamStanding = _.find(this.tornyData.standings, { 'teamId': this.team["id"] });
  }

  ionViewDidLoad() {

    this.games = _.chain(this.tornyData.games)
      .filter(g => g.team1Id === this.team["id"] || g.team2Id === this.team["id"])
      .map(g => {
        let isTeam1 = (g.team1Id === this.team["id"]);
        let oppenentName = (isTeam1 ? g.team2 : g.team1);
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);

        return {
          gameId: g.id,
          opponent: oppenentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };

      })
      .value();
      this.allGames= this.games;
  }
  goHome() {
    this.navCtrl.parent.parent.popToRoot();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    console.log(team1Score + team2Score);

    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var windIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return windIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tornyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames , g => moment(g.time).isSame(this.dateFilter , 'day'));
    }else{
      this.games = this.allGames;
    }
  }

  getScoreWorl(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'badge-primary' : 'badge-secondary';
  }

}
