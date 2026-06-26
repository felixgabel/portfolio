**You only need three favicon files (https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs).**

# How to correctly add favicons

1. Create icon in Figma and export as icon.svg
2. If not installed:

```bash
brew install imagemagick librsvg
```

3. Generate 32x32 favicon.ico and apple-touch-icon.png with padding:

```bash
rsvg-convert -w 32 -h 32 icon.svg | magick - favicon.ico
rsvg-convert -w 130 -h 130 icon.svg | magick - -background "#fafafa" -gravity center -extent 180x180 apple-touch-icon.png
```

4. To enable inverted colors of favicon in dark mode add `<style>.a{fill:#333}@media (prefers-color-scheme:dark){.a{fill:#eee}}</style>` to icon.svg and replace the `fill=""` property inside the `<path>` with `class="a"`
