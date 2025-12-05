const commandInput = document.getElementById('command-input');
const output = document.getElementById('output');
let commandHistory = [];
let historyIndex = -1;
let currentDir = '~';

// Security: HTML escape utility
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Security: Sanitize command input
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    // Remove null bytes
    input = input.replace(/\0/g, '');

    // Limit length to prevent abuse
    if (input.length > 500) {
        input = input.substring(0, 500);
    }

    // Remove potentially dangerous characters but keep valid command chars
    input = input.replace(/[^\w\s\-\.\/~]/g, '');

    return input.trim();
}

// Security: Rate limiting for command execution
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

const fileSystem = {
    '~': {
        'README.txt': {
            type: 'file',
            content: `BRANSON CRAWFORD
Computer Science Major & Mathematics Minor
University of British Columbia Okanagan

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
            content: null
        }
    },
    '~/skills': {
        'languages.txt': {
            type: 'file',
            content: `PROGRAMMING LANGUAGES
━━━━━━━━━━━━━━━━━━━━
C / C#         [████████████        ] Stack Overflow Req
Python         [████████████████    ] Intermediate
Java           [█████████████████   ] Intermediat/Kinda Advanced
JavaScript     [███████████████     ] Intermediate

SPECIALIZATIONS
━━━━━━━━━━━━━━━━━━━━
Systems Programming
Low-level Development
Network Protocols
Database Internals
Database Design`
        },
        'tools.txt': {
            type: 'file',
            content: `DEVELOPMENT TOOLS
━━━━━━━━━━━━━━━━━━━━
Git, GitHub
Docker
VS Code
Makefile
Postgres
Flask


WEB TECHNOLOGIES
━━━━━━━━━━━━━━━━━━━━
HTML/CSS
Tailwind CSS
Vite
Three.js`
        }
    },
    '~/contact': {
        'info.txt': {
            type: 'file',
            content: `CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EMAIL:    bransonancrawford@gmail.com
GITHUB:   https://github.com/BransonCr
LINKEDIN: https://linkedin.com/in/branson-crawford-43651b333

Available for collaboration, opportunities, and interesting projects.`
        }
    }
};

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
                result += `drwxr-xr-x  2 bransoncr users  4096 Dec  4 2024 <span class="dir-link" data-dir="${name}">${name}/</span><br>`;
            } else {
                const size = item.content ? item.content.length : 0;
                result += `-rw-r--r--  1 bransoncr users  ${size.toString().padStart(4)} Dec  4 2024 ${name}<br>`;
            }
        }
        return result;
    },

    cd: (args) => {
        if (!args[0]) {
            currentDir = '~';
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
            return '';
        }

        if (target === '~' || target === '/') {
            currentDir = '~';
            return '';
        }

        const newPath = currentDir === '~' ? `~/${target}` : `${currentDir}/${target}`;

        if (fileSystem[newPath]) {
            currentDir = newPath;
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

        // Convert newlines to <br> tags for HTML display
        const content = file.content ? file.content.replace(/\n/g, '<br>') : '';
        return content || `<span class="error">cat: ${escapeHtml(fileName)}: File is empty</span>`;
    },

    pwd: () => {
        const path = currentDir === '~' ? '/home/bransoncr' : `/home/bransoncr/${currentDir.substring(2)}`;
        return path;
    },

    clear: () => {
        output.innerHTML = '';
        return null;
    },

    whoami: () => {
        return `bransoncr

USER PROFILE<br>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
NAME:        Branson Crawford<br>
ROLE:        Computer Science Student<br>
UNIVERSITY:  UBC Okanagan<br>
MAJOR:       Computer Science<br>
MINOR:       Mathematics<br>
FOCUS:       Systems Programming, Networking, Databases<br>
STATUS:      Active (probably)<br>
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
    }
};

function generateProjectsList() {
    if (typeof projects === 'undefined' || !projects || projects.length === 0) {
        return `No projects found.`;
    }

    let result = `PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>

`;

    projects.forEach((project, index) => {
        result += `<span class="project-header">[${index + 1}] ${project.name}</span><br>`;
        result += `<span class="project-meta">TYPE: ${project.type.toUpperCase()} | STATUS: ${project.status.toUpperCase()}</span><br>`;
        result += `<span class="project-desc">${project.description}</span><br>`;
        result += `<span class="project-meta">TECH: `;
        project.tech.forEach(tech => {
            result += `<span class="tech-tag">${tech}</span> `;
        });
        result += `</span><br>`;
        result += `<span class="project-meta">REPO: <a href="${project.github}" target="_blank" class="link">${project.github}</a></span><br>`;
        result += `<br>`;
    });

    return result;
}

function executeCommand(cmd) {
    // Security: Check rate limit
    if (!checkRateLimit()) {
        return `<span class="error">Rate limit exceeded. Please wait a moment.</span>`;
    }

    // Security: Sanitize command
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

    // Escape the command name to prevent XSS
    return `<span class="error">bash: ${escapeHtml(command)}: command not found</span>`;
}

function addOutput(text) {
    if (text === null) return;

    const line = document.createElement('div');
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function addCommandLine(cmd) {
    // Security: Escape user input before displaying
    const safeCmdDisplay = escapeHtml(cmd);
    const promptText = `<span class="green">bransoncr@localhost</span>:<span class="blue">${escapeHtml(currentDir)}</span>$ ${safeCmdDisplay}`;
    addOutput(promptText);
}

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
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('dir-link')) {
        const dir = e.target.dataset.dir;
        const cmd = `cd ${dir}`;
        commandInput.value = cmd;
        commandInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    }
});

commandInput.focus();

document.addEventListener('click', () => {
    commandInput.focus();
});
