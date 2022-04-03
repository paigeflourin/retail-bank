import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../interface/Client';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ClientService {

  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  login(client): Observable<Client> {
    return this._http.post<Client>(this.myAppUrl + 'api/client/login', client).pipe(
      catchError(this.errorHandler));

  }

  getClientData(id) {
    return this._http.post<Client>(this.myAppUrl + 'api/client/getClientData', id).pipe(
      catchError(this.errorHandler));
  }


  topup(client){
    return this._http.post(this.myAppUrl + 'api/balance/topup', client).pipe(
      catchError(this.errorHandler));
  }

  pay(client) {
    return this._http.post(this.myAppUrl + 'api/payment/pay', client).pipe(
      catchError(this.errorHandler));
  }


  getClientDataByName(client): Observable<Client> {
    return this._http.post<Client>(this.myAppUrl + 'api/client/getClientDataByName', client).pipe(
      catchError(this.errorHandler));
  }



  errorHandler(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  


}