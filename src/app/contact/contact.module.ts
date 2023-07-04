import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { inject } from '@angular/core';

import { SubmitEffect } from "./store/effects";
import { AppReducer, appReducerBuilder } from "./store/reducers";
import { FakeApiService } from "./services/fakeapi.service";
import { ContactComponent } from './components/contact/contact.component';
import { initialState } from "./model.mock";

const routes = [
    {
        path: "contacts",
        component: ContactComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature("contacts", { root: appReducerBuilder(initialState) }),
        HttpClientModule,
        EffectsModule.forFeature([SubmitEffect]),
        //StoreModule.forRoot({ root: appReducerBuilder(initialState) }),
        //EffectsModule.forRoot([SubmitEffect])
    ],
    declarations: [ContactComponent],
    providers: [FakeApiService]
})
export class ContactModule {}