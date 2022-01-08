import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { serverAddr, NaireWithResult } from '../_models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../_services';

@Component({ selector: 'nairedetail', templateUrl: 'nairedetail.component.html' })

export class NaireDetail implements OnInit, OnChanges {

  @Input() currentNaire: number = -1;
  @Output() removed = new EventEmitter();
  currentInfo: NaireWithResult;

  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
  }

  removeThis() {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.set("Authorization", "Bearer " + this.authenticationService.currentUser.api_token)
    const url = serverAddr + "/api/" + this.currentNaire;
    return this.http.delete<object>(url,
      { headers: header }
    ).subscribe(
      null,
      null,
      () => {
        this.removed.emit();
      }
    );
  }

  ngOnInit() {
    if (this.currentNaire == -1) {
      return;
    }
    this.loading = true;

    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.set("Authorization", "Bearer " + this.authenticationService.currentUser.api_token)
    const url = serverAddr + "/api/result";
    return this.http.post<NaireWithResult>(
      url,
      JSON.stringify({
        id: this.currentNaire
      }),
      { headers: header }
      ).subscribe(
      data => {
        this.currentInfo = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  ngOnChanges() {
    if (this.currentNaire == -1) {
      return;
    }
    this.loading = true;

    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.set("Authorization", "Bearer " + this.authenticationService.currentUser.api_token)
    const url = serverAddr + "/api/result";
    return this.http.post<NaireWithResult>(url,
      JSON.stringify({
        id: this.currentNaire
      }),
      { headers: header }
      ).subscribe(
      data => {
        this.currentInfo = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }
}