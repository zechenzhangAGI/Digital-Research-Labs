"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import Link from "next/link";

const tableOfContents = [
  { id: "weitz", title: "Visiting Weitz Lab" },
  { id: "dvorkin", title: "Dinner with Professor Dvorkin" },
  { id: "cohen", title: "Mice in the Cohen Lab" },
];

export default function ReflectionsPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Quote className="w-5 h-5 text-primary/60" />
              <span className="text-sm font-medium text-primary/70">Student Reflection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              The Ethics of Physics Research
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              A thoughtful exploration of responsibility, discovery, and the human cost of science
            </p>
            <p className="text-sm text-muted-foreground/80 font-medium">
              By Rachel Fields, Physics 95 Fall 2025
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                  Reading Guide
                </h2>
                <div className="space-y-2">
                  {tableOfContents.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center gap-3 text-left w-full p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-sm dark:prose-invert max-w-none"
          >
            <Card className="border-secondary/30">
              <CardContent className="pt-8 pb-8">
                {/* Introduction Section */}
                <div id="introduction" className="space-y-6 scroll-mt-20">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">The Ethics Question: Reflections on Physics 95</h2>
                    <Separator className="mb-6" />
                  </div>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Late at night the lights of the physics building flicker to the tune of vacuum pumps rhythmically
                    humming and grad students taking data. The steady march towards new physics never stops, for in the
                    same rooms where a new era of general relativity <a href="https://en.wikipedia.org/wiki/Pound%E2%80%93Rebka_experiment" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">began</a>, today's researchers probe everything from
                    dark matter to emergent phenomena. In a world with so much left to understand, it seems there is
                    never any time to pause, for every second spent discussing, is a moment not collecting data or
                    pushing the boundaries of the natural world.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Thousands of miles away from Harvard's underground labs, soil sits full of radiation, buildings
                    explode, and precious natural resources are drained away. The legacy of physics echoes widely both
                    in the blast radius of our most dangerous weapons and the consumption of enough water and
                    electricity to fuel entire cities. For each new discovery, a world of great opportunity and
                    perilous danger is created. The days of killing tens of thousands in seconds might have been
                    paused, but ongoing research is threatening in ways as new as the science behind them.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    For every possible misstep, however, there is also great hope for what is possible. The same
                    discoveries that created nuclear weapons also opened the door to new forms of energy and medicine
                    that have saved countless lives and helped propel scientific missions into space. The entire
                    manmade world as we know it is the product of what was, at the time, groundbreaking research. So
                    how can we fault the money spent, resources used, and lives lost if one day so much more could be
                    created?
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    This side of physics, the one that asks if the risk is worth the reward, feels like an impossible
                    question to surmount. For every fundamental law we uncover, we have yet to find an indisputable
                    moral framework for the acceptable costs of scientific discovery. Over the course of the semester,
                    we repeatedly asked visiting professors difficult questions about the ethics of their work and in
                    their responses was an implied question:{" "}
                    <span className="italic">
                      Is a researcher at fault for the harm their discoveries can unleash on the world?
                    </span>{" "}
                    Reflecting on some of the labs we visited, I offer the following thoughts:
                  </p>
                </div>

                <Separator className="my-8" />

                {/* Weitz Lab Section */}
                <div id="weitz" className="space-y-6 scroll-mt-20">
                  <h3 className="text-xl font-bold">Visiting Weitz Lab</h3>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Early in the course we spoke to Professor Weitz and visited his lab. During our tour, we learned
                    about using microfluidics to isolate single cells each in their own droplet "test tube." The lab
                    develops devices capable of precisely sorting, mixing, and testing individual droplets on chips
                    smaller than the palm of your hand.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    While the development of microfluidics technology is application-agnostic, it would be imprudent
                    to assume that all of its potential uses are ethically sound. On one end of the spectrum, concerns
                    have been <a href="https://www.usni.org/magazines/proceedings/2019/june/microfluidics-should-scare-you" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">raised</a> about microfluidics being used in chemical and biological weapons of mass
                    destruction. On the other hand, microfluidics has the potential for creating cheap personalized
                    tumor treatments. Weighing the fear of the worst case against the hope for the best case presents a
                    whole new array of questions for a lab that is just developing new technology without a definite
                    application in sight.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    It is possible to argue that the potential of weaponization has no bearing on the work done in the
                    lab. Almost anything from fertilizer to a metal pipe can become a weapon and yet we have not
                    prevented research or usage of either material. And yet there are plenty of fields characterized by
                    controlled substances and high security labs. So do microfluidics meet the mark?
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Unlike highly dangerous viruses and radioactive materials, the simple existence of a microfluidics
                    chip is not sufficient to classify it as a danger to society. It is the usage of such a chip that
                    could cause harm to the world. Arguably, this, once again, removes all responsibility from a lab
                    that is only charged with the device's creation.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Unfortunately, this is an oversimplistic view. Every microfluidics chip the Weitz Lab makes goes
                    somewhere and the lab has a strong bearing on where that somewhere is. For every startup and
                    graduating grad student allowed to take the technology into the world, the lab is partially
                    responsible. While they cannot control all the evil that could possibly come from microfluidics
                    chips, they hold responsibility for the people they allow to harness that potential.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Taking that responsibility seriously requires meaningful standards and conversations about what
                    ethical applications look like. At the end of the day, as the head of a lab, the professor must
                    carry the weight of whatever is done with the tools they have created for the world. That
                    responsibility must be a driving force in the work that is done, even if the lab itself never
                    engineers an application for their research.
                  </p>
                </div>

                <Separator className="my-8" />

                {/* Dvorkin Section */}
                <div id="dvorkin" className="space-y-6 scroll-mt-20">
                  <h3 className="text-xl font-bold">Dinner with Professor Dvorkin</h3>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    During one of our Tuesday evening classes spent eating dinner with Professor Dvorkin, a loud
                    argument emerged: is it worth funding fundamental physics research? With two fundamental physics
                    researchers present, one a theoretical cosmologist and the other a particle physicist, the question
                    was unsurprisingly met with a passionate defense of the field. As the class ended without a true
                    consensus, the underlying question of ethics was never truly answered.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Funding fundamental physics research becomes an ethical question in a world of finite resources and
                    money. Every dollar put towards CERN or a new telescope is a dollar not spent curing cancer or even
                    building affordable housing. If the world is a zero-sum game of time, energy, money, and physical
                    resources, then everything given to one field is also taken away from another.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    While there is a great deal of logical justification for treating the world in this way, there is
                    also the fundamental question of what it means to be human. While it is possible to believe the
                    ultimate goal of a person is to live in the purest sense of the word, living in a sterile white
                    room devoid of both illness and entertainment seems antithetical to the human experience. Even
                    expanding the world beyond four white walls, living a life justified only by functionality and
                    expediency would close the doors of human passion. In such a world there would be no art,
                    literature, or music. There would be no beauty in understanding quantum physics or the stars.
                    There would only be work, work, and more work.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Funnelling the world's resources into the most applicable fields, perhaps medical and
                    environmental research, would create a future free from pandemics or rising sea levels but it would
                    also rob us of the very joys of the world. The price of fundamental physics research is money,
                    time, and resources but the services returned extend well beyond understanding gravitational
                    lensing or quarks. Since the beginning of mankind, humans have longed to understand the universe.
                    Even in times of astronomical child mortality and starvation, people still stared at the stars in
                    wonder. Over four thousand years ago mankind was already tracking the stars, desperate for answers.
                    Funding fundamental physics research is our way of finding the answers our ancestors could barely
                    have dreamed of.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    That deeply human pursuit can only be driven with meaningful material sacrifice. The money, energy,
                    and resources required in the process of discovery are real costs that cannot be taken lightly. But
                    they must be taken.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    The responsibility of reducing the cost to society is in the hands of every researcher in the field
                    and it is a task that key institutions seem to be <a href="https://home.cern/news/news/knowledge-sharing/cern-publishes-its-environment-report-2021-2022" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">taking seriously</a>. While there is room to critique
                    the balance of allocated resources and meaningful results produced, fundamental physics is a field
                    where not pursuing research would be an ethical failing of humankind.
                  </p>
                </div>

                <Separator className="my-8" />

                {/* Cohen Lab Section */}
                <div id="cohen" className="space-y-6 scroll-mt-20">
                  <h3 className="text-xl font-bold">Mice in the Cohen Lab</h3>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    There is no doubt that the conversation with Professor Cohen was the most ethically polarizing of
                    the class. There were dead mice, there was mind control, and there were difficult questions about
                    the cost of learning about the brain. Being confronted with the realities of animal testing is a
                    difficult hurdle despite a societal willingness to benefit from its results.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Hearing that the mice did not feel pain is difficult to reconcile with pictures of a mouse missing
                    parts of its skull. Knowing that a review board approved it somehow does not make the experiment
                    more palatable. Imagining your own head cut open only makes things infinitely worse.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Even with stringent controls governing experiments involving animals, there are still deep personal
                    and ethical questions that can never systematically be answered. Most fundamentally is the question
                    of whether a decision by a governing body is sufficient to justify the personal choice to do
                    research which might cause a living being pain, even by accident? Every step of the process is
                    defined by our current understanding of mouse consciousness and if the scope of ongoing research is
                    indicative of anything, it is that there is still much to learn. One day, that learning could lead
                    us to the fact that the mice being tested on were deeply in pain but their response looked so
                    inhuman we completely missed it.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Unfortunately, that risk is impossible to mitigate and animal experimentation is the only field of
                    physics we encountered that even tries to codify its own ethical lines. Being able to trust an
                    ethical review board is the only thing that allows us to manage both the possibility for error and
                    the great potential in conducting new research. While we may learn of grievous errors in our past
                    treatment of mice, there is at least a framework to prevent the repetition of those mistakes while
                    still allowing research that has the potential to generate huge improvements in treatments of
                    debilitating human conditions.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Like all research, however, there is an ever-present threat of misuse. Professor Cohen introduced
                    experiments that allow for the excitation of specific parts of the brain generating, among other
                    things, violence and aggression. In a series of videos that could appear in a horror movie if they
                    featured humans, mice began attacking whatever was in their cage until their human overlords turned
                    off the stimulating light.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    The expansion of such an experiment beyond laboratory mice harkens to a fundamental human fear of
                    control being forcefully taken. Accepting the risk that such a technology could be expanded to
                    humankind requires a belief that such unethical behavior would be stopped in its tracks. Regardless
                    of personal beliefs on the existence of animal testing, review boards have paused unethical
                    research in its tracks.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    The standard of ethical review by a body of experts is the clearest acknowledgement of the moral
                    obligations of a researcher in our class this semester. Expanding ethical reviews to other fields
                    of physics is a compelling possibility for systematically expanding ethical standards and forcing
                    true reflection on the worst applications of understanding the physical world.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-8 border-t"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-muted-foreground text-center sm:text-left">
                <p className="font-medium mb-1">About This Reflection</p>
                <p>
                  Part of Physics 95, Fall 2025
                </p>
              </div>
              <Link
                href="/about"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary hover:text-primary font-medium"
              >
                Back to About
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
