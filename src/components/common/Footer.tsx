import Link from 'next/link'
import Image from 'next/image'
import { Globe, Share2, Mail, MapPin, Phone, Instagram } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-16 pb-10 border-t border-brand-200/80">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-14 h-14 shrink-0">
                <Image 
                  src="/images/logo-emblem.png" 
                  alt="Joint Clinic - Dr. Gaurav Bhargava" 
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-semibold text-black/70 uppercase tracking-wider leading-none mb-0.5">
                  Dr. Gaurav Bhargava&apos;s
                </span>
                <span className="text-2xl font-serif font-bold text-black leading-none tracking-tight group-hover:text-[#059B8F] transition-colors">
                  Joint Clinic
                </span>
                <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-brand-200">
                  <span className="text-[9px] font-semibold text-[#0A7C97] tracking-wider uppercase">
                    A Centre of Arthroplasty &amp; Arthroscopy
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-black leading-relaxed text-sm">
              Led by <strong className="text-black font-bold">Dr. Gaurav Bhargava</strong> (Best Orthopedic Doctor &amp; Bone Specialist in Kanpur, Ex-Senior Resident MAMC New Delhi). Providing advanced bone, joint &amp; fracture treatment with rapid 24-hour walking recovery in Kanpur.
            </p>
            
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/jointclinic_dr.gauravbhargava/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="w-10 h-10 rounded-full bg-white border border-brand-200 flex items-center justify-center hover:bg-[#059B8F] hover:border-[#059B8F] hover:text-white transition-all group text-black"
              >
                <Instagram size={17} className="transition-colors" />
              </a>
              <a 
                href="https://wa.me/917309038872" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp" 
                className="w-10 h-10 rounded-full bg-white border border-brand-200 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all group text-black"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current transition-colors" />
              </a>
              <a 
                href="https://www.justdial.com/Kanpur/Dr-Gaurav-Bhargava-Khalasi-Lines/0512PX512-X512-230826172245-T8L3_BZDET" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Justdial Profile" 
                className="w-10 h-10 rounded-full bg-white border border-brand-200 flex items-center justify-center hover:bg-[#059B8F] hover:border-[#059B8F] hover:text-white transition-all group text-black"
              >
                <Globe size={17} className="transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-8 relative inline-block text-black">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#02BAB9] rounded-full"></span>
            </h4>
            <ul className="space-y-3.5 text-black text-sm">
              <li>
                <Link href="/about" className="hover:text-[#059B8F] transition-colors">
                  About Dr. Gaurav Bhargava
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-[#059B8F] transition-colors">
                  Treatments &amp; Surgeries
                </Link>
              </li>
              <li>
                <Link href="/recovery-guide" className="hover:text-[#059B8F] transition-colors">
                  Recovery Guide (All Specialties)
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#059B8F] transition-colors">
                  Verified Patient Reviews (5.0★)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#059B8F] transition-colors">
                  Orthopaedic Health Library
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-[#059B8F] transition-colors">
                  Book Clinic Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#059B8F] transition-colors">
                  Clinic GPS &amp; Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Orthopedic Procedures */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-8 relative inline-block text-black">
              Bone &amp; Joint Treatments
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#02BAB9] rounded-full"></span>
            </h4>
            <ul className="space-y-3.5 text-black text-sm">
              <li>
                <Link href="/treatments/total-knee-replacement" className="hover:text-[#059B8F] transition-colors">
                  Knee Replacement Surgery
                </Link>
              </li>
              <li>
                <Link href="/treatments/hip-replacement" className="hover:text-[#059B8F] transition-colors">
                  Hip Replacement Surgery
                </Link>
              </li>
              <li>
                <Link href="/treatments/sports-injury-acl-treatment" className="hover:text-[#059B8F] transition-colors">
                  Sports Injury &amp; ACL Treatment
                </Link>
              </li>
              <li>
                <Link href="/treatments/shoulder-arthroscopy" className="hover:text-[#059B8F] transition-colors">
                  Shoulder &amp; Rotator Cuff Treatment
                </Link>
              </li>
              <li>
                <Link href="/treatments/joint-preservation-prp" className="hover:text-[#059B8F] transition-colors">
                  PRP Therapy &amp; Joint Pain Care
                </Link>
              </li>
              <li>
                <Link href="/treatments/complex-trauma-fractures" className="hover:text-[#059B8F] transition-colors">
                  Bone Fracture &amp; Trauma Care
                </Link>
              </li>
              <li>
                <Link href="/treatments/spine-sciatica-care" className="hover:text-[#059B8F] transition-colors">
                  Slip Disc &amp; Sciatica Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Dual Clinic Contacts */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-8 relative inline-block text-black">
              Clinic Contact
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#02BAB9] rounded-full"></span>
            </h4>
            <ul className="space-y-5 text-black text-sm">
              <li className="flex gap-3">
                <MapPin className="text-[#059B8F] shrink-0 mt-1" size={18} />
                <div>
                  <div className="font-bold text-black">Joint Clinic (Swaroop Nagar)</div>
                  <p className="text-xs leading-relaxed text-black/80">
                    7/198-A, Anand Bazar, Khalasi Line, Swaroop Nagar, Kanpur 208002
                  </p>
                  <span className="text-[11px] text-[#F18712] font-bold">05:00 PM – 07:00 PM (Mon–Sat)</span>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="text-[#059B8F] shrink-0 mt-1" size={18} />
                <div>
                  <div className="font-bold text-black">BMTC (Kidwai Nagar)</div>
                  <p className="text-xs leading-relaxed text-black/80">
                    30-E, O Block, Kidwai Nagar, Kanpur 208023
                  </p>
                  <span className="text-[11px] text-[#F18712] font-bold">10:00 AM – 02:00 PM | 24/7 Emergency</span>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-[#059B8F] shrink-0" size={18} />
                <a href="tel:+917309038872" className="font-semibold text-black hover:text-[#059B8F] transition-colors font-mono">
                  +91 73090 38872
                </a>
              </li>
              <li className="text-xs text-black/70 italic leading-relaxed pt-2 border-t border-brand-100">
                Direct OPD consultations available Mon–Sat. For emergency trauma admissions, BMTC operates 24/7.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-100 flex flex-col md:flex-row items-center justify-between gap-6 text-black/70 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Joint Clinic • Dr. Gaurav Bhargava. A Centre of Arthroplasty &amp; Arthroscopy.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-[#059B8F] transition-colors">About Doctor</Link>
            <Link href="/appointment" className="hover:text-[#059B8F] transition-colors">Book Appointment</Link>
            <Link href="/contact" className="hover:text-[#059B8F] transition-colors">Directions</Link>
            <a href="https://karmait.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#059B8F] transition-colors">
              Managed by Karma Automation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
