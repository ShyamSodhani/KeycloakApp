import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import jwt_decode from 'jwt-decode';
import { DataService } from "../../../data.service";
// import xml2js from 'xml2js';  

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user = '';
  public token ='';
  roles :string[] ;
  userid='';
  header;
  content;
  signature;
  signed;
  roleset;

  

  constructor(private keycloakService: KeycloakService,private router: Router,private dataService: DataService) { }

  ngOnInit(): void {
    this.initializeUserOptions();

    // this.dataService.sendGetRequest().subscribe((data: any[])=>{
    //   console.log(data);
    //   // this.products = data;
    // }) 
  }



  initializeUserOptions(): void {

    this.user = this.keycloakService.getUsername();

    this.keycloakService.getToken().then(res => {
      this.token = res;
      console.log(jwt_decode(this.token));

      if ( this.token ) {
        try {
          var parts = this.token.split('-');
          console.log(parts);
          // this.header = JSON.parse( parts[0]).toString() );
          // this.content = JSON.parse( new Buffer( parts[1], 'base64' ).toString() );
          this.signature = JSON.parse( parts[2]).toString() ;
          console.log(this.signature);
          this.signed = parts[0] + '.' + parts[1];
        } catch (err) {
          this.content = {
            expiresAt: 0
          };
        }
      }
    });

    
    // let abc=this.token;
    // var decoded = jwt_decode(this.token);
    // let tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    // let expireDate = tokenInfo.exp; // get token expiration dateTime
    // console.log(decoded); // show decoded token object in console
    // this.Token(this.token);
    // console.log(this.signature);
    

    this.roles = this.keycloakService.getUserRoles();
    this.roleset =new Set(this.roles);
    this.userid=this.keycloakService.getKeycloakInstance().subject

  }

  query(){
    console.log("calling query");
    if(this.roleset.has('AccessForQuery')){

      this.router.navigateByUrl('/query');

    }else{
      console.log('nope');
      alert("Please Subcribe to Premium Plan");
    }
    
  }

  train(){
    console.log("calling training");
    if(this.roleset.has('AccessForTraining')){
      this.router.navigateByUrl('/training');
    }
    else{
      console.log('nope');
      alert("Please Subcribe to Premium Plan");
    }
  }

  logout(): void {
    this.keycloakService.logout('http://localhost:4200/welcome/home');
  }


  hello(){
    this.dataService.sendGetRequest().subscribe((data)=>{
      console.log(typeof data);
      console.log(data);
    })
  }

  userReq(){
    this.dataService.userRequest().subscribe((data)=>{
      console.log(typeof data);
      console.log(data);
    })
  }

  adminReq(){
    this.dataService.adminRequest().subscribe((data)=>{
      console.log(typeof data);
      console.log(data);
    })
  }



}
