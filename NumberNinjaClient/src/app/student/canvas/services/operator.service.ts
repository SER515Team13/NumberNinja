import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operator } from './../models/operator.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  operators: Operator[] = [
    { operatorName: '+' }, 
    { operatorName: '-' },
    { operatorName: '*' },
    { operatorName: '/' },
    { operatorName: '0' },
    { operatorName: '1' },
    { operatorName: '2' },
    { operatorName: '3' },
    { operatorName: '4' },
    { operatorName: '5' },
    { operatorName: '6' },
    { operatorName: '7' },
    { operatorName: '8' },
    { operatorName: '9' },
  ]

  constructor() { }

  public getOperators(): any {
    const operatorsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.operators);
      }, 1000);
    });

    return operatorsObservable;
  }
}
