import { Users, TrendingUp, Award, BookOpen, Home, BarChart2, Settings, Search } from 'lucide-react';

export const stats = [
  { title: 'Total Students', value: '620',  icon: Users },
  { title: 'Percent Science Students not pour', value: '83.2',  icon: TrendingUp },
  { title: 'Percent Social Students not pour', value: '42',  icon: BookOpen },
];

export const navItems = [
  { name: 'Dashboard', path: '/', icon: Home, active: true },
  { name: 'Score Lookup', path: '/score-lookup', icon: Search },
];
