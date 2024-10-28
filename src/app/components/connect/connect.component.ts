import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss',
})
export class ConnectComponent {
  connectForm: FormGroup;
  messageSent = false;

  constructor(private fb: FormBuilder) {
    this.connectForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      message: ['', Validators.required],
    });
  }

  get name() {
    return this.connectForm.get('name');
  }

  get email() {
    return this.connectForm.get('email');
  }

  get phoneNumber() {
    return this.connectForm.get('phoneNumber');
  }

  get message() {
    return this.connectForm.get('message');
  }

  onSubmit() {
    if (this.connectForm.valid) {
      const templateParams = {
        name: this.connectForm.value.name,
        email: this.connectForm.value.email,
        phoneNumber: this.connectForm.value.phoneNumber,
        message: this.connectForm.value.message,
      };

      emailjs
        .send(
          'service_cznojch',
          'template_cq7mbtg',
          templateParams,
          '1b7VWa2XIImE8F2Fs'
        )
        .then(
          (response: EmailJSResponseStatus) => {
            console.log(
              'E-Mail erfolgreich gesendet!',
              response.status,
              response.text
            );
            this.connectForm.reset();
            this.messageSent = true;
            setTimeout(() => {
              this.messageSent = false;
            }, 3000);
          },
          (error) => {
            console.error('E-Mail-Versandfehler:', error);
          }
        );
    } else {
      this.connectForm.markAllAsTouched();
    }
  }
}
