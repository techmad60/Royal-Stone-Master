

// Faqs
export interface FaqType {
  id: string; // Use the correct type based on your API, e.g., `number` if `id` is numeric
  question: string;
  answer: string;
  status: string; // Include this field even if the API sometimes omits it
}

//Faqs Response 
export interface FaqResponse {
  status: boolean;
  data: {
    data: {
      id: string;
      question: string;
      answer: string;
      status?: string;
    }[];
  };
}

//Crypto-Wallet
export interface CryptoWallet {
  accountID: string;
  networkID: {
    name: string;
    id: string;
  };
  address: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

//Bank-Details
export interface BankDetails {
  accountID: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankAddress: string;
  swiftCode: string;
  routingNumber: string;
  beneficiaryAddress: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

//Make-Investment Via Wallet
export interface MakeInvestmentResponse {
  status: boolean;
  message: string;
  data: {
    accountID: string;
    amount: string;
    type: string;
    status: string;
    productID: string;
    slotPurchased: string;
    maturityDate: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

export interface MakeInvestmentResult {
  success: boolean;
  message?: string;
  data?: MakeInvestmentResponse["data"];
}

//Make Investment Via Bank
export interface MakeInvestmentBankResponse {
  status: boolean;
  message?: string;
  data: {
    investment: {
      accountID: string;
      amount: string;
      type: string;
      status: string;
      beneficiary: string;
      investmentPurchaseID: string;
      paymentMade: boolean;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
    beneficiary: {
      type: string;
      status: string;
      bankName: string;
      accountName: string;
      accountNumber: string;
      bankAddress: string;
      swiftCode: string;
      routingNumber: string;
      beneficiaryAddress: string;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
  };
}

export interface MakeInvestmentBankResult {
  success: boolean;
  message?: string;
  data?: MakeInvestmentBankResponse["data"];
}

// Withdrawals
export interface WithdrawalResponse {
  status: boolean;
  message: string;
  data: {
    accountID: string;
    amount: number;
    type: string;
    status: string;
    beneficiaryType: string;
    beneficiaryID: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

export interface WithdrawalResult {
  success: boolean;
  message?: string;
  data?: WithdrawalResponse["data"];
}

// Fund Wallet
export interface DepositResponse {
  status: boolean;
  message: string;
  data: {
    wallets: {
      accountID: string;
      amount: string;
      type: string;
      status: string;
      beneficiary: string;
      paymentMade: boolean;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
    beneficiary: {
      type: string;
      status: string;
      bankName: string;
      accountName: string;
      accountNumber: string;
      bankAddress: string;
      swiftCode: string;
      routingNumber: string;
      beneficiaryAddress: string;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
  };
}

export interface DepositResult {
  success: boolean;
  message: string;
  data?: DepositResponse["data"];
}

//Beneficiary Details
export interface FundBankDetails {
  type: string;
  status: string;
  bankName: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface FundCryptoWalletDetails {
  type: string;
  status: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

//Savings
export interface Savings {
  id: string;
  type: string;
  amount: number; // Keep it consistent across both components
  createdAt: string;
  status: string;
  accountID?: string;
  beneficiary?: string;
  paymentMade?: string;
  updatedAt?: string;
  proofOfPayment?: string;
}