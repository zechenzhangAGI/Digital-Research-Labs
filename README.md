# Harvard Physics Research Discovery Platform 🔬

A web platform helping undergraduate students at Harvard discover physics research opportunities, explore labs, and connect with faculty conducting cutting-edge research.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## 🚀 Overview

The platform helps undergraduate students explore the diverse research happening in Harvard's Physics Department, discover opportunities that match their interests and skills, and take the first steps toward joining a research lab.

### Key Features

- **🔬 Research Lab Directory** - Browse 40+ active physics research groups
- **🗺️ Interactive Lab Maps** - Navigate physical lab spaces and find lab locations
- **📚 Research Areas Explorer** - Learn about different fields in physics research
- **🎓 Success Stories** - Read about undergraduates thriving in research positions
- **💡 Simple & Intuitive** - Clean design focused on discovery and connection

## 🛠️ Tech Stack

- **Frontend Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Interactive Maps:** React with SVG + [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (configured)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage with research discovery focus
│   ├── labs/              # Lab listings and details
│   │   ├── page.tsx       # Lab directory
│   │   └── [id]/          # Individual lab pages
│   │       └── page.tsx
│   ├── map/               # Interactive lab maps
│   │   └── page.tsx
│   └── jefferson/         # Jefferson floor plans
│       └── page.tsx
├── components/            # Reusable components
│   ├── navigation.tsx     # Main navigation
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
├── public/                # Static assets
└── package.json          # Dependencies
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/physics-lab-hub.git
cd physics-lab-hub
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 📱 Features in Detail

### Research Lab Directory
- **40+ research labs** across all physics subfields
- **Search and filter** by research area, PI, or keywords
- **Lab profiles** with descriptions, team info, and sample projects
- **Student-friendly** information about getting involved

### Interactive Lab Maps
- **Multi-floor navigation** with zoom/pan controls
- **Click-to-explore** lab rooms with instant details
- **Color-coded** by research type
- **Find lab locations** in physics buildings

## 🎯 Roadmap

### Phase 1: Core Platform ✅
- [x] Lab directory with search and filtering
- [x] Interactive floor plans
- [x] Clean, student-focused design
- [x] Mobile-responsive layout

### Phase 2: Enhanced Features (Next)
- [ ] Real lab data integration
- [ ] Student submission system for profiles
- [ ] Lab availability calendars
- [ ] Faculty profile pages

### Phase 3: Community Features
- [ ] Student research blog/forum
- [ ] Event calendar for lab tours and talks
- [ ] Research symposium information
- [ ] Peer mentorship connections
- [ ] Research resources library

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📊 Success Metrics

- **80%** of undergraduate physics students aware of platform
- **50+** students using the platform to find research positions annually
- **30+** labs with updated, student-friendly profiles
- **>4.5/5** student satisfaction rating
- **20+** successful student-lab matches per year

## 🔒 Security

- Secure data transmission
- Privacy-focused design
- No sensitive student information collected
- Compliant with university data policies

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Harvard Physics Department for supporting undergraduate research
- [Vercel](https://vercel.com) for hosting
- [shadcn](https://twitter.com/shadcn) for the UI component library
- All faculty and students contributing to research accessibility

## 📧 Contact

- **Project Lead:** [Your Name]
- **Email:** physics-lab-hub@harvard.edu
- **Website:** [physics.harvard.edu/lab-hub](https://physics.harvard.edu/lab-hub)

---

Built with ❤️ for the Harvard Physics Department