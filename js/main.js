// Main JavaScript - Shared functionality
// Skills data from resume
const skillsData = {
    languages: {
        proficient: [
            { name: 'C', level: 90 },
            { name: 'Java', level: 85 },
            { name: 'Python', level: 85 },
            { name: 'JavaScript', level: 80 }
        ],
        familiar: ['R', 'TypeScript', 'Rust', 'MIPS', 'C++']
    },
    development: [
        'Flask', 'FastAPI', 'HTML5', 'TailwindCSS', 'Git',
        'Docker', 'MySQL', 'PostgreSQL', 'Unity'
    ],
    dataScience: ['NumPy', 'Matplotlib'],
    specializations: [
        'Systems Programming',
        'Database Design & Internals',
        'Network Protocols',
        'Low-level Development',
        'Web Application Architecture'
    ]
};

// Personal info
const personalInfo = {
    name: 'Branson Crawford',
    title: 'Computer Science Major & Mathematics Minor',
    university: 'University of British Columbia Okanagan',
    year: '3rd Year Student',
    gpa: '4.00/4.0',
    achievement: "Dean's Scholar (2024-25)",
    email: 'bransonancrawford@gmail.com',
    github: 'https://github.com/BransonCr',
    linkedin: 'https://linkedin.com/in/branson-crawford-43651b333',
    phone: '250-462-9409',
    focus: ['Systems Programming', 'Networking', 'Database Design']
};

// Projects data (loaded from JSON or embedded)
let projects = [];

// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        projects = data.projects;
        return projects;
    } catch (error) {
        console.error('Failed to load projects:', error);
        // Fallback to embedded data
        projects = [
            {
                name: "MDS Application Management System",
                type: "web",
                description: "Full-stack admissions platform for UBC's MDS program with RBAC, PostgreSQL, and admin dashboard.",
                tech: ["Python", "Flask", "PostgreSQL", "Tailwind CSS"],
                github: null,
                status: "active",
                date: "Nov 2025 - Present"
            }
        ];
        return projects;
    }
}

// Mode switching
let currentMode = 'terminal';

function setMode(mode) {
    currentMode = mode;
    document.body.classList.remove('mode-terminal', 'mode-gui');
    document.body.classList.add(`mode-${mode}`);

    // Update toggle buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Save preference
    localStorage.setItem('preferredMode', mode);

    // Focus terminal input if switching to terminal
    if (mode === 'terminal') {
        const input = document.getElementById('command-input');
        if (input) input.focus();
    }
}

function toggleMode() {
    setMode(currentMode === 'terminal' ? 'gui' : 'terminal');
}

// Initialize mode from preference
function initMode() {
    const savedMode = localStorage.getItem('preferredMode') || 'terminal';
    setMode(savedMode);
}

// Security utilities
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    input = input.replace(/\0/g, '');
    if (input.length > 500) {
        input = input.substring(0, 500);
    }
    input = input.replace(/[^\w\s\-\.\/~]/g, '');
    return input.trim();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
    await loadProjects();
    initMode();

    // Initialize terminal if available
    if (typeof initTerminal === 'function') {
        initTerminal();
    }

    // Initialize GUI if available
    if (typeof initGUI === 'function') {
        initGUI();
    }

    // Mode toggle button listeners
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setMode(btn.dataset.mode);
        });
    });
});
