import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraBudgetRevenueComponent } from './extra-budget-revenue.component';

describe('ExtraBudgetRevenueComponent', () => {
  let component: ExtraBudgetRevenueComponent;
  let fixture: ComponentFixture<ExtraBudgetRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraBudgetRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraBudgetRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
