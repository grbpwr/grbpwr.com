import type { common_Product } from "@/api/proto-http/frontend";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import { CURRENCY_MAP } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProductItem({
  product,
  className,
}: {
  product: common_Product;
  className: string;
}) {
  const isSaleApplied =
    product.productDisplay?.productBody?.salePercentage?.value !== "0";

  const priceWithSale =
    (parseFloat(product.productDisplay?.productBody?.price?.value || "0") *
      (100 -
        parseInt(
          product.productDisplay?.productBody?.salePercentage?.value || "0",
        ))) /
    100;

  return (
    <div className={cn("relative", className)}>
      <Button asChild>
        <Link href={product?.slug || ""}>
          <div className="relative h-80">
            <Image
              src={
                product.productDisplay?.thumbnail?.media?.thumbnail?.mediaUrl ||
                ""
              }
              alt={product.productDisplay?.productBody?.name || ""}
              aspectRatio="4/3" // take from BE values
              fit="cover"
              blurHash={product.productDisplay?.thumbnail?.media?.blurhash}
            />
          </div>
          <div className="flex w-full gap-3">
            {/* todo: change to css variable */}
            <div className="flex grow flex-col text-xs font-medium text-highlightTextColor underline">
              <span>{product.productDisplay?.productBody?.brand}</span>
              <span>{product.productDisplay?.productBody?.name}</span>
            </div>
            <div className="flex w-24 flex-col text-right text-sm font-medium text-textColor">
              {product.productDisplay?.productBody?.preorder && (
                <span className="opacity-50">preorder</span>
              )}
              <span className={isSaleApplied ? "line-through opacity-50" : ""}>
                {CURRENCY_MAP.eth}{" "}
                {product.productDisplay?.productBody?.price?.value}
              </span>
              {isSaleApplied && (
                <span className="text">
                  {CURRENCY_MAP.eth} {priceWithSale}
                </span>
              )}
            </div>
          </div>
        </Link>
      </Button>
    </div>
  );
}
