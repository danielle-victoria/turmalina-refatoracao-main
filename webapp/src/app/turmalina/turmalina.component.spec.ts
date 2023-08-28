import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurmalinaComponent } from './turmalina.component';

describe('TurmalinaComponent', () => {
  let component: TurmalinaComponent;
  let fixture: ComponentFixture<TurmalinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurmalinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmalinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
