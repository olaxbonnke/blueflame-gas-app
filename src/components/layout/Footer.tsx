'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export function Footer() {
  const pathname = usePathname();
  const [contacts, setContacts] = useState<any>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await supabase.from('contacts').select('*').limit(1).maybeSingle();
      if (data) setContacts(data);
    };
    fetchContacts();
  }, []);

  // Hide footer on admin dashboard routes
  if (pathname?.startsWith('/admin') && pathname !== '/admin') return null;

  const phone = contacts?.phone || null;
  const email = contacts?.email || null;
  const whatsapp = contacts?.whatsapp || null;
  const facebook = contacts?.facebook || null;
  const twitter = contacts?.twitter || null;
  const instagram = contacts?.instagram || null;

  return (
    <footer className="bg-[#11151C] pt-20 pb-10 border-t border-white/5" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand + Socials */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.98 7.98 0 01-2.343 5.657z"></path></svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">BlueFlame<span className="text-[#0EA5E9]">Gas</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Providing safe, efficient, and reliable energy solutions to Nigerian households and businesses since 2015.</p>
            <div className="flex gap-4">
              {/* Twitter / X */}
              <a className="text-gray-400 hover:text-[#0EA5E9] transition-colors" href={twitter || '#'} target={twitter ? '_blank' : undefined} rel="noopener noreferrer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              {/* Instagram */}
              <a className="text-gray-400 hover:text-[#0EA5E9] transition-colors" href={instagram || '#'} target={instagram ? '_blank' : undefined} rel="noopener noreferrer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              {/* Facebook */}
              {facebook && (
                <a className="text-gray-400 hover:text-[#0EA5E9] transition-colors" href={facebook} target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="/services">Our Services</Link></li>
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="/shop">Cylinder Shop</Link></li>
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="/safety">Safety Protocols</Link></li>
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="/locations">Locations</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="/newsletter">Newsletter</Link></li>
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="#">Terms of Service</Link></li>
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="#">Privacy Policy</Link></li>
              <li><Link className="hover:text-[#0EA5E9] transition-colors" href="/safety">Emergency Contacts</Link></li>
            </ul>
          </div>

          {/* Contact Info — live from Supabase */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              {phone && (
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#0EA5E9] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <a href={`tel:${phone}`} className="hover:text-[#0EA5E9] transition-colors">{phone}</a>
                </li>
              )}
              {whatsapp && (
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#0EA5E9] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                  <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0EA5E9] transition-colors">{whatsapp}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#0EA5E9] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <a href={`mailto:${email}`} className="hover:text-[#0EA5E9] transition-colors">{email}</a>
                </li>
              )}
              {!phone && !email && !whatsapp && (
                <li className="text-gray-600 italic text-xs">No contact info set yet.</li>
              )}
              <li className="pt-4">
                <Link href="/admin" className="text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-widest font-bold">Admin Login</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BlueFlame Gas Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
