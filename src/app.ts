import { SupabaseService } from './services/supabaseService';
import { Education, Skill, Experience, Project, Certificate, ContactInfo } from './types/database';
import { testDatabaseConnection } from './utils/databaseTest';

export class App {
  private currentUser: string | null = null;
  private isAdminMode = false;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.checkAdminMode();
    this.checkAdminSession();
    await this.testDatabaseConnection();
    await this.loadData();
    this.setupEventListeners();
  }

  private checkAdminMode(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.isAdminMode = urlParams.get('admin') === 'true';
  }

  private checkAdminSession(): void {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser === 'ahsanursabbir@gmail.com') {
      this.currentUser = savedUser;
    }
  }

  private async testDatabaseConnection(): Promise<void> {
    try {
      const isConnected = await testDatabaseConnection();
      if (!isConnected) {
        console.warn('Database connection test failed, but continuing...');
      }
    } catch (error) {
      console.warn('Database connection test error:', error);
    }
  }

  private async loadData(): Promise<void> {
    try {
      if (this.isAdminMode) {
        await this.renderAdminPanel();
      } else {
        await this.renderPortfolio();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this.showError('Failed to load data. Please try again.');
    }
  }

  private async renderPortfolio(): Promise<void> {
    const app = document.getElementById('app');
    if (!app) return;

    try {
      const [education, skills, experience, projects, certificates, contactInfo] = await Promise.all([
        SupabaseService.getEducation().catch(() => []),
        SupabaseService.getSkills().catch(() => []),
        SupabaseService.getExperience().catch(() => []),
        SupabaseService.getProjects().catch(() => []),
        SupabaseService.getCertificates().catch(() => []),
        SupabaseService.getContactInfo().catch(() => null)
      ]);

      app.innerHTML = `
        ${this.renderHeader()}
        ${this.renderHero()}
        ${this.renderEducation(education)}
        ${this.renderSkills(skills)}
        ${this.renderExperience(experience)}
        ${this.renderProjects(projects)}
        ${this.renderCertificates(certificates)}
        ${this.renderContact(contactInfo)}
        ${this.renderFooter()}
      `;
    } catch (error) {
      console.error('Error rendering portfolio:', error);
      // Show a fallback portfolio even if database fails
      app.innerHTML = `
        ${this.renderHeader()}
        ${this.renderHero()}
        ${this.renderEducation([])}
        ${this.renderSkills([])}
        ${this.renderExperience([])}
        ${this.renderProjects([])}
        ${this.renderCertificates([])}
        ${this.renderContact(null)}
        ${this.renderFooter()}
      `;
    }
  }

  private renderHeader(): string {
    return `
      <header class="header">
        <nav class="nav container">
          <a href="#" class="logo">Ahsanur Rahman</a>
          <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#certificates">Certificates</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="?admin=true" class="admin-link">Admin Panel</a>
        </nav>
      </header>
    `;
  }

  private renderHero(): string {
    return `
      <section id="home" class="hero">
        <div class="container">
          <div class="hero-content">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format&q=80" alt="Ahsanur Rahman" class="hero-image">
            <h1>Ahsanur Rahman</h1>
            <p>Passionate Data Scientist and Backend Developer with expertise in machine learning, data analysis, and building scalable web applications. I love turning complex problems into simple, beautiful solutions.</p>
            <div class="social-links">
              <a href="https://github.com/SABBiR1107" class="social-link" target="_blank">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/md-ahsanur-rahman-sabbir1107/" class="social-link" target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderEducation(education: Education[]): string {
    if (education.length === 0) {
      return `
        <section id="education" class="section">
          <div class="container">
            <h2 class="section-title">Education</h2>
            <div class="loading">No education data available</div>
          </div>
        </section>
      `;
    }

    return `
      <section id="education" class="section">
        <div class="container">
          <h2 class="section-title">Education</h2>
          ${education.map(edu => `
            <div class="education-item">
              <h3 class="education-degree">${edu.degree}</h3>
              <p class="education-institution">${edu.institution}</p>
              <p class="education-year">${edu.start_year} - ${edu.end_year}</p>
              <p class="education-description">${edu.description}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  private renderSkills(skills: Skill[]): string {
    const hardSkills = skills.filter(skill => skill.category === 'hard');
    const softSkills = skills.filter(skill => skill.category === 'soft');

    return `
      <section id="skills" class="section">
        <div class="container">
          <h2 class="section-title">Skills</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h3 class="section-subtitle">Hard Skills</h3>
              <div class="skill-list">
                ${hardSkills.map(skill => `
                  <span class="skill-tag">${skill.title}</span>
                `).join('')}
              </div>
            </div>
            <div class="skill-category">
              <h3 class="section-subtitle">Soft Skills</h3>
              <div class="skill-list">
                ${softSkills.map(skill => `
                  <span class="skill-tag">${skill.title}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderExperience(experience: Experience[]): string {
    if (experience.length === 0) {
      return `
        <section id="experience" class="section">
          <div class="container">
            <h2 class="section-title">Experience</h2>
            <div class="loading">No experience data available</div>
          </div>
        </section>
      `;
    }

    return `
      <section id="experience" class="section">
        <div class="container">
          <h2 class="section-title">Experience</h2>
          ${experience.map(exp => `
            <div class="experience-item">
              <h3 class="experience-title">${exp.job_title}</h3>
              <p class="experience-company">${exp.company}</p>
              <p class="experience-duration">${exp.start_date} - ${exp.end_date}</p>
              <ul class="responsibilities">
                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  private renderProjects(projects: Project[]): string {
    if (projects.length === 0) {
      return `
        <section id="projects" class="section">
          <div class="container">
            <h2 class="section-title">Projects</h2>
            <div class="loading">No projects available</div>
          </div>
        </section>
      `;
    }

    return `
      <section id="projects" class="section">
        <div class="container">
          <h2 class="section-title">Projects</h2>
          <div class="projects-grid">
            ${projects.map(project => `
              <div class="project-card">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                  ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                  `).join('')}
                </div>
                <a href="${project.link}" class="project-link" target="_blank">
                  <i class="fas fa-external-link-alt"></i>
                  View Project
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  private renderCertificates(certificates: Certificate[]): string {
    if (certificates.length === 0) {
      return `
        <section id="certificates" class="section">
          <div class="container">
            <h2 class="section-title">Certificates</h2>
            <div class="loading">No certificates available</div>
          </div>
        </section>
      `;
    }

    return `
      <section id="certificates" class="section">
        <div class="container">
          <h2 class="section-title">Certificates</h2>
          <div class="certificates-grid">
            ${certificates.map(cert => `
              <div class="certificate-item">
                <h3 class="certificate-name">${cert.name}</h3>
                <a href="${cert.url}" class="certificate-link" target="_blank">
                  <i class="fas fa-certificate"></i>
                  View Certificate
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  private renderContact(contactInfo: ContactInfo | null): string {
    const defaultContact = {
      email: 'ahsanursabbir@gmail.com',
      phone: '+8801788857309',
      linkedin: 'https://www.linkedin.com/in/md-ahsanur-rahman-sabbir1107/',
      github: 'https://github.com/SABBiR1107',
      website: 'ahsanursabbir.vercel.app'
    };

    const contact = contactInfo || defaultContact;

    return `
      <section id="contact" class="section contact">
        <div class="container">
          <h2 class="section-title">Contact</h2>
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-label">Email</div>
              <a href="mailto:${contact.email}" class="contact-value">${contact.email}</a>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="contact-label">Phone</div>
              <a href="tel:${contact.phone}" class="contact-value">${contact.phone}</a>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fab fa-linkedin"></i>
              </div>
              <div class="contact-label">LinkedIn</div>
              <a href="${contact.linkedin}" class="contact-value" target="_blank">LinkedIn Profile</a>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fab fa-github"></i>
              </div>
              <div class="contact-label">GitHub</div>
              <a href="${contact.github}" class="contact-value" target="_blank">GitHub Profile</a>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-globe"></i>
              </div>
              <div class="contact-label">Website</div>
              <a href="https://${contact.website}" class="contact-value" target="_blank">${contact.website}</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderFooter(): string {
    return `
      <footer class="footer">
        <div class="container">
          <p>&copy; 2024 Ahsanur Rahman Sabbir. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  private async renderAdminPanel(): Promise<void> {
    const app = document.getElementById('app');
    if (!app) return;

    if (!this.currentUser) {
      app.innerHTML = this.renderLoginForm();
      return;
    }

    try {
      const [education, skills, experience, projects, certificates, contactInfo] = await Promise.all([
        SupabaseService.getEducation(),
        SupabaseService.getSkills(),
        SupabaseService.getExperience(),
        SupabaseService.getProjects(),
        SupabaseService.getCertificates(),
        SupabaseService.getContactInfo()
      ]);

      app.innerHTML = `
        <div class="admin-panel">
          <div class="container">
            <div class="admin-content">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1>Admin Panel</h1>
                <div>
                  <a href="/" class="btn btn-secondary">View Portfolio</a>
                  <button onclick="app.logout()" class="btn btn-danger">Logout</button>
                </div>
              </div>
              
              ${this.renderAdminSection('Education', 'education', education)}
              ${this.renderAdminSection('Skills', 'skills', skills)}
              ${this.renderAdminSection('Experience', 'experience', experience)}
              ${this.renderAdminSection('Projects', 'projects', projects)}
              ${this.renderAdminSection('Certificates', 'certificates', certificates)}
              ${this.renderContactAdmin(contactInfo)}
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering admin panel:', error);
      app.innerHTML = this.renderError('Failed to load admin panel');
    }
  }

  private renderLoginForm(): string {
    return `
      <div class="admin-panel">
        <div class="container">
          <form class="login-form" onsubmit="app.handleLogin(event)">
            <h2>Admin Login</h2>
            <div class="form-group">
              <label class="form-label" for="email">Email</label>
              <input type="email" id="email" class="form-input" required value="ahsanursabbir@gmail.com">
            </div>
            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input type="password" id="password" class="form-input" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
            <div style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem; font-size: 0.875rem;">
              <strong>Test Credentials:</strong><br>
              Email: ahsanursabbir@gmail.com<br>
              Password: Ahs@nursabbir0
            </div>
          </form>
        </div>
      </div>
    `;
  }

  private renderAdminSection(title: string, type: string, data: any[]): string {
    return `
      <div class="admin-section">
        <h2>${title}</h2>
        <div id="${type}-list">
          ${data.map(item => this.renderAdminItem(type, item)).join('')}
        </div>
        <button onclick="app.showAddForm('${type}')" class="btn btn-primary">Add ${title.slice(0, -1)}</button>
      </div>
    `;
  }

  private renderAdminItem(type: string, item: any): string {
    const itemId = item.id;
    return `
      <div class="admin-item" data-id="${itemId}" style="border: 1px solid var(--border-color); padding: 1rem; margin: 1rem 0; border-radius: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div style="flex: 1;">
            ${this.renderItemContent(type, item)}
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button onclick="app.editItem('${type}', '${itemId}')" class="btn btn-secondary btn-sm">Edit</button>
            <button onclick="app.deleteItem('${type}', '${itemId}')" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderItemContent(type: string, item: any): string {
    switch (type) {
      case 'education':
        return `
          <h4>${item.degree}</h4>
          <p><strong>Institution:</strong> ${item.institution}</p>
          <p><strong>Duration:</strong> ${item.start_year} - ${item.end_year}</p>
          <p><strong>Description:</strong> ${item.description}</p>
        `;
      case 'skills':
        return `
          <h4>${item.title}</h4>
          <p><strong>Category:</strong> ${item.category}</p>
        `;
      case 'experience':
        return `
          <h4>${item.job_title}</h4>
          <p><strong>Company:</strong> ${item.company}</p>
          <p><strong>Duration:</strong> ${item.start_date} - ${item.end_date}</p>
          <p><strong>Responsibilities:</strong> ${item.responsibilities.join(', ')}</p>
        `;
      case 'projects':
        return `
          <h4>${item.name}</h4>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Technologies:</strong> ${item.technologies.join(', ')}</p>
          <p><strong>Link:</strong> <a href="${item.link}" target="_blank">${item.link}</a></p>
        `;
      case 'certificates':
        return `
          <h4>${item.name}</h4>
          <p><strong>URL:</strong> <a href="${item.url}" target="_blank">${item.url}</a></p>
        `;
      default:
        return JSON.stringify(item, null, 2);
    }
  }

  private renderContactAdmin(contactInfo: ContactInfo | null): string {
    const defaultContact = {
      email: 'ahsanursabbir@gmail.com',
      phone: '+8801788857309',
      linkedin: 'https://www.linkedin.com/in/md-ahsanur-rahman-sabbir1107/',
      github: 'https://github.com/SABBiR1107',
      website: 'ahsanursabbir.vercel.app'
    };

    const contact = contactInfo || defaultContact;

    return `
      <div class="admin-section">
        <h2>Contact Information</h2>
        <form onsubmit="app.updateContact(event)">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="contact-email">Email</label>
              <input type="email" id="contact-email" class="form-input" value="${contact.email}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-phone">Phone</label>
              <input type="tel" id="contact-phone" class="form-input" value="${contact.phone}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-linkedin">LinkedIn</label>
              <input type="url" id="contact-linkedin" class="form-input" value="${contact.linkedin}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-github">GitHub</label>
              <input type="url" id="contact-github" class="form-input" value="${contact.github}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-website">Website</label>
              <input type="text" id="contact-website" class="form-input" value="${contact.website}" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Update Contact Info</button>
        </form>
      </div>
    `;
  }

  private renderError(message: string): string {
    return `
      <div class="container" style="padding: 4rem 0; text-align: center;">
        <h2>Error</h2>
        <p class="error">${message}</p>
        <a href="/" class="btn btn-primary">Go Home</a>
      </div>
    `;
  }

  private setupEventListeners(): void {
    // Smooth scrolling for navigation links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Admin methods
  public async handleLogin(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('#email') as HTMLInputElement;
    const passwordInput = form.querySelector('#password') as HTMLInputElement;
    
    if (!emailInput || !passwordInput) {
      this.showError('Form elements not found');
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    console.log('Login attempt:', { email, passwordLength: password.length });

    // Check credentials
    if (email === 'ahsanursabbir@gmail.com' && password === 'Ahs@nursabbir0') {
      this.currentUser = email;
      localStorage.setItem('adminUser', email);
      this.showSuccess('Login successful!');
      await this.renderAdminPanel();
    } else {
      console.log('Invalid credentials:', { 
        emailMatch: email === 'ahsanursabbir@gmail.com',
        passwordMatch: password === 'Ahs@nursabbir0',
        expectedEmail: 'ahsanursabbir@gmail.com',
        expectedPassword: 'Ahs@nursabbir0'
      });
      this.showError('Invalid credentials. Please check your email and password.');
    }
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('adminUser');
    window.location.href = '/';
  }

  public showAddForm(type: string): void {
    const modal = this.createModal(type, 'add');
    document.body.appendChild(modal);
  }

  public editItem(type: string, id: string): void {
    const modal = this.createModal(type, 'edit', id);
    document.body.appendChild(modal);
  }

  public async deleteItem(type: string, id: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (type) {
        case 'education':
          await SupabaseService.deleteEducation(id);
          break;
        case 'skills':
          await SupabaseService.deleteSkill(id);
          break;
        case 'experience':
          await SupabaseService.deleteExperience(id);
          break;
        case 'projects':
          await SupabaseService.deleteProject(id);
          break;
        case 'certificates':
          await SupabaseService.deleteCertificate(id);
          break;
      }
      this.showSuccess('Item deleted successfully');
      await this.renderAdminPanel();
    } catch (error) {
      console.error('Error deleting item:', error);
      this.showError('Failed to delete item');
    }
  }

  public async updateContact(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const contactData = {
      email: (form.querySelector('#contact-email') as HTMLInputElement).value,
      phone: (form.querySelector('#contact-phone') as HTMLInputElement).value,
      linkedin: (form.querySelector('#contact-linkedin') as HTMLInputElement).value,
      github: (form.querySelector('#contact-github') as HTMLInputElement).value,
      website: (form.querySelector('#contact-website') as HTMLInputElement).value
    };

    try {
      await SupabaseService.updateContactInfo(contactData);
      this.showSuccess('Contact information updated successfully');
    } catch (error) {
      console.error('Error updating contact info:', error);
      this.showError('Failed to update contact information');
    }
  }

  private createModal(type: string, action: 'add' | 'edit', id?: string): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    `;

    modalContent.innerHTML = this.getFormHTML(type, action, id);
    modal.appendChild(modalContent);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  private getFormHTML(type: string, action: 'add' | 'edit', id?: string): string {
    const title = action === 'add' ? `Add ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    
    switch (type) {
      case 'education':
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>${title}</h3>
            <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
          </div>
          <form onsubmit="app.handleFormSubmit(event, 'education', '${action}', '${id || ''}')">
            <div class="form-group">
              <label class="form-label">Degree</label>
              <input type="text" name="degree" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Institution</label>
              <input type="text" name="institution" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Start Year</label>
              <input type="number" name="start_year" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">End Year</label>
              <input type="number" name="end_year" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea name="description" class="form-input" rows="3"></textarea>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">${action === 'add' ? 'Add' : 'Update'}</button>
            </div>
          </form>
        `;

      case 'skills':
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>${title}</h3>
            <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
          </div>
          <form onsubmit="app.handleFormSubmit(event, 'skills', '${action}', '${id || ''}')">
            <div class="form-group">
              <label class="form-label">Skill Title</label>
              <input type="text" name="title" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Category</label>
              <select name="category" class="form-input" required>
                <option value="hard">Hard Skill</option>
                <option value="soft">Soft Skill</option>
              </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">${action === 'add' ? 'Add' : 'Update'}</button>
            </div>
          </form>
        `;

      case 'experience':
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>${title}</h3>
            <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
          </div>
          <form onsubmit="app.handleFormSubmit(event, 'experience', '${action}', '${id || ''}')">
            <div class="form-group">
              <label class="form-label">Job Title</label>
              <input type="text" name="job_title" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Company</label>
              <input type="text" name="company" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Start Date</label>
              <input type="text" name="start_date" class="form-input" placeholder="e.g., 2023-06" required>
            </div>
            <div class="form-group">
              <label class="form-label">End Date</label>
              <input type="text" name="end_date" class="form-input" placeholder="e.g., 2023-12" required>
            </div>
            <div class="form-group">
              <label class="form-label">Responsibilities (one per line)</label>
              <textarea name="responsibilities" class="form-input" rows="4" placeholder="Enter each responsibility on a new line"></textarea>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">${action === 'add' ? 'Add' : 'Update'}</button>
            </div>
          </form>
        `;

      case 'projects':
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>${title}</h3>
            <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
          </div>
          <form onsubmit="app.handleFormSubmit(event, 'projects', '${action}', '${id || ''}')">
            <div class="form-group">
              <label class="form-label">Project Name</label>
              <input type="text" name="name" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea name="description" class="form-input" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Technologies (comma-separated)</label>
              <input type="text" name="technologies" class="form-input" placeholder="e.g., TypeScript, React, Node.js" required>
            </div>
            <div class="form-group">
              <label class="form-label">Project Link</label>
              <input type="url" name="link" class="form-input" required>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">${action === 'add' ? 'Add' : 'Update'}</button>
            </div>
          </form>
        `;

      case 'certificates':
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>${title}</h3>
            <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
          </div>
          <form onsubmit="app.handleFormSubmit(event, 'certificates', '${action}', '${id || ''}')">
            <div class="form-group">
              <label class="form-label">Certificate Name</label>
              <input type="text" name="name" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Certificate URL</label>
              <input type="url" name="url" class="form-input" required>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">${action === 'add' ? 'Add' : 'Update'}</button>
            </div>
          </form>
        `;

      default:
        return '<p>Unknown form type</p>';
    }
  }

  public async handleFormSubmit(event: Event, type: string, action: 'add' | 'edit', id?: string): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      if (action === 'add') {
        await this.addItem(type, formData);
      } else {
        await this.updateItem(type, id!, formData);
      }
      
      this.showSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} ${action === 'add' ? 'added' : 'updated'} successfully`);
      document.querySelector('.modal-overlay')?.remove();
      await this.renderAdminPanel();
    } catch (error) {
      console.error(`Error ${action}ing ${type}:`, error);
      this.showError(`Failed to ${action} ${type}`);
    }
  }

  private async addItem(type: string, formData: FormData): Promise<void> {
    switch (type) {
      case 'education':
        await SupabaseService.addEducation({
          degree: formData.get('degree') as string,
          institution: formData.get('institution') as string,
          start_year: parseInt(formData.get('start_year') as string),
          end_year: parseInt(formData.get('end_year') as string),
          description: formData.get('description') as string || ''
        });
        break;
      case 'skills':
        await SupabaseService.addSkill({
          title: formData.get('title') as string,
          category: formData.get('category') as 'hard' | 'soft'
        });
        break;
      case 'experience':
        await SupabaseService.addExperience({
          job_title: formData.get('job_title') as string,
          company: formData.get('company') as string,
          start_date: formData.get('start_date') as string,
          end_date: formData.get('end_date') as string,
          responsibilities: (formData.get('responsibilities') as string).split('\n').filter(r => r.trim())
        });
        break;
      case 'projects':
        await SupabaseService.addProject({
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
          link: formData.get('link') as string
        });
        break;
      case 'certificates':
        await SupabaseService.addCertificate({
          name: formData.get('name') as string,
          url: formData.get('url') as string
        });
        break;
    }
  }

  private async updateItem(type: string, id: string, formData: FormData): Promise<void> {
    switch (type) {
      case 'education':
        await SupabaseService.updateEducation(id, {
          degree: formData.get('degree') as string,
          institution: formData.get('institution') as string,
          start_year: parseInt(formData.get('start_year') as string),
          end_year: parseInt(formData.get('end_year') as string),
          description: formData.get('description') as string || ''
        });
        break;
      case 'skills':
        await SupabaseService.updateSkill(id, {
          title: formData.get('title') as string,
          category: formData.get('category') as 'hard' | 'soft'
        });
        break;
      case 'experience':
        await SupabaseService.updateExperience(id, {
          job_title: formData.get('job_title') as string,
          company: formData.get('company') as string,
          start_date: formData.get('start_date') as string,
          end_date: formData.get('end_date') as string,
          responsibilities: (formData.get('responsibilities') as string).split('\n').filter(r => r.trim())
        });
        break;
      case 'projects':
        await SupabaseService.updateProject(id, {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
          link: formData.get('link') as string
        });
        break;
      case 'certificates':
        await SupabaseService.updateCertificate(id, {
          name: formData.get('name') as string,
          url: formData.get('url') as string
        });
        break;
    }
  }

  private showError(message: string): void {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.body.insertBefore(errorDiv, document.body.firstChild);
    setTimeout(() => errorDiv.remove(), 5000);
  }

  private showSuccess(message: string): void {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    document.body.insertBefore(successDiv, document.body.firstChild);
    setTimeout(() => successDiv.remove(), 5000);
  }
}

// Initialize the app
// const app = new App();
