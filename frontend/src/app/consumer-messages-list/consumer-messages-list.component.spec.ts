import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerMessagesListComponent } from './consumer-messages-list.component';

describe('ConsumerMessagesListComponent', () => {
  let component: ConsumerMessagesListComponent;
  let fixture: ComponentFixture<ConsumerMessagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerMessagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
