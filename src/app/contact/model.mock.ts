import { ContactInterface } from './interfaces/contact.interface';
import { State } from './interfaces/contactpage.model.interface';
import { SubmitContactRequest } from './interfaces/submitcontactrequest.interface';
import { SubmitContactResponseSuccess } from './interfaces/submitcontactresponse.interface';

export const initialState: State = {
  form: {
      name: '',
      linkedinUrl: '',
      email: '',
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
      name: '',
      linkedinUrl: '',
      email: '',
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
      name: 'Bruno',
      linkedinUrl: 'linkedin.com/bruno',
      email: 'Bruno@ludotech.co',
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
      name: 'Bruno',
      linkedinUrl: 'linkedin.com/bruno',
      email: 'Bruno@ludotech.co',
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
      name: '',
      linkedinUrl: '',
      email: '',
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

export const submitcontactrequest: SubmitContactRequest = {
  form: {
    name: 'Bruno',
    linkedinUrl: 'linkedin.com/bruno',
    email: 'Bruno@ludotech.co',
  },
};

const returncontacts: ContactInterface[] = [
  {
    id: '123',
    name: 'Bruno',
    linkedinUrl: 'linkedin.com/bruno',
    email: 'Bruno@ludotech.co',
  },
];

export const submitcontactresponsesuccess: SubmitContactResponseSuccess = {
  success: true,
  data: returncontacts,
};
