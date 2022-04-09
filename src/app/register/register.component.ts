import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = new RegisterUser();
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if(this.registerUser.userName == ""){
      this.success = false;
      this.loading = false;
      this.warning = "User name is required";
    }else if(this.registerUser.password == "" || this.registerUser.password2 == ""){
      this.success = false;
      this.loading = false;
      this.warning = "Password must not be empty";
    }else if(this.registerUser.password != this.registerUser.password2){
      this.success = false;
      this.loading = false;
      this.warning = "Password is not matched";
    }else{
      this.loading = true;
      this.auth.register(this.registerUser).subscribe((data) => {
        console.log(data);
        this.success = true;
        this.loading = false;
        this.warning = "";
      }, (err) => {
        console.log(err);
        this.success = false;
        this.loading = false;
        this.warning = err.error.message;
      });
    }
  }

}
