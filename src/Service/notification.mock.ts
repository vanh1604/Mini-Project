export interface NotificationAction {
  label: string;
  actionType?: string;
}

export interface Notification {
  id: string;
  type: 'security' | 'leave_request' | 'mention' | 'meeting' | 'system';
  icon: string;
  title: string;
  details: string;
  timeLabel: string;
  timestamp: string;
  isRead: boolean;
  action?: NotificationAction;
}

export interface NotificationSection {
  title: string;
  data: Notification[];
}

export const mockNotifications: NotificationSection[] = [
  {
    title: 'Hôm nay',
    data: [
      {
        id: '1',
        type: 'security',
        icon: 'lock',
        title: 'Mật khẩu của bạn hết hạn trong 2 ngày',
        details:
          'Vui lòng thay đổi mật khẩu của bạn để tiếp tục sử dụng dịch vụ',
        timeLabel: '2 giờ trước',
        timestamp: new Date(
          new Date().getTime() - 2 * 60 * 60 * 1000,
        ).toISOString(),
        isRead: false,
      },
      {
        id: '2',
        type: 'leave_request',
        icon: 'document-normal',
        title: 'Bạn đang có 3 ngày nghỉ không phép',
        details:
          'Vui lòng giải trình chấm công và liên hệ lãnh đạo ban/phòng để được giải quyết',
        timeLabel: '4 tiếng trước',
        timestamp: new Date(
          new Date().getTime() - 4 * 60 * 60 * 1000,
        ).toISOString(),
        isRead: false,
        action: {
          label: 'Giải trình ngay',
          actionType: 'navigate_explanation',
        },
      },
      {
        id: '3',
        type: 'mention',
        icon: 'messages',
        title: 'Huyền ICT nhắc tới bạn trong 1 bình luận',
        details:
          'Vui lòng giải trình chấm công và liên hệ lãnh đạo ban/phòng để được giải quyết',
        timeLabel: '10 tiếng trước',
        timestamp: new Date(
          new Date().getTime() - 10 * 60 * 60 * 1000,
        ).toISOString(),
        isRead: true,
      },
    ],
  },
  {
    title: 'Thứ 6, 06/09/2025',
    data: [
      {
        id: '4',
        type: 'meeting',
        icon: 'menu-board',
        title: 'Lịch họp với Nguyễn Văn Tuyền - TT ĐMST đã có thay đổi',
        details:
          'Vui lòng thay đổi mật khẩu của bạn để tiếp tục sử dụng dịch vụ',
        timeLabel: '2 giờ trước',
        timestamp: '2025-09-06T10:00:00Z',
        isRead: true,
      },
      {
        id: '5',
        type: 'leave_request',
        icon: 'document-normal',
        title: 'Bạn đang có 3 ngày nghỉ không phép',
        details:
          'Vui lòng giải trình chấm công và liên hệ lãnh đạo ban/phòng để được giải quyết',
        timeLabel: '4 tiếng trước',
        timestamp: '2025-09-06T08:00:00Z',
        isRead: true,
        action: {
          label: 'Giải trình ngay',
          actionType: 'navigate_explanation',
        },
      },
      {
        id: '6',
        type: 'mention',
        icon: 'messages',
        title: 'Huyền ICT nhắc tới bạn trong 1 bình luận',
        details:
          'Vui lòng giải trình chấm công và liên hệ lãnh đạo ban/phòng để được giải quyết',
        timeLabel: '10 tiếng trước',
        timestamp: '2025-09-06T02:00:00Z',
        isRead: true,
      },
    ],
  },
];
