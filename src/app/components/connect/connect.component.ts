import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

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
  isSubmitting = false;

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
    if (this.connectForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData = this.connectForm.value;

      emailjs
        .send(
          'service_y3und05',
          'template_9n7t28q',
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            phone: formData.phoneNumber,
            to_name: 'Filip Kufner',
          },
          '9UzArne1mvG0p0kDq'
        )
        .then(
          (response: EmailJSResponseStatus) => {
            this.connectForm.reset();
            this.messageSent = true;
            this.isSubmitting = false;
            setTimeout(() => {
              this.messageSent = false;
            }, 3000);
          },
          (error) => {
            console.error('E-Mail-Versandfehler:', error);
            this.isSubmitting = false;
          }
        );
    } else {
      this.connectForm.markAllAsTouched();
    }
  }
}
