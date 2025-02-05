const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const template = require('./src/templates/base');

// Configuration
const config = {
    contentDir: 'src/content',
    outputDir: 'dist',
    staticDirs: {
        css: 'src/css'
    }
};

// Ensure required directories exist
fs.ensureDirSync(config.outputDir);
fs.ensureDirSync(path.join(config.outputDir, 'css'));
fs.ensureDirSync(path.join(config.outputDir, 'blog'));

// Copy static assets
Object.entries(config.staticDirs).forEach(([dir, srcPath]) => {
    const destPath = path.join(config.outputDir, dir);
    fs.copySync(srcPath, destPath, { overwrite: true });
});

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
        
        // Calculate the output path relative to content directory
        const relativePath = path.relative(config.contentDir, dir);
        let outputPath;
        
        // Handle index.md specially
        if (file === 'index.md') {
            outputPath = path.join(config.outputDir, relativePath, 'index.html');
        } else {
            // For other files, create both file.html and file/index.html
            const baseName = file.replace('.md', '');
            outputPath = path.join(config.outputDir, relativePath, baseName + '.html');
            
            // Create directory index version (for cleaner URLs)
            const dirIndexPath = path.join(config.outputDir, relativePath, baseName, 'index.html');
            fs.ensureDirSync(path.dirname(dirIndexPath));
            fs.writeFileSync(dirIndexPath, template(title, htmlContent));
        }
        
        fs.ensureDirSync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, template(title, htmlContent));
    });
}

// Start processing from content directory
processMarkdownFiles(config.contentDir);

console.log('Build complete! Run npm start to serve the site.'); 