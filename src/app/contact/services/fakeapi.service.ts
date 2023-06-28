import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactInterface, ContactpagePresentationModelForm } from "../interfaces/interface";

@Injectable()
export class FakeApiService {
  submitData(formData: ContactpagePresentationModelForm, success: boolean): Observable<ContactInterface[]> {
    return new Observable<ContactInterface[]>((observer) => {
      setTimeout(() => {
        if (success) {
          const contacts: ContactInterface[] = [
            {
              id: '1',
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
      }, 1000);
    });
  }
}
