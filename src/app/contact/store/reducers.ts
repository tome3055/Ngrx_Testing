import { createReducer, on } from '@ngrx/store';
import { initialState } from '../model.mock';
import {
  contactEmailChanged,
  contactLinkedInUrlChanged,
  contactNameChanged,
  submitForm,
  submitFormSuccess,
} from './actions';
import { ContactForm, State, ContactInterface } from '../interfaces/interface';

const reducers = [
  on(
    contactNameChanged,
    (state: State, action: { name: string }): State => ({
      ...state,
      form: {
        ...state.form,
        name: action.name,
      },
    })
  ),
  on(
    contactEmailChanged,
    (state: State, action: { email: string }): State => ({
      ...state,
      form: {
        ...state.form,
        email: action.email,
      },
    })
  ),
  on(
    contactLinkedInUrlChanged,
    (state: State, action: { linkedinUrl: string }): State => ({
      ...state,
      form: {
        ...state.form,
        linkedinUrl: action.linkedinUrl,
      },
    })
  ),
  on(
    submitForm,
    (state: State, action: {form: ContactForm}): State => ({
      ...state,
      isSubmitting: true,
      snackbar: {
        message: `Contact ${action.form.name} Submitted`,
      }
    })
  ),
  on(
    submitFormSuccess,
    (state: State, action: {contacts: ContactInterface[]}): State => ({
      ...state,
      isSubmitting: false,
      form: {
        name: '',
        linkedinUrl: '',
        email: ''
      },
      contacts: [...action.contacts],
      snackbar: {
        message: `Contact ${action.contacts[action.contacts.length - 1].name} Created`,
      }
      
    })
  ),
];

export const appReducerBuilder = (initialState: State) => {
  return createReducer(initialState, ...reducers);
};

export const AppReducer = createReducer(initialState, ...reducers);
