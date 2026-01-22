// Terminal Mode JavaScript
let commandHistory = [];
let historyIndex = -1;
let currentDir = '~';

// Rate limiting
let commandCount = 0;
let lastResetTime = Date.now();
const RATE_LIMIT = 50;
const RATE_WINDOW = 10000;

function checkRateLimit() {
    const now = Date.now();
    if (now - lastResetTime > RATE_WINDOW) {
        commandCount = 0;
        lastResetTime = now;
    }
    if (commandCount >= RATE_LIMIT) {
        return false;
    }
    commandCount++;
    return true;
}

// Virtual file system with updated skills from resume
const fileSystem = {
    '~': {
        'README.txt': {
            type: 'file',
            content: `BRANSON CRAWFORD
Computer Science Major & Mathematics Minor
University of British Columbia Okanagan
3rd Year Student | GPA: 4.00/4.0 | Dean's Scholar (2024-25)

Focused on systems programming, networking, and database design.
Building low-level tools and understanding how software works at the core.

Type 'ls' to explore directories or 'help' for available commands.`
        },
        'projects': {
            type: 'dir',
            description: 'Software projects and implementations'
        },
        'skills': {
            type: 'dir',
            description: 'Technical skills and proficiencies'
        },
        'contact': {
            type: 'dir',
            description: 'Contact information and links'
        }
    },
    '~/projects': {
        'list.txt': {
            type: 'file',
            content: null // Generated dynamically
        }
    },
    '~/skills': {
        'languages.txt': {
            type: 'file',
            content: `PROGRAMMING LANGUAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFICIENT IN:
C              [████████████████████] Advanced
Java           [█████████████████   ] Advanced
Python         [█████████████████   ] Advanced
JavaScript     [████████████████    ] Intermediate/Advanced

FAMILIAR WITH:
R, TypeScript, Rust, MIPS, C++`
        },
        'tools.txt': {
            type: 'file',
            content: `DEVELOPMENT TOOLS & FRAMEWORKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEB FRAMEWORKS:
Flask, FastAPI, HTML5, TailwindCSS

VERSION CONTROL & DEVOPS:
Git, Docker

DATABASES:
MySQL, PostgreSQL

OTHER:
Unity (Game Development)

DATA SCIENCE:
NumPy, Matplotlib`
        },
        'specializations.txt': {
            type: 'file',
            content: `SPECIALIZATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Systems Programming
  Building low-level tools and understanding software at the core

> Database Design & Internals
  RDBMS implementation, query optimization, B+ tree indexing

> Network Protocols
  TCP/IP, socket programming, client-server architecture

> Low-level Development
  Memory management, performance optimization, C programming

> Web Application Architecture
  Full-stack development, RESTful APIs, MVC patterns`
        }
    },
    '~/contact': {
        'info.txt': {
            type: 'file',
            content: `CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMAIL:    bransonancrawford@gmail.com
PHONE:    250-462-9409
GITHUB:   https://github.com/BransonCr
LINKEDIN: https://linkedin.com/in/branson-crawford-43651b333

Available for collaboration, opportunities, and interesting projects.`
        }
    }
};

// Commands
const commands = {
    help: () => {
        return `AVAILABLE COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
ls              List files and directories in current location<br>
cd [dir]        Change directory (use 'cd ..' to go back)<br>
cat [file]      Display contents of a file<br>
pwd             Print working directory<br>
clear           Clear terminal screen<br>
help            Display this help message<br>
whoami          Display current user information<br>
neofetch        Display system information<br>
gui             Switch to GUI mode<br>
<br>
EXAMPLES<br>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
ls              # List current directory<br>
cd projects     # Enter projects directory<br>
cat README.txt  # Read README file<br>
cd ..           # Go back to parent directory<br>`;
    },

    ls: () => {
        const dirContents = fileSystem[currentDir];
        if (!dirContents) return `<span class="error">Error: Directory not found</span>`;

        let result = '';
        for (const [name, item] of Object.entries(dirContents)) {
            if (item.type === 'dir') {
                result += `drwxr-xr-x  2 bransoncr users  4096 Jan 21 2026 <span class="dir-link" data-dir="${escapeHtml(name)}">${escapeHtml(name)}/</span><br>`;
            } else {
                const size = item.content ? item.content.length : 0;
                result += `-rw-r--r--  1 bransoncr users  ${size.toString().padStart(4)} Jan 21 2026 ${escapeHtml(name)}<br>`;
            }
        }
        return result;
    },

    cd: (args) => {
        if (!args[0]) {
            currentDir = '~';
            updatePrompt();
            return '';
        }

        const target = sanitizeInput(args[0]);

        if (target === '..') {
            if (currentDir === '~') {
                return `<span class="error">Error: Already at root directory</span>`;
            }
            const parts = currentDir.split('/');
            parts.pop();
            currentDir = parts.join('/') || '~';
            updatePrompt();
            return '';
        }

        if (target === '~' || target === '/') {
            currentDir = '~';
            updatePrompt();
            return '';
        }

        const newPath = currentDir === '~' ? `~/${target}` : `${currentDir}/${target}`;

        if (fileSystem[newPath]) {
            currentDir = newPath;
            updatePrompt();
            return '';
        }

        return `<span class="error">cd: ${escapeHtml(target)}: No such file or directory</span>`;
    },

    cat: (args) => {
        if (!args[0]) {
            return `<span class="error">cat: missing file operand</span>`;
        }

        const fileName = sanitizeInput(args[0]);
        const dirContents = fileSystem[currentDir];

        if (!dirContents || !dirContents[fileName]) {
            return `<span class="error">cat: ${escapeHtml(fileName)}: No such file or directory</span>`;
        }

        const file = dirContents[fileName];

        if (file.type === 'dir') {
            return `<span class="error">cat: ${escapeHtml(fileName)}: Is a directory</span>`;
        }

        if (fileName === 'list.txt' && currentDir === '~/projects') {
            return generateProjectsList();
        }

        const content = file.content ? file.content.replace(/\n/g, '<br>') : '';
        return content || `<span class="error">cat: ${escapeHtml(fileName)}: File is empty</span>`;
    },

    pwd: () => {
        const path = currentDir === '~' ? '/home/bransoncr' : `/home/bransoncr/${currentDir.substring(2)}`;
        return path;
    },

    clear: () => {
        const output = document.getElementById('output');
        if (output) output.innerHTML = '';
        return null;
    },

    whoami: () => {
        return `bransoncr

USER PROFILE<br>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
NAME:        Branson Crawford<br>
ROLE:        Computer Science Student<br>
UNIVERSITY:  UBC Okanagan<br>
YEAR:        3rd Year<br>
GPA:         4.00/4.0<br>
ACHIEVEMENT: Dean's Scholar (2024-25)<br>
MAJOR:       Computer Science<br>
MINOR:       Mathematics<br>
FOCUS:       Systems Programming, Networking, Databases<br>
STATUS:      Active<br>
SHELL:       /bin/bash`;
    },

    neofetch: () => {
        return `      ___           bransoncr@portfolio<br>
     (.. |          ─────────────────────<br>
     (<> |          OS: Portfolio Linux x86_64<br>
    / __  \\         Host: GitHub Pages<br>
   ( /  \\ /|        Kernel: 6.1.0-branson<br>
  _/\\ __)/_)        Uptime: ${Math.floor(Date.now() / 86400000)} days<br>
  \\/-____\\/         Shell: bash 5.2.15<br>
                    Resolution: 1920x1080<br>
                    DE: Terminal UI<br>
                    Theme: Terminal-Green<br>
                    CPU: Intel i7-Networking<br>
                    Memory: 0x${Math.floor(Math.random() * 16777215).toString(16)}`;
    },

    gui: () => {
        setMode('gui');
        return 'Switching to GUI mode...';
    }
};

function generateProjectsList() {
    if (!projects || projects.length === 0) {
        return `No projects found.`;
    }

    let result = `PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
<br>`;

    projects.forEach((project, index) => {
        result += `<span class="project-header">[${index + 1}] ${escapeHtml(project.name)}</span><br>`;
        result += `<span class="project-meta">TYPE: ${escapeHtml(project.type.toUpperCase())} | STATUS: ${escapeHtml(project.status.toUpperCase())} | ${escapeHtml(project.date || '')}</span><br>`;
        result += `<span class="project-desc">${escapeHtml(project.description)}</span><br>`;
        result += `<span class="project-meta">TECH: `;
        project.tech.forEach(tech => {
            result += `<span class="tech-tag">${escapeHtml(tech)}</span> `;
        });
        result += `</span><br>`;
        if (project.github) {
            result += `<span class="project-meta">REPO: <a href="${escapeHtml(project.github)}" target="_blank" class="link">${escapeHtml(project.github)}</a></span><br>`;
        } else {
            result += `<span class="project-meta">REPO: Private/Internal Project</span><br>`;
        }
        result += `<br>`;
    });

    return result;
}

function executeCommand(cmd) {
    if (!checkRateLimit()) {
        return `<span class="error">Rate limit exceeded. Please wait a moment.</span>`;
    }

    const sanitized = sanitizeInput(cmd);
    if (!sanitized) {
        return `<span class="error">Invalid command</span>`;
    }

    const parts = sanitized.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[command]) {
        return commands[command](args);
    }

    return `<span class="error">bash: ${escapeHtml(command)}: command not found</span>`;
}

function addOutput(text) {
    if (text === null) return;
    const output = document.getElementById('output');
    if (!output) return;

    const line = document.createElement('div');
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function addCommandLine(cmd) {
    const safeCmdDisplay = escapeHtml(cmd);
    const promptText = `<span class="green">bransoncr@localhost</span>:<span class="blue">${escapeHtml(currentDir)}</span>$ ${safeCmdDisplay}`;
    addOutput(promptText);
}

function updatePrompt() {
    const promptSpan = document.querySelector('.terminal-input .prompt .blue');
    if (promptSpan) {
        promptSpan.textContent = currentDir;
    }
}

function initTerminal() {
    const commandInput = document.getElementById('command-input');
    const output = document.getElementById('output');

    if (!commandInput) return;

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = commandInput.value.trim();

            if (cmd) {
                commandHistory.push(cmd);
                historyIndex = commandHistory.length;

                addCommandLine(cmd);
                const result = executeCommand(cmd);

                if (result !== null && result !== '') {
                    addOutput(result);
                }

                addOutput('<br>');
            }

            commandInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Simple tab completion for directories
            const partial = commandInput.value.trim();
            if (partial.startsWith('cd ')) {
                const target = partial.substring(3);
                const dirContents = fileSystem[currentDir];
                if (dirContents) {
                    for (const [name, item] of Object.entries(dirContents)) {
                        if (item.type === 'dir' && name.startsWith(target)) {
                            commandInput.value = `cd ${name}`;
                            break;
                        }
                    }
                }
            }
        }
    });

    // Click on directory links
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('dir-link')) {
            const dir = e.target.dataset.dir;
            commandInput.value = `cd ${dir}`;
            commandInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
    });

    // Focus input on click
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('mode-terminal') &&
            !e.target.closest('.mode-toggle')) {
            commandInput.focus();
        }
    });

    commandInput.focus();
}
