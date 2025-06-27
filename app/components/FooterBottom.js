'use client'

import { Instagram, Twitter, Github, Linkedin, Youtube, Facebook } from 'lucide-react'
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
    <div className="relative z-30 w-full bg-black/90 rounded-t-[40px] border-t border-l border-r drop-shadow-[0_0_40px_rgba(160,97,255,0.7)] shadow-[0_0_30px_rgba(160,97,255,0.8)] px-8 pb-6 pt-10" 
    style={{ fontFamily: 'var(--font-jakarta)' }}>
      {/* Logo positioned on the top border */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <Image
          src="/assets/logo.png"
          alt="VinnovateIT Logo"
          width={160}
          height={64}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Text */}
        <div className="text-sm max-w-md"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          <p className="text-gray-400 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet consectetur. In ipsum dolor eget turpis. Egestas in aliquet sodales nisi.
          </p>
          <p className="text-xs text-gray-500">© 2025 VinnovateIT, Vellore Institute of Technology</p>
        </div>

        {/* Right side with social icons and button */}
 <div className="flex flex-col items-center md:items-end gap-6">
  {/* Social Icons */}
  <div className="flex flex-row flex-wrap justify-center md:justify-end gap-4">
    {socials.map((social) => {
      const IconComponent = social.icon;
      return (
        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
          <button className="bg-gradient-to-br from-purple-800 to-black p-1.5 md:p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(160,97,255,0.6)] transition-all duration-300 border border-purple-500/20">
            {/* Smaller icon on small screens, bigger on large */}
            <IconComponent size={16} className="text-white md:size-10" />
          </button>
        </a>
      )
    })}
  </div>


          {/* Connect Button */}
          <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(160,97,255,0.7)] transition-all duration-300 font-medium"
          style={{ fontFamily: "Orbitron, monospace" }}>
            Let&apos;s connect
          </button>
        </div>
      </div>
    </div>
  )
}