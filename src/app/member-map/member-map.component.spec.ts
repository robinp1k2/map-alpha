import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMapComponent } from './member-map.component';

describe('MemberMapComponent', () => {
  let component: MemberMapComponent;
  let fixture: ComponentFixture<MemberMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
