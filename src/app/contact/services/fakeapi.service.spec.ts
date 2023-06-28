import { TestBed } from "@angular/core/testing";
import { FakeApiService } from "./fakeapi.service";
import { ContactInterface } from "../interfaces/contact.interface";
import { ContactpagePresentationModel } from "../store/selectors";

describe("FakeApiService", () => {
  let service: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeApiService],
    });
    service = TestBed.inject(FakeApiService);
  });

  it("should return contacts when submitData is called with success flag set to true", (done) => {

    const submitdata: ContactpagePresentationModel = {
      name: "John Doe",
      linkedinUrl: "",
      email: "",
      snackbar: {
        message: ""
      }
    }
    const expectedcontacts: ContactInterface[] = [
      { id: "1", name: "John Doe", email: "john@example.com", linkedinUrl: "" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", linkedinUrl: "" },
    ]
    const success = true;

    service.submitData(submitdata, success).subscribe((contacts) => {
      expect(contacts).toEqual(expectedcontacts);
      done();
    });
  });
});
