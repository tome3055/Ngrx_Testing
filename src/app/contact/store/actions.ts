import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { ContactInterface, ContactForm } from '../interfaces/interface';

export const contactNameChanged = createAction(
  ActionTypes.CONTACT_NAME_CHANGED,
  props<{
    name: string;
  }>());
  export const contactEmailChanged = createAction(
  ActionTypes.CONTACT_EMAIL_CHANGED,
  props<{
    email: string;
  }>());
export const contactLinkedInUrlChanged = createAction(
  ActionTypes.CONTACT_LINKEDINURL_CHANGED,
  props<{
    linkedinUrl: string;
  }>());
export const submitForm = createAction(
  ActionTypes.CONTACT_SUBMITED,
  props<{
    form: ContactForm;
  }>());
export const submitFormSuccess = createAction(
  ActionTypes.CONTACT_SUBMITED_SUCCESS,
  props<{
    contacts: ContactInterface[];
  }>());