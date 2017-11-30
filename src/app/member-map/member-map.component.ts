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
    this.myMap = L.map('mapid').setView([38.6251522,-90.345091], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: environment.MAPBOX_API_KEY
    }).addTo(this.myMap);
    this.getCMembers();
    this.plotBusinesses();
  }
  
  getCMembers(): void {
    this.businessService.getBusinesses()
      .subscribe(theMembers => this.cMembers = theMembers);
  }

  plotBusinesses(): void {
    var marker: L.marker;
    // marker = L.marker([38.6251522,-90.345091]).addTo(this.myMap);
    marker = L.marker(this.cMembers[12].lat,this.cMembers[12].lon).addTo(this.myMap);
    // for(var i=0; i < this.cMembers.length; i++) {
    //   marker = L.marker(this.cMembers[i].lat,this.cMembers[i].lon).addTo(this.myMap);
    // }
  }
}
