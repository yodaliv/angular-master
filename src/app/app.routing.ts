import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { QuestView } from './questionaire';
import { OwnerView } from './owner';
import { QuestionnaireList } from './questionnairelist';
import { NaireAddView } from './naireaddview';

const routes: Routes = [
    { path: '', component: QuestionnaireList },
    { path: 'test/:id', component: QuestView },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'owner', component: OwnerView },
    { path: 'naireaddview', component: NaireAddView },
    // otherwise redirect to home

    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);