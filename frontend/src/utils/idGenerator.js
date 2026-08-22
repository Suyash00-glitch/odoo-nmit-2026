/**
 * Login ID and Password Generation Utility for Dayflow HRMS (Pure JavaScript)
 */

export function extractCompanyCode(companyName = "Odoo India") {
  if (!companyName || !companyName.trim()) return "OI";
  const words = companyName.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words[0].length >= 2) {
    return words[0].substring(0, 2).toUpperCase();
  } else {
    return (words[0] + "X").toUpperCase();
  }
}

export function extractNameCode(fullName = "John Doe") {
  if (!fullName || !fullName.trim()) {
    return { nameCode: "JODO", firstName: "John", lastName: "Doe" };
  }

  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  let firstName = parts[0] || "User";
  let lastName = parts.length > 1 ? parts.slice(1).join(" ") : "Member";

  let firstTwo = firstName.replace(/[^a-zA-Z]/g, "").padEnd(2, "X").substring(0, 2).toUpperCase();
  let lastTwo = lastName.replace(/[^a-zA-Z]/g, "").padEnd(2, "X").substring(0, 2).toUpperCase();

  return {
    nameCode: `${firstTwo}${lastTwo}`,
    firstName,
    lastName,
  };
}

export function generateLoginId(
  companyName = "Odoo India",
  fullName = "John Doe",
  year = new Date().getFullYear(),
  serial = 1
) {
  const companyCode = extractCompanyCode(companyName);
  const { nameCode, firstName, lastName } = extractNameCode(fullName);
  const yearStr = String(year);
  const serialNumber = String(serial).padStart(4, "0");
  const fullId = `${companyCode}${nameCode}${yearStr}${serialNumber}`;

  return {
    companyCode,
    companyName: companyName.trim() || "Odoo India",
    nameCode,
    firstName,
    lastName,
    year: yearStr,
    serialNumber,
    fullId,
  };
}

export function generateSystemPassword(length = 10) {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const numbers = "23456789";
  const special = "!@#$%&*";

  let pwd = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    special[Math.floor(Math.random() * special.length)],
  ];

  const allChars = upper + lower + numbers + special;
  for (let i = pwd.length; i < length; i++) {
    pwd.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  return pwd.sort(() => Math.random() - 0.5).join("");
}

export function calculatePasswordStrength(pwd = "") {
  if (!pwd) return { score: 0, label: "Enter password", color: "bg-neutral-800" };

  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

  switch (score) {
    case 1:
      return { score: 25, label: "Weak", color: "bg-red-500" };
    case 2:
      return { score: 50, label: "Fair", color: "bg-amber-500" };
    case 3:
      return { score: 75, label: "Good", color: "bg-blue-500" };
    case 4:
      return { score: 100, label: "Strong & Secure", color: "bg-emerald-500" };
    default:
      return { score: 15, label: "Too short", color: "bg-red-600" };
  }
}
