# Kanban To-Do List Dashboard

A React-based Kanban board application for task management with four workflow columns: **Backlog**, **In Progress**, **Review**, and **Done**.

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks
- **Kanban Board**: Four-column workflow visualization
- **Search Functionality**: Find tasks by title or description
- **Pagination**: Efficient loading of tasks in each column
- **React Query Caching**: Optimized data fetching and state management
- **Material UI**: Clean and responsive user interface

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **UI Library**: Material UI (MUI)
- **Form Handling**: Formik + Yup validation
- **HTTP Client**: Axios
- **Notifications**: Notistack
- **Build Tool**: Vite

## 📋 Task Schema

Each task follows this structure:

\`\`\`json
{
  "id": 1,
  "title": "Design homepage",
  "description": "Include hero section and navigation",
  "column": "backlog"
}
\`\`\`

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone [<repository-url>](https://github.com/randa-11295/To-Do-App.git)
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🌐 API Endpoints

The application connects to MockAPI at `https://68b89d9db71540504328bb0a.mockapi.io/api/tasks`

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## 📁 Project Structure

\`\`\`
src/
├── api/                 # API configuration and endpoints
├── components/          # Reusable UI components
│   ├── cards/          # Task card components
│   ├── Forms/          # Form components
│   └── Inputs/         # Input field components
├── hooks/              # Custom React hooks
├── pages/              # Main application pages
├── utils/              # Utility functions
└── validation/         # Form validation schemas
\`\`\`

## 🎯 Core Functionality

### Task Operations
- **Create**: Add new tasks with title and description
- **Read**: View tasks organized by workflow column
- **Update**: Edit task details and move between columns
- **Delete**: Remove tasks from the board

### Search & Filter
- Search tasks by title or description
- Real-time filtering across all columns

### Data Management
- React Query for efficient caching and synchronization
- Optimistic updates for better user experience
- Error handling and loading states

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Deployment

The application can be deployed to platforms like Vercel or Netlify:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Ensure the API endpoint is accessible from your deployed application

## 🎨 Bonus: jQuery Dynamic List

A separate jQuery implementation is included for a simple dynamic list with:
- Add items to a list
- Delete items with fade-out animation
- Input validation with error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of a technical assessment and is for demonstration purposes.
