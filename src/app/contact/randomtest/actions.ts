import { createAction, props } from '@ngrx/store';
import { CounterState } from './reducers';

export const increment = createAction('[Counter] Increment');

export const incrementSuccess = createAction('[Counter] Increment Success');