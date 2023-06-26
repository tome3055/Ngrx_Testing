import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule, Store, MemoizedSelector  } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { SubmitEffect } from './store/effects';
import { FakeApiService } from './services/fakeapi.service';
import { submitContactAction, submitContactActionFailure, submitContactActionSuccess } from './store/actions';
import { ContactPagePresentationModel } from './interfaces/contactpage.model.interface';
import { reducers } from './store/reducers';
import { afterFormSubmitState, initialState, initialStateaftersubmit, submitcontactrequest, submitcontactresponsesuccess } from './model.mock';
import { modelSelector } from './store/selectors';

describe('SubmitEffect', () => {
    let store: MockStore;
    //let mockFeatureSelector: MemoizedSelector<ContactPagePresentationModel, ContactPagePresentationModel>;

  let actions$: Observable<Action>;
  let effect: SubmitEffect;
  let fakeApiService: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot({}),
        ],
      providers: [
        SubmitEffect,
        FakeApiService,
        provideMockActions(() => actions$),
        provideMockStore(),
      ]
    });

    effect = TestBed.inject(SubmitEffect);
    fakeApiService = TestBed.inject(FakeApiService);
    store = TestBed.inject(MockStore);
    // mockFeatureSelector = store.overrideSelector(
    //   submitFeatureSelector,
    //   initialState
    // );
  });

  it('should simulate the flow of the state without the store', (done) => {
    
    jest.spyOn(fakeApiService, 'submitData').mockReturnValue(of(submitcontactresponsesuccess));

    //on submit flow

    const submitAction = submitContactAction({ request: submitcontactrequest }); // submit clicked

    const submitResult = reducers(initialState, submitAction); 

    expect(submitResult).toEqual(initialStateaftersubmit); // isSubmitting : true

    const expectedAction = submitContactActionSuccess({ response: submitcontactresponsesuccess });

    actions$ = of(submitAction);

    effect.submit$.subscribe((resultAction) => { //simulating how action triggers the effect
      expect(resultAction).toEqual(expectedAction); //returns the action that needs to execute in the effect
      expect(fakeApiService.submitData).toHaveBeenCalledWith(submitcontactrequest, true);
      done();
    });

    actions$ = of(expectedAction)

    const successAction = submitContactActionSuccess({ response: submitcontactresponsesuccess });//effect triggers the submitContactActionSuccess

    const resultState = reducers(initialState, successAction);//reducer changes the state because of the success action

    expect(resultState).toEqual(afterFormSubmitState);
  });

  it('should simulate the flow of the state like it should be in the real store', (done) => {
    
    jest.spyOn(fakeApiService, 'submitData').mockReturnValue(of(submitcontactresponsesuccess));

    //on submit flow

    const submitAction = submitContactAction({ request: submitcontactrequest }); // submit clicked

    const submitResult = reducers(initialState, submitAction); 

    expect(submitResult).toEqual(initialStateaftersubmit);

    let state: ContactPagePresentationModel;
    store.overrideSelector(modelSelector, submitResult);

    store.select(modelSelector).subscribe((value) => {
      state = value;
    });

    expect(state!).toEqual(initialStateaftersubmit); // isSubmitting : true

    const expectedAction = submitContactActionSuccess({ response: submitcontactresponsesuccess });

    actions$ = of(submitAction);

    effect.submit$.subscribe((resultAction) => { //simulating how action triggers the effect
      expect(resultAction).toEqual(expectedAction); //returns the action that needs to execute in the effect
      expect(fakeApiService.submitData).toHaveBeenCalledWith(submitcontactrequest, true);
      done();
    });

    actions$ = of(expectedAction);

    const successAction = submitContactActionSuccess({ response: submitcontactresponsesuccess });//effect triggers the submitContactActionSuccess

    const resultState = reducers(initialState, successAction);//reducer changes the state because of the success action

    let stateaftersuccess: ContactPagePresentationModel;
    store.overrideSelector(modelSelector, resultState);

    store.select(modelSelector).subscribe((value) => {
      stateaftersuccess = value;
    });

    expect(stateaftersuccess!).toEqual(afterFormSubmitState);
  });
});
