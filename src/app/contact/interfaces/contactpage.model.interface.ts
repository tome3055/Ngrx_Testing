import { ContactInterface } from "./contact.interface";
import { FormModelInterface } from "./form.model.interface";

export interface ContactPagePresentationModel {
    form: FormModelInterface,
    errors: string,
    isSubmitting: boolean,
    contacts: ContactInterface[],
  }