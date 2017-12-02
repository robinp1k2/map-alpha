import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BusinessService } from './../business.service';

import { CMember } from './../cMember';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @Input() myBiz: CMember;

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getBiz();
  }

  getBiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.businessService.getOneBusiness(id)
      .subscribe(aBusiness => this.myBiz = aBusiness);
  }

  goBack(): void {
    this.location.back();
  }
}
