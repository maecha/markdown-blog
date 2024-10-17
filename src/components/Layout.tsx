import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Header />
      <main className="flex-grow container bg-white mx-auto mt-[40px] mb-[40px] max-w-full sm:max-w-[620px] p-8 tracking-wide">
        {children}
      </main>
      <Footer />
    </div>
  );
}
