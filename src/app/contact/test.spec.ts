import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule, select } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, first, of } from 'rxjs';
import { SubmitEffect } from './store/effects';
import { FakeApiService } from './services/fakeapi.service';
import { submitContactAction, submitContactActionFailure, submitContactActionSuccess } from './store/actions';
import { ContactPagePresentationModel } from './interfaces/contactpage.model.interface';
import { reducers } from './store/reducers';
import { afterFormSubmitState, initialState, initialStateaftersubmit, submitcontactrequest, submitcontactresponsesuccess } from './model.mock';
import { mockModelSelector, modelSelector } from './store/selectors';

describe('SubmitEffect', () => {
  let store: MockStore;

  let actions$: Observable<Action>;
  let effect: SubmitEffect;
  let fakeApiService: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot({}),
            StoreModule.forFeature("submit", reducers),
        ],
      providers: [
        SubmitEffect,
        FakeApiService,
        provideMockActions(() => actions$),
        provideMockStore({initialState: initialState}),
      ]
    });

    effect = TestBed.inject(SubmitEffect);
    fakeApiService = TestBed.inject(FakeApiService);
    store = TestBed.inject(MockStore);
    //store.resetSelectors();
  });

  it('should simulate the flow of the state on submit without the store', (done) => {
    

    let resultstate: ContactPagePresentationModel;
    store.select(modelSelector).subscribe((result) => {
        if(result !== undefined){
            done();
        }
        resultstate = result;
        console.log(result);
    });

    store.dispatch(submitContactAction({request: submitcontactrequest}));

    //expect(resultstate!).toEqual(initialStateaftersubmit);
  });
  
});
