import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraBudgetExpenditureComponent } from './extra-budget-expenditure.component';

describe('ExtraBudgetExpenditureComponent', () => {
  let component: ExtraBudgetExpenditureComponent;
  let fixture: ComponentFixture<ExtraBudgetExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraBudgetExpenditureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraBudgetExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
