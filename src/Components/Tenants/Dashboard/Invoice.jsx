import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTenant } from "../../../Features/Slices/User/Tenants/TenantAuthSlice";
import { getInvoice } from "../../../Features/Slices/User/InvoiceSlice";

// This is the main component for our waste management invoice application.
export default function Invoice() {
  // Use state to manage all the invoice data
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: "",
    date: "",
    dueDate: "",
    billTo: "",
    billToAddress: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
  });
  const [tenantLog, setTenantLog] = useState(null);

  const { tenant } = useSelector((state) => state.tenantAuth);
  // Attempt to read mapped invoice data from store if present (safe optional chaining)
  const { invoice } = useSelector((state) => state.invoice);

  console.log(invoice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoice());
    dispatch(getTenant());
  }, [dispatch]);

  useEffect(() => {
    if (tenant) {
      setTenantLog(tenant.data);
    }
  });

  const [total, setTotal] = useState(0);

  // Helper: format ISO date to YYYY-MM-DD for display
  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toISOString().slice(0, 10);
    } catch (e) {
      return "";
    }
  };

  // Map API invoice shape into existing UI state when available
  useEffect(() => {
    const api = invoice?.data ?? invoice;
    if (!api) return;

    const mappedItems = Array.isArray(api.items)
      ? api.items.map((it) => ({
          description: it.description || "",
          quantity: Number(it.quantity) || 0,
          unitPrice: Number(it.unitPrice) || 0,
        }))
      : [{ description: "", quantity: 1, unitPrice: 0 }];

    setInvoiceDetails((prev) => ({
      ...prev,
      invoiceNumber: api.invoiceNumber || prev.invoiceNumber,
      date: formatDate(api.issueDate) || prev.date,
      dueDate: formatDate(api.dueDate) || prev.dueDate,
      items: mappedItems,
    }));

    const computedTotal =
      typeof api.totalAmount === "number"
        ? api.totalAmount
        : mappedItems.reduce(
            (sum, i) =>
              sum + (Number(i.quantity) || 0) * (Number(i.unitPrice) || 0),
            0
          );
    setTotal(computedTotal);
  }, [invoice]);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-2 sm:p-6 lg:p-4">
      <div className="w-full">
        <div className="flex-1 lg:w-full bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
            Invoice Preview
          </h3>
          <div
            id="invoice-container"
            className="p-4 sm:p-6 bg-white rounded-lg border border-gray-300 shadow-md"
          >
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-6 border-b-2 border-gray-200 pb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-green-600">
                  ECO BIN
                </h1>
                <p className="text-gray-600 text-sm">
                  Waste Management Services
                </p>
                <p className="text-gray-600 text-sm">
                  Kathmandu, Kathmandu-District, 44600
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  INVOICE
                </h2>
                <p className="text-sm">
                  Invoice #:{" "}
                  <span className="font-semibold">
                    {invoiceDetails.invoiceNumber || "N/A"}
                  </span>
                </p>
                <p className="text-sm">
                  Date:{" "}
                  <span className="font-semibold">
                    {invoiceDetails.date || "N/A"}
                  </span>
                </p>
                <p className="text-sm">
                  Due Date:{" "}
                  <span className="font-semibold">
                    {invoiceDetails.dueDate || "N/A"}
                  </span>
                </p>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="mb-6">
              <h4 className="text-md font-bold text-gray-700">BILL TO:</h4>
              <p className="font-semibold">
                {`${tenantLog?.firstName} ${tenantLog?.lastName}` || "guest"}
              </p>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">
                {`${tenantLog?.currentAddress}, ${tenantLog?.city}` ||
                  "Tenant - Hilledol Height 29, Tarakeshowr-11, Kathmandu"}
              </p>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-center">Quantity</th>
                    <th className="py-3 px-6 text-right">Unit Price</th>
                    <th className="py-3 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {invoiceDetails.items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left whitespace-normal">
                        {item.description || "N/A"}
                      </td>
                      <td className="py-3 px-6 text-center">{item.quantity}</td>
                      <td className="py-3 px-6 text-right">
                        Npr. {item.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-right font-semibold">
                        Npr. {(item.quantity * item.unitPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows for better visual spacing if needed */}
                  {invoiceDetails.items.length < 5 &&
                    Array.from({ length: 5 - invoiceDetails.items.length }).map(
                      (_, i) => (
                        <tr
                          key={`empty-${i}`}
                          className="border-b border-gray-200"
                        >
                          <td className="py-3 px-6 text-left">-</td>
                          <td className="py-3 px-6 text-center">-</td>
                          <td className="py-3 px-6 text-right">-</td>
                          <td className="py-3 px-6 text-right">-</td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div className="flex justify-end pr-6">
              <div className="w-full sm:w-1/2 md:w-1/3">
                <div className="flex justify-between font-bold text-gray-800 text-lg">
                  <span>Total Due:</span>
                  <span>Npr. {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Script for PDF Generation */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    </div>
  );
}
