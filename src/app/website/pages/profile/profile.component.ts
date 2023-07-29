import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user : User | null = null; 

  constructor(
    private authService: AuthService
  ){
    this.authService.getProfile()
    .subscribe(profile =>{
      this.user = profile;
    })
  }


}
