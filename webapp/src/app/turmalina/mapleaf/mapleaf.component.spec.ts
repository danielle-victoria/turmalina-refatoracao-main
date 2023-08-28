import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapleafComponent } from './mapleaf.component';

describe('MapleafComponent', () => {
  let component: MapleafComponent;
  let fixture: ComponentFixture<MapleafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapleafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapleafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
