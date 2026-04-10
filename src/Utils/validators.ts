import { z } from 'zod';

// ────────────────────────────────────────────────
// BỘ VALIDATORS THÔNG DỤNG TRONG DỰ ÁN REACT NATIVE
// Dùng kèm với React Hook Form + Zod
// ────────────────────────────────────────────────

// 1. EMAIL
export const emailSchema = z
  .string({ message: 'Email không được để trống.' })
  .min(1, 'Email không được để trống.')
  .email('Email không đúng định dạng.');

// 2. MẬT KHẨU (Password)
// Quy tắc: 8+ ký tự, có chữ hoa, chữ thường, số
export const passwordSchema = z
  .string({ message: 'Mật khẩu không được để trống.' })
  .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
  .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa.')
  .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường.')
  .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 chữ số.');

// 3. SỐ ĐIỆN THOẠI (Việt Nam)
const PHONE_VN_REGEX = /^(0[3|5|7|8|9])+([0-9]{8})$/;
export const phoneVNSchema = z
  .string({ message: 'Số điện thoại không được để trống.' })
  .min(1, 'Số điện thoại không được để trống.')
  .regex(PHONE_VN_REGEX, 'Số điện thoại Việt Nam không hợp lệ.');

// 4. TÊN NGƯỜI DÙNG (Full Name)
export const fullNameSchema = z
  .string({ message: 'Họ và tên không được để trống.' })
  .min(2, 'Tên phải có ít nhất 2 ký tự.')
  .max(50, 'Tên không được quá 50 ký tự.')
  .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái.');

// 5. USERNAME (tên đăng nhập)
export const usernameSchema = z
  .string({ message: 'Tên đăng nhập không được để trống.' })
  .min(4, 'Tối thiểu 4 ký tự.')
  .max(20, 'Tối đa 20 ký tự.')
  .regex(/^[a-zA-Z0-9_]+$/, 'Chỉ được chứa chữ, số và dấu gạch dưới (_).')
  .refine((val) => !/^\d/.test(val), {
    message: 'Không được bắt đầu bằng chữ số.',
  });

// 6. URL
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
export const urlSchema = z
  .string({ message: 'URL không được để trống.' })
  .min(1, 'URL không được để trống.')
  .regex(URL_REGEX, 'URL không hợp lệ. (Phải bắt đầu với http:// hoặc https://)');

// 7. NGÀY SINH (Date of Birth) - DD/MM/YYYY
export const dobSchema = z
  .string({ message: 'Ngày sinh không được để trống.' })
  .min(1, 'Ngày sinh không được để trống.')
  .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Định dạng ngày không hợp lệ (DD/MM/YYYY).')
  .refine(
    (val) => {
      const [day, month, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      const now = new Date();
      return date <= now;
    },
    { message: 'Ngày sinh không thể ở tương lai.' }
  )
  .refine(
    (val) => {
      const [day, month, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return age >= 13;
    },
    { message: 'Bạn phải ít nhất 13 tuổi để đăng ký.' }
  )
  .refine(
    (val) => {
      const [day, month, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return age <= 120;
    },
    { message: 'Ngày sinh không hợp lệ.' }
  );

// 8. OTP (Mã xác thực)
export const otpSchema = z
  .string({ message: 'Vui lòng nhập mã OTP.' })
  .length(6, 'Mã OTP phải có đúng 6 chữ số.')
  .regex(/^\d+$/, 'Mã OTP chỉ được chứa chữ số.');

// ================================================================
// COMPOSITE SCHEMAS DÙNG TRONG CÁC SCREEN CHÍNH
// ================================================================

// Schema Login
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginFormData = z.infer<typeof loginSchema>;

// Schema Register
export const registerSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string({ message: 'Vui lòng xác nhận mật khẩu.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp.',
    path: ['confirmPassword'], // Hiển thị lỗi ở field confirmPassword
  });
export type RegisterFormData = z.infer<typeof registerSchema>;

// Schema Update Profile
export const updateProfileSchema = z.object({
  fullName: fullNameSchema,
  phone: phoneVNSchema,
  dob: dobSchema.optional(), // Ngày sinh có thể optional
});
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// Schema Change Password
export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ message: 'Vui lòng nhập mật khẩu hiện tại.' })
      .min(1, 'Mật khẩu không được để trống.'),
    newPassword: passwordSchema,
    confirmNewPassword: z.string({ message: 'Vui lòng xác nhận mật khẩu mới.' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Mật khẩu xác nhận không khớp.',
    path: ['confirmNewPassword'],
  });
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
