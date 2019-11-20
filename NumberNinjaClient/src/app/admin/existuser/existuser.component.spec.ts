/**
 * @project NumberNinja
 * @author Sagar Khar
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExistuserComponent } from './existuser.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminToolbarComponent } from '../../toolbars/admintoolbar/admintoolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../shared/user.service';

describe('AdminComponent', () => {
  let component: ExistuserComponent;
  let fixture: ComponentFixture<ExistuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        ExistuserComponent,
        AdminToolbarComponent
      ],
      providers: [
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have a table', () => {
    const compiledDom = fixture.debugElement.nativeElement;
    compiledDom.querySelector('mat-table').click();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.matTable')).length).toEqual(1);
  });

  xit('should have defined number of Columns', () => {
    const compiledDom = fixture.debugElement.nativeElement;
    compiledDom.querySelector('mat-header-cell').click();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.mat-header-cell')).length).toEqual(5);
  });

  xit('should have accept and reject buttons', () => {
    fixture.detectChanges();
    for (let entry of fixture.debugElement.queryAll(By.css('.mat-cell.mat-column-action'))) {
      expect(entry.queryAll(By.css('.btn')).length).toEqual(2);
    }
  });
});
