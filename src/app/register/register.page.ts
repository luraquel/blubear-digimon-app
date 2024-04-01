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

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  formularioRegister!: FormGroup;

  tabsRoute = '/tabs';

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
  ) {
    this.formularioRegister = this.fb.group({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmationPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async guardar() {
    var f = this.formularioRegister.value;
    if (this.formularioRegister.get('correo')?.invalid) {
      const alert = await this.alertController.create({
        header: 'Correo invalido',
        message: 'Tienes que escribir un correo valido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    if (this.formularioRegister.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Tienes que llenar todos los datos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    var usuario = {
      nombre: f.nombre,
      correo: f.correo,
      password: f.password,
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
}
