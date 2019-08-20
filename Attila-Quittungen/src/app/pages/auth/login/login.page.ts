import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe(
      data => {
        this.alertService.presentToast('Logged In');
      },
      error => {
        console.log(error);
        // tell user to use valid credentials
        this.alertService.presentToast('Passwort oder Benutzername falsch, du Spasst');
      },
      () => {
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
    form.reset();
  }

}
