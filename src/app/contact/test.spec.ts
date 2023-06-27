import { TestBed } from '@angular/core/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './interfaces/contactpage.model.interface';
import { formFilledState, initialState } from './model.mock';
import { FakeApiService } from './services/fakeapi.service';
import { contactNameChanged, submitForm } from './store/actions';
import { SubmitEffect } from './store/effects';
import { AppState, appReducerBuilder } from './store/reducers';
import {
  ContactpagePresentationModel,
  selectContactPagePresentationModel,
  selectContactsFromAppState,
} from './store/selectors';
import { ContactInterface } from './interfaces/contact.interface';
import { EffectsModule } from '@ngrx/effects';

const buildStore = (initialState: State) => {
  TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({ root: appReducerBuilder(initialState) }), EffectsModule.forRoot([SubmitEffect])],
    providers: [FakeApiService],
  });

  return TestBed.inject(Store) as Store<AppState>;
};

describe('SubmitEffect', () => {
  let store: Store<AppState>;

  // beforeEach(() => {
  // });

  it('should write Risto into the name field when user is typing Risto', () => {
    store = buildStore(initialState);
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(contactNameChanged({ name: 'Risto' }));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      //console.log(result)
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.name).toEqual('Risto');
  });

  xit('should show a successful message when the contact Bruno is created', () => {
    store = buildStore(formFilledState);
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(submitForm({form: formFilledState.form}));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.snackbar.message).toEqual('Contact Bruno submitted');
  });

  it('should show a new contact in the contact list', () => {
    store = buildStore(formFilledState);
    let contactModel: ContactInterface;
    let presentationModel: ContactpagePresentationModel;

    store.dispatch(submitForm({form: formFilledState.form}));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      presentationModel = result.contactPage;
    });

    expect(presentationModel!.snackbar.message).toEqual('Contact Bruno submitted');

    store.select(selectContactsFromAppState).subscribe((result) => {
      contactModel = result.contacts;
      console.log(result);
    });


    expect(contactModel!).toEqual({id: "123", name: "Bruno", email: "Bruno@ludotech.co", linkedinUrl: "linkedin.com/bruno"});
  });
});