'use client'

import Image from 'next/image'
import { Instagram, Twitter, Github, Linkedin, Youtube, Facebook } from 'lucide-react'

const socials = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
]

export default function Footer() {
  return (
    <div className="relative bg-gradient-to-b text-white overflow-hidden pt-32 pb-20 px-6">

            {/* 🔲 Glass Border PNGs */}
      <Image src="/assets/glass/border-top-left.png" alt="Top Left Glass" width={350} height={500}
        className="absolute top-0 left-0 z-5  pointer-events-none" />
      <Image src="/assets/glass/border-top-right.png" alt="Top Right Glass" width={600} height={600}
        className="absolute top-0 right-50 pointer-events-none" />
      <Image src="/assets/glass/border-middle-left.png" alt="Middle Left Glass" width={700} height={100}
        className="absolute top-120 left-[-16] transform -translate-y-1/2 pointer-events-none" />
      <Image src="/assets/glass/border-middle-right.png" alt="Middle Right Glass" width={850} height={200}
        className="absolute top-40 right-[-20] transform -translate-y-1/2 pointer-events-none z-5" />
      <Image src="/assets/glass/border-bottom-center.png" alt="Bottom Center Glass" width={500} height={100}
        className="absolute bottom-[-20] right-[-60] transform pointer-events-none" />
      
      <Image src="/assets/blob1.png" alt="Blob 1" width={200} height={200} className="absolute top-5 left-63 z-10" />
      <Image src="/assets/blob2.png" alt="Blob 2" width={160} height={160} className="absolute bottom-130 right-78 z-10" />
      <Image src="/assets/blob3.png" alt="Blob 3" width={200} height={200} className="absolute bottom-135 left-150 transform -translate-x-1/2 z-10" />
      <Image src="/assets/blob4.png" alt="Blob 4" width={150} height={150} className="absolute top-15 right-140 z-10" />

      {/* Main Quote */}
      <div className="text-center max-w-4xl mx-auto z-20 relative mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
          &quot;Step into the realm of <span className="text-purple-400">innovation</span>– where creativity and imagination meet skills to lead to ever–lasting changes.&quot;
        </h2>
        
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/assets/logo.png"
            alt="VinnovateIT Logo"
            width={200}
            height={80}
            className="drop-shadow-[0_0_40px_rgba(160,97,255,0.7)] mt-10 top-10"
          />
        </div>
      </div>


      {/* Footer Bottom Section */}
      <div className="relative z-30 mt-8 w-full bg-black/90 rounded-t-[40px] border-t border-purple-500/30 shadow-[0_-5px_60px_#a061ff33] p-8 bottom-0">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left Text */}
          <div className="text-sm max-w-md">
            <p className="font-bold text-lg mb-2">VinnovateIT</p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet consectetur. In ipsum dolor eget turpis. Egestas in aliquet sodales nisi.
            </p>
            <p className="text-xs text-gray-500">© 2025 VinnovateIT, Vellore Institute of Technology</p>
          </div>

          {/* Right side with social icons and button */}
          <div className="flex flex-col items-center md:items-end gap-6">
            {/* Social Icons */}
            <div className="flex gap-4">
              {socials.map((social) => {
                const IconComponent = social.icon
                return (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                    <button className="bg-gradient-to-br from-purple-600 to-black p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(160,97,255,0.6)] transition-all duration-300 border border-purple-500/20">
                      <IconComponent size={20} className="text-white" />
                    </button>
                  </a>
                )
              })}
            </div>

            {/* Connect Button */}
            <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(160,97,255,0.7)] transition-all duration-300 font-medium">
              Let's connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}