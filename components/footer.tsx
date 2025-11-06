import Link from "next/link";
import { FlaskConical, Mail, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FlaskConical className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Physics Lab Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Central hub for Harvard Physics Department research infrastructure
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/labs" className="text-muted-foreground hover:text-primary transition-colors">
                  Research Labs
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-muted-foreground hover:text-primary transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-primary transition-colors">
                  Interactive Maps
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://physics.harvard.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Physics Department
                </a>
              </li>
              <li>
                <a 
                  href="https://www.harvard.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Harvard University
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:physics@harvard.edu"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/zechenzhangAGI/Digital-Research-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Harvard Physics Department<br />
              17 Oxford Street<br />
              Cambridge, MA 02138
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Harvard University. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link href="/accessibility" className="hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
