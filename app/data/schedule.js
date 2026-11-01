// Jadwal UTS pribadi. Sumber: "2627-1 Jadwal UTS FIF", kelas BS1IF-48-REG01,
// kecuali Forensik Digital yang kelas gabungan BS1IF-47-GAB01.
// Nomor absen di awal kelas, jadi room = ruangan pertama tiap kelas;
// ruangan paruh kedua ditulis di note.
(function (root) {
  var SCHEDULE = {
    term: 'UTS Ganjil 2026/2027',
    kelas: 'S1 Informatika · BS1IF-48-REG01',
    gedung: 'Gedung A (Grha Wiyata Cacuk Sudarijanto)',
    exams: [
      {
        course: 'ks', name: 'Keamanan Siber', kode: 'CAK3CAB3', kelas: 'BS1IF-48-REG01',
        date: '2026-11-02', day: 'Senin', time: '08.00 - 10.15 WIB', jenis: 'Onsite · ujian tertulis',
        room: '(A307B) KU1.03.12', range: 'Nomor urut 1-20',
        note: 'Kelas 40 mahasiswa dipecah dua ruangan: nomor urut 21-40 mengerjakan di (A308A) KU1.03.11, gedung yang sama.'
      },
      {
        course: 'mp', name: 'Manajemen Proyek TIK', kode: 'CAK3FAB3', kelas: 'BS1IF-48-REG01',
        date: '2026-11-04', day: 'Rabu', time: '08.00 - 10.15 WIB', jenis: 'Onsite · ujian tertulis',
        room: '(A203B) KU1.02.06', range: 'Nomor urut 1-21',
        note: 'Ditandai "Bersamaan" di jadwal FIF: ada mata kuliah lain pada jam yang sama. Kelas 43 mahasiswa dipecah dua ruangan: nomor urut 22-43 di (A204A) KU1.02.07.'
      },
      {
        course: 'fd', name: 'Forensik Digital', kode: 'CAK4JBB3', kelas: 'BS1IF-47-GAB01',
        date: '2026-11-05', day: 'Kamis', time: '10.45 - 13.00 WIB', jenis: 'Onsite · ujian tertulis',
        room: '(A307B) KU1.03.12', range: 'Nomor urut 1-25',
        note: 'Kelas gabungan 51 mahasiswa dipecah dua ruangan: nomor urut 26-51 di (A308A) KU1.03.11. Jadwal FIF menandai ujian ini "boleh tidak bersamaan".'
      },
      {
        course: 'ca', name: 'Komputasi Awan dan Terdistribusi', kode: 'CAK3EAB3', kelas: 'BS1IF-48-REG01',
        date: '2026-11-07', day: 'Sabtu', time: '08.00 - 10.15 WIB', jenis: 'Onsite · ujian tertulis',
        room: '(A303B) KU1.03.06', range: 'Nomor urut 1-19',
        note: 'Kelas 38 mahasiswa dipecah dua ruangan: nomor urut 20-38 di (A304A) KU1.03.07.'
      }
    ]
  };
  root.SCHEDULE = SCHEDULE;
})(this);
