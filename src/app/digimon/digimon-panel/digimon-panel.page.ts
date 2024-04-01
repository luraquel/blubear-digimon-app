import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  InfiniteScrollCustomEvent,
  IonicModule,
  ModalController,
} from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DigimonService } from 'src/app/services/digimon.service';
import { IDigimonPartial } from 'src/core/interfaces/digimon-partial.interface';
import { DigimonModalComponent } from '../components/digimon-modal/digimon-modal.component';

@Component({
  selector: 'app-digimon-panel',
  templateUrl: './digimon-panel.page.html',
  styleUrls: ['./digimon-panel.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DigimonPanelPage implements OnInit {
  user: firebase.User | null = null;
  digimons: IDigimonPartial[] = [];
  page = 1;
  pageSize = 20;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private digimonService: DigimonService,
    private modalCtrl: ModalController,
  ) {
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
    this.getListDigimon(this.page, this.pageSize);
  }
  async logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
  getListDigimon(page: number = 1, pageSize: number = 20) {
    this.digimonService
      .getDigimons({ page: this.page, pageSize: this.pageSize })
      .subscribe((digimons) => {
        this.digimons = [...this.digimons, ...digimons];
      });
  }
  async onClickDigimon(digimon: IDigimonPartial) {
    const modal = await this.modalCtrl.create({
      component: DigimonModalComponent,
      initialBreakpoint: 0.7,
      breakpoints: [0, 0.7],
    });
    modal.componentProps = { digimonPartial: digimon };
    await modal.present();
  }
  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.page++;
    this.getListDigimon(this.page, this.pageSize);
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }
}
