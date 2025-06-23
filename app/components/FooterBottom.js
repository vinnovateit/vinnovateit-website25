'use client'

import {
  Instagram,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Facebook
} from 'lucide-react'
import Image from 'next/image'

const socials = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
]

export default function FooterBottom() {
  return (
    <div
      className="relative z-30 w-full rounded-t-[40px] border-t border-l border-r drop-shadow-[0_0_40px_rgba(160,97,255,0.7)] shadow-[0_0_30px_rgba(160,97,255,0.8)] px-6 md:px-8 pb-8 pt-10"
      style={{
        fontFamily: 'var(--font-jakarta)',
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // only background has opacity
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-8">
      {/* Left with Logo */}
    <div className="text-sm max-w-md text-white">
    {/* Logo */}
    <Image
      src="/assets/logo.png" 
      alt="VinnovateIT Logo"
      width={180}
      height={80}
      className="mb-2"
    />

  {/* Description */}
  <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
    Lorem ipsum dolor sit amet consectetur. In ipsum dolor eget turpis. Egestas in aliquet sodales nisi.
  </p>

  {/* Copyright */}
  <p className="text-xs text-gray-500">
    © 2025 VinnovateIT, Vellore Institute of Technology
  </p>
</div>


        {/* Right side */}
        <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
          {/* Social Icons */}
          <div className="flex flex-row flex-wrap justify-center md:justify-end gap-6">
            {socials.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <button className="bg-gradient-to-br from-purple-800 to-black p-2 md:p-2.5 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(160,97,255,0.6)] transition-all duration-300 border border-purple-500/30">
                  <Icon size={18} className="text-white md:size-6" />
                </button>
              </a>
            ))}
          </div>

          {/* Connect Button */}
          <button
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2.5 px-6 md:py-3 md:px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(160,97,255,0.7)] transition-all duration-300 font-medium"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            Let&apos;s connect
          </button>
        </div>
      </div>
    </div>
  )
}
