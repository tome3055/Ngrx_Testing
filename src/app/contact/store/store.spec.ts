import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { reducers } from "./reducers";
import { FormBuilder } from "@angular/forms";
import { submitContactAction, submitContactActionSuccess, submitContactActionFailure } from "./actions";
import { SubmitContactRequest } from "../interfaces/submitcontactrequest.interface";
import { FormModelInterface } from "../interfaces/form.model.interface";
import { ContactPagePresentationModel } from "../interfaces/contactpage.model.interface";
import { SubmitContactResponseSuccess } from "../interfaces/submitcontactresponse.interface";
import { SubmitContactState } from "../interfaces/submitcontactstate.interface";
import { initialState } from "../model.mock";

describe('store', () => {
    //let component: ContactComponent;
    //let fixture: ComponentFixture<ContactComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot({}),
            StoreModule.forFeature("submit", reducers),
        ],
        providers: [
            FormBuilder,
        ],
        });
        //fixture = TestBed.createComponent(ContactComponent);
        //component = fixture.componentInstance;
        //fixture.detectChanges();
    });

    it('should update isSubmitting to true when submitContactAction is dispatched', () => {
        const contact: FormModelInterface = {
            name: 'Alexander',
            email: 'alexander@ludotech.co',
            linkedinUrl: 'https://www.linkedin.com/in/alexander-ludotech/',
        }
        const fakeSubmitRequest: SubmitContactRequest = {
            form: contact
        }
        
        const action: Action = submitContactAction({request: fakeSubmitRequest});

        const initialContactState: ContactPagePresentationModel = {
            contacts: [],
            form: {
              email: "",
              linkedinUrl: "",
              name: ""
            },
            errors: "",
            isSubmitting: false
          };
        const newState = reducers(initialContactState, action);

        expect(newState.isSubmitting).toBe(true);
    });
      
    it('should update isSubmitting to true when submitContactActionSuccess is dispatched', () => {


        const initialContactState: ContactPagePresentationModel = {
            contacts: [],
            form: {
              email: "",
              linkedinUrl: "",
              name: ""
            },
            errors: "",
            isSubmitting: true,
          };

        const response: SubmitContactResponseSuccess = {
            success: false,
            data: [{
                id: 1,
                name: "test",
                email: "test",
                linkedinUrl: "test",
            }]
        };

        const action: Action = submitContactActionSuccess({response: response});

        const newState = reducers(initialContactState, action);

        expect(newState.isSubmitting).toBe(false);
    });
});