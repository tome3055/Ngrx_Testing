import { Observable } from "rxjs";
import { ContactInterface } from "../interfaces/contact.interface";
import { ContactpagePresentationModel } from "../store/selectors";
import { Injectable } from "@angular/core";

@Injectable()
export class FakeApiService {
    submitData(data: ContactpagePresentationModel, success: boolean): Observable<ContactInterface[]> {
      return new Observable((observer) => {
        console.log("inside fakeapi observable");
        setTimeout(() => {
          const returncontact: ContactInterface[] = 
            [{
              id: "123",
              name: data.name,
              linkedinUrl: data.linkedinUrl,
              email: data.email,
            }];
          console.log(returncontact);
          //const responsefailure: SubmitContactResponseError = { success: false, data: 'Error submitting data'};
          if (success)
          {
            console.log(returncontact);
            observer.next(returncontact);
          }
          observer.complete();
        }, 1000);
      });
    }
  }