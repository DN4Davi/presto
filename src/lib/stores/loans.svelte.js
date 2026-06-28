const STORAGE_KEY = 'presto.loans';

function load() {
  if (typeof localStorage === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export const loans = $state({ items: load() });

function persist() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loans.items));
  }
}

export function getLoan(id) {
  return loans.items.find((l) => l.id === id);
}

export function addLoan(data) {
  // CREATE
  loans.items.push({ id: crypto.randomUUID(), status: 'emprestado', ...data });
  persist();
}

export function updateLoan(id, patch) {
  // UPDATE
  const loan = getLoan(id);
  if (loan) Object.assign(loan, patch);
  persist();
}

export function deleteLoan(id) {
  // DELETE
  loans.items = loans.items.filter((l) => l.id !== id);
  persist();
}
