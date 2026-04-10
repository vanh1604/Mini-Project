# 📋 Báo Cáo: Input Validation trong React Native

> **Tác giả:** AI Senior React Native Developer  
> **Cập nhật:** 2026  
> **Mục tiêu:** Hướng dẫn chi tiết các cách setup hàm validate input trong React Native từ cơ bản đến nâng cao.

---

## 📑 Mục Lục

1. [Tổng Quan](#1-tổng-quan)
2. [Cách 1 – Pure JavaScript (Không dùng thư viện)](#2-cách-1--pure-javascript-không-dùng-thư-viện)
3. [Cách 2 – Formik + Yup](#3-cách-2--formik--yup)
4. [Cách 3 – React Hook Form + Zod (Best Practice 2025)](#4-cách-3--react-hook-form--zod-best-practice-2025)
5. [So Sánh Các Phương Pháp](#5-so-sánh-các-phương-pháp)
6. [Các Hàm Validate Thường Gặp](#6-các-hàm-validate-thường-gặp)
7. [UX Best Practices](#7-ux-best-practices)
8. [Kết Luận & Lời Khuyên](#8-kết-luận--lời-khuyên)

---

## 1. Tổng Quan

Trong phát triển ứng dụng mobile, **validation input** là bước cực kỳ quan trọng để:

- ✅ Đảm bảo dữ liệu hợp lệ trước khi gửi lên server
- 🛡️ Bảo vệ khỏi dữ liệu sai format (email sai, mật khẩu yếu, v.v.)
- 🎯 Cải thiện UX bằng cách hiển thị lỗi rõ ràng cho người dùng

> **⚠️ Lưu ý quan trọng:** Client-side validation chỉ là tầng UX. Luôn luôn validate lại ở phía **server/backend** để đảm bảo bảo mật.

### Ba cách tiếp cận phổ biến nhất:

| Phương pháp | Khi nào dùng | Ưu điểm |
|---|---|---|
| **Pure JavaScript** | Form đơn giản, ít field | Không cần install thêm, nhẹ |
| **Formik + Yup** | Đội có kinh nghiệm với Formik | Cấu trúc rõ ràng, quen thuộc |
| **React Hook Form + Zod** | Dự án mới, TypeScript, hiệu suất cao | Best practice 2025, ít re-render nhất |

---

## 2. Cách 1 – Pure JavaScript (Không dùng thư viện)

### Khi nào dùng?
- Form đơn giản (1–3 field)
- Không muốn thêm dependency
- Đang học React Native cơ bản

### Nguyên lý hoạt động

Dùng **React `useState`** để lưu giá trị input và lỗi, sau đó viết các hàm validate thủ công dùng **Regex** hoặc điều kiện logic.

### Ví dụ: Form Login cơ bản

```typescript
// src/utils/validators.ts
// ----------------------------------------------------------------
// Tách hàm validate ra file riêng để tái sử dụng
// ----------------------------------------------------------------

export const validateEmail = (email: string): string => {
  if (!email.trim()) return 'Email không được để trống.';
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email.trim())) return 'Email không đúng định dạng.';
  return ''; // Rỗng = hợp lệ
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Mật khẩu không được để trống.';
  if (password.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự.';
  if (!/[A-Z]/.test(password)) return 'Mật khẩu phải có ít nhất 1 chữ hoa.';
  if (!/[a-z]/.test(password)) return 'Mật khẩu phải có ít nhất 1 chữ thường.';
  if (!/[0-9]/.test(password)) return 'Mật khẩu phải có ít nhất 1 chữ số.';
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone.trim()) return 'Số điện thoại không được để trống.';
  // Số điện thoại Việt Nam: 03x, 05x, 07x, 08x, 09x (10 chữ số)
  const regex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  if (!regex.test(phone.trim())) return 'Số điện thoại không hợp lệ.';
  return '';
};
```

```typescript
// src/screens/LoginScreen.tsx (Áp dụng vào component)
// ----------------------------------------------------------------
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { validateEmail, validatePassword } from '../utils/validators';

const LoginScreen = () => {
  // State lưu giá trị
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State lưu lỗi (object để map lỗi với từng field)
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Validate từng field khi người dùng rời khỏi ô input (onBlur)
  const handleBlur = (field: 'email' | 'password') => {
    const newErrors = { ...errors };
    if (field === 'email') newErrors.email = validateEmail(email);
    if (field === 'password') newErrors.password = validatePassword(password);
    setErrors(newErrors);
  };

  // Validate toàn bộ khi submit
  const handleSubmit = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    // Nếu không có lỗi nào → tiến hành login
    if (!emailError && !passwordError) {
      console.log('Gửi dữ liệu lên server:', { email, password });
    }
  };

  return (
    <View style={styles.container}>
      {/* Email Input */}
      <TextInput
        style={[styles.input, errors.email ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={() => handleBlur('email')}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      {/* Password Input */}
      <TextInput
        style={[styles.input, errors.password ? styles.inputError : null]}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        onBlur={() => handleBlur('password')}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, padding: 12,
    marginBottom: 4, fontSize: 16,
  },
  inputError: { borderColor: '#e74c3c' }, // Viền đỏ khi có lỗi
  errorText: { color: '#e74c3c', fontSize: 13, marginBottom: 8 },
  button: {
    backgroundColor: '#3498db', padding: 14,
    borderRadius: 8, alignItems: 'center', marginTop: 16,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default LoginScreen;
```

### Ưu & Nhược điểm

| ✅ Ưu điểm | ❌ Nhược điểm |
|---|---|
| Không dependencies | Boilerplate code nhiều khi form lớn |
| Kiểm soát hoàn toàn | Dễ bị lộn xộn với nhiều field |
| Dễ hiểu cho người mới | Không có TypeScript type inference tự động |

---

## 3. Cách 2 – Formik + Yup

### Khi nào dùng?
- Form có nhiều field (4+ field)
- Đội đã quen với Formik
- Cần cấu trúc rõ ràng, state management tập trung

### Cài đặt

```bash
npm install formik yup
```

### Nguyên lý hoạt động

- **Formik**: Quản lý toàn bộ state của form (values, errors, touched, isSubmitting)
- **Yup**: Định nghĩa **schema** (quy tắc) validate — Formik sẽ tự gọi Yup để kiểm tra

```
Form Submit
    │
    ▼
Formik nhận values
    │
    ▼
Yup kiểm tra theo schema
    │
    ├── Hợp lệ → gọi onSubmit()
    └── Không hợp lệ → set errors → UI hiển thị lỗi
```

### Ví dụ: Form Đăng Ký

```typescript
// src/screens/RegisterScreen.tsx
import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// ----------------------------------------------------------------
// 1. Định nghĩa Schema validate với Yup
// ----------------------------------------------------------------
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Tên quá ngắn (tối thiểu 2 ký tự).')
    .max(50, 'Tên quá dài (tối đa 50 ký tự).')
    .required('Họ và tên không được để trống.'),

  email: Yup.string()
    .email('Email không đúng định dạng.')
    .required('Email không được để trống.'),

  password: Yup.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
    .matches(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa.')
    .matches(/[0-9]/, 'Phải có ít nhất 1 chữ số.')
    .required('Mật khẩu không được để trống.'),

  confirmPassword: Yup.string()
    // .oneOf: kiểm tra giá trị phải giống với field 'password'
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp.')
    .required('Vui lòng xác nhận mật khẩu.'),
});

// ----------------------------------------------------------------
// 2. Component có tái sử dụng (Reusable Input)
// ----------------------------------------------------------------
interface InputFieldProps {
  label: string;
  error?: string;
  touched?: boolean;
  // Các props khác của TextInput
  [key: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, touched, ...rest }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, touched && error ? styles.inputError : null]}
      {...rest}
    />
    {/* Chỉ hiện lỗi khi user đã chạm vào field (touched) */}
    {touched && error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

// ----------------------------------------------------------------
// 3. Screen chính dùng Formik
// ----------------------------------------------------------------
const RegisterScreen = () => {
  return (
    <Formik
      initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(values, actions) => {
        console.log('Dữ liệu hợp lệ:', values);
        actions.setSubmitting(false);
      }}
    >
      {/* Formik cung cấp toàn bộ state và helpers qua render prop */}
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <InputField
            label="Họ và tên"
            value={values.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            error={errors.fullName}
            touched={touched.fullName}
          />
          <InputField
            label="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label="Mật khẩu"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            secureTextEntry
          />
          <InputField
            label="Xác nhận mật khẩu"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
```

### Ưu & Nhược điểm

| ✅ Ưu điểm | ❌ Nhược điểm |
|---|---|
| Khai báo rõ ràng, dễ đọc | Nhiều re-render hơn (controlled component) |
| Schema validate tập trung một chỗ | Nặng hơn React Hook Form |
| Hỗ trợ touched/dirty/isSubmitting sẵn | Chậm với form cực lớn |

---

## 4. Cách 3 – React Hook Form + Zod (Best Practice 2025)

### Khi nào dùng?
- **Dự án mới** (đặc biệt là TypeScript)
- Form lớn, nhiều field
- Cần hiệu năng tốt nhất (ít re-render)
- Muốn dùng type inference tự động từ schema

### Cài đặt

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Tại sao đây là Best Practice 2025?

```
React Hook Form (RHF)           Zod
─────────────────────    ─────────────────────
Quản lý state form       Định nghĩa schema + type
Dùng uncontrolled        Validate với TypeScript
components (ref)         type inference tự động
→ Ít re-render nhất      → An toàn kiểu dữ liệu
         │                        │
         └────────────┬───────────┘
                      │
              @hookform/resolvers
              (Bridge kết nối hai bên)
```

**Điểm khác biệt cốt lõi:** RHF dùng **uncontrolled components** (refs), không trigger re-render mỗi lần user gõ → hiệu năng vượt trội trên mobile.

### Ví dụ: Form Login đầy đủ

```typescript
// src/screens/LoginScreen.tsx
import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ----------------------------------------------------------------
// 1. Định nghĩa Schema bằng Zod
// ----------------------------------------------------------------
const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email không được để trống.' })
    .min(1, 'Email không được để trống.')
    .email('Email không đúng định dạng.'),

  password: z
    .string({ required_error: 'Mật khẩu không được để trống.' })
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
    .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa.')
    .regex(/[0-9]/, 'Phải có ít nhất 1 chữ số.'),
});

// ----------------------------------------------------------------
// 2. TypeScript type tự động suy ra từ Schema (không cần định nghĩa lại)
// ----------------------------------------------------------------
type LoginFormData = z.infer<typeof loginSchema>;
// Tương đương với:
// type LoginFormData = { email: string; password: string; }

// ----------------------------------------------------------------
// 3. Reusable Controlled Input Component
// ----------------------------------------------------------------
interface ControlledInputProps {
  label: string;
  error?: string;
  [key: string]: any;
}

const ControlledInput: React.FC<ControlledInputProps> = ({ label, error, ...rest }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error ? styles.inputError : null]}
      placeholderTextColor="#aaa"
      {...rest}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

// ----------------------------------------------------------------
// 4. Screen chính
// ----------------------------------------------------------------
const LoginScreen = () => {
  const {
    control,          // Kết nối input với RHF
    handleSubmit,     // Wrapper cho hàm submit
    formState: { errors, isSubmitting }, // Lấy errors và trạng thái submit
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Kết nối schema Zod vào RHF
    mode: 'onBlur',   // Validate khi user rời khỏi field (UX tốt nhất)
  });

  const onSubmit = (data: LoginFormData) => {
    // data ở đây đã được validate và có đúng type LoginFormData
    console.log('Đăng nhập với:', data);
    // Gọi API ở đây...
  };

  return (
    <View style={styles.container}>
      {/* Controller là cầu nối giữa RHF và TextInput của React Native */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <ControlledInput
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <ControlledInput
            label="Mật khẩu"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Ví dụ nâng cao: Form Đăng Ký với `refine` (validate liên field)

```typescript
// Validate xác nhận mật khẩu (cross-field validation)
const registerSchema = z
  .object({
    email: z.string().email('Email không hợp lệ.'),
    password: z
      .string()
      .min(8, 'Tối thiểu 8 ký tự.')
      .regex(/[A-Z]/, 'Phải có chữ hoa.')
      .regex(/[0-9]/, 'Phải có chữ số.')
      .regex(/[!@#$%^&*]/, 'Phải có ký tự đặc biệt (!@#$%^&*).'),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Mật khẩu xác nhận không khớp.',
      path: ['confirmPassword'], // Lỗi sẽ hiện ở field confirmPassword
    }
  );
```

### Ưu & Nhược điểm

| ✅ Ưu điểm | ❌ Nhược điểm |
|---|---|
| Hiệu năng tốt nhất (ít re-render) | Cần cài thêm 3 packages |
| TypeScript type-safe hoàn toàn | Cần học `Controller` wrapper |
| Dễ chia sẻ schema giữa FE và BE | Khái niệm `uncontrolled` khó hiểu ban đầu |
| Hệ sinh thái lớn, cộng đồng mạnh | — |

---

## 5. So Sánh Các Phương Pháp

| Tiêu chí | Pure JS | Formik + Yup | RHF + Zod |
|---|:---:|:---:|:---:|
| Hiệu năng (re-renders) | ⚡ Trung bình | 🐢 Chậm hơn | 🚀 Nhanh nhất |
| TypeScript Type Safety | ❌ Thủ công | ⚠️ Cần manual type | ✅ Tự động từ schema |
| Phù hợp form nhỏ | ✅ Rất tốt | ✅ Tốt | ⚠️ Hơi "over-engineered" |
| Phù hợp form lớn | ❌ Khó maintain | ✅ Tốt | ✅ Rất tốt |
| Reusable schema | ❌ | ⚠️ Yup (giới hạn) | ✅ Zod (dùng cả BE) |
| Bundle size | ✅ 0KB | ⚠️ ~15KB | ✅ ~12KB |
| Learning curve | ✅ Thấp | ⚠️ Trung bình | ⚠️ Trung bình |
| Khuyến nghị 2025 | Form đơn giản | Legacy / existing | ✅ **Dự án mới** |

---

## 6. Các Hàm Validate Thường Gặp

Đây là bộ sưu tập các pattern validate phổ biến, có thể dùng trong cả 3 cách trên.

```typescript
// src/utils/validators.ts
// ================================================================
// BỘ VALIDATORS THÔNG DỤNG TRONG DỰ ÁN REACT NATIVE
// ================================================================

// ────────────────────────────────────────────────
// 1. EMAIL
// ────────────────────────────────────────────────
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const validateEmail = (email: string): string => {
  if (!email.trim()) return 'Email không được để trống.';
  if (!EMAIL_REGEX.test(email.trim())) return 'Email không đúng định dạng.';
  return '';
};

// ────────────────────────────────────────────────
// 2. MẬT KHẨU (Password)
// Quy tắc: 8+ ký tự, có chữ hoa, chữ thường, số
// ────────────────────────────────────────────────
export const validatePassword = (password: string): string => {
  if (!password) return 'Mật khẩu không được để trống.';
  if (password.length < 8) return 'Tối thiểu 8 ký tự.';
  if (!/[A-Z]/.test(password)) return 'Cần ít nhất 1 chữ hoa (A-Z).';
  if (!/[a-z]/.test(password)) return 'Cần ít nhất 1 chữ thường (a-z).';
  if (!/[0-9]/.test(password)) return 'Cần ít nhất 1 chữ số (0-9).';
  return '';
};

// Nâng cao: Kiểm tra độ mạnh mật khẩu
export type PasswordStrength = 'weak' | 'medium' | 'strong';
export const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
};

// ────────────────────────────────────────────────
// 3. SỐ ĐIỆN THOẠI (Việt Nam)
// - Chuẩn VN: 10 số, bắt đầu 03x, 05x, 07x, 08x, 09x
// ────────────────────────────────────────────────
export const PHONE_VN_REGEX = /^(0[3|5|7|8|9])+([0-9]{8})$/;
export const validatePhoneVN = (phone: string): string => {
  const cleaned = phone.replace(/\s/g, ''); // Bỏ khoảng trắng
  if (!cleaned) return 'Số điện thoại không được để trống.';
  if (!PHONE_VN_REGEX.test(cleaned)) return 'Số điện thoại Việt Nam không hợp lệ.';
  return '';
};

// ────────────────────────────────────────────────
// 4. TÊN NGƯỜI DÙNG (Full Name)
// ────────────────────────────────────────────────
export const validateFullName = (name: string): string => {
  if (!name.trim()) return 'Họ và tên không được để trống.';
  if (name.trim().length < 2) return 'Tên phải có ít nhất 2 ký tự.';
  if (name.trim().length > 50) return 'Tên không được quá 50 ký tự.';
  // Chỉ cho phép chữ, khoảng trắng, và ký tự có dấu
  if (/[^a-zA-ZÀ-ỹ\s]/.test(name.trim())) return 'Tên chỉ được chứa chữ cái.';
  return '';
};

// ────────────────────────────────────────────────
// 5. USERNAME (tên đăng nhập)
// Quy tắc: 4-20 ký tự, chữ/số/gạch dưới, không bắt đầu bằng số
// ────────────────────────────────────────────────
export const validateUsername = (username: string): string => {
  if (!username) return 'Tên đăng nhập không được để trống.';
  if (username.length < 4) return 'Tối thiểu 4 ký tự.';
  if (username.length > 20) return 'Tối đa 20 ký tự.';
  if (/^\d/.test(username)) return 'Không được bắt đầu bằng chữ số.';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Chỉ được chứa chữ, số và dấu gạch dưới (_).';
  return '';
};

// ────────────────────────────────────────────────
// 6. URL
// ────────────────────────────────────────────────
export const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
export const validateUrl = (url: string): string => {
  if (!url.trim()) return 'URL không được để trống.';
  if (!URL_REGEX.test(url.trim())) return 'URL không hợp lệ. (Phải bắt đầu với http:// hoặc https://)';
  return '';
};

// ────────────────────────────────────────────────
// 7. NGÀY SINH (Date of Birth)
// ────────────────────────────────────────────────
export const validateDateOfBirth = (dob: string): string => {
  // Định dạng mong đợi: DD/MM/YYYY
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dob) return 'Ngày sinh không được để trống.';
  if (!regex.test(dob)) return 'Định dạng ngày không hợp lệ (DD/MM/YYYY).';

  const [day, month, year] = dob.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const now = new Date();

  if (date > now) return 'Ngày sinh không thể ở tương lai.';

  const age = now.getFullYear() - date.getFullYear();
  if (age < 13) return 'Bạn phải ít nhất 13 tuổi để đăng ký.';
  if (age > 120) return 'Ngày sinh không hợp lệ.';
  return '';
};

// ────────────────────────────────────────────────
// 8. OTP (Mã xác thực)
// ────────────────────────────────────────────────
export const validateOtp = (otp: string, length = 6): string => {
  if (!otp) return 'Vui lòng nhập mã OTP.';
  if (otp.length !== length) return `Mã OTP phải có đúng ${length} chữ số.`;
  if (!/^\d+$/.test(otp)) return 'Mã OTP chỉ được chứa chữ số.';
  return '';
};

// ────────────────────────────────────────────────
// 9. CONFIRM PASSWORD (So khớp mật khẩu)
// ────────────────────────────────────────────────
export const validateConfirmPassword = (password: string, confirm: string): string => {
  if (!confirm) return 'Vui lòng xác nhận mật khẩu.';
  if (password !== confirm) return 'Mật khẩu xác nhận không khớp.';
  return '';
};
```

---

## 7. UX Best Practices

### 7.1. Timing của Validation

| Thời điểm | Props dùng | Mô tả | Khuyến nghị |
|---|---|---|:---:|
| Khi gõ từng ký tự | `onChangeText` | Validate liên tục | ❌ Gây khó chịu |
| Khi rời khỏi field | `onBlur` | Validate khi mất focus | ✅ **Tốt nhất** |
| Khi nhấn Submit | `onPress` | Validate tất cả field | ✅ Bắt buộc phải có |

```typescript
// ✅ Pattern tốt: Validate khi blur, không phải khi đang gõ
<TextInput
  onBlur={() => validateField('email')}    // ← Validate khi rời field
  onChangeText={(text) => setEmail(text)}  // ← Chỉ lưu giá trị khi gõ
/>
```

### 7.2. Hiển thị Lỗi Hiệu Quả

```typescript
// ✅ Tốt: Chỉ hiện lỗi sau khi user đã tương tác (touched)
{touched.email && errors.email && (
  <Text style={styles.error}>{errors.email}</Text>
)}

// ❌ Tránh: Hiện lỗi ngay khi mở form (chưa gõ gì)
{errors.email && (
  <Text style={styles.error}>{errors.email}</Text>
)}
```

### 7.3. Visual Feedback (Feedback Trực Quan)

```typescript
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',    // Mặc định: xám
    borderRadius: 8,
    padding: 12,
  },
  inputError: {
    borderColor: '#e74c3c', // Lỗi: đỏ
    backgroundColor: '#fff5f5',
  },
  inputSuccess: {
    borderColor: '#27ae60', // Hợp lệ: xanh lá
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
});
```

### 7.4. Disable Submit khi Đang Xử Lý

```typescript
<TouchableOpacity
  disabled={isSubmitting || isLoading}
  style={[
    styles.button,
    (isSubmitting || isLoading) && styles.buttonDisabled
  ]}
  onPress={handleSubmit}
>
  <Text>{isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}</Text>
</TouchableOpacity>
```

### 7.5. Accessibility (Tiếp Cận)

```typescript
<TextInput
  accessibilityLabel="Nhập địa chỉ email"
  accessibilityHint="Email dùng để đăng nhập vào tài khoản"
  /* Thông báo lỗi cho screen reader */
  accessibilityRole="none"
/>
{errors.email && (
  <Text
    accessibilityLiveRegion="polite" // Screen reader đọc khi có lỗi mới
    style={styles.errorText}
  >
    {errors.email}
  </Text>
)}
```

---

## 8. Kết Luận & Lời Khuyên

### 🎯 Chọn phương pháp nào?

```
Bạn đang làm gì?
│
├── Học React Native cơ bản, form đơn giản
│   └── ✅ Cách 1: Pure JavaScript
│
├── Dự án have sẵn dùng Formik, hoặc thích structured approach
│   └── ✅ Cách 2: Formik + Yup
│
└── Dự án mới, dùng TypeScript, cần hiệu suất tốt nhất
    └── 🚀 Cách 3: React Hook Form + Zod (KHUYẾN NGHỊ)
```

### 📋 Checklist Validation Cho Mọi Dự Án

- [ ] **Tách hàm validate ra file riêng** (`src/utils/validators.ts`)
- [ ] **Validate khi `onBlur`**, không phải `onChangeText`
- [ ] **Luôn validate khi submit**, dù đã validate on blur
- [ ] **Hiển thị lỗi rõ ràng**, cụ thể (không dùng "Input không hợp lệ")
- [ ] **Visual feedback**: Đổi màu viền input khi lỗi
- [ ] **Disable button** khi đang submitting
- [ ] **Backend validation**: Không bao giờ chỉ dựa vào client-side
- [ ] **Test các edge case**: Chuỗi rỗng, có khoảng trắng, ký tự đặc biệt

### 📦 Cài đặt khuyến nghị cho dự án này (miniProject)

Dự án hiện tại đang dùng **TypeScript + React Native 0.84**, nên khuyến nghị:

```bash
# Cài React Hook Form + Zod (Best Practice 2025)
npm install react-hook-form zod @hookform/resolvers

# Nếu muốn dùng Formik (thay thế)
npm install formik yup
```

### 🔗 Tài Liệu Tham Khảo

| Tài liệu | Link |
|---|---|
| React Hook Form Docs | https://react-hook-form.com |
| Zod Docs | https://zod.dev |
| Formik Docs | https://formik.org |
| Yup GitHub | https://github.com/jquense/yup |
| LogRocket: RHF vs Formik | https://blog.logrocket.com |
| Dev.to: RN Validation Guide | https://dev.to |

---

*Báo cáo này được tổng hợp từ tài liệu chính thức và cộng đồng React Native (Stack Overflow, GitHub Discussions, Medium, Dev.to) — Cập nhật tháng 4/2026.*
