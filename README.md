Personal Expense Tracker with AI-Assisted Development

Description
Personal Expense Tracker adalah aplikasi web intuitif untuk mengelola keuangan pribadi. Aplikasi ini memungkinkan pengguna mencatat, menganalisis, dan memantau pemasukan serta pengeluaran melalui antarmuka yang modern dan responsif. Dengan visualisasi data interaktif dan wawasan cerdas, aplikasi ini membantu pengguna memahami pola keuangan mereka secara efisien. Proyek ini dikembangkan dengan bantuan AI (IBM Granite via Replicate) untuk mempercepat pembuatan kode dasar, memastikan efisiensi dan struktur awal yang solid.

Technologies Used
•	HTML5: Struktur semantik untuk accessibility dan SEO.
•	CSS3 (Grid & Flexbox): Layout responsif dengan animasi halus.
•	JavaScript (ES6+): Logika aplikasi, termasuk CRUD dan filtering.
•	Chart.js: Visualisasi data interaktif (pie, bar, line charts).
•	Google Fonts (Inter): Tipografi modern dan mudah dibaca.
•	localStorage: Penyimpanan data klien tanpa backend.
•	Netlify: Hosting statis dengan deployment otomatis dari GitHub.

Alasan Pemilihan Teknologi:
•	Vanilla JS dipilih untuk menunjukkan penguasaan fundamental web development, menghindari kompleksitas framework, dan memastikan performa cepat.
•	Chart.js digunakan untuk visualisasi data yang responsif dan kustomisasi tema.
•	localStorage memberikan persistensi data sederhana, cocok untuk proyek tanpa backend.
•	Netlify menawarkan hosting gratis, deployment cepat, dan integrasi GitHub yang mulus.

Features
Dashboard Features
•	Real-time Financial Summary:
o	Total Income dengan format mata uang (IDR).
o	Total Expense dengan indikator warna.
o	Current Balance dengan visualisasi positif/negatif.
o	Auto-refresh saat data berubah.

•	Interactive Data Visualization:
o	Pie Chart: Rasio pemasukan vs pengeluaran.
o	Bar Chart: Rincian pengeluaran berdasarkan kategori dengan hover.
o	Line Chart: Tren saldo dari waktu ke waktu.

•	Navigation System:
o	Navigasi berbasis tab dengan transisi halus.
o	Indikator status aktif.
o	Desain responsif dengan navigasi collapsible untuk mobile.

Transaction Management Features
•	CRUD Operations:
o	Create: Form input dengan validasi (tanggal, deskripsi, kategori, jumlah).
o	Read: Tabel riwayat transaksi yang dapat diurutkan.
o	Update: Edit inline dengan form pre-filled.
o	Delete: Hapus dengan dialog konfirmasi.

•	Advanced Filtering:
o	Pencarian berdasarkan deskripsi (real-time).
o	Filter berdasarkan kategori (Income/Expense).
o	Filter berdasarkan tanggal.
o	Kombinasi filter dengan logika AND.

•	Data Validation:
o	Validasi field wajib.
o	Validasi jumlah numerik dengan nilai minimum.
o	Validasi format tanggal.
o	Validasi pemilihan kategori.

Activity History Features
•	Comprehensive Logging:
o	Pencatatan otomatis semua operasi CRUD.
o	Timestamp dengan format lokal Indonesia.
o	Deskripsi aksi detail dengan format jumlah.
o	Penyimpanan persisten di localStorage.

•	History Management:
o	Filter berdasarkan tipe aksi (Added, Updated, Deleted).
o	Filter berdasarkan rentang tanggal.
o	Hapus semua riwayat dengan konfirmasi.
o	Pengurutan kronologis (terbaru dulu).

Analytics Features
•	Advanced Analytics:
o	Filter periode waktu (All Time, This Week, This Month, This Year).
o	Rincian pengeluaran dengan donut chart.
o	Perhitungan persentase dinamis.
o	Kategorisasi dengan kode warna.

•	Smart Insights Generation:
o	Identifikasi otomatis kategori pengeluaran terbesar.
o	Perhitungan persentase distribusi pengeluaran.
o	Analisis surplus/defisit anggaran.
o	Perhitungan rata-rata pengeluaran per transaksi.
o	Rekomendasi berdasarkan pola pengeluaran.

User Experience Features
•	Theme Management:
o	Toggle Light/Dark mode dengan transisi halus.
o	Penyimpanan preferensi tema di localStorage.
o	Pembaruan tema chart dinamis.
o	Konsistensi skema warna di seluruh aplikasi.

•	Responsive Design:
o	Pendekatan mobile-first dengan breakpoint.
o	Elemen antarmuka ramah sentuhan.
o	Layout dioptimalkan untuk tablet dan desktop.
o	Sistem grid fleksibel.

•	Performance Optimizations:
o	Lazy loading untuk chart.
o	Debounced search input.
o	Pembaruan DOM efisien.
o	Minim dependensi eksternal.

Setup Instructions
Untuk deployment:
o	Buka website Netlify.
o	Login website Netlify.
o	Pilih bagian menu deployment.
o	Drag and drop folder projectnya.
Deployment Link: [https://lacak-pengeluaran.netlify.app/]

AI Support Explanation
IBM Granite AI (diakses via Replicate) digunakan selama pengembangan untuk menghasilkan kode dasar (boilerplate) guna mempercepat pembuatan struktur awal aplikasi. Berikut rincian penggunaannya:
•	Code Generation:
o	Menghasilkan kode dasar HTML untuk struktur dashboard dan form transaksi.
o	Membuat boilerplate JavaScript untuk logika CRUD dan inisialisasi Chart.js.
o	Menyediakan template CSS awal untuk layout Grid dan Flexbox.

•	Dampak Nyata:
o	Efisiensi Waktu: Mempercepat pembuatan struktur awal.
o	Struktur Awal yang Solid: Kode dasar dari AI memberikan fondasi yang terorganisir, memudahkan pengembangan fitur lanjutan seperti filtering dan analytics.

•	Human Oversight: Semua kode dasar dari AI direview, dikustomisasi, dan dioptimalkan secara manual untuk memenuhi kebutuhan spesifik proyek, seperti validasi data, tema responsif, dan integrasi visualisasi Chart.js. Tes manual dilakukan untuk memastikan kompatibilitas dan performa.

•	Catatan: AI hanya digunakan untuk menghasilkan kode dasar selama fase pengembangan dan tidak menjadi bagian dari produk akhir, sesuai brief proyek.
