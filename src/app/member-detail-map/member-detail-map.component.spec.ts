import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailMapComponent } from './member-detail-map.component';

describe('MemberDetailMapComponent', () => {
  let component: MemberDetailMapComponent;
  let fixture: ComponentFixture<MemberDetailMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
