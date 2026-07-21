# Publishing guide — Mẫu Chi Uyên website + handbook page

## What's in this folder

```
mau-chi-uyen-site/
├── index.html        ← homepage (unchanged content, just re-pointed to CDN fonts/libraries)
├── handbook.html      ← NEW: "Dìu Mẹ Đón Con" handbook intro + request form
├── style.css          ← all site styling (shared by both pages)
├── content.js         ← homepage bilingual text (VI/ZH) — the "01" program card now links to handbook.html
├── app.js              ← homepage React components
└── images/
    └── logo.png
```

Both pages share `style.css`, so any edit you make there (colors, spacing, fonts) applies everywhere automatically.

## 1. Before you publish: two things to finish

### a) Set up the request form (Formspree)

`handbook.html` currently posts to a placeholder:

```html
<form id="handbook-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

To make it actually deliver submissions to your inbox:

1. Go to **formspree.io** and create a free account with the email you want submissions sent to (e.g. hello@mauchiuyen.tw).
2. Create a new form — Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In `handbook.html`, replace `YOUR_FORM_ID` with that ID.
4. Formspree will ask you to confirm your email once (a test submission triggers this) — do a test submission after publishing to activate it.

The free tier covers 50 submissions/month, which is generous for a handbook request form. No backend or database needed — submissions land straight in your email.

### b) Fill in the real 10-chapter list (optional but recommended)

I only had confirmed titles for chapter 1 ("Xác nhận mang thai / 確認懷孕") and chapter 10 ("Thủ tục trợ cấp cho gia đình di dân mới / 新住民補助申請") from your progress reports — I didn't have the actual handbook file, so I didn't invent titles for chapters 2–9. In `handbook.html`, find the `<!-- ================= WHAT'S INSIDE ================= -->` section and replace the "8 chương giữa..." placeholder row with the real chapter titles if you'd like the full breakdown shown.

## 2. Publish to GitHub Pages

If you already have the `Mau-Chi-Uyen` repo live on GitHub Pages, this is just a file swap:

```bash
# from inside your existing repo folder
cp /path/to/mau-chi-uyen-site/*.* .
cp -r /path/to/mau-chi-uyen-site/images .

git add .
git commit -m "Add handbook page, link from Programs section, switch fonts to CDN"
git push
```

GitHub Pages rebuilds automatically within about a minute of the push.

### If you're starting a fresh repo

```bash
mkdir mau-chi-uyen-site && cd mau-chi-uyen-site
git init
# copy index.html, handbook.html, style.css, content.js, app.js, images/ into this folder
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub:

1. Go to your repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. GitHub gives you a URL like `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Custom domain (if mauchiuyen.tw is already yours)

In the same **Settings → Pages** panel, enter the domain under **Custom domain**, then add these DNS records at your domain registrar:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-username>.github.io` |

DNS changes can take a few hours to propagate. GitHub will show a green checkmark in Settings → Pages once it verifies.

## 3. Quick local preview before pushing

Since the homepage compiles JSX in-browser, it needs to be served over `http://`, not opened directly as a `file://` path (browsers block some of this over `file://`). From inside the folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html` and `http://localhost:8000/handbook.html` in your browser to check both pages before pushing.

## 4. What changed under the hood (technical notes)

- The original file you uploaded was a self-contained "preview bundle" (all fonts and libraries base64-embedded, ~16MB). For a real GitHub Pages deployment that's unnecessarily heavy, so I re-pointed everything to public CDNs instead:
  - Merriweather + Nunito → Google Fonts
  - LXGW WenKai TC → jsDelivr (`lxgw-wenkai-tc-webfont`)
  - React / ReactDOM / Babel standalone → unpkg
- `content.js` and `app.js` are otherwise your exact existing homepage code — I only added an `href`/`linkLabel` field to the "Dìu Mẹ Đón Con" program card and a small conditional in the `Programs` component so that card renders as a clickable link to `handbook.html`.
- `handbook.html` is plain HTML/CSS/vanilla JS (no React) — it reuses your existing CSS classes so it looks native to the site, and syncs its language toggle with the homepage via the same `localStorage` key (`mcu-lang`), so switching language on one page carries over to the other.
