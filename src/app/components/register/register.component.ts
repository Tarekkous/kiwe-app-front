import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  user = new User();
  userRegister!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private Route: Router,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userRegister = this._fb.group({
      username: ['', Validators.required],
      firstName: [this.user.user_firstname, Validators.required],
      lastName: [this.user.user_lastname, Validators.required],
      email: [this.user.user_mail, [Validators.email, Validators.required]],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        this.user.user_mdp,
        [Validators.required, Validators.minLength(8)],
      ],
      confirmPassword: [
        this.user.user_mdp,
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }
  onSubmit() {
    const firstname = this.userRegister.get('firstName')?.value;
    const lastname = this.userRegister.get('lastName')?.value;
    const email = this.userRegister.get('email')?.value;
    const password = this.userRegister.get('password')?.value;
    const registerInfo = {
      user_firstname: firstname,
      user_lastname: lastname,
      user_mail: email,
      user_mdp: password,
    };
    this._userService.postRegister(registerInfo).subscribe((response: any) => {
      try {
        console.log(response);
        this._snackBar.open('Registration Done Successfully', 'ok',{verticalPosition:'top'});
        this.Route.navigate(['login']);
      } catch (error) {
        console.log(error);
      }
    });

  }
  clickToLogin() {
    this.Route.navigate(['login']);
  }
}
