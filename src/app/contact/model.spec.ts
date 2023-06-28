import { Observable, of } from "rxjs";
import { Actions } from "@ngrx/effects";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { SubmitEffect } from "./store/effects";
import { FakeApiService } from "./services/fakeapi.service";
import { ContactInterface } from "./interfaces/contact.interface";
import { submitForm, submitFormSuccess } from "./store/actions";
import { ContactpagePresentationModel } from "./store/selectors";

describe("SubmitEffect", () => {
  let submitEffect: SubmitEffect;
  let actions$: Observable<any>;
  let fakeApiService: jest.Mocked<FakeApiService>;

  beforeEach(() => {
    const fakeApiServiceMock: jest.Mocked<FakeApiService> = {
      submitData: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        SubmitEffect,
        provideMockActions(() => actions$),
        { provide: FakeApiService, useValue: fakeApiServiceMock },
      ],
    });

    submitEffect = TestBed.inject(SubmitEffect);
    actions$ = TestBed.inject(Actions);
    fakeApiService = TestBed.inject(FakeApiService) as jest.Mocked<FakeApiService>;
  });

  it("should dispatch submitFormSuccess action on successful form submission", (done) => {
    const form: ContactpagePresentationModel = {
      name: "Test",
      linkedinUrl: "test",
      email: "test",
      snackbar: {
        message: ""
      }
    }; // Mock form data
    const contacts: ContactInterface[] = [{
      id: "123",
      name: "tome",
      email: "test",
      linkedinUrl: "test"
    }]; // Mock response data

    actions$ = of(submitForm({ form }));

    fakeApiService.submitData.mockReturnValue(of(contacts));

    submitEffect.submit$.subscribe((action: any) => {
      expect(action).toEqual(submitFormSuccess({ contacts }));
      expect(fakeApiService.submitData).toHaveBeenCalledWith(form, true);
      console.log(action);
      if(action!== undefined)
      {
        done();
      }
    });
  });
});
