import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { keyOutline, personOutline } from 'ionicons/icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  tabsRoute = '/tabs';

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
  ) {
    this.formularioLogin = this.fb.group({
      // nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    addIcons({ personOutline, keyOutline });
  }
  async ingresar() {
    var f = this.formularioLogin.value;
    const userStorage = localStorage.getItem('usuario');

    if (userStorage) {
      var usuario = JSON.parse(userStorage);

      if (usuario.correo == f.correo && usuario.password == f.password) {
        console.log('Ingresado');
      } else {
        const alert = await this.alertController.create({
          header: 'Datos inválidos',
          message: 'Ingresar usuario registrado',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    }
  }
}
