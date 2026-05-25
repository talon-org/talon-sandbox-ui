import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import './global.css';

/**
 * S2 fix: next-themes configured with attribute="data-mode" so Fumadocs
 * dark/light toggling writes data-mode="dark|light" onto <html> — the same
 * attribute Talon tokens respond to. No class strategy needed, no FOUC.
 * next-themes injects a blocking script before paint.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider
          theme={{
            attribute: 'data-mode',
            defaultTheme: 'dark',
            // "dark" → data-mode="dark"; "light" → data-mode="light"
            // Matches Talon token selectors exactly.
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
