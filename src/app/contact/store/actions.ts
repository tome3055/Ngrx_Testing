import { createAction, props } from '@ngrx/store';
import { SubmitContactResponseError } from '../interfaces/submitContactResponseError.interface';
import { SubmitContactRequest } from '../interfaces/submitcontactrequest.interface';
import { SubmitContactResponseSuccess } from '../interfaces/submitcontactresponse.interface';
import { ActionTypes } from './actionTypes';
import { ContactpagePresentationModel } from './selectors';
import { ContactInterface } from '../interfaces/contact.interface';

export const submitContactAction = createAction(
  ActionTypes.SUBMIT,
  props<{ request: SubmitContactRequest }>()
);
export const submitContactActionSuccess = createAction(
  ActionTypes.SUBMIT_SUCCESS,
  props<{
    response: SubmitContactResponseSuccess | SubmitContactResponseError;
  }>()
);
export const submitContactActionFailure = createAction(
  ActionTypes.SUBMIT_FAILURE,
  props<{
    response: SubmitContactResponseSuccess | SubmitContactResponseError;
  }>()
);
export const contactNameChanged = createAction(
  ActionTypes.CONTACT_MODIFIED,
  props<{
    name: string;
  }>());
export const submitForm = createAction(
  ActionTypes.CONTACT_SUBMITED,
  props<{
    form: ContactpagePresentationModel;
  }>());
export const submitFormSuccess = createAction(
  ActionTypes.CONTACT_SUBMITED_SUCCESS,
  props<{
    contacts: ContactInterface[];
  }>());