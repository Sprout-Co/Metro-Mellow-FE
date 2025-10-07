declare module "@paystack/inline-js" {
  interface PaystackPopOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref?: string;
    metadata?: Record<string, any>;
    onSuccess?: (response: any) => void;
    onCancel?: () => void;
    onClose?: () => void;
  }

  interface PaystackPop {
    new (): PaystackPop;
    setup(options: PaystackPopOptions): void;
    resumeTransaction(accessCode: string, options: PaystackPopOptions): void;
  }

  const PaystackPop: PaystackPop;
  export default PaystackPop;
}
