import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningInstrumentComponent } from './planning-instrument.component';

describe('PlanningInstrumentComponent', () => {
  let component: PlanningInstrumentComponent;
  let fixture: ComponentFixture<PlanningInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningInstrumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
