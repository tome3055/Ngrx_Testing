import { ContactInterface, State } from "./interfaces/interface";

export const initialState: State = {
  form: {
    form: {
      name: '',
      linkedinUrl: '',
      email: '',
    },
    snackbar: {
      message: ''
    }
  },
  errors: '',
  isSubmitting: false,
  contacts: [],
};

export const initialStateaftersubmit: State = {
  form: {
    form : {      
      name: '',
      linkedinUrl: '',
      email: '',
    },
    snackbar: {
      message: ''
    }
  },
  errors: '',
  isSubmitting: true,
  contacts: [],
};

export const formFilledState: State = {
  form: {
    form: {
      name: 'Bruno',
      linkedinUrl: 'linkedin.com/bruno',
      email: 'Bruno@ludotech.co',
    },
    snackbar: {
      message: ''
    }
  },
  errors: '',
  isSubmitting: false,
  contacts: [],
};

export const oneContactState: State = {
  form: {
    form: {
      name: 'Bruno',
      linkedinUrl: 'linkedin.com/bruno',
      email: 'Bruno@ludotech.co',
    },
    snackbar: {
      message: ''
    }
  },
  errors: '',
  isSubmitting: false,
  contacts: [{
    id: "123",
    name: 'Bruno',
    linkedinUrl: 'linkedin.com/bruno',
    email: 'Bruno@ludotech.co',
  }],
};

export const afterFormSubmitState: State = {
  form: {
    form: {
      name: '',
      linkedinUrl: '',
      email: '',
    },
    snackbar: {
      message: ''
    }
  },
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
};

const returncontacts: ContactInterface[] = [
  {
    id: '123',
    name: 'Bruno',
    linkedinUrl: 'linkedin.com/bruno',
    email: 'Bruno@ludotech.co',
  },
];
