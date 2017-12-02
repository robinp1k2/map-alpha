import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { BusinessService } from './../business.service';
import { CMember } from './../cMember';


@Component({
  selector: 'app-member-map',
  templateUrl: './member-map.component.html',
  styleUrls: ['./member-map.component.css']
})
export class MemberMapComponent implements OnInit {
  myMap: L;
  cMembers: CMember[];
  
  constructor(private businessService: BusinessService) { }
  
  ngOnInit() {
    L.Icon.Default.imagePath = 'assets/leaflet/';
    this.myMap = L.map('mainMap').setView([38.6251522,-90.345091], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: environment.MAPBOX_API_KEY
    }).addTo(this.myMap);
    this.getCMembers();
  }

  getCMembers(): void {

    //This works and I like it best because it is clearer to understand!
    this.businessService.getBusinesses()
      .subscribe({
        next: (theMembers: CMember[]) => this.cMembers = theMembers,
        error: (err: any) => console.log('Oops.. ${err}'),
        complete: () => this.handleCompleteGetBusinesses()
      })

    //This works:
    // this.businessService.getBusinesses()
    //   .subscribe(
    //     (theMembers: CMember[]) => {this.cMembers = theMembers;},
    //     (err: any) => {console.log('Oops.. ${err}');},
    //     () => {this.handleCompleteGetBusinesses()}
    //   )

    //This does NOT work.  Gets typeError that plotBusiness is not a function.
    // function myOnNext(theMembers: CMember[]) {
    //   this.cMembers = theMembers;
    // }
    // function myError( err: any) {
    //   console.log('Oops...${err}');
    // }
    // function myComplete() {
    //   console.log("Found this many businesses: " + this.cMembers.length);
    //   this.plotBusinesses();    
    // }
    // this.businessService.getBusinesses()
    //   .subscribe(myOnNext, myError, myComplete);

  }

  handleCompleteGetBusinesses(): void {
    console.log("Found this many businesses: " + this.cMembers.length);
    this.plotBusinesses();
  }

  plotBusinesses(): void {
    var aMarker: L.marker;
    for (var i = 0; i < this.cMembers.length; i++) {
      console.log("id/lat/lon: " + this.cMembers[i].id + "/" + this.cMembers[i].lat + "/" + this.cMembers[i].lon);
      aMarker = new L.marker([this.cMembers[i].lat,this.cMembers[i].lon])
        .bindPopup(this.cMembers[i].id + ": " + this.cMembers[i].name 
          + "</br><a href='/detail/" + this.cMembers[i].id + "'>Business Details</a>")
        .addTo(this.myMap);
      }
  }
}
