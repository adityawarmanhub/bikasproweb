import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  CheckCircle, 
  ArrowRight,
  Instagram,
  Linkedin,
  Printer,
  Megaphone,
  Store,
  Coffee,
  Shirt,
  Smartphone,
  CreditCard,
  PenTool,
  Image as ImageIcon,
  Box,
  Briefcase,
  Star
} from 'lucide-react';

// --- DATA & CONTENT ASSETS ---

const COMPANY_INFO = {
  name: "BIKASPRO",
  fullName: "BintangKasa Produksi",
  tagline: "Mitra Strategis Branding & Merchandise Korporat",
  phone: "+6281234567890", 
  waLink: "https://wa.me/6281234567890", 
  email: "hello@bikaspro.com",
  address: "Jl. TB Simatupang No. 88, Jakarta Selatan, DKI Jakarta 12560"
};

const PACKAGES = [
  {
    id: 1,
    tier: "Tier 1: Mass Impact",
    name: "Seminar Starter Kit",
    priceCategory: "Budget: Ekonomis & Efisien", 
    description: "Solusi ekonomis untuk event skala besar, seminar, atau roadshow kampus.",
    items: ["Tote Bag Blacu / Spunbond", "Lanyard Tisu Custom", "Block Note A6", "Pulpen Custom"],
    recommendedFor: "Seminar, Job Fair, Komunitas",
    color: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    tier: "Tier 2: Professional",
    name: "New Employee Kit",
    priceCategory: "Budget: Standard Corporate", 
    description: "Paket paling laris (Best Seller) untuk menyambut karyawan baru.",
    items: ["Hardbox Corrugated + Sticker", "Tumbler Vacuum (Tahan Panas/Dingin)", "Agenda Hardcover PU Leather", "Kaos Cotton Combed 30s"],
    recommendedFor: "Onboarding Karyawan, Townhall",
    color: "bg-slate-50",
    borderColor: "border-slate-300",
    featured: true
  },
  {
    id: 3,
    tier: "Tier 3: Executive",
    name: "VIP Signature Hampers",
    priceCategory: "Budget: Premium / High-End", 
    description: "Kemewahan untuk klien prioritas dan jajaran direksi.",
    items: ["Rigid Hardbox Magnet + Foam", "Tumbler Japan Style (Powder Coat)", "E-Money/Flazz Custom UV Print", "Powerbank 10.000mAh", "Kartu Ucapan Premium"],
    recommendedFor: "Klien VIP, Speaker Gift, Direksi",
    color: "bg-amber-50",
    borderColor: "border-amber-200"
  }
];

const CATALOG_CATEGORIES = [
  { id: 'drinkware', name: 'Tumbler & Drinkware' },
  { id: 'apparel', name: 'Seragam & Apparel' },
  { id: 'printing', name: 'Digital & Offset Print' },
  { id: 'advertising', name: 'Advertising & Signage' },
  { id: 'booth', name: 'Booth & Event Desk' },
  { id: 'packaging', name: 'Packaging & Box' },
  { id: 'stationary', name: 'Stationery & Notebook' },
  { id: 'tech', name: 'Gadget & Tech' },
  { id: 'lanyard', name: 'Lanyard & ID Card' },
];

// UPDATED: Added 'imageFile' property matching the prompted filenames
const CATALOG_ITEMS = [
  // Drinkware
  { id: 1, category: 'drinkware', name: 'Tumbler Niagara 500ml', desc: 'Stainless Steel SUS 304, Tahan 12 Jam', imageType: 'bottle', imageFile: 'product_tumbler_niagara.jpg' },
  { id: 2, category: 'drinkware', name: 'Mug Keramik Custom', desc: 'Decal Print High Quality, Microwave Safe', imageType: 'mug', imageFile: 'product_mug_custom.jpg' },
  
  // Printing
  { id: 9, category: 'printing', name: 'Kartu Nama Eksekutif', desc: 'Bahan Art Carton / Fancy Paper + Laminasi Doff/Glossy', imageType: 'card', imageFile: 'product_business_card.jpg' },
  { id: 10, category: 'printing', name: 'Roll Up Banner 60x160', desc: 'Rangka Alumunium Kokoh, Bahan Albatros High Res', imageType: 'print', imageFile: 'product_rollup_banner.jpg' },
  { id: 13, category: 'printing', name: 'Stiker Label Die-Cut', desc: 'Vinyl / Chromo, Kiss Cut Sheet A3, Tahan Air', imageType: 'print', imageFile: 'product_sticker_diecut.jpg' },
  { id: 14, category: 'printing', name: 'Company Profile Book', desc: 'Jilid Spiral / Perfect Binding, Full Color Art Paper', imageType: 'book', imageFile: 'product_company_profile.jpg' },
  { id: 15, category: 'printing', name: 'ID Card PVC (Kartu Pegawai)', desc: 'Bahan PVC Tebal (Seperti ATM), Print 2 Sisi', imageType: 'card', imageFile: 'product_id_card.jpg' },

  // Advertising
  { id: 17, category: 'advertising', name: 'Neon Box Acrylic Custom', desc: 'LED Luminous, Cutting Sticker/UV, Frame Alumunium', imageType: 'sign', imageFile: 'product_neon_box.jpg' },
  { id: 18, category: 'advertising', name: 'Huruf Timbul (3D Lettering)', desc: 'Bahan Stainless/Galvanis/Acrylic, Lampu LED Belakang (Backlight)', imageType: 'sign', imageFile: 'product_3d_lettering.jpg' },
  { id: 19, category: 'advertising', name: 'Car Branding / Wrapping', desc: 'Stiker Mobil Operasional Full Body / Partial', imageType: 'car', imageFile: 'product_car_branding.jpg' },

  // Booth
  { id: 20, category: 'booth', name: 'Event Desk Portable (PVC)', desc: 'Meja Promosi Bongkar Pasang, Ringan, Full Branding Stiker', imageType: 'booth', imageFile: 'product_event_desk.jpg' },
  { id: 21, category: 'booth', name: 'Backwall / Backdrop Portable', desc: 'Spider System (Lurus/Lengkung), Include Trolley Case & Lampu', imageType: 'booth', imageFile: 'product_backwall_display.jpg' },
  { id: 22, category: 'booth', name: 'Pop-Up Counter Table', desc: 'Meja Pameran Premium, Sistem Magnet, Top Table Kayu/Hitam', imageType: 'booth', imageFile: 'product_popup_table.jpg' },

  // Packaging
  { id: 11, category: 'packaging', name: 'Hardbox Custom Magnet', desc: 'Board No. 30, Full Color Cover + Custom Foam Insert', imageType: 'box', imageFile: 'product_hardbox_gift.jpg' },
  { id: 12, category: 'packaging', name: 'Paper Bag Premium', desc: 'Bahan Art Carton 260gr, Laminasi, Tali Kur/Pita', imageType: 'bag', imageFile: 'product_paperbag.jpg' },
  { id: 16, category: 'packaging', name: 'Corrugated Box Mailer', desc: 'Dus E-Flute Die Cut, Sablon Logo 1 Warna', imageType: 'box', imageFile: 'product_corrugated_box.jpg' },

  // Stationary
  { id: 3, category: 'stationary', name: 'Notebook Hardcover A5', desc: 'PU Leather, Deboss Logo, Tali Karet', imageType: 'notebook', imageFile: 'product_notebook_leather.jpg' },
  { id: 4, category: 'stationary', name: 'Pulpen Metal Executive', desc: 'Laser Engraved Logo, Heavy Weight', imageType: 'pen', imageFile: 'product_pen_metal.jpg' },
  
  // Apparel
  { id: 5, category: 'apparel', name: 'Polo Shirt Lacoste', desc: 'Bordir Komputer Presisi, Bahan Pique Cotton', imageType: 'shirt', imageFile: 'product_polo_shirt.jpg' },
  { id: 6, category: 'apparel', name: 'Coach Jacket Parasut', desc: 'Sablon DTF / Bordir, Windbreaker Material', imageType: 'shirt', imageFile: 'product_jacket_coach.jpg' },
  
  // Tech
  { id: 7, category: 'tech', name: 'Powerbank 10.000mAh', desc: 'Slim Design, UV Print Full Color', imageType: 'tech', imageFile: 'product_powerbank.jpg' },
  
  // Lanyard
  { id: 8, category: 'lanyard', name: 'Lanyard Tisu 2cm', desc: 'Full Color Sublimation + Stopper + Kait Besi', imageType: 'lanyard', imageFile: 'product_lanyard_detail.jpg' },
];

// --- HELPER COMPONENT: SMART IMAGE LOADER ---
// Komponen ini akan mencoba load gambar JPG dulu.
// Jika gambar tidak ditemukan (error), dia akan fallback ke Placeholder Icon.
const SmartImage = ({ src, type, alt, className }) => {
  const [imgError, setImgError] = useState(false);

  // Fallback Icon Logic
  const getIcon = () => {
    switch (type) {
      case 'bottle': return <Coffee size={40} />;
      case 'mug': return <Coffee size={40} />;
      case 'shirt': return <Shirt size={40} />;
      case 'tech': return <Smartphone size={40} />;
      case 'card': return <CreditCard size={40} />;
      case 'print': return <Printer size={40} />;
      case 'sign': return <Megaphone size={40} />;
      case 'booth': return <Store size={40} />;
      case 'box': return <Box size={40} />;
      case 'bag': return <Box size={40} />;
      case 'notebook': return <PenTool size={40} />;
      case 'pen': return <PenTool size={40} />;
      case 'hero': return <ImageIcon size={64} />;
      case 'about': return <Users size={64} />;
      default: return <Box size={40} />;
    }
  };

  if (imgError || !src) {
    return (
      <div className={`bg-slate-200 flex flex-col items-center justify-center text-slate-400 ${className}`}>
        {getIcon()}
        {/* Helper text only shown when image fails */}
        <span className="mt-2 text-[10px] uppercase tracking-widest opacity-50">Image Not Found</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={`object-cover w-full h-full ${className}`}
      onError={() => setImgError(true)}
    />
  );
};

// --- COMPONENTS ---

const WhatsAppButton = () => (
  <a 
    href={`${COMPANY_INFO.waLink}?text=Halo%20Tim%20BIKASPRO,%20saya%20ingin%20diskusi%20tentang%20pembuatan%20merchandise.`}
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 group"
    aria-label="Chat WhatsApp"
  >
    <Phone className="w-6 h-6 fill-current" />
    <span className="hidden group-hover:inline-block font-semibold">Hubungi Kami</span>
  </a>
);

const Navbar = ({ activePage, setPage, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', id: 'home' },
    { name: 'Katalog Produk', id: 'catalog' },
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Kontak', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900 shadow-xl py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Reverted to "B" Box as requested */}
        <div 
          onClick={() => setPage('home')} 
          className="cursor-pointer flex items-center gap-2 text-white font-bold text-2xl tracking-tighter"
        >
          <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-slate-900 font-bold">B</div>
          BIKASPRO
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-sm font-medium transition-colors ${
                activePage === link.id 
                  ? 'text-amber-400' 
                  : isScrolled ? 'text-slate-300 hover:text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <a 
            href={COMPANY_INFO.waLink} 
            target="_blank"
            rel="noreferrer"
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2 rounded-md font-bold text-sm transition-transform hover:-translate-y-0.5"
          >
            Minta Penawaran
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setPage(link.id); setIsOpen(false); }}
              className={`text-left text-lg font-medium ${activePage === link.id ? 'text-amber-400' : 'text-slate-300'}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-2xl font-bold text-white mb-4">BIKASPRO</h3>
        <p className="mb-6 max-w-md text-slate-400">
          Vendor merchandise dan souvenir korporat terpercaya di Jakarta. Kami membantu brand Anda tampil profesional melalui produk berkualitas tinggi dan layanan yang personal.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Navigasi</h4>
        <ul className="space-y-3">
          <li><button onClick={() => setPage('home')} className="hover:text-amber-400 transition-colors">Beranda</button></li>
          <li><button onClick={() => setPage('catalog')} className="hover:text-amber-400 transition-colors">Katalog Produk</button></li>
          <li><button onClick={() => setPage('about')} className="hover:text-amber-400 transition-colors">Tentang Kami</button></li>
          <li><button onClick={() => setPage('contact')} className="hover:text-amber-400 transition-colors">Hubungi Kami</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Kontak</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <MapPin className="shrink-0 text-amber-500" size={18} />
            <span>{COMPANY_INFO.address}</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="shrink-0 text-amber-500" size={18} />
            <span>{COMPANY_INFO.phone}</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="shrink-0 text-amber-500" size={18} />
            <span>{COMPANY_INFO.email}</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-6 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
      &copy; {new Date().getFullYear()} {COMPANY_INFO.fullName}. All Rights Reserved.
    </div>
  </footer>
);

// --- PAGES ---

const HomePage = ({ setPage }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <header className="relative bg-slate-900 text-white min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-800/30 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold mb-6 border border-amber-500/30">
            #1 Corporate Merchandise Solution
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Tingkatkan Citra Brand Anda dengan <span className="text-amber-500">Merchandise Premium.</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
            Solusi souvenir kantor, seminar kit, advertising, dan kebutuhan event booth berkualitas tinggi. Terkurasi, Tepat Waktu, dan Sesuai Budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setPage('catalog')}
              className="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
            >
              Lihat Katalog <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setPage('about')}
              className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Tentang Kami
            </button>
          </div>
        </div>
        
        {/* HERO IMAGE */}
        <div className="relative hidden md:block animate-fade-in-up">
           <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/50 h-[500px]">
             {/* Uses SmartImage to try loading the JPG, fallback to placeholder */}
             <SmartImage 
                src="/images/hero_banner_corporate_merchandise.jpg"
                type="hero" 
                alt="Corporate Merchandise Banner"
                className="w-full h-full bg-slate-800" 
             />
             
             {/* Floating Badge */}
             <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-900">
                     <Star size={20} fill="currentColor" />
                   </div>
                   <div>
                     <div className="text-white font-bold text-sm">Premium Finish</div>
                     <div className="text-slate-300 text-xs">Garansi Kualitas</div>
                   </div>
                </div>
             </div>
           </div>
           
           {/* Decorative dots behind */}
           <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-amber-500/30 rounded-2xl -z-10"></div>
        </div>
      </div>
    </header>

    {/* Trusted Stats */}
    <section className="bg-white py-12 border-b border-slate-100">
       <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Klien Puas", val: "50+" },
            { label: "Project Selesai", val: "100+" },
            { label: "Opsi Produk", val: "500+" },
            { label: "Jangkauan Kirim", val: "5+ Kota Besar" }
          ].map((stat, idx) => (
             <div key={idx}>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.val}</div>
                <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
             </div>
          ))}
       </div>
    </section>

    {/* Why Us Section */}
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Kenapa Memilih <span className="text-amber-600">BIKASPRO?</span></h2>
          <p className="text-slate-600">
            Kami paham tantangan Procurement & HR. Kami hadir untuk mempermudah proses pengadaan merchandise dan cetak korporat Anda.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Briefcase className="w-8 h-8 text-blue-600" />, title: "Kurasi Profesional", desc: "Kami tidak menjual barang murahan. Semua produk dikurasi agar layak merepresentasikan brand Anda." },
            { icon: <Printer className="w-8 h-8 text-green-600" />, title: "Production Quality", desc: "Sistem QC berlapis untuk hasil cetak presisi. Warna akurat, potongan rapi, dan material sesuai spesifikasi." },
            { icon: <Box className="w-8 h-8 text-amber-600" />, title: "Solusi All-in-One", desc: "Dari desain, produksi merchandise, advertising, booth hingga packaging. Anda terima beres." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="mb-6 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Bundles */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Rekomendasi Paket</h2>
            <p className="text-slate-600">Paling sering dipesan oleh perusahaan di Indonesia.</p>
          </div>
          <button onClick={() => setPage('catalog')} className="text-amber-600 font-bold flex items-center gap-2 hover:gap-4 transition-all mt-4 md:mt-0">
            Lihat Semua Produk <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`relative rounded-2xl overflow-hidden border ${pkg.borderColor} flex flex-col`}>
              {pkg.featured && (
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                  BEST SELLER
                </div>
              )}
              <div className={`p-8 ${pkg.color} border-b ${pkg.borderColor}`}>
                <div className="text-sm font-bold text-slate-500 mb-1">{pkg.tier}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{pkg.name}</h3>
                <div className="text-lg font-bold text-amber-600 mb-1">{pkg.priceCategory}</div>
                <div className="text-xs text-slate-500">*Harga menyesuaikan Qty & Desain</div>
              </div>
              <div className="p-8 bg-white flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 text-sm italic">"{pkg.description}"</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`${COMPANY_INFO.waLink}?text=Halo,%20saya%20tertarik%20diskusi%20paket%20${pkg.name}%20untuk%20perusahaan%20saya.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg text-center hover:bg-slate-900 hover:text-white transition-colors"
                >
                  Konsultasi Paket Ini
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Butuh Konsultasi Gratis?</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
          Jangan ragu untuk diskusi budget dan deadline. Tim kami siap membantu memberikan solusi terbaik untuk event Anda.
        </p>
        <a 
          href={COMPANY_INFO.waLink} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
        >
          <Phone size={20} />
          Hubungi WhatsApp Sekarang
        </a>
      </div>
    </section>
  </div>
);

const CatalogPage = () => {
  const [activeCat, setActiveCat] = useState('all');

  const filteredItems = activeCat === 'all' 
    ? CATALOG_ITEMS 
    : CATALOG_ITEMS.filter(item => item.category === activeCat);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Katalog Produk</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Jelajahi pilihan produk merchandise dan solusi cetak berkualitas kami. Semua item dapat di-custom dengan logo perusahaan Anda.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            onClick={() => setActiveCat('all')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCat === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-200'}`}
          >
            Semua
          </button>
          {CATALOG_CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCat === cat.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
              {/* Image Placeholder with Zoom Effect */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  {/* Updated to use SmartImage with the filename */}
                  <SmartImage 
                    src={`/images/${item.imageFile}`}
                    type={item.imageType} 
                    alt={item.name}
                    className="w-full h-full bg-slate-200"
                  />
                </div>
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                  {CATALOG_CATEGORIES.find(c => c.id === item.category)?.name.split(' ')[0]}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-2 leading-tight">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{item.desc}</p>
                <a 
                   href={`${COMPANY_INFO.waLink}?text=Saya%20tertarik%20quote%20untuk%20produk:%20${item.name}`}
                   target="_blank"
                   rel="noreferrer"
                   className="w-full block text-center py-2 rounded border border-slate-200 text-slate-600 text-sm font-bold hover:border-amber-500 hover:text-amber-600 transition-colors"
                >
                  Minta Harga
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-24 pb-20 bg-white min-h-screen animate-fade-in">
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tentang <span className="text-amber-600">BIKASPRO</span></h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Mitra Strategis Branding & Merchandise Korporat Anda.
        </p>
      </div>

      {/* ABOUT IMAGE */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[400px]">
         <SmartImage 
           src="/images/about_production_warehouse.jpg"
           type="about" 
           alt="Gudang Produksi BIKASPRO"
           className="w-full h-full bg-slate-100" 
         />
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Cerita Kami</h2>
          <p>
            BIKASPRO (BintangKasa Produksi) lahir dari satu pemahaman sederhana: Dalam dunia bisnis, merchandise bukan sekadar barang—itu adalah representasi citra perusahaan Anda.
          </p>
          <p>
            Kami memahami tantangan yang dihadapi tim Procurement dan HR: deadline yang ketat, vendor yang sulit dihubungi, dan kualitas barang yang tidak konsisten. BIKASPRO hadir untuk memutus rantai masalah tersebut.
          </p>
          <p>
            Kami bukan sekadar vendor pencetak logo. Kami adalah konsultan produksi yang membantu Anda menavigasi ribuan opsi produk untuk menemukan solusi yang paling tepat sasaran, tepat budget, dan tepat waktu. Mulai dari Onboarding Kit untuk menyambut talenta baru, hingga Exclusive Hampers untuk klien VIP, BIKASPRO memastikan brand Anda tampil berkelas.
          </p>
        </section>

        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100 my-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
              <div>
                <strong className="block text-slate-900 mb-1">Curated Selection</strong>
                <span className="text-sm">Kami menyeleksi material terbaik agar souvenir Anda layak disimpan dan dipakai.</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
              <div>
                <strong className="block text-slate-900 mb-1">End-to-End Solution</strong>
                <span className="text-sm">Dari konsep desain, produksi, hardbox packaging, hingga pengiriman.</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
              <div>
                <strong className="block text-slate-900 mb-1">Quality Control Berlapis</strong>
                <span className="text-sm">Memastikan tidak ada logo miring atau barang cacat yang sampai ke klien Anda.</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
              <div>
                <strong className="block text-slate-900 mb-1">Corporate Integrity</strong>
                <span className="text-sm">Transparansi harga dan ketepatan waktu adalah prioritas kami.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-l-4 border-amber-500 pl-6 py-2 italic text-slate-600 bg-amber-50/50 rounded-r-lg">
          "Saya membangun BIKASPRO dengan visi untuk menaikkan standar industri souvenir di Indonesia. Fokus kami bukan hanya menjual produk, tapi memberikan peace of mind (rasa tenang) bagi Anda saat mempersiapkan event penting perusahaan."
          <div className="mt-4 font-bold text-slate-900 not-italic">— Founder BIKASPRO</div>
        </section>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-24 pb-20 bg-slate-50 min-h-screen animate-fade-in">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Contact Info Sidebar */}
        <div className="bg-slate-900 text-white p-12 md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
            <p className="text-slate-300 mb-8">
              Siap membuat merchandise yang memukau? Isi formulir atau hubungi kami langsung.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Alamat Studio</h4>
                  <p className="text-slate-400 text-sm">{COMPANY_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">WhatsApp / Telepon</h4>
                  <p className="text-slate-400 text-sm">{COMPANY_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-slate-400 text-sm">{COMPANY_INFO.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h4 className="font-bold mb-4">Jam Operasional</h4>
            <p className="text-slate-400 text-sm">Senin - Jumat: 09.00 - 17.00 WIB</p>
            <p className="text-slate-400 text-sm">Sabtu - Minggu: Tutup (By Appointment)</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-12 md:w-3/5 bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Minta Penawaran</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Budi Santoso" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Perusahaan</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="PT Maju Mundur" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WhatsApp</label>
              <input type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0812..." />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Jenis Kebutuhan</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                <option>Pilih Kategori...</option>
                <option>Seminar Kit (Mass)</option>
                <option>Onboarding Kit (Karyawan)</option>
                <option>VIP Hampers</option>
                <option>Advertising / Neon Box</option>
                <option>Booth / Event Desk</option>
                <option>Custom Merchandise Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Pesan / Detail Request</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Saya butuh 100 pcs tumbler untuk event bulan depan..." />
            </div>

            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Mail size={18} />
              Kirim Permintaan
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Tim kami akan menghubungi Anda via WhatsApp dalam waktu maksimal 24 jam.
            </p>
          </form>
        </div>

      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage setPage={setActivePage} />;
      case 'catalog': return <CatalogPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen flex flex-col">
      <Navbar activePage={activePage} setPage={setActivePage} isScrolled={isScrolled} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={setActivePage} />
      <WhatsAppButton />
    </div>
  );
};

export default App;