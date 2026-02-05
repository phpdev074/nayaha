
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Shield, Lock, Scale, ExternalLink } from 'lucide-react';

const NayahaCorporate = () => {
  // --- State Management ---
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [newsFilter, setNewsFilter] = useState('all');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newsModalContent, setNewsModalContent] = useState<{ title: string; date: string } | null>(null);

  // --- Handlers ---
  const handleNav = (section: string) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openNewsModal = (title: string, date: string) => {
    setNewsModalContent({ title, date });
    setActiveModal('news');
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   showToast("Message routed to department.");
  //   (e.target as HTMLFormElement).reset();
  // };

  const handleVulnReport = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal(null);
    setTimeout(() => showToast("Report submitted encrypted."), 300);
    (e.target as HTMLFormElement).reset();
  };

  // --- Data & Content ---
  const newsItems = [
    { id: 1, category: 'compliance', date: 'JAN 15, 2026', title: 'Privacy Policy Updated for DPDP Act', snippet: 'We have revised our data handling frameworks to align with the latest Digital Personal Data Protection guidelines...' },
    { id: 2, category: 'partnership', date: 'DEC 10, 2025', title: 'Nayaha Partners with SecurePay', snippet: 'Strategic partnership to enhance transaction reliability across the Duezaro platform...' },
    { id: 3, category: 'company', date: 'NOV 01, 2025', title: 'Annual General Meeting Results', snippet: 'Shareholders approved the roadmap for FY26 focusing on scalable fintech infrastructure...' },
  ];

  const filteredNews = newsFilter === 'all' ? newsItems : newsItems.filter(item => item.category === newsFilter);

  return (
    <div className="app-container">
      {/* --- CSS STYLES --- 
          Injected here to preserve the exact prototype look and variables 
      */}
      <style>{`
        :root {
            --bg-body: #F9F9F7;
            --bg-surface: #FFFFFF;
            --text-main: #1A1A1A;
            --text-muted: #666666;
            --accent-gold: #C5A065;
            --accent-gold-dark: #A08045;
            --border-light: #E5E5E5;
            --radius-sm: 4px;
            --radius-md: 8px;
            --radius-lg: 16px;
            --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
            --shadow-card: 0 4px 12px rgba(0,0,0,0.06);
            --header-height: 80px;
            --container-width: 1200px;
            --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        * { box-sizing: border-box; }
        
        body, .app-container {
            font-family: var(--font-main);
            background-color: var(--bg-body);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Container */
        .container {
            width: 100%;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 24px;
        }

        /* Header */
        header {
            height: var(--header-height);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-light);
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
        }

        .header-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .logo { font-weight: 800; font-size: 24px; letter-spacing: -0.03em; cursor: pointer; }
        .logo span { color: var(--accent-gold); }

        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        .nav-link {
            text-decoration: none; color: var(--text-main); font-size: 14px; font-weight: 500;
            text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; position: relative;
        }
        .nav-link:hover, .nav-link.active { color: var(--accent-gold); }
        .nav-link.active::after {
            content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 2px; background: var(--accent-gold);
        }

        /* Mobile Nav */
        .nav-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--text-main); }
        .mobile-menu {
            position: fixed; top: var(--header-height); left: 0; width: 100%; height: 0;
            background: var(--bg-surface); overflow: hidden; transition: height 0.3s ease; z-index: 999;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .mobile-menu.open { height: calc(100vh - var(--header-height)); }
        .mobile-link { display: block; padding: 16px 20px; font-size: 18px; font-weight: 500; border-bottom: 1px solid var(--border-light); cursor: pointer; }

        @media (max-width: 900px) {
            .desktop-nav { display: none; }
            .nav-toggle { display: block; }
        }

        /* Buttons */
        .btn {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 12px 28px; border-radius: var(--radius-sm); font-weight: 600; font-size: 14px;
            cursor: pointer; border: none; transition: all 0.2s; letter-spacing: 0.02em;
        }
        .btn-primary { background: var(--text-main); color: #fff; }
        .btn-primary:hover { background: #333; transform: translateY(-1px); }
        .btn-outline { background: transparent; border: 1px solid var(--text-main); color: var(--text-main); }
        .btn-gold { background: var(--accent-gold); color: #fff; }
        .btn-gold:hover { background: var(--accent-gold-dark); transform: translateY(-1px); }
        .btn-sm { padding: 8px 16px; font-size: 12px; }
        .btn-full { width: 100%; }

        /* Sections */
        section { padding: 40px 0; animation: fadeIn 0.4s ease; min-height: 60vh; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Hero */
        .hero-card {
            background: var(--bg-surface); padding: 80px 40px; border-radius: var(--radius-lg);
            text-align: center; box-shadow: var(--shadow-sm); margin-bottom: 40px;
            border: 1px solid var(--border-light); max-width: 900px; margin-left: auto; margin-right: auto;
        }
        h1 { font-size: 42px; line-height: 1.1; margin-bottom: 20px; letter-spacing: -1px; }
        .hero-text { font-size: 18px; max-width: 600px; margin: 0 auto 30px; color: var(--text-muted); }
        .accent-text { color: var(--accent-gold); font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; margin-bottom: 16px; display: block; }

        /* Grid & Cards */
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
        @media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr; } }

        .feature-box {
            background: #fff; padding: 32px 24px; border-radius: var(--radius-md); text-align: center;
            box-shadow: var(--shadow-sm); border: 1px solid var(--border-light); cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .feature-box:hover { transform: translateY(-5px); box-shadow: var(--shadow-card); }
        .feature-icon { font-size: 32px; margin-bottom: 16px; display: block; color: var(--accent-gold); }

        .detail-card { background: #fff; border-radius: var(--radius-md); padding: 24px; border: 1px solid var(--border-light); }
        .detail-row { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border-light); font-size: 15px; }
        
        /* Brand Card */
        .brand-card {
            background: var(--text-main); color: #fff; padding: 40px; border-radius: var(--radius-lg);
            position: relative; overflow: hidden; margin-bottom: 24px; display: flex; flex-direction: column;
        }
        .brand-card::after {
            content: ''; position: absolute; top: -20%; right: -10%; width: 400px; height: 400px;
            background: radial-gradient(circle, rgba(197,160,101,0.15) 0%, rgba(0,0,0,0) 70%); pointer-events: none;
        }
        .brand-header { width: 100%; display: flex; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; }
        .brand-logo { font-size: 32px; font-weight: 800; letter-spacing: 0.1em; }
        
        /* Status Badges */
        .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-left: 12px; }
        .status-active { background: #E6F4EA; color: #1E8E3E; }
        .status-planned { background: #FCE8E6; color: #C5221F; }
        .status-progress { background: #FFF7E0; color: #B06000; }

        /* Accordion */
        .accordion-item { background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 16px; overflow: hidden; }
        .accordion-header { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; background: #fff; }
        .accordion-header:hover { background: #fafafa; }
        .accordion-body { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; background: #FAFAFA; }
        .accordion-body.open { max-height: 300px; }
        .accordion-content { padding: 24px; font-size: 15px; color: var(--text-muted); border-top: 1px solid #eee; line-height: 1.6; }
        
        /* News */
        .news-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .news-card {
            background: #fff; padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-light);
            cursor: pointer; transition: transform 0.2s; display: flex; flex-direction: column; height: 100%;
        }
        .news-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-sm); }
        .filter-chip { padding: 8px 16px; background: #fff; border: 1px solid var(--border-light); border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; margin-right: 10px; }
        .filter-chip.active { background: var(--text-main); color: #fff; border-color: var(--text-main); }

        /* Forms */
        .form-container { max-width: 600px; margin: 0 auto; background: #fff; padding: 40px; border-radius: var(--radius-lg); border: 1px solid var(--border-light); }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; }
        .form-input, .form-select, .form-textarea { width: 100%; padding: 14px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); font-size: 15px; }
        .form-input:focus { border-color: var(--accent-gold); outline: none; }

        /* Footer */
        footer { background: var(--text-main); color: #fff; padding: 60px 0 40px; margin-top: auto; font-size: 14px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .footer-link { display: block; color: #aaa; text-decoration: none; margin-bottom: 10px; }
        .footer-link:hover { color: #fff; }

        /* Modals */
        .modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
            z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
        }
        .modal-overlay.active { opacity: 1; pointer-events: auto; }
        .modal-container {
            background: #fff; width: 100%; max-width: 600px; border-radius: var(--radius-lg); padding: 40px;
            max-height: 90vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-overlay.active .modal-container { transform: translateY(0); }

        /* Toast */
        .toast {
            position: fixed; bottom: 40px; right: 40px; background: #323232; color: #fff; padding: 16px 32px;
            border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; opacity: 0; transform: translateY(20px);
            transition: all 0.3s; z-index: 3000; pointer-events: none;
        }
        .toast.visible { opacity: 1; transform: translateY(0); }


        .corporate-wrapper {
  padding: 60px 20px;
  background: #fafafa;
}

.corporate-card {
  max-width: 1100px;
  margin: auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 70px 60px;
  box-shadow: 0 0 0 1px #eee;
  text-align: center;
}

.accent {
  display: block;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  color: #c9a24d;
  margin-bottom: 12px;
}

.heading {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 14px;
}

.subheading {
  font-size: 16px;
  color: #666;
  max-width: 620px;
  margin: 0 auto 50px;
  line-height: 1.6;
}

.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.info-card {
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 34px 28px;
  background: #fff;
}

.info-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.email {
  color: #c9a24d;
  font-weight: 600;
  margin-bottom: 10px;
}

.text {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.divider {
  height: 1px;
  background: #eaeaea;
  margin: 60px 0 40px;
}

.office {
  font-size: 14px;
  color: #444;
  line-height: 1.8;
}

.office strong {
  display: block;
  margin-bottom: 6px;
}

.note {
  margin-top: 16px;
  font-size: 13px;
  color: #777;
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .corporate-card {
    padding: 50px 24px;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .heading {
    font-size: 34px;
  }
}

      `}</style>

      {/* --- HEADER --- */}
      <header>
        <div className="container header-inner">
          <div className="logo" onClick={() => handleNav('home')}>
            NAYAHA<span>.</span>
          </div>

          <nav className="desktop-nav">
            {['home', 'about', 'brands', 'governance', 'compliance', 'careers'].map((item) => (
              <span 
                key={item} 
                className={`nav-link ${currentSection === item ? 'active' : ''}`}
                onClick={() => handleNav(item)}
              >
                {item}
              </span>
            ))}
            <button className="btn btn-primary btn-sm" onClick={() => handleNav('contact')}>
              Corporate Contact
            </button>
          </nav>

          <button className="nav-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* --- MOBILE MENU --- */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['home', 'about', 'brands', 'governance', 'compliance', 'security', 'careers', 'news'].map((item) => (
            <li key={item} className="mobile-link" onClick={() => handleNav(item)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
        <div style={{ padding: 20 }}>
          <button className="btn btn-primary btn-full" onClick={() => handleNav('contact')}>Corporate Contact</button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main style={{ flex: 1, paddingBottom: 60 }}>

        {/* --- HOME SECTION --- */}
        {currentSection === 'home' && (
          <section>
            <div className="container">
              <div className="hero-card">
                <span className="accent-text">Corporate Holding</span>
                <h1>NAYAHA INDIA TECHNO PVT LTD</h1>
                <p className="hero-text">A privately incorporated Indian technology holding company. Building responsible, secure, and compliance-first technology platforms.</p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={() => handleNav('brands')}>View Portfolio</button>
                  <button className="btn btn-outline" onClick={() => handleNav('governance')}>Governance Profile</button>
                </div>
              </div>

              <div className="grid-3">
                <div className="feature-box" onClick={() => handleNav('governance')}>
                  <span className="feature-icon"><Scale size={32} /></span>
                  <div className="feature-title">Governance</div>
                  <p style={{ marginTop: 8, color: '#666', fontSize: 14 }}>Transparent leadership and clear legal frameworks.</p>
                </div>
                <div className="feature-box" onClick={() => handleNav('compliance')}>
                  <span className="feature-icon"><Shield size={32} /></span>
                  <div className="feature-title">Compliance</div>
                  <p style={{ marginTop: 8, color: '#666', fontSize: 14 }}>TRAI DLT, DPDP Act, and Banking regulations.</p>
                </div>
                <div className="feature-box" onClick={() => handleNav('security')}>
                  <span className="feature-icon"><Lock size={32} /></span>
                  <div className="feature-title">Security</div>
                  <p style={{ marginTop: 8, color: '#666', fontSize: 14 }}>MFA enforcement and immutable audit logs.</p>
                </div>
              </div>

              <div style={{ background: '#fff', padding: 40, borderRadius: 8, border: '1px solid #E5E5E5', textAlign: 'center' }}>
                <span className="accent-text">Strategic Focus</span>
                <h3 style={{ marginBottom: 24, fontSize: 24 }}>Trust & Accountability</h3>
                <p className="hero-text" style={{ marginBottom: 24 }}>We align policies and processes with applicable regulations (readiness in progress).</p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['Transparent Operations', 'Regularly Audited', 'Secure Infrastructure'].map(t => (
                    <span key={t} className="status-badge status-active" style={{ padding: '8px 16px', fontSize: 13 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- ABOUT SECTION --- */}
        {currentSection === 'about' && (
          <section>
            <div className="container" style={{ maxWidth: 900 }}>
              <span className="accent-text">Who We Are</span>
              <h1>Corporate Overview</h1>
              <p className="hero-text" style={{ textAlign: 'left', margin: '0 0 40px 0' }}>Nayaha India Techno Pvt Ltd is a private limited company incorporated in India in 2021. The company operates as a parent technology holding entity focused on building responsible, compliance-ready digital platforms and infrastructure-led systems.

The company is incorporated under the Companies Act, 2013 and registered in the state of Madhya Pradesh, India. Nayaha functions as a holding and operating entity for early-stage digital platforms currently under development. The company does not offer direct consumer products or services through this website.</p>
              
              <h3 style={{ marginTop: 40, marginBottom: 20 }}>Mission & Vision</h3>
              <div className="grid-3">
                <div className="detail-card">
                  <h4 style={{ color: 'var(--accent-gold)', marginBottom: 12 }}>Mission</h4>
                  <p style={{ fontSize: 14, color: '#666' }}>To build responsible, secure, and compliance-first technology platforms that adhere to the highest standards of digital integrity.</p>
                </div>
                <div className="detail-card">
                  <h4 style={{ color: 'var(--accent-gold)', marginBottom: 12 }}>Vision</h4>
                  <p style={{ fontSize: 14, color: '#666' }}>To become a trusted Indian technology holding company supporting scalable digital systems and infrastructure.</p>
                </div>
                <div className="detail-card">
                  <h4 style={{ color: 'var(--accent-gold)', marginBottom: 12 }}>Data Protection</h4>
                  <p style={{ fontSize: 14, color: '#666' }}>We process personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act).</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- BRANDS SECTION --- */}
        {currentSection === 'brands' && (
          <section>
            <div className="container">
              <span className="accent-text">Intellectual Property</span>
              <h1>Our Brands</h1>
              <p className="hero-text" style={{ margin: '0 0 40px 0', textAlign: 'left' }}>Nayaha incubates and manages brands that solve core efficiency problems.</p>

              {/* Duezaro */}
              <div className="brand-card">
                <div className="brand-header">
                  <div className="brand-logo">DUEZARO</div>
                  <button className="btn btn-gold">Visit Brand Website <ExternalLink size={14} style={{marginLeft:8}} /></button>
                </div>
                <div className="brand-tagline" style={{fontSize: 18, opacity: 0.9, marginBottom: 24, fontWeight: 300}}>Responsibility & Trust Ledger Ecosystem</div>
                <p style={{ fontSize: 16, color: '#ddd', marginBottom: 20, maxWidth: 600, lineHeight: 1.6 }}>Duezaro is an emerging digital platform developed under Nayaha India Techno Pvt Ltd. The platform is currently under development and its public operations are not yet active.</p>
                <div className="brand-meta" style={{marginTop: 'auto', borderTop: '1px solid #444', paddingTop: 20, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Operated by Nayaha India Techno Pvt Ltd</span>
                  <span className="status-badge status-active">Active Brand</span>
                </div>
              </div>

              {/* Stealth */}
              <div style={{ padding: 40, border: '2px dashed #ccc', borderRadius: 16, textAlign: 'center', color: '#999', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3>Stealth Project</h3>
                <p style={{fontSize: 14}}>Fintech Vertical</p>
                <span className="status-badge status-planned" style={{ marginTop: 10 }}>In Development</span>
              </div>
            </div>
          </section>
        )}

        {/* --- GOVERNANCE SECTION --- */}
        {currentSection === 'governance' && (
          <section>
            <div className="container">
              <span className="accent-text">Corporate Profile</span>
              <h1>Governance & Leadership</h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, marginTop: 20 }} className="gov-grid">
                <div>
                  <h3 style={{ marginBottom: 16 }}>Legal Entity Details</h3>
                  <div className="detail-card" style={{ padding: '0 24px' }}>
                    {[
                      { l: 'Legal Name', v: 'NAYAHA INDIA TECHNO PVT LTD' },
                      { l: 'CIN', v: 'Companies Act, 2013' },
                      { l: 'Incorporation', v: '2021' },
                      { l: 'Registered State', v: 'Madhya Pradesh, India' },
                      { l: 'Classification', v: 'Private Limited Company' }
                    ].map((row, i) => (
                      <div key={i} className="detail-row" style={i === 4 ? { borderBottom: 'none' } : {}}>
                        <span style={{ color: '#666' }}>{row.l}</span>
                        <span style={{ fontWeight: 600, textAlign: 'right' }}>{row.v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <button className="btn btn-outline" onClick={() => showToast('Profile download started...')}>Download Corporate Profile (PDF)</button>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: 16 }}>Leadership</h3>
                  {['Gourav Sharma  - Founder & Director', 'Ishan Derashri - Co-Founder & Director-Founder'].map((d, i) => (
                    <div key={i} className="detail-card" style={{ marginBottom: 16 }}>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>{d.split('-')[0]}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{d.split('-')[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- COMPLIANCE SECTION --- */}
        {currentSection === 'compliance' && (
          <section>
            <div className="container" style={{ maxWidth: 800 }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <span className="accent-text">Adherence</span>
                <h1>Regulatory Status</h1>
                <p>We align policies and processes with applicable regulations (readiness in progress).</p>
              </div>

              {[
                { id: 'trai', title: 'TRAI DLT Readiness', status: 'Active', badge: 'status-active', content: 'Purpose: Transactional SMS & sender ID verification to prevent fraud.Status: We are currently ensuring all headers and templates are registered via approved telemarketers. The system is designed to maintain zero-spam policy compliance through rigorous internal logging.Entity registration is active; template scrubbing is ongoing.' },
                { id: 'dpdp', title: 'DPDP Act Alignment', status: 'In Progress', badge: 'status-progress', content: 'Purpose: Compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act).Our team is conducting a data map assessment of all collection points. A Consent Manager architecture is being designed to allow users granular control over their data usage.Policy formulation stage; technical implementation pending.' },
                { id: 'bank', title: 'Banking & Payments', status: 'Verified', badge: 'status-active', content: 'Partners: Major Payment Aggregators (Integration Phase)KYC Status: Corporate KYC Completed.We are implementing tokenized payment flows where no sensitive card details are stored on our servers. Reconciliation processes arebeing tested to ensure financial transparency.Sandbox testing active; production access restricted.' },
                { id: 'app', title: 'App Store Verification', status: 'Verified', badge: 'status-active', content: 'Partners: Major Payment Aggregators (Integration Phase)KYC Status: Corporate KYC Completed.We are implementing tokenized payment flows where no sensitive card details are stored on our servers. Reconciliation processes arebeing tested to ensure financial transparency.Sandbox testing active; production access restricted.' }
              ].map((item) => (
                <div key={item.id} className="accordion-item">
                  <div className="accordion-header" onClick={() => toggleAccordion(item.id)}>
                    <div>{item.title} <span className={`status-badge ${item.badge}`}>{item.status}</span></div>
                    <ChevronDown size={20} style={{ transform: activeAccordion === item.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} color="var(--accent-gold)" />
                  </div>
                  <div className={`accordion-body ${activeAccordion === item.id ? 'open' : ''}`}>
                    <div className="accordion-content">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SECURITY SECTION --- */}
        {currentSection === 'security' && (
          <section>
            <div className="container">
              <span className="accent-text">Infrastructure</span>
              <h1>Security First</h1>
              
              <div className="grid-3">
                <div className="detail-card">
                  <h3>MFA Enforcement</h3>
                  <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>Mandatory Multi-Factor Authentication for all administrative access.</p>
                </div>
                <div className="detail-card">
                  <h3>Least Privilege</h3>
                  <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>Strict Role-Based Access Control (RBAC). Employees only access data necessary for tasks.</p>
                </div>
                <div className="detail-card">
                  <h3>Audit Trails</h3>
                  <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>Immutable logs for all critical system actions retained for 12 months.</p>
                </div>
              </div>

              <div style={{ background: '#FFF7E0', borderRadius: 8, padding: 32, marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <h4 style={{ color: '#B06000', fontSize: 18, marginBottom: 8 }}>Responsible Disclosure</h4>
                  <p style={{ color: '#666', fontSize: 14, maxWidth: 600 }}>Found a vulnerability? We adhere to safe harbor principles for ethical researchers.</p>
                </div>
                <button className="btn btn-sm" style={{ background: '#B06000', color: 'white' }} onClick={() => setActiveModal('vuln')}>Report a Vulnerability</button>
              </div>
            </div>
          </section>
        )}

        {/* --- NEWS SECTION --- */}
        {currentSection === 'news' && (
            <section>
                <div className="container">
                    <span className="accent-text">Updates</span>
                    <h1>Newsroom</h1>
                    
                    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                        {['all', 'compliance', 'partnership', 'company'].map(filter => (
                            <button 
                                key={filter}
                                className={`filter-chip ${newsFilter === filter ? 'active' : ''}`}
                                onClick={() => setNewsFilter(filter)}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="news-grid">
                        {filteredNews.map(news => (
                            <div key={news.id} className="news-card" onClick={() => openNewsModal(news.title, news.date)}>
                                <div style={{ fontSize: 12, color: 'var(--accent-gold)', fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>{news.date}</div>
                                <h4 style={{ fontSize: 18, marginBottom: 10 }}>{news.title}</h4>
                                <p style={{ fontSize: 14, color: '#666', flexGrow: 1 }}>{news.snippet}</p>
                                <span style={{ color: 'var(--accent-gold)', fontSize: 13, fontWeight: 600, marginTop: 16, display: 'flex', alignItems: 'center' }}>Read More <ArrowRight size={14} style={{ marginLeft: 4 }}/></span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )}

        {/* --- CAREERS SECTION --- */}
        {currentSection === 'careers' && (
            <section>
                <div className="container" style={{maxWidth: 900}}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <span className="accent-text">Join Us</span>
                        <h1>We hire builders.</h1>
                        <p className="hero-text">We are a small, high-density team. We value output over hours.</p>
                    </div>

                    <h3 style={{marginBottom: 20}}>Open Roles</h3>
                    {[
                        { role: 'Frontend Engineer', tags: 'Vue.js / React, Design Systems', loc: 'Remote' },
                        { role: 'Compliance Officer', tags: 'Legal background, RBI/Fintech focus', loc: 'Bangalore' }
                    ].map((job, i) => (
                        <div key={i} className="detail-card" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 18 }}>{job.role}</div>
                                <p style={{ fontSize: 14, color: '#666', margin: '4px 0 0' }}>{job.tags}</p>
                            </div>
                            <span className="status-badge status-active">{job.loc}</span>
                        </div>
                    ))}
                     <div style={{ background: 'var(--text-main)', color: '#fff', padding: 40, borderRadius: 16, textAlign: 'center', marginTop: 32 }}>
                        <h3 style={{ color: '#fff' }}>Don't see a role?</h3>
                        <p style={{ color: '#aaa', marginBottom: 24 }}>If you are exceptional, we make room. Pitch us your value.</p>
                        <a href="mailto:careers@nayaha.com" className="btn btn-gold">Email HR</a>
                    </div>
                </div>
            </section>
        )}

        {/* --- CONTACT SECTION --- */}
        {currentSection === 'contact' && (
          // <section>
          //   <div className="container">
          //     <div className="form-container">
          //       <span className="accent-text">Get in touch</span>
          //       <h1 style={{ marginBottom: 16 }}>Corporate Contact</h1>
          //       <p style={{ color: '#666', marginBottom: 32 }}>For legal, partnership, or general inquiries.</p>

          //       <form onSubmit={handleSubmit}>
          //         <div className="form-group">
          //           <label className="form-label">Department</label>
          //           <select className="form-select">
          //             <option>General Inquiry</option>
          //             <option>Compliance & Legal</option>
          //             <option>Partnerships</option>
          //           </select>
          //         </div>
          //         <div className="form-group">
          //           <label className="form-label">Name</label>
          //           <input type="text" className="form-input" required placeholder="John Doe" />
          //         </div>
          //         <div className="form-group">
          //           <label className="form-label">Email</label>
          //           <input type="email" className="form-input" required placeholder="john@company.com" />
          //         </div>
          //         <div className="form-group">
          //           <label className="form-label">Message</label>
          //           <textarea className="form-textarea" required placeholder="How can we help?" style={{ minHeight: 120, resize: 'vertical' }}></textarea>
          //         </div>
          //         <button type="submit" className="btn btn-primary btn-full">Send Message</button>
          //       </form>

          //       <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid #eee' }}>
          //           <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          //               <strong>Registered Office:</strong><br/>
          //               Nayaha India Techno Pvt Ltd,<br/>
          //               Bangalore, Karnataka, India - 560XXX
          //           </p>
          //       </div>
          //     </div>
          //   </div>
          // </section>
          <section className="corporate-wrapper  ">
  <div className="corporate-card">
    <span className="accent">GET IN TOUCH</span>

    <h1 className="heading">Corporate Contact</h1>

    <p className="subheading">
      For legal, compliance, or general inquiries, please reach out to the specific
      departments below.
    </p>

    <div className="cards">
      <div className="info-card">
        <h3>General Inquiries &amp; Admin</h3>
        <p className="email">admin@nayaha.com</p>
        <p className="text">
          For general correspondence and corporate information.
        </p>
      </div>

      <div className="info-card">
        <h3>Compliance &amp; Legal</h3>
        <p className="email">compliance@nayaha.com</p>
        <p className="text">
          For regulatory matters, DLT, and grievance redressal.
        </p>
      </div>
    </div>

    <div className="divider" />

    <div className="office">
      <strong>Registered Office:</strong>
      <p>
        Nayaha India Techno Pvt Ltd,<br />
        03, Textile Clerk Colony, Near Readymade Complex,<br />
        INDORE (M.P.) – (As per MCA Records)
      </p>

      <p className="note">
        Note: We do not accept unsolicited marketing proposals or walk-ins without
        prior appointment.
      </p>
    </div>
  </div>
</section>

        )}
      </main>

      {/* --- FOOTER --- */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <span className="logo" style={{fontSize: 24, fontWeight: 700, marginBottom: 16, display:'block'}}>NAYAHA<span>.</span></span>
              <p style={{ color: '#888', lineHeight: 1.6, maxWidth: 300 }}>Incorporated under Companies Act, 2013.
Registered in Indore, Madhya Pradesh, India.</p>
            </div>
            <div className="footer-col">
              <h4 style={{ color: 'var(--accent-gold)', fontSize: 12, textTransform: 'uppercase', marginBottom: 20, letterSpacing: 1 }}>Brands</h4>
              <span className="footer-link" onClick={() => handleNav('brands')} style={{cursor:'pointer'}}>Duezaro</span>
            </div>
            <div className="footer-col">
              <h4 style={{ color: 'var(--accent-gold)', fontSize: 12, textTransform: 'uppercase', marginBottom: 20, letterSpacing: 1 }}>Corporate</h4>
              {['Governance', 'Compliance', 'Careers'].map(l => (
                  <span key={l} className="footer-link" onClick={() => handleNav(l.toLowerCase())} style={{cursor:'pointer'}}>{l}</span>
              ))}
            </div>
            <div className="footer-col">
              <h4 style={{ color: 'var(--accent-gold)', fontSize: 12, textTransform: 'uppercase', marginBottom: 20, letterSpacing: 1 }}>Legal</h4>
              <span className="footer-link" style={{cursor:'pointer'}}>Privacy Policy</span>
              <span className="footer-link" style={{cursor:'pointer'}}>Terms of Service</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333', paddingTop: 30, color: '#666', fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span>&copy; 2026 Nayaha India Techno Pvt Ltd.</span>
            <span>CIN: Companies Act, 2013</span>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}
      
      {/* News Modal */}
      <div className={`modal-overlay ${activeModal === 'news' ? 'active' : ''}`}>
        <div className="modal-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <h3 style={{ fontSize: 20 }}>{newsModalContent?.title}</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setActiveModal(null)}><X /></button>
          </div>
          <div style={{ lineHeight: 1.8, fontSize: 15, color: '#1A1A1A' }}>
            <p style={{ color: 'var(--accent-gold)', fontWeight: 700, marginBottom: 20 }}>{newsModalContent?.date}</p>
            <p><strong>Bangalore, India</strong> – Nayaha India Techno Pvt Ltd announced today significant updates regarding "{newsModalContent?.title}".</p>
            <p style={{ marginTop: 15 }}>This development underscores our commitment to compliance and infrastructure stability. As a corporate holding entity, keeping our governance frameworks up to date with the latest DLT and DPDP guidelines remains our top priority.</p>
            <p style={{ marginTop: 15 }}>For full press inquiries, please contact our corporate communications office.</p>
          </div>
          <button className="btn btn-outline btn-full" style={{ marginTop: 30 }} onClick={() => setActiveModal(null)}>Close</button>
        </div>
      </div>

      {/* Vulnerability Modal */}
      <div className={`modal-overlay ${activeModal === 'vuln' ? 'active' : ''}`}>
        <div className="modal-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <h3>Report Vulnerability</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setActiveModal(null)}><X /></button>
          </div>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>Please provide details. We adhere to safe harbor principles.</p>
          <form onSubmit={handleVulnReport}>
            <div className="form-group">
                <label className="form-label">Severity</label>
                <select className="form-select"><option>Low</option><option>Medium</option><option>Critical</option></select>
            </div>
            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" style={{height:100}}></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-full">Submit Report</button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${toastMessage ? 'visible' : ''}`}>
        {toastMessage}
      </div>

    </div>
  );
};

export default NayahaCorporate;