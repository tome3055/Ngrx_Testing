import { ContactpagePresentationModel } from '../store/selectors';
import { ContactInterface } from './contact.interface';
import { FormModelInterface } from './form.model.interface';

export interface State {
  form: ContactpagePresentationModel;
  errors: string;
  isSubmitting: boolean;
  contacts: ContactInterface[];
}
