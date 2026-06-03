# 🌹 Our Story — Digital Love Scrapbook

A complete romantic website project built with pure HTML, CSS, and JavaScript.

## 📁 File Structure

```
love-story/
├── index.html        ← Home / Landing page
├── story.html        ← Timeline / Scrapbook
├── gallery.html      ← Photo gallery + Scratch cards
├── final.html        ← Final romantic message
├── css/
│   └── style.css     ← All styles
├── js/
│   ├── main.js       ← Hearts, music, transitions, scroll animations
│   ├── story.js      ← Timeline & quote rotation
│   ├── gallery.js    ← Gallery modal & tilt effects
│   ├── scratch.js    ← Canvas scratch card
│   └── confetti.js   ← Confetti effect
├── images/           ← Add your photos here
└── audio/
    └── romance.mp3   ← Add your background music here
```

## 🎵 Adding Music

Place any `.mp3` file in the `audio/` folder and name it `romance.mp3`.
Royalty-free romantic music suggestions:
- https://pixabay.com/music/search/romantic/
- https://freemusicarchive.org

## 📷 Adding Photos

Replace the emoji placeholders by adding images to the `images/` folder.

In `gallery.html`, update each gallery item like this:
```html
<div class="gallery-item" data-src="images/photo1.jpg" data-label="Our first date">
  <img src="images/photo1.jpg" alt="Our first date" />
  <div class="gallery-overlay"><span>Our First Date ❤️</span></div>
</div>
```

In `story.html`, replace `polaroid-placeholder` divs with:
```html
<img src="images/photo1.jpg" alt="Memory" />
```

## 🚀 How to Run

Simply open `index.html` in any modern browser.
For music autoplay to work, use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

Then visit `http://localhost:8000`

## ✨ Customization

- **Names & Dates**: Edit the text in each HTML file
- **Colors**: Change CSS variables in `css/style.css` (`:root` section)
- **Quotes**: Edit the `quotes` array in `js/story.js`
- **Final message**: Edit the `messages` array at the bottom of `final.html`

## 💝 Features

- ✅ Loading screen with animated progress bar
- ✅ Floating hearts & petals generator
- ✅ Background music with toggle button
- ✅ Page transition animations
- ✅ Timeline / scrapbook layout
- ✅ Polaroid-style photo cards with random rotation
- ✅ Scroll animations (fade, slide, zoom)
- ✅ Typewriter text effect
- ✅ Rotating romantic quotes
- ✅ Sticky notes design elements
- ✅ Parallax background sections
- ✅ Gallery grid with hover tilt effects
- ✅ Click-to-enlarge photo modal
- ✅ Canvas scratch cards (3 hidden surprises)
- ✅ Confetti animation on final page
- ✅ Glassmorphism effects throughout
- ✅ Fully mobile responsive
- ✅ Dark romantic color theme option
