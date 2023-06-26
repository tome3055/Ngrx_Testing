import { Component, Injectable } from "@angular/core";
import { ContactInterface } from "./interfaces/contact.interface";
import { ContactPagePresentationModel } from "./interfaces/contactpage.model.interface";
import { Store } from "@ngrx/store";
import { submitContactAction } from "./store/actions";
import { SubmitContactRequest } from "./interfaces/submitcontactrequest.interface";
import { SubmitContactResponseSuccess } from "./interfaces/submitcontactresponse.interface";

export const initialState: ContactPagePresentationModel = {
    form: {
        name: "",
        linkedinUrl: "",
        email: "",
    },
    errors: "",
    isSubmitting: false,
    contacts: []
}

export const initialStateaftersubmit: ContactPagePresentationModel = {
    form: {
        name: "",
        linkedinUrl: "",
        email: "",
    },
    errors: "",
    isSubmitting: true,
    contacts: []
}

export const beforeFormSubmitState: ContactPagePresentationModel = {
    form: {
        name: "Bruno",
        linkedinUrl: "linkedin.com/bruno",
        email: "Bruno@ludotech.co",
    },
    errors: "",
    isSubmitting: false,
    contacts: []
}

export const afterFormSubmitState: ContactPagePresentationModel = {
    form: {
        name: "",
        linkedinUrl: "",
        email: "",
    },
    errors: "",
    isSubmitting: false,
    contacts: [
        {
            id: "123",
            name: "Bruno",
            email: "Bruno@ludotech.co",
            linkedinUrl: "linkedin.com/bruno"
        }
    ]
}

export const submitcontactrequest: SubmitContactRequest = {
    form: {
      name: "Bruno",
      linkedinUrl: "linkedin.com/bruno",
      email: "Bruno@ludotech.co",
    }
  }


const returncontacts: ContactInterface[] = [
  {
    id: "123",
    name: "Bruno",
    linkedinUrl: "linkedin.com/bruno",
    email: "Bruno@ludotech.co"
  }
]

export const submitcontactresponsesuccess: SubmitContactResponseSuccess = {
    success: true,
    data: returncontacts,
}
