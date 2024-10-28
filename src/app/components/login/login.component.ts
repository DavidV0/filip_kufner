import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h2>Admin Access</h2>
      <button (click)="signInWithGoogle()" class="login-btn">
        Sign in with Google
      </button>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: black;
      color: white;
    }

    .login-btn {
      padding: 12px 24px;
      background: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.2s;

      &:hover {
        background: #357abd;
      }
    }
  `]
})
export class LoginComponent {
  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      
      // Only allow specific email(s) to login
      const allowedEmails = ['davidveli2000@hotmail.com']; // Replace with the videographer's email
      
      if (result.user && allowedEmails.includes(result.user.email!)) {
        this.router.navigate(['/admin']);
      } else {
        await this.auth.signOut();
        alert('Unauthorized access');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }
} 