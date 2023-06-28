import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { inject } from '@angular/core';

import { SubmitEffect } from "./store/effects";
import { AppReducer } from "./store/reducers";
import { FakeApiService } from "./services/fakeapi.service";
import { ContactComponent } from './components/contact/contact.component';

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
        StoreModule.forFeature("contacts", AppReducer),
        HttpClientModule,
        EffectsModule.forFeature([SubmitEffect]),
    ],
    declarations: [ContactComponent],
    providers: [FakeApiService]
})
export class ContactModule {}