// Minimal root layout — the [locale] layout provides <html>, <body>, lang, and fonts.
// This pattern is required by next-intl's locale-prefixed routing.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
