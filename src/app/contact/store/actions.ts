import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { ContactInterface, ContactpagePresentationModel } from '../interfaces/interface';

// export const submitContactAction = createAction(
//   ActionTypes.SUBMIT,
//   props<{ request: SubmitContactRequest }>()
// );
// export const submitContactActionSuccess = createAction(
//   ActionTypes.SUBMIT_SUCCESS,
//   props<{
//     response: SubmitContactResponseSuccess | SubmitContactResponseError;
//   }>()
// );
// export const submitContactActionFailure = createAction(
//   ActionTypes.SUBMIT_FAILURE,
//   props<{
//     response: SubmitContactResponseSuccess | SubmitContactResponseError;
//   }>()
// );
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