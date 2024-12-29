import Link from "next/link";
import { FOOTER_LINKS as links } from "@/constants";

import { serviceClient } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/icons/logo";
import { Text } from "@/components/ui/text";

import CurrencyPopover from "./currency-popover";
import { FooterNav } from "./footer-nav";
import NewslatterForm from "./newslatter-form";

// todo: sync with BE
const currencyNameMap = {
  t: "ethereum",
  b: "bitcoin",
  e: "euro",
  "0": "united states dollar",
  ":": "united states dollar",
  $: "united states dollar",
  "%": "united states dollar",
  "&": "united states dollar",
  "*": "united states dollar",
  ")": "united states dollar",
  "[": "united states dollar",
  "]": "united states dollar",
  "@": "united states dollar",
};

const currentYear = () => new Date().getFullYear();

export function Footer({
  className,
  hideForm,
}: {
  className?: string;
  hideForm?: boolean;
}) {
  async function formSubmitClick(data: FormData): Promise<void> {
    "use server";

    try {
      const payload: { email: string; name: string } = {
        email: data.get("email") as string,
        name: "no field for name",
      };
      await serviceClient.SubscribeNewsletter(payload);
    } catch (error) {
      throw error;
    }
  }

  return (
    <footer
      className={cn(
        "flex h-full w-full flex-col gap-16 bg-black md:h-screen md:justify-between",
        className,
      )}
    >
      <div className="flex w-full flex-col items-start justify-between gap-16 md:flex-row">
        <div className="w-2/3 p-2 md:w-1/3 md:p-6">
          <Logo />
        </div>
        <div className="flex h-full w-full flex-col gap-24 pt-6 md:w-1/2">
          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            <div className="flex w-full flex-row gap-6 md:flex-col">
              <div className="space-y-6">
                <Text variant="inactive">press</Text>
                <Text className="text-white">work@grbpwr.com</Text>
              </div>
              <div className="space-y-6">
                <Text variant="inactive">help</Text>
                <Text className="text-white">client@grbpwr.com</Text>
              </div>
            </div>
            <div className="w-full space-y-10">
              <FooterNav className="flex-col gap-6  uppercase text-white" />
              <div className="w-full">
                <CurrencyPopover align="start" title="Currency:" />
              </div>
            </div>
          </div>
          <NewslatterForm footer={true} />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <Text variant="inactive" className="uppercase">
          {`grbpwr ${currentYear()}©`}
        </Text>
        <div className="flex w-1/2 justify-end justify-between space-x-5 text-white">
          {links.map((link) => (
            <Button asChild key={link.text}>
              <Link href={link.href}>{link.text}</Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
