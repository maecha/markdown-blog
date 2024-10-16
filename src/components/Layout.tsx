import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Header />
      <main className="flex-grow container bg-white mx-auto p-8 mt-[40px] mb-[40px] max-w-[620px] tracking-wide">
        {children}
      </main>
      <Footer />
    </div>
  );
}
