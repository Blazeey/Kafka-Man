import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerMessageItemComponent } from './consumer-message-item.component';

describe('ConsumerMessageItemComponent', () => {
  let component: ConsumerMessageItemComponent;
  let fixture: ComponentFixture<ConsumerMessageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerMessageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerMessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
