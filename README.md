# Portfolio v2

Terminal-themed personal portfolio website with file system interface. Built with PHP for local development and static HTML/CSS/JS for GitHub Pages deployment.

## Overview

Minimalistic portfolio site mimicking a Unix terminal and file system.


## Tech Stack

- PHP (local development)
- HTML/CSS/JS (deployment)
- JSON (project data storage)
- Pure vanilla JavaScript (no frameworks)

## Local Development

Run with PHP built-in server:

```bash
php -S localhost:8080
```

Visit `http://localhost:8080` in browser.

## Available Commands

Terminal supports the following commands:

- `help` - Display available commands
- `ls` - List files and directories
- `cd [dir]` - Change directory
- `cat [file]` - Display file contents
- `pwd` - Print working directory
- `clear` - Clear terminal
- `whoami` - Display user information
- `neofetch` - Display system information

## Project Structure

```
websitev2/
├── index.php          # Main PHP file with embedded HTML
├── style.css          # Terminal styling and theme
├── script.js          # File system logic and command handling
├── projects.json      # Project data storage
└── README.md          # This file
```

## Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --bg-primary: #0a0e14;
    --text-primary: #00ff00;
    --text-blue: #4a9eff;
}
```

### File System Structure

Modify `fileSystem` object in `script.js` to add directories or files.

### ASCII Art

Update header in `index.php` to customize boot sequence and header art. Don't look at neofetch because I spect ~30 mins trying to get it to work lol

## Security

Basic web hardening implemented:
- CSP headers and meta tags
- XSS prevention with input sanitization
- HTML escaping for all user input
- Client-side rate limiting (50 commands/10s)
- Clickjacking protection
- MIME sniffing prevention

See SECURITY.md for detailed security documentation.


## License

MIT (FREE USE BABY!)

## Contact
If you like this and want to talk to me about stuff, contact me here
Branson Crawford
- Email: bransonancrawford@gmail.com
- GitHub: github.com/BransonCr
- LinkedIn: linkedin.com/in/branson-crawford-43651b333
