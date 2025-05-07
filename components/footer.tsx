// components/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Zen_Dots } from "next/font/google";
import {
  Twitter,
  Github,      // ← renamed here
  Linkedin,
  Mail,
  MapPin,
  ArrowUp,
} from "lucide-react";

const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed ${email}!`);
    setEmail("");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gradient-to-t from-[#002429] to-[#001e24] text-gray-300">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Branding */}
        <div className="md:col-span-2">
          <h2 className={`${zenDots.className} text-4xl text-white`}>Ments</h2>
          <p className="mt-3 text-sm">
            Hustling. Innovating. Inspiring.<br/>
            Connect with mentors, showcase your projects, and level up your journey.
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <Link href="https://twitter.com/mentsapp" target="_blank" aria-label="Twitter" className="hover:text-white">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="https://github.com/mentsapp" target="_blank" aria-label="GitHub" className="hover:text-white">
              <Github className="w-6 h-6" />  {/* ← use Github here */}
            </Link>
            <Link href="https://linkedin.com/company/mentsapp" target="_blank" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/roadmap" className="hover:text-white">Roadmap</Link></li>
            <li><Link href="/events" className="hover:text-white">Events</Link></li>
            <li><Link href="/guidelines" className="hover:text-white">Guidelines</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <a href="mailto:hello@ments.app" className="hover:text-white">
                hello@ments.app
              </a>
            </li>
            <li className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              IIT Madras, Chennai
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-3">Get the latest updates and tips.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 rounded-md bg-[#0f2c33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#00353b] mt-8">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="space-x-4">
            <Link href="/terms" className="hover:text-gray-200">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-200">Privacy Policy</Link>
          </div>
          <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} Ments. All rights reserved.</p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute right-6 bottom-6 p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
);
}
