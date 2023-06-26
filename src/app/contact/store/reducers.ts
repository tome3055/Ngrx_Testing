import { Action, createReducer, on } from "@ngrx/store";

import { submitContactAction, submitContactActionFailure, submitContactActionSuccess } from "./actions";
import { ContactPagePresentationModel } from "../interfaces/contactpage.model.interface";
import { initialState } from "../model.mock";

  const submitReducer = createReducer(
    initialState,
    on(submitContactAction,
    (state): ContactPagePresentationModel => ({
    ...state,
    isSubmitting: true
    })),
    on(submitContactActionSuccess,
      (state, action): ContactPagePresentationModel => ({
      ...state,
      isSubmitting: false,
      contacts: [...state.contacts, ...action.response.data],
      })),
    on(submitContactActionFailure,
      (state, action): ContactPagePresentationModel => ({
      ...state,
      isSubmitting: false,
      errors: action.response.data,
      })),
    );

export function reducers(state: ContactPagePresentationModel, action: Action)
{
  //console.log(state, action);
  return submitReducer(state, action);
}