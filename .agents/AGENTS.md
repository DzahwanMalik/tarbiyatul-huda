# Coding Rules & Guidelines - Apps Dashboard (`apps/dashboard`)

Dokumen ini berisi aturan dan standar penulisan kode untuk pengembangan aplikasi **Dashboard** (`apps/dashboard`). Semua agen AI dan pengembang wajib mematuhi aturan berikut saat bekerja di workspace ini.

---

## 1. TypeScript & Type Definitions
- **Strict TypeScript**: Selalu gunakan TypeScript dengan *strict mode*. **Setiap variabel, fungsi, argumen, dan nilai kembalian (return) WAJIB memiliki tipe data yang eksplisit.** Sama sekali tidak menerima penggunaan `any` (secara eksplisit dilarang). Aturan ini juga ditegakkan secara paksa melalui ESLint.
- **Penyimpanan Type/Interface General**:
  - Tipe data atau interface yang bersifat *general* / terpakai di banyak tempat **dilarang** didefinisikan langsung di dalam file komponen atau page.
  - Simpan dan ekspor tipe data tersebut di dalam direktori `apps/dashboard/src/types/` (menggunakan path alias `@/types`).
  - *Exception*: Type/Props khusus yang hanya dipakai secara internal oleh satu komponen kecil boleh ditulis di file komponen tersebut.

---

## 2. Database & Supabase MCP Integrations
- Jika ada tugas atau implementasi yang berkaitan dengan database:
  - **Selalu lakukan riset schema/tabel terlebih dahulu** sebelum menulis query atau tipe data.
  - Manfaatkan **Supabase MCP Server** yang sudah terhubung untuk memeriksa struktur tabel, migrasi, maupun schema terkini secara akurat.

---

## 3. UI Design & Component System
- **Design System (`DESIGN.md`)**:
  - Untuk setiap implementasi UI/UX, **selalu acuan dan sesuaikan dengan [DESIGN.md](file:///d:/tarbiyatul-huda/apps/dashboard/DESIGN.md)** (palet warna, varian HSL/Hex, kontras, serta panduan tata letak).
- **Color Presets (`index.css`)**:
  - **Wajib** menggunakan preset warna yang sudah didefinisikan di `apps/dashboard/src/styles/index.css` (seperti `primary`, `secondary`, `accent`, `muted`, `destructive`, `card`, `popover`, `chart-1` s/d `chart-5`, dsb).
  - Jika Anda diberikan gambar referensi (mockup) yang memiliki kombinasi warna tertentu, **jangan** menggunakan *hardcoded hex/RGB* atau warna Tailwind default (seperti `bg-[#005ea1]` atau `text-blue-500`). Anda harus memetakan warna di gambar referensi tersebut ke variabel terdekat yang ada di `index.css`.
  - Gunakan utility class Tailwind yang terhubung dengan variabel tersebut (contoh: `bg-primary`, `text-primary`, `bg-primary/10` untuk background transparan/light, `text-muted-foreground`, dll).
- **Shadcn UI (Base UI)**:
  - Dashboard ini menggunakan komponen berbasis **Shadcn UI**. Selalu utamakan penggunaan komponen dari `src/components/` terlebih dahulu.
  - **Import Component**: Import komponen Shadcn **wajib** melalui `@/components/` (misal: `@/components/ui/button`) dan **dilarang** meng-import melalui `@baseui`.
  - **Komponen Belum Ter-install**: Jika fitur memerlukan komponen Shadcn UI yang belum ada di projek, **tanyakan kepada user terlebih dahulu** sebelum menjalankan perintah instalasi.
  - **Komponen Sudah Ter-install**: Dilarang menimpa (*replace*) atau meng-install ulang komponen Shadcn UI yang sudah ada di dalam projek.

---

## 4. Syntax & Structure Component
- **Arrow Function Syntax**: Selalu gunakan *arrow function* untuk membuat JSX Component:
  ```tsx
  const DashboardCard = () => {
    return (
      <div>...</div>
    );
  };
  ```
- **Export Default**: Gunakan `export default` di baris akhir file komponen:
  ```tsx
  export default DashboardCard;
  ```
- **Static Value Constants**: Variabel yang menampung *static value* / konstanta tetap (seperti data opsi, daftar menu, array statis) **wajib** menggunakan format nama `UPPER_SNAKE_CASE` / `UPPERCASE` (contoh: `const MENUS: Menu[] = [...]`).
- **Import Aliases**: Selalu gunakan path alias `@/` saat merujuk ke direktori `apps/dashboard/src/`:
  - `@/components/` untuk komponen (`apps/dashboard/src/components`)
  - `@/lib/` untuk utility / helper (`apps/dashboard/src/lib`)
  - `@/hooks/` untuk kustom hooks (`apps/dashboard/src/hooks`)
  - `@/types/` untuk tipe data/interface (`apps/dashboard/src/types`)

---

## 5. Standard Practices
- **React Hooks Dependencies**: Selalu pastikan *dependency array* pada React Hooks (`useEffect`, `useMemo`, `useCallback`, dll.) terisi secara lengkap dan optimal. Aturan ini diawasi secara ketat oleh ESLint (`react-hooks/exhaustive-deps`).
- **Import Ordering & Cleanup**:
  - Semua import wajib tersusun rapi mengikuti aturan `eslint-plugin-simple-import-sort`.
  - Hapus import yang tidak terpakai (*unused imports*) sesuai aturan `eslint-plugin-unused-imports`.
- **Clean Code**: Jaga kode tetap bersih, modular, dan terstruktur.
- **Preserve Existing Code**: Jangan menghapus utilitas atau konfigurasi yang sudah ada tanpa instruksi eksplisit.
