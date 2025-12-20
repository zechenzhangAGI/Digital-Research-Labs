"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Rocket,
  Target,
  Users,
  Lightbulb,
  FileText,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

const timeline = [
  {
    semester: "First Year",
    title: "Explore & Learn",
    description: "Focus on your coursework (Physics 15, 16, or 11) and attend department events to learn about research areas.",
    tasks: [
      "Attend Physics Department colloquiums (Tuesdays at 4pm)",
      "Talk to upperclassmen about their research experiences",
      "Browse lab websites to understand different research areas",
      "Consider taking Physics 91r for a taste of research"
    ]
  },
  {
    semester: "Sophomore Year",
    title: "Start Reaching Out",
    description: "Begin contacting professors whose research interests you. This is the ideal time to start.",
    tasks: [
      "Identify 3-5 labs that match your interests",
      "Email professors with a tailored introduction",
      "Apply for PRISE or other summer research programs",
      "Consider starting with a Physics 91r project"
    ]
  },
  {
    semester: "Junior Year",
    title: "Deepen Your Work",
    description: "Continue your research project and consider presenting at conferences.",
    tasks: [
      "Work on independent research projects",
      "Present at research conferences (e.g., APS)",
      "Apply for research fellowships (PRISE, Herchel Smith)",
      "Start thinking about what you want to do post-graduation"
    ]
  },
  {
    semester: "Senior Year",
    title: "Graduation & Beyond",
    description: "Complete your senior year and prepare for graduate school or industry.",
    tasks: [
      "Complete physics course requirements",
      "Apply to graduate programs or jobs",
      "Present at research conferences or publish your work",
      "Mentor underclassmen interested in research"
    ]
  }
];

const emailTemplate = `Dear Professor [Name],

I am a [year] at Harvard concentrating in Physics [with a secondary in X]. I am writing to express my interest in joining your research group.

I have been following your work on [specific topic from their website/recent paper], and I find it particularly interesting because [genuine reason]. 

I have completed [relevant courses like Physics 15/16, 143a, etc.] and have experience with [relevant skills like Python, MATLAB, lab work]. I am available to commit [X hours] per week and am interested in [summer research/term-time research/both].

I would welcome the opportunity to discuss potential research opportunities in your group. I am happy to meet at your convenience.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Email]
[Your Year and Concentration]`;

const resources = [
  {
    title: "Undergraduate Research & Fellowships (URAF)",
    url: "https://uraf.harvard.edu",
    description: "Central hub for research opportunities, fellowships, and funding at Harvard."
  },
  {
    title: "Physics Department Website",
    url: "https://physics.harvard.edu",
    description: "Official department site with faculty profiles, course info, and events."
  },
  {
    title: "PRISE Summer Research",
    url: "https://uraf.harvard.edu/prise",
    description: "10-week summer research program with housing and stipend."
  },
  {
    title: "Harvard Physics Concentrators FAQ",
    url: "https://www.physics.harvard.edu/undergrad/faqs-concentrators",
    description: "Answers to common questions about the physics concentration and research."
  }
];

const faqs = [
  {
    question: "When should I start looking for research?",
    answer: "The earlier the better! Many students start sophomore year, but some begin freshman spring. Summer after freshman year is a popular time to begin."
  },
  {
    question: "Do I need prior research experience?",
    answer: "No! Most professors expect to train you. Enthusiasm, reliability, and willingness to learn are more important than prior experience."
  },
  {
    question: "How many hours per week is expected?",
    answer: "Typically 10-15 hours during the semester, or full-time (40 hours) during summer. Discuss expectations with your PI before committing."
  },
  {
    question: "Can I get paid for research?",
    answer: "Yes! You can get paid for research through the Harvard College Research Program and other sources, especially during the summer. You can also get course credit through Physics 91r (though you cannot get paid and receive course credit for the same research)."
  },
  {
    question: "What if I email a professor and don't hear back?",
    answer: "Professors are busy! Follow up politely after 1-2 weeks. Consider reaching out to graduate students or postdocs in the lab as well."
  },
  {
    question: "How do I know which lab is right for me?",
    answer: "Read papers from the lab, talk to current members, and consider whether you prefer theoretical vs. experimental work. Use the lab directory and maps to compare options, and ask upperclassmen for their experiences."
  }
];

export default function ResourcesPage() {
  return (
    <div>
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-primary mb-2">
            <GraduationCap className="h-5 w-5" />
            <span className="text-sm font-medium">For Undergraduates</span>
          </div>
          <h1 className="text-3xl font-semibold mb-2">Getting Started in Research</h1>
          <p className="text-muted-foreground max-w-2xl">
            Everything you need to know about finding and joining a physics research lab at Harvard. 
            From your first email to your graduation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="h-10">
            <TabsTrigger value="timeline" className="text-sm gap-2">
              <Clock className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="howto" className="text-sm gap-2">
              <Target className="h-4 w-4" />
              How to Apply
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-sm gap-2">
              <BookOpen className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-sm gap-2">
              <MessageSquare className="h-4 w-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Your Research Journey
                </CardTitle>
                <CardDescription>
                  A suggested timeline for getting involved in physics research at Harvard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  
                  <div className="space-y-8">
                    {timeline.map((phase, index) => (
                      <div key={phase.semester} className="relative pl-10">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        
                        <div>
                          <Badge variant="outline" className="mb-2">{phase.semester}</Badge>
                          <h3 className="text-lg font-semibold mb-1">{phase.title}</h3>
                          <p className="text-muted-foreground mb-3">{phase.description}</p>
                          <ul className="space-y-2">
                            {phase.tasks.map((task) => (
                              <li key={task} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    Pro Tip
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Don't wait until you've taken all the "right" courses. Many successful research 
                    experiences start with curiosity and enthusiasm, not perfect preparation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Ready to Start?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our lab directory to find research groups that match your interests.
                  </p>
                  <Button asChild size="sm">
                    <Link href="/labs">
                      Browse Labs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* How to Apply Tab */}
          <TabsContent value="howto" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 text-lg font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Research the Lab</h3>
                  <p className="text-sm text-muted-foreground">
                    Read the lab's website, recent publications, and news. Understand what they do 
                    and why it interests you specifically.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 text-lg font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Craft Your Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Write a personalized email explaining your interest, relevant experience, 
                    and availability. Be specific and genuine.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 text-lg font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Follow Up</h3>
                  <p className="text-sm text-muted-foreground">
                    If you don't hear back in 1-2 weeks, send a polite follow-up. Persistence 
                    shows genuine interest.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Template
                </CardTitle>
                <CardDescription>
                  A starting point for your outreach email. Customize this for each lab you contact.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                  {emailTemplate}
                </div>
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Important:</strong> Always personalize this template. Professors can tell when 
                    they receive a generic email. Mention specific papers, projects, or aspects of their 
                    research that genuinely interest you.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Professors Look For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✓ Do</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Show genuine interest in their specific research</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Mention relevant coursework and skills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Be clear about your time commitment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Attach your resume/CV</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">✗ Don't</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Send the same generic email to many professors</li>
                      <li>• Only mention wanting "research experience"</li>
                      <li>• Be vague about what you want to do</li>
                      <li>• Forget to proofread for typos</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {resources.map((resource) => (
                <Card key={resource.title} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Visit Site
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Key Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">Physics Department Office</h4>
                    <p className="text-sm text-muted-foreground">Jefferson Lab, 17 Oxford St</p>
                    <p className="text-xs text-muted-foreground mt-1">For administrative questions</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">URAF Office</h4>
                    <p className="text-sm text-muted-foreground">Smith Campus Center</p>
                    <p className="text-xs text-muted-foreground mt-1">For fellowship applications</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">Science Center</h4>
                    <p className="text-sm text-muted-foreground">1 Oxford Street</p>
                    <p className="text-xs text-muted-foreground mt-1">Near most physics buildings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Still Have Questions?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with peers, mentors, and department staff to get tailored advice on finding the right lab.
                </p>
                <div className="flex justify-center gap-3">
                  <Button asChild>
                    <Link href="/network">
                      Visit the Lab Network
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
