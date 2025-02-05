# Simple Static Site Generator

A minimal static site generator that converts Markdown to HTML. No complicated frameworks, just simple tools.

## Features

- Markdown to HTML conversion
- Blog support
- Responsive design
- Simple and fast
- No complex dependencies

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create content:
   - Put your Markdown files in the `src` directory
   - Blog posts go in `src/blog`
   - Static assets (CSS, images) go in their respective folders in `src`

3. Build the site:
   ```bash
   npm run build
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. View your site at `http://localhost:3000`

## File Structure

```
.
├── src/
│   ├── index.md        # Home page
│   ├── about.md        # About page
│   ├── faq.md         # FAQ page
│   ├── blog/          # Blog posts
│   └── css/           # Stylesheets
├── dist/              # Generated site
├── build.js           # Build script
└── package.json
```

## Creating Content

### Pages
Create Markdown files in the `src` directory. The first line should be a level-1 heading (#) which will be used as the page title.

### Blog Posts
Add your blog posts as Markdown files in the `src/blog` directory. Use the same format as pages.

## Customization

- Edit `build.js` to modify the HTML template
- Modify `src/css/style.css` to change the site's appearance
- Add more sections to the navigation by editing the template in `build.js`

