# Báo cáo chi tiết: Kỹ thuật Scaling trong React Native

> **Trạng thái:** Đã verify lại toàn bộ kiến thức và bổ sung giải thích chi tiết.

---

## 1. Vấn đề gốc rễ: Tại sao cần Scaling?

### 1.1. Sự đa dạng màn hình là thách thức lớn nhất

Một App React Native chạy trên hàng trăm loại thiết bị khác nhau. Điểm khác nhau giữa chúng:

| Thiết bị | Logical Width (pt) | Logical Height (pt) | Pixel Density |
|---|---|---|---|
| iPhone SE (2022) | 375 | 667 | @2x (750 x 1334 pixels thật) |
| iPhone 13 mini | 375 | 812 | @3x (1125 x 2436 pixels thật) |
| iPhone 16 Pro | 402 | 874 | @3x |
| Samsung Galaxy S24 | 360 | 780 | @3x |
| iPad Pro 12.9" | 1024 | 1366 | @2x |

> **Lưu ý quan trọng:** React Native dùng đơn vị **pt (point/logical pixel)**, KHÔNG phải pixel vật lý. `Dimensions.get('window')` cũng trả về giá trị theo **pt**. Số pt đã được React Native tự động quy đổi từ pixel thật dựa trên pixel ratio của máy.

### 1.2. "Code cứng" gây ra vấn đề gì?

Giả sử Designer thiết kế Header có `height: 60` trên frame 375pt.

- **Trên iPhone 13 mini (375pt):** Trông OK.
- **Trên iPad (1024pt):** Header 60pt chỉ chiếm 60/1024 ≈ **5.8%** chiều rộng màn hình → trông quá nhỏ bé, xấu.
- **Trên iPhone SE (375pt) nhưng chiều cao chỉ 667pt:** Nếu có nhiều header fixed-height, nội dung tràn ra ngoài.

Scaling giải quyết bài toán này bằng cách **biến giá trị tĩnh thành giá trị động** theo màn hình thực tế.

---

## 2. Phân tích file `src/Utils/scaling.ts`

### 2.1. Mã nguồn thực tế

```typescript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 838;  // ← Lưu ý: 838, không phải 812

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
```

> ⚠️ **Đính chính quan trọng:** Báo cáo cũ ghi `guidelineBaseHeight = 812` (chiều cao của iPhone X/11), nhưng trong code thực tế của dự án, giá trị là **838**. Đây là chiều cao *window* (không tính thanh status bar hay navigation bar) của một số dòng máy. Luôn kiểm tra file thực tế để tránh nhầm lẫn.

### 2.2. `Dimensions.get('window')` hoạt động thế nào?

```typescript
const { width, height } = Dimensions.get('window');
```

- **`'window'`** vs **`'screen'`**:
  - `'screen'`: Toàn bộ kích thước màn hình vật lý (tính cả status bar).
  - `'window'`: Vùng *usable* của App – thường nhỏ hơn `screen` trên Android (không tính system UI).
- Giá trị này được đọc **một lần duy nhất** khi module được import. Nếu thiết bị xoay ngang/dọc sau đó, `width`/`height` trong file này **KHÔNG tự cập nhật**.
  - Để có giá trị realtime khi rotate, phải dùng `Dimensions.addEventListener('change', ...)` hoặc hook `useWindowDimensions()`.

---

## 3. Giải thích sâu từng hàm Scaling

### 3.1. `scale(size)` — Tỷ lệ chiều ngang

**Công thức:** `(width / guidelineBaseWidth) * size`

**Cơ chế hoạt động:**

```
Tỷ lệ = Chiều rộng thực tế / Chiều rộng thiết kế chuẩn
Kết quả = Tỷ lệ × Kích thước thiết kế
```

**Ví dụ số học với button `width: 100`:**

| Thiết bị | width (pt) | Tỷ lệ (ratio) | scale(100) |
|---|---|---|---|
| iPhone SE | 375 | 375/375 = **1.000** | **100.0 pt** |
| iPhone 13 Pro | 390 | 390/375 = **1.040** | **104.0 pt** |
| iPhone 16 Pro Max | 440 | 440/375 = **1.173** | **117.3 pt** |
| iPad Pro | 1024 | 1024/375 = **2.731** | **273.1 pt** |

**Nhận xét:** Với iPad, button bị scale lên 273pt – rất hợp lý cho layout tablet. Đây là hành vi của `scale` 100%.

**Dùng cho:** `width`, `minWidth`, `maxWidth`, `marginHorizontal`, `paddingHorizontal`, `left`, `right`, icon size, border width.

---

### 3.2. `verticalScale(size)` — Tỷ lệ chiều dọc

**Công thức:** `(height / guidelineBaseHeight) * size`

**Ví dụ số học với icon `height: 50`:**

Giả sử `guidelineBaseHeight = 838`.

| Thiết bị | height (pt) | Tỷ lệ (ratio) | verticalScale(50) |
|---|---|---|---|
| iPhone SE | 667 | 667/838 = **0.796** | **39.8 pt** |
| iPhone 13 mini | 812 | 812/838 = **0.969** | **48.5 pt** |
| iPhone 15 | 852 | 852/838 = **1.017** | **50.8 pt** |
| iPhone 15 Pro Max | 932 | 932/838 = **1.112** | **55.6 pt** |

**Nhận xét:** Trên iPhone SE màn hình ngắn, height bị scale xuống (~40pt) – giúp tránh tràn layout. Trên Pro Max màn hình dài, height lớn hơn – tận dụng không gian.

**Dùng cho:** `height`, `minHeight`, `maxHeight`, `marginVertical`, `paddingVertical`, `top`, `bottom`.

> ⚠️ **Cảnh báo:** Đừng dùng cả `scale` lẫn `verticalScale` cho width/height của cùng một element hình vuông hoặc hình tròn. Vì tỷ lệ W/H của mỗi thiết bị khác nhau, element sẽ bị **méo**.

---

### 3.3. `moderateScale(size, factor)` — Tỷ lệ "phanh" (điều tiết)

**Công thức:** `size + (scale(size) - size) * factor`

**Giải phẫu công thức từng bước:**

```
Bước 1: scale(size)         → Kết quả nếu scale 100% theo chiều ngang
Bước 2: scale(size) - size  → Phần "tăng thêm" so với kích thước gốc
                               (có thể âm nếu màn hình nhỏ hơn chuẩn)
Bước 3: ... * factor        → Chỉ lấy một phần của "tăng thêm" đó
Bước 4: size + ...          → Cộng vào kích thước gốc
```

**Ví dụ số học với `fontSize: 16`, trên iPhone 16 Pro Max (width=440):**

```
scale(16) = (440/375) * 16 = 18.77 pt
Tăng thêm = 18.77 - 16 = 2.77 pt

moderateScale(16, 0.3):
  → 16 + 2.77 * 0.3 = 16 + 0.83 = 16.83 pt   ← tăng nhẹ

moderateScale(16, 0.5):   ← mặc định
  → 16 + 2.77 * 0.5 = 16 + 1.39 = 17.39 pt   ← tăng vừa

moderateScale(16, 0.8):
  → 16 + 2.77 * 0.8 = 16 + 2.22 = 18.22 pt   ← tăng nhiều

scale(16):                 ← scale 100%
  → 18.77 pt               ← tăng mạnh nhất
```

**Bảng so sánh kết quả với `fontSize: 16` trên các thiết bị:**

| Thiết bị | `scale(16)` | `moderateScale(16, 0.3)` | `moderateScale(16, 0.5)` |
|---|---|---|---|
| iPhone SE (375pt) | 16.0 pt | 16.0 pt | 16.0 pt |
| iPhone 13 Pro (390pt) | 16.64 pt | 16.19 pt | 16.32 pt |
| iPad Pro (1024pt) | **43.6 pt** | **25.5 pt** | **29.8 pt** |

**Nhận xét:** Trên iPad, `scale` thuần túy cho ra fontSize **43.6pt** – cực kỳ to và khó đọc. `moderateScale(16, 0.3)` cho ra **25.5pt** – hợp lý hơn nhiều.

**Tại sao `factor = 0.5` là mặc định?**

Đây là con số **kinh nghiệm thực chiến** của cộng đồng React Native (bắt nguồn từ thư viện `react-native-size-matters`). `0.5` có nghĩa là font chỉ scale **50% tốc độ** so với scale thông thường – đủ để thấy sự co giãn nhẹ nhàng giữa các máy cùng kích thước, nhưng không bị "quá đà" trên tablet/máy lớn.

**Dùng cho:** `fontSize`, `lineHeight`, icon size (khi không muốn scale quá mạnh), `margin`/`padding` nhỏ.

---

## 4. Best Practices (Kiểm chứng và mở rộng)

### 4.1. Ưu tiên Flexbox cho Layout động

```tsx
// ✅ ĐÚNG: Dùng Flexbox cho layout chính
<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
  {/* Flexbox tự chia đều không gian */}
</View>

// ❌ SAI: Scale toàn bộ container
<View style={{ width: scale(375), height: verticalScale(812) }}>
  {/* Sẽ bị conflict với layout thực tế */}
</View>
```

**Lý do:** Flexbox là hệ thống layout *tương đối* đã được tối ưu sẵn trong React Native. Dùng Scaling cho layout sẽ tạo ra các giá trị *tuyệt đối* không cần thiết và làm mất đi tính linh hoạt của Flexbox.

### 4.2. Rules cho Hình vuông và Hình tròn

```tsx
// ✅ ĐÚNG: Dùng cùng một hàm cho cả width và height
const AVATAR_SIZE = scale(50); // hoặc moderateScale(50)

<Image style={{
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,       // ← cùng giá trị với width
  borderRadius: AVATAR_SIZE / 2, // → luôn là hình tròn hoàn hảo
}} />

// ❌ SAI: Dùng hai hàm khác nhau
<Image style={{
  width: scale(50),
  height: verticalScale(50), // → width ≠ height trên mọi máy → méo hình
  borderRadius: 25,          // → sẽ không phải hình tròn
}} />
```

### 4.3. Typography (Font chữ)

```tsx
// ✅ ĐÚNG: moderateScale với factor nhỏ cho text
<Text style={{ fontSize: moderateScale(16, 0.3) }} />

// ❌ TRÁNH: scale thuần cho fontSize → quá to trên iPad
<Text style={{ fontSize: scale(16) }} />

// ❌ TRÁNH: verticalScale cho fontSize → logic sai (font không liên quan chiều cao)
<Text style={{ fontSize: verticalScale(16) }} />
```

**Gợi ý factor theo loại typography:**

| Loại text | Factor gợi ý | Lý do |
|---|---|---|
| Caption, label nhỏ | 0.2 – 0.3 | Scale rất ít, đảm bảo dễ đọc trên mọi máy |
| Body text | 0.3 – 0.5 | Cân bằng giữa readability và responsiveness |
| Heading, Title | 0.5 – 0.7 | Title cần scale nhiều hơn để nổi bật trên màn hình lớn |

### 4.4. Đồng bộ với Designer (Critical!)

```typescript
// Trong scaling.ts, phải khớp với frame Designer dùng trên Figma
const guidelineBaseWidth = 375;   // ← Figma frame width là bao nhiêu?
const guidelineBaseHeight = 838;  // ← Figma frame height (usable area) là bao nhiêu?
```

| Thiết bị làm chuẩn | Base Width | Base Height (screen) | Base Height (window/usable) |
|---|---|---|---|
| iPhone X / 11 | 375 | 812 | ~736 |
| iPhone 13 / 14 | 390 | 844 | ~759 |
| iPhone 15 | 393 | 852 | ~759 |
| Pixel 7 (Android) | 412 | 915 | ~869 |

> **Dự án hiện tại** dùng `guidelineBaseHeight = 838`, gần với `window height` của các máy iPhone 15/15 Pro hoặc iPhone 14 Pro.

### 4.5. Lưu ý về Rotation (Xoay màn hình)

File `scaling.ts` đọc `Dimensions` **một lần** lúc khởi động:

```typescript
// Giá trị này tĩnh, không tự cập nhật khi xoay màn hình
const { width, height } = Dimensions.get('window');
```

Nếu App cần hỗ trợ landscape (xoay ngang), nên dùng:

```typescript
// ✅ Hook tự cập nhật khi rotate
import { useWindowDimensions } from 'react-native';

const MyComponent = () => {
  const { width, height } = useWindowDimensions();
  // Tính toán tỷ lệ ở đây
};
```

Tuy nhiên, đối với App chỉ dùng portrait (dọc) như hầu hết mobile app, cách dùng static `Dimensions.get('window')` là hoàn toàn phù hợp và hiệu quả hơn.

---

## 5. Khi nào KHÔNG nên dùng Scaling?

| Trường hợp | Lý do |
|---|---|
| `flex: 1` hoặc `flexGrow` | Flexbox tự tính, không cần scale |
| `position: 'absolute'` với `top: 0, left: 0` | Giá trị 0 không scale |
| `borderWidth: 1` (đường viền mỏng) | 1pt luôn là 1pt, scale sẽ không thấy khác biệt |
| Giá trị từ API/data (ví dụ kích thước ảnh từ server) | Nên dùng `resizeMode` thay vì scale |
| `%` (phần trăm) | React Native hỗ trợ `width: '50%'`, tự responsive |

---

## 6. Kiểm tra nhanh trong dự án

Chạy lệnh sau để xem đang dùng `scale`, `verticalScale`, `moderateScale` ở những đâu:

```bash
# Tìm tất cả file đang dùng scaling
grep -rn "scale(" src/ --include="*.tsx" --include="*.ts" | grep -v "verticalScale\|moderateScale"  # chỉ scale()
grep -rn "moderateScale(" src/ --include="*.tsx" --include="*.ts"  # moderateScale
grep -rn "verticalScale(" src/ --include="*.tsx" --include="*.ts"  # verticalScale
```
