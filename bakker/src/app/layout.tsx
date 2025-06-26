// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <header>شريط التنقل</header>
          {children} {/* صفحات فرعية */}
          <footer>حقوق النشر</footer>
        </body>
      </html>
    )
  }
  