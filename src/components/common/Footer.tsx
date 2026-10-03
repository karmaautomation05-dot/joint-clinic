import Link from 'next/link'
import Image from 'next/image'
import { Globe, MapPin, Phone, Instagram } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'

export default function Footer() {
  return (
    <footer className="bg-slate-50/70 text-slate-700 pt-14 sm:pt-20 pb-20 sm:pb-24 border-t border-slate-200/80 font-sans">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <Image 
                  src="/images/logo-emblem.png" 
                  alt="Joint Clinic - Dr. Gaurav Bhargava" 
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-0.5">
                  Dr. Gaurav Bhargava&apos;s
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-none tracking-tight group-hover:text-brand-600 transition-colors">
                  Joint Clinic
                </span>
                <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-brand-200/60">
                  <span className="text-[9px] font-semibold text-brand-700 tracking-wider uppercase">
                    A Centre of Arthroplasty &amp; Arthroscopy
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              Led by <strong className="text-slate-900 font-bold">Dr. Gaurav Bhargava</strong> (Best Orthopedic Doctor &amp; Bone Specialist in Kanpur, Ex-Senior Resident MAMC New Delhi). Providing advanced bone, joint &amp; fracture treatment with rapid 24-hour walking recovery in Kanpur.
            </p>
            
            <div className="flex gap-2.5 pt-1">
              <a 
                href="https://www.instagram.com/jointclinic_dr.gauravbhargava/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all text-slate-700 shadow-2xs"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://wa.me/917309038872" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all text-slate-700 shadow-2xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
              <a 
                href="https://www.justdial.com/Kanpur/Dr-Gaurav-Bhargava-Khalasi-Lines/0512PX512-X512-230826172245-T8L3_BZDET" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Justdial Profile" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all text-slate-700 shadow-2xs"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-serif font-bold mb-5 sm:mb-7 relative inline-block text-slate-900">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#02BAB9] rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-slate-600 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  About Dr. Gaurav Bhargava
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Treatments &amp; Surgeries
                </Link>
              </li>
              <li>
                <Link href="/treatments?tab=recovery" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Recovery Roadmaps (All Specialties)
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Verified Patient Reviews (5.0★)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Orthopaedic Health Library
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Book Clinic Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Clinic GPS &amp; Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Orthopedic Procedures */}
          <div>
            <h4 className="text-base sm:text-lg font-serif font-bold mb-5 sm:mb-7 relative inline-block text-slate-900">
              Bone &amp; Joint Treatments
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#02BAB9] rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-slate-600 text-xs sm:text-sm">
              <li>
                <Link href="/treatments/total-knee-replacement" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Knee Replacement Surgery
                </Link>
              </li>
              <li>
                <Link href="/treatments/hip-replacement" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Hip Replacement Surgery
                </Link>
              </li>
              <li>
                <Link href="/treatments/sports-injury-acl-treatment" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Sports Injury &amp; ACL Treatment
                </Link>
              </li>
              <li>
                <Link href="/treatments/shoulder-arthroscopy" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Shoulder &amp; Rotator Cuff Care
                </Link>
              </li>
              <li>
                <Link href="/treatments/joint-preservation-prp" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  PRP Therapy &amp; Joint Preservation
                </Link>
              </li>
              <li>
                <Link href="/treatments/complex-trauma-fractures" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Bone Fracture &amp; Trauma Care
                </Link>
              </li>
              <li>
                <Link href="/treatments/spine-sciatica-care" className="hover:text-brand-600 transition-colors inline-block py-0.5">
                  Slip Disc &amp; Sciatica Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Dual Clinic Contacts */}
          <div>
            <h4 className="text-base sm:text-lg font-serif font-bold mb-5 sm:mb-7 relative inline-block text-slate-900">
              Clinic Contact
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#02BAB9] rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-slate-600 text-xs sm:text-sm">
              <li className="flex gap-2.5">
                <MapPin className="text-brand-600 shrink-0 mt-0.5" size={17} />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Joint Clinic (Swaroop Nagar)</div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    7/198-A, Anand Bazar, Khalasi Line, Swaroop Nagar, Kanpur 208002
                  </p>
                  <span className="text-[11px] text-[#F18712] font-semibold block mt-0.5">04:00 PM – 07:00 PM (Mon–Sat)</span>
                </div>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="text-brand-600 shrink-0 mt-0.5" size={17} />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">BMTC Hospital (Kidwai Nagar)</div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    30-E, O Block, Kidwai Nagar, Kanpur 208023
                  </p>
                  <span className="text-[11px] text-[#F18712] font-semibold block mt-0.5">10:00 AM – 02:00 PM | 24/7 Emergency</span>
                </div>
              </li>
              <li className="flex gap-2.5 items-center pt-1 border-t border-slate-200">
                <Phone className="text-brand-600 shrink-0" size={16} />
                <a href="tel:+917309038872" className="font-bold text-slate-900 hover:text-brand-600 transition-colors font-mono text-xs sm:text-sm">
                  +91 73090 38872
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs sm:text-sm text-center md:text-left">
          <p>© {new Date().getFullYear()} Joint Clinic • Dr. Gaurav Bhargava. A Centre of Arthroplasty &amp; Arthroscopy.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-brand-600 transition-colors">About Doctor</Link>
            <Link href="/appointment" className="hover:text-brand-600 transition-colors">Book Appointment</Link>
            <Link href="/contact" className="hover:text-brand-600 transition-colors">Directions</Link>
            <a href="https://karmait.in/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">
              Managed by Karma Automation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
