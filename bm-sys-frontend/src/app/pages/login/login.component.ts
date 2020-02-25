import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WebServiceService } from 'src/app/service/web-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private http: WebServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm() {
    return new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  submit() {
    this.http.post('api/v1/users/login', this.loginForm.value).subscribe(data=>{
      console.log(data)
      localStorage.setItem('Authoriztion', data['token'])
      this.router.navigateByUrl('/home');
    })
  }

}
