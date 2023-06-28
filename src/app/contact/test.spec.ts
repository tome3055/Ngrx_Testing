import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { formFilledState, initialState } from './model.mock';
import { EffectsModule } from '@ngrx/effects';

import { FakeApiService } from './services/fakeapi.service';
import { contactNameChanged, submitForm, submitFormSuccess } from './store/actions';
import { SubmitEffect } from './store/effects';
import { AppState, appReducerBuilder } from './store/reducers';
import {
  selectContactPagePresentationModel,
  selectContactsFromAppState,
} from './store/selectors';
import { ContactInterface, ContactpagePresentationModel, ContactpagePresentationModelForm, State } from './interfaces/interface';

const buildStore = (initialState: State) => {
  TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({ root: appReducerBuilder(initialState) }), EffectsModule.forRoot([SubmitEffect])],
    providers: [FakeApiService],
  });

  return {store: TestBed.inject(Store) as Store<AppState>, effect: TestBed.inject(SubmitEffect)};
};

describe('Contact Page Test', () => {
  let store: Store<AppState>;

  // beforeEach(() => {
  // });

  it('should write Risto into the name field when user is typing Risto', () => {
    const testbed = buildStore(initialState);
    store = testbed.store;
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(contactNameChanged({ name: 'Risto' }));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.form.name).toEqual('Risto');
  });

  it('should show a successful message when the contact Bruno is created', () => {
    store = buildStore(formFilledState).store;
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(submitForm({form: formFilledState.form.form}));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      //console.log(result);
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.snackbar.message).toEqual('Contact Bruno Submitted');
  });

  it('should show a new contact in the contact list', () => {
    const testbed = buildStore(initialState);
    store = testbed.store;
    let contactModel: ContactInterface[];
    const contact: ContactInterface = {
        id: "1", 
        name: "Bruno", 
        email: "Bruno@ludotech.co", 
        linkedinUrl: "linkedin.com/bruno",
    }

    store.dispatch(submitFormSuccess({contacts: [contact]}));

     store.select(selectContactsFromAppState).subscribe((result) => {
       contactModel = result.contacts;
     });


    expect(contactModel!).toEqual([{id: "1", name: "Bruno", email: "Bruno@ludotech.co", linkedinUrl: "linkedin.com/bruno"}]);
  });

  it('should show a new contact in the contact list when on submit', (done) => {
    const testbed = buildStore(initialState);
    store = testbed.store;
    const form: ContactpagePresentationModelForm = {
        name: "Bruno",
        linkedinUrl: "linkedin.com/bruno",
        email: "Bruno@ludotech.co",
    };
  
    store.dispatch(submitForm({ form: form }));
  
    let contact: ContactInterface[];
    store.select(selectContactsFromAppState).subscribe((result) => {
      contact = result.contacts;
  
      if (contact.length >= 1) {
        expect(contact!).toEqual([{ id: "1", name: "Bruno", email: "Bruno@ludotech.co", linkedinUrl: "linkedin.com/bruno" }]);
        //done(); 
      }
    });

    store.select(selectContactPagePresentationModel).subscribe((result) => {
        if(contact.length >= 1){
          expect(result.contactPage.snackbar.message).toEqual('Contact Bruno Created');
          done();
        }
    });
    
  });
});