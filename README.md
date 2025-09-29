# Harvard Physics Lab Hub 🔬

A comprehensive web platform serving as the central hub for Harvard Physics Department's research infrastructure, designed to facilitate collaboration, resource management, and knowledge discovery across all physics research labs.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## 🚀 Overview

The Physics Lab Hub transforms how Harvard physicists interact with research facilities, equipment, and each other by creating a unified digital ecosystem that breaks down silos between labs and accelerates scientific discovery through AI-powered insights.

### Key Features

- **🗺️ Interactive Lab Maps** - Navigate physical lab spaces with interactive floor plans
- **🔬 Equipment Database** - Browse and book specialized research equipment
- **🤝 AI-Powered Collaboration** - Intelligent matching for research partnerships
- **📊 Real-time Analytics** - Track usage patterns and resource utilization
- **📚 Knowledge Repository** - Centralized documentation and protocols
- **💰 Grant Matching** - AI recommendations for funding opportunities

## 🛠️ Tech Stack

- **Frontend Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Interactive Maps:** React with SVG + [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (configured)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage
│   ├── labs/              # Lab listings and details
│   │   ├── page.tsx       # Lab directory
│   │   └── [id]/          # Individual lab pages
│   │       └── page.tsx
│   ├── equipment/         # Equipment database
│   │   └── page.tsx
│   ├── map/               # Interactive lab maps
│   │   └── page.tsx
│   └── ai/                # AI assistant
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

### Interactive Lab Maps
- **Multi-floor navigation** with zoom/pan controls
- **Click-to-explore** lab rooms with instant details
- **Color-coded** by research type
- **Real-time occupancy** indicators (planned)

### Equipment Management
- **Searchable database** of all department equipment
- **Real-time availability** status
- **Online booking** system
- **Documentation** and training resources

### AI-Powered Features
- **Collaboration matching** based on research overlap
- **Grant opportunity** recommendations
- **Research trend** analysis
- **Equipment sharing** optimization

### Lab Profiles
- **Comprehensive information** including team, research, publications
- **Media galleries** with photos and virtual tours
- **Equipment listings** specific to each lab
- **Contact information** and collaboration requests

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Basic lab profiles with mock data
- [x] Equipment listing and search
- [x] Homepage with statistics
- [x] Interactive floor plans
- [x] AI recommendations display

### Phase 2: Authentication & Data (Next)
- [ ] Harvard SSO integration
- [ ] PostgreSQL database with Prisma
- [ ] Real lab data migration
- [ ] User profiles and permissions
- [ ] Advanced booking system

### Phase 3: Advanced Features
- [ ] 3D lab visualizations
- [ ] Real-time equipment IoT integration
- [ ] Advanced AI collaboration engine
- [ ] Publication analysis
- [ ] Mobile app

### Phase 4: Integration
- [ ] Calendar system integration
- [ ] Grant management tools
- [ ] Financial tracking
- [ ] External API connections

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📊 Success Metrics

- **80%** of labs actively maintaining profiles within 6 months
- **30%** increase in shared equipment usage
- **25%** increase in inter-lab publications
- **50%** reduction in time to find and book equipment
- **>4.5/5** user satisfaction rating

## 🔒 Security

- Harvard SSO integration for authentication
- Role-based access control (RBAC)
- Encrypted data transmission
- Regular security audits
- FERPA compliance for student data

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Harvard Physics Department for project vision
- [Vercel](https://vercel.com) for hosting and AI SDK
- [shadcn](https://twitter.com/shadcn) for the UI component library
- All contributors and lab members

## 📧 Contact

- **Project Lead:** [Your Name]
- **Email:** physics-lab-hub@harvard.edu
- **Website:** [physics.harvard.edu/lab-hub](https://physics.harvard.edu/lab-hub)

---

Built with ❤️ for the Harvard Physics Department