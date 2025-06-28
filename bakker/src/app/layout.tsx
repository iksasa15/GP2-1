// src/app/layout.tsx
import { ReactNode } from "react";
import Navbar from "./screens/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main className="container">
          {children}
        </main>
        <footer>
          <div className="container">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </div>
        </footer>
        
        <style jsx global>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Tajawal', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          
          main {
            min-height: calc(100vh - 130px);
          }
          
          footer {
            text-align: center;
            padding: 15px 0;
            background-color: #f8f9fa;
            border-top: 1px solid #e9ecef;
          }
        `}</style>
      </body>
    </html>
  )
}