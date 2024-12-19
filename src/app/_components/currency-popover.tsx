"use client";

import { cn } from "@/lib/utils";
import { useDataContext } from "@/components/DataContext";
import { Button } from "@/components/ui/button";
import GenericPopover from "@/components/ui/popover";

export const currencySymbols: Record<string, string> = {
  Bitcoin: "₿", // Bitcoin
  CHF: "Fr", // Swiss Franc
  CNY: "¥", // Chinese Yuan
  CZK: "Kč", // Czech Republic Koruna
  DKK: "kr", // Danish Krone
  EUR: "€", // Euro
  Ethereum: "Ξ", // Ethereum
  GBP: "£", // British Pound Sterling
  GEL: "₾", // Georgian Lari
  HKD: "$", // Hong Kong Dollar
  HUF: "Ft", // Hungarian Forint
  ILS: "₪", // Israeli New Sheqel
  JPY: "¥", // Japanese Yen
  NOK: "kr", // Norwegian Krone
  PLN: "zł", // Polish Zloty
  RUB: "₽", // Russian Ruble
  SEK: "kr", // Swedish Krona
  SGD: "$", // Singapore Dollar
  TRY: "₺", // Turkish Lira
  UAH: "₴", // Ukrainian Hryvnia
  USD: "$", // United States Dollar
};

export default function CurrencyPopover() {
  const { rates, selectedCurrency, setSelectedCurrency } = useDataContext();

  if (!rates?.currencies) return null;

  return (
    <GenericPopover
      openElement={
        <Button size="sm" variant="simple">
          {`Currency: ${currencySymbols[selectedCurrency]}`}
        </Button>
      }
      contentProps={{
        sideOffset: 16,
        align: "end",
      }}
    >
      <div className="min-w-80 space-y-2 pl-4">
        {Object.entries(rates.currencies).map(([k, v]) => (
          <div
            className={cn("leading-none", {
              "bg-bgColor  text-textColor": k === selectedCurrency,
            })}
            key={k}
          >
            <button
              onClick={() => {
                setSelectedCurrency(k);
              }}
              className="flex w-full"
            >
              <span className="block min-w-8 text-left">
                {currencySymbols[k]}{" "}
              </span>
              {v.description}
            </button>
          </div>
        ))}
      </div>
    </GenericPopover>
  );
}
