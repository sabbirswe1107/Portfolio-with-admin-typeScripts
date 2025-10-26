# Personal Portfolio Website

A modern, responsive personal portfolio website built with TypeScript, CSS, and Supabase. Features a clean design, admin panel for content management, and dynamic data loading from a Supabase database.

## Features

- **Responsive Design**: Modern, mobile-first design with smooth animations
- **Dynamic Content**: All content is loaded from Supabase database
- **Admin Panel**: Secure admin interface for managing portfolio content
- **TypeScript**: Full type safety and modern JavaScript features
- **Modern CSS**: Custom CSS with CSS variables and modern layout techniques
- **Contact Management**: Integrated contact information with social links

## Sections

- **Home**: Hero section with profile image and introduction
- **Education**: Academic background and qualifications
- **Skills**: Hard and soft skills categorized display
- **Experience**: Professional work experience and responsibilities
- **Projects**: Portfolio projects with descriptions and technologies
- **Certificates**: Professional certifications and achievements
- **Contact**: Contact information and social media links

## Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Icons**: Font Awesome
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to the SQL Editor
4. Run the SQL commands from `database-schema.sql` to create tables and sample data
5. Get your project URL and API keys from Settings > API

### 3. Configure Environment

Update the Supabase configuration in `src/config/supabase.ts` with your project details:

```typescript
export const supabaseConfig = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_ANON_KEY',
  serviceRoleKey: 'YOUR_SERVICE_ROLE_KEY'
};
```

### 4. Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Admin Access

- Navigate to `http://localhost:3000?admin=true`
- Login with:
  - Email: `ahsanursabbir@gmail.com`
  - Password: `Ahs@nursabbir0`

## Database Schema

The application uses the following tables:

- `education`: Academic qualifications
- `skills`: Hard and soft skills
- `experience`: Professional work experience
- `projects`: Portfolio projects
- `certificates`: Professional certifications
- `contact_info`: Contact information (singleton)

## Admin Panel Features

- **CRUD Operations**: Create, read, update, and delete all content types
- **Contact Management**: Update contact information
- **Secure Authentication**: Simple email/password authentication
- **Real-time Updates**: Changes reflect immediately on the portfolio

## Customization

### Styling

- Modify CSS variables in `src/styles/main.css` for color scheme
- Update the hero section content in `src/app.ts`
- Customize the layout and components as needed

### Content

- Use the admin panel to manage all content
- Add your own projects, skills, and experience
- Update contact information and social links

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings
4. Update your Supabase RLS policies for production

### Other Platforms

The application is a static site and can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Security Notes

- Admin panel is protected with simple authentication
- Supabase RLS policies control database access
- Service role key should be kept secure
- Consider implementing more robust authentication for production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Contact

- Email: ahsanursabbir@gmail.com
- LinkedIn: [Ahsanur Rahman Sabbir](https://www.linkedin.com/in/md-ahsanur-rahman-sabbir1107/)
- GitHub: [SABBiR1107](https://github.com/SABBiR1107)
- Website: [ahsanursabbir.vercel.app](https://ahsanursabbir.vercel.app)
