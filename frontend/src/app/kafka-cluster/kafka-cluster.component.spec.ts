import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaClusterComponent } from './kafka-cluster.component';

describe('KafkaClusterComponent', () => {
  let component: KafkaClusterComponent;
  let fixture: ComponentFixture<KafkaClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkaClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
