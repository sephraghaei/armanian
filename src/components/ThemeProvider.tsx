import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
};

const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  ...props
}: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme={defaultTheme}
    enableSystem
    disableTransitionOnChange
    {...props}
  >
    {children}
  </NextThemesProvider>
);

export { ThemeProvider };
