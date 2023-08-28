import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpenditureComponent } from './budget-expenditure.component';

describe('BudgetExpenditureComponent', () => {
  let component: BudgetExpenditureComponent;
  let fixture: ComponentFixture<BudgetExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetExpenditureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
