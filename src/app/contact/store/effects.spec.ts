import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { Actions } from "@ngrx/effects";
import { ScannedActionsSubject } from "@ngrx/store";
import { SubmitEffect } from "./effects";
import { FakeApiService } from "../services/fakeapi.service";
import { submitContactActionSuccess } from "./actions";
import { SubmitContactResponseSuccess } from "../interfaces/submitcontactresponse.interface";


describe('SubmitEffect', () => {
  let effect: SubmitEffect;
  let actions$: Observable<any>;
  let fakeApiService: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubmitEffect,
        provideMockActions(() => actions$),
        {
          provide: FakeApiService,
          useValue: { submitData: jest.fn() } 
        },
        Actions, 
        ScannedActionsSubject
      ]
    });

    effect = TestBed.inject(SubmitEffect);
    actions$ = TestBed.inject(Actions);
    fakeApiService = TestBed.inject(FakeApiService);
  });

  it('should dispatch submitContactActionSuccess when API call succeeds', (done) => {

    const response: SubmitContactResponseSuccess = {
      success: false,
      data: [{
          id: "1",
          name: "test",
          email: "test",
          linkedinUrl: "test",
      }]
  };
  
  jest.spyOn(fakeApiService, 'submitData').mockReturnValue(of(response));

    const expectedActions = submitContactActionSuccess({response: response});

    effect.submit$.subscribe((resultAction) => {
      expect(resultAction).toEqual(expectedActions);
    });

    done();
  });

  // it('should dispatch submitContactActionFailiure when API call fails', (done) => {

  //   const response = { success: false, data: 'Error submitting data' };
  //   jest.spyOn(fakeApiService, 'submitData').mockReturnValue(of(response));

    
  //   const expectedActions = submitContactActionFailiure();

  //   effect.submit$.subscribe((resultAction) => {
      
  //   expect(resultAction).toEqual(expectedActions);

  //   });
  //   done();
  // });
});
