import { Component, OnInit } from '@angular/core';

import { BusinessService } from './../business.service';
import { CMember } from './../cMember';

@Component({
  selector: 'app-c-members',
  templateUrl: './c-members.component.html',
  styleUrls: ['./c-members.component.css']
})
export class CMembersComponent implements OnInit {
  cMembers: CMember[];

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.getCMembers();
  }

  getCMembers(): void {
    this.businessService.getBusinesses()
      .subscribe(theMembers => this.cMembers = theMembers);
  }

}
