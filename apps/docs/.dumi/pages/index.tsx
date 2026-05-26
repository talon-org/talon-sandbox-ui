import { useLocale } from 'dumi';
import DocsHome from '../../docs/_components/docs-home';

export default function HomePage() {
  const locale = useLocale();

  return <DocsHome locale={locale.id === 'en-US' ? 'en-US' : 'zh-CN'} />;
}
