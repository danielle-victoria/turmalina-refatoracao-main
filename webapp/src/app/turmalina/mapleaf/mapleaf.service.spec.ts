import { TestBed } from '@angular/core/testing';
import { MapleafService } from './mapleaf.service';

describe('MapleafService', () => {
  let service: MapleafService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      providers: [MapleafService]
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
