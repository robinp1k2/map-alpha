import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { BusinessService } from './../business.service';
import { CMember } from './../cMember';

@Component({
  selector: 'app-member-detail-map',
  templateUrl: './member-detail-map.component.html',
  styleUrls: ['./member-detail-map.component.css']
})
export class MemberDetailMapComponent implements OnInit {
  myDetailMap: L;
  myBiz: CMember;
  
  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private location: Location
  ) {}
  
  ngOnInit() {
    L.Icon.Default.imagePath = 'assets/leaflet/';
    this.myDetailMap = L.map('detailMap').setView([38.6251522,-90.345091], 13);    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: environment.MAPBOX_API_KEY
    }).addTo(this.myDetailMap);
    this.getBiz();
  }

  plotBusiness(): void {
    var aMarker: L.marker;
    console.log("id/lat/lon: " + this.myBiz.id + "/" + this.myBiz.lat + "/" + this.myBiz.lon);
      aMarker = new L.marker([this.myBiz.lat,this.myBiz.lon])
        .bindPopup(this.myBiz.id + ": " + this.myBiz.name)
        .addTo(this.myDetailMap);
    this.myDetailMap.setView([this.myBiz.lat,this.myBiz.lon], 13);
  }

  handleCompleteGetBusiness(): void {
    console.log("Found this business : " + this.myBiz.name);
    this.plotBusiness();    
  }

  getBiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.businessService.getOneBusiness(id)
      .subscribe({
        next: (aBusiness) => this.myBiz = aBusiness,
        error: (err: any) => console.log('Oops.. ${err}'),
        complete: () => this.handleCompleteGetBusiness()
      });
  }
}
