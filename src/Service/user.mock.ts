export interface UserProfile {
  employeeId: string;
  fullName: string;
  department: string;
  position: string;
  status: 'working' | 'resigned';
  dob: string;
  phone: string;
  email: string;
  address: string;
}

export const mockUserProfile: UserProfile = {
  employeeId: 'VNPOST123',
  fullName: 'NGUYỄN THỊ KHÁNH DƯƠNG',
  department: 'Phòng Phát triển và tích hợp, Trung tâm Đổi mới sáng tạo, Cơ quan Tổng công ty Bưu điện Việt Nam',
  position: 'Chuyên viên thiết kế UI/UX',
  status: 'working',
  dob: '26/12/2000',
  phone: '0912678900',
  email: 'ntkd02@vnpost.vn',
  address: 'Số 5, Phạm Hùng, P. Mỹ Đình, Q. Nam Từ Liêm, Hà Nội',
};
