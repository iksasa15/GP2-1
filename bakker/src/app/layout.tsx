// src/app/layout.tsx
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header>شريط التنقل</header>
        {children} {/* صفحات فرعية */}
        <footer>حقوق النشر</footer>
      </body>
    </html>
  )
}