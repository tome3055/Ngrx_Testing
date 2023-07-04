import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState, ContactInterface, ContactpagePresentationModel, State } from '../interfaces/interface';

export const contactPageFeatureSelector = createFeatureSelector<AppState>("contacts");


const getFormState = createSelector(
  contactPageFeatureSelector,
  (state: AppState) => state.root.form
);

const getSnackbarState = createSelector(
  contactPageFeatureSelector,
  (state: AppState) => state.root.snackbar
);

const getContactsState = createSelector(
  contactPageFeatureSelector,
  (state: AppState) => state.root.contacts
);

const selectContactPagePresentationModelform = createSelector(
  getFormState,
  getSnackbarState,
  getContactsState,
  (form, snackbar, contacts) : ContactpagePresentationModel => ({
    form: {
      name: form.name,
      linkedinUrl: form.linkedinUrl,
      email: form.email,
    },
    snackbar: {
      message: snackbar.message,
    },
    contacts,
  })
);

export const selectContactPagePresentationModel = createSelector({
  contactPage: selectContactPagePresentationModelform,
});


// const buildContactPagePresentation = (
//   state: AppState
// ): ContactpagePresentationModel => {
//   return {
//     form: {
//       name: state.root.form.name,
//       linkedinUrl: state.root.form.linkedinUrl,
//       email: state.root.form.email,
//     },
//     snackbar: {
//       message: state.root.snackbar.message,
//     },
//     contacts: state.root.contacts,
//   };
// };

// const buildContacts = (state: AppState): ContactInterface[] => {
//   return state.root.contacts;
// };

// export const selectContactPagePresentationModel = createSelector({
//   contactPage: buildContactPagePresentation,
// });

// export const selectContactsFromAppState = createSelector({
//   contacts: buildContacts,
// });
