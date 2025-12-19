"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Users,
  Mail,
  Globe,
  Clock,
  GraduationCap,
  FileText,
  Beaker,
  Calendar,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Info,
  ExternalLink,
  ChevronRight,
  Copy,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

// Survey data from professors
interface LabVideo {
  url: string;
  title: string;
  description?: string;
}

interface LabSurveyData {
  name: string;
  pi: string;
  email?: string;
  website?: string;
  location: string;
  type: string;
  image: string;
  description: string;
  // Survey responses
  hasSurveyData: boolean;
  hoursPerWeek?: string;
  coAuthorship?: string;
  undergradCount?: string;
  projectLength?: string;
  researchType?: string;
  sampleProjects?: string[];
  prerequisites?: string;
  additionalInfo?: string;
  minimumCommitment?: string;
  afterGroup?: string;
  groupMeetings?: string;
  qrCodeWilling?: string;
  // Videos
  videos?: LabVideo[];
}

const labsDetailData: Record<string, LabSurveyData> = {
  mundy: {
    name: "Mundy Group",
    pi: "Julia Mundy",
    email: "mundy@physics.harvard.edu",
    website: "https://mundy.physics.harvard.edu",
    location: "LISE 709",
    type: "Solid State Physics",
    image: "/lab_images/mundy-mbe.png",
    description: "Work in the Mundy group will design, synthesize and probe emergent phenomena in complex oxide thin films.",
    hasSurveyData: true,
    hoursPerWeek: "During the semester 8-10 hours. During the summer, full time for ~10 weeks.",
    coAuthorship: "Yes",
    undergradCount: "~4",
    projectLength: "We require projects to include at least 1 summer. We are often unable to onboard students into the group until they have completed the summer. Some students start a light project in the spring in anticipation of a summer project but we cannot do semester only projects.",
    researchType: "Undergrads work on a variety of hands on projects on the synthesis of oxide thin films. Some work as a team of a few undergraduate students and some work more closely with a single grad student mentor. Students can do hands on AFM imaging, sputtering, x-ray diffraction as well as analysis of their data.",
    sampleProjects: [
      "Published work: https://journals.aps.org/prmaterials/abstract/10.1103/PhysRevMaterials.8.124803",
      "Create lithium-intercalated indium tin oxide thin films via solution-phase n-BuLi chemistry"
    ],
    prerequisites: "Most students who join our group start in Physics 15A. We also like to see that students have prioritized solid state physics in their coursework — we often wouldn't select a student for the group who had completed the pre-reqs for Physics 195A but elected not to take it. Some chemistry background is extremely helpful.",
    minimumCommitment: "Yes, must include a summer. Often the summer is the first time in the group.",
    groupMeetings: "Group meetings are once a week in the semester. Undergrads are always welcome but we are not always able to accommodate their scheduling constraints.",
    qrCodeWilling: "No",
    videos: [
      { url: "https://youtu.be/pvB5-xdQKG4", title: "Lab Overview", description: "Quick introduction to quantum materials research" },
      { url: "https://youtu.be/coKMeww2lSk", title: "Lab Tour", description: "Full tour of our MBE systems and oxide thin film research" }
    ]
  },
  mitrano: {
    name: "Mitrano Group",
    pi: "Matteo Mitrano",
    email: "mitrano@physics.harvard.edu",
    website: "https://mitrano.physics.harvard.edu",
    location: "Jefferson 164",
    type: "Ultrafast Quantum Materials",
    image: "/lab_images/mitrano-lattice.png",
    description: "Our research focuses on the investigation and the control of collective electronic behavior in quantum materials at ultrafast timescales.",
    hasSurveyData: true,
    hoursPerWeek: "Ideally at least 10, but the best students in our group committed up to 20 hours per week.",
    coAuthorship: "Yes",
    undergradCount: "2-3",
    projectLength: "1 year",
    researchType: "Our group has a range of activity and undergraduate research is tailored to the skills of the students. We have experimental projects involving data analysis of datasets coming from X-ray facilities, theoretical projects associated with the nonequilibrium research we do, but also experimental projects involving the construction and operation of real optical setups in our laboratory.",
    sampleProjects: [
      "Simulate the dynamics of many-body excitons in NiPS₃ under illumination with THz light — expected to yield first author publication",
      "Analysis of time-resolved X-ray absorption data from the Pohang X-ray free electron laser — student leading paper on tuning electronic interactions in cuprate superconductors with light",
      "Development of non-collinear optical parametric amplifier producing tunable laser light with 9 femtosecond duration"
    ],
    prerequisites: "Ideally familiarity with Physics 15A-B-C, Phys 143A/B, and Physics 195A. However, the latter courses are not rigid prerequisites. Successful students should be passionate about research and willing to commit regular time. Basic Python or coding is a plus.",
    additionalInfo: "Just write to any of our group members to express your interest or come talk to us!",
    minimumCommitment: "2 semesters would be ideal, as it allows for more substantive recommendation letters",
    afterGroup: "Many students went on to graduate school at MIT, Princeton, Cornell.",
    groupMeetings: "We meet weekly as a group for a 1-2 hour meeting.",
    qrCodeWilling: "Yes"
  },
  kim: {
    name: "Kim Lab",
    pi: "Philip Kim",
    email: "pkim@physics.harvard.edu",
    website: "https://kim.physics.harvard.edu",
    location: "LISE 4th Floor",
    type: "Condensed Matter Physics",
    image: "/lab_images/kim-circuit.png",
    description: "Our group's research focuses on the mesoscopic investigation of transport phenomena, particularly electric, thermal and thermoelectrical properties of low dimensional nanoscale materials.",
    hasSurveyData: true,
    hoursPerWeek: "10 hours",
    coAuthorship: "Yes",
    undergradCount: "2",
    projectLength: "More than a year",
    researchType: "Benchwork on condensed matter experiments exploring low-dimensional materials.",
    sampleProjects: [
      "There is no separate undergraduate projects — students work on ongoing group projects"
    ],
    prerequisites: "No specific prerequisites",
    minimumCommitment: "More than a year",
    afterGroup: "Physics graduate school",
    groupMeetings: "1 per week",
    qrCodeWilling: "Would like more information"
  },
  weitz: {
    name: "Weitz Lab",
    pi: "David Weitz",
    email: "weitz@seas.harvard.edu",
    website: "https://weitzlab.seas.harvard.edu",
    location: "McKay 5th Floor",
    type: "Soft Matter & Biophysics",
    image: "/lab_images/weitz-bubbles.jpg",
    description: "We study the physics of soft condensed matter, materials which are easily deformable by external stresses, electric or magnetic fields, or even by thermal fluctuations.",
    hasSurveyData: true,
    hoursPerWeek: "At least 4 hours per week. Spending more will make it possible to learn more.",
    coAuthorship: "Yes",
    undergradCount: "Several",
    projectLength: "6 months to a year",
    researchType: "Mainly benchwork. Some coding.",
    sampleProjects: [
      "Making new classes of drop-based materials and studying their properties",
      "Imaging live cells and studying their mechanics"
    ],
    prerequisites: "No prerequisites except a desire to learn new things",
    minimumCommitment: "At least 1 semester. Preferably longer.",
    afterGroup: "Undergraduates go to graduate school or work in startup companies",
    groupMeetings: "Yes. One full group meeting and one sub group meeting per week.",
    qrCodeWilling: "Yes, if someone prepares it"
  },
  yin: {
    name: "Yin Lab",
    pi: "Xi Yin",
    email: "xiyin@fas.harvard.edu",
    location: "Jefferson 570",
    type: "High Energy Theory",
    image: "/lab_images/yin-wizards.jpg",
    description: "I am a theoretical physicist interested in quantum field theory, string theory, and mathematical physics.",
    hasSurveyData: true,
    hoursPerWeek: "I do not micromanage how students spend their time. Results are what matters.",
    coAuthorship: "The only undergraduate who successfully produced new results working in my group ended up writing a single-author paper on her own",
    undergradCount: "Typically 0, with few exceptions",
    researchType: "Depends on the ability of student",
    sampleProjects: [
      "A visiting undergraduate from Caltech implemented matrix quantum mechanics bootstrap code on quantum information conic solver — wrote a single-author paper",
      "Study of renormalization group flow of supersymmetric chiral nonlinear sigma models"
    ],
    prerequisites: "Quantum field theory; coding skills help",
    groupMeetings: "Twice a week",
    qrCodeWilling: "No"
  },
  knirck: {
    name: "Knirck Lab",
    pi: "Stefan Knirck",
    email: "knirck@physics.harvard.edu",
    location: "18 Hammond Street",
    type: "Particle Astrophysics",
    image: "/lab_images/knirck-cone.jpg",
    description: "Our group builds novel experiments to directly detect axion dark matter in the µeV - meV mass range.",
    hasSurveyData: true,
    hoursPerWeek: "During semester: at least 4 hours, ideally 8; for summer research: full time",
    coAuthorship: "Yes, if you made a significant contribution to the published work.",
    undergradCount: "Around three to five",
    researchType: "Can be anything from data analysis/simulation to designing/building/running new experiments",
    sampleProjects: [
      "Search for exotic models in experimental data",
      "Simulation of axion detectors",
      "Cryostat commissioning",
      "Antenna pattern measurement",
      "Detector/receiver development"
    ],
    prerequisites: "Enthusiasm to learn about all things axion! Otherwise generally very project-specific.",
    minimumCommitment: "Minimum 1 semester/summer, can be longer depending on project",
    groupMeetings: "Once per week",
    qrCodeWilling: "Yes"
  },
  khalaf: {
    name: "Khalaf Lab",
    pi: "Eslam Khalaf",
    email: "ekhalaf@g.harvard.edu",
    location: "17 Oxford Street",
    type: "Condensed Matter Theory",
    image: "/lab_images/khalaf-skyrmions.jpg",
    description: "Khalaf's work addresses questions in the physics of disorder, topological insulators and semimetals, mechanisms for superconductivity in multi-layer graphene heterostructures, and new phenomena in quasicrystals and moiré systems.",
    hasSurveyData: true,
    hoursPerWeek: "Hard to tell. If I give them 1-2 papers, I expect them to have read it and come up with concrete questions within 1-2 weeks.",
    coAuthorship: "Yes",
    undergradCount: "I had one undergrad and one master student in 2 years",
    projectLength: "Unlikely to produce anything publishable in less than 6 months",
    researchType: "Would be mostly coding",
    sampleProjects: [
      "Using exact diagonalization to compute dispersion of anyons on the sphere — Master student completed this in 4 months and produced a publication",
      "Using numerical diagonalization to compute trion states in semiconductor heterostructures"
    ],
    prerequisites: "Basic knowledge of band theory of solids, basic numerical skills (numerical diagonalization, linear algebra), basic knowledge of second quantization",
    minimumCommitment: "Would probably want at least 2 semesters but have not been requiring that",
    afterGroup: "Both students were accepted in PhD programs",
    groupMeetings: "Every week",
    qrCodeWilling: "Prefers personal chat with interested students"
  },
  stubbs: {
    name: "Stubbs Lab",
    pi: "Christopher Stubbs",
    email: "cstubbs@fas.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/stubbs",
    location: "Lyman 335",
    type: "Astrophysics",
    image: "/lab_images/stubbs-telescope.png",
    description: "Recent projects have primarily used the tools and techniques of observational astronomy, providing the opportunity to measure the properties of the dark sector where signal is non-zero.",
    hasSurveyData: true,
    hoursPerWeek: "15 hours",
    coAuthorship: "Yes",
    undergradCount: "2",
    projectLength: "1 year",
    researchType: "Highly variable — from apparatus development to data analysis",
    sampleProjects: [
      "Optical instrumentation to monitor image degradation in the Rubin Observatory",
      "Precision calibration apparatus that delivers a known dose of monochromatic photons into a telescope"
    ],
    prerequisites: "Python programming proficiency and/or machine shop qualification",
    minimumCommitment: "2 semesters or summer + 1 semester seems ideal",
    afterGroup: "Typically graduate school",
    groupMeetings: "Weekly",
    qrCodeWilling: "Yes"
  },
  huth: {
    name: "Huth Lab",
    pi: "John Huth",
    email: "huth@physics.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/huth",
    location: "Lyman 236",
    type: "Particle Physics",
    image: "/lab_images/huth-atlas.jpg",
    description: "Huth's present work centers on the exploration of the Higgs boson, particularly the decay of the Higgs into a bb̄ pair, which is a challenging final state.",
    hasSurveyData: true,
    hoursPerWeek: "4 hours",
    coAuthorship: "Depends on the research",
    undergradCount: "0, 1, or 2",
    projectLength: "Six months",
    researchType: "Would be a combination of coding and research",
    sampleProjects: [
      "Finding detector efficiencies as a function of beam intensity",
      "Fitting ancient tables of latitude and longitude"
    ],
    prerequisites: "Some experience in programming — languages could be C, C++, Python, Mathematica",
    minimumCommitment: "1 semester",
    afterGroup: "A variety. A recent student is going into an MD/PhD program in medical physics.",
    groupMeetings: "Weekly",
    qrCodeWilling: "Would like more information"
  },
  ro: {
    name: "Ro Lab",
    pi: "Sunghan Ro",
    email: "sunghanro@fas.harvard.edu",
    location: "Lyman 322",
    type: "Statistical Physics",
    image: "/lab_images/ro-graph.png",
    description: "Recently, Ro has focused on studying collective phenomena in active matter, which consists of units driven out of equilibrium at the individual level.",
    hasSurveyData: true,
    hoursPerWeek: "The required time commitment depends on the nature of the project. For a relatively simple project, about 5 to 10 hours per week would be appropriate.",
    coAuthorship: "Yes",
    undergradCount: "0 or 1",
    projectLength: "About 6 months",
    researchType: "The project would likely involve a simple analytical calculations followed by careful numerical verification.",
    sampleProjects: [
      "Coarsening in phase separation governed by the moment-conserving diffusion",
      "Boundary-driven scale-free profiles in systems of two particles undergoing annihilation reactions"
    ],
    prerequisites: "Knowledge of statistical mechanics and experience with numerical simulations (molecular dynamics or Monte Carlo sampling). Familiarity with stochastic dynamics would also be very helpful.",
    additionalInfo: "I prefer to work with a small group, so the number of projects I can supervise is limited. Please reach out early so that I can let you know if I am able to arrange a project later.",
    minimumCommitment: "This depends on the student's interest. Working on a project generally requires at least six months.",
    afterGroup: "Typically going to graduate school, possibly to study theoretical soft condensed matter physics.",
    groupMeetings: "Our group holds a joint weekly meeting with Prof. David Nelson's group.",
    qrCodeWilling: "Yes"
  },
  desai: {
    name: "Desai Lab",
    pi: "Michael Desai",
    email: "mdesai@oeb.harvard.edu",
    website: "https://desai.fas.harvard.edu",
    location: "Northwest 457.20",
    type: "Evolutionary Biophysics",
    image: "/lab_images/desai-bubbles.png",
    description: "We use theory and experiments to study evolutionary dynamics and population genetics, particularly when selection is pervasive.",
    hasSurveyData: true,
    hoursPerWeek: "10-20 hours is ideal during the academic year (full time if in summer)",
    coAuthorship: "Yes",
    undergradCount: "0-3",
    projectLength: "Anywhere from 1-4 years",
    researchType: "There are projects that are purely benchwork, purely coding, purely theory, and all combinations of these as well.",
    sampleProjects: [
      "Sequencing genomes in evolving yeast lines and doing computational/bioinformatic analysis to call mutations and track evolutionary dynamics",
      "Calculating expected signatures of single-site variation (the site frequency spectrum) under various models of purifying selection"
    ],
    prerequisites: "No specific prerequisites are needed",
    minimumCommitment: "It's best to plan for at least 1 academic year, or alternatively 1 full summer.",
    afterGroup: "Typically students go on to graduate school, either in physics or biology. This has ranged from students that studied plasma physics to others in genetics and computational biology.",
    groupMeetings: "Weekly group meetings",
    qrCodeWilling: "Yes"
  },
  samuel: {
    name: "Samuel Lab",
    pi: "Aravi Samuel",
    email: "samuel@physics.harvard.edu",
    website: "https://samuellab.fas.harvard.edu",
    location: "Northwest 258",
    type: "Neurophysics",
    image: "/lab_images/samuel-brain-science.jpg",
    description: "To make progress, we use accessible biophysical models of organism behavior that can be studied from sensory input to motor output.",
    hasSurveyData: true,
    hoursPerWeek: "10-15 hours",
    coAuthorship: "Yes",
    undergradCount: "2-4",
    projectLength: "2 years",
    researchType: "A lot of data analysis. It takes time to learn how to do experiments, but if someone is willing to work 6 months, they can participate in actual experiments.",
    sampleProjects: [
      "Whole-brain imaging of nematodes performing chemotaxis and thermotaxis"
    ],
    prerequisites: "Substantial coding experience/ability",
    additionalInfo: "We are neuroscientists. We use physics as a tool and way of thinking, not an end in itself.",
    minimumCommitment: "The best time to really learn something is during the summer. And then continuing into the school year for a few semesters.",
    afterGroup: "Many continue to graduate school. At least one has become a faculty member.",
    groupMeetings: "Yes, about once a month",
    qrCodeWilling: "No"
  },
  morii: {
    name: "Morii Lab",
    pi: "Masahiro Morii",
    email: "morii@physics.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/morii",
    location: "Lyman 230",
    type: "Particle Physics",
    image: "/lab_images/morii-atlas.jpg",
    description: "Prof. Morii and his team of postdocs and students have searched for supersymmetry, for dark matter, and for rare processes involving top quarks.",
    hasSurveyData: true,
    hoursPerWeek: "Real work is usually done full-time during summer.",
    coAuthorship: "No",
    undergradCount: "About 2 students each summer",
    projectLength: "Typically 8 weeks at CERN. Some continued remote work in the following semester.",
    researchType: "Students go to CERN for about 8 weeks and do a combination of benchwork and coding, supervised by a graduate student.",
    sampleProjects: [
      "Worked at CERN on upgrade of the silicon tracking detector for the ATLAS experiment",
      "Helped PhD students in data analysis"
    ],
    prerequisites: "Physics 15a/b/c + 143A are important. Basic programming skills (Python or C++) are very useful. Familiarity with lab equipment (taught in Physics 113, 123, or 191R) is helpful but optional.",
    additionalInfo: "What you can do at CERN depends a lot on what is happening at the LHC. Next few years (until 2030) will be an upgrade period when the accelerator is off and hardware work will dominate.",
    minimumCommitment: "No minimum commitment required",
    afterGroup: "Most go to graduate schools and pursue PhD in physics.",
    groupMeetings: "Weekly on Friday at 9:00 AM",
    qrCodeWilling: "Yes"
  },
  park: {
    name: "Park Lab",
    pi: "Hongkun Park",
    email: "hongkun_park@harvard.edu",
    website: "https://parklab.seas.harvard.edu",
    location: "Conant 048",
    type: "Quantum Materials & Sensing",
    image: "/lab_images/park-computer.webp",
    description: "The group focuses on fundamental studies of nanoscale electrical, optical, and plasmonic devices that operate based upon quantum mechanical principles.",
    hasSurveyData: true,
    hoursPerWeek: "During the semester, the class should take precedence, but during the summer, I expect regular work hours.",
    coAuthorship: "Yes",
    undergradCount: "1-2",
    projectLength: "One to two years",
    researchType: "It depends on the project.",
    sampleProjects: [
      "Quantum devices made of atomically thin materials",
      "Quantum sensing experiments"
    ],
    prerequisites: "No prerequisites. Bring enthusiasm about science and technology.",
    minimumCommitment: "I typically want a long-term commitment (1 year or longer)",
    afterGroup: "Graduate school, typically.",
    groupMeetings: "Yes, once a week",
    qrCodeWilling: "No"
  },
  heller: {
    name: "Heller Lab",
    pi: "Eric Heller",
    email: "heller@physics.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/heller",
    location: "Mallinckrodt M-107",
    type: "Quantum Physics",
    image: "/lab_images/heller-flow.jpg",
    description: "We are interested in a broad range of subjects that depend on time-dependent wave mechanics in one form or another.",
    hasSurveyData: true,
    hoursPerWeek: "10 hours",
    coAuthorship: "Yes — many of them get first author on a paper",
    undergradCount: "2-6",
    projectLength: "1-2 years",
    researchType: "Treated as a colleague. Many undergrads get first author on a paper.",
    sampleProjects: [
      "Discovery that Anderson localization becomes Planckian diffusion as the medium animates (Yubo Zhang, now QSE graduate student)",
      "Quantum dots as acoustical chambers (M. Zaletel, now Prof. at Berkeley Physics)",
      "Projects with Prof. Norman Yao when he was a Harvard undergrad"
    ],
    prerequisites: "Could be a freshman but needs some science focus in prior years",
    additionalInfo: "We do modest coding, nothing huge. We often discover things numerically, then provide the theory.",
    minimumCommitment: "2 semesters or more",
    afterGroup: "Usually grad school in physics or applied math",
    groupMeetings: "2 per week",
    qrCodeWilling: "Yes"
  },
  sachdev: {
    name: "Sachdev Lab",
    pi: "Subir Sachdev",
    email: "sachdev@physics.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/sachdev",
    location: "Lyman 343",
    type: "Condensed Matter Theory",
    image: "/lab_images/sachdev-hole.jpg",
    description: "Subir Sachdev's research describes the consequences of quantum entanglement on the macroscopic properties of natural systems.",
    hasSurveyData: true,
    hoursPerWeek: "3 hours",
    coAuthorship: "Yes",
    undergradCount: "1",
    projectLength: "1 semester",
    researchType: "Theoretical computations and coding",
    sampleProjects: [
      "Spin-wave theory of fermions on the Lieb lattice"
    ],
    prerequisites: "Knowledge of many-body quantum mechanics and statistical mechanics",
    additionalInfo: "Don't have a lab. Should also note that I am on sabbatical until Fall 2026, and cannot accept students before then.",
    minimumCommitment: "1 semester",
    afterGroup: "Graduate school",
    groupMeetings: "Yes, weekly",
    qrCodeWilling: "N/A — no lab"
  },
  jafferis: {
    name: "Jafferis Lab",
    pi: "Daniel Jafferis",
    email: "jafferis@physics.harvard.edu",
    location: "Jefferson 371",
    type: "Quantum Gravity",
    image: "/lab_images/jafferis-mogging.webp",
    description: "The research of Daniel Jafferis involves string theory, supersymmetric quantum field theory, and quantum gravity.",
    hasSurveyData: true,
    hoursPerWeek: "Flexible. 5-10 hours",
    coAuthorship: "Yes",
    undergradCount: "0-1",
    researchType: "Theoretical physics, calculation, discussion. Same as for graduate students or postdocs.",
    sampleProjects: [
      "A project on bags of gold and the overcounting of black hole entropy"
    ],
    prerequisites: "253ab, 210, 287. Exceptional ability and maturity in theoretical physics, easy familiarity with curved spacetimes, path integrals and structure of QFT, at the level of PhD student.",
    additionalInfo: "I only take undergraduate researchers in rare cases.",
    afterGroup: "Continue to PhD programs",
    groupMeetings: "Project focused meetings, approximately weekly.",
    qrCodeWilling: "No"
  },
  cohen: {
    name: "Cohen Lab",
    pi: "Adam Cohen",
    email: "cohen@chemistry.harvard.edu",
    website: "https://cohenweb.rc.fas.harvard.edu",
    location: "Mallinckrodt 115",
    type: "Biophysics & Neurophotonics",
    image: "/lab_images/cohen-magazine.jpg",
    description: "The Cohen Lab develops and applies new tools to study biology. We push the limits of physics and chemistry to make measurements in previously inaccessible regimes.",
    hasSurveyData: true,
    hoursPerWeek: "About 10/week during the semester. Some undergrads also work full-time over the summers.",
    coAuthorship: "Yes",
    undergradCount: "Typically 1-3",
    projectLength: "As long as they want. To bring a project to publication usually takes several years.",
    researchType: "Depends on the student and the project!",
    sampleProjects: [
      "Developing an improved method for optical stimulation of neurons with a pulsed ultrafast laser",
      "Modeling Lou Gehrig's disease (ALS) with human stem cell-derived neurons",
      "Developing better algorithms for extracting the electrical activity of neurons from voltage imaging data"
    ],
    prerequisites: "Familiarity with programming (ideally Matlab) is very helpful. Other lab skills (optics, cloning and molecular biology, cell culture) are helpful but not required.",
    additionalInfo: "Interested students should look at the projects and publications on our lab website (https://cohenweb.rc.fas.harvard.edu/) and decide what they are interested in. Please send me an email with a copy of your CV and a short explanation of your background (classes you've taken and past research experience), what you are interested to do in the lab, and why.",
    minimumCommitment: "My goal with each undergrad is that they will spend several years working in the group. After 1 semester we evaluate whether it is a good fit.",
    afterGroup: "Most undergrads have gone on to grad school; a few to med school.",
    groupMeetings: "Yes, once a week, 90 minutes.",
    qrCodeWilling: "Yes",
    videos: [
      { url: "https://youtu.be/LerqVgB9Co8", title: "Cohen Lab Tour", description: "Explore biophysics and neurophotonics research" }
    ]
  },
  mazur: {
    name: "Mazur Lab",
    pi: "Eric Mazur",
    email: "mazur@seas.harvard.edu",
    website: "https://www.mazur.harvard.edu",
    location: "Pierce 233",
    type: "Optics & Photonics",
    image: "/lab_images/mazur-screwdrivers.png",
    description: "We study the dynamics of molecules, chemical reactions, and condensed matter on very short timescales — down to femtoseconds (millionths of billionths of a second).",
    hasSurveyData: true,
    hoursPerWeek: "We never count hours as it is not the quantity, but the quality of work that counts. We see internships as an educational opportunity — what you put in is directly proportional to what you get out.",
    coAuthorship: "Yes",
    undergradCount: "Plus or minus five",
    projectLength: "From a minimum of one semester (or one summer) to multiple semesters",
    researchType: "It can be anything from coding to simulation and theory, to experimental work, to nano fabrication.",
    sampleProjects: [
      "Developing a microfluidic platform to engineer CAR-T cells using lasers",
      "Theory and simulations of a new nanophotonic metamaterial for nonlinear optics",
      "Fabricated nonlinear waveguides and characterized these in the lab"
    ],
    prerequisites: "We adapt to the skill set of any intern joining the group!",
    additionalInfo: "We take growth, education, and future opportunities (summer internships, fellowships, admissions) very seriously and love to support people who contribute to the group.",
    minimumCommitment: "One semester is a minimum to learn something. To get a peer-reviewed publication out of it, a minimum of 2 semesters is needed.",
    afterGroup: "If they join early, they either continue in the group or try working for a different faculty member. If they graduate, they either go to graduate school or a range of different employment opportunities.",
    groupMeetings: "Weekly",
    qrCodeWilling: "Yes"
  },
  manoharan: {
    name: "Manoharan Group",
    pi: "Vinothan Manoharan",
    email: "vnm@seas.harvard.edu",
    website: "https://www.manoharan.seas.harvard.edu",
    location: "McKay 530",
    type: "Soft Matter & Biophysics",
    image: "/lab_images/manoharan-virus.png",
    description: "We do experiments to understand how complex systems such as interacting nanoparticles or proteins spontaneously order themselves — a process called self-assembly or self-organization.",
    hasSurveyData: true,
    hoursPerWeek: "6-8 hours per week; number of hours not as important as commitment to working on project consistently",
    coAuthorship: "Yes",
    undergradCount: "1-3",
    projectLength: "1-1.5 years",
    researchType: "Benchwork",
    sampleProjects: [
      "Building and understanding the physics of 'capillary tweezers': devices that manipulate small particles based on capillary forces and could function as replacements for optical tweezers"
    ],
    prerequisites: "None",
    minimumCommitment: "At least 1 semester and a summer",
    afterGroup: "Usually grad school in physics",
    groupMeetings: "Yes, once a week",
    qrCodeWilling: "Would like more information",
    videos: [
      { url: "https://youtu.be/6Qp8xEMrQ-M", title: "Manoharan Lab Tour", description: "Discover soft matter and self-assembly research" }
    ]
  },
  cotler: {
    name: "Cotler Group",
    pi: "Jordan Cotler",
    email: "cotler@physics.harvard.edu",
    location: "60 Oxford St. 412",
    type: "Quantum Computing & Quantum Gravity",
    image: "/lab_images/cotler-blackboard.jpg",
    description: "Cotler's current research interests include developing quantum algorithms to analyze quantum many-body and quantum gravitational systems.",
    hasSurveyData: false
  },
  franklin: {
    name: "Franklin Lab",
    pi: "Melissa Franklin",
    email: "franklin@physics.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/franklin",
    location: "Lyman 237",
    type: "Particle Physics",
    image: "/lab_images/franklin-atlas.jpg",
    description: "Searching for new particles using particle accelerators at CERN.",
    hasSurveyData: true,
    hoursPerWeek: "10 hours/week is usual. It could be less if it were not for a 90r.",
    coAuthorship: "The time it takes to write a paper in our field is usually longer than 3 years.",
    undergradCount: "Varies from 1-4 depending on the semester",
    projectLength: "Usually 3-6 months",
    researchType: "During the school year it's mostly data analysis, during the summer it includes detector work at CERN.",
    sampleProjects: [
      "Find a way to measure the noise in detector signals from proton-proton collision data",
      "Investigate the cross-talk in data from a muon detector",
      "Use toy Monte Carlo method to determine correction factors for signals from muons while looking for massive supersymmetric partners",
      "Use Monte Carlo to model all the backgrounds to a very small signal of three W's in proton-proton collisions"
    ],
    prerequisites: "Knowing a programming language like Python or C or C++ or Julia would be useful.",
    additionalInfo: "We are a fun group!",
    minimumCommitment: "No minimum commitment required",
    afterGroup: "They often go to graduate school, or to companies like D.E. Shaw, or Jane Street.",
    groupMeetings: "There are weekly group meetings",
    qrCodeWilling: "Yes"
  },
  hoffman: {
    name: "Hoffman Lab",
    pi: "Jenny Hoffman",
    email: "jhoffman@physics.harvard.edu",
    website: "https://hoffman.physics.harvard.edu",
    location: "LISE Basement",
    type: "Condensed Matter Physics",
    image: "/lab_images/mundy-mbe.png", // placeholder
    description: "Our group uses scanning tunneling microscopy and other tools to study quantum materials, superconductors, and topological systems.",
    hasSurveyData: true,
    hoursPerWeek: "Minimum commitment 10 hrs/wk during the semester; 10 weeks full-time during the summer",
    coAuthorship: "Yes",
    undergradCount: "5-10",
    projectLength: "1 year (or more)",
    researchType: "See detailed document: https://docs.google.com/document/d/1TDFqforr-ue77yKn69Jq5HV-L5Ho-R7cQ6UvSQEXvWc/",
    sampleProjects: [
      "\"Quantum-inspired design of a tunable broadband high-Q acoustic resonator\" — Jeffrey Shi et al",
      "\"Imaging Se diffusion across the FeSe/SrTiO3 interface\" — Samantha O'Sullivan et al, PRB 105",
      "\"Simulating twistronics in acoustic metamaterials\" — Minhal Gardezi et al, 2D Materials",
      "\"Design and characterization of a low-vibration laboratory\" — Wenjie Gong et al, Rev. Sci. Inst.",
      "\"Single Vortex Pinning in Superconducting NdFeAsO1-xFx\" — Jessie Zhang et al, PRB"
    ],
    prerequisites: "See: https://hoffman.physics.harvard.edu/ugrad.html",
    additionalInfo: "See resources: https://hoffman.physics.harvard.edu/resources.html. My lab is 3 floors underground in the LISE basement.",
    minimumCommitment: "Minimum 1 year commitment",
    afterGroup: "See alumni: https://hoffman.physics.harvard.edu/alumni.html#ug",
    groupMeetings: "Weekly on Fridays at 3:45pm in LISE 303",
    qrCodeWilling: "All info is on website"
  },
  arguelles: {
    name: "Argüelles Lab",
    pi: "Carlos Argüelles",
    email: "carguelles@fas.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/arguelles",
    location: "Jefferson",
    type: "Particle Astrophysics",
    image: "/lab_images/franklin-atlas.jpg", // placeholder
    description: "We study high-energy neutrinos using experiments like IceCube and develop new methods for detecting rare particle physics events.",
    hasSurveyData: true,
    hoursPerWeek: "8 hours per week",
    coAuthorship: "Yes",
    undergradCount: "On average 5",
    projectLength: "1 to 2 years",
    researchType: "Data analysis and coding is a significant part of the work. Some students also have chances to work on instrumentation, though those projects are typically more limited in number.",
    sampleProjects: [
      "Contributing to selecting high-energy neutrino data events in IceCube — designed boosted decision trees, wrote conference proceeding, co-authored IceCube publication",
      "Studying the capacity to separate between various signatures in neutrino telescopes through machine learning",
      "Phenomenological studies of new physics in neutrino telescopes",
      "Simulation work for IceCube, KM3NeT, or TAMBO",
      "Instrumentation design for IceCube, TAMBO, or IceCube-Upgrade/Gen2"
    ],
    prerequisites: "No prerequisite required. Though helpful skills: Machine Learning, Python or C++ coding experience, and particle physics.",
    additionalInfo: "We welcome undergraduate students of all levels to do research in our group. We also have bi-yearly group retreats where undergraduate students present their work and can get to know more graduate students and postdoctoral researchers in the group, as well as have more interactions with the PI.",
    minimumCommitment: "We set expectations at the beginning. Students that stay one summer and 2 semesters typically can complete a project presentable at major conferences.",
    afterGroup: "Most students go to graduate school in particle physics or astrophysics. Some also go to industry.",
    groupMeetings: "Weekly group meetings from 3 to 5 pm on Tuesdays. During semesters, undergrads are encouraged to attend but it's not mandatory.",
    qrCodeWilling: "Yes"
  },
  doyle: {
    name: "Doyle Lab",
    pi: "John Doyle",
    email: "doyle@physics.harvard.edu",
    website: "https://doylegroup.harvard.edu",
    location: "LISE",
    type: "AMO Physics",
    image: "/lab_images/mazur-screwdrivers.png", // placeholder
    description: "We build things. Our research involves building, running experiments, doing data analysis and then publishing.",
    hasSurveyData: true,
    hoursPerWeek: "10 during the term, full time non-term",
    coAuthorship: "Yes",
    undergradCount: "About 2",
    projectLength: "A single sub project can range from a few days to months",
    researchType: "Not coding — building, running experiments, doing data analysis and then publishing",
    sampleProjects: [
      "Building an ECDL (external cavity diode laser)"
    ],
    prerequisites: "No prerequisites",
    additionalInfo: "We build things.",
    minimumCommitment: "1 semester or a summer",
    afterGroup: "After graduating, they most often go to grad school.",
    groupMeetings: "Twice a week",
    qrCodeWilling: "No QR code. They can just go to our web page."
  },
  yao: {
    name: "Yao Lab",
    pi: "Norman Yao",
    email: "nyao@g.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/yao",
    location: "LISE",
    type: "Quantum Physics",
    image: "/lab_images/heller-flow.jpg", // placeholder
    description: "My group has projects that span quite a number of topics in quantum physics, from theory to experiment.",
    hasSurveyData: true,
    hoursPerWeek: "~8-10 hours",
    coAuthorship: "Yes",
    undergradCount: "~2-3 for any given semester",
    projectLength: "Most students tend to stay for 1-2 years after their initial experience.",
    researchType: "On the experimental side, work often involves optics, electronics, and coding. On the theoretical side, work can involve analytic calculations, numerical simulations, and working closely with experimental data.",
    sampleProjects: [
      "Many-body NV systems: \"Repetitive readout to get to the spin projection noise limit\"",
      "High-pressure sensing: \"Optimizing the interpretation of magnetic resonance spectra from high-Tc superconductors\"",
      "Spin dynamics: \"Neural quantum states for spin squeezing\""
    ],
    prerequisites: "Having taken a semester of quantum would be great, but is not necessarily required.",
    minimumCommitment: "No requirements, but generally longer commitments end up being more productive.",
    afterGroup: "Most go to graduate school",
    groupMeetings: "Weekly on Fridays at 10am-noon",
    qrCodeWilling: "Would like more information"
  },
  fan: {
    name: "Fan Lab",
    pi: "Xing Fan",
    email: "xingfan@fas.harvard.edu",
    location: "Jefferson",
    type: "Experimental Physics",
    image: "/lab_images/kim-circuit.png", // placeholder
    description: "Our lab focuses on experimental physics with projects ranging from machining to FPGA development.",
    hasSurveyData: true,
    hoursPerWeek: "This depends on each student, so I need to chat with them to decide this.",
    coAuthorship: "Yes",
    undergradCount: "2-3",
    projectLength: "This really depends on each student's situation and skills",
    researchType: "Depending on what they like, it ranges a lot: Machining, coding, prototyping, FPGA, electronics, etc.",
    sampleProjects: [
      "FPGA development",
      "Designing PCB board and setting up electronics",
      "Setting up data loggers",
      "Prototyping laser construction",
      "Automated data acquisition system"
    ],
    prerequisites: "Basic understanding of classical and some quantum physics. Being able to solve problems quantitatively.",
    groupMeetings: "Yes, once per week",
    qrCodeWilling: "Would like more information"
  },
  barandes: {
    name: "Barandes Group",
    pi: "Jacob Barandes",
    email: "jbarandes@fas.harvard.edu",
    website: "https://www.physics.harvard.edu/people/facpages/barandes",
    location: "Jefferson",
    type: "Philosophy of Physics",
    image: "/lab_images/cotler-blackboard.jpg", // placeholder
    description: "I work in an area called philosophy of physics, which is closely connected to several areas of analytic philosophy.",
    hasSurveyData: true,
    hoursPerWeek: "10 hours per week",
    coAuthorship: "Yes",
    undergradCount: "0 currently. In principle, 1 or 2.",
    projectLength: "Ideally 1 year",
    researchType: "Reading papers and books, writing, detailed discussions, one-on-one and group meetings, some calculations (mostly by hand), and some simulations.",
    sampleProjects: [
      "None so far — this is a developing research group"
    ],
    prerequisites: "Interest in quantum foundations. Previous exposure to philosophy of science at the introductory level, 100-level courses in analytic philosophy, undergraduate quantum mechanics, proof-based mathematics, elementary probability theory, and basic statistics.",
    additionalInfo: "My work is interdisciplinary and mathematically rigorous. Students should be comfortable with philosophy, statistics, and mathematics, not just physics. That said, students who are jointly concentrating in physics and philosophy should be fine.\n\nAlso, philosophy of physics is a bit of a niche field, with a significant risk/benefit ratio. Not all physics graduate schools understand what it is or why it's important, for complicated historical and sociological reasons. So students planning to go to graduate school in physics should think seriously about whether this would make their applications as strong as they could be.",
    minimumCommitment: "At least 2 semesters",
    afterGroup: "None so far",
    groupMeetings: "Every 2 weeks",
    qrCodeWilling: "No"
  }
};

// Component for displaying info cards
function InfoCard({ icon: Icon, label, value, className = "" }: { icon: any; label: string; value: string; className?: string }) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg bg-muted/50 ${className}`}>
      <div className="p-2 rounded-md bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function LabDetailPage() {
  const params = useParams();
  const labId = params.id as string;
  const lab = labsDetailData[labId];
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  if (!lab) {
  return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Lab Not Found</h1>
        <p className="text-muted-foreground mb-8">The lab you're looking for doesn't exist or hasn't been added yet.</p>
        <Button asChild>
        <Link href="/labs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Labs
        </Link>
      </Button>
              </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header with Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img
          src={lab.image}
          alt={lab.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-6">
          <Button variant="ghost" asChild className="mb-4 -ml-2 text-foreground/80 hover:text-foreground">
            <Link href="/labs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Labs
            </Link>
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                {lab.type}
              </Badge>
              {lab.hasSurveyData && (
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified Info
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{lab.name}</h1>
            <p className="text-lg text-muted-foreground mt-1">Principal Investigator: {lab.pi}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Main Content */}
        <div className="space-y-6">
            {/* About Section */}
                  <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    About the Lab
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{lab.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lab Videos Section */}
            {lab.videos && lab.videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Lab Video{lab.videos.length > 1 ? 's' : ''}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`grid gap-4 ${lab.videos.length > 1 ? 'md:grid-cols-2' : ''}`}>
                      {lab.videos.map((video, idx) => (
                        <div key={idx} className="space-y-2">
                          {lab.videos!.length > 1 && (
                            <h4 className="font-medium text-sm">{video.title}</h4>
                          )}
                          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.url.split('/').pop()}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
                          {video.description && (
                            <p className="text-xs text-muted-foreground">{video.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Survey Data Sections */}
            {lab.hasSurveyData ? (
              <>
                {/* What Research Looks Like */}
                {lab.researchType && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Beaker className="h-5 w-5" />
                          What Research Looks Like
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{lab.researchType}</p>
            </CardContent>
          </Card>
                  </motion.div>
                )}

                {/* Sample Projects */}
                {lab.sampleProjects && lab.sampleProjects.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
              <Card>
                <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Example Undergraduate Projects
                        </CardTitle>
                </CardHeader>
                <CardContent>
                        <ul className="space-y-3">
                          {lab.sampleProjects.map((project, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                              <span className="text-muted-foreground">{project}</span>
                            </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
                  </motion.div>
                )}

                {/* Prerequisites */}
                {lab.prerequisites && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                <Card>
                  <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" />
                          Prerequisites & Skills
                        </CardTitle>
                  </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{lab.prerequisites}</p>
                  </CardContent>
                </Card>
                  </motion.div>
                )}

                {/* Additional Info - Before You Reach Out */}
                {lab.additionalInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                          <Info className="h-5 w-5" />
                          Before You Reach Out
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {lab.additionalInfo.split(/(https?:\/\/[^\s]+)/g).map((part, idx) => 
                            part.match(/^https?:\/\//) ? (
                              <a 
                                key={idx} 
                                href={part} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline break-all"
                              >
                                {part}
                              </a>
                            ) : (
                              <span key={idx}>{part}</span>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* After the Group */}
                {lab.afterGroup && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
              <Card>
                <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Where Students Go After
                        </CardTitle>
                </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{lab.afterGroup}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="font-semibold mb-2">Survey Data Not Available</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      This professor hasn't completed our undergraduate research survey yet. 
                      Contact them directly for more information about research opportunities.
                    </p>
                </CardContent>
              </Card>
              </motion.div>
            )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
          <Card>
            <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{lab.location}</span>
              </div>
                  {lab.email && (
                    <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${lab.email}`} className="text-sm text-primary hover:underline">
                    {lab.email}
                  </a>
                </div>
                  )}
                  {lab.website && (
                    <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={lab.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        Lab Website
                        <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                  )}
            </CardContent>
          </Card>
            </motion.div>

            {/* Quick Stats */}
            {lab.hasSurveyData && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
          <Card>
            <CardHeader>
                    <CardTitle className="text-lg">At a Glance</CardTitle>
            </CardHeader>
                  <CardContent className="space-y-3">
                    {lab.hoursPerWeek && (
                      <InfoCard 
                        icon={Clock} 
                        label="Time Commitment" 
                        value={lab.hoursPerWeek} 
                      />
                    )}
                    {lab.undergradCount && (
                      <InfoCard 
                        icon={Users} 
                        label="Undergrads per Semester" 
                        value={lab.undergradCount} 
                      />
                    )}
                    {lab.projectLength && (
                      <InfoCard 
                        icon={Calendar} 
                        label="Typical Project Length" 
                        value={lab.projectLength} 
                      />
                    )}
                    {lab.minimumCommitment && (
                      <InfoCard 
                        icon={CheckCircle2} 
                        label="Minimum Commitment" 
                        value={lab.minimumCommitment} 
                      />
                    )}
                    {lab.coAuthorship && (
                      <InfoCard 
                        icon={FileText} 
                        label="Co-authorship Policy" 
                        value={lab.coAuthorship} 
                      />
                    )}
                    {lab.groupMeetings && (
                      <InfoCard 
                        icon={Users} 
                        label="Group Meetings" 
                        value={lab.groupMeetings} 
                      />
                    )}
            </CardContent>
          </Card>
              </motion.div>
            )}

            {/* CTA */}
            {lab.email && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="py-6">
                    <h3 className="font-semibold mb-2">Interested in joining?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Reach out to {lab.pi} via email to express your interest in undergraduate research.
                    </p>
                    <button
                      onClick={() => copyEmail(lab.email!)}
                      className="w-full flex items-center justify-between gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-md transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{lab.email}</span>
                      </div>
                      {emailCopied ? (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4" />
                          <span className="text-xs font-medium">Copied!</span>
                        </div>
                      ) : (
                        <Copy className="h-4 w-4 text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
                      )}
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
