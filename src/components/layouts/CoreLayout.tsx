import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import Button from "@/components/ui/Button";
import { LinkStyle } from "@/components/ui/Button/styles";
import HoverCart from "@/components/cart/HoverCart";
import Link from "next/link";

export default function CoreLayout({
  children,
  hideForm,
}: Readonly<{
  children: React.ReactNode;
  hideForm?: boolean;
}>) {
  return (
    <div className="min-h-screen bg-bgColor">
      <div className="relative mx-auto max-w-7xl">
        <Header />
        <div className="flex">
          <div className="relative hidden w-24 md:block">
            <nav className="sticky top-24 flex flex-col items-center gap-60">
              <Button style={LinkStyle.underlinedButton}>
                <Link href="/catalog">catalog</Link>
              </Button>
              <Button style={LinkStyle.underlinedButton}>
                <Link href="/archive">archive</Link>
              </Button>
              <Button style={LinkStyle.underlinedButton}>
                <Link href="/shipping">shipping</Link>
              </Button>
            </nav>
          </div>

          <div className="w-full space-y-20 px-2 md:px-0 lg:w-[calc(100%-192px)]">
            {children}
          </div>

          <div className="relative hidden w-24 md:block">
            <nav className="sticky top-24 flex flex-col items-center gap-60">
              <HoverCart>
                <Button style={LinkStyle.underlinedButton}>
                  <Link href="/cart">cart</Link>
                </Button>
              </HoverCart>
              <Button style={LinkStyle.underlinedButton}>
                <Link href="/about">about</Link>
              </Button>
              <Button style={LinkStyle.underlinedButton}>
                <Link href="/contacts">contacts</Link>
              </Button>
            </nav>
          </div>
        </div>
        <Footer className="mt-24" hideForm={hideForm} />
      </div>
    </div>
  );
}
