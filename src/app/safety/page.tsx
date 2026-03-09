'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Reusable scroll animation wrapper
function FadeInView({ children, delay = 0, id }: { children: React.ReactNode; delay?: number; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="scroll-mt-24"
    >
      {children}
    </motion.div>
  );
}

export default function SafetyPage() {
  return (
    <div className="bg-[#0F1117] min-h-screen text-[#E5E7EB] font-sans pt-20">
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-5xl px-6 py-10 space-y-16">
          
          {/* Hero Section */}
          <FadeInView>
            <div className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-end p-8 bg-[#11151C] shadow-2xl border border-white/5">
              <div className="absolute inset-0 opacity-40 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent z-10"></div>
              <div 
                className="absolute inset-0 z-0 bg-center bg-cover transition-transform duration-1000 hover:scale-105" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSsr93PQMUYXfYlQQKwOjfn7YKIvrCZxsbFZkdi_12lMvORpU_Sz9slqx8FL4CwySwgaY2qTbvF-g6u_4g-Fc8shj6d_KfTczMqEgVwodPmsSLPgM8iS-P1cQtbrwgRh2hRRZP6u9PCDYthYTKPdJwxwTQJptytBNxIYky6ZgEWVoM4BnqgTZRhbuAB9GsDoEn9m2gR_izj3x-A-JJGWaGzjmd40w6CfVPmkScrrEfeK5WQVyPWMxD9heAG97qolnrOaTuGkVztXQ")' }}
              ></div>
              <div className="relative z-20 max-w-2xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] text-[10px] font-black uppercase tracking-wider mb-4 border border-[#0EA5E9]/30">
                  Safety Center
                </span>
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                  Gas Safety <span className="text-[#0EA5E9]">Essentials</span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                  Your safety is our top priority. Follow these expert guidelines to ensure a secure and efficient environment for your home or business.
                </p>
              </div>
            </div>
          </FadeInView>

          {/* Navigation Tabs */}
          <FadeInView delay={0.1}>
            <div className="mb-12 border-b border-white/10 overflow-x-auto scrollbar-none">
              <div className="flex gap-8 min-w-max">
                <Link href="#ventilation" className="pb-4 border-b-2 border-transparent hover:border-[#0EA5E9] text-gray-400 hover:text-white font-bold text-sm tracking-widest transition-colors">
                  VENTILATION
                </Link>
                <Link href="#leak-detection" className="pb-4 border-b-2 border-transparent hover:border-[#0EA5E9] text-gray-400 hover:text-white font-bold text-sm tracking-widest transition-colors">
                  LEAK DETECTION
                </Link>
                <Link href="#storage" className="pb-4 border-b-2 border-transparent hover:border-[#0EA5E9] text-gray-400 hover:text-white font-bold text-sm tracking-widest transition-colors">
                  STORAGE
                </Link>
                <Link href="#child-safety" className="pb-4 border-b-2 border-transparent hover:border-[#0EA5E9] text-gray-400 hover:text-white font-bold text-sm tracking-widest transition-colors">
                  CHILD SAFETY
                </Link>
                <Link href="#emergency" className="pb-4 border-b-2 border-transparent hover:border-red-500 text-red-400 hover:text-red-300 font-bold text-sm tracking-widest transition-colors uppercase">
                  Emergency Procedures
                </Link>
              </div>
            </div>
          </FadeInView>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20">
            {/* Main Content */}
            <div className="md:col-span-8 space-y-20">
              
              {/* Ventilation */}
              <FadeInView id="ventilation">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-[#0EA5E9] text-3xl">air</span>
                  <h2 className="text-2xl font-bold text-white">Proper Ventilation</h2>
                </div>
                <div className="text-gray-400 leading-relaxed space-y-6">
                  <p>Adequate air circulation is vital for the safe operation of any gas appliance. Without it, incomplete combustion can lead to the buildup of dangerous Carbon Monoxide (CO).</p>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-start bg-white/5 p-5 rounded-xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors shadow-lg">
                      <span className="material-symbols-outlined text-[#0EA5E9] shrink-0">check_circle</span>
                      <span>Keep windows or vents slightly open in rooms where gas appliances are frequently used.</span>
                    </li>
                    <li className="flex gap-4 items-start bg-white/5 p-5 rounded-xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors shadow-lg">
                      <span className="material-symbols-outlined text-[#0EA5E9] shrink-0">check_circle</span>
                      <span>Never block air bricks or ventilation grills installed in walls or doors.</span>
                    </li>
                    <li className="flex gap-4 items-start bg-white/5 p-5 rounded-xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors shadow-lg">
                      <span className="material-symbols-outlined text-[#0EA5E9] shrink-0">check_circle</span>
                      <span>Ensure flue pipes are clear of bird nests, debris, or any obstructions.</span>
                    </li>
                  </ul>
                </div>
              </FadeInView>

              {/* Leak Detection */}
              <FadeInView id="leak-detection">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-[#0EA5E9] text-3xl">bubbles</span>
                  <h2 className="text-2xl font-bold text-white">Leak Detection: The Soap Test</h2>
                </div>
                <div className="bg-[#0EA5E9]/5 rounded-2xl border border-[#0EA5E9]/10 p-8 mb-8 backdrop-blur-sm shadow-inner">
                  <h3 className="text-[#0EA5E9] font-bold mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined">info</span>
                    How to perform the test:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-300">
                    <div className="flex flex-col gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center font-bold shadow-lg shadow-[#0EA5E9]/30">1</div>
                      <p>Mix liquid dish soap with water in a spray bottle or bowl.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center font-bold shadow-lg shadow-[#0EA5E9]/30">2</div>
                      <p>Apply the solution to the valves, hoses, and connections.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center font-bold shadow-lg shadow-[#0EA5E9]/30">3</div>
                      <p>Turn on the gas. <b className="text-white">Growing bubbles</b> indicate a leak.</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 bg-white/5 p-4 rounded-lg border-l-4 border-red-500">
                  <strong className="text-white">Warning:</strong> If you see bubbles, turn off the gas supply immediately and contact BlueFlame Support. Never use a flame to check for leaks.
                </p>
              </FadeInView>

              {/* Storage */}
              <FadeInView id="storage">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-[#0EA5E9] text-3xl">inventory_2</span>
                  <h2 className="text-2xl font-bold text-white">Cylinder Storage &amp; Handling</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-green-500">
                      <span className="material-symbols-outlined">check_circle</span>
                      Proper Storage
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-3">
                      <li className="flex gap-2"><span>&bull;</span> Store in an upright position at all times.</li>
                      <li className="flex gap-2"><span>&bull;</span> Keep in a well-ventilated outdoor area.</li>
                      <li className="flex gap-2"><span>&bull;</span> Place on a flat, non-flammable surface.</li>
                      <li className="flex gap-2"><span>&bull;</span> Ensure valves are tightly closed when not in use.</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-red-500">
                      <span className="material-symbols-outlined">cancel</span>
                      Avoid Doing This
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-3">
                      <li className="flex gap-2"><span>&bull;</span> Never store cylinders in basements.</li>
                      <li className="flex gap-2"><span>&bull;</span> Do not store near heat sources.</li>
                      <li className="flex gap-2"><span>&bull;</span> Never store more than you need.</li>
                      <li className="flex gap-2"><span>&bull;</span> Do not drop or roughly handle cylinders.</li>
                    </ul>
                  </div>
                </div>
              </FadeInView>

              {/* Child Safety */}
              <FadeInView id="child-safety">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-[#0EA5E9] text-3xl">child_care</span>
                  <h2 className="text-2xl font-bold text-white">Child Safety</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-stretch bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                  <div 
                    className="w-full md:w-2/5 h-48 md:h-auto min-h-[250px] bg-center bg-cover" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBnQcpcKPAB7Yc9UeJGM1RIK35i7WhJYiBfF_0f0OgOV1xwKc4rs3QjQip12eVPKCnvd91PqBP4DiHX4awtNPPNE6A9Cw6IciDwxk-XX3FalZZbrwM5UpCp9_ghpC9SvXuQ47yVHgzHnMH74q83gxQS4_Lvn4xRE9xYj8OehJLmyHpO9klWTjkgaVhtYKJ8oQBvylCeqVHK3c7epQJkm7MbPxUUaAED12sqaMQUYTomqzst5xHLtB6chcAC8GKN5U4F6Gjw7-SOWg")' }}
                  ></div>
                  <div className="p-8 md:w-3/5 flex flex-col justify-center">
                    <p className="text-[#0EA5E9] mb-6 italic text-lg opacity-90">"Curiosity can be dangerous around gas appliances."</p>
                    <ul className="text-sm text-gray-300 space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-[#0EA5E9] text-base mt-0.5">verified_user</span>
                        Install safety knobs or covers on stove controls.
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-[#0EA5E9] text-base mt-0.5">school</span>
                        Teach children that gas appliances are not toys.
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-[#0EA5E9] text-base mt-0.5">visibility</span>
                        Always supervise children when appliances are in use.
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeInView>
            </div>

            {/* Sidebar: Emergency Procedures */}
            <aside className="md:col-span-4" id="emergency">
              <FadeInView delay={0.2}>
                <div className="sticky top-28 space-y-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 shadow-2xl shadow-red-500/5 ring-1 ring-red-500/10 hover:border-red-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-6 text-red-500">
                      <span className="material-symbols-outlined font-black text-4xl">emergency</span>
                      <h3 className="text-2xl font-black uppercase tracking-tight">Emergency!</h3>
                    </div>
                    <p className="text-white font-bold mb-6">If you smell gas or suspect a serious leak:</p>
                    <ol className="space-y-4 text-sm text-gray-300 list-decimal pl-4">
                      <li><strong className="text-white">No Open Flames:</strong> Do not light matches.</li>
                      <li><strong className="text-white">No Electricity:</strong> Do not turn switches ON or OFF.</li>
                      <li><strong className="text-white">Shut Off:</strong> Turn off the main valve if safe.</li>
                      <li><strong className="text-white">Ventilate:</strong> Open all doors and windows.</li>
                      <li><strong className="text-white">Evacuate:</strong> Get everyone out immediately.</li>
                      <li><strong className="text-white">Call Us:</strong> Contact us from a safe distance.</li>
                    </ol>
                    <Link href="tel:0800SAFEGAS" className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition-all shadow-lg shadow-red-500/30">
                      <span className="material-symbols-outlined">call</span>
                      0800-SAFE-GAS
                    </Link>
                  </div>

                  <div className="bg-[#11151C] border border-white/5 rounded-3xl p-8 shadow-xl">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-white text-lg">
                      <span className="material-symbols-outlined text-[#0EA5E9] text-2xl">support_agent</span>
                      Need Assistance?
                    </h4>
                    <p className="text-sm text-gray-400 mb-6">Our safety experts are available 24/7 for consultations and appliance checks.</p>
                    <button className="w-full py-3 bg-white/5 hover:bg-[#0EA5E9] border border-white/10 hover:border-[#0EA5E9] text-white font-bold rounded-xl transition-all shadow-lg">
                      Book Safety Check
                    </button>
                  </div>
                </div>
              </FadeInView>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
