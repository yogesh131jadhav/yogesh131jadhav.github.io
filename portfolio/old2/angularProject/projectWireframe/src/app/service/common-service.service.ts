import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  public loggedInUser = new BehaviorSubject<string>(null);

  constructor() { }
  
  public authorizeUser(user): boolean {
    if (user) {
      this.loggedInUser.next(user);
      return true;
    }
    return false;
  }

  public logout() {
    this.loggedInUser.next(null);
  }
}
