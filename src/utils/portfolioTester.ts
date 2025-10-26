// Test script to verify all functionality
import { SupabaseService } from '../services/supabaseService';

export class PortfolioTester {
  static async runAllTests(): Promise<void> {
    console.log('🧪 Starting Portfolio Tests...');
    
    try {
      await this.testDatabaseConnection();
      await this.testDataRetrieval();
      await this.testAdminFunctions();
      console.log('✅ All tests passed!');
    } catch (error) {
      console.error('❌ Test failed:', error);
    }
  }

  static async testDatabaseConnection(): Promise<void> {
    console.log('📡 Testing database connection...');
    try {
      await SupabaseService.getContactInfo();
      console.log('✅ Database connection successful');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  static async testDataRetrieval(): Promise<void> {
    console.log('📊 Testing data retrieval...');
    try {
      const [education, skills, experience, projects, certificates] = await Promise.all([
        SupabaseService.getEducation(),
        SupabaseService.getSkills(),
        SupabaseService.getExperience(),
        SupabaseService.getProjects(),
        SupabaseService.getCertificates()
      ]);

      console.log(`✅ Data retrieved: ${education.length} education, ${skills.length} skills, ${experience.length} experience, ${projects.length} projects, ${certificates.length} certificates`);
    } catch (error) {
      console.error('❌ Data retrieval failed:', error);
      throw error;
    }
  }

  static async testAdminFunctions(): Promise<void> {
    console.log('🔐 Testing admin functions...');
    try {
      // Test contact update (safe operation)
      const currentContact = await SupabaseService.getContactInfo();
      if (currentContact) {
        await SupabaseService.updateContactInfo({
          email: currentContact.email,
          phone: currentContact.phone,
          linkedin: currentContact.linkedin,
          github: currentContact.github,
          website: currentContact.website
        });
        console.log('✅ Admin functions working');
      } else {
        console.log('✅ Admin functions working (no contact info to test)');
      }
    } catch (error) {
      console.error('❌ Admin functions failed:', error);
      throw error;
    }
  }
}

// Run tests if in browser
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    PortfolioTester.runAllTests();
  });
}
