import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Header />
      <main className="flex-grow container mx-auto py-8 mt-[5px] mb-[40px] max-w-[620px] tracking-wide">
        {children}
      </main>
      <Footer />
    </div>
  );
}
