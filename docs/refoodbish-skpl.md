# SKPL (Spesifikasi Kebutuhan Perangkat Lunak)
## Aplikasi Refoodbish

### Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Deskripsi Umum](#deskripsi-umum)
3. [Kebutuhan Fungsional](#kebutuhan-fungsional)
4. [Kebutuhan Non-Fungsional](#kebutuhan-non-fungsional)
5. [Diagram Use Case](#diagram-use-case)
6. [Spesifikasi Antarmuka](#spesifikasi-antarmuka)

### 1. Pendahuluan

#### 1.1 Tujuan
Dokumen ini menjelaskan spesifikasi kebutuhan perangkat lunak untuk aplikasi Refoodbish, sebuah platform mobile yang menghubungkan pengguna untuk berbagi makanan berlebih yang masih layak konsumsi.

#### 1.2 Ruang Lingkup
Aplikasi Refoodbish dikembangkan untuk platform Android menggunakan bahasa pemrograman Kotlin. Aplikasi ini bertujuan untuk mengurangi food waste dengan memfasilitasi sharing makanan di komunitas lokal.

#### 1.3 Definisi dan Istilah
- **Food Donor**: Pengguna yang menyediakan makanan berlebih
- **Food Receiver**: Pengguna yang menerima makanan dari donor
- **Food Listing**: Postingan makanan yang tersedia untuk dibagikan

### 2. Deskripsi Umum

#### 2.1 Perspektif Produk
Refoodbish adalah aplikasi mobile standalone yang beroperasi pada platform Android. Aplikasi ini menggunakan arsitektur client-server dengan database untuk menyimpan data pengguna dan listing makanan.

#### 2.2 Fungsi Produk
- Registrasi dan autentikasi pengguna
- Posting makanan berlebih dengan detail lengkap
- Pencarian makanan berdasarkan lokasi
- Sistem request dan konfirmasi pickup
- Rating dan review sistem
- Notifikasi real-time

#### 2.3 Karakteristik Pengguna
- **Primary Users**: Masyarakat umum usia 18-50 tahun
- **Secondary Users**: Restoran, cafe, dan bisnis makanan
- **Skill Level**: Basic smartphone operation

### 3. Kebutuhan Fungsional

#### 3.1 Modul Autentikasi
- **FR-001**: Sistem harus memungkinkan pengguna melakukan registrasi dengan email/nomor telepon
- **FR-002**: Sistem harus memungkinkan pengguna login menggunakan kredensial yang valid
- **FR-003**: Sistem harus memungkinkan reset password melalui email
- **FR-004**: Sistem harus melakukan verifikasi account melalui OTP

#### 3.2 Modul Manajemen Profil
- **FR-005**: Pengguna dapat mengedit informasi profil
- **FR-006**: Pengguna dapat mengupload foto profil
- **FR-007**: Pengguna dapat melihat history aktivitas
- **FR-008**: Pengguna dapat mengatur preferensi notifikasi

#### 3.3 Modul Food Listing
- **FR-009**: Food donor dapat membuat listing makanan dengan foto, deskripsi, lokasi, dan waktu expired
- **FR-010**: Food donor dapat mengedit atau menghapus listing yang dibuat
- **FR-011**: Sistem harus menampilkan listing makanan berdasarkan proximity lokasi
- **FR-012**: Food receiver dapat melihat detail lengkap listing makanan

#### 3.4 Modul Request dan Pickup
- **FR-013**: Food receiver dapat melakukan request untuk makanan yang diinginkan
- **FR-014**: Food donor dapat menerima atau menolak request
- **FR-015**: Sistem harus mengirim notifikasi konfirmasi pickup
- **FR-016**: Pengguna dapat melakukan chat untuk koordinasi pickup

#### 3.5 Modul Rating dan Review
- **FR-017**: Pengguna dapat memberikan rating setelah transaksi selesai
- **FR-018**: Pengguna dapat menulis review untuk pengguna lain
- **FR-019**: Sistem harus menampilkan rating rata-rata pengguna

### 4. Kebutuhan Non-Fungsional

#### 4.1 Performance
- **NFR-001**: Aplikasi harus dapat load dalam waktu maksimal 3 detik
- **NFR-002**: Sistem harus dapat handle 1000 concurrent users
- **NFR-003**: Database response time maksimal 2 detik

#### 4.2 Security
- **NFR-004**: Data pengguna harus dienkripsi
- **NFR-005**: Sistem harus menggunakan HTTPS untuk semua komunikasi
- **NFR-006**: Session timeout setelah 30 menit inaktivitas

#### 4.3 Usability
- **NFR-007**: Interface harus intuitif dan mudah digunakan
- **NFR-008**: Aplikasi harus responsive pada berbagai ukuran layar
- **NFR-009**: Mendukung bahasa Indonesia dan Inggris

#### 4.4 Reliability
- **NFR-010**: Uptime sistem minimal 99.5%
- **NFR-011**: Data backup dilakukan setiap 24 jam
- **NFR-012**: Recovery time maksimal 4 jam jika terjadi downtime

### 5. Diagram Use Case

```
                    Refoodbish Use Case Diagram
                           
    ┌─────────────┐                                    ┌─────────────┐
    │ Food Donor  │                                    │Food Receiver│
    └─────────────┘                                    └─────────────┘
           │                                                  │
           │                                                  │
           ▼                                                  ▼
    ┌─────────────┐                                    ┌─────────────┐
    │Create Listing│                                   │Search Food  │
    └─────────────┘                                    └─────────────┘
           │                                                  │
           ▼                                                  ▼
    ┌─────────────┐                                    ┌─────────────┐
    │Manage Listing│                                   │Request Food │
    └─────────────┘                                    └─────────────┘
           │                                                  │
           ▼                                                  ▼
    ┌─────────────┐          ┌──────────────┐         ┌─────────────┐
    │Accept/Reject│◄────────►│Chat & Coordinate│◄────►│Pickup Food  │
    │   Request   │          │     Pickup     │       └─────────────┘
    └─────────────┘          └──────────────┘
           │                         │                        │
           └─────────────────────────┼────────────────────────┘
                                     ▼
                              ┌─────────────┐
                              │Rate & Review│
                              └─────────────┘
```

### 6. Spesifikasi Antarmuka

#### 6.1 User Interface
- **UI-001**: Splash screen dengan logo Refoodbish
- **UI-002**: Login/Register screen dengan form input
- **UI-003**: Home screen dengan list makanan terdekat
- **UI-004**: Detail screen untuk setiap listing makanan
- **UI-005**: Profile screen dengan informasi pengguna
- **UI-006**: Chat screen untuk komunikasi antar pengguna

#### 6.2 Hardware Interface
- **HI-001**: Kamera untuk mengambil foto makanan
- **HI-002**: GPS untuk deteksi lokasi
- **HI-003**: Network interface untuk koneksi internet

#### 6.3 Software Interface
- **SI-001**: Android API level 21 (Android 5.0) atau higher
- **SI-002**: Google Maps API untuk layanan peta
- **SI-003**: Firebase untuk notifikasi push
- **SI-004**: RESTful API untuk komunikasi dengan server

### 7. Constraint dan Asumsi

#### 7.1 Constraint
- Aplikasi hanya tersedia untuk platform Android
- Memerlukan koneksi internet untuk semua fungsi utama
- Memerlukan izin akses lokasi dan kamera

#### 7.2 Asumsi
- Pengguna memiliki smartphone Android dengan GPS
- Pengguna memiliki akses internet yang stabil
- Pengguna berusia minimal 18 tahun

---

**Dokumen ini disusun sebagai pedoman pengembangan aplikasi Refoodbish**
**Versi: 1.0**
**Tanggal: September 2025**
