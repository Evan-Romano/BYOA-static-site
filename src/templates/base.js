module.exports = (title, content) => `
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