# Technical Test App Dev

Monorepo Turborepo untuk technical test App Dev. Stack yang dipakai:

- `apps/api`: NestJS API, TypeScript, ESM
- `apps/web`: React Vite TypeScript + Ant Design, ESM
- `packages/shared`: shared API contract/type untuk frontend dan backend

Reviewer cukup menjalankan app lalu membuka halaman web. Semua jawaban bisa dites dari UI tanpa perlu menjalankan `curl`.

## Requirement

- Node.js `22+`
- pnpm `10+`

Node 22 dibutuhkan karena jawaban SQL memakai built-in SQLite module `node:sqlite`.

## Setup

```bash
pnpm install
```

Salin env example jika belum ada:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

## Menjalankan Development

```bash
pnpm dev
```

Turborepo akan menampilkan TUI/tab untuk proses API dan Web.

Default URL:

- Web: `http://localhost:5173`
- API: `http://localhost:3000/api`

Jika port web `5173` sedang dipakai, Vite akan otomatis memakai port berikutnya, misalnya `5174`.

## Build dan Production Start

```bash
pnpm build
pnpm start
```

`pnpm start` menjalankan:

- API dari `apps/api/dist/main.js`
- Web via `vite preview`

Default preview web:

- `http://localhost:4173`

## Environment

API env ada di `apps/api/.env`:

```env
API_PORT=3000
API_PREFIX=api
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173

JWT_SECRET=change-me
JWT_EXPIRES_IN=1h

COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
OAUTH_STATE_COOKIE_MAX_AGE_MS=300000
ACCESS_TOKEN_COOKIE_MAX_AGE_MS=3600000

RANDOM_USER_API_URL=https://randomuser.me/api/
RANDOM_USER_API_SEED=technical-test
```

Web env ada di `apps/web/.env`:

```env
WEB_HOST=0.0.0.0
WEB_PORT=5173
WEB_PREVIEW_PORT=4173
VITE_API_URL=http://localhost:3000/api
```

## Struktur Project

```txt
apps/
  api/
    src/
      config/
      features/
        auth/
        checkout/
        random-user/
        sql-sample/
        array-manipulation/
  web/
    src/
      app/
      shared/
      features/
        auth/
        checkout/
        random-user/
        sql-sample/
        array-manipulation/
        technical-test/
packages/
  shared/
    src/
      auth.ts
      checkout.ts
      random-user.ts
      sql-sample.ts
      array-manipulation.ts
      index.ts
```

## Shared Package

`packages/shared` hanya berisi contract/type yang dipakai lintas frontend dan backend. Logic yang hanya dipakai backend tetap berada di backend.

Contract yang dibagikan:

- `CheckoutRequest`, `CheckoutResponse`
- `AuthResponse`, `AuthMeResponse`, `JwtSessionContext`, `MessageResponse`
- `ListUser`, `RandomUsersResponse`
- `SqlJoinRow`, `SqlSampleResponse`
- `ArrayManipulationRequest`, `ArrayManipulationResponse`

Semua package utama memakai ESM:

- `apps/api/package.json`: `"type": "module"`
- `apps/web/package.json`: `"type": "module"`
- `packages/shared/package.json`: `"type": "module"`

## Jawaban Technical Test

Halaman utama menampilkan tab untuk semua jawaban:

1. `Checkout`
2. `Autentikasi`
3. `SQLite`
4. `RandomUser`
5. `Manipulasi Array`

### Jawaban 1: Checkout

Lokasi backend:

- `apps/api/src/features/checkout`

Endpoint:

- `GET /api/checkout/sample`
- `POST /api/checkout`

Default sesuai soal:

- Harga barang: `5.000.000`
- Voucher: `50%`
- Diskon: `2.500.000`
- Total bayar: `2.500.000`
- Poin: `2%` dari voucher yang digunakan, hasilnya `50.000`

Di frontend, tab Checkout menyediakan tombol untuk menjalankan sample dan mengirim input custom.

### Jawaban 2: OAuth + Cookie JWT

Lokasi backend:

- `apps/api/src/features/auth`

Endpoint:

- `GET /api/auth/oauth/start`
- `GET /api/auth/oauth/callback`
- `POST /api/auth/oauth/mock-login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

Implementasi:

- JWT disimpan di cookie `access_token`
- Cookie memakai mode `httpOnly`
- Context JWT berisi `id`, `username`, `iat`, dan `exp`
- Username dibuat unique untuk simulasi local login

Di frontend, tab Autentikasi menyediakan tombol login mock, cek sesi, dan logout. Token cookie bisa dicek lewat browser DevTools, bagian Application, Cookies.

### Jawaban 3: SQL User dan Company

Lokasi backend:

- `apps/api/src/features/sql-sample`

Endpoint:

- `GET /api/sql-sample`

Implementasi:

- Database: SQLite in-memory via `node:sqlite`
- Membuat table `users` dan `companies`
- Seed data sesuai soal
- Menjalankan query JOIN untuk menghasilkan data akhir

Query inti:

```sql
SELECT
  u.id AS user_id,
  c.id AS company_id,
  u.nama,
  u.email,
  u.telp,
  c.company_code,
  c.company_name
FROM users u
JOIN companies c ON c.user_id = u.id;
```

Di frontend, tab SQLite menampilkan schema, seed data, query, dan hasil rows.

### Jawaban 4: RandomUser API dan Table Ant Design

Lokasi backend:

- `apps/api/src/features/random-user`

Lokasi frontend:

- `apps/web/src/features/random-user`

Endpoint:

- `GET /api/random-users?results=10&page=1&search=`

Implementasi backend:

- Fetch data dari `https://randomuser.me/api/`
- Query `results` dan `page` dinamis
- Response RandomUser ditransformasi menjadi contract `ListUser`
- Search diproses di backend berdasarkan data hasil transformasi

Bentuk data hasil transform:

```ts
type ListUser = {
  name: string;
  location: string;
  email: string;
  age: number;
  phone: string;
  cell: string;
  picture: string[];
};
```

Implementasi frontend:

- React TypeScript
- Ant Design table
- Search memanggil API lagi dengan debounce
- Tombol `New Data` mengambil page berikutnya
- Tampilan list mengikuti contoh pada PDF

### Jawaban 5: Manipulasi Array

Lokasi backend:

- `apps/api/src/features/array-manipulation`

Endpoint:

- `GET /api/array-manipulation/sample`
- `POST /api/array-manipulation`

Input sample:

```ts
colors = ["merah", "kuning", "hijau", "pink", "ungu"];
products = ["baju", "celana", "topi", "jaket", "sepatu"];
promos = ["Diskon", "Sale", "Diskon", "Sale", "Sale"];
```

Output sample:

```ts
[
  "Baju Merah Diskon",
  "Celana Hijau Sale",
  "Topi Kuning Diskon",
  "Jaket Ungu Sale",
  "Sepatu Pink Sale"
]
```

Jika warna ditambah `maroon`, output tambahan:

```ts
"Baju Maroon Diskon"
```

Di frontend, tab Manipulasi Array menyediakan sample dan input custom.

## Quality Check

Command yang dipakai untuk validasi:

```bash
pnpm typecheck
pnpm build
```

Keduanya harus berhasil sebelum app dianggap siap direview.
