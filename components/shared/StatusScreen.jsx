export default function StatusScreen({
  icon: Icon,
  iconClassName = "text-primary",
  title,
  description,
  actions,
}) {
  return (
    <div className="status-shell mx-auto max-w-md">
      {Icon ? <Icon className={`h-14 w-14 ${iconClassName}`} /> : null}
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {actions ? <div className="status-actions">{actions}</div> : null}
    </div>
  );
}
