const PASSWORD =
  "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f";

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function unlock() {
    const input = prompt("Enter the password to unlock the website:");

    const hashedInput = await hashPassword(input);

    if (hashedInput === PASSWORD) {
        document.body.classList.add("unlocked");
        document.body.classList.remove("protected");
    } else {
        alert("Incorrect password.");
    }
}

unlock();