import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTheme } from './ThemeContext';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ThemePalette {
  id: string;
  name: string;
  description: string;
  emoji: string;
  /** Used for static mini-preview swatches — always light-mode values */
  preview: {
    primary: string;
    canvas:  string;
    surface: string;
    border:  string;
    text:    string;
  };
  /** CSS vars identical in both light & dark (brand identity) */
  brand: Record<string, string>;
  /** CSS vars for light mode only */
  light: Record<string, string>;
  /** CSS vars for dark mode only */
  dark:  Record<string, string>;
}

// ── CSS vars this system manages (cleared on every palette switch) ─────────────

export const MANAGED_VARS = [
  '--rally-brand', '--rally-brand-hover', '--rally-brand-pressed',
  '--rally-brand-soft-light', '--rally-brand-soft-dark',
  '--rally-brand-on-light', '--rally-brand-on-dark',
  '--focus-ring', '--selected-border',
  '--canvas', '--surface', '--elevated', '--border-color',
  '--text-primary', '--text-secondary',
  '--neutral-solid', '--neutral-soft-light', '--neutral-soft-dark',
  '--neutral-on-light', '--neutral-on-dark',
  '--disabled-bg', '--disabled-border', '--disabled-text',
  '--selected-bg', '--selected-text',
] as const;

// ── Palette Definitions ───────────────────────────────────────────────────────

export const PALETTES: ThemePalette[] = [
  // ── 1. Rally (default) ──────────────────────────────────────────────────────
  {
    id: 'rally',
    name: 'Rally',
    description: 'The original warm orange-red on cream. Bold, energetic, unmistakable.',
    emoji: '🔥',
    preview: { primary: '#ff4615', canvas: '#ffe1d2', surface: '#ffffff', border: '#d1aa99', text: '#231d1a' },
    brand: {
      '--rally-brand':            '#ff4615',
      '--rally-brand-hover':      '#fe3511',
      '--rally-brand-pressed':    '#ef1b07',
      '--rally-brand-soft-light': '#fff2ed',
      '--rally-brand-soft-dark':  '#440608',
      '--rally-brand-on-light':   '#c60f08',
      '--rally-brand-on-dark':    '#ff9571',
      '--focus-ring':             '#ff9571',
      '--selected-border':        '#ff5931',
    },
    light: {
      '--canvas':             '#ffe1d2',
      '--surface':            '#fff7f3',
      '--elevated':           '#ffffff',
      '--border-color':       '#d1aa99',
      '--text-primary':       '#231d1a',
      '--text-secondary':     '#5f514b',
      '--neutral-solid':      '#5f514b',
      '--neutral-soft-light': '#f4ece8',
      '--neutral-on-light':   '#5f514b',
      '--disabled-bg':        '#fff2ed',
      '--disabled-border':    '#ff5931',
      '--disabled-text':      '#70635d',
      '--selected-bg':        '#ffe2d4',
      '--selected-text':      '#c60f08',
    },
    dark: {
      '--canvas':            '#191919',
      '--surface':           '#232323',
      '--elevated':          '#2c2c2c',
      '--border-color':      '#4a403c',
      '--text-primary':      '#fff2ed',
      '--text-secondary':    '#c7b8b2',
      '--neutral-soft-dark': '#262322',
      '--neutral-on-dark':   '#c7b8b2',
      '--disabled-bg':       '#262322',
      '--disabled-border':   '#70635d',
      '--disabled-text':     '#8a807c',
      '--selected-bg':       '#440608',
      '--selected-text':     '#ff9571',
    },
  },

  // ── 2. Ocean ─────────────────────────────────────────────────────────────────
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Electric blue on deep-sea navy. High contrast, crisp, professional.',
    emoji: '🌊',
    preview: { primary: '#2563eb', canvas: '#dbeafe', surface: '#ffffff', border: '#bfdbfe', text: '#0f172a' },
    brand: {
      '--rally-brand':            '#2563eb',
      '--rally-brand-hover':      '#1d4ed8',
      '--rally-brand-pressed':    '#1e40af',
      '--rally-brand-soft-light': '#eff6ff',
      '--rally-brand-soft-dark':  '#1e3a5f',
      '--rally-brand-on-light':   '#1d4ed8',
      '--rally-brand-on-dark':    '#93c5fd',
      '--focus-ring':             '#93c5fd',
      '--selected-border':        '#2563eb',
    },
    light: {
      '--canvas':             '#dbeafe',
      '--surface':            '#f0f7ff',
      '--elevated':           '#ffffff',
      '--border-color':       '#bfdbfe',
      '--text-primary':       '#0f172a',
      '--text-secondary':     '#3b5a8a',
      '--neutral-solid':      '#3b5a8a',
      '--neutral-soft-light': '#e8f1ff',
      '--neutral-on-light':   '#3b5a8a',
      '--disabled-bg':        '#eff6ff',
      '--disabled-border':    '#3b82f6',
      '--disabled-text':      '#6b7fa0',
      '--selected-bg':        '#dbeafe',
      '--selected-text':      '#1d4ed8',
    },
    dark: {
      '--canvas':            '#0a1628',
      '--surface':           '#0f1e36',
      '--elevated':          '#162844',
      '--border-color':      '#1e3a6a',
      '--text-primary':      '#e8f0fe',
      '--text-secondary':    '#7da0c8',
      '--neutral-soft-dark': '#142040',
      '--neutral-on-dark':   '#7da0c8',
      '--disabled-bg':       '#0f1e36',
      '--disabled-border':   '#2b4f8a',
      '--disabled-text':     '#4a6a90',
      '--selected-bg':       '#1e3a5f',
      '--selected-text':     '#93c5fd',
    },
  },

  // ── 3. Forest ────────────────────────────────────────────────────────────────
  {
    id: 'forest',
    name: 'Forest',
    description: 'Earthy green on misty sage. Calm, grounded, focused.',
    emoji: '🌲',
    preview: { primary: '#16a34a', canvas: '#dcfce7', surface: '#ffffff', border: '#a7d9b4', text: '#0d2313' },
    brand: {
      '--rally-brand':            '#16a34a',
      '--rally-brand-hover':      '#15803d',
      '--rally-brand-pressed':    '#166534',
      '--rally-brand-soft-light': '#f0fdf4',
      '--rally-brand-soft-dark':  '#14532d',
      '--rally-brand-on-light':   '#15803d',
      '--rally-brand-on-dark':    '#86efac',
      '--focus-ring':             '#86efac',
      '--selected-border':        '#16a34a',
    },
    light: {
      '--canvas':             '#dcfce7',
      '--surface':            '#f0fdf4',
      '--elevated':           '#ffffff',
      '--border-color':       '#a7d9b4',
      '--text-primary':       '#0d2313',
      '--text-secondary':     '#2d5c3a',
      '--neutral-solid':      '#2d5c3a',
      '--neutral-soft-light': '#e2f4e8',
      '--neutral-on-light':   '#2d5c3a',
      '--disabled-bg':        '#f0fdf4',
      '--disabled-border':    '#4ade80',
      '--disabled-text':      '#5a8065',
      '--selected-bg':        '#bbf7d0',
      '--selected-text':      '#15803d',
    },
    dark: {
      '--canvas':            '#0a1f0f',
      '--surface':           '#0e2614',
      '--elevated':          '#15331c',
      '--border-color':      '#234d2c',
      '--text-primary':      '#ecfdf5',
      '--text-secondary':    '#6dba87',
      '--neutral-soft-dark': '#0e2614',
      '--neutral-on-dark':   '#6dba87',
      '--disabled-bg':       '#0e2614',
      '--disabled-border':   '#2d6a3c',
      '--disabled-text':     '#3d7050',
      '--selected-bg':       '#14532d',
      '--selected-text':     '#86efac',
    },
  },

  // ── 4. Slate ─────────────────────────────────────────────────────────────────
  {
    id: 'slate',
    name: 'Slate',
    description: 'Indigo on pure gray — minimal, precise, distraction-free.',
    emoji: '🪨',
    preview: { primary: '#6366f1', canvas: '#e0e7ff', surface: '#ffffff', border: '#c7d2fe', text: '#1e1b4b' },
    brand: {
      '--rally-brand':            '#6366f1',
      '--rally-brand-hover':      '#4f46e5',
      '--rally-brand-pressed':    '#4338ca',
      '--rally-brand-soft-light': '#eef2ff',
      '--rally-brand-soft-dark':  '#312e81',
      '--rally-brand-on-light':   '#4f46e5',
      '--rally-brand-on-dark':    '#a5b4fc',
      '--focus-ring':             '#a5b4fc',
      '--selected-border':        '#6366f1',
    },
    light: {
      '--canvas':             '#e0e7ff',
      '--surface':            '#f5f5ff',
      '--elevated':           '#ffffff',
      '--border-color':       '#c7d2fe',
      '--text-primary':       '#1e1b4b',
      '--text-secondary':     '#4c4880',
      '--neutral-solid':      '#4c4880',
      '--neutral-soft-light': '#ede9fe',
      '--neutral-on-light':   '#4c4880',
      '--disabled-bg':        '#eef2ff',
      '--disabled-border':    '#818cf8',
      '--disabled-text':      '#7c7ab0',
      '--selected-bg':        '#e0e7ff',
      '--selected-text':      '#4f46e5',
    },
    dark: {
      '--canvas':            '#0d0c1a',
      '--surface':           '#131224',
      '--elevated':          '#1a192e',
      '--border-color':      '#2e2c5a',
      '--text-primary':      '#eef2ff',
      '--text-secondary':    '#9290c0',
      '--neutral-soft-dark': '#1a192e',
      '--neutral-on-dark':   '#9290c0',
      '--disabled-bg':       '#131224',
      '--disabled-border':   '#4340a0',
      '--disabled-text':     '#605e90',
      '--selected-bg':       '#312e81',
      '--selected-text':     '#a5b4fc',
    },
  },

  // ── 5. Rose ──────────────────────────────────────────────────────────────────
  {
    id: 'rose',
    name: 'Rose',
    description: 'Vibrant rose-pink for bold, expressive creative teams.',
    emoji: '🌸',
    preview: { primary: '#e11d48', canvas: '#ffe4e6', surface: '#ffffff', border: '#fecdd3', text: '#2d0a10' },
    brand: {
      '--rally-brand':            '#e11d48',
      '--rally-brand-hover':      '#be123c',
      '--rally-brand-pressed':    '#9f1239',
      '--rally-brand-soft-light': '#fff1f2',
      '--rally-brand-soft-dark':  '#4c0519',
      '--rally-brand-on-light':   '#be123c',
      '--rally-brand-on-dark':    '#fda4af',
      '--focus-ring':             '#fda4af',
      '--selected-border':        '#e11d48',
    },
    light: {
      '--canvas':             '#ffe4e6',
      '--surface':            '#fff5f6',
      '--elevated':           '#ffffff',
      '--border-color':       '#fecdd3',
      '--text-primary':       '#2d0a10',
      '--text-secondary':     '#7a3040',
      '--neutral-solid':      '#7a3040',
      '--neutral-soft-light': '#ffe4e6',
      '--neutral-on-light':   '#7a3040',
      '--disabled-bg':        '#fff1f2',
      '--disabled-border':    '#fb7185',
      '--disabled-text':      '#9a5060',
      '--selected-bg':        '#ffd0d6',
      '--selected-text':      '#be123c',
    },
    dark: {
      '--canvas':            '#1a0810',
      '--surface':           '#220c16',
      '--elevated':          '#2e1020',
      '--border-color':      '#5c1e2e',
      '--text-primary':      '#fef2f2',
      '--text-secondary':    '#d48090',
      '--neutral-soft-dark': '#2e1020',
      '--neutral-on-dark':   '#d48090',
      '--disabled-bg':       '#220c16',
      '--disabled-border':   '#8c2040',
      '--disabled-text':     '#8c5060',
      '--selected-bg':       '#4c0519',
      '--selected-text':     '#fda4af',
    },
  },

  // ── 6. Amber ─────────────────────────────────────────────────────────────────
  {
    id: 'amber',
    name: 'Amber',
    description: 'Golden amber warmth — energetic, sun-soaked, easy on the eyes.',
    emoji: '✨',
    preview: { primary: '#d97706', canvas: '#fef3c7', surface: '#ffffff', border: '#fde68a', text: '#1c1000' },
    brand: {
      '--rally-brand':            '#d97706',
      '--rally-brand-hover':      '#b45309',
      '--rally-brand-pressed':    '#92400e',
      '--rally-brand-soft-light': '#fffbeb',
      '--rally-brand-soft-dark':  '#451a03',
      '--rally-brand-on-light':   '#b45309',
      '--rally-brand-on-dark':    '#fcd34d',
      '--focus-ring':             '#fcd34d',
      '--selected-border':        '#d97706',
    },
    light: {
      '--canvas':             '#fef3c7',
      '--surface':            '#fffdf4',
      '--elevated':           '#ffffff',
      '--border-color':       '#fde68a',
      '--text-primary':       '#1c1000',
      '--text-secondary':     '#6b4a10',
      '--neutral-solid':      '#6b4a10',
      '--neutral-soft-light': '#fef3c7',
      '--neutral-on-light':   '#6b4a10',
      '--disabled-bg':        '#fffbeb',
      '--disabled-border':    '#fbbf24',
      '--disabled-text':      '#8a6a20',
      '--selected-bg':        '#fde68a',
      '--selected-text':      '#b45309',
    },
    dark: {
      '--canvas':            '#170f00',
      '--surface':           '#1e1500',
      '--elevated':          '#281c00',
      '--border-color':      '#5c3d00',
      '--text-primary':      '#fffbeb',
      '--text-secondary':    '#c49530',
      '--neutral-soft-dark': '#281c00',
      '--neutral-on-dark':   '#c49530',
      '--disabled-bg':       '#1e1500',
      '--disabled-border':   '#7c5000',
      '--disabled-text':     '#8a6a20',
      '--selected-bg':       '#451a03',
      '--selected-text':     '#fcd34d',
    },
  },
];

// ── Apply engine ──────────────────────────────────────────────────────────────

function applyPaletteToDOM(palette: ThemePalette, isDark: boolean) {
  const root = document.documentElement;
  // 1. Clear all previously injected vars
  MANAGED_VARS.forEach(v => root.style.removeProperty(v));
  // 2. Apply brand vars (same in both modes)
  Object.entries(palette.brand).forEach(([k, v]) => root.style.setProperty(k, v));
  // 3. Apply mode-specific vars
  const modeVars = isDark ? palette.dark : palette.light;
  Object.entries(modeVars).forEach(([k, v]) => root.style.setProperty(k, v));
  // 4. Tag the document for CSS targeting
  root.setAttribute('data-palette', palette.id);
}

// ── Context ───────────────────────────────────────────────────────────────────

interface PaletteContextType {
  activePaletteId: string;
  activePalette:   ThemePalette;
  palettes:        ThemePalette[];
  setPalette:      (id: string) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export function PaletteProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activePaletteId, setActivePaletteId] = useState<string>(() =>
    localStorage.getItem('rally-palette') ?? 'rally'
  );

  const activePalette = PALETTES.find(p => p.id === activePaletteId) ?? PALETTES[0];

  // Re-apply whenever palette or light/dark mode changes
  useEffect(() => {
    applyPaletteToDOM(activePalette, isDark);
  }, [activePaletteId, isDark]); // eslint-disable-line react-hooks/exhaustive-deps

  function setPalette(id: string) {
    setActivePaletteId(id);
    localStorage.setItem('rally-palette', id);
  }

  return (
    <PaletteContext.Provider value={{ activePaletteId, activePalette, palettes: PALETTES, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error('usePalette must be used within a PaletteProvider');
  return ctx;
}

// ── CSS-variable helper strings (use in inline styles) ────────────────────────
// Instead of hardcoding "#ff4615", import these and use e.g. style={{ color: cv.brand }}

export const cv = {
  brand:         'var(--rally-brand)',
  brandHover:    'var(--rally-brand-hover)',
  brandPressed:  'var(--rally-brand-pressed)',
  brandSoft:     'var(--rally-brand-soft-light)',
  brandSoftDark: 'var(--rally-brand-soft-dark)',
  brandOnLight:  'var(--rally-brand-on-light)',
  brandOnDark:   'var(--rally-brand-on-dark)',
  focusRing:     'var(--focus-ring)',
  selectedBg:    'var(--selected-bg)',
  selectedBorder:'var(--selected-border)',
  selectedText:  'var(--selected-text)',
  bg:            'var(--background)',
  card:          'var(--card)',
  border:        'var(--border)',
  fg:            'var(--foreground)',
  muted:         'var(--muted)',
  mutedFg:       'var(--muted-foreground)',
} as const;
