const form = document.querySelector("[data-upload-form]");
const fileInput = form.elements.avtar;
const preview = document.querySelector("[data-upload-preview]");
const placeholder = document.querySelector("[data-upload-placeholder]");
const status = document.querySelector("[data-upload-status]");
const submitButton = form.querySelector('button[type="submit"]');
let previewUrl;

const showPreview = (url) => {
  preview.src = url;
  preview.hidden = false;
  placeholder.hidden = true;
};

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  previewUrl = URL.createObjectURL(file);
  showPreview(previewUrl);
  status.textContent = "";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "";
  status.dataset.kind = "";
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/auth/avtar", {
      method: "POST",
      credentials: "same-origin",
      body: new FormData(form),
    });
    const result = await response.json();

    if (!response.ok || result.success === false) {
      if (response.status === 401) {
        throw new Error("Please log in before uploading an image.");
      }
      throw new Error(result.message || result.massage || "Unable to upload the image.");
    }

    const imageUrl = result.data?.avatarUrl;
    if (!imageUrl) {
      throw new Error("The upload succeeded, but the server did not return an image URL.");
    }

    showPreview(imageUrl);
    status.textContent = "Image uploaded successfully.";
    status.dataset.kind = "success";
  } catch (error) {
    status.textContent = error.message || "Could not connect to the server. Please try again.";
    if (status.textContent.includes("log in")) {
      status.textContent += " ";
      const loginLink = document.createElement("a");
      loginLink.href = "/login/";
      loginLink.textContent = "Log in";
      status.append(loginLink);
    }
  } finally {
    submitButton.disabled = false;
  }
});

window.addEventListener("beforeunload", () => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
});
