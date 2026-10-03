import type {
  User, Course, Challenge, Project, Feedback,
  RoadmapNode, Achievement, DailyGoal, SkillProgress,
  WeeklyActivity, MentorStudent
} from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Saurav',
  email: 'saurav@example.com',
  role: 'student',
  path: 'Full Stack Web Development',
  level: 'Intermediate',
  overallProgress: 68,
  streak: 7,
  joinedDate: '2026-08-15',
};

export const mentorUser: User = {
  id: 'm1',
  name: 'Deep Review',
  email: 'deep@notyourschool.com',
  role: 'mentor',
  path: '',
  level: '',
  overallProgress: 0,
  streak: 0,
  joinedDate: '2026-01-01',
};

export const courses: Course[] = [
  {
    id: 'html',
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of the web. Master semantic HTML, forms, tables, and accessibility best practices.',
    icon: '🏗️',
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    estimatedHours: 8,
    status: 'completed',
    modules: [
      {
        id: 'html-m1', title: 'Introduction to HTML', progress: 100,
        lessons: [
          { id: 'html-l1', title: 'What is HTML?', type: 'reading', duration: '15 min', completed: true },
          { id: 'html-l2', title: 'Document Structure', type: 'interactive', duration: '20 min', completed: true },
          { id: 'html-l3', title: 'Elements & Tags', type: 'interactive', duration: '25 min', completed: true },
        ]
      },
      {
        id: 'html-m2', title: 'Semantic HTML', progress: 100,
        lessons: [
          { id: 'html-l4', title: 'Semantic Elements', type: 'reading', duration: '20 min', completed: true },
          { id: 'html-l5', title: 'Forms & Inputs', type: 'interactive', duration: '30 min', completed: true },
          { id: 'html-l6', title: 'Tables & Lists', type: 'interactive', duration: '25 min', completed: true },
        ]
      },
      {
        id: 'html-m3', title: 'HTML Best Practices', progress: 100,
        lessons: [
          { id: 'html-l7', title: 'Accessibility', type: 'reading', duration: '20 min', completed: true },
          { id: 'html-l8', title: 'SEO Fundamentals', type: 'reading', duration: '15 min', completed: true },
          { id: 'html-l9', title: 'HTML Project', type: 'interactive', duration: '45 min', completed: true },
        ]
      },
    ],
  },
  {
    id: 'css',
    title: 'CSS Mastery',
    description: 'Style the web with confidence. Learn layouts, animations, responsive design, and modern CSS features.',
    icon: '🎨',
    progress: 82,
    totalLessons: 16,
    completedLessons: 13,
    estimatedHours: 14,
    status: 'in-progress',
    modules: [
      {
        id: 'css-m1', title: 'CSS Basics', progress: 100,
        lessons: [
          { id: 'css-l1', title: 'Selectors & Properties', type: 'reading', duration: '20 min', completed: true },
          { id: 'css-l2', title: 'Box Model', type: 'interactive', duration: '25 min', completed: true },
          { id: 'css-l3', title: 'Typography', type: 'interactive', duration: '20 min', completed: true },
          { id: 'css-l4', title: 'Colors & Backgrounds', type: 'interactive', duration: '20 min', completed: true },
        ]
      },
      {
        id: 'css-m2', title: 'Layout', progress: 100,
        lessons: [
          { id: 'css-l5', title: 'Flexbox', type: 'interactive', duration: '30 min', completed: true },
          { id: 'css-l6', title: 'CSS Grid', type: 'interactive', duration: '35 min', completed: true },
          { id: 'css-l7', title: 'Positioning', type: 'interactive', duration: '25 min', completed: true },
          { id: 'css-l8', title: 'Responsive Design', type: 'interactive', duration: '30 min', completed: true },
        ]
      },
      {
        id: 'css-m3', title: 'Advanced CSS', progress: 60,
        lessons: [
          { id: 'css-l9', title: 'Animations & Transitions', type: 'interactive', duration: '30 min', completed: true },
          { id: 'css-l10', title: 'CSS Variables', type: 'reading', duration: '20 min', completed: true },
          { id: 'css-l11', title: 'Modern CSS Features', type: 'reading', duration: '25 min', completed: true },
          { id: 'css-l12', title: 'CSS Architecture', type: 'reading', duration: '20 min', completed: false },
        ]
      },
      {
        id: 'css-m4', title: 'CSS Projects', progress: 25,
        lessons: [
          { id: 'css-l13', title: 'Landing Page', type: 'interactive', duration: '45 min', completed: true },
          { id: 'css-l14', title: 'Dashboard Layout', type: 'interactive', duration: '50 min', completed: true },
          { id: 'css-l15', title: 'Animated Portfolio', type: 'interactive', duration: '60 min', completed: false },
          { id: 'css-l16', title: 'CSS Art Challenge', type: 'interactive', duration: '45 min', completed: false },
        ]
      },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Master the language of the web. Learn variables, functions, DOM manipulation, async programming, and more.',
    icon: '⚡',
    progress: 64,
    totalLessons: 20,
    completedLessons: 13,
    estimatedHours: 20,
    status: 'in-progress',
    modules: [
      {
        id: 'js-m1', title: 'Variables & Data Types', progress: 100,
        lessons: [
          { id: 'js-l1', title: 'Variables (let, const, var)', type: 'reading', duration: '20 min', completed: true },
          { id: 'js-l2', title: 'Data Types', type: 'interactive', duration: '25 min', completed: true },
          { id: 'js-l3', title: 'Operators', type: 'interactive', duration: '20 min', completed: true },
          { id: 'js-l4', title: 'Type Conversion', type: 'interactive', duration: '15 min', completed: true },
        ]
      },
      {
        id: 'js-m2', title: 'Functions & Scope', progress: 60,
        lessons: [
          { id: 'js-l5', title: 'Function Declarations', type: 'reading', duration: '20 min', completed: true,
            content: `# Function Declarations in JavaScript

Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code designed to perform a particular task.

## Function Declaration Syntax

A function declaration defines a named function. It consists of the \`function\` keyword, followed by the function name, parameters in parentheses, and the function body in curly braces.

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Saurav")); // "Hello, Saurav!"
\`\`\`

## Key Characteristics

### Hoisting
Function declarations are **hoisted** to the top of their scope. This means you can call a function before it appears in your code:

\`\`\`javascript
// This works!
sayHello(); // "Hello!"

function sayHello() {
  console.log("Hello!");
}
\`\`\`

### Parameters and Arguments
Functions can accept multiple parameters:

\`\`\`javascript
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8
\`\`\`

### Default Parameters (ES6+)
You can set default values for parameters:

\`\`\`javascript
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}

console.log(greet());        // "Hello, World!"
console.log(greet("Saurav")); // "Hello, Saurav!"
\`\`\`

## Practice Exercise

Try creating a function that calculates the area of a rectangle:

\`\`\`javascript
function calculateArea(width, height) {
  return width * height;
}
\`\`\`

Now modify it to include a default height of 1.`
          },
          { id: 'js-l6', title: 'Arrow Functions', type: 'interactive', duration: '25 min', completed: true },
          { id: 'js-l7', title: 'Scope & Closures', type: 'reading', duration: '30 min', completed: true },
          { id: 'js-l8', title: 'Higher-Order Functions', type: 'interactive', duration: '30 min', completed: false },
          { id: 'js-l9', title: 'Callbacks', type: 'interactive', duration: '25 min', completed: false },
        ]
      },
      {
        id: 'js-m3', title: 'Arrays & Objects', progress: 50,
        lessons: [
          { id: 'js-l10', title: 'Array Methods', type: 'interactive', duration: '30 min', completed: true },
          { id: 'js-l11', title: 'Object Fundamentals', type: 'reading', duration: '25 min', completed: true },
          { id: 'js-l12', title: 'Destructuring', type: 'interactive', duration: '20 min', completed: true },
          { id: 'js-l13', title: 'Spread & Rest', type: 'interactive', duration: '20 min', completed: false },
        ]
      },
      {
        id: 'js-m4', title: 'DOM Manipulation', progress: 25,
        lessons: [
          { id: 'js-l14', title: 'Selecting Elements', type: 'interactive', duration: '20 min', completed: true },
          { id: 'js-l15', title: 'Event Listeners', type: 'interactive', duration: '25 min', completed: false },
          { id: 'js-l16', title: 'Creating Elements', type: 'interactive', duration: '25 min', completed: false },
        ]
      },
      {
        id: 'js-m5', title: 'Async JavaScript', progress: 0,
        lessons: [
          { id: 'js-l17', title: 'Promises', type: 'reading', duration: '30 min', completed: false },
          { id: 'js-l18', title: 'Async/Await', type: 'interactive', duration: '30 min', completed: false },
          { id: 'js-l19', title: 'Fetch API', type: 'interactive', duration: '25 min', completed: false },
          { id: 'js-l20', title: 'Error Handling', type: 'interactive', duration: '20 min', completed: false },
        ]
      },
    ],
  },
  {
    id: 'git',
    title: 'Git & GitHub',
    description: 'Version control essentials. Learn branching, merging, pull requests, and collaboration workflows.',
    icon: '🔀',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    estimatedHours: 6,
    status: 'available',
    modules: [
      {
        id: 'git-m1', title: 'Git Basics', progress: 0,
        lessons: [
          { id: 'git-l1', title: 'Introduction to Git', type: 'reading', duration: '20 min', completed: false },
          { id: 'git-l2', title: 'Commits & History', type: 'interactive', duration: '25 min', completed: false },
          { id: 'git-l3', title: 'Branching & Merging', type: 'interactive', duration: '30 min', completed: false },
          { id: 'git-l4', title: 'Remote Repositories', type: 'interactive', duration: '25 min', completed: false },
        ]
      },
      {
        id: 'git-m2', title: 'GitHub Workflows', progress: 0,
        lessons: [
          { id: 'git-l5', title: 'Pull Requests', type: 'interactive', duration: '25 min', completed: false },
          { id: 'git-l6', title: 'Code Reviews', type: 'reading', duration: '20 min', completed: false },
          { id: 'git-l7', title: 'GitHub Actions Intro', type: 'reading', duration: '20 min', completed: false },
          { id: 'git-l8', title: 'Collaboration Project', type: 'interactive', duration: '45 min', completed: false },
        ]
      },
    ],
  },
  {
    id: 'react',
    title: 'React Development',
    description: 'Build modern user interfaces. Learn components, hooks, state management, and React patterns.',
    icon: '⚛️',
    progress: 25,
    totalLessons: 18,
    completedLessons: 4,
    estimatedHours: 22,
    status: 'locked',
    modules: [
      {
        id: 'react-m1', title: 'React Fundamentals', progress: 0,
        lessons: [
          { id: 'react-l1', title: 'JSX & Components', type: 'reading', duration: '25 min', completed: false },
          { id: 'react-l2', title: 'Props & State', type: 'interactive', duration: '30 min', completed: false },
          { id: 'react-l3', title: 'Event Handling', type: 'interactive', duration: '25 min', completed: false },
        ]
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Server-side fundamentals with Node.js and Express. APIs, databases, and authentication.',
    icon: '🖥️',
    progress: 10,
    totalLessons: 20,
    completedLessons: 2,
    estimatedHours: 25,
    status: 'locked',
    modules: [],
  },
];

export const challenges: Challenge[] = [
  {
    id: 'ch1',
    title: 'Responsive Navigation Bar',
    description: 'Create a responsive navigation bar that collapses into a hamburger menu on mobile devices. Include smooth transitions and accessible markup.',
    difficulty: 'Medium',
    estimatedTime: '45 min',
    skills: ['HTML', 'CSS', 'JavaScript'],
    completed: false,
    courseId: 'javascript',
  },
  {
    id: 'ch2',
    title: 'Array Filter & Map',
    description: 'Use array methods to filter and transform a dataset of products. Display only items under a certain price, sorted by rating.',
    difficulty: 'Easy',
    estimatedTime: '30 min',
    skills: ['JavaScript'],
    completed: true,
    courseId: 'javascript',
  },
  {
    id: 'ch3',
    title: 'CSS Grid Dashboard',
    description: 'Build a dashboard layout using CSS Grid with responsive breakpoints. Include a sidebar, header, main content area, and widgets.',
    difficulty: 'Medium',
    estimatedTime: '60 min',
    skills: ['HTML', 'CSS'],
    completed: true,
    courseId: 'css',
  },
  {
    id: 'ch4',
    title: 'Promise Chain',
    description: 'Fetch data from multiple APIs sequentially and handle errors gracefully using Promise chains and async/await.',
    difficulty: 'Hard',
    estimatedTime: '60 min',
    skills: ['JavaScript', 'APIs'],
    completed: false,
    courseId: 'javascript',
  },
  {
    id: 'ch5',
    title: 'Form Validation',
    description: 'Build a registration form with real-time validation. Validate email format, password strength, and matching confirmation.',
    difficulty: 'Medium',
    estimatedTime: '45 min',
    skills: ['HTML', 'CSS', 'JavaScript'],
    completed: false,
    courseId: 'javascript',
  },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Portfolio Website',
    description: 'Build a personal portfolio website showcasing your projects, skills, and experience. Include responsive design, smooth animations, and contact form.',
    difficulty: 'Beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    progress: 100,
    status: 'approved',
    milestones: [
      { id: 'p1-m1', title: 'Design & Layout', completed: true },
      { id: 'p1-m2', title: 'Responsive Design', completed: true },
      { id: 'p1-m3', title: 'Animations & Polish', completed: true },
      { id: 'p1-m4', title: 'Deploy to Production', completed: true },
    ],
    deadline: '2026-09-15',
    mentorId: 'm1',
    githubUrl: 'https://github.com/saurav/portfolio',
    liveUrl: 'https://saurav-portfolio.vercel.app',
  },
  {
    id: 'p2',
    title: 'Weather Application',
    description: 'Create a weather application that fetches real-time data from a weather API. Display current conditions, forecasts, and allow location search.',
    difficulty: 'Intermediate',
    technologies: ['HTML', 'CSS', 'JavaScript', 'APIs'],
    progress: 72,
    status: 'in-progress',
    milestones: [
      { id: 'p2-m1', title: 'API Integration', completed: true },
      { id: 'p2-m2', title: 'UI Components', completed: true },
      { id: 'p2-m3', title: 'Search & Geolocation', completed: true },
      { id: 'p2-m4', title: 'Forecast Display', completed: false },
      { id: 'p2-m5', title: 'Error Handling & Polish', completed: false },
    ],
    deadline: '2026-10-20',
    mentorId: 'm1',
  },
  {
    id: 'p3',
    title: 'Task Manager',
    description: 'Build a full-featured task management application with categories, priorities, due dates, and drag-and-drop reordering.',
    difficulty: 'Intermediate',
    technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    progress: 35,
    status: 'in-progress',
    milestones: [
      { id: 'p3-m1', title: 'CRUD Operations', completed: true },
      { id: 'p3-m2', title: 'Categories & Filters', completed: true },
      { id: 'p3-m3', title: 'Drag & Drop', completed: false },
      { id: 'p3-m4', title: 'Data Persistence', completed: false },
      { id: 'p3-m5', title: 'UI Polish', completed: false },
    ],
    deadline: '2026-11-01',
    mentorId: 'm1',
  },
  {
    id: 'p4',
    title: 'Movie Explorer',
    description: 'Create a movie discovery app using a movie database API. Include search, filtering by genre, detailed movie pages, and a favorites list.',
    difficulty: 'Intermediate',
    technologies: ['React', 'CSS', 'APIs'],
    progress: 0,
    status: 'not-started',
    milestones: [
      { id: 'p4-m1', title: 'Project Setup & API', completed: false },
      { id: 'p4-m2', title: 'Movie Grid & Search', completed: false },
      { id: 'p4-m3', title: 'Movie Details Page', completed: false },
      { id: 'p4-m4', title: 'Favorites & Filters', completed: false },
    ],
    deadline: '2026-12-01',
  },
  {
    id: 'p5',
    title: 'Full Stack Dashboard',
    description: 'Build a complete dashboard with authentication, data visualization, and CRUD operations using React and Node.js.',
    difficulty: 'Advanced',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    progress: 0,
    status: 'not-started',
    milestones: [
      { id: 'p5-m1', title: 'Backend API Setup', completed: false },
      { id: 'p5-m2', title: 'Authentication', completed: false },
      { id: 'p5-m3', title: 'Dashboard UI', completed: false },
      { id: 'p5-m4', title: 'Data Visualization', completed: false },
      { id: 'p5-m5', title: 'Deployment', completed: false },
    ],
  },
];

export const feedbacks: Feedback[] = [
  {
    id: 'f1',
    projectId: 'p1',
    projectTitle: 'Portfolio Website',
    mentorName: 'Deep Review',
    date: '2026-09-18',
    status: 'approved',
    strengths: [
      'Excellent semantic HTML structure',
      'Clean component organization',
      'Good use of CSS custom properties',
      'Smooth animations and transitions',
    ],
    improvements: [],
    suggestions: [
      'Consider adding a blog section for future content',
    ],
    comment: 'Great work on your portfolio! The design is clean and professional. Your code structure shows strong understanding of HTML/CSS fundamentals.',
  },
  {
    id: 'f2',
    projectId: 'p2',
    projectTitle: 'Weather Application',
    mentorName: 'Deep Review',
    date: '2026-10-01',
    status: 'revision-requested',
    strengths: [
      'Good API integration patterns',
      'Clean typography choices',
    ],
    improvements: [
      'Improve mobile responsiveness — layout breaks below 375px',
      'Add proper error states for failed API calls',
      'Improve accessibility — missing ARIA labels on interactive elements',
    ],
    suggestions: [
      'Use CSS Grid for the forecast section layout',
      'Consider adding a loading skeleton instead of a spinner',
      'Cache API responses to reduce unnecessary network requests',
    ],
    comment: 'Good progress! The core functionality works well. Focus on the mobile experience and error handling before resubmitting.',
  },
];

export const roadmapNodes: RoadmapNode[] = [
  { id: 'r1', title: 'HTML', courseId: 'html', status: 'completed', progress: 100, lessons: 12, projects: 1 },
  { id: 'r2', title: 'CSS', courseId: 'css', status: 'completed', progress: 82, lessons: 16, projects: 1 },
  { id: 'r3', title: 'JavaScript', courseId: 'javascript', status: 'current', progress: 64, lessons: 20, projects: 2 },
  { id: 'r4', title: 'Git & GitHub', courseId: 'git', status: 'locked', progress: 0, lessons: 8, projects: 1 },
  { id: 'r5', title: 'Responsive Design', courseId: 'css', status: 'locked', progress: 0, lessons: 6, projects: 1 },
  { id: 'r6', title: 'React', courseId: 'react', status: 'locked', progress: 0, lessons: 18, projects: 2 },
  { id: 'r7', title: 'Backend', courseId: 'backend', status: 'locked', progress: 0, lessons: 20, projects: 2 },
  { id: 'r8', title: 'Database', courseId: 'backend', status: 'locked', progress: 0, lessons: 10, projects: 1 },
  { id: 'r9', title: 'Full Stack', courseId: 'backend', status: 'locked', progress: 0, lessons: 15, projects: 1 },
  { id: 'r10', title: 'Capstone', courseId: 'backend', status: 'locked', progress: 0, lessons: 0, projects: 1 },
];

export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: true, date: '2026-08-16' },
  { id: 'a2', title: 'HTML Master', description: 'Complete the HTML course', icon: '🏗️', earned: true, date: '2026-08-28' },
  { id: 'a3', title: 'First Project', description: 'Submit your first project', icon: '🚀', earned: true, date: '2026-09-10' },
  { id: 'a4', title: 'Code Streak', description: 'Maintain a 7-day streak', icon: '🔥', earned: true, date: '2026-10-02' },
  { id: 'a5', title: 'JavaScript Builder', description: 'Complete 10 JS lessons', icon: '⚡', earned: true, date: '2026-09-25' },
  { id: 'a6', title: 'Challenge Champion', description: 'Complete 5 challenges', icon: '🏆', earned: false },
  { id: 'a7', title: 'Full Stack Ready', description: 'Complete the full stack path', icon: '💎', earned: false },
  { id: 'a8', title: 'Portfolio Pro', description: 'Get portfolio project approved', icon: '✨', earned: true, date: '2026-09-18' },
];

export const dailyGoals: DailyGoal[] = [
  { id: 'dg1', title: 'Complete a lesson', completed: true },
  { id: 'dg2', title: 'Solve 2 challenges', completed: true },
  { id: 'dg3', title: 'Work 30 min on project', completed: false },
];

export const skillProgress: SkillProgress[] = [
  { name: 'HTML', progress: 100, color: '#f97316' },
  { name: 'CSS', progress: 82, color: '#3b82f6' },
  { name: 'JavaScript', progress: 64, color: '#eab308' },
  { name: 'React', progress: 25, color: '#06b6d4' },
  { name: 'Backend', progress: 10, color: '#8b5cf6' },
];

export const weeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.8 },
  { day: 'Wed', hours: 3.2 },
  { day: 'Thu', hours: 2.0 },
  { day: 'Fri', hours: 1.5 },
  { day: 'Sat', hours: 4.0 },
  { day: 'Sun', hours: 2.8 },
];

export const mentorStudents: MentorStudent[] = [
  { id: 'ms1', name: 'Saurav', project: 'Weather Application', submittedDate: '2026-10-01', status: 'pending' },
  { id: 'ms2', name: 'Priya Sharma', project: 'Task Manager', submittedDate: '2026-10-02', status: 'pending' },
  { id: 'ms3', name: 'Arjun Patel', project: 'Portfolio Website', submittedDate: '2026-09-30', status: 'pending' },
  { id: 'ms4', name: 'Meera Reddy', project: 'Movie Explorer', submittedDate: '2026-10-01', status: 'pending' },
  { id: 'ms5', name: 'Rahul Kumar', project: 'CSS Grid Dashboard', submittedDate: '2026-09-29', status: 'reviewed' },
  { id: 'ms6', name: 'Ananya Singh', project: 'Portfolio Website', submittedDate: '2026-09-28', status: 'reviewed' },
  { id: 'ms7', name: 'Vikram Das', project: 'Weather Application', submittedDate: '2026-09-27', status: 'reviewed' },
  { id: 'ms8', name: 'Neha Gupta', project: 'Form Validation', submittedDate: '2026-10-02', status: 'pending' },
];
