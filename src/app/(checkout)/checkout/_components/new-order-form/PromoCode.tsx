"use client";

import { useState } from "react";
import type { ValidateOrderItemsInsertResponse } from "@/api/proto-http/frontend";
import { useFormContext, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/fields/input-field";

type Props = {
  loading: boolean;
  form: UseFormReturn<any>;
  validateItems: () => Promise<ValidateOrderItemsInsertResponse | null>;
  freeShipmentCarrierId?: number;
};

export default function PromoCode({
  loading,
  form,
  validateItems,
  freeShipmentCarrierId,
}: Props) {
  const [promoLoading, setPromoLoading] = useState(false);
  const { setValue } = useFormContext();

  const promoCode = form.watch("promoCode");

  async function handleApplyPromoClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!promoCode) return;
    setPromoLoading(true);

    const response = await validateItems();

    if (response?.promo?.freeShipping) {
      setValue("shipmentCarrierId", freeShipmentCarrierId + "");
    }

    setPromoLoading(false);
  }

  return (
    <div className="relative">
      <InputField
        control={form.control}
        loading={loading}
        placeholder="promo code"
        name="promoCode"
      />
      <Button
        type="input"
        variant="underline"
        onClick={handleApplyPromoClick}
        disabled={promoLoading || loading || !promoCode}
        className="absolute right-0 top-2"
      >
        apply
      </Button>
    </div>
  );
}
