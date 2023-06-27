import { ContactInterface } from './contact.interface';
import { FormModelInterface } from './form.model.interface';

export interface State {
  form: FormModelInterface;
  errors: string;
  isSubmitting: boolean;
  contacts: ContactInterface[];
}
