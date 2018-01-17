import { TestBed, inject } from '@angular/core/testing';

import { websocketService } from './websocket.service';

describe('websocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [websocketService]
    });
  });

  it('should be created', inject([websocketService], (service: websocketService) => {
    expect(service).toBeTruthy();
  }));
});
