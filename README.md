# Visioneering

Source for [visioneering.org](https://visioneering.org) — the home of MrLucky1x and the Visioneering project.

## Structure

- `site/` — the deployed static site (HTML, CSS, JS, assets). This folder is what GitHub Pages publishes.
- `mrlucky1x-profile.md` — artist profile / reference doc.
- `visioneering-manifesto.md` — project manifesto.

## Deployment

The `.github/workflows/pages.yml` workflow uploads the contents of `site/` to GitHub Pages on every push to `main`.

The `site/CNAME` file binds the deployment to the `visioneering.org` domain. DNS for `visioneering.org` must point to GitHub Pages:

- Apex `visioneering.org` → A records:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www.visioneering.org` → CNAME `hansons.github.io`

## Local preview

Any static file server works. For example:

```sh
cd site
python -m http.server 8000
# then open http://localhost:8000
```
