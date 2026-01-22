// GUI Mode JavaScript
let currentSection = 'about';

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.gui-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
        section.classList.add('active');
    }

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    currentSection = sectionId;
}

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container || !projects) return;

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-card-header">
                <h3>${escapeHtml(project.name)}</h3>
                <span class="project-type">${escapeHtml(project.type)}</span>
            </div>
            <div class="project-date">${escapeHtml(project.date || '')}</div>
            <p>${escapeHtml(project.description)}</p>
            <div class="project-tech">
                ${project.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.github
                    ? `<a href="${escapeHtml(project.github)}" target="_blank" class="project-link">View on GitHub</a>`
                    : `<span class="project-link disabled">Private Project</span>`
                }
                <span class="project-status ${project.status}">${escapeHtml(project.status)}</span>
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !skillsData) return;

    container.innerHTML = `
        <div class="skill-card">
            <h3>Languages - Proficient</h3>
            <div class="skill-list">
                ${skillsData.languages.proficient.map(skill => `
                    <div class="skill-row">
                        <span class="skill-name">${escapeHtml(skill.name)}</span>
                        <div class="skill-level-bar">
                            <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="skill-card">
            <h3>Languages - Familiar</h3>
            <div class="skill-badges">
                ${skillsData.languages.familiar.map(lang =>
                    `<span class="skill-badge">${escapeHtml(lang)}</span>`
                ).join('')}
            </div>
        </div>

        <div class="skill-card">
            <h3>Development Tools</h3>
            <div class="skill-badges">
                ${skillsData.development.map(tool =>
                    `<span class="skill-badge">${escapeHtml(tool)}</span>`
                ).join('')}
            </div>
        </div>

        <div class="skill-card">
            <h3>Data Science</h3>
            <div class="skill-badges">
                ${skillsData.dataScience.map(tool =>
                    `<span class="skill-badge">${escapeHtml(tool)}</span>`
                ).join('')}
            </div>
        </div>

        <div class="skill-card">
            <h3>Specializations</h3>
            <div class="skill-list">
                ${skillsData.specializations.map(spec => `
                    <div class="skill-row">
                        <span class="skill-name">${escapeHtml(spec)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAbout() {
    const header = document.querySelector('.about-header');
    if (!header || !personalInfo) return;

    header.innerHTML = `
        <h1>${escapeHtml(personalInfo.name)}</h1>
        <div class="subtitle">${escapeHtml(personalInfo.title)}</div>
        <div class="university">${escapeHtml(personalInfo.university)}</div>
        <div class="university">${escapeHtml(personalInfo.year)} | GPA: ${escapeHtml(personalInfo.gpa)} | ${escapeHtml(personalInfo.achievement)}</div>
    `;
}

function renderContact() {
    const container = document.getElementById('contact-container');
    if (!container || !personalInfo) return;

    container.innerHTML = `
        <div class="contact-card">
            <h2>Get In Touch</h2>
            <div class="contact-list">
                <div class="contact-row">
                    <div class="contact-icon">@</div>
                    <div class="contact-info">
                        <div class="contact-label-gui">Email</div>
                        <div class="contact-value">
                            <a href="mailto:${escapeHtml(personalInfo.email)}">${escapeHtml(personalInfo.email)}</a>
                        </div>
                    </div>
                </div>
                <div class="contact-row">
                    <div class="contact-icon">#</div>
                    <div class="contact-info">
                        <div class="contact-label-gui">Phone</div>
                        <div class="contact-value">${escapeHtml(personalInfo.phone)}</div>
                    </div>
                </div>
                <div class="contact-row">
                    <div class="contact-icon">&lt;/&gt;</div>
                    <div class="contact-info">
                        <div class="contact-label-gui">GitHub</div>
                        <div class="contact-value">
                            <a href="${escapeHtml(personalInfo.github)}" target="_blank">github.com/BransonCr</a>
                        </div>
                    </div>
                </div>
                <div class="contact-row">
                    <div class="contact-icon">in</div>
                    <div class="contact-info">
                        <div class="contact-label-gui">LinkedIn</div>
                        <div class="contact-value">
                            <a href="${escapeHtml(personalInfo.linkedin)}" target="_blank">linkedin.com/in/branson-crawford</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initGUI() {
    // Render all sections
    renderAbout();
    renderProjects();
    renderSkills();
    renderContact();

    // Nav button listeners
    document.querySelectorAll('.gui-nav .nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showSection(btn.dataset.section);
        });
    });

    // Show initial section
    showSection('about');
}
