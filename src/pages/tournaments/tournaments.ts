import { Component } from '@angular/core';
import { LoadingController , IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from '../pages';
import { EliteApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournamnets : any;
  test : string;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              private eliteApi: EliteApi , private loadingController:LoadingController) {
                
  }

  ionViewDidLoad() {

    // this.eliteApi.getTournaments().then((data) => {
    //   this.tournamnets = data;
    // });
    
    let loader = this.loadingController.create({
      content : 'getting tornaments ..' ,
      spinner: 'dots'
    });

    loader.present().then(()=> {
      this.eliteApi.getTournaments().subscribe(data => {
        this.tournamnets = data;
        loader.dismiss();
      });
    });

}

  itemTabbed($event , tourny){
    this.navCtrl.push(TeamsPage , tourny);
  }
}
