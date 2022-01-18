import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserQueries } from '../../services/user.queries';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private userQueries : UserQueries
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      alert('Les mots de passe sont différents')
      return;
    }
    
    
    // TODO Enregistrer l'utilisateur via le UserService
    const promise = Promise.resolve(this.userQueries.exists(this.model.username))
    promise.then((value) =>{
        alert(value)
        if(value){
          this.userService.register(this.model.username,this.model.password)
          this.goToLogin();
        }
        return ;   
      });
      
  }

  goToLogin() {
    this.router.navigate(['/splash/login'])
  }
}
