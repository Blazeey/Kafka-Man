import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerMessagesComponent } from './consumer-messages.component';

describe('ConsumerMessagesComponent', () => {
  let component: ConsumerMessagesComponent;
  let fixture: ComponentFixture<ConsumerMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
