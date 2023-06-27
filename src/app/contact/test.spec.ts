import { TestBed } from '@angular/core/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './interfaces/contactpage.model.interface';
import { formFilledState, initialState } from './model.mock';
import { FakeApiService } from './services/fakeapi.service';
import { contactNameChanged } from './store/actions';
import { SubmitEffect } from './store/effects';
import { AppState, appReducerBuilder } from './store/reducers';
import {
  ContactpagePresentationModel,
  selectContactPagePresentationModel,
} from './store/selectors';

const buildStore = (initialState: State) => {
  TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({ root: appReducerBuilder(initialState) })],
    providers: [],
  });

  return TestBed.inject(Store) as Store<AppState>;
};

describe('SubmitEffect', () => {
  let store: Store<AppState>;

  let actions$: Observable<Action>;
  let effect: SubmitEffect;
  let fakeApiService: FakeApiService;

  beforeEach(() => {
    store = buildStore(initialState);
  });

  it('should write Risto into the name field when user is typing Risto', () => {
    let presentationModel: ContactpagePresentationModel;
    store.dispatch(contactNameChanged({ name: 'Risto' }));

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.form.name).toEqual('Risto');
  });

  it('should show a successful message when the contact Risto is created', () => {
    let presentationModel: ContactpagePresentationModel;
    store = buildStore(formFilledState);
    store.dispatch(submitForm());

    store.select(selectContactPagePresentationModel).subscribe((result) => {
      presentationModel = result.contactPage;
    });
    expect(presentationModel!.snackbar.message).toEqual('Contact Risto created');
