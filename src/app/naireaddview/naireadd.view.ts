import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serverAddr, Naire, Question } from '@/_models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../_services';

@Component({ selector: 'naireaddview', templateUrl: 'naireadd.view.html' })

export class NaireAddView implements OnInit {

  title: string = "THIS IS NEW QUESTIONNAIRE!";

  naire: any = [{ question: "New question", answers: [{ value: "New answer" },] },];

  constructor(
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    console.log("NaireAddView constructor");
  }

  addNewAnswer(index: number) {
    this.naire[index].answers.push({ value: "New answer" });
  }

  addNewQuestion() {
    this.naire.push({ question: "New question", answers: [{ value: "New answer" }] });
  }

  saveNaire() {
    let naireToSave: Naire = new Naire;
    naireToSave.content = this.title;
    naireToSave.questions = new Array(this.naire.length);

    for (let i = 0; i < this.naire.length; i++) {
      let questionToSave: Question = new Question;
      questionToSave.content = this.naire[i].question;
      questionToSave.options = new Array(this.naire[i].answers.length);
      for (let j = 0; j < this.naire[i].answers.length; j++) {
        questionToSave.options[j] = this.naire[i].answers[j].value;
      }
      naireToSave.questions[i] = questionToSave;
    }

    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.set("Authorization", "Bearer " + this.authenticationService.currentUser.api_token)
    const url = serverAddr + "/api";
    return this.http.put<object>(url,
      JSON.stringify({
        id: this.authenticationService.currentUser.id,
        naire: naireToSave
      }),
      { headers: header }
      ).subscribe(
      null,
      null,
      () => {
        this.router.navigate(["/owner"]);
      }
    )
  }

  ngOnInit() {
    console.log("NaireAddView OnInit");
  }
}