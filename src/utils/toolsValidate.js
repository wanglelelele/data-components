/**
 * 工具类集合
 */

/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
export function verifyPhone(val) {
  // false: 手机号码不正确
  if (!/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(val)) return false;
  // true: 手机号码正确
  else return true;
}

/**
 * 国内电话号码
 * @param val 当前值字符串
 * @returns 返回 true: 国内电话号码正确
 */
export function verifyTelPhone(val) {
  // false: 国内电话号码不正确
  if (!/\d{3}-\d{8}|\d{4}-\d{7}/.test(val)) return false;
  // true: 国内电话号码正确
  else return true;
}

/**
 * 身份证
 * @param val 当前值字符串
 * @returns 返回 true: 身份证正确
 */
export function verifyIdCard(val) {
  // false: 身份证不正确
  if (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)) return false;
  // true: 身份证正确
  else return true;
}
