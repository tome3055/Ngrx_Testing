import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { ContactInterface, ContactpagePresentationModelForm } from '../interfaces/interface';

export const contactNameChanged = createAction(
  ActionTypes.CONTACT_MODIFIED,
  props<{
    name: string;
  }>());
export const submitForm = createAction(
  ActionTypes.CONTACT_SUBMITED,
  props<{
    form: ContactpagePresentationModelForm;
  }>());
export const submitFormSuccess = createAction(
  ActionTypes.CONTACT_SUBMITED_SUCCESS,
  props<{
    contacts: ContactInterface[];
  }>());