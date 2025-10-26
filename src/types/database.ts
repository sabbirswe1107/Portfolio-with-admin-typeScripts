// Database types
export interface Education {
  id: string;
  degree: string;
  institution: string;
  start_year: number;
  end_year: number;
  description: string;
  created_at: string;
}

export interface Skill {
  id: string;
  title: string;
  category: 'hard' | 'soft';
  created_at: string;
}

export interface Experience {
  id: string;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  name: string;
  url: string;
  created_at: string;
}

export interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  updated_at: string;
}
