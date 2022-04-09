import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  warning: string = "";
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if(this.user.userName == ""){
      this.loading = false;
      this.warning = "User name is required";
    }else if(this.user.password == ""){
      this.loading = false;
      this.warning = "Password must not be empty";
    }else{
      this.loading = true;
      this.auth.login(this.user).subscribe((data)=> {
        this.loading = false;
        localStorage.setItem("access_token", data.token);
        this.router.navigate(['/newReleases']);
      }, err => {
        this.loading = false;
        this.warning = err.error.message;
      });
    }
  }

}
