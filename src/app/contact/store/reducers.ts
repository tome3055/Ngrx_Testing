import { createReducer, on } from '@ngrx/store';
import { initialState } from '../model.mock';
import {
  contactNameChanged,
  submitForm,
  submitFormSuccess,
} from './actions';
import { ContactpagePresentationModel, ContactpagePresentationModelForm, State } from '../interfaces/interface';

export type AppState = {
  root: State;
};

const reducers = [
  on(
    contactNameChanged,
    (state: State, action: { name: string }): State => ({
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
    (state: State, action: {form: ContactpagePresentationModelForm}): State => ({
      ...state,
      isSubmitting: true,
      form: {
        ...state.form,
        form: {
          name: action.form.name,
          email: action.form.email,
          linkedinUrl: action.form.linkedinUrl,
        },
          snackbar: {
            message: `Contact ${action.form.name} Submitted`,
        }
      },
      
    })
  ),
  on(
    submitFormSuccess,
    (state: State, action): State => ({
      ...state,
      isSubmitting: false,
      form: {
        ...state.form,
        form: {
          name: '',
          email: '',
          linkedinUrl: '',
        },
        snackbar: {
          message: `Contact ${action.contacts[action.contacts.length - 1].name} Created`,
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
