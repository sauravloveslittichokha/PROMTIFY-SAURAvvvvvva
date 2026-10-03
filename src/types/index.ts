export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'mentor';
  path: string;
  level: string;
  overallProgress: number;
  streak: number;
  joinedDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedHours: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'reading' | 'video' | 'interactive' | 'quiz';
  duration: string;
  completed: boolean;
  content?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  skills: string[];
  completed: boolean;
  courseId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
  progress: number;
  status: 'not-started' | 'in-progress' | 'submitted' | 'under-review' | 'revision-requested' | 'approved';
  milestones: Milestone[];
  deadline?: string;
  mentorId?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Feedback {
  id: string;
  projectId: string;
  projectTitle: string;
  mentorName: string;
  date: string;
  status: 'approved' | 'revision-requested';
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  comment: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  courseId: string;
  status: 'completed' | 'current' | 'locked';
  progress: number;
  lessons: number;
  projects: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

export interface DailyGoal {
  id: string;
  title: string;
  completed: boolean;
}

export interface SkillProgress {
  name: string;
  progress: number;
  color: string;
}

export interface WeeklyActivity {
  day: string;
  hours: number;
}

export interface MentorStudent {
  id: string;
  name: string;
  avatar?: string;
  project: string;
  submittedDate: string;
  status: 'pending' | 'reviewed';
}
