# Branson Crawford's Portfolio Website

A modern, interactive portfolio website showcasing my projects and skills, featuring the DockerKilo text editor project.

## 🚀 Features

### Core Website
- **Responsive Design**: Mobile-first approach with Tailwind CSS and DaisyUI
- **Dark/Light Theme Toggle**: Smooth theme switching with animated icons
- **Interactive Navigation**: Smooth scrolling and animated mobile menu
- **Particle Background Effects**: Dynamic floating particles for visual appeal
- **3D Card Animations**: Hover effects with transform and shadow animations

### DockerKilo Integration
- **Featured Project Showcase**: Prominent display of the DockerKilo text editor
- **Dedicated Project Page**: Comprehensive project details at `/dockerkilo.html`
- **GitHub Integration**: Direct links to the [DockerKilo repository](https://github.com/dockerhopper/dockerKilo)
- **Interactive Demo**: Terminal-style code preview with syntax highlighting

### Enhanced User Experience
- **Floating Action Button (FAB)**: Quick access to key pages and projects
- **Scroll Animations**: Elements animate in as they come into view
- **Typing Effects**: Animated text reveals for project descriptions
- **Confetti Effects**: Celebratory animations on special interactions
- **Parallax Scrolling**: Subtle depth effects during page scroll

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS, DaisyUI
- **Icons**: Bootstrap Icons
- **Animations**: CSS3 Animations, JavaScript Intersection Observer
- **Build Tool**: Vite
- **Deployment**: Static hosting ready

## 📁 Project Structure

```
myproject2/
├── src/
│   ├── index.html          # Main portfolio page
│   ├── projects.html       # Projects overview page
│   ├── dockerkilo.html     # DockerKilo project page
│   ├── custom.css          # Enhanced animations and effects
│   ├── output.css          # Tailwind compiled CSS
│   └── main.js            # Main JavaScript functionality
├── asset/                  # Project assets and images
└── README.md              # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Accent**: Custom red (#c73b22)
- **Background**: Subtle gray gradients
- **Text**: High contrast for accessibility

### Typography
- **Headings**: Large, bold with gradient text effects
- **Body**: Clean, readable fonts with proper hierarchy
- **Code**: Monospace fonts for technical content

### Animations
- **Hover Effects**: Scale, rotate, and shadow transitions
- **Page Load**: Fade-in animations with staggered timing
- **Scroll Triggers**: Intersection Observer for performance
- **Micro-interactions**: Button hover states and form feedback

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- Node.js (for development)

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

### Building for Production
```bash
npm run build
```

## 📱 Responsive Design

- **Mobile First**: Optimized for small screens
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured experience with hover effects
- **Touch Friendly**: Optimized for touch devices

## 🔧 Customization

### Adding New Projects
1. Update `projects.html` with new project cards
2. Add project details to the main page
3. Include relevant badges and links

### Modifying Animations
- Edit `custom.css` for CSS animations
- Modify JavaScript in `index.html` for interactive effects
- Adjust timing and easing in animation classes

### Theme Customization
- Modify color variables in CSS
- Update gradient definitions
- Adjust dark/light mode colors

## 🌟 DockerKilo Project Details

### What is DockerKilo?
DockerKilo is a revolutionary fork of the Kilo text editor with multi-buffer support and advanced file management. Built in C, it features:

- **10 simultaneous buffers** with intuitive navigation
- **Advanced syntax highlighting** for multiple languages
- **Efficient rendering** with tab expansion and line wrapping
- **Powerful search** with real-time highlighting
- **Terminal-based interface** for developers

### Key Features
- Multi-buffer management (Ctrl-B, Ctrl-N, Ctrl-P)
- Syntax highlighting for C/C++, Python, and more
- Efficient memory management and rendering
- Cross-platform compatibility (Unix/Linux)
- BSD 2-Clause license

### Technical Implementation
- Written in pure C for performance
- POSIX-compliant system calls
- Dynamic memory allocation
- Efficient text processing algorithms

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and content load as needed
- **CSS Optimization**: Minimal CSS with utility classes
- **JavaScript Efficiency**: Intersection Observer for scroll events
- **Asset Optimization**: Compressed images and minified code

## 🔒 Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+
- **Mobile Browsers**: iOS Safari 13+, Chrome Mobile 80+
- **Fallbacks**: Graceful degradation for older browsers

## 📈 Future Enhancements

- [ ] Blog system integration
- [ ] Contact form with backend
- [ ] Project filtering and search
- [ ] Dark mode persistence
- [ ] Performance analytics
- [ ] SEO optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Branson Crawford**
- GitHub: [@dockerhopper](https://github.com/dockerhopper)
- LinkedIn: [Branson Crawford](https://www.linkedin.com/in/branson-crawford-43651b333/)
- Email: bransonancrawford@gmail.com

## 🙏 Acknowledgments

- **Kilo Editor**: Original text editor by Salvatore Sanfilippo (antirez)
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind CSS
- **Bootstrap Icons**: Icon library for consistent design

---

Built with ❤️ and lots of coffee ☕ by Branson Crawford