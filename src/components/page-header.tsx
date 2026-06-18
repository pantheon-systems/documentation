export default function PageHeader({ title }: { title: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-5xl font-bold">{title}</h1>
    </header>
  );
}
