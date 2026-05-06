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
// This list must cover every token set by any palette's brand/light/dark objects.

export const MANAGED_VARS = [
  // Brand / focus / selection
  '--rally-brand', '--rally-brand-hover', '--rally-brand-pressed',
  '--rally-brand-soft-light', '--rally-brand-soft-dark',
  '--rally-brand-on-light', '--rally-brand-on-dark',
  '--focus-ring', '--selected-border',

  // Base layer
  '--canvas', '--surface', '--elevated', '--border-color',
  '--text-primary', '--text-secondary',

  // Neutral
  '--neutral-solid',
  '--neutral-soft-light', '--neutral-soft-dark',
  '--neutral-on-light', '--neutral-on-dark',

  // Interaction states
  '--disabled-bg', '--disabled-border', '--disabled-text',
  '--selected-bg', '--selected-text',

  // Semantic: Error
  '--error-solid', '--error-hover', '--error-pressed',
  '--error-soft-light', '--error-soft-dark',
  '--error-on-light', '--error-on-dark',

  // Semantic: Success
  '--success-solid',
  '--success-soft-light', '--success-soft-dark',
  '--success-on-light', '--success-on-dark',

  // Semantic: Warning
  '--warning-solid',
  '--warning-soft-light', '--warning-soft-dark',
  '--warning-on-light', '--warning-on-dark',

  // Semantic: Info
  '--info-solid',
  '--info-soft-light', '--info-soft-dark',
  '--info-on-light', '--info-on-dark',

  // Status dots
  '--status-active', '--status-limited', '--status-disabled',

  // Badge pairs (text + bg)
  '--badge-tasks-text', '--badge-tasks-bg',
  '--badge-calendar-text', '--badge-calendar-bg',
  '--badge-files-text', '--badge-files-bg',
  '--badge-chat-text', '--badge-chat-bg',
  '--badge-team-text', '--badge-team-bg',
  '--badge-web-text', '--badge-web-bg',
] as const;

// ── Shared semantic token values (universal across all palettes) ──────────────
// Error, success, warning, info are semantic meanings that stay consistent.
// Only badge-calendar and neutral-based tokens vary per palette.

const SEMANTIC_LIGHT: Record<string, string> = {
  // Error
  '--error-solid':      '#d90000',
  '--error-hover':      '#b00000',
  '--error-pressed':    '#8e0000',
  '--error-soft-light': '#fdecec',
  '--error-soft-dark':  '#341111',
  '--error-on-light':   '#b00000',
  '--error-on-dark':    '#ff8a8a',
  // Success
  '--success-solid':      '#0f6a43',
  '--success-soft-light': '#eaf7f0',
  '--success-soft-dark':  '#10261c',
  '--success-on-light':   '#0f6a43',
  '--success-on-dark':    '#7ad6a7',
  // Warning
  '--warning-solid':      '#8a4f00',
  '--warning-soft-light': '#fff4e5',
  '--warning-soft-dark':  '#33210a',
  '--warning-on-light':   '#8a4f00',
  '--warning-on-dark':    '#ffd08a',
  // Info
  '--info-solid':      '#0f5fd7',
  '--info-soft-light': '#eef4ff',
  '--info-soft-dark':  '#101d36',
  '--info-on-light':   '#0f5fd7',
  '--info-on-dark':    '#a9cbff',
  // Status (light = solid colours)
  '--status-active':   '#0f6a43',
  '--status-disabled': '#d90000',
  // Badge: semantic colours are fixed
  '--badge-tasks-text': '#0f6a43',
  '--badge-tasks-bg':   '#eaf7f0',
  '--badge-files-text': '#0f5fd7',
  '--badge-files-bg':   '#eef4ff',
  '--badge-web-text':   '#0f5fd7',
  '--badge-web-bg':     '#eef4ff',
};

const SEMANTIC_DARK: Record<string, string> = {
  // Error (solids stay same; on/soft switch to dark variants)
  '--error-solid':      '#d90000',
  '--error-hover':      '#b00000',
  '--error-pressed':    '#8e0000',
  '--error-soft-light': '#fdecec',
  '--error-soft-dark':  '#341111',
  '--error-on-light':   '#b00000',
  '--error-on-dark':    '#ff8a8a',
  // Success
  '--success-solid':      '#0f6a43',
  '--success-soft-light': '#eaf7f0',
  '--success-soft-dark':  '#10261c',
  '--success-on-light':   '#0f6a43',
  '--success-on-dark':    '#7ad6a7',
  // Warning
  '--warning-solid':      '#8a4f00',
  '--warning-soft-light': '#fff4e5',
  '--warning-soft-dark':  '#33210a',
  '--warning-on-light':   '#8a4f00',
  '--warning-on-dark':    '#ffd08a',
  // Info
  '--info-solid':      '#0f5fd7',
  '--info-soft-light': '#eef4ff',
  '--info-soft-dark':  '#101d36',
  '--info-on-light':   '#0f5fd7',
  '--info-on-dark':    '#a9cbff',
  // Status (dark = on-dark = lighter colours for visibility)
  '--status-active':   '#7ad6a7',
  '--status-disabled': '#ff8a8a',
  // Badge: semantic fixed (dark variants)
  '--badge-tasks-text': '#7ad6a7',
  '--badge-tasks-bg':   '#10261c',
  '--badge-files-text': '#a9cbff',
  '--badge-files-bg':   '#101d36',
  '--badge-web-text':   '#a9cbff',
  '--badge-web-bg':     '#101d36',
};

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
      // Status & badge (palette-specific)
      '--status-limited':       '#5f514b',
      '--badge-calendar-text':  '#c60f08',
      '--badge-calendar-bg':    '#fff2ed',
      '--badge-chat-text':      '#5f514b',
      '--badge-chat-bg':        '#f4ece8',
      '--badge-team-text':      '#5f514b',
      '--badge-team-bg':        '#f4ece8',
      ...SEMANTIC_LIGHT,
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
      // Status & badge (palette-specific)
      '--status-limited':       '#c7b8b2',
      '--badge-calendar-text':  '#ff9571',
      '--badge-calendar-bg':    '#440608',
      '--badge-chat-text':      '#c7b8b2',
      '--badge-chat-bg':        '#262322',
      '--badge-team-text':      '#c7b8b2',
      '--badge-team-bg':        '#262322',
      ...SEMANTIC_DARK,
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
      // Status & badge
      '--status-limited':       '#3b5a8a',
      '--badge-calendar-text':  '#1d4ed8',
      '--badge-calendar-bg':    '#eff6ff',
      '--badge-chat-text':      '#3b5a8a',
      '--badge-chat-bg':        '#e8f1ff',
      '--badge-team-text':      '#3b5a8a',
      '--badge-team-bg':        '#e8f1ff',
      ...SEMANTIC_LIGHT,
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
      // Status & badge
      '--status-limited':       '#7da0c8',
      '--badge-calendar-text':  '#93c5fd',
      '--badge-calendar-bg':    '#1e3a5f',
      '--badge-chat-text':      '#7da0c8',
      '--badge-chat-bg':        '#142040',
      '--badge-team-text':      '#7da0c8',
      '--badge-team-bg':        '#142040',
      ...SEMANTIC_DARK,
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
      // Status & badge
      '--status-limited':       '#2d5c3a',
      '--badge-calendar-text':  '#15803d',
      '--badge-calendar-bg':    '#f0fdf4',
      '--badge-chat-text':      '#2d5c3a',
      '--badge-chat-bg':        '#e2f4e8',
      '--badge-team-text':      '#2d5c3a',
      '--badge-team-bg':        '#e2f4e8',
      ...SEMANTIC_LIGHT,
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
      // Status & badge
      '--status-limited':       '#6dba87',
      '--badge-calendar-text':  '#86efac',
      '--badge-calendar-bg':    '#14532d',
      '--badge-chat-text':      '#6dba87',
      '--badge-chat-bg':        '#0e2614',
      '--badge-team-text':      '#6dba87',
      '--badge-team-bg':        '#0e2614',
      ...SEMANTIC_DARK,
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
      // Status & badge
      '--status-limited':       '#4c4880',
      '--badge-calendar-text':  '#4f46e5',
      '--badge-calendar-bg':    '#eef2ff',
      '--badge-chat-text':      '#4c4880',
      '--badge-chat-bg':        '#ede9fe',
      '--badge-team-text':      '#4c4880',
      '--badge-team-bg':        '#ede9fe',
      ...SEMANTIC_LIGHT,
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
      // Status & badge
      '--status-limited':       '#9290c0',
      '--badge-calendar-text':  '#a5b4fc',
      '--badge-calendar-bg':    '#312e81',
      '--badge-chat-text':      '#9290c0',
      '--badge-chat-bg':        '#1a192e',
      '--badge-team-text':      '#9290c0',
      '--badge-team-bg':        '#1a192e',
      ...SEMANTIC_DARK,
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
      // Status & badge
      '--status-limited':       '#7a3040',
      '--badge-calendar-text':  '#be123c',
      '--badge-calendar-bg':    '#fff1f2',
      '--badge-chat-text':      '#7a3040',
      '--badge-chat-bg':        '#ffe4e6',
      '--badge-team-text':      '#7a3040',
      '--badge-team-bg':        '#ffe4e6',
      ...SEMANTIC_LIGHT,
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
      // Status & badge
      '--status-limited':       '#d48090',
      '--badge-calendar-text':  '#fda4af',
      '--badge-calendar-bg':    '#4c0519',
      '--badge-chat-text':      '#d48090',
      '--badge-chat-bg':        '#2e1020',
      '--badge-team-text':      '#d48090',
      '--badge-team-bg':        '#2e1020',
      ...SEMANTIC_DARK,
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
      // Status & badge
      '--status-limited':       '#6b4a10',
      '--badge-calendar-text':  '#b45309',
      '--badge-calendar-bg':    '#fffbeb',
      '--badge-chat-text':      '#6b4a10',
      '--badge-chat-bg':        '#fef3c7',
      '--badge-team-text':      '#6b4a10',
      '--badge-team-bg':        '#fef3c7',
      ...SEMANTIC_LIGHT,
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
      // Status & badge
      '--status-limited':       '#c49530',
      '--badge-calendar-text':  '#fcd34d',
      '--badge-calendar-bg':    '#451a03',
      '--badge-chat-text':      '#c49530',
      '--badge-chat-bg':        '#281c00',
      '--badge-team-text':      '#c49530',
      '--badge-team-bg':        '#281c00',
      ...SEMANTIC_DARK,
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

// ─�� CSS-variable helper strings (use in inline styles) ────────────────────────
// Instead of hardcoding "#ff4615", import these and use e.g. style={{ color: cv.brand }}

export const cv = {
  brand:         'var(--rally-brand)',
  brandHover:    'var(--rally-brand-hover)',
  brandPressed:  'var(--rally-brand-pressed)',
  brandSoft:     'var(--rally-brand-soft)',
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
