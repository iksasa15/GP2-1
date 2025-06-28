// src/app/login/page.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Patient from "../../../../models/Patient"; // مسار محدث للاستيراد
import Link from "next/link";


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // استخدام دالة تسجيل الدخول من كلاس المريض
      await Patient.login(formData.email, formData.password);
      
      // التوجيه للصفحة الرئيسية بعد تسجيل الدخول
      router.push("/");
    } catch (err: unknown) {
      console.error("خطأ في تسجيل الدخول:", err);

      // رسائل خطأ مخصصة بناءً على رمز الخطأ
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        typeof (err as { code?: string }).code === "string"
      ) {
        const code = (err as { code: string }).code;
        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        } else if (code === "auth/too-many-requests") {
          setError("تم حظر الوصول مؤقتًا بسبب محاولات فاشلة متكررة. الرجاء المحاولة لاحقًا");
        } else {
          setError(
            (err as { message?: string }).message || "حدث خطأ أثناء تسجيل الدخول"
          );
        }
      } else {
        setError("حدث خطأ أثناء تسجيل الدخول");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>تسجيل الدخول</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
      
      <div className="signup-link">
        ليس لديك حساب؟ <Link href="/signup">إنشاء حساب جديد</Link>
      </div>
      
      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Tajawal', sans-serif;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .error-message {
          background-color: #ffe0e0;
          color: #d00;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        button {
          width: 100%;
          padding: 12px;
          background-color: #2196f3;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }
        
        button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
        
        .signup-link {
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}