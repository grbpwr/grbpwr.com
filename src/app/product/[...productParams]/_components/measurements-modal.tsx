import { common_ProductSize } from "@/api/proto-http/frontend";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";

import MeasurementsModalContent from "./measurements-modal-content";

interface Props {
  // addCartProduct: ({ id, size }: { id: number; size: string }) => Promise<void>;
  productId: number | undefined;
  sizes: common_ProductSize[] | undefined;
}

export default function MeasurementsModal({
  // addCartProduct,
  productId,
  sizes,
}: Props) {
  async function handleAddToCartClick(selectedSize: number | undefined) {
    "use server";

    if (productId && selectedSize) {
      // await addCartProduct({
      // id: productId,
      // size: selectedSize.toString(),
      // });
    }
  }

  return (
    <Modal openElement={<Button variant="underline">measurements</Button>}>
      <MeasurementsModalContent
        sizes={sizes}
        handleAddToCartClick={handleAddToCartClick}
      />
    </Modal>
  );
}
