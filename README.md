# Pomodoro 
aplikasi bisa diakses di: https://ariyalexx.pages.dev/ 
### cara penggunaan pomodoro bisa dilihat di web.  
- tombol settings di kanan atau untuk mengatur waktu dan interval pomodoro. 
- terdapat pemutar lofi yang menggunakan spotify, ini berkerja dengan baik jika dibuka menggunakan komputer, jika web dibuka menggunakan handphone maka spotify hanya memutar preview dari music. 
- kenapa tidak menggunakan api?? karena jika menggunakan api, pengguna yang tidak berlangganan spotify premium tidak bisa memutar lagu, untuk itu saya menggunakan embed spotify yang hanya menampilkan dan memutar 1 playlist. 
- ketika pertama kali membuka web akan ada popup untuk mengaktifkan notifikasi, ini diperlukan agar ketika timer berakhir pengguna bisa mendapatkan notifikasi via web. 
- ketika pomodoro selesai, user mencoret list dengan checklist, pengguna bisa menghapus list dengan menandai list dengan checklist lalu klik tombol sampah. 
- pomodoro berjalan sesuai interval default(2) atau interval yang disetting pengguna.
  contoh kerja interval:
  1. interval 1: pomodoro -> longrest -> ulangi dari awal
  2. interval 2: pomodoro -> shortrest -> pomodoro -> longrest -> ulangi step dari awal
  3. interval 3: pomodoro -> shortrest -> pomodoro -> shortrest -> pomodoro -> longrest -> ulangi dari awal.
- aplikasi akan berpindah timer secara otomatis sesuai interval, baik itu timer pomodoro, shortrest, dan longrest.
- ketika berpindah timer, pengguna harus menekan tombol start untuk memulai timer
