import { createReducer, on } from '@ngrx/store';

import { State } from '../interfaces/contactpage.model.interface';
import { initialState } from '../model.mock';
import {
  contactNameChanged,
  submitForm,
  submitFormSuccess,
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
    submitForm,
    (state: State, action): State => ({
      ...state,
      isSubmitting: true,
      form: {
        ...state.form,
          name: action.form.name,
          email: action.form.email,
          linkedinUrl: action.form.linkedinUrl,
          snackbar: {
            message: `Contact ${state.form.name} submitted`,
          }
      },
      
    })
  ),
  on(
    submitFormSuccess,
    (state: State, action): State => ({
      ...state,
      isSubmitting: true,
      form: {
        ...state.form,
          name: "",
          email: "",
          linkedinUrl: "",
          snackbar: {
            message: `Contact ${state.form.name} created`,
          }
      },
      contacts: [...state.contacts, ...action.contacts]
      
    })
  ),
];

export const appReducerBuilder = (initialState: State) => {
  return createReducer(initialState, ...reducers);
};

export const AppReducer = createReducer(initialState, ...reducers);
