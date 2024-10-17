import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-100">
      <Header />
      <div className="flex justify-center flex-grow">
        <main className="flex-grow bg-white mx-4 mt-[40px] mb-[40px] w-full max-w-[620px] p-8 tracking-wide min-h-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
