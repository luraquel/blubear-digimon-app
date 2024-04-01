import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { keyOutline, personOutline } from 'ionicons/icons';
import { ILoginForm } from 'src/core/interfaces/login-form.interface';
import { AuthenticationService } from '../services/authentication.service';
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
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  ngOnDestroy(): void {
    this.loginForm.reset();
  }

  ngOnInit() {
    addIcons({ personOutline, keyOutline });
    this.loginForm
      .get('email')
      ?.setValue(this.route.snapshot.queryParams['email']);
  }
  getErrorMessage(field: string) {
    var a = this.loginForm.get(field);
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
  async login() {
    this.isLoading = true;
    var formValue = this.loginForm.value as ILoginForm;
    try {
      const user = await this.authenticationService.login(
        formValue.email,
        formValue.password,
      );
      this.isLoading = false;
      if (user.user?.emailVerified === false) {
        const alert = await this.alertController.create({
          header: 'Correo no verificado',
          message: 'Por favor verifica tu correo antes de iniciar sesión',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }

      this.router.navigateByUrl('/digimon', { replaceUrl: true });
    } catch (error) {
      this.isLoading = false;
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Correo o contraseña incorrectos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
