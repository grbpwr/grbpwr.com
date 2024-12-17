"use client";

import { useState } from "react";
import Link from "next/link";
import { useClickAway } from "@uidotdev/usehooks";

import { useCart } from "@/lib/stores/cart/store-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartPopup({ children }: { children: React.ReactNode }) {
  const products = useCart((state) => state.products);
  const itemsQuantity = Object.keys(products).length;
  const [open, setOpenStatus] = useState(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    setOpenStatus(false);
  });

  return (
    <div className="group relative" ref={ref}>
      <Button onClick={() => setOpenStatus((v) => !v)} variant="main">
        cart {itemsQuantity ? `[${itemsQuantity}]` : ""}
      </Button>
      <div className="blackTheme">
        <div
          className={cn(
            "absolute right-0 top-10 z-30 hidden w-[500px] space-y-6 bg-bgColor p-2.5",
            {
              block: open,
            },
          )}
        >
          <div className="flex justify-between text-textColor">
            <div className="flex gap-2">
              <div>SHOPPING CART</div>
              <span>[{itemsQuantity?.toString().padStart(2, "0")}]</span>
            </div>
            <Button onClick={() => setOpenStatus((v) => !v)}>[X]</Button>
          </div>
          {children}
          <Button asChild variant="main" size="lg" className="block w-full">
            <Link href="/checkout">GO TO CHECKOUT</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
