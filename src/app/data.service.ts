import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://springbootapi3.azurewebsites.net/users/hello";
  private rest_user="https://springbootapi3.azurewebsites.net/users/user";
  private rest_admin="https://springbootapi3.azurewebsites.net/users/admin"

  constructor(private keycloakService: KeycloakService,private httpClient: HttpClient) { }

  sendGetRequest(){
    console.log("GET");
    return this.httpClient.get(this.REST_API_SERVER ,{ responseType: 'text'});
  }

  userRequest(){
    console.log(this.keycloakService.getToken());
    let token="bearer "+this.keycloakService.getToken();
    return this.httpClient.get(this.rest_user, {headers: new HttpHeaders().set('Authorization', 'my-auth-token'), responseType: 'text'});
  }

  adminRequest(){
    console.log(this.keycloakService.getToken());
    let token="bearer "+this.keycloakService.getToken();
    return this.httpClient.get(this.rest_admin, {headers: new HttpHeaders().set('Authorization', 'my-auth-token'), responseType: 'text'});
  }
}
