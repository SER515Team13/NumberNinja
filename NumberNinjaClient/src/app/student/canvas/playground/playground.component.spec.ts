/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentToolbarComponent } from 'src/app/toolbars/studenttoolbar/studenttoolbar.component';
import { PlaygroundComponent } from './playground.component';
declare var Blockly: any;

describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PlaygroundComponent, StudentToolbarComponent, Blockly ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
