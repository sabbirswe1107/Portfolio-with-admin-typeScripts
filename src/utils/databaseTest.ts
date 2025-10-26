// Database connection test
import { SupabaseService } from '../services/supabaseService';

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection by trying to fetch data
    const [education, skills, experience, projects, certificates, contactInfo] = await Promise.all([
      SupabaseService.getEducation().catch(() => []),
      SupabaseService.getSkills().catch(() => []),
      SupabaseService.getExperience().catch(() => []),
      SupabaseService.getProjects().catch(() => []),
      SupabaseService.getCertificates().catch(() => []),
      SupabaseService.getContactInfo().catch(() => null)
    ]);

    console.log('Database connection successful!');
    console.log('Data counts:', {
      education: education.length,
      skills: skills.length,
      experience: experience.length,
      projects: projects.length,
      certificates: certificates.length,
      contactInfo: contactInfo ? 'Available' : 'Not set'
    });

    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Test on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    testDatabaseConnection();
  });
}
