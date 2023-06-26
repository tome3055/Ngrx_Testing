import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { CounterState } from './reducers';
import { increment, incrementSuccess } from './actions';

@Injectable()
export class CounterEffects {
  increment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(increment),
      tap(() => {
        // Perform your async logic here
        // Dispatch the success action to update the state in the mock store
        this.store.dispatch(incrementSuccess());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<CounterState>
  ) {}
}
