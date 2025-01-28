import {
  DepositResponse,
  DepositResult,
  MakeInvestmentBankResponse,
  MakeInvestmentBankResult,
  MakeInvestmentResponse,
  MakeInvestmentResult,
  WithdrawalResponse,
  WithdrawalResult,
} from "@/types/Type";

//Purchase Via Wallet
export async function makePurchase(
  productID: string,
  slot: number,
  token: string
): Promise<MakeInvestmentResult> {
  const endpoint = "https://api-royal-stone.softwebdigital.com/api/investment";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productID, slot }),
    });

    const data: MakeInvestmentResponse = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to make investment");
    }
    return { success: true, message: data.message, data: data.data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Withdrawal error:", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function PurchaseViaBank(
  beneficiary: string | null, //Make Beneficiary Optional
  productID: string,
  slot: number,
  token: string
): Promise<MakeInvestmentBankResult> {
  const isBankDeposit = beneficiary !== null; // Determine if it's a bank deposit based on beneficiary

  const endpoint = isBankDeposit
    ? "https://api-royal-stone.softwebdigital.com/api/fund/investment/bank-deposit"
    : "https://api-royal-stone.softwebdigital.com/api/fund/investment/crypto"; // Switch endpoint based on beneficiary presence

  const payload: { beneficiary?: string; productID?: string; slot: number } = {
    slot,
    productID,
  };

  if (isBankDeposit) {
    payload.beneficiary = beneficiary!; // Only include beneficiary for bank deposit
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data: MakeInvestmentBankResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "An error occurred while processing the request."
      );
    }

    return { success: true, message: data.message, data: data.data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Make Investment Error:", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function withdrawFunds(
  amount: string,
  beneficiaryID: string,
  token: string,
  type: "investment" | "savings" // Specify type of withdrawal
): Promise<WithdrawalResult> {
  const baseEndpoint = "https://api-royal-stone.softwebdigital.com/api/withdrawal";
  const endpoint = `${baseEndpoint}/${type}/bank`; // Dynamically construct URL

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, beneficiaryID }),
    });

    const data: WithdrawalResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "An error occurred while processing the request."
      );
    }

    return { success: true, message: data.message, data: data.data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Withdrawal error:", errorMessage);
    throw new Error(errorMessage);
  }
}


export async function DepositFund(
  amount: string,
  walletType: string,
  beneficiary: string | null, // Make beneficiary optional
  token: string
): Promise<DepositResult> {
  const isBankDeposit = beneficiary !== null; // Determine if it's a bank deposit based on beneficiary

  const endpoint = isBankDeposit
    ? "https://api-royal-stone.softwebdigital.com/api/fund/bank-deposit"
    : "https://api-royal-stone.softwebdigital.com/api/fund/crypto"; // Switch endpoint based on beneficiary presence

  const payload: { amount: string; walletType: string; beneficiary?: string } =
    {
      amount,
      walletType, // Assume "investment" is the wallet type for both cases
    };

  if (isBankDeposit) {
    payload.beneficiary = beneficiary!; // Only include beneficiary for bank deposit
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data: DepositResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "An error occurred while processing the request."
      );
    }

    return { success: true, message: data.message, data: data.data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Deposit error:", errorMessage);
    throw new Error(errorMessage);
  }
}
