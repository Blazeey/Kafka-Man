import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClusterDialogComponent } from './new-cluster-dialog.component';

describe('NewClusterDialogComponent', () => {
  let component: NewClusterDialogComponent;
  let fixture: ComponentFixture<NewClusterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClusterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClusterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
