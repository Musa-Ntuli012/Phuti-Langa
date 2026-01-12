# Phuti Langa - Personal Portfolio Website

A minimalist, professional personal portfolio website showcasing professional credentials, experience, and contact information.

## Features

- 🎨 **Minimalist Design** - Clean, elegant design with navy blue and beige color scheme
- 📱 **Fully Responsive** - Mobile-first approach, works on all devices
- ⚡ **Fast Performance** - Optimized with Vite and code splitting
- 🎭 **Smooth Animations** - Beautiful transitions using Framer Motion
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🔍 **SEO Optimized** - Meta tags and semantic HTML

## Tech Stack

- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Header, Footer, Button, etc.)
│   ├── home/            # Home page components
│   ├── about/           # About page components
│   ├── showcase/        # Showcase page components
│   └── contact/         # Contact page components
├── pages/               # Page components
├── utils/               # Utility functions and constants
├── assets/              # Images, documents, icons
├── App.jsx              # Main app component with routing
└── main.jsx             # Entry point
```

## Customization

### Update Contact Information

Edit `src/utils/constants.js`:
- Email address
- LinkedIn profile URL
- Phone number (optional)
- Location (optional)

### Add Content

1. **About Page**: Update components in `src/components/about/`
   - Education details
   - Skills list
   - Experience entries
   - Professional and personal interests

2. **Showcase Page**: Add projects to the projects array in `src/components/showcase/ProjectGrid.jsx`

3. **CV Page**: 
   - Place your CV PDF in `public/cv/phuti-langa-cv.pdf`
   - Update the file path in `src/pages/CV.jsx`

4. **Images**:
   - Add professional headshot to `public/placeholder-headshot.jpg` or update the path in `src/components/home/Hero.jsx`

### Color Scheme

The color palette is defined in `tailwind.config.js`:
- Primary: Navy Blue (#1a2332)
- Secondary: Beige (#e8dcc4)
- Accent: White (#ffffff)

## Pages

- **Home** (`/`) - Landing page with hero section and navigation cards
- **About** (`/about`) - Professional overview, education, skills, experience, and interests
- **Showcase** (`/showcase`) - Projects, research, and achievements
- **CV** (`/cv`) - Downloadable CV with preview
- **Contact** (`/contact`) - Contact information and form

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For questions or support, please contact Phuti Langa through the contact page.
