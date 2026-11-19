import Layout from "@/components/layout";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ message?: string }>;
}

export default async function ErrorPage({ searchParams }: Props) {
  const { message } = await searchParams;

  return (
    <Layout>
      <div className="flex flex-col mx-auto text-xl prose text-center mt-12">
        <span>
          {message
            ? decodeURIComponent(message.toString())
            : "🛑 An issue occurred loading this page 🛑"}
        </span>
      </div>
    </Layout>
  );
}
