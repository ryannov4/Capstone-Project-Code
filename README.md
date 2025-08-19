Personal Expense Tracker with AI-Assisted Development

Description
Personal Expense Tracker adalah aplikasi web intuitif untuk mengelola keuangan pribadi. Aplikasi ini memungkinkan pengguna mencatat, menganalisis, dan memantau pemasukan serta pengeluaran melalui antarmuka yang modern dan responsif. Dengan visualisasi data interaktif dan wawasan cerdas, aplikasi ini membantu pengguna memahami pola keuangan mereka secara efisien. Proyek ini dikembangkan dengan bantuan AI (IBM Granite via Replicate) untuk mempercepat pembuatan kode dasar, memastikan efisiensi dan struktur awal yang solid.

Technologies Used
HTML5: Struktur semantik untuk accessibility dan SEO.
CSS3 (Grid & Flexbox): Layout responsif dengan animasi halus.
JavaScript (ES6+): Logika aplikasi, termasuk CRUD dan filtering.
Chart.js: Visualisasi data interaktif (pie, bar, line charts).
Google Fonts (Inter): Tipografi modern dan mudah dibaca.
localStorage: Penyimpanan data klien tanpa backend.
Netlify: Hosting statis dengan deployment otomatis dari GitHub.

Alasan Pemilihan Teknologi:

Vanilla JS dipilih untuk menunjukkan penguasaan fundamental web development, menghindari kompleksitas framework, dan memastikan performa cepat.
Chart.js digunakan untuk visualisasi data yang responsif dan kustomisasi tema.
localStorage memberikan persistensi data sederhana, cocok untuk proyek tanpa backend.
Netlify menawarkan hosting gratis, deployment cepat, dan integrasi GitHub yang mulus.

Features
Dashboard Features

Real-time Financial Summary:
Total Income dengan format mata uang (IDR).
Total Expense dengan indikator warna.
Current Balance dengan visualisasi positif/negatif.
Auto-refresh saat data berubah.


Interactive Data Visualization:
Pie Chart: Rasio pemasukan vs pengeluaran.
Bar Chart: Rincian pengeluaran berdasarkan kategori dengan hover.
Line Chart: Tren saldo dari waktu ke waktu.


Navigation System:
Navigasi berbasis tab dengan transisi halus.
Indikator status aktif.
Desain responsif dengan navigasi collapsible untuk mobile.

Transaction Management Features
CRUD Operations:
Create: Form input dengan validasi (tanggal, deskripsi, kategori, jumlah).
Read: Tabel riwayat transaksi yang dapat diurutkan.
Update: Edit inline dengan form pre-filled.
Delete: Hapus dengan dialog konfirmasi.

Advanced Filtering:
Pencarian berdasarkan deskripsi (real-time).
Filter berdasarkan kategori (Income/Expense).
Filter berdasarkan tanggal.
Kombinasi filter dengan logika AND.

Data Validation:
Validasi field wajib.
Validasi jumlah numerik dengan nilai minimum.
Validasi format tanggal.
Validasi pemilihan kategori.

Activity History Features
Comprehensive Logging:
Pencatatan otomatis semua operasi CRUD.
Timestamp dengan format lokal Indonesia.
Deskripsi aksi detail dengan format jumlah.
Penyimpanan persisten di localStorage.


History Management:
Filter berdasarkan tipe aksi (Added, Updated, Deleted).
Filter berdasarkan rentang tanggal.
Hapus semua riwayat dengan konfirmasi.
Pengurutan kronologis (terbaru dulu).



Analytics Features

Advanced Analytics:
Filter periode waktu (All Time, This Week, This Month, This Year).
Rincian pengeluaran dengan donut chart.
Perhitungan persentase dinamis.
Kategorisasi dengan kode warna.


Smart Insights Generation:
Identifikasi otomatis kategori pengeluaran terbesar.
Perhitungan persentase distribusi pengeluaran.
Analisis surplus/defisit anggaran.
Perhitungan rata-rata pengeluaran per transaksi.
Rekomendasi berdasarkan pola pengeluaran.



User Experience Features

Theme Management:
Toggle Light/Dark mode dengan transisi halus.
Penyimpanan preferensi tema di localStorage.
Pembaruan tema chart dinamis.
Konsistensi skema warna di seluruh aplikasi.


Responsive Design:
Pendekatan mobile-first dengan breakpoint.
Elemen antarmuka ramah sentuhan.
Layout dioptimalkan untuk tablet dan desktop.
Sistem grid fleksibel.


Performance Optimizations:
Lazy loading untuk chart.
Debounced search input.
Pembaruan DOM efisien.
Minim dependensi eksternal.



Setup Instructions

Clone repository: git clone https://github.com/yourusername/expense-tracker.git
Buka index.html di browser untuk menjalankan aplikasi.
Untuk development:
Edit file index.html, style.css, atau script.js sesuai kebutuhan.
Tidak perlu instalasi dependensi tambahan (kecuali jika menambah library).


Untuk deployment:
Push ke GitHub.
Hubungkan repo ke Netlify via dashboard.
Deploy otomatis, akses via link Netlify (contoh: https://your-expense-tracker.netlify.app).



Deployment Link: [Masukkan link Netlify Anda di sini]
AI Support Explanation
IBM Granite AI (diakses via Replicate) digunakan selama pengembangan untuk menghasilkan kode dasar (boilerplate) guna mempercepat pembuatan struktur awal aplikasi. Berikut rincian penggunaannya:

Code Generation:
Menghasilkan kode dasar HTML untuk struktur dashboard dan form transaksi.
Membuat boilerplate JavaScript untuk logika CRUD dan inisialisasi Chart.js.
Menyediakan template CSS awal untuk layout Grid dan Flexbox.


Dampak Nyata:
Efisiensi Waktu: Mempercepat pembuatan struktur awal.
Struktur Awal yang Solid: Kode dasar dari AI memberikan fondasi yang terorganisir, memudahkan pengembangan fitur lanjutan seperti filtering dan analytics.


Human Oversight: Semua kode dasar dari AI direview, dikustomisasi, dan dioptimalkan secara manual untuk memenuhi kebutuhan spesifik proyek, seperti validasi data, tema responsif, dan integrasi visualisasi Chart.js. Tes manual dilakukan untuk memastikan kompatibilitas dan performa.
Catatan: AI hanya digunakan untuk menghasilkan kode dasar selama fase pengembangan dan tidak menjadi bagian dari produk akhir, sesuai brief proyek.
