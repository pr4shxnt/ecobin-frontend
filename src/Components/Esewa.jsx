import { useEsewa } from "esewa-react";

function EsewaButton({ price, productId }) {
  console.log(price, productId);

  const { initiatePayment, loading, error } = useEsewa({
    merchantId: "EPAYTEST",
    successUrl: "https://developer.esewa.com.np/success",
    failureUrl: "https://developer.esewa.com.np/failure",
    secretKey: "8gBm/:&EnhH.1/q",
    isTest: true,
  });

  // generation of unique numbers so that error doesn't show uuid duplication error
  const generateRandomId = () => {
    const min = 1111111;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1)) + min + "";
  };

  const handlePayment = () => {
    const txnId = generateRandomId();
    initiatePayment({
      amount: price,
      productId: `${productId}-${txnId}`, // p-id = transaction uuid
      successUrl: "https://developer.esewa.com.np/success",
      failureUrl: "https://developer.esewa.com.np/failure",
    });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button
        className="bg-green-900 text-white px-6 py-2 rounded-full"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with eSewa"}
      </button>
    </div>
  );
}

export default EsewaButton;
