NACOS Anchor University Digital Platform (Frontend)

This is the official Frontend repository for the NACOS Anchor University Digital Platform. It is a centralized web-based system for student onboarding, payments, academic resources, and departmental administration.

Tech Stack

    Framework: React 19 + Vite (SPA) 

Language: JavaScript (ES6+)

Styling: Tailwind CSS v4

State Management: Zustand (Global Auth/User Store)

Data Fetching: TanStack Query (React Query) + Axios

Routing: React Router v6

Backend: PHP (RESTful API)

Getting Started
1. Prerequisites

    Node.js (v18 or higher)

    Git

2. Installation
Bash

# Clone the repository
git clone <repository_url>

# Navigate into the folder
cd nacos-anchor-platform

# Install dependencies
npm install

3. Environment Setup

Create a .env file in the root directory. Copy the keys from .env.example (if available).
Code snippet

VITE_API_BASE_URL=http://localhost:8000/api

    Note: The axios-client.js file automatically uses this URL for all API requests.

4. Run the Project
Bash

npm run dev

 Project Structure (READ THIS!)

We use a Feature-Based Architecture. Do not dump everything into components/.
src/features/ (The Core Logic)

Group code by Module, not file type. If you are building the "SIWES Board", everything related to it goes into features/siwes/.

    auth/: Login, Signup, and Password Reset forms.

student/: Components specific to the Student Dashboard (e.g., ID Card, Portfolio).

admin/: Components specific to the Exco Dashboard (e.g., Approvals, Analytics).

library/: Academic resource sharing interface.

communication/: Chat, Polls, and Announcements.

siwes/: Job board and opportunity listings.

src/components/ (Shared UI)

    ui/: Dumb, reusable components (Buttons, Inputs, Modals, Cards). Check here before building a new button!

    shared/: Smart components used globally (Navbar, Footer, ProtectedRoute).

src/store/ (State)

    useUserStore.js: Handles user login sessions and Role-Based Access Control (Student vs. Admin).

src/config/

    axios-client.js: The pre-configured Axios instance. Always import this instead of standard axios. It handles the JWT Bearer token automatically.

 Development Rules

    Do not use direct CSS files. Use Tailwind utility classes.

    Do not hardcode API URLs. Use the instance from @/config/axios-client.

    Check your Role.

        If you are working on Student features, work inside src/pages/student and src/layouts/StudentLayout.jsx.

        If you are working on Admin features, work inside src/pages/admin and src/layouts/AdminLayout.jsx.

    Empty Folders: If a folder in features/ is empty, ensure it has a .gitkeep file so Git tracks it.

 Auth & Roles

The app has two distinct areas based on the user's role:

    Student: Can access Dashboard, Library, Payments, and Chat.

    Admin (Exco): Can access Approvals, User Management, and Financial Reports.

This is handled by the <ProtectedRoutes /> component.
Contribution Workflow

    Pull the latest changes: git pull origin main

    Create a branch: git checkout -b feature/your-feature-name

    Commit your changes: git commit -m "feat: added id card generation"

    Push: git push origin feature/your-feature-name

    Thank you very much!