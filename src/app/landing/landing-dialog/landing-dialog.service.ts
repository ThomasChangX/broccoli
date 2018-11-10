import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingDialogService {

  private host = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

  constructor(
    private http: HttpClient
  ) { }

  requestInvit(reqObj: { name: string, email: string }) {
    return this.http.post(this.host, reqObj);
  }
}
