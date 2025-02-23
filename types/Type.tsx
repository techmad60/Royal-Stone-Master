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

//Make Investment Via Crypto
export interface MakeInvestmentCryptoResponse {
  status?: boolean;
  message?: string;
  data: {
    url: string;
    id: string;
  };
}
export interface MakeInvestmentCryptoResult {
  success: boolean;
  message?: string;
  data?: MakeInvestmentCryptoResponse["data"];
}


// New type that includes both responses
export type MakeTransactionResponse =
  | MakeInvestmentBankResponse["data"]
  | MakeInvestmentCryptoResponse["data"]
  | null;

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

// Fund Wallet Via Bank
export interface DepositBankResponse {
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

export interface DepositBankResult {
  success: boolean;
  message: string;
  data?: DepositBankResponse["data"];
}

//Fund Wallet Via Crypto
export interface DepositCryptoResponse {
  status: boolean;
  message: string;
  data: {
    url: string;
    id: string;
  };
}
export interface DepositCryptoResult {
  success: boolean;
  message: string;
  data?: DepositCryptoResponse["data"];
}

export type DepositTransactionResponse =
  | DepositBankResponse["data"]
  | DepositCryptoResponse["data"]
  | null;

//Beneficiary Details
export interface FundBankDetails {
  type: string;
  status: string;
  bankName: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  beneficiaryAddress: string;
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
  paymentMade?: boolean;
  updatedAt?: string;
  proofOfPayment?: string;
}

//Transactions
export interface Transactions {
  id: string;
  type: string;
  amount: number; // Keep it consistent across both components
  createdAt: string;
  status: string;
  accountID?: string;
  // beneficiary?: string;
  paymentMade?: boolean;
  updatedAt?: string;
  // proofOfPayment?: string;
}

export interface StockPurchase {
  stockID: {
    ticker: string;
    name: string;
    id: string;
  };
  accountID: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Stock {
  readonly id: string; // Readonly since IDs usually don't change
  ticker: string;
  name: string;
  market: string;
  primary_exchange: string;
  icon: string;
  marketCap: number;
  volume: number;
  locale: string;
  currency_name: string;
  readonly createdAt: string; // Readonly to prevent modification
  readonly updatedAt: string;
  active: boolean;
  description: string;
  price: {
    open: number;
    close: number;
    high: number;
    low: number;
    change: number;
  };
}

//Transaction Details for Stocks
export interface PurchaseStockResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    stockID: string;
    accountID: string;
    amount: 100;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PurchaseStockResult {
  success: boolean;
  message: string;
  data?: PurchaseStockResponse["data"];
}

//Get Savings Target
export interface GetSavingsTarget {
  accountID: string;
  amount: number;
  type: string;
  status: string;
  savingsTargetID: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

//Savings Targets
export interface SavingsTarget {
  frequency: {
    type: string;
    nextDate: string;
  };
  accountID: string;
  name: string;
  target: number;
  recurringAmount: number | string;
  amountSaved: number;
  duration: number;
  startDate: string;
  maturityDate: string;
  interest: {
    interest: number;
  };
  status: string;
  reached: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

//Create Savings Target Transaction Response
export interface SavingsTargetTransaction {
  accountID: string;
  amount: number;
  type: string;
  status: string;
  savingsTargetID: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

//Make Savings Target Via Wallet
export interface MakeSavingsWalletResponse {
  accountID: string;
  amount: number;
  createdAt: string;
  id: string;
  savingsTargetID: string;
  status: string;
  type: string;
  updatedAt: string;
  message: string;
}

//Make Savings Target Via Bank
export interface MakeSavingsBankResponse {
  status: boolean;
  message?: string;
  data: {
    savings: {
      accountID: string;
      amount: string;
      type: string;
      status: string;
      beneficiary: string;
      savingsTargetID: string;
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

export interface MakeSavingsBankResult {
  success: boolean;
  message?: string;
  data?: MakeSavingsBankResponse["data"];
}

//Make Savings Target Via Crypto
export interface MakeSavingsCryptoResponse {
  status?: boolean;
  message?: string;
  data: {
    url: string;
    id: string;
  };
}
export interface MakeSavingsCryptoResult {
  success: boolean;
  message?: string;
  data?: MakeSavingsCryptoResponse["data"];
}

// New type that includes both responses
export type MakeSavingsTransactionResponse =
  | MakeSavingsBankResponse["data"]
  | MakeSavingsCryptoResponse["data"]
  | null;