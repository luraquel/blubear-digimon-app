import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { IRegisterForm } from 'src/core/interfaces/register-form.interface';
import { AuthenticationService } from '../services/authentication.service';

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
  registerForm: FormGroup;

  isLoading = false;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  async register() {
    var formValue = this.registerForm.value as IRegisterForm;
    if (this.registerForm.get('correo')?.invalid) {
      const alert = await this.alertController.create({
        header: 'Correo invalido',
        message: 'Tienes que escribir un correo valido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    if (this.registerForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Tienes que llenar todos los datos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    try {
      this.isLoading = true;

      await this.authenticationService.register(
        formValue.email,
        formValue.password,
        formValue.name,
      );

      this.isLoading = false;
      const alert = await this.alertController.create({
        header: 'Usuario registrado',
        message:
          'Usuario registrado correctamente, por favor revise su correo para verificar su cuenta.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      alert.onDidDismiss().then(() => {
        this.registerForm.reset();
        this.router.navigate(['/login'], {
          queryParams: { email: formValue.email },
        });
      });
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/email-already-in-use'
      ) {
        this.isLoading = false;
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'El correo ya esta en uso',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al registrar el usuario',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  getErrorMessage(field: string) {
    var a = this.registerForm.get(field);
    if (a?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (a?.hasError('email')) {
      return 'Correo inválido';
    }
    if (a?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}
