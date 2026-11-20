# DannLabs Portfolio — Plan & Final Changes

> Repo: `user4xn/dannlabs-portfolio`
> Branch: `redesign/warm-interactive-snowy`
> Domain: `https://dannlabs.my.id/`
> Status: **static design selesai (fase 1)** · public AI agent **ditunda (fase 2)**

---

## 1. Tujuan

Landing page portfolio pribadi untuk **Wildan Kurnia Candra** — *Backend Engineer & AI Agent Builder* — yang:

- Menjelaskan siapa dia dan nilai yang dia bawa dalam beberapa detik.
- Menampilkan karya terpilih dengan jujur (termasuk yang belum dirilis).
- Menunjukkan kemampuan integrasi AI (agent office) sebagai bagian dari branding, bukan gimmick.
- Ramah dibaca hirer: nyaman, hangat, hirarki jelas, dan terasa *crafted*, bukan template.

---

## 2. Scope & Keputusan Kunci

| Keputusan | Hasil |
|---|---|
| Teknologi | Static HTML + vanilla ES modules + custom CSS. **Tanpa** framework, bundler, npm, React, Next, Tailwind. |
| Public AI agent | **Ditunda ke fase 2** (dikerjakan terpisah, hands-on bersama Pak). |
| Snowy di hero | Kartu **konsep statis** (bukan chat), jujur ditandai "design concept" / "in development". |
| Avatar / foto | **Dihapus** dari hero. |
| Favicon | Favicon SVG Snowy (kucing putih), bukan favicon lama. |
| Repo | Repo baru `dannlabs-portfolio`, public, baseline dari `v2`. |

---

## 3. Tech Stack

- **HTML** — semantic shell (`index.html`)
- **CSS** — modular, `@import` per concern (tokens/base/layout/components/motion/responsive)
- **JS** — ES modules, vanilla (tanpa dependency)
- **Font** — Google Fonts: `DM Serif Display` (display), `DM Sans` (body), `JetBrains Mono` (metadata)
- **Deploy** — static copy ke `/var/www/dannlabs.my.id` via nginx (Certbot TLS sudah ada)

---

## 4. Struktur Direktori

```
index.html                        # semantic page shell
assets/
  favicon.svg                     # Snowy cat icon
  img/                            # project media
    shipdude.webp
    danzpos.webp
    owl-harbour.svg               # placeholder (ganti screenshot)
    cronsoul.svg                  # placeholder (ganti screenshot)
    lemparkoin-dashboard.webp
    (simple.webp, prasmanan-dashboard.webp, lemparkoin-alert.webp, og-cover.png — cadangan)
  cv-wildan-candra.pdf
src/
  js/
    main.js                       # composition root
    data/projects.js              # data project (edit di sini)
    components/projects.js        # render daftar project
    animations/swarm.js           # cursor swarm (desktop only)
    animations/reveal.js          # no-op (reveal dimatikan)
  styles/
    index.css                     # @import semua module
    tokens.css                    # variabel warna/type/spacing
    base.css                      # reset + typography dasar
    layout.css                    # header/sections/grid
    components.css                # project card, office panel, snowy card
    motion.css                    # keyframes (tanpa opacity gating)
    responsive.css                # breakpoint
design/
  COMMIT-SHEET.md                 # arah visual
  DESIGN.md                       # kontrak desain
deploy-dannlabs.sh                # deploy static-only
robots.txt · sitemap.xml
```

---

## 5. Konten Halaman (urutan)

1. **Header** — brand, nav (Work / Agents / Experience / Toolkit / About / Contact), status "available for good work".
2. **Hero** — eyebrow (role · lokasi), headline, paragraf, 2 CTA, Snowy concept card (kanan), metrics strip.
3. **Work** — daftar project bergantian kiri/kanan.
4. **Agents** — dark band, terminal "agent office / architecture" (case study).
5. **Pullquote** — "I build for the 3 a.m. incident, not the demo."
6. **About** — konteks singkat.
7. **Experience** — timeline 3 pekerjaan.
8. **Toolkit** — languages / frameworks / data / infra.
9. **Contact** — email + link GitHub/LinkedIn/CV.
10. **Footer** — tahun + "built with care · no trackers".

---

## 6. Project Showcase (5 item)

| # | Project | Tahun | Kategori | Stack | Status |
|---|---|---|---|---|---|
| 01 | ShipDude | 2026 | Deployment orchestration | Go · Docker · GitHub Actions | Selected work |
| 02 | Danz Pos | 2026 | Offline-first cashier PWA | React · Vite · PWA · Cloud sync | Selected work |
| 03 | Owl Harbour | 2023 | Vessel tracking & geofencing | Go · WebSocket · Node.js | Private product |
| 04 | CronSoul | 2026 | Cron scheduler & automation | Go · Cron · SQLite · Nginx | Selected work |
| 05 | Lemparkoin | 2025 | Donation & live overlay | Go · RabbitMQ · PostgreSQL | Built, not released |

> `SIMPLE — Ship Parking` diganti menjadi **Owl Harbour**.
> **CronSoul** ditambahkan.
> Screenshot asli menyusul; sementara memakai placeholder SVG.

---

## 7. Design System

### Warna
| Token | Nilai | Fungsi |
|---|---|---|
| `--paper` | `#f4f0e8` | background utama |
| `--ink` | `#171714` | teks utama |
| `--muted` | `#787269` | teks sekunder |
| `--line` | `#d7d0c3` | border/hairline |
| `--accent` | `#b84d2f` | aksen rust/orange |
| `--dark` | `#17191b` | dark band |

### Typography
- Display: `DM Serif Display` — headline, project title.
- Body: `DM Sans` — paragraf.
- Metadata: `JetBrains Mono` — label, nav, stack, status.

### Spacing
- Frame utama: `min(1080px, calc(100% - clamp(48px, 12vw, 200px)))`.
- Rhythm section: 100px desktop / 68px mobile.

### Motion
- Cursor swarm (desktop, touch-disabled, reduced-motion-disabled).
- Cat breathe animation pada Snowy.
- **Scroll-reveal dimatikan** — konten selalu tampil (lihat §8).

---

## 8. Final Changes (ringkasan commit)

| Commit | Isi |
|---|---|
| `788e634` | **Fix kritis:** hapus scroll-reveal opacity gating → konten selalu tampil |
| `97ade86` | Finalize static design; SIMPLE → Owl Harbour, tambah CronSoul |
| `eba326f` | Pindah Snowy chat ke hero companion |
| `502376b` | Ubah Snowy jadi streamed agent experience |
| `b674c86` | Tambah unit service public Snowy |
| `695be74` | Finish static portfolio + wire public agent |
| `46b2696` | Tambah public agent terisolasi |
| `7503e82` | Refactor: static vanilla architecture |

> Perubahan terakhir yang **benar-benar aktif di live** adalah hasil `788e634` + `97ade86`:
> - SIMPLE → Owl Harbour, tambah CronSoul.
> - Placeholder SVG untuk keduanya.
> - Snowy = konsep statis (bukan chat).
> - **Semua section selalu tampil (tidak ada blank).**

---

## 9. Deployment

```bash
# static-only (tidak menyentuh nginx config / tidak menjalankan agent)
sudo bash /home/user4xn/work/dannlabs-portfolio/deploy-dannlabs.sh
```

Script hanya copy file static ke `/var/www/dannlabs.my.id`, lalu `nginx -t && reload`.

> Catatan: file/folder di dalam `/var/www/dannlabs.my.id` dimiliki `user4xn`, tapi **root dir** milik `root:root` (755), sehingga file di level root (mis. `index.html`) harus di-overwrite dengan `cp` (bukan `install -D` yang butuh unlink).

---

## 10. Verifikasi Live (terakhir)

- Semua 11 section `opacity: 1` — **tidak ada blank section**.
- Hero headline tampil.
- 5 project tampil; SIMPLE hilang; Owl Harbour + CronSoul render.
- Tidak ada horizontal overflow di 1280px; mobile stack rapi.
- JS syntax + deploy script: OK.

---

## 11. Pending / Next

1. **Screenshot project asli** — ganti placeholder `owl-harbour.svg` dan `cronsoul.svg` (dan refresh media lain bila perlu).
2. **Public AI agent (fase 2)** — dibangun terpisah, hands-on bersama Pak. Source draft masih ada di `public-agent/` (tidak di-load oleh site).
3. **QA Zero + manual QA** — setelah design final.
4. **Merge ke `main`** — setelah Pak approve.
5. **Polish visual lanjutan** — bila Pak minta setelah review screenshot.

---

## 12. Batasan yang Dihormati

- Tidak menyentuh repo `user4xn/user4xn.github.io` (portfolio lama).
- Tidak menghapus/merusak credential; tidak ada secret di repo.
- Public agent **tidak** memakai kredensial Hermes.
- Deploy hanya mengubah file website, bukan nginx/systemd.
