import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenInformationComponent } from './citizen-information.component';

describe('CitizenInformationComponent', () => {
  let component: CitizenInformationComponent;
  let fixture: ComponentFixture<CitizenInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitizenInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
