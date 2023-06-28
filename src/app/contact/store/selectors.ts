import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './reducers';
import { ContactInterface, ContactpagePresentationModel, State } from '../interfaces/interface';

export const contactPageFeatureSelector = createFeatureSelector<State>("contacts");

export const selectIsSubmitting = createSelector(contactPageFeatureSelector, (state: State) => state.isSubmitting);

export const selectContacts = createSelector(contactPageFeatureSelector, (state: State) => state.contacts);

export const selectContactPagePresentationModelForm = createSelector(contactPageFeatureSelector, (state: State) => state.form.form);

export const selectSnackbar = createSelector(contactPageFeatureSelector, (state: State) => state.form.snackbar);

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
