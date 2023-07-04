import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectContactPagePresentationModel } from '../../store/selectors';
import { contactEmailChanged, contactLinkedInUrlChanged, contactNameChanged, submitForm } from '../../store/actions';
import { ContactInterface, ContactpagePresentationModel, ContactForm, State, AppState } from '../../interfaces/interface';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  isSubmitting$!: Observable<boolean>;
  presentationform$!: Observable<{contactPage: ContactpagePresentationModel}>;
  contacts: ContactInterface[] = [];
  snapsnackbarmessage$!: String;

  name: string = "";
  email: string = "";
  linkedinUrl: string = "";

  ngOnInit(): void {
    //this.isSubmitting$ = this.store.pipe(select(selectIsSubmitting));
    this.presentationform$ = this.store.pipe(select(selectContactPagePresentationModel));
    

    //this.store.select(selectContacts).subscribe((contacts: ContactInterface[]) => {
    //  this.contacts = contacts;
    //});

    this.presentationform$.subscribe(value => {
     console.log(value);
     this.contacts = value.contactPage.contacts;
     this.name = value.contactPage.form.name;
     this.email = value.contactPage.form.email;
     this.linkedinUrl = value.contactPage.form.linkedinUrl;
     this.snapsnackbarmessage$ = value.contactPage.snackbar.message;
     //this.isSubmitting$ = value.contactPage
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const submitFormValue: {form: ContactForm} = {
        form: {
          name: this.name,
          email: this.email,
          linkedinUrl: this.linkedinUrl,
        },
    }
    
    console.log(submitFormValue);

    this.store.dispatch(submitForm(submitFormValue));

    return false;

  }

  onNameChange(event: Event) {
    const name = (event.target as HTMLInputElement).value;
    //console.log(name);
    this.store.dispatch(contactNameChanged({name}));
  }

  onEmailChange(event: Event) {
    const email = (event.target as HTMLInputElement).value;
    //console.log(name);
    this.store.dispatch(contactEmailChanged({email}));
  }

  onLinkedinUrlChange(event: Event) {
    const linkedinUrl = (event.target as HTMLInputElement).value;
    //console.log(name);
    this.store.dispatch(contactLinkedInUrlChanged({linkedinUrl}));
  }

  constructor(private store: Store<AppState>) {}

}
