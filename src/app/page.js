'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Component Data ---

const featuredProjects = [
  {
    title: 'CloudSync Pro Dashboard',
    description: 'A comprehensive cloud management dashboard with real-time monitoring, resource allocation, and cost analysis features.',
    technologies: ['Vue.js', 'TypeScript', 'Chart.js', 'AWS SDK'],
    link: 'https://github.com/NexusTeamDev',
  },
  {
    title: 'HealthTrack API Platform',
    description: 'A HIPAA-compliant API for healthcare data management with patient records, appointment scheduling, and telehealth features.',
    technologies: ['Python (FastAPI)', 'MongoDB', 'Redis', 'OAuth2'],
    link: 'https://github.com/NexusTeamDev',
  },
  {
    title: 'Smart Retail Analytics',
    description: 'Machine learning platform for retail sales prediction, inventory optimization, and customer behavior analysis.',
    technologies: ['React', 'TensorFlow.js', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com/NexusTeamDev',
  },
];

const skills = [
  { category: 'Frontend & UI', list: ['Vue.js', 'TypeScript', 'Svelte', 'Three.js', 'WebGL', 'Figma'] },
  { category: 'Backend & Systems', list: ['Java (Spring)', 'Python (FastAPI)', 'GraphQL', 'Microservices', 'RabbitMQ'] },
  { category: 'Cloud & Infrastructure', list: ['Azure', 'Google Cloud', 'Kubernetes', 'Helm', 'Prometheus', 'Grafana'] },
];

const NavItem = ({ text, onClick, theme }) => (
  <button
    onClick={onClick}
    className={`p-3 transition-all duration-300 font-medium rounded-lg hover:scale-105 ${theme === 'light' ? 'text-slate-700 hover:text-primary' : 'text-slate-300 hover:text-secondary'
      }`}
    aria-label={`Scroll to ${text} section`}
  >
    {text}
  </button>
);

// --- Main App Component ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const handleNavClick = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const Hero = () => (
    <section ref={homeRef} id="home" className={`min-h-screen flex items-center justify-center text-center p-4 transition-colors duration-500 ${theme === 'light' ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 'bg-gradient-to-br from-slate-900 to-slate-800'
      }`}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="relative">
          <div className={`absolute -inset-1 rounded-lg blur opacity-30 ${theme === 'light' ? 'bg-primary' : 'bg-secondary'}`}></div>
          <h1 className={`text-5xl md:text-7xl font-bold relative leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
            I'm <span className="text-primary">Omar Youssef omar mahmoud</span>
            <br />
            <span className="text-3xl md:text-5xl text-secondary">Cloud Solutions Architect</span>
          </h1>
        </div>
        <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
          Specializing in scalable cloud infrastructure, microservices architecture, and enterprise digital transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => handleNavClick('projects')}
            className="px-10 py-4 bg-primary text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-primary/90 transition duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Explore Solutions
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-10 py-4 border-2 font-semibold text-lg rounded-xl transition duration-300 transform hover:scale-105 ${theme === 'light' 
              ? 'border-primary text-primary hover:bg-primary/10' 
              : 'border-secondary text-secondary hover:bg-secondary/10'}`}
          >
            Connect Now
          </button>
        </div>
      </div>
    </section>
  );

  const About = () => (
    <section ref={aboutRef} id="about" className={`py-24 px-4 transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'
      }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
            Technical Expertise
          </h2>
          <div className={`h-1 w-24 mx-auto rounded-full ${theme === 'light' ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gradient-to-r from-primary to-secondary'
            }`}></div>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-slate-50' : 'bg-gradient-to-br from-slate-800 to-slate-900'
              }`}>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>Professional Journey</h3>
              <div className={`space-y-4 text-lg ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                <p>
                  With over 7 years in cloud architecture and distributed systems, I've led digital transformation initiatives for Fortune 500 companies, reducing infrastructure costs by 40% while improving system reliability.
                </p>
                <p>
                  My expertise spans across multi-cloud strategies, container orchestration, and implementing DevOps practices that accelerate delivery cycles while maintaining security and compliance standards.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className={`p-6 rounded-xl border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'
                }`}>
                <h3 className={`text-xl font-semibold mb-4 flex items-center ${theme === 'light' ? 'text-primary' : 'text-secondary'
                  }`}>
                  <span className={`w-3 h-3 rounded-full mr-3 ${theme === 'light' ? 'bg-primary' : 'bg-secondary'}`}></span>
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.list.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition duration-200 ${theme === 'light'
                        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-slate-700 border border-primary/20 hover:border-primary'
                        : 'bg-gradient-to-r from-primary/20 to-secondary/20 text-slate-200 border border-primary/30 hover:border-secondary'
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const ProjectCard = ({ project, theme }) => (
    <div className={`group relative overflow-hidden rounded-2xl border ${theme === 'light'
      ? 'bg-white border-slate-200 hover:border-primary'
      : 'bg-slate-800 border-slate-700 hover:border-secondary'
      } transition-all duration-500 hover:-translate-y-2`}>
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${theme === 'light' ? 'from-primary to-secondary' : 'from-primary to-secondary'
        }`}></div>
      <div className="p-8 relative">
        <div className="flex justify-between items-start mb-6">
          <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>{project.title}</h3>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${theme === 'light' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
            }`}>
            Live
          </span>
        </div>
        <p className={`mb-6 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className={`px-3 py-1 text-xs font-semibold rounded-lg ${theme === 'light' ? 'bg-slate-100 text-slate-700 border border-slate-200' : 'bg-slate-700 text-slate-300 border border-slate-600'
              }`}>
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center font-semibold group/link transition-all ${theme === 'light' ? 'text-primary hover:text-primary/80' : 'text-secondary hover:text-secondary/80'
            }`}
        >
          View Case Study
          <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );

  const Projects = () => (
    <section ref={projectsRef} id="projects" className={`py-24 px-4 transition-colors duration-500 ${theme === 'light' ? 'bg-gradient-to-b from-slate-50 to-white' : 'bg-gradient-to-b from-slate-900 to-slate-800'
      }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
            Enterprise Solutions
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}>
            Delivering robust, scalable solutions for complex business challenges
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} theme={theme} />
          ))}
        </div>
        <div className={`mt-16 p-8 rounded-2xl text-center ${theme === 'light' ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10' : 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20'
          }`}>
          <p className={`text-lg font-medium ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'
            }`}>
            Looking for custom enterprise solutions? Let's discuss your specific requirements.
          </p>
        </div>
      </div>
    </section>
  );

  const Contact = () => (
    <section ref={contactRef} id="contact" className={`py-24 px-4 transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'
      }`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
            Start Your Digital Transformation
          </h2>
          <div className={`h-1 w-16 mx-auto rounded-full ${theme === 'light' ? 'bg-secondary' : 'bg-secondary'
            }`}></div>
        </div>
        
        <div className={`p-10 rounded-2xl mb-10 ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
          }`}>
          <p className={`text-xl text-center mb-8 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
            Ready to optimize your cloud infrastructure and accelerate digital innovation?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:alex.morgan@nexusdigital.dev"
              className="px-12 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg hover:bg-primary/90 transition duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Schedule Consultation
            </a>
            <a
              href="tel:+15551234567"
              className={`px-12 py-4 border-2 font-bold text-lg rounded-xl transition duration-300 transform hover:scale-105 ${theme === 'light' 
                ? 'border-secondary text-secondary hover:bg-secondary/10' 
                : 'border-secondary text-secondary hover:bg-secondary/10'}`}
            >
              Call Now
            </a>
          </div>
        </div>

        <div className={`pt-10 border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'
          }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>Location</h4>
              <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}>San Francisco, CA</p>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>Email</h4>
              <a 
                href="mailto:alex.morgan@nexusdigital.dev"
                className={`hover:underline ${theme === 'light' ? 'text-primary hover:text-primary/80' : 'text-secondary hover:text-secondary/80'
                }`}
              >
                alex.morgan@nexusdigital.dev
              </a>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>Connect</h4>
              <a
                href="https://github.com/NexusTeamDev"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:underline ${theme === 'light' ? 'text-primary hover:text-primary/80' : 'text-secondary hover:text-secondary/80'
                  }`}
              >
                GitHub Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Header = () => (
    <header className={`sticky top-0 z-50 backdrop-blur-lg transition-colors duration-500 border-b ${theme === 'light' ? 'bg-white/90 border-slate-200' : 'bg-slate-900/90 border-slate-700'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg mr-3 ${theme === 'light' ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-gradient-to-br from-primary to-secondary'
              }`}></div>
            <span className={`text-xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>Nexus Digital</span>
          </div>

          <div className='flex items-center space-x-6'>
            <nav className="hidden md:flex space-x-2">
              <NavItem text="Home" onClick={() => handleNavClick('home')} theme={theme} />
              <NavItem text="Expertise" onClick={() => handleNavClick('about')} theme={theme} />
              <NavItem text="Solutions" onClick={() => handleNavClick('projects')} theme={theme} />
              <NavItem text="Contact" onClick={() => handleNavClick('contact')} theme={theme} />
            </nav>

            <button
              onClick={toggleTheme}
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${theme === 'light'
                ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary hover:from-primary/20 hover:to-secondary/20'
                : 'bg-gradient-to-r from-primary/20 to-secondary/20 text-secondary hover:from-primary/30 hover:to-secondary/30'
                }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <button
              className={`md:hidden p-3 rounded-lg transition-colors ${theme === 'light' ? 'text-slate-700 hover:text-primary' : 'text-slate-300 hover:text-secondary'
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 rounded-full transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''} ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-300'}`}></span>
                <span className={`block w-6 h-0.5 rounded-full ${isMenuOpen ? 'opacity-0' : ''} ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-300'}`}></span>
                <span className={`block w-6 h-0.5 rounded-full transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-300'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className={`flex flex-col p-4 space-y-3 border-t ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'
          }`}>
          <NavItem text="Home" onClick={() => handleNavClick('home')} theme={theme} />
          <NavItem text="Expertise" onClick={() => handleNavClick('about')} theme={theme} />
          <NavItem text="Solutions" onClick={() => handleNavClick('projects')} theme={theme} />
          <NavItem text="Contact" onClick={() => handleNavClick('contact')} theme={theme} />
        </div>
      </div>
    </header>
  );

  return (
    <div style={{ scrollBehavior: 'smooth' }} className="min-h-screen">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background-color: rgba(124, 58, 237, 0.3);
        }
        
        .transition-max-height {
          transition-property: max-height;
        }
      `}</style>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary mr-3"></div>
                <span className="text-xl font-bold">Nexus Digital</span>
              </div>
              <p className="text-slate-300 text-sm">
                Enterprise cloud solutions and digital transformation
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-300">© {new Date().getFullYear()} Nexus Digital Solutions</p>
              <p className="text-slate-400 text-sm mt-1">All intellectual property rights reserved</p>
            </div>
            <div className="text-right">
              <a
                href="https://github.com/NexusTeamDev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-slate-300 hover:text-white transition-colors"
              >
                GitHub Team
              </a>
              <p className="text-slate-400 text-sm mt-1">Open source contributions</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
