import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';
import { ContactInterface } from '../interfaces/contact.interface';

export type ContactpagePresentationModel = {
    name: string;
    linkedinUrl: string;
    email: string;
    snackbar: {
      message: string;
    }
};

const buildContactPagePresentation = (
  state: AppState
): ContactpagePresentationModel => {
  return {
      name: state.root.form.name,
      linkedinUrl: state.root.form.linkedinUrl,
      email: state.root.form.email,
      
    snackbar: {
      message: state.root.form.snackbar.message,
    }
  };
};

const buildContacts = (state: AppState): ContactInterface[] => {
  return state.root.contacts;
};

export const selectContactPagePresentationModel = createSelector({
  contactPage: buildContactPagePresentation,
});

export const selectContactsFromAppState = createSelector({
  contacts: buildContacts,
});