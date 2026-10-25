const form = document.querySelector("[data-verify-form]");
const status = document.querySelector("[data-form-status]");
const tokenInput = form.elements.rawToken;
const submitButton = form.querySelector('button[type="submit"]');
const verificationToken = new URLSearchParams(window.location.search).get("token");
const resendEmail = document.querySelector("[data-resend-email]");
const resendButton = document.querySelector("[data-resend-verification]");
const resendStatus = document.querySelector("[data-resend-status]");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "";
  status.dataset.kind = "";
  submitButton.disabled = true;

  try {
    const response = await fetch(`/api/auth/verifyEmail/${encodeURIComponent(tokenInput.value.trim())}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      credentials: "same-origin",
    });
    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || result.massage || "Unable to verify your email.");
    }

    status.textContent = result.massage || "Email verified. Redirecting to login…";
    status.dataset.kind = "success";
    window.setTimeout(() => window.location.assign("/login/?verified=1"), 900);
  } catch (error) {
    status.textContent = error.message || "Could not connect to the server. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});

resendButton.addEventListener("click", async () => {
  resendStatus.textContent = "";
  resendStatus.dataset.kind = "";
  if (!resendEmail.reportValidity()) {
    return;
  }
  resendButton.disabled = true;

  try {
    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ email: resendEmail.value.trim() }),
    });
    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || result.massage || "Unable to send a new verification link.");
    }

    resendStatus.textContent = result.message || result.massage || "A new verification link has been sent.";
    resendStatus.dataset.kind = "success";

    const newToken = result.data?.verificationToken;
    if (newToken) {
      tokenInput.value = newToken;
      resendStatus.textContent = "New token generated. Select “Verify email” below to continue.";
    }
  } catch (error) {
    resendStatus.textContent = error.message || "Could not connect to the server. Please try again.";
  } finally {
    resendButton.disabled = false;
  }
});

if (verificationToken) {
  tokenInput.value = verificationToken;
  form.requestSubmit();
}
