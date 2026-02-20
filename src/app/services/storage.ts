import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private KEY = 'data_mahasiswa';

  async getData() {
    const { value } = await Preferences.get({ key: this.KEY });
    return value ? JSON.parse(value) : [];
  }

  async saveData(data: any[]) {
    await Preferences.set({
      key: this.KEY,
      value: JSON.stringify(data),
    });
  }

  // ✅ FUNGSI HAPUS DATA (PAKAI filter)
  async hapusData(id: number) {
    const data = await this.getData();

    const dataBaru = data.filter((item: any) => item.id !== id);

    await Preferences.set({
      key: this.KEY,
      value: JSON.stringify(dataBaru),
    });

    return dataBaru;
  }
}
