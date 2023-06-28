import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectContactPagePresentationModelForm, selectContacts, selectIsSubmitting, selectSnackbar } from '../../store/selectors';
import { submitForm } from '../../store/actions';
import { ContactInterface, ContactpagePresentationModel, ContactpagePresentationModelForm, State } from '../../interfaces/interface';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  isSubmitting$!: Observable<boolean>;
  presentationform!: Observable<ContactpagePresentationModelForm>;
  contacts!: ContactInterface[];
  snapsnackbarmessage$!: String;

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(selectIsSubmitting));
    this.presentationform = this.store.pipe(select(selectContactPagePresentationModelForm));
    this.store.select(selectSnackbar).subscribe((message: {message: string}) => {
      this.snapsnackbarmessage$ = message.message;
    });

    this.store.select(selectContacts).subscribe((contacts: ContactInterface[]) => {
      this.contacts = contacts;
    });

    this.presentationform.subscribe(value => {
      this.form.patchValue(value);
    });

    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      linkedinUrl: ["", Validators.required]
    });
  }

  onSubmit(): void {

    const submitFormValue: {form: ContactpagePresentationModelForm} = {
        form: this.form.value,
    }
    

    this.store.dispatch(submitForm(submitFormValue));

  }

  constructor(private fb: FormBuilder, private store: Store,private router: Router) {}

}
