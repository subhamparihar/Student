# Student Work-Study Management System

A modern, production-ready frontend for managing work-study positions at academic institutions. Built with React, Vite, and plain CSS with full role-based access control for Admins and Students.

## ✨ Features

### For All Users
- **Job Browsing**: Search and filter available work-study positions
- **Job Details**: View comprehensive information about each position including pay rate, location, and requirements
- **Responsive Design**: Fully responsive interface supporting mobile, tablet, and desktop views

### For Students
- **Dashboard**: Personal overview with application status, hours logged, and earnings
- **Job Applications**: Track application status (pending, approved, rejected) with feedback
- **Hours Tracking**: Log work hours with detailed records
- **Earnings Calculation**: Real-time calculation of earnings based on logged hours

### For Administrators
- **Job Management**: Create, edit, and delete work-study positions
- **Application Review**: Review student applications with approval/rejection capabilities
- **Feedback System**: Leave detailed feedback for applications
- **Statistics Dashboard**: Overview of total jobs, applications, and logged hours

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Navigate to the project directory:
```bash
cd SManage
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL displayed in the terminal (typically `http://localhost:5173`)

## 🔐 Demo Credentials

### Admin Account
```
Email: admin@university.edu
Password: admin123
```

### Student Accounts
```
Email: student1@university.edu
Password: student123

Email: student2@university.edu
Password: student123
```

## 📁 Project Structure

```
SManage/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar with role-aware menu
│   │   ├── Modal.jsx       # Reusable modal dialog
│   │   ├── JobCard.jsx     # Job posting card component
│   │   ├── ApplicationCard.jsx  # Application status card
│   │   └── StatCard.jsx    # Statistics display card
│   │
│   ├── context/            # React Context for state management
│   │   ├── AuthContext.jsx # Authentication & authorization logic
│   │   └── DataContext.jsx # Jobs, applications, hours data management
│   │
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Jobs.jsx        # Job listing page
│   │   ├── JobDetails.jsx  # Job detail page
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Unauthorized.jsx # 403 error page
│   │   ├── admin/          # Admin-only pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Jobs.jsx
│   │   │   └── Applications.jsx
│   │   └── student/        # Student-only pages
│   │       ├── Dashboard.jsx
│   │       ├── Applications.jsx
│   │       └── Hours.jsx
│   │
│   ├── layouts/            # Layout components
│   │   ├── PublicLayout.jsx    # Navbar + content + footer
│   │   ├── AdminLayout.jsx     # Sidebar + content for admin
│   │   └── StudentLayout.jsx   # Sidebar + content for student
│   │
│   ├── routes/             # Routing configuration
│   │   ├── ProtectedRoute.jsx # Route protection with role checking
│   │   └── index.jsx       # Router configuration
│   │
│   ├── styles/             # Modular CSS stylesheets
│   │   ├── navbar.css
│   │   ├── modal.css
│   │   ├── card.css
│   │   ├── stat-card.css
│   │   ├── layouts.css
│   │   └── pages/          # Page-specific styles
│   │       ├── home.css
│   │       ├── jobs.css
│   │       ├── job-details.css
│   │       ├── auth.css
│   │       ├── error.css
│   │       ├── dashboard.css
│   │       ├── admin-jobs.css
│   │       ├── admin-applications.css
│   │       ├── student-applications.css
│   │       └── student-hours.css
│   │
│   ├── App.jsx             # Main app component with providers
│   ├── App.css             # App-level styles
│   ├── global.css          # Global styles and CSS variables
│   ├── index.css           # CSS imports
│   └── main.jsx            # React entry point
│
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Secondary**: #64748b (Slate)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)

### Typography
- **Font Family**: System UI (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Base Font Size**: 1rem (16px)

### Spacing
- **Border Radius**: 8px
- **Shadows**: Small, Medium, Large variants
- **Gap/Padding**: Consistent 0.5rem to 2rem scale

## 🔄 Authentication & Authorization

The application uses React Context API for authentication and role-based access control.

### How It Works
1. User logs in with email and password
2. Credentials are validated against mock user data
3. User data (name, email, role) is stored in localStorage and React state
4. Protected routes check user authentication and role
5. Unauthorized users are redirected to login or unauthorized page

### Roles
- **Admin**: Full access to job and application management
- **Student**: Access to job browsing, applications, and hours tracking

## 📊 State Management

### AuthContext
Manages user authentication state including:
- Current user information
- Login/logout functionality
- Role-based authorization helpers
- localStorage persistence

### DataContext  
Manages application data including:
- Work-study jobs (CRUD operations)
- Student applications (application, approval, rejection)
- Hours logs (logging and tracking)
- Application feedback

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Features Implementation

### Protected Routes
Routes are protected using the `ProtectedRoute` component which:
- Checks if user is authenticated
- Verifies user role matches route requirements
- Redirects unauthorized users appropriately

### Mock Data
The application includes comprehensive mock data:
- **Users**: 1 admin + 2 students
- **Jobs**: 5 work-study positions with full details
- **Applications**: 4 sample applications with various statuses
- **Hours Logs**: 4 logged hours entries

## 🔧 Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module reloading.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Preview
```bash
npm run preview
```
Previews the production build locally.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality.

## 🎓 Learning Resources

This project demonstrates:
- React Hooks (useState, useContext, useEffect, useCallback)
- React Context API for state management
- React Router for client-side routing
- Protected routes and role-based access control
- Form handling and validation
- Responsive CSS Grid and Flexbox layouts
- Component composition and reusability
- localStorage API for persistence

## 📝 Development Notes

### No External UI Libraries
This project uses only plain CSS for styling, demonstrating:
- CSS variables for theming
- CSS Grid and Flexbox for layouts
- CSS transitions and animations
- Mobile-first responsive design

### Component Structure
- Components are functional and hook-based
- Prop patterns follow React best practices
- Context providers wrap the entire app for global state access

### Code Organization
- Feature-based folder structure
- Separation of concerns (components, pages, contexts, routes)
- Consistent naming conventions
- Well-commented code with JSDoc comments

## 🚀 Deployment

The built application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps

```bash
npm run build
# Then deploy the dist/ folder
```

## 📞 Support

For issues or questions, please ensure:
1. You have Node.js v16+ installed
2. All dependencies are installed (`npm install`)
3. No port conflicts on port 5173
4. You're using the correct demo credentials

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using React, Vite, and Plain CSS**
