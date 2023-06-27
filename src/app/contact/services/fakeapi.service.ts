import { Observable } from "rxjs";
import { ContactInterface } from "../interfaces/contact.interface";
import { SubmitContactRequest } from "../interfaces/submitcontactrequest.interface";
import { SubmitContactResponseSuccess } from "../interfaces/submitcontactresponse.interface";
import { SubmitContactResponseError } from "../interfaces/submitContactResponseError.interface";

export class FakeApiService {
    submitData(data: SubmitContactRequest, success: boolean): Observable<SubmitContactResponseSuccess | SubmitContactResponseError> {
      
      return new Observable((observer) => {
        setTimeout(() => {
          
          const returncontacts: ContactInterface[] = [
            {
              id: "123",
              name: data.form.name,
              linkedinUrl: data.form.linkedinUrl,
              email: data.form.email
            }
          ];
          const responsesuccess: SubmitContactResponseSuccess = { success: true, data: returncontacts };
          const responsefailure: SubmitContactResponseError = { success: false, data: 'Error submitting data'};
          if (success)
          {
            observer.next(responsesuccess);
          }
          else
          {
            observer.next(responsefailure);
          }
          observer.complete();
        }, 1000);
      });
    }

    changeData(data: SubmitContactRequest, success: boolean): Observable<SubmitContactResponseSuccess | SubmitContactResponseError> {
      
      return new Observable((observer) => {
        setTimeout(() => {
          
          const returncontacts: ContactInterface[] = [
            {
              id: "123",
              name: data.form.name,
              linkedinUrl: data.form.linkedinUrl,
              email: data.form.email
            }
          ];
          const responsesuccess: SubmitContactResponseSuccess = { success: true, data: returncontacts };
          const responsefailure: SubmitContactResponseError = { success: false, data: 'Error submitting data'};
          if (success)
          {
            observer.next(responsesuccess);
          }
          else
          {
            observer.next(responsefailure);
          }
          observer.complete();
        }, 1000);
      });
    }
  }