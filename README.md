# Ruang Latihan UTS

Aplikasi latihan UTS untuk lima mata kuliah. Berjalan offline di laptop Windows, tanpa instalasi dan tanpa akun.

| Mata kuliah | Isi |
|---|---|
| Keamanan Siber | 258 pilihan ganda + 2 esai, materi minggu 1-7, 23 prediksi uraian dan isian |
| Kecerdasan Artifisial | 50 isian dan esai |
| Komputasi Awan | 37 isian dan esai + 3 lab interaktif |
| Forensik Digital | 45 isian dan esai |
| Manajemen Proyek | 39 isian dan esai + lab CPM |

Fitur: mode latihan, mode ujian dengan timer, bank soal salah, statistik progres, dan jadwal UTS pribadi di dashboard.

## Cara memakai di HP

Buka https://sxvirel.github.io/Ruang-Latihan-UTS/app/ di Chrome, lalu pilih menu **Add to Home screen**. Setelah dibuka sekali saat online, aplikasi tetap bisa dipakai tanpa internet. Progres di HP terpisah dari progres di laptop.

## Cara memasang (Windows)

1. Buka halaman repo ini di GitHub.
2. Klik tombol hijau **Code**, lalu **Download ZIP**.
3. Klik kanan file ZIP, pilih **Extract All**. Jangan menjalankan aplikasi dari dalam ZIP.
4. Buka folder hasil ekstrak, lalu klik dua kali **Study.exe**.
5. Kalau muncul "Windows protected your PC", klik **More info**, lalu **Run anyway**. Peringatan ini muncul karena `Study.exe` tidak punya tanda tangan digital.

Aplikasi terbuka di jendela Edge atau Chrome. Internet tidak diperlukan setelah file diekstrak.

Supaya mudah dibuka lagi: klik kanan `Study.exe`, pilih **Send to > Desktop (create shortcut)**. Jangan memindahkan `Study.exe` sendirian, karena file ini harus satu folder dengan folder `app`.

## Kalau Study.exe tidak bisa dipakai

Buka folder `app`, lalu klik dua kali `index.html`. Cara ini juga berlaku untuk Mac dan Linux. Hasilnya sama, hanya terbuka sebagai tab browser biasa.

## Catatan

- Progres tersimpan di browser laptop masing-masing, jadi tidak terkirim ke siapa pun. Menghapus data browser ikut menghapus progres.
- Kalau mengunduh versi baru, ekstrak ke folder yang sama agar progres tetap terbaca.
- Kunci pilihan ganda berasal dari jawaban di sumber soal. Kunci esai dan penjelasan singkat disusun sebagai bantuan belajar, jadi tetap cocokkan dengan materi dosen.

## Pengembang

Tes berjalan dengan Node:

```bash
node --test tests/
```

`launcher/build.bat` membangun ulang `Study.exe` dari `launcher/Study.cs`.
