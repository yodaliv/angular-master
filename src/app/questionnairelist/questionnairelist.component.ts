import { Component, OnInit } from '@angular/core';
import { NaireInfo } from '../_models';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverAddr } from '../_models';

@Component({ selector: 'questionnairelist', templateUrl: 'questionnairelist.component.html' })

export class QuestionnaireList implements OnInit {

  infoList: NaireInfo[];
  loading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {

    let header = new HttpHeaders();
    header = header.append('Accept', 'application/json');
    header = header.append('Content-Type', 'application/json');
    const url = serverAddr + "/";
    this.http.get<NaireInfo[]>(url, { headers: header }).subscribe(
      data => {
        this.loading = false;
        this.infoList = data;
      },
      error => {
        this.loading = false;
      },
    );
  }

  toTestView(id: number) {
    this.router.navigate(['/test', id]);
  }
}

