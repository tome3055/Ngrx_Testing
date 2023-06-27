import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';

export type ContactpagePresentationModel = {
  form: {
    name: string;
    linkedinUrl: string;
    email: string;
  };
};

const buildContactPagePresentation = (
  state: AppState
): ContactpagePresentationModel => {
  return {
    form: {
      name: state.root.form.name,
      linkedinUrl: state.root.form.linkedinUrl,
      email: state.root.form.email,
    },
  };
};

export const selectContactPagePresentationModel = createSelector({
  contactPage: buildContactPagePresentation,
});
