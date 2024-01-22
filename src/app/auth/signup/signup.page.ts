import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthRequest } from 'src/app/security/auth-request.model';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage {


  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   *
   * NOTE: The "Partial<AuthRequest>" type here has the same properties as "AuthRequest",
   * but they are all optional.
   */
  authRequest: Partial<AuthRequest> = {};

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError = false;
  lastname: any;
  firstname: any;

  constructor(private auth: AuthService, private router: Router) {
    this.authRequest = {};
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    // NOTE: Since our form is valid, it means that "this.authRequest" is actually
    // a perfectly valid "AuthRequest" object, and that's what we are telling TypeScript
    // here with "as AuthRequest".
    this.auth.logIn$(this.authRequest as AuthRequest).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => {
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      },
    });
  }

}



