import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';
import { ContactInterface, ContactpagePresentationModel } from '../interfaces/interface';

const buildContactPagePresentation = (
  state: AppState
): ContactpagePresentationModel => {
  return {
    form: {
      name: state.root.form.form.name,
      linkedinUrl: state.root.form.form.linkedinUrl,
      email: state.root.form.form.email,
    },
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