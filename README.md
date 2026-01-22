# Portfolio v3

Personal portfolio website with dual interface: Terminal CLI and GUI mode. Built with vanilla HTML/CSS/JS for GitHub Pages deployment.

## Overview

Portfolio site with two interaction modes:
- **Terminal Mode**: Unix-like terminal with file system interface and command line
- **GUI Mode**: Modern graphical interface with mouse navigation

Switch between modes using the toggle buttons in the top-right corner.

## Tech Stack

- HTML5 / CSS3 / JavaScript (ES6+)
- No frameworks - pure vanilla implementation
- JSON for project data storage
- LocalStorage for mode preference persistence

## Local Development

Open `index.html` directly in a browser, or serve with any static file server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Visit `http://localhost:8080` in browser.

## Features

### Terminal Mode
- Unix-like file system navigation
- Command history with arrow keys
- Tab completion for directories
- Clickable directory links
- Commands: `help`, `ls`, `cd`, `cat`, `pwd`, `clear`, `whoami`, `neofetch`, `gui`

### GUI Mode
- Modern card-based layout
- Responsive design for all screen sizes
- Sections: About, Projects, Skills, Contact
- Interactive hover effects
- Skill level visualization

## Project Structure

```
/
├── index.html           # Main entry point
├── css/
│   ├── main.css         # Shared styles and variables
│   ├── terminal.css     # Terminal mode styles
│   └── gui.css          # GUI mode styles
├── js/
│   ├── main.js          # Shared data and mode switching
│   ├── terminal.js      # Terminal logic and commands
│   └── gui.js           # GUI rendering and interactions
├── data/
│   └── projects.json    # Project data
└── README.md
```

## Customization

### Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --bg-primary: #0a0e14;
    --text-primary: #00ff00;
    --text-blue: #4a9eff;
    --accent: #ff6b00;
}
```

### Projects

Update `data/projects.json` with your project information.

### Skills & Personal Info

Modify the `skillsData` and `personalInfo` objects in `js/main.js`.

### File System

Modify the `fileSystem` object in `js/terminal.js` to customize terminal directories and files.

## Security

Basic web hardening implemented:
- XSS prevention with input sanitization
- HTML escaping for all user input
- Client-side rate limiting (50 commands/10s)
- Security meta tags (X-Frame-Options, X-Content-Type-Options, etc.)

## License

MIT

## Contact

Branson Crawford
- Email: bransonancrawford@gmail.com
- GitHub: github.com/BransonCr
- LinkedIn: linkedin.com/in/branson-crawford-43651b333
