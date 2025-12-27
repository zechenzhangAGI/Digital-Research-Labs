# Harvard Physics Research Discovery Platform

A web platform created by Physics 95 students to help undergraduates at Harvard discover physics research opportunities, explore labs, and connect with faculty conducting cutting-edge research.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)

## About This Project

This website was created as part of **Physics 95** at Harvard University to help undergraduates discover research opportunities in the Physics Department.

### Course Leadership

- **Professor Melissa Franklin** - Head Instructor
- **Zechen Zhang** - Teaching Fellow

### Student Contributors (Fall 2025)

Ben Charette, Alessandro Drake, Rachel Fields, Callie Garcia, JaKayla Harris, Sedona Kessler, Katherine Lee, Thomas Leeds, Dominic Lehane, Sara Lia, Gandab Mammadova, Christopher Prainito, Paul Shen, Spenser Sun, Ashwin Vinod Kumar, Nene Zhvania

## Features

- **Research Lab Directory** - Browse 40+ active physics research groups with detailed profiles
- **Interactive Lab Maps** - Navigate campus buildings and Jefferson Lab floor plans
- **Lab Tour Videos** - Student-created video tours of research labs
- **Network Visualization** - Explore connections between labs by research area and techniques
- **Getting Started Guide** - Timeline and email templates for reaching out to labs
- **Student Reflections** - Essays on the ethics and experience of physics research

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Interactive Maps:** SVG + [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch)
- **Network Graph:** [react-force-graph-2d](https://github.com/vasturiano/react-force-graph)

## Project Structure

```
app/
├── page.tsx           # Homepage
├── labs/              # Lab directory and individual lab pages
│   ├── page.tsx
│   └── [id]/page.tsx
├── map/               # Campus map
├── jefferson/         # Jefferson Lab floor plans
├── videos/            # Lab tour videos
├── network/           # Lab network visualization
├── resources/         # Getting started guide
├── reflections/       # Student reflection essays
└── about/             # About the project
components/
├── navigation.tsx     # Main navigation
├── lab-flashcard.tsx  # Lab card component
├── jefferson-floor-plan.tsx
└── ui/                # shadcn/ui components
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/zechenzhangAGI/harvard-physics-website.git
cd harvard-physics-website

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Deployment

The project is deployed on Vercel with automatic deployments from the main branch.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Harvard Physics Department for supporting undergraduate research
- All faculty who welcomed students into their labs
- [Vercel](https://vercel.com) for hosting
- [shadcn](https://twitter.com/shadcn) for the UI component library

---

Harvard University Department of Physics | Fall 2025
