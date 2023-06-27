import { Actions, createEffect, ofType } from "@ngrx/effects";
import { submitForm, submitFormSuccess } from "./actions";
import { map, switchMap } from "rxjs";
import { FakeApiService } from "../services/fakeapi.service";
import { Injectable } from "@angular/core";
import { ContactInterface } from "../interfaces/contact.interface";

@Injectable()
export class SubmitEffect {
  submit$ = createEffect(() =>
    this.actions$.pipe(
    ofType(submitForm),
    switchMap((request) => {
      return this.fakeApiService.submitData(request.form, true).pipe(
        map((contacts: ContactInterface[] ) => submitFormSuccess({ contacts: contacts })),
        //catchError((error: SubmitContactResponseError) => of(submitContactActionFailure({ response: error })))
      )
    })
    )
  );
  
    constructor(private actions$: Actions, private fakeApiService: FakeApiService) {
      console.log(actions$);
    }
  }
