const API_BASE = import.meta.env.VITE_API_BASE_URL;

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res, fallbackMsg) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${fallbackMsg} (${res.status}) ${text}`);
  }
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/api/orders`, {
    headers: { ...authHeader() },
  });
  return handle(res, "Failed to load orders");
}

export async function fetchOrderById(id) {
  const res = await fetch(`${API_BASE}/api/orders/${id}`, {
    headers: { ...authHeader() },
  });
  return handle(res, "Failed to load order");
}
