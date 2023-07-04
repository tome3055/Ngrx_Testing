
export interface ContactForm {
  name: string;
  linkedinUrl: string;
  email: string;
}

export interface ContactpagePresentationModel  {
  form: ContactForm;
  snackbar: {
    message: string;
  },
  contacts: ContactInterface[];
};

export interface ContactInterface {
    id: string,
    name: string,
    email: string,
    linkedinUrl: string,
  }

export interface State {
  form: ContactForm;
  errors: string;
  isSubmitting: boolean;
  snackbar: {
    message: string;
  },
  contacts: ContactInterface[];
}

export interface AppState {
  root: State;
};
