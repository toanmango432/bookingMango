// Utilities
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min) => {
  const h = Math.floor(min / 60)
    .toString()
    .padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

// Infer the slot size (e.g., 20 minutes) from the data
const inferSlot = (arrs) => {
  if (!arrs) return;
  const diffs = [];
  for (const arr of arrs) {
    const times = arr.map((x) => toMin(x.time)).sort((a, b) => a - b);
    for (let i = 1; i < times.length; i++) {
      const d = times[i] - times[i - 1];
      if (d > 0) diffs.push(d);
    }
  }
  if (diffs.length === 0) return 20; // sensible fallback
  return diffs.reduce((g, d) => gcd(g, d));
};

// Build a fast lookup of available starts and a helper to check K consecutive slots
const buildAvailability = (tech) => {
  const set = new Set(tech.filter((x) => x.isEnable).map((x) => toMin(x.time)));
  return set;
};

const hasRun = (set, startMin, slotsNeeded, slot) => {
  for (let k = 0; k < slotsNeeded; k++) {
    const t = startMin + k * slot;
    if (!set.has(t) && k === 0) return false;
    // only the start must exist in the availability list
  }
  return true;
};

/**
 * Find plans where two techs can be booked consecutively.
 * Default order is A then B; pass {order: "B->A"} to flip.
 *
 * Returns an array of { startA, endA, startB, endB } in "HH:MM".
 */
export function findMultiTechStarts({ techs, durations }) {
  // --- map về dữ liệu cũ ---
  const arrs = techs.map((t) => t.timeSlotTech);
  const slot = inferSlot(arrs);

  // map: techID -> duration
  const durationMap = Object.fromEntries(
    durations.map((d) => [d.techID, d.duration])
  );

  // sets + slotsNeeded
  const sets = arrs.map(buildAvailability);
  const slotsNeeded = techs.map((t) =>
    Math.ceil((durationMap[t.techID] || 0) / slot)
  );

  const results = [];

  // Chỉ cần duyệt start theo thợ đầu tiên
  for (const start of [...sets[0]].sort((a, b) => a - b)) {
    if (!hasRun(sets[0], start, slotsNeeded[0], slot)) continue;

    let ok = true;
    let curStart = start;

    for (let i = 0; i < techs.length; i++) {
      const set = sets[i];
      const need = slotsNeeded[i];

      if (!set.has(curStart) || !hasRun(set, curStart, need, slot)) {
        ok = false;
        break;
      }
      curStart += need * slot; // sang thợ tiếp theo
    }

    if (ok) {
      const raw = arrs[0].find((x) => toMin(x.time) === start);
      if (raw) {
        // chain: { employeeID, techID, start }
        const chain = techs.map((t, i) => ({
          employeeID: t.timeSlotTech[0]?.employeeID ?? null,
          techID: t.techID,
          start: toHHMM(
            start + slotsNeeded.slice(0, i).reduce((a, b) => a + b, 0) * slot
          ),
        }));
        results.push({ ...raw, chain });
      }
    }
  }

  return results.sort((p, q) => toMin(p.time) - toMin(q.time));
}

// ---- example usage with your data ----
const techA = [
  { time: "14:40", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "15:00", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "15:20", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "15:40", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "16:00", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "16:20", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "16:40", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "17:00", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "17:20", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "17:40", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "18:00", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "18:20", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "18:40", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "19:00", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "19:20", isEnable: true, employeeID: "3360006", techAvailable: null },
  { time: "19:40", isEnable: true, employeeID: "3360006", techAvailable: null },
];
const techB = [
  { time: "16:40", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "17:00", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "17:20", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "17:40", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "18:00", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "18:20", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "18:40", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "19:00", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "19:20", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "19:40", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "20:00", isEnable: true, employeeID: "3360005", techAvailable: null },
  { time: "20:20", isEnable: true, employeeID: "3360005", techAvailable: null },
];
