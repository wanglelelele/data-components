import defaultSettings from '@/config/app-config';

const title = defaultSettings.appName || '**管理系统';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return title;
}
