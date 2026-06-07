interface TemplateProps {
  title: string;
  children: React.ReactNode;
}

export function Template({ title, children }: TemplateProps) {
  return (
    <section>
        <h2>{title}</h2>
        <div>{children}</div>         
    </section>
  );
}
