import type { Metadata } from 'next';
import DonationForm from './components/DonationForm';
import DonationProgress from './components/DonationProgress';
import HeroParticlesClient from './components/HeroParticlesClient';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Team 3 · Supporta il team',
  description: 'Dona al team di sviluppo Team 3 — 3 dev, 1 designer, 1 PM. Ogni contributo conta.',
};

const TEAM = [
  { role: 'Developer',        name: 'DEV_01', stack: 'TypeScript · React · Node',    index: '01' },
  { role: 'Developer',        name: 'DEV_02', stack: 'Python · FastAPI · Postgres',   index: '02' },
  { role: 'Developer',        name: 'DEV_03', stack: 'Rust · WebAssembly · K8s',      index: '03' },
  { role: 'Designer',         name: 'DES_01', stack: 'Figma · Motion · Systems',      index: '04' },
  { role: 'Product Manager',  name: 'PM_01',  stack: 'Strategy · Roadmap · OKR',      index: '05' },
];

export default function HomePage() {
  return (
    <main className={styles.main}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>
          TEAM<span className={styles.accent}>_3</span>
        </span>
        <div className={styles.navLinks}>
          <a href="#team">Team</a>
          <a href="#mission">Mission</a>
          <a href="#donate" className={styles.navCta}>Dona ora</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBgGrid} aria-hidden="true" />
        <HeroParticlesClient />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>// OPEN SOURCE · INDEPENDENT</div>
          <h1 className={styles.heroTitle}>
            Costruiamo il futuro<br />
            <span className={styles.accent}>riga per riga</span>
          </h1>
          <p className={styles.heroSub}>
            Cinque persone. Una missione. Zero VC money.<br />Solo codice, design e tanta caffettina.
          </p>
          <div className={styles.heroActions}>
            <a href="#donate" className={styles.btnPrimary}>Supportaci</a>
            <a href="#team" className={styles.btnGhost}>Conosci il team →</a>
          </div>
        </div>
        <div className={styles.heroStatBar}>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Developer</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>1</span>
            <span className={styles.statLabel}>Designer</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>1</span>
            <span className={styles.statLabel}>Product Manager</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>∞</span>
            <span className={styles.statLabel}>Caffè consumati</span>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>scroll</span>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section id="mission" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// MISSIONE</span>
          <h2 className={styles.sectionTitle}>Perché lo facciamo</h2>
        </div>
        <div className={styles.missionGrid}>
          <div className={styles.missionCard}>
            <span className={styles.missionIcon}>⬡</span>
            <h3>Open by default</h3>
            <p>Ogni riga di codice che scriviamo aspira ad essere pubblica, leggibile e riutilizzabile.</p>
          </div>
          <div className={styles.missionCard}>
            <span className={styles.missionIcon}>⬡</span>
            <h3>No bullshit</h3>
            <p>Nessuna buzzword, nessun pitch deck infinito. Solo prodotti che funzionano davvero.</p>
          </div>
          <div className={styles.missionCard}>
            <span className={styles.missionIcon}>⬡</span>
            <h3>Community first</h3>
            <p>Chi dona entra nella loop. Vedi le decisioni, i log, i fallimenti e i successi in diretta.</p>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// IL TEAM</span>
          <h2 className={styles.sectionTitle}>Chi c&apos;è dietro al volante</h2>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <div key={member.index} className={styles.memberCard}>
              <div className={styles.memberIndex}>{member.index}</div>
              <div className={styles.memberAvatar}>
                <div className={styles.avatarInner}>{member.name.charAt(0)}</div>
              </div>
              <div className={styles.memberInfo}>
                <span className={styles.memberRole}>{member.role}</span>
                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberStack}>{member.stack}</span>
              </div>
              <div className={styles.memberGlow} aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      {/* ── DONATE ── */}
      <section id="donate" className={`${styles.section} ${styles.donateSection}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// DONAZIONE</span>
          <h2 className={styles.sectionTitle}>
            Metti benzina<br />nel trattore
          </h2>
          <p className={styles.sectionSub}>
            Il nostro trattore gira H24. Aiutaci a tenerlo in moto.
          </p>
        </div>
        <DonationProgress />
        <DonationForm />
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>
            TEAM<span className={styles.accent}>_3</span>
          </span>
          <span className={styles.footerCopy}>
            © {new Date().getFullYear()} — Fatto con caffè, debug sessions e amore
          </span>
          <span className={styles.footerMono}>FIELD-3 OPERATIONAL</span>
        </div>
      </footer>

    </main>
  );
}
