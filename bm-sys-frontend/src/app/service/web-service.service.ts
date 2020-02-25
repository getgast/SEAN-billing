import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  private rootUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  get(url) {
    return this.httpClient.get(`${this.rootUrl}/${url}`)
  }

  post(url, objValue) {
    return this.httpClient.post(`${this.rootUrl}/${url}`, objValue)
  }
}
