// startConfirmAnimation(loopCount, options)
export function startConfirmAnimation(loopCount, options = {}) {
  const sel = options.selector || ".check-circle";
  const btnSel = options.buttonSelector || ".btn-request-another";
  const $circleWrap = $(sel).first();
  const $btn = $(btnSel).first();

  if (!$circleWrap.length) {
    console.warn("[startConfirmAnimation] wrapper not found:", sel);
    return null;
  }

  // store original markup for cloning
  const originalInner = $circleWrap.html();
  if (!originalInner || originalInner.trim() === "") {
    console.warn("[startConfirmAnimation] no inner HTML in wrapper to clone");
    return null;
  }

  // timings (ms) - can override via options
  const borderMs = options.borderMs ?? 1000; // draw outer stroke
  const fillMs = options.fillMs ?? 400; // background expand
  const checkMs = options.checkMs ?? 1000; // check draw + pop
  const totalMs = borderMs + fillMs + checkMs;

  // button label setup
  if ($btn.length) {
    const orig =
      $btn.data("orig-text") ||
      $btn
        .text()
        .replace(/\(\d+\)/, "")
        .trim();
    $btn.data("orig-text", orig);
    $btn.text(orig);
  }

  const timeouts = [];

  function clearAllTimeouts() {
    while (timeouts.length) {
      const t = timeouts.shift();
      clearTimeout(t);
    }
  }

  // prepare inserted SVG elements (set dash arrays, inline stroke-width, vars)
  function prepareSvg($wrap) {
    const $path = $wrap.find(".check-path");
    const $stroke = $wrap.find(".stroke-circle");
    const $fill = $wrap.find(".fill-circle");

    if (!$path.length || !$stroke.length || !$fill.length) {
      console.warn("[startConfirmAnimation] missing SVG parts after insert");
      return null;
    }

    // compute path lengths
    let checkLen = 50;
    try {
      checkLen = Math.ceil($path.get(0).getTotalLength());
    } catch (e) {
      /*fallback*/
    }
    let r = 28;
    try {
      r = Number($stroke.attr("r")) || r;
    } catch (e) {
      /*fallback*/
    }
    const circ = Math.ceil(2 * Math.PI * r);

    const initialStrokeW = options.initialStrokeW ?? 3;

    $path.css({
      "stroke-dasharray": checkLen,
      "stroke-dashoffset": checkLen,
      opacity: 0,
      transform: "scale(0.22)",
      "transform-origin": "32px 32px",
    });

    $stroke.attr("stroke-width", initialStrokeW);
    $stroke.css({
      "stroke-dasharray": circ,
      "stroke-dashoffset": circ,
      "stroke-width": initialStrokeW + "px",
      transform: "scale(1)",
      "transform-origin": "32px 32px",
      "paint-order": "stroke fill markers",
    });

    $fill.css({
      transform: "scale(0)",
      opacity: 0,
      "transform-origin": "32px 32px",
    });

    // set CSS vars on wrapper
    const node = $wrap.get(0);
    node.style.setProperty("--border-duration", `${borderMs}ms`);
    node.style.setProperty("--fill-duration", `${fillMs}ms`);
    node.style.setProperty("--check-duration", `${checkMs}ms`);
    node.style.setProperty("--check-length", checkLen);
    node.style.setProperty("--circumference", circ);
    node.style.setProperty("--initial-stroke-width", initialStrokeW);

    return { $path, $stroke, $fill, checkLen, circ, initialStrokeW };
  }

  // single run - không burst, giữ trạng thái cuối
  function runOnce() {
    // replace content with fresh clone to ensure animations start
    $circleWrap.html(originalInner);

    const prep = prepareSvg($circleWrap);
    if (!prep) return;

    // remove any leftover classes
    $circleWrap.removeClass(
      "animate-border animate-fill animate-check animate-burst"
    );

    // start sequence via RAF + timeouts
    requestAnimationFrame(() => {
      // draw border immediately
      $circleWrap.addClass("animate-border");

      // expand fill after border finished
      timeouts.push(
        setTimeout(() => {
          $circleWrap.addClass("animate-fill");
        }, borderMs)
      );

      // draw check after border+fill
      timeouts.push(
        setTimeout(() => {
          $circleWrap.addClass("animate-check");
        }, borderMs + fillMs)
      );
    });
  }

  // start first run
  runOnce();

  // controller - hỗ trợ stop
  return {
    stop() {
      clearAllTimeouts();
      if ($btn.length) $btn.text($btn.data("orig-text"));
      $circleWrap.html(originalInner);
      // reset SVG về trạng thái ban đầu nếu stop được gọi
      prepareSvg($circleWrap);
    },
  };
}
