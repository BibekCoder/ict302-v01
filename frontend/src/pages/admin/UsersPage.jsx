import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../../api";

export default function UsersPage() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("support");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("support");
  const [editPassword, setEditPassword] = useState("");

  const [msg, setMsg] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await apiGet("/api/admin/users", token);
      const list = Array.isArray(res) ? res : res.users || [];
      setUsers(list);
    } catch (err) {
      setUsers([]);
      setMsg({ ok: false, text: err.message || "Failed to load users" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (u) => {
    setEditingId(u.userId);
    setEditUserName(u.userName || "");
    setEditEmail(u.email || "");
    setEditRole(u.role || "support");
    setEditPassword("");
    setMsg(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUserName("");
    setEditEmail("");
    setEditRole("support");
    setEditPassword("");
  };

  const createUser = async () => {
    setMsg(null);

    if (!newUserName || !newEmail || !newPassword) {
      setMsg({ ok: false, text: "Please fill userName, email and password." });
      return;
    }

    try {
      const res = await apiPost(
        "/api/admin/users",
        { userName: newUserName, email: newEmail, password: newPassword, role: newRole },
        token
      );

      setMsg({ ok: true, text: res.message || "User created" });

      // reset form
      setNewUserName("");
      setNewEmail("");
      setNewPassword("");
      setNewRole("support");

      await loadUsers();
    } catch (err) {
      setMsg({ ok: false, text: err.message || "Create failed" });
    }
  };

  const saveEdit = async () => {
    setMsg(null);

    if (!editUserName || !editEmail) {
      setMsg({ ok: false, text: "userName and email are required." });
      return;
    }

    try {
      const payload = {
        userName: editUserName,
        email: editEmail,
        role: editRole,
      };

      // only send password if admin typed one
      if (editPassword && editPassword.trim().length > 0) {
        payload.password = editPassword;
      }

      const res = await apiPut(`/api/admin/users/${editingId}`, payload, token);
      setMsg({ ok: true, text: res.message || "User updated" });

      cancelEdit();
      await loadUsers();
    } catch (err) {
      setMsg({ ok: false, text: err.message || "Update failed" });
    }
  };

  const deleteUser = async (id, email) => {
    const ok = window.confirm(`Delete user: ${email}?`);
    if (!ok) return;

    setMsg(null);
    try {
      const res = await apiDelete(`/api/admin/users/${id}`, token);
      setMsg({ ok: true, text: res.message || "User deleted" });

      if (editingId === id) cancelEdit();
      await loadUsers();
    } catch (err) {
      setMsg({ ok: false, text: err.message || "Delete failed" });
    }
  };

  return (
    <div className="container">
      <div className="pageTitle">User Management</div>
      <div className="subtitle">Create, edit, and delete users (saved to DB).</div>

      {msg && (
        <div className="templateRow" style={{ gridTemplateColumns: "1fr" }}>
          <div style={{ padding: 14, fontWeight: 800, color: msg.ok ? "inherit" : "#b00020" }}>
            {msg.ok ? "✅ " : "❌ "}
            {msg.text}
          </div>
        </div>
      )}

      {/* Create User */}
      <div className="templatesBox" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>Create User</div>

        <div style={{ display: "grid", gap: 10 }}>
          <input
            className="input"
            placeholder="Full name (userName) *"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Email *"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder="Password *"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <select className="input" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="admin">admin</option>
            <option value="support">support</option>
            <option value="founder">founder</option>
          </select>

          <button className="primaryBtn" type="button" onClick={createUser}>
            Create User
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="templatesBox">
        <div className="templatesHeaderRow" style={{ gridTemplateColumns: "1fr 220px 260px" }}>
          <div>User</div>
          <div>Role</div>
          <div>Actions</div>
        </div>

        {loading ? (
          <div style={{ padding: 14 }}>Loading…</div>
        ) : users.length === 0 ? (
          <div style={{ padding: 14 }}>No users found.</div>
        ) : (
          users.map((u) => {
            const isEditing = editingId === u.userId;

            return (
              <div key={u.userId} className="templateRow" style={{ gridTemplateColumns: "1fr 220px 260px" }}>
                <div>
                  {!isEditing ? (
                    <>
                      <div className="templateName">{u.userName || "(no name)"}</div>
                      <div style={{ fontSize: 14, opacity: 0.8 }}>{u.email}</div>
                    </>
                  ) : (
                    <div style={{ display: "grid", gap: 8 }}>
                      <input
                        className="input"
                        placeholder="userName"
                        value={editUserName}
                        onChange={(e) => setEditUserName(e.target.value)}
                      />
                      <input
                        className="input"
                        placeholder="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                      <input
                        className="input"
                        placeholder="New password (optional)"
                        type="password"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  {!isEditing ? (
                    <span className="pill">{u.role}</span>
                  ) : (
                    <select className="input" value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                      <option value="admin">admin</option>
                      <option value="support">support</option>
                      <option value="founder">founder</option>
                    </select>
                  )}
                </div>

                <div style={{ textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  {!isEditing ? (
                    <>
                      <button className="smallBtn" type="button" onClick={() => startEdit(u)}>
                        Edit
                      </button>
                      <button className="smallBtn" type="button" onClick={() => deleteUser(u.userId, u.email)}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="smallBtn" type="button" onClick={saveEdit}>
                        Save
                      </button>
                      <button className="smallBtn" type="button" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

