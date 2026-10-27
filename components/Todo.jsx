// Visible placeholder for content only Lorraine can supply.
export default function Todo({ children, inline = false }) {
  const Tag = inline ? 'span' : 'p';
  return <Tag className="todo">TODO · {children}</Tag>;
}
