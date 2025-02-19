import {
  DepositBankResponse,
  // DepositBankResult,
  DepositCryptoResponse,
  // DepositCryptoResult,
  MakeInvestmentBankResponse,
  MakeInvestmentCryptoResponse,
  // MakeInvestmentBankResult,
  MakeInvestmentResponse,
  MakeInvestmentResult,
  MakeSavingsBankResponse,
  MakeSavingsCryptoResponse,
  // MakeSavingsBankResult,
  PurchaseStockResponse,
  PurchaseStockResult,
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

// Purchase Investment Via Bank or Crypto
export async function PurchaseViaBank(
  beneficiary: string | null, // Make Beneficiary Optional
  productID: string,
  slot: number,
  token: string
): Promise<MakeInvestmentBankResponse | MakeInvestmentCryptoResponse> {
  const isBankDeposit = beneficiary !== null; // Determine if it's a bank deposit based on beneficiary

  const endpoint = isBankDeposit
    ? "https://api-royal-stone.softwebdigital.com/api/fund/investment/bank-deposit"
    : "https://api-royal-stone.softwebdigital.com/api/fund/investment/crypto"; // Switch endpoint based on beneficiary presence

  const payload: { beneficiary?: string; productID: string; slot: number } = {
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "An error occurred while processing the request."
      );
    }

    // ✅ Explicitly cast the response to the correct type before returning
    if (isBankDeposit) {
      return data as MakeInvestmentBankResponse; // Bank response type
    } else {
      return data as MakeInvestmentCryptoResponse; // Crypto response type
    }
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Unknown error occurred.");
  }
}

//Withdraw Funds
export async function withdrawFunds(
  amount: string | number,
  beneficiaryID: string,
  token: string,
  type: "investment" | "savings" | "referral" // Specify type of withdrawal
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
): Promise<DepositBankResponse | DepositCryptoResponse> {
  const isBankDeposit = beneficiary !== null;
  const endpoint = isBankDeposit
    ? "https://api-royal-stone.softwebdigital.com/api/fund/bank-deposit"
    : "https://api-royal-stone.softwebdigital.com/api/fund/crypto";

  const payload: { amount: string; walletType: string; beneficiary?: string } = {
    amount,
    walletType,
  };

  if (isBankDeposit) {
    payload.beneficiary = beneficiary!;
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred while processing the request.");
    }

    return data; // TypeScript will infer the correct response type
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Unknown error occurred.");
  }
}

//Purchase Stocks Response 
export async function purchaseStocks(
  stockID: string,
  amount: number,
  token: string
): Promise<PurchaseStockResult> {
  const endpoint = "https://api-royal-stone.softwebdigital.com/api/stock/purchase";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stockID, amount }),
    });

    const data: PurchaseStockResponse = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to make stock purchase");
    }
    return { success: true, message: data.message, data: data.data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Withdrawal error:", errorMessage);
    throw new Error(errorMessage);
  }
}

//Purchase Savings Via Bank/Crypto
export async function PurchaseSavingsViaBank(
  beneficiary: string | null, //Make Beneficiary Optional
  savingsTargetID: string,
  token: string
): Promise<MakeSavingsBankResponse | MakeSavingsCryptoResponse> {
  const isBankDeposit = beneficiary !== null; // Determine if it's a bank deposit based on beneficiary

  const endpoint = isBankDeposit
    ? "https://api-royal-stone.softwebdigital.com/api/fund/savings/bank-deposit"
    : "https://api-royal-stone.softwebdigital.com/api/fund/savings/crypto"; // Switch endpoint based on beneficiary presence

  const payload: { beneficiary?: string; savingsTargetID?: string;} = {
    savingsTargetID,
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

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "An error occurred while processing the request."
      );
    }

    // ✅ Explicitly cast the response to the correct type before returning
    if (isBankDeposit) {
      return data as MakeSavingsBankResponse; // Bank response type
    } else {
      return data as MakeSavingsCryptoResponse; // Crypto response type
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Make Investment Error:", errorMessage);
    throw new Error(errorMessage);
  }
}