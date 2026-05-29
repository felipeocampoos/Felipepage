# Felipe Ocampo — Personal CV / Profile Page

A clean, minimalist personal CV page (academic *al-folio* style) built with
plain HTML, CSS, and JavaScript — no build step, no frameworks, no external
dependencies. Designed to be hosted for free on **GitHub Pages**.

## Structure

```
.
├── index.html        # All page content (edit this)
├── styles.css        # Styling and theme colors
├── script.js         # Active-nav highlight + footer year
├── assets/           # Placeholder images (replace with your own)
│   ├── avatar.svg
│   ├── pub1.svg
│   └── pub2.svg
├── .nojekyll         # Tells GitHub Pages to serve files as-is
└── README.md
```

## How to edit your content

All editable text in `index.html` is marked with `<!-- EDIT: ... -->` comments.
Open the file and update:

- **Hero:** your name, role, bio, and social links (email, GitHub, LinkedIn,
  Google Scholar). Delete any social link you don't use.
- **About:** a longer summary paragraph.
- **Experience / Education:** duplicate a `<li class="timeline__item">` block
  for each entry.
- **Publications:** duplicate a `<li class="pub">` block per paper; your own
  name is `<strong>` so it stands out among co-authors.
- **Skills:** rename the groups and chips.

### Replace the images

Put your own files in `assets/` and update the `src` in `index.html`:

- Avatar: replace `assets/avatar.svg` with e.g. `assets/avatar.jpg` (square
  works best — it's cropped to a circle).
- Publication thumbnails: replace `assets/pub1.svg` / `assets/pub2.svg`.

### Change the colors

Edit the CSS variables at the top of `styles.css` (`:root { ... }`) — the
accent color and backgrounds are defined once there.

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish on GitHub Pages

1. Push this repo to GitHub (branch `claude/github-profile-cv-VpbDi`, or merge
   it into `main`).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the branch (e.g. `main`) and the `/ (root)` folder, then **Save**.
5. Your site will be live at `https://felipeocampoos.github.io/felipepage/`.

The page also prints cleanly (Ctrl/Cmd+P), so it doubles as a printable CV.
