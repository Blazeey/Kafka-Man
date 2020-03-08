import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerMetricsComponent } from './broker-metrics.component';

describe('BrokerMetricsComponent', () => {
  let component: BrokerMetricsComponent;
  let fixture: ComponentFixture<BrokerMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
