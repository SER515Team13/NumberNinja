import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToollbarComponent } from './toollbar.component';

describe('ToollbarComponent', () => {
  let component: ToollbarComponent;
  let fixture: ComponentFixture<ToollbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToollbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
