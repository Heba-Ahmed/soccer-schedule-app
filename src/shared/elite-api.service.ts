import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class EliteApi {
    private baseUrl = "https://elite-schedule-app-i2-f8923.firebaseio.com";

    currentTourney: any = {};
    private tornyId:any;
    constructor(private http: HttpClient) {

    }

    getTournaments() {
        // 1st solution : return "observable" to controller then subscribe on data there...
        return this.http.get(`${this.baseUrl}/tournaments.json`);

        // 2nd solution :return promise
        // return new Promise(resolve => { 
        //     this.http.get(`${this.baseUrl}/tournaments.json`)
        //     .subscribe(res=> resolve(res.json())) ;
        // }); 
    }

    getTournamentData(tournyId){
        console.log(" tornyID ===> " + tournyId);
        this.setCurrentTorny(tournyId);
        return this.http.get(`${this.baseUrl}/tournaments-data/${tournyId}.json`);

        // OLD way to subscribe.
        // return this.http.get(`${this.baseUrl}/tournament-data/${tournyId}.json`)
        //     .subscribe((response: Response) => {
        //         this.currentTourney = response.json();
        //         return this.currentTourney;
        // });

    }

    setCurrentTorny(tournyId){
        this.http.get(`${this.baseUrl}/tournaments-data/${tournyId}.json`).subscribe(
            data => {
                this.currentTourney = data;
                console.log(this.currentTourney);
            });
    }

    getCurrentTorny(){
        return this.currentTourney;
    }
}