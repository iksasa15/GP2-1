// src/app/signup/page.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Patient from "../../../models/Patient";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // التحقق من تطابق كلمة المرور
      if (formData.password !== formData.confirmPassword) {
        throw new Error("كلمة المرور وتأكيدها غير متطابقين");
      }

      // استخدام دالة التسجيل من كلاس المريض
      await Patient.register(
        formData.patientName,
        formData.email,
        formData.password,
        formData.phoneNumber,
        formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
        formData.gender
      );

      // التوجيه للصفحة الرئيسية بعد التسجيل الناجح
      router.push("/");
    } catch (err: unknown) {
      console.error("خطأ في التسجيل:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("حدث خطأ أثناء إنشاء الحساب");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>إنشاء حساب جديد</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientName">الاسم الكامل</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        
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
            minLength={6}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phoneNumber">رقم الهاتف</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dateOfBirth">تاريخ الميلاد</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gender">الجنس</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">اختر الجنس</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "جاري التسجيل..." : "إنشاء حساب"}
        </button>
      </form>
      
      <div className="login-link">
        لديك حساب بالفعل؟ <Link href="/login">تسجيل الدخول</Link>
      </div>
      
      <style jsx>{`
        .signup-container {
          max-width: 500px;
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
        
        input, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        button {
          width: 100%;
          padding: 12px;
          background-color: #4caf50;
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
        
        .login-link {
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}