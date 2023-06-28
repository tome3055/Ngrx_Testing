import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { Actions, EffectsModule } from "@ngrx/effects";
import { ScannedActionsSubject, StoreModule } from "@ngrx/store";
import { SubmitEffect } from "./effects";
import { FakeApiService } from "../services/fakeapi.service";
import { submitFormSuccess } from "./actions";
import { ContactInterface } from "../interfaces/contact.interface";
import { initialState } from "../model.mock";
import { appReducerBuilder } from "./reducers";


describe('SubmitEffect', () => {
  let effect: SubmitEffect;
  let actions$: Observable<any>;
  let fakeApiService: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[StoreModule.forRoot({ root: appReducerBuilder(initialState) }),EffectsModule.forRoot([SubmitEffect])],
      providers: [
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

  it('should dispatch submitContactActionSuccess when API call succeeds', () => {

    const response: ContactInterface[] = [{id: "123", name: "Bruno", email: "Bruno@ludotech.co", linkedinUrl: "linkedin.com/bruno"}];
  
  jest.spyOn(fakeApiService, 'submitData').mockReturnValue(of(response));

    const expectedAction = submitFormSuccess({
      contacts: [{id: "123", name: "Bruno", email: "Bruno@ludotech.co", linkedinUrl: "linkedin.com/bruno"}]
    });

    let action: any;

    effect.submit$.subscribe((resultAction) => {
      action = resultAction;
    });


    expect(action).toEqual(expectedAction);
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
