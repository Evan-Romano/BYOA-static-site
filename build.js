const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

// Base template for all pages
const template = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
    </nav>
    <main>
        ${content}
    </main>
    <footer>
        <p>&copy; ${new Date().getFullYear()} Your Name</p>
    </footer>
</body>
</html>
`;

// Ensure required directories exist
fs.ensureDirSync('dist');
fs.ensureDirSync('dist/css');
fs.ensureDirSync('dist/blog');

// Copy static assets
fs.copySync('src/css', 'dist/css', { overwrite: true });

// Process Markdown files
function processMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processMarkdownFiles(fullPath);
            return;
        }
        
        if (path.extname(file) !== '.md') return;
        
        const content = fs.readFileSync(fullPath, 'utf-8');
        const htmlContent = marked(content);
        const title = content.split('\n')[0].replace('#', '').trim();
        
        const relativePath = path.relative('src', dir);
        let outputPath;
        
        // Handle index.md specially
        if (file === 'index.md') {
            outputPath = path.join('dist', relativePath, 'index.html');
        } else {
            // For other files, create both file.html and file/index.html
            const baseName = file.replace('.md', '');
            outputPath = path.join('dist', relativePath, baseName + '.html');
            
            // Create directory index version (for cleaner URLs)
            const dirIndexPath = path.join('dist', relativePath, baseName, 'index.html');
            fs.ensureDirSync(path.dirname(dirIndexPath));
            fs.writeFileSync(dirIndexPath, template(title, htmlContent));
        }
        
        fs.ensureDirSync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, template(title, htmlContent));
    });
}

// Start processing from src directory
processMarkdownFiles('src');

console.log('Build complete!'); 