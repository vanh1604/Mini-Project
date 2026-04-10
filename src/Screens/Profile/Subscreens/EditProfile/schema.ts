import { z } from 'zod';
import { emailSchema, phoneVNSchema, dobSchema } from '../../../../Utils/validators';

export const editProfileSchema = z.object({
  lastName: z.string().min(1, 'Họ không được để trống.'),
  firstName: z.string().min(1, 'Chữ đệm và tên không được để trống.'),
  dob: dobSchema,
  phone: phoneVNSchema,
  email: emailSchema,
  address: z.string().min(1, 'Địa chỉ liên hệ không được để trống.'),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
