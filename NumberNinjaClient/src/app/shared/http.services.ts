/**
 * @project NumberNinja
 * @author Abhinaw Sarang
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  test = "Your server is running";
  constructor(private http: HttpClient) { }

  httpGet(url) {
    return this.http.get(url);
  }

  httpPost(url, { }) {
    return this.http.post(url, { name: "Number Ninja" });
  }

  sendEmail(url, data) {
    return this.http.post(url, data);
  }
}