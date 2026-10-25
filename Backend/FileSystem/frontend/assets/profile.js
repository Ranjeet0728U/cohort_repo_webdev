const status = document.querySelector("[data-profile-status]");
const details = document.querySelector("[data-profile-details]");
const actions = document.querySelector("[data-profile-actions]");
const logoutButton = document.querySelector("[data-logout]");

const setStatus = (message, kind = "") => {
  status.textContent = message;
  status.dataset.kind = kind;
};

const loadProfile = async () => {
  try {
    const response = await fetch("/api/auth/me", {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    });
    const result = await response.json();

    if (!response.ok || result.success === false) {
      if (response.status === 401) {
        setStatus("You are not logged in. Please log in to view your profile.");
        return;
      }
      throw new Error(result.message || result.massage || "Unable to load your profile.");
    }

    const user = result.data;
    if (!user || typeof user !== "object") {
      throw new Error("The server returned an invalid profile.");
    }

    document.querySelector("[data-profile-name]").textContent = user.name || "—";
    document.querySelector("[data-profile-email]").textContent = user.email || "—";
    document.querySelector("[data-profile-role]").textContent = user.role || "—";
    document.querySelector("[data-profile-verification]").textContent =
      user.isVerified ? "Verified" : "Not verified";
    document.querySelector("[data-profile-created]").textContent = user.createdAt
      ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(user.createdAt))
      : "—";
    const avatar = document.querySelector("[data-profile-avatar]");
    if (user.avatar) {
      const image = document.createElement("img");
      image.src = user.avatar;
      image.alt = `${user.name || "Profile"} avatar`;
      avatar.replaceChildren(image);
    } else {
      avatar.textContent = user.name?.trim()?.charAt(0)?.toUpperCase() || "?";
    }

    details.hidden = false;
    actions.hidden = false;
    setStatus("Profile loaded.", "success");
  } catch (error) {
    setStatus(error.message || "Could not connect to the server. Please try again.");
  }
};

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  setStatus("");

  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    });
    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || result.massage || "Unable to log out.");
    }

    window.location.assign("/login/");
  } catch (error) {
    setStatus(error.message || "Could not connect to the server. Please try again.");
    logoutButton.disabled = false;
  }
});

loadProfile();
