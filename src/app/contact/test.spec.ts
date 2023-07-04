import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { formFilledState, initialState } from './model.mock';
import { EffectsModule } from '@ngrx/effects';

import { FakeApiService } from './services/fakeapi.service';
import { contactEmailChanged, contactLinkedInUrlChanged, contactNameChanged, submitForm, submitFormSuccess } from './store/actions';
import { SubmitEffect } from './store/effects';
import { appReducerBuilder } from './store/reducers';
import {
  selectContactPagePresentationModel,
} from './store/selectors';
import { ContactInterface, ContactpagePresentationModel, ContactForm, State, AppState } from './interfaces/interface';

const buildStore = (initialState: State) => {
  TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({ root: appReducerBuilder(initialState) }),
      EffectsModule.forRoot([SubmitEffect]),
      StoreModule.forFeature("contacts", { root: appReducerBuilder(initialState) }),
      EffectsModule.forFeature([SubmitEffect]),
    ],
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

  it('should write Risto@ludotech.co into the email field when user is typing Risto@ludotech.co', () => {
    const testbed = buildStore(initialState);
    store = testbed.store;
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(contactEmailChanged({ email: 'Risto@ludotech.co' }));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      presentationModel = result.contactPage;
    }); 
    expect(presentationModel!.form.email).toEqual('Risto@ludotech.co');
  });

  it('should write linkedin.com/risto into the linkedinUrl field when user is typing linkedin.com/risto', () => {
    const testbed = buildStore(initialState);
    store = testbed.store;
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(contactLinkedInUrlChanged({ linkedinUrl: 'linkedin.com/risto' }));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      //console.log(result);
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.form.linkedinUrl).toEqual('linkedin.com/risto');
  });

  it('should show a successful message when the contact Bruno is created', () => {
    store = buildStore(initialState).store;
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(submitForm({form: formFilledState.form}));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      //console.log(result);
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.snackbar.message).toEqual('Contact Bruno Submitted');
  });

  it('should show a new contact in the contact list when pressing submit', (done) => {
    const testbed = buildStore(formFilledState);
    store = testbed.store;
    const form: ContactForm = {
        name: "Bruno",
        linkedinUrl: "linkedin.com/bruno",
        email: "Bruno@ludotech.co",
    };
  
    store.dispatch(submitForm({ form: form }));
  
    let contact: ContactInterface[];
    store.select(selectContactPagePresentationModel).subscribe((result) => {
      contact = result.contactPage.contacts
  
      if (contact.length >= 1) { //wait for the api call to finish
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