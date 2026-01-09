import { useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { apiGet } from "../../api";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function inRange(orderISODate, start, end) {
  if (!start || !end) return true;
  const d = new Date(orderISODate);
  const s = new Date(start);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
}

export default function OrderReports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await apiGet("/api/orders", token);
        
        // Handle both array and object responses
        const orders = Array.isArray(data) ? data : data.orders || [];
        setAllOrders(orders);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message);
        setAllOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const filteredOrders = useMemo(() => {
    return allOrders.filter((o) => inRange(o.orderDate, startDate, endDate));
  }, [allOrders, startDate, endDate]);

  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0);
  }, [filteredOrders]);

  function downloadExcel() {
    const rows = filteredOrders.map((o) => ({
      orderId: o.orderId,
      orderDate: formatDate(o.orderDate),
      customerId: o.customerId,
      productName: o.productName,
      quantity: o.quantity,
      totalPrice: o.totalPrice,
      status: o.status,
      orderNotes: o.orderNotes,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    XLSX.writeFile(
      wb,
      `orders_report_${startDate || "all"}_to_${endDate || "all"}.xlsx`
    );
  }

  function downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Orders Report", 14, 16);

    doc.setFontSize(11);
    doc.text(`Period: ${startDate || "All"} to ${endDate || "All"}`, 14, 24);
    doc.text(`Total Orders: ${filteredOrders.length}`, 14, 30);
    doc.text(`Total Revenue: $${totalRevenue.toFixed(2)}`, 14, 36);

    autoTable(doc, {
      startY: 44,
      head: [["Order ID", "Order Date", "Customer ID", "Product", "Qty", "Total", "Status", "Notes"]],
      body: filteredOrders.map((o) => [
        o.orderId,
        formatDate(o.orderDate),
        o.customerId,
        o.productName,
        o.quantity,
        `$${Number(o.totalPrice).toFixed(2)}`,
        o.status,
        o.orderNotes,
      ]),
      styles: { fontSize: 9 },
    });

    doc.save(`orders_report_${startDate || "all"}_to_${endDate || "all"}.pdf`);
  }

  const periodLabel =
    startDate && endDate ? `${startDate} to ${endDate}` : "All orders";

  return (
    <div className="reportPage">
      {/* Title (match teammate) */}
      <h1 className="pageTitle">Order Report Generation</h1>

      {/* Error message */}
      {error && (
        <div style={{ 
          padding: "12px 16px", 
          marginBottom: "16px",
          backgroundColor: "#fee",
          border: "1px solid #fcc",
          borderRadius: "4px",
          color: "#c33"
        }}>
          Error loading orders: {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={{ 
          padding: "12px 16px", 
          marginBottom: "16px",
          backgroundColor: "#f0f8ff",
          border: "1px solid #cde",
          borderRadius: "4px"
        }}>
          Loading orders from database...
        </div>
      )}

      {/* Header row like "Recent Orders" + View All */}
      <div className="rowBetween">
        <div>
          <div className="sectionTitle">Recent Orders</div>
          <div className="mutedText">
            Select a date range and download report (PDF/Excel).
          </div>
        </div>

        <button
          type="button"
          className="linkBtn"
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          title="Clear filters"
        >
          View All &gt;
        </button>
      </div>

      {/* Filter Card */}
      <div className="panel">
        <div className="filters">
          <div className="field">
            <label className="label">Start Date</label>
            <input
              className="input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">End Date</label>
            <input
              className="input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="actions">
            <button className="btnOutline" onClick={downloadExcel}>
              Download Excel
            </button>
            <button className="pillBtn" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="summaryRow">
          <div className="mutedText">
            Showing <b>{filteredOrders.length}</b> orders
            <span className="dotSep">•</span>
            Period: <b>{periodLabel}</b>
          </div>

          <div className="totalBox">
            Total: <b>${totalRevenue.toFixed(2)}</b>
          </div>
        </div>

        {/* Table */}
        <div className="tableWrap">
          <table className="niceTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Customer ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="emptyCell">
                    No orders found for this period.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.orderId}>
                    <td className="mono">{o.orderId}</td>
                    <td className="mono">{formatDate(o.orderDate)}</td>
                    <td className="mono">{o.customerId}</td>
                    <td>{o.productName}</td>
                    <td className="mono">{o.quantity}</td>
                    <td className="mono">${Number(o.totalPrice).toFixed(2)}</td>
                    <td>
                      <span className={`badge badge-${o.status || "pending"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="notesCell">{o.orderNotes}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
