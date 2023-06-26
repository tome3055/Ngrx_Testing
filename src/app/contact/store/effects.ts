import { Actions, createEffect, ofType } from "@ngrx/effects";
import { submitContactAction, submitContactActionFailure, submitContactActionSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { FakeApiService } from "../services/fakeapi.service";
import { Injectable } from "@angular/core";
import { SubmitContactResponseSuccess } from "../interfaces/submitcontactresponse.interface";
import { SubmitContactResponseError } from "../interfaces/submitContactResponseError.interface";

@Injectable()
export class SubmitEffect {
  submit$ = createEffect(() =>
    this.actions$.pipe(
    ofType(submitContactAction),
    switchMap((request) => {
      //console.log('Effect triggered', request);
      return this.fakeApiService.submitData(request.request, true).pipe(
        map((response: SubmitContactResponseSuccess ) => {
         return submitContactActionSuccess({ response });
        }),
        catchError((error: SubmitContactResponseError) => of(submitContactActionFailure({ response: error })))
      )
    })
    )
  );
  
    constructor(private actions$: Actions, private fakeApiService: FakeApiService) {}
  }
