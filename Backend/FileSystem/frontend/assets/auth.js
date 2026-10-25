const form = document.querySelector("[data-auth-form]");

if (form) {
  const status = document.querySelector("[data-form-status]");
  const submitButton = form.querySelector('button[type="submit"]');
  const mode = form.dataset.authForm;

  if (mode === "login" && new URLSearchParams(window.location.search).has("verified")) {
    status.textContent = "Email verified. You can now log in.";
    status.dataset.kind = "success";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.dataset.kind = "";
    submitButton.disabled = true;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || result.massage || "Unable to complete your request.");
      }

      status.dataset.kind = "success";
      if (mode === "register") {
        const verificationToken = result.data?.verificationToken;
        const verificationUrl = new URL("/verify/", window.location.origin);
        if (verificationToken) {
          verificationUrl.searchParams.set("token", verificationToken);
        }
        window.location.assign(verificationUrl);
      } else {
        window.location.assign("/me/");
      }
    } catch (error) {
      status.textContent = error.message || "Could not connect to the server. Please try again.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
