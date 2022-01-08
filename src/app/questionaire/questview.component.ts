import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Naire } from '../_models'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {serverAddr} from '../_models';

@Component({ selector: 'questview', templateUrl: 'questview.component.html' })

export class QuestView implements OnInit {

  id: number;
  naire: Naire;
  result: number[];
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  sendAnswer() {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    const url = serverAddr + "/";
    this.http.put<object>(
      url,
      JSON.stringify({
        id: this.id,
        result: this.result
      }),
      { headers: header }
      ).subscribe(
      null,
      null,
      () => {
          this.router.navigate(['/']);
        }
      );
  }

  radioChangeHandler(event: any) {
    this.result[event.target.name] = event.target.value;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;

    let header = new HttpHeaders();
    header = header.append('Accept', 'application/json');
    header = header.append('Content-Type', 'application/json');
    const url = serverAddr + "/" + this.id;
    this.http.get<Naire>(
      url,
      { headers: header }
      ).subscribe(
      data => {
        this.loading = false;
        this.naire = data;
        this.result = new Array(this.naire.questions.length);

        for (let i = 0; i < this.result.length; i++) {
          this.result[i] = -1;
        }
      },
      error => {
        this.loading = false;
        console.log(error);
      },
    );
  }
}