import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // User Credits State
  private userCreditsSubject = new BehaviorSubject<number>(2000);
  userCredits$ = this.userCreditsSubject.asObservable();

  constructor() { }

  getCredits(): number {
    return this.userCreditsSubject.value;
  }

  deductCredits(amount: number): boolean {
    const currentCredits = this.userCreditsSubject.value;
    if (currentCredits >= amount) {
      this.userCreditsSubject.next(currentCredits - amount);
      return true;
    }
    return false;
  }
}
