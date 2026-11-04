# Kisi-kisi UTS Kecerdasan Artifisial (CAK3DAB3)

Berkas ini untuk dibaca agen/AI lain yang akan menambah atau mengubah latihan soal KA di aplikasi ini.
Isinya: cakupan ujian, batas materi, konvensi penulisan jawaban, dan peta topik yang sudah ada.

## 1. Bentuk ujian

| Hal | Ketentuan |
|---|---|
| Waktu | Pekan 8, Kamis 5 November 2026, 08.00–10.00 (120 menit) |
| Mode | Onsite, paper-based, kalkulator boleh |
| Bentuk | **Essay, 4 soal** (satu soal per materi) |
| Evaluasi | Open notes: 1 lembar A4, 2 halaman (bolak-balik) |
| Sumber | Slide dosen Week 1, 2-3, 5, 6 + dokumen MOGA (RSM) + soal UTS 2025 |

## 2. Empat materi (batas tegas cakupan)

Hanya empat ini yang boleh muncul di latihan soal. Materi di luar daftar ini sudah dihapus
(misalnya machine learning / Week 7, regresi, kNN, metrik klasifikasi).

### Materi 1 — Introduction to Metaheuristic Search (Week 1)
Wajib bisa: ruang pencarian dan cara menghitung ukurannya, tetangga satu solusi,
tiga keluarga search (blind, informed, local), Hill Climbing dan tiga jebakannya
(local optimum, plateau, ridge), Simulated Annealing `P = exp(−ΔE/T)` dengan pendinginan
geometrik `T_k = T0·α^k`, random restart, trajectory vs population, exploration vs
exploitation, empat sifat metaheuristik, No Free Lunch (Wolpert & Macready 1997),
dan alasan memilih metaheuristik dibanding metode eksak.

### Materi 2 — Genetic Algorithm (Week 2-3)
Wajib bisa: istilah (gen, alel, kromosom, individu, populasi, generasi), enam langkah GA,
encoding biner dan decoding `x = x_min + (x_max − x_min)/(2^n − 1)·d`, encoding integer dan
permutasi, fitness vs objective (termasuk konversi minimasi), empat kesalahan desain fitness,
seleksi roulette / tournament / rank-based, tiga skema crossover biner, mutasi bit flip
(`pm ≈ 1/n`), elitisme dan replacement, kriteria berhenti, dan **satu generasi penuh**
(studi kasus jadwal ujian, fitness `C − konflik`).

### Materi 3 — Genetic Algorithms for Combinatorial Problems (Week 5)
Wajib bisa: ciri masalah kombinatorial, ukuran ruang (`n!`, `2^n`, `m^n`), banyak kromosom
untuk satu tur (`2n`, tur unik `n!/2n`), mengapa single-point merusak permutasi,
PMX (mapping dan rantai) dan OX (urutan relatif), mutasi swap / insertion / inversion
beserta jumlah ruas yang putus, constraint: hard vs soft serta rejection / repair / penalty,
Tabu Search (tenure, aspiration), dan **GA untuk TSP** (pola Soal 1 UTS 2025).

### Materi 4 — Multi-Objective Optimisation (Week 6 + MOGA)
Wajib bisa: dominasi dan Pareto front, `n_p` dan `S_p`, fast non-dominated sort,
crowding distance per front (`CD_i`, ujung = ∞), binary tournament (rank lalu crowding),
delapan langkah NSGA-II termasuk **combine 2N lalu fill N**, membaca front dan memilih
(knee point, weighted sum), serta perbandingan GA biasa vs MOGA.

## 3. Konvensi penulisan jawaban (dipakai konsisten di aplikasi)

- Jarak, konflik, fitness berupa bilangan bulat.
- **Fitness TSP = 1/(total jarak) ditulis 4 desimal**, karena dipakai menghitung proporsi.
- **Proporsi roulette, batas rentang, crowding distance, peluang, rata-rata, dan semua hasil
  lain: 2 desimal.** Bulatkan hanya angka yang diminta; proporsi dihitung dari nilai yang
  belum dibulatkan.
- Karena pembulatan 2 desimal, jumlah proporsi bisa 0,99 atau 1,01. Batas atas terakhir
  tetap ditulis 1, dan kedua cara (dari proporsi bulat atau dari kumulatif eksak) diterima.
- **TP pada order crossover: kunci memakai indeks gen, kedua batas termasuk** (TP1 = 2, TP2 = 4
  berarti segmen gen 2-4). Alasannya, soal menyebut "rentang indeks" dan panah TP di tabel jawaban
  menunjuk sel ke-2 dan ke-4. Contoh OX di soal tidak menulis angka TP (panahnya di batas sebelum
  gen 3 dan sesudah gen 5), jadi tafsiran "potong setelah gen TP1" (segmen gen 3-4) tetap mungkin.
  Setiap soal TSP menulis hasil kedua tafsiran di `ex`, dan siswa diminta menulis asumsinya.
- Anak1 = segmen induk 1 + urutan induk 2; Anak2 = segmen induk 2 + urutan induk 1.
- Mutasi dilakukan bila nilai acak **<** pm.
- Elitisme `k = 1`: individu terbaik populasi lama menggantikan anak terburuk.

## 4. Isi bank soal saat ini

Semua soal berbentuk `type: 'steps'` (uraian bertahap), tanpa topik drill.

| Materi | Topik (id) | Soal |
|---|---|---|
| 3 | `uts` | Soal 1 UTS 2025 (= LKS GA-2), 5 kota, pola a-g |
| 3 | `mtsp` | 3 soal mirip UTS 2025 (5 dan 6 kota) |
| 3 | `ctsp` | Soal cerita depot air minum, 5 kota |
| 3 | `mtsp2` | TSP 6 kota dan 7 kota |
| 3 | `ccross`, `kpmx`, `kpmx2` | PMX vs OX (6 gen, 7 gen, 8 gen) + mutasi permutasi |
| 1 | `cmeta` | Soal cerita driver ojek online (HC, plateau, SA, restart) |
| 1 | `mhc` | Kedai kopi, barista (HC, plateau, SA, pendinginan) |
| 1 | `mgrid` | Drone pemetaan, grid 4×4 (HC 2D, local optimum, neighbourhood) |
| 1 | `mspace` | Ruang pencarian 24 ujian × 6 slot + No Free Lunch |
| 2 | `cga` | Soal cerita pabrik keripik (GA biner + constraint + elitisme) |
| 2 | `gabin` | Satu generasi biner, maksimasi `x²` |
| 2 | `gabin2` | Satu generasi dengan konversi minimasi |
| 2 | `gajadwal` | Satu generasi jadwal integer (6 ujian, 3 slot) |
| 2 | `gasel` | Roulette vs rank vs tournament |
| 4 | `cmoo` | Soal cerita BNPB (n_p, front, crowding, fill N) |
| 4 | `msort` | Sort, crowding, tournament |
| 4 | `mfill` | Combine 2N lalu fill N |
| 4 | `mweight` | Knee point, weighted sum, keputusan |

Total 23 soal / 146 langkah. Tab **Di luar format UTS** berisi 33 isian singkat Week 5-6
(tetap dalam cakupan materi, hanya bentuknya bukan esai).

## 5. Cara menambah soal

1. Tulis soal di `scripts/ka/part5.js` (atau `part4.js` untuk soal cerita), jangan mengedit
   `app/data/ka-4.js` / `ka-5.js` karena keduanya hasil generate.
2. Setiap angka kunci harus dihitung kode, bukan diketik manual.
3. Jalankan `node scripts/ka/build.js app/data`. Build gagal bila ada kunci yang tidak lolos
   `Check.checkField`, angka tak hingga, atau seri pada jarak tur terbaik.
4. Tambahkan topik baru ke `files` di `scripts/ka/build.js`, lalu ke `app/index.html` dan
   `app/sw.js` bila membuat berkas data baru.
5. Perbarui daftar topik di `tests/data.test.js`, lalu jalankan tes:
   `node --test tests/data.test.js tests/fd.test.js tests/tools.test.js`
   (Node 24 menolak bentuk `node --test tests/`).
6. Konvensi id: `ka-<topicId>-<nomor>`. Jangan mengganti `topicId` yang sudah ada karena
   progres siswa tersimpan pada id tersebut.
