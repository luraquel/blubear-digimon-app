import { Component, Input, OnInit } from '@angular/core';
import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonSpinner,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { DigimonService } from 'src/app/services/digimon.service';
import { IDigimonPartial } from 'src/core/interfaces/digimon-partial.interface';
import { IDigimon } from 'src/core/interfaces/digimon.interface';

@Component({
  selector: 'app-digimon-modal',
  templateUrl: './digimon-modal.component.html',
  styleUrls: ['./digimon-modal.component.scss'],
  standalone: true,
  imports: [IonSplitPane, IonSpinner, IonLabel, IonItem, IonImg, IonContent],
})
export class DigimonModalComponent implements OnInit {
  @Input() digimonPartial: IDigimonPartial | null = null;
  digimon: IDigimon | null = null;
  isLoading = false;
  constructor(private digimonService: DigimonService) {}

  ngOnInit() {
    if (this.digimonPartial) {
      this.isLoading = true;
      this.digimonService
        .getDigimonById(this.digimonPartial.id)
        .subscribe((digimon) => {
          this.digimon = digimon;
          this.isLoading = false;
        });
    }
  }
}
