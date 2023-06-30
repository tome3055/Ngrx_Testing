import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectContactPagePresentationModelForm, selectContacts, selectIsSubmitting, selectSnackbar } from '../../store/selectors';
import { contactEmailChanged, contactLinkedInUrlChanged, contactNameChanged, submitForm } from '../../store/actions';
import { ContactInterface, ContactpagePresentationModel, ContactpagePresentationModelForm, State } from '../../interfaces/interface';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  isSubmitting$!: Observable<boolean>;
  presentationform$!: Observable<ContactpagePresentationModelForm>;
  contacts!: ContactInterface[];
  snapsnackbarmessage$!: String;

  name: string = "";
  email: string = "";
  linkedinUrl: string = "";

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(selectIsSubmitting));
    this.presentationform$ = this.store.pipe(select(selectContactPagePresentationModelForm));

    
    //this.store.select(selectContactPagePresentationModelForm);

    

    this.store.select(selectSnackbar).subscribe((message: {message: string}) => {
      this.snapsnackbarmessage$ = message.message;
    });

    this.store.select(selectContacts).subscribe((contacts: ContactInterface[]) => {
      this.contacts = contacts;
    });

    //this.form = this.fb.group({
    //  name: ["", Validators.required],
    //  email: ["", Validators.required],
    //  linkedinUrl: ["", Validators.required]
    //});

    this.presentationform$.subscribe(value => {
     //this.form.patchValue(value);
     this.name = value.name;
     this.email = value.email;
     this.linkedinUrl = value.linkedinUrl;

     console.log(value);
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const submitFormValue: {form: ContactpagePresentationModelForm} = {
        form: {
          name: this.name,
          email: this.email,
          linkedinUrl: this.linkedinUrl,
        },
    }
    

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

  constructor(private fb: FormBuilder, private store: Store,private router: Router) {}

}
