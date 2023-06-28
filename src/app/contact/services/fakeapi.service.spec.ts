import { TestBed } from "@angular/core/testing";
import { FakeApiService } from "./fakeapi.service";
import { ContactInterface, ContactpagePresentationModel, ContactpagePresentationModelForm } from "../interfaces/interface";

describe("FakeApiService", () => {
  let service: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeApiService],
    });
    service = TestBed.inject(FakeApiService);
  });

  it("should return contacts when submitData is called with success flag set to true", (done) => {

    const submitdata: ContactpagePresentationModelForm = {
        name: "John Doe",
        linkedinUrl: "",
        email: "john@example.com",
    }
    const expectedcontacts: ContactInterface[] = [
      { id: "1", name: "John Doe", email: "john@example.com", linkedinUrl: "" },
    ]

    service.submitData(submitdata, true).subscribe((contacts) => {
      if(contacts.length >= 1) {
        expect(contacts).toEqual(expectedcontacts);
        done();
      }
    });
  });
});
