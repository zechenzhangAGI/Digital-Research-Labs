# Harvard Physics Research Discovery Platform

## Project Vision

A web platform that helps undergraduate students discover physics research opportunities at Harvard, explore what different labs are working on, and find their path to getting involved in cutting-edge research.

## Core Purpose

Make physics research accessible and approachable for undergraduate students by providing clear information about labs, personalized recommendations, and guidance on how to join research projects.

## Key User Needs

### Undergraduate Students
- **Research Discovery**: Learn what research is happening across the Physics Department
- **Interest Matching**: Find labs that align with their coursework and interests
- **Getting Started**: Understand how to approach faculty and join research projects
- **Inspiration**: See success stories from other undergraduates in research
- **Location Finding**: Navigate buildings to find lab locations for meetings

### Faculty & Lab Members
- **Student Outreach**: Make their research visible to interested undergraduates
- **Showcase Work**: Highlight exciting projects and recent discoveries
- **Recruit Talent**: Connect with motivated students looking for opportunities

## Core Features

### 1. Research Lab Directory
- **Student-Friendly Descriptions**: Clear explanations of research areas and projects
- **Lab Profiles**: PI information, team size, research focus, sample projects
- **Getting Involved**: Information about openings and how to reach out
- **Visual Content**: Images and graphics showcasing research

### 2. AI Research Matcher
- **Personalized Recommendations**: Match students with labs based on interests and skills
- **Research Area Explorer**: Learn about different physics subfields
- **Success Stories**: Real examples of undergraduates in research
- **Smart Matching**: Consider coursework, time commitment, and experience level

### 3. Interactive Lab Map
- **Building Navigation**: Find lab locations across physics buildings
- **Floor Plans**: Visual layouts of Jefferson, Lyman, and LISE
- **Lab Information**: Quick details when clicking on rooms
- **Color-Coded Areas**: Distinguish research types visually

### 4. Simple & Clean Interface
- **Easy Navigation**: Three main sections (Labs, Map, AI Matcher)
- **Search & Filter**: Find labs by research area or PI name
- **Mobile Friendly**: Works well on phones for on-the-go browsing
- **Fast Loading**: Optimized for quick information access

## Technical Architecture

### Frontend
- **Framework**: Next.js 15 with App Router (React 18)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context + Zustand for complex state
- **Data Fetching**: TanStack Query for caching and synchronization

### Backend (Planned)
- **API**: REST API for lab data management
- **Database**: Simple data storage for lab information
- **Content Management**: Easy updates for lab profiles

### AI Integration
- **Provider**: Vercel AI SDK for natural language matching
- **Features**:
  - Natural language interest matching
  - Lab recommendation based on coursework
  - Research area explanations
  - Success story highlighting

## Design Principles

### Visual Design
- **Clean & Simple**: Minimalist interface focused on discovery
- **Student-Friendly**: Clear language, no jargon unless explained
- **Harvard Brand**: Blue and crimson accents, institutional identity
- **Dark Mode Support**: Comfortable viewing at any time
- **Responsive**: Works perfectly on phones for browsing anywhere

### User Experience
- **Easy Navigation**: Three main sections - Labs, Map, AI Matcher
- **Quick Discovery**: Find relevant labs in under 1 minute
- **Clear Actions**: Obvious next steps for getting involved
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile-First**: Designed for on-the-go exploration

### Performance
- **Fast Loading**: Instant page loads
- **Smooth Interactions**: No lag in search or navigation
- **SEO Optimized**: Easy to find via Google searches

## Implementation Phases

### Phase 1: Core Platform (Current)
- Lab directory with search and filtering
- Interactive floor plans
- AI research matcher interface
- Clean, student-focused design
- Mobile-responsive layout

### Phase 2: Enhanced Features
- Real lab data integration
- Improved AI matching algorithm
- Student submission system for profiles
- Lab availability calendars
- Faculty profile pages

### Phase 3: Community Features
- Student research blog/forum
- Event calendar for lab tours and talks
- Research symposium information
- Peer mentorship connections
- Research resources library

## Success Metrics

- **Awareness**: 80% of undergraduate physics students know about platform
- **Usage**: 50+ students using platform to find research positions annually
- **Lab Participation**: 30+ labs with updated profiles
- **Satisfaction**: >4.5/5 rating from students
- **Outcomes**: 20+ successful student-lab matches per year

## Unique Value Proposition

Unlike generic research directories:
1. **Student-Focused**: Designed specifically for undergraduates discovering research
2. **AI-Powered**: Smart matching based on interests and coursework
3. **Visual Discovery**: Interactive maps and engaging layouts
4. **Success Stories**: Real examples from current undergraduate researchers
5. **Simple & Clean**: Easy to use, no overwhelming complexity

## Future Vision

This platform will become the "go-to resource" for any Harvard undergraduate interested in physics research - where you can:
- Discover what research is happening across campus
- Find labs that match your interests and skills
- Learn from other undergraduates' experiences
- Take the first steps toward joining a research project
- Build connections with faculty and graduate students

The ultimate goal is to make research accessible and approachable, helping more undergraduates get involved in cutting-edge physics and fostering the next generation of scientists.