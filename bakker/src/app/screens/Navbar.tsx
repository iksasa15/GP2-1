// src/app/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
// Update the import path below if your firebase config file is located elsewhere
import { auth } from "../../firebase/config"; // تأكد من صحة المسار واسم الملف
import Patient from "../../models/Patient"; // مسار محدث للاستيراد

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await Patient.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">منصة الرعاية الصحية</Link>
      </div>
      
      <div className="navbar-menu">
        {user ? (
          <>
            <span className="welcome-message">مرحبًا {user.displayName || 'بك'}</span>
            <button onClick={handleLogout} className="logout-btn">تسجيل الخروج</button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">تسجيل الدخول</Link>
            <Link href="/signup" className="nav-link">إنشاء حساب</Link>
          </>
        )}
      </div>
      
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: #f8f9fa;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .navbar-brand {
          font-size: 20px;
          font-weight: bold;
        }
        
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .nav-link {
          padding: 8px 12px;
          text-decoration: none;
          color: #333;
          border-radius: 4px;
        }
        
        .nav-link:hover {
          background-color: #e9ecef;
        }
        
        .welcome-message {
          margin-right: 10px;
        }
        
        .logout-btn {
          padding: 8px 12px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .logout-btn:hover {
          background-color: #c82333;
        }
      `}</style>
    </nav>
  );
}