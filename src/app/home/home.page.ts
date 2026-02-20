import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonLabel,
    IonIcon,
    CommonModule,
    FormsModule
  ],
})
export class HomePage implements OnInit {

  nama = '';
  prodi = '';
  dataMahasiswa: any[] = [];

  constructor(private storage: StorageService) {}

  async ngOnInit() {
    this.dataMahasiswa = await this.storage.getData();
  }

  async simpan() {
    if (!this.nama || !this.prodi) return;

    const dataBaru = {
      id: Date.now(),
      nama: this.nama,
      prodi: this.prodi,
    };

    this.dataMahasiswa.push(dataBaru);
    await this.storage.saveData(this.dataMahasiswa);

    this.nama = '';
    this.prodi = '';
  }

  async hapus(id: number) {
    this.dataMahasiswa = await this.storage.hapusData(id);
  }
}
