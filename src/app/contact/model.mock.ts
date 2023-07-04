import { ContactInterface, State } from "./interfaces/interface";

export const initialState: State = {
  errors: '',
  isSubmitting: false,
  contacts: [],
  snackbar: {
    message: ""
  },
  form: {
    name: "",
    linkedinUrl: "",
    email: ""
  }
};

export const initialStateaftersubmit: State = {
  errors: '',
  isSubmitting: true,
  contacts: [],
  snackbar: {
    message: ""
  },
  form: {
    name: "",
    linkedinUrl: "",
    email: ""
  }
};

export const formFilledState: State = {
  errors: '',
  isSubmitting: false,
  contacts: [],
  snackbar: {
    message: ""
  },
  form: {
    name: 'Bruno',
    linkedinUrl: 'linkedin.com/bruno',
    email: 'Bruno@ludotech.co',
  }
};

export const oneContactState: State = {
  errors: '',
  isSubmitting: false,
  contacts: [{
    id: "123",
    name: 'Bruno',
    linkedinUrl: 'linkedin.com/bruno',
    email: 'Bruno@ludotech.co',
  }],
  snackbar: {
    message: ""
  },
  form: {
    name: "",
    linkedinUrl: "",
    email: ""
  }
};

export const afterFormSubmitState: State = {
  errors: '',
  isSubmitting: false,
  contacts: [
    {
      id: '123',
      name: 'Bruno',
      email: 'Bruno@ludotech.co',
      linkedinUrl: 'linkedin.com/bruno',
    },
  ],
  snackbar: {
    message: ""
  },
  form: {
    name: "",
    linkedinUrl: "",
    email: ""
  }
};
