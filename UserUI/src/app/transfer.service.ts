import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  ROOT_URL: String = 'http://ec2-64-87-132-146.compute-1.amazonaws.com:8080';

  constructor(private http: HttpClient) {}

  insertEntry(
    username: string,
    saccount: string,
    ifscNo: string,
    raccount: string,
    amount: number
  ) {
    var body = {
      username: username,
      saccount: saccount,
      ifsc: ifscNo,
      raccount: raccount,
      amount: amount,
    };
    console.log(body);
    return this.http.post(this.ROOT_URL + '/account/transfer', body);
  }
}
