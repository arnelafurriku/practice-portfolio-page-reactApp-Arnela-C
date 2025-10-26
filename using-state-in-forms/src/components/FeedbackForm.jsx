import { useState } from "react";

const MAX = 200;

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: "", email: "", feedback: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "feedback" ? value.slice(0, MAX) : value,
    }));
  }

  const charsLeft = MAX - formData.feedback.length;
  const isDisabled =
    !formData.name.trim() || !formData.email.trim() || !formData.feedback.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (isDisabled) return;
    alert(`Thanks, ${formData.name}! Your feedback was submitted.`);
  }

  const styles = {
    fullscreen: {
      position: "fixed",
      inset: 0,                 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      background: "#f7f7f9",
    },
    card: {
      width: "min(520px, 92vw)",
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: 14,
      display: "grid",
      gap: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,.06)",
    },
    title: { margin: "0 0 6px", textAlign: "center" },
    label: { display: "grid", gap: 6, fontWeight: 600 },
    input: {
      font: "inherit",
      padding: "8px 10px",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      background: "#05062bff",
    },
    textarea: {
      font: "inherit",
      padding: "8px 10px",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      background: "#05062bff",
      resize: "vertical",
      minHeight: 96,
    },
    small: { color: "#6b7280", fontSize: ".9rem" },
    button: (disabled) => ({
      padding: "10px 12px",
      border: "none",
      borderRadius: 8,
      background: disabled ? "#9ca3af" : "#111827",
      color: "#fff",
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
    }),
    previewCard: { marginTop: 12 },
    nameLabel: { color: "#1E3A8A" },
    emailLabel: { color: "#065F46" },
    feedbackLabel: { color: "#9A3412" },
  };

  return (
    <div style={styles.fullscreen}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={{ ...styles.title, color: "#0E7490" }}>User Feedback</h1>

        <label style={{ ...styles.label, ...styles.nameLabel }}>
          Name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="user user"
            style={styles.input}
          />
        </label>

        <label style={{ ...styles.label, ...styles.emailLabel }}>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@example.com"
            style={styles.input}
          />
        </label>

        <label style={{ ...styles.label, ...styles.feedbackLabel }}>
          Feedback
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Max 200 characters"
            rows={4}
            maxLength={MAX}
            style={styles.textarea}
          />
          <small style={styles.small}>{charsLeft} characters left</small>
        </label>

        <button style={styles.button(isDisabled)} disabled={isDisabled}>
          Submit
        </button>
      </form>

      <div style={{ ...styles.card, ...styles.previewCard, color: "black"}}>
        <h2 style={styles.title}>Live Preview</h2>
        <p><b>Name:</b> {formData.name || "—"}</p>
        <p><b>Email:</b> {formData.email || "—"}</p>
        <p><b>Feedback:</b> {formData.feedback || "—"}</p>
      </div>
    </div>
  );
}
