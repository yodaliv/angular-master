import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serverAddr, NaireInfo } from '../_models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '@/_services';

@Component({ selector: 'ownerview', templateUrl: 'ownerpanel.view.html' })

export class OwnerView implements OnInit {

  loading: boolean = false;
  selected: number = -1;
  naireList: NaireInfo[];

  constructor(
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.loading = true;

    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.set("Authorization", "Bearer " + this.authenticationService.currentUser.api_token)
    const url = serverAddr + "/api/nairesofowner";
    this.http.post<NaireInfo[]>(
      url,
      JSON.stringify({
        id: this.authenticationService.currentUser.id
      }),
      { headers: header }
    ).subscribe(
      data => {
        this.naireList = data;
        if (this.naireList.length) {
          this.selected = this.naireList[0].id;
        }
        else {
          this.selected = -1;
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  onClicked(index: number) {
    this.selected = this.naireList[index].id;
  }

  onRemove() {
    let i;
    for (i = 0; i < this.naireList.length; i++) {
      if (this.naireList[i].id == this.selected) {
        this.naireList.splice(i, 1);
        break;
      }
    }

    if (i >= this.naireList.length) {
      this.selected = this.naireList[i - 1].id;
    }
    else {
      this.selected = this.naireList[i].id;
    }

  }

  addNew() {
    this.router.navigate(['/naireaddview']);
  }
}