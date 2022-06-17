import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationStateService } from '../../service/authentication-state.service';
import { JwtService } from '../../service/jwt.service';
import { TokenAuthService } from '../../service/token-auth.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  err = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public jwtService: JwtService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,
  ) {
    this.signinForm = this.fb.group({
      email: [],
      password: []
    })
  }

  ngOnInit() { }

  onSubmit() {
      
      this.jwtService.logIn(this.signinForm.value).subscribe(
        res => {
          this.tokenStorage(res);
        },
        error => {
          this.err = error.error;
        },() => {
          this.authenticationStateService.setAuthState(true);
          this.signinForm.reset()
          this.router.navigate(['/home/dashboard']);
        }
      );
  }

  tokenStorage(jwt){
    this.tokenAuthService.setTokenStorage(jwt.access_token);
  }

}
