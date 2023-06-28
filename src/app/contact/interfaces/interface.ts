
export interface ContactpagePresentationModelForm {
  name: string;
  linkedinUrl: string;
  email: string;
}

export interface ContactpagePresentationModel  {
  form: ContactpagePresentationModelForm,
  snackbar: {
    message: string;
  }
};

export interface ContactInterface {
    id: string,
    name: string,
    email: string,
    linkedinUrl: string,
  }

export interface State {
  form: ContactpagePresentationModel;
  errors: string;
  isSubmitting: boolean;
  contacts: ContactInterface[];
}
