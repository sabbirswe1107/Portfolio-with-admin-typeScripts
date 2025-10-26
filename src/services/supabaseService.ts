import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase';
import { Education, Skill, Experience, Project, Certificate, ContactInfo } from '../types/database';

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

export class SupabaseService {
  // Education methods
  static async getEducation(): Promise<Education[]> {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('start_year', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async addEducation(education: Omit<Education, 'id' | 'created_at'>): Promise<Education> {
    const { data, error } = await supabase
      .from('education')
      .insert(education)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateEducation(id: string, updates: Partial<Education>): Promise<Education> {
    const { data, error } = await supabase
      .from('education')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteEducation(id: string): Promise<void> {
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Skills methods
  static async getSkills(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  static async addSkill(skill: Omit<Skill, 'id' | 'created_at'>): Promise<Skill> {
    const { data, error } = await supabase
      .from('skills')
      .insert(skill)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateSkill(id: string, updates: Partial<Skill>): Promise<Skill> {
    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteSkill(id: string): Promise<void> {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Experience methods
  static async getExperience(): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async addExperience(experience: Omit<Experience, 'id' | 'created_at'>): Promise<Experience> {
    const { data, error } = await supabase
      .from('experience')
      .insert(experience)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateExperience(id: string, updates: Partial<Experience>): Promise<Experience> {
    const { data, error } = await supabase
      .from('experience')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteExperience(id: string): Promise<void> {
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Projects methods
  static async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async addProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Certificates methods
  static async getCertificates(): Promise<Certificate[]> {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async addCertificate(certificate: Omit<Certificate, 'id' | 'created_at'>): Promise<Certificate> {
    const { data, error } = await supabase
      .from('certificates')
      .insert(certificate)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateCertificate(id: string, updates: Partial<Certificate>): Promise<Certificate> {
    const { data, error } = await supabase
      .from('certificates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteCertificate(id: string): Promise<void> {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Contact methods
  static async getContactInfo(): Promise<ContactInfo | null> {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async updateContactInfo(contactInfo: Partial<ContactInfo>): Promise<ContactInfo> {
    const { data, error } = await supabase
      .from('contact_info')
      .upsert(contactInfo)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}
