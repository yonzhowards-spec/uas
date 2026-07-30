# 🍽 Food Ordering Management System

Aplikasi **Food Ordering Management System** adalah aplikasi pemesanan makanan berbasis web yang digunakan untuk mengelola menu makanan, pesanan customer, dan pengelolaan data oleh manager.

Project ini dibuat menggunakan teknologi **HTML5, CSS3, JavaScript, Node.js, Express.js, MySQL, REST API, dan Fetch API**.

---

## 📌 Fitur Aplikasi

### 👤 Login System

* Login menggunakan email dan password
* Sistem role user:

  * Customer
  * Manager
* Penyimpanan session menggunakan Local Storage
* Logout user

---

### 👥 Customer

Customer dapat:

* Melihat daftar menu makanan dan minuman
* Memilih menu
* Menambahkan makanan ke keranjang
* Mengatur jumlah pesanan
* Melakukan checkout
* Melihat detail pesanan

---

### 👨‍💼 Manager

Manager dapat:

* Melihat seluruh pesanan customer
* Mengelola data menu
* Mengubah status pesanan
* Melihat dashboard pemesanan

---

## 🛠 Teknologi Yang Digunakan

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* DOM Manipulation

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

## 📂 Struktur Folder

```
food_ordering/

│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── database/
│
├── frontend/
│   ├── login.html
│   ├── index.html
│   ├── dashboard.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── login.js
│       ├── app.js
│       └── dashboard.js
│
└── README.md
```

---

# 🗄 Database

Database yang digunakan:

```
food_ordering
```

## Tabel Users

Menyimpan data pengguna aplikasi.

Kolom:

| Field    | Keterangan         |
| -------- | ------------------ |
| id_user  | Primary Key        |
| nama     | Nama pengguna      |
| email    | Email pengguna     |
| password | Password pengguna  |
| role     | Customer / Manager |

---

## Tabel Menu

Menyimpan daftar makanan dan minuman.

Kolom:

| Field     | Keterangan   |
| --------- | ------------ |
| id_menu   | Primary Key  |
| nama_menu | Nama makanan |
| harga     | Harga menu   |
| kategori  | Jenis menu   |

---

## Tabel Orders

Menyimpan data transaksi pemesanan.

Kolom:

| Field    | Keterangan       |
| -------- | ---------------- |
| id_order | Primary Key      |
| id_user  | Foreign Key      |
| total    | Total pembayaran |
| status   | Status pesanan   |
| tanggal  | Waktu pemesanan  |

---

# 🚀 Cara Menjalankan Project

## 1. Install Dependencies Backend

Masuk ke folder backend:

```
cd backend
```

Install package:

```
npm install
```

---

## 2. Jalankan Server

Jalankan:

```
node server.js
```

Jika berhasil akan muncul:

```
Server running on port 3000
```

---

## 3. Menjalankan Database

1. Buka XAMPP

2. Aktifkan:

   * Apache
   * MySQL

3. Masuk ke phpMyAdmin

```
http://localhost/phpmyadmin
```

4. Import file database SQL.

---

## 4. Menjalankan Frontend

Buka:

```
login.html
```

Menggunakan browser atau Live Server VS Code.

---

# 🔌 REST API Endpoint

## User

### Login

```
POST /users/login
```

---

## Menu

### Menampilkan semua menu

```
GET /menu
```

### Menampilkan menu berdasarkan ID

```
GET /menu/:id
```

### Menambah menu

```
POST /menu
```

### Mengubah menu

```
PUT /menu/:id
```

### Menghapus menu

```
DELETE /menu/:id
```

---

## Order

### Melihat semua pesanan

```
GET /orders
```

### Membuat pesanan

```
POST /orders
```

### Mengubah status pesanan

```
PUT /orders/:id
```

---

# ✅ Validasi Sistem

Aplikasi memiliki validasi:

* Email harus sesuai format
* Password tidak boleh kosong
* Data menu tidak boleh kosong
* Jumlah pesanan harus valid
* Form wajib diisi

---

# 🎨 Tampilan

Fitur desain:

* Responsive layout
* Flexbox
* Grid layout
* Hover animation
* Button styling
* Dashboard manager
* Cart system

---

# 👨‍💻 Developer

Food Ordering Management System

Dibuat sebagai project aplikasi berbasis web menggunakan:

HTML5 + CSS3 + JavaScript + Node.js + Express.js + MySQL

---

# 📄 License

Project ini dibuat untuk tujuan pembelajaran dan pengembangan aplikasi web.
