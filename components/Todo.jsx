import { isPublic } from '@/lib/env';

// Visible placeholder for content only Lorraine can supply. Hidden on the public site.
export default function Todo({ children, inline = false }) {
  if (isPublic) return null;
  const Tag = inline ? 'span' : 'p';
  return <Tag className="todo">TODO · {children}</Tag>;
}
