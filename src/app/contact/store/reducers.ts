import { createReducer, on } from '@ngrx/store';

import { State } from '../interfaces/contactpage.model.interface';
import { initialState } from '../model.mock';
import {
  contactNameChanged,
  submitContactAction,
  submitContactActionFailure,
  submitContactActionSuccess,
} from './actions';

export type AppState = {
  root: State;
};

const reducers = [
  on(
    contactNameChanged,
    (state: State, action): State => ({
      ...state,
      form: {
        ...state.form,
        name: action.name,
      },
    })
  ),
  on(
    submitContactAction,
    (state: State): State => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    submitContactActionSuccess,
    (state: State, action): State => ({
      ...state,
      isSubmitting: false,
      contacts: [...state.contacts, ...action.response.data],
    })
  ),
  on(
    submitContactActionFailure,
    (state: State, action): State => ({
      ...state,
      isSubmitting: false,
      errors: action.response.data,
    })
  ),
];

export const appReducerBuilder = (initialState: State) => {
  return createReducer(initialState, ...reducers);
};

export const AppReducer = createReducer(initialState, ...reducers);
