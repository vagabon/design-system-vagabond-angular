import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDsvComponent } from './ng-dsv.component';

describe('NgDsvComponent', () => {
  let component: NgDsvComponent;
  let fixture: ComponentFixture<NgDsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDsvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgDsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
