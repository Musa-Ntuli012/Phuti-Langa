# Content Checklist

Use this checklist to track what content needs to be added or updated in the portfolio website.

## ✅ Completed Setup
- [x] Project structure created
- [x] All pages and components built
- [x] Routing configured
- [x] Styling and animations implemented
- [x] Responsive design implemented

## 📝 Content To Add/Update

### Contact Information (`src/utils/constants.js`)
- [ ] Update email address in `CONTACT_INFO.email`
- [ ] Update LinkedIn profile URL in `CONTACT_INFO.linkedin`
- [ ] Add phone number (optional) in `CONTACT_INFO.phone`
- [ ] Update location (optional) in `CONTACT_INFO.location`

### Images
- [ ] Add professional headshot to `public/placeholder-headshot.jpg`
  - Recommended: High resolution, professional suit, circular crop
  - Update path in `src/components/home/Hero.jsx` if using different filename
- [ ] Add favicon to `public/` (replace vite.svg)
- [ ] Add showcase project images (when projects are added)

### Documents
- [ ] Add CV PDF to `public/cv/phuti-langa-cv.pdf`
  - Update file path in `src/pages/CV.jsx` if using different filename
- [ ] Update last updated date in `src/pages/CV.jsx`

### About Page Content

#### Education (`src/components/about/Education.jsx`)
- [ ] Update degree name
- [ ] Update institution name
- [ ] Update period/dates
- [ ] Update description
- [ ] Add/update achievements list
- [ ] Add additional education entries if needed

#### Skills (`src/components/about/Skills.jsx`)
- [ ] Update technical skills list and proficiency levels
- [ ] Update soft skills list
- [ ] Add/remove skills as needed

#### Experience (`src/components/about/Experience.jsx`)
- [ ] Add internship entries
- [ ] Add work experience entries
- [ ] Add volunteer work
- [ ] Add leadership roles
- [ ] Update descriptions and achievements for each entry

#### Interests (`src/components/about/Interests.jsx`)
- [ ] Update professional interests list
- [ ] Update personal interests/hobbies list

### Bio Content (`src/utils/constants.js`)
- [ ] Update `PLACEHOLDER_CONTENT.bio` (short bio for hero section)
- [ ] Update `PLACEHOLDER_CONTENT.fullBio` (full bio for about page)

### Showcase Page (`src/components/showcase/ProjectGrid.jsx`)
- [ ] Add academic projects
- [ ] Add research projects
- [ ] Add writing samples
- [ ] Add presentations
- [ ] Add certifications
- [ ] For each project, include:
  - Title
  - Description
  - Date
  - Category
  - Tags
  - Image (optional)
  - Link (optional)

### Contact Form
- [ ] Set up backend/email service for form submissions
- [ ] Update form submission handler in `src/pages/Contact.jsx`

## 🎨 Design Customization (Optional)

### Colors
- Update in `tailwind.config.js` if you want different colors

### Fonts
- Currently using Playfair Display (serif) and Inter (sans-serif)
- Update in `src/index.css` if you want different fonts

### Animations
- Adjust animation timings in component files if needed
- All animations use Framer Motion

## 🚀 Deployment Checklist

- [ ] Update all placeholder content
- [ ] Test all pages on mobile, tablet, and desktop
- [ ] Test all links (email, LinkedIn, etc.)
- [ ] Verify CV download works
- [ ] Test contact form (if backend is set up)
- [ ] Optimize images
- [ ] Run `npm run build` and test production build
- [ ] Set up hosting (Vercel, Netlify, etc.)
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (optional)

## 📋 Quick Start

1. **Update Contact Info**: Edit `src/utils/constants.js`
2. **Add Headshot**: Place image in `public/placeholder-headshot.jpg`
3. **Add CV**: Place PDF in `public/cv/phuti-langa-cv.pdf`
4. **Update About Content**: Edit files in `src/components/about/`
5. **Add Projects**: Edit `src/components/showcase/ProjectGrid.jsx`
6. **Test**: Run `npm run dev` and review all pages
7. **Build**: Run `npm run build` when ready to deploy

## 💡 Tips

- All placeholder text uses "TODO" comments or placeholder values
- Search for "TODO" in the codebase to find all items that need updating
- The design is fully responsive - test on multiple screen sizes
- All animations are subtle and professional
- The color scheme (Navy Blue, Beige, White) is consistent throughout
