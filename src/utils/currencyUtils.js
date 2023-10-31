export function formatVND(int) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(int);
}
