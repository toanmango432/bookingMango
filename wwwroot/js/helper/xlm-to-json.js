// hàm chuyển đổi jsonToXLM
export function jsonToXml(obj, rootTag = "root") {
  function toXml(tag, val) {
    if (val == null) return `<${tag}></${tag}>`;

    // array -> lặp tag
    if (Array.isArray(val)) {
      return val.map((v) => toXml(tag, v)).join("");
    }

    // object -> duyệt key
    if (typeof val === "object") {
      let attrs = "";
      let inner = "";

      // Đặc biệt với Detail: ApptIndex thành attribute
      if (
        tag === "Detail" &&
        Object.prototype.hasOwnProperty.call(val, "ApptIndex")
      ) {
        attrs += ` ApptIndex="${val.ApptIndex}"`;
      }

      for (const [k, v] of Object.entries(val)) {
        if (tag === "Detail" && k === "ApptIndex") continue; // đã lên attr
        inner += toXml(k, v);
      }

      return `<${tag}${attrs}>${inner}</${tag}>`;
    }

    // primitive
    return `<${tag}>${val}</${tag}>`;
  }

  // root: render từng key top-level đúng 1 lần, tránh lồng lặp
  const inner = Object.entries(obj)
    .map(([k, v]) => toXml(k, v))
    .join("");
  return `<${rootTag}>${inner}</${rootTag}>`;
}
