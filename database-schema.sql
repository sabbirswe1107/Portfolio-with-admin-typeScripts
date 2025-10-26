-- Supabase Database Schema for Personal Portfolio

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Education table
CREATE TABLE education (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    start_year INTEGER NOT NULL,
    end_year INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('hard', 'soft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience table
CREATE TABLE experience (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    link VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates table
CREATE TABLE certificates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact info table (singleton)
CREATE TABLE contact_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    linkedin VARCHAR(500) NOT NULL,
    github VARCHAR(500) NOT NULL,
    website VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact information
INSERT INTO contact_info (email, phone, linkedin, github, website) VALUES (
    'ahsanursabbir@gmail.com',
    '+8801788857309',
    'https://www.linkedin.com/in/md-ahsanur-rahman-sabbir1107/',
    'https://github.com/SABBiR1107',
    'ahsanursabbir.vercel.app'
);

-- Sample data for testing
INSERT INTO education (degree, institution, start_year, end_year, description) VALUES 
('Bachelor of Science in Computer Science', 'University of Technology', 2020, 2024, 'Focused on software engineering, data structures, algorithms, and machine learning.');

INSERT INTO skills (title, category) VALUES 
('Python', 'hard'),
('JavaScript', 'hard'),
('TypeScript', 'hard'),
('React', 'hard'),
('Node.js', 'hard'),
('PostgreSQL', 'hard'),
('Machine Learning', 'hard'),
('Data Analysis', 'hard'),
('Problem Solving', 'soft'),
('Team Leadership', 'soft'),
('Communication', 'soft'),
('Project Management', 'soft');

INSERT INTO experience (job_title, company, start_date, end_date, responsibilities) VALUES 
('Data Science Intern', 'Tech Company', '2023-06', '2023-12', ARRAY['Developed machine learning models for data analysis', 'Cleaned and processed large datasets', 'Created data visualizations and reports', 'Collaborated with cross-functional teams']);

INSERT INTO projects (name, description, technologies, link) VALUES 
('Portfolio Website', 'A responsive personal portfolio website built with TypeScript and modern CSS', ARRAY['TypeScript', 'CSS3', 'HTML5', 'Supabase'], 'https://github.com/SABBiR1107/portfolio'),
('Data Analysis Dashboard', 'Interactive dashboard for analyzing sales data with real-time updates', ARRAY['Python', 'React', 'PostgreSQL', 'Chart.js'], 'https://github.com/SABBiR1107/dashboard');

INSERT INTO certificates (name, url) VALUES 
('AWS Certified Cloud Practitioner', 'https://example.com/certificate1'),
('Google Data Analytics Certificate', 'https://example.com/certificate2');

-- Enable Row Level Security (RLS)
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON contact_info FOR SELECT USING (true);

-- Create policies for admin full access (using service role)
CREATE POLICY "Allow admin full access" ON education FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON skills FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON experience FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON projects FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON certificates FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON contact_info FOR ALL USING (true);
