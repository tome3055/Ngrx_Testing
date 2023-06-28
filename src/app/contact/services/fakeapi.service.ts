import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ContactInterface } from "../interfaces/contact.interface";
import { ContactpagePresentationModel } from "../store/selectors";

@Injectable()
export class FakeApiService {
  submitData(formData: ContactpagePresentationModel, success: boolean): Observable<ContactInterface[]> {
    return new Observable<ContactInterface[]>((observer) => {
      setTimeout(() => {
        if (success) {
          const contacts: ContactInterface[] = [
            {
              id: "123",
              name: formData.name,
              email: formData.email,
              linkedinUrl: formData.linkedinUrl,
            }
          ];
          observer.next(contacts);
          observer.complete();
        } else {
          observer.error("API request failed");
        }
      }, 100);
    });
  }
}
