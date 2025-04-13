import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant-service.service';

describe('RestaurantServiceService', () => {
  let service: RestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
