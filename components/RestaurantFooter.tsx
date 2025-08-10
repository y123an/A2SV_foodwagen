import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Help & Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Partner with us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ride with us
              </a>
            </li>
          </ul>
        </div>
        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Refund & Cancellation
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
        {/* Newsletter & Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 mb-4 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter />
            </a>
          </div>
          <p className="text-sm mb-2">
            Receive exclusive offers in your mailbox
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 placeholder-gray-400 text-white rounded-l-md px-4 py-2 w-full focus:outline-none"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-4 pb-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>All rights Reserved © Your Company, {new Date().getFullYear()}</p>
          <p className="mt-2 md:mt-0">
            Made with <span className="text-yellow-500">♥</span> by Themewagon
          </p>
        </div>
      </div>
    </footer>
  );
}
