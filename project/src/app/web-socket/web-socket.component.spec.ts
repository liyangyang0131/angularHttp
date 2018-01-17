import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { websocketComponent } from './web-socket.component';

describe('websocketComponent', () => {
  let component: websocketComponent;
  let fixture: ComponentFixture<websocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ websocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(websocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
