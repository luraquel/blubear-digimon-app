import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigimonPanelPage } from './digimon-panel.page';

describe('DigimonPanelPage', () => {
  let component: DigimonPanelPage;
  let fixture: ComponentFixture<DigimonPanelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DigimonPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
