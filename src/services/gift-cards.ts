import { generateVoucherCode } from "@/lib/utils";

/**
 * Mock digital gift card issuance service. Later this calls Laravel to
 * generate a real voucher tied to the brand's redemption system.
 */
export async function issueDigitalGiftCard(giftCardId: string, amount: number) {
  return Promise.resolve({
    giftCardId,
    amount,
    code: generateVoucherCode(),
    status: "active" as const,
  });
}
