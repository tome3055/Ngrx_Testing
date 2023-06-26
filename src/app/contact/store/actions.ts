import { createAction, props } from "@ngrx/store";
import { SubmitContactRequest } from "../interfaces/submitcontactrequest.interface";
import { ActionTypes } from "./actionTypes";
import { SubmitContactResponseSuccess } from "../interfaces/submitcontactresponse.interface";
import { SubmitContactResponseError } from "../interfaces/submitContactResponseError.interface";

export const submitContactAction = createAction(
  ActionTypes.SUBMIT,
  props<{ request: SubmitContactRequest }>()
  );
export const submitContactActionSuccess = createAction(
  ActionTypes.SUBMIT_SUCCESS,
  props<{ response: SubmitContactResponseSuccess | SubmitContactResponseError }>()
);
export const submitContactActionFailure = createAction(
  ActionTypes.SUBMIT_FAILURE,
  props<{ response: SubmitContactResponseSuccess | SubmitContactResponseError }>()
);