import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { QuestionnaireList } from './questionnairelist';
import { QuestView } from './questionaire';
import { OwnerView, NaireDetail } from './owner';
import { NaireAddView } from './naireaddview';
import { AuthenticationService } from './_services';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        appRoutingModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        QuestionnaireList,
        QuestView,
        OwnerView,
        NaireDetail,
        NaireAddView,
    ],
    providers: [
        AuthenticationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };