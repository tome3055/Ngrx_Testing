import { createReducer, on } from '@ngrx/store';
import { initialState } from '../model.mock';
import {
  contactNameChanged,
  submitForm,
  submitFormSuccess,
} from './actions';
import { State } from '../interfaces/interface';

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
          form: {
            ...state.form.form,
            name: action.name,
          }
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
        form: {
          name: action.form.form.name,
          email: action.form.form.email,
          linkedinUrl: action.form.form.linkedinUrl,
        },
          snackbar: {
            message: `Contact ${action.form.form.name} submitted`,
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
        snackbar: {
          message: `Contact ${action.contacts[action.contacts.length - 1].name} created`,
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
