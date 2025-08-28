export function getAMPM(timeStr) {
  const [hourStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  return hour >= 12 ? "PM" : "AM";
}
export function updateTabMark(empID, hasTime) {
  const el = document.querySelector(`.tab-list .tab-item[data-id="${empID}"]`);
  if (!el) return;
  el.classList.toggle("has-time", !!hasTime);
}
export function findItemsOfTech(userChoosing, empId) {
  const items = [];
  (userChoosing.services || []).forEach((svc) => {
    (svc.itemService || []).forEach((it) => {
      if (
        it.selectedStaff &&
        String(it.selectedStaff.employeeID) === String(empId)
      ) {
        items.push(it);
      }
    });
  });
  return items;
}
export function roundUpToNearestInterval(date, interval = 20) {
  const d = new Date(date);
  const minutes = d.getMinutes();
  const mod = minutes % interval;
  if (mod !== 0) {
    d.setMinutes(minutes + (interval - mod));
  }
  d.setSeconds(0, 0);
  return d;
}
export function renderTimeSlotsForTech(
  dataBooking,
  selectedTech,
  selectedDate,
  listDataService,
  frameData
) {
  const container = $("#timeSlotsContainer");
  container.empty();

  const userChoosing = dataBooking.users.find((u) => u.isChoosing);
  const empID = selectedTech?.staff?.employeeID ?? selectedTech?.id;

  // các itemService đang gán cho đúng tech
  const itemsOfTech = findItemsOfTech(userChoosing, empID);

  // giờ đã lưu trước đó (nếu có) trong selectedStaff của tech này
  const prevSlot = itemsOfTech.find(
    (it) => it.selectedStaff && it.selectedStaff.selectedTimeSlot
  )?.selectedTimeSlot;

  if (!frameData || !frameData.length) {
    container.append(
      `<div class="time-slot">Không có giờ trống hôm nay.</div>`
    );
    // nếu trước đó có lưu giờ mà giờ không còn, xử lý xoá
    if (prevSlot) {
      alert(`Xin thông báo: giờ ${prevSlot} đã được chọn bởi người khác.`);
      itemsOfTech.forEach((it) => {
        delete it.selectedStaff.selectedTimeSlot;
        delete it.selectedStaff.selectedDate;
        delete it.selectedStaff.isChoosing;
      });
      updateTabMark(empID, false);
      renderSumary(dataBooking, listDataService);
    }
    return;
  }
  // render danh sách slot
  frameData.forEach((slot) => {
    const div = $(`
        <div class="time-slot ${!slot.isEnable ? "disabled" : ""}">
          <span>${slot.time}</span>
          <span>${getAMPM(slot.time)}</span>
          <div class="circle"><div class="dot"></div></div>
        </div>
      `);

    if (
      itemsOfTech.some((it) => it.selectedStaff?.selectedTimeSlot === slot.time)
    ) {
      div.addClass("selected");
    }

    if (slot.isEnable) {
      div.on("click", function () {
        container.find(".time-slot").removeClass("selected");
        $(this).addClass("selected");

        // lưu vào selectedStaff của tất cả itemService thuộc tech này
        itemsOfTech.forEach((it) => {
          it.selectedStaff.selectedTimeSlot = slot.time;
          it.selectedStaff.selectedDate = formatDateMMDDYYYY(selectedDate);
        });
        updateTabMark(empID, true);

        // optional: vẫn có thể sync lên userChoosing nếu còn dùng nơi khác
        userChoosing.selectedTimeSlot = slot.time;
        userChoosing.selectedDate = formatDateMMDDYYYY(selectedDate);

        const okToScroll = showScrollToFinalBooking(userChoosing);
        if (okToScroll) {
          updateScrollButton({
            target: "#section-booking",
            trigger: "#trigger-booking",
            triggerBanner: "#triggerBlockSumary",
            text: "Continue Booking",
            icon: "fa fa-hand-pointer down",
            force: false,
          });
        }

        renderSumary(dataBooking, listDataService);
      });
    }

    container.append(div);
  });

  // Đánh dấu lại slot đã lưu trong staff (nếu còn hợp lệ)
  if (prevSlot) {
    const stillOk = frameData.some((s) => s.time === prevSlot && s.isEnable);
    if (stillOk) {
      const match = container.find(".time-slot").filter(function () {
        return (
          $(this).find("span").first().text().trim() === String(prevSlot).trim()
        );
      });
      if (match.length) {
        container.find(".time-slot").removeClass("selected");
        match.first().addClass("selected");
      }
      updateTabMark(empID, true);
    } else {
      alert(`Xin thông báo: giờ ${prevSlot} đã được chọn bởi người khác.`);
      itemsOfTech.forEach((it) => {
        delete it.selectedStaff.selectedTimeSlot;
        delete it.selectedStaff.selectedDate;
      });
      updateTabMark(empID, false);
      renderSumary(dataBooking, listDataService);
    }
  }
}
export function generateTimeSlotsDynamic(
  selectedDate,
  start,
  end,
  interval = 20
) {
  const slots = [];

  // lấy working hours từ tham số
  let [startH, startM] = start.split(":").map(Number);
  let [endH, endM] = end.split(":").map(Number);

  let startTime = new Date(selectedDate);
  startTime.setHours(startH, startM, 0, 0);

  let endTime = new Date(selectedDate);
  endTime.setHours(endH, endM, 0, 0);

  // clamp start ≥ 08:00 và end ≤ 20:00
  const hardStart = new Date(selectedDate);
  hardStart.setHours(8, 0, 0, 0);

  const hardEnd = new Date(selectedDate);
  hardEnd.setHours(20, 0, 0, 0);

  if (startTime < hardStart) startTime = hardStart;
  if (endTime > hardEnd) endTime = hardEnd;

  const now = new Date();

  // nếu chọn hôm nay => lấy mốc gần nhất >= giờ hiện tại
  if (selectedDate.toDateString() === now.toDateString()) {
    const roundedNow = roundUpToNearestInterval(now, interval);
    if (roundedNow > startTime) startTime = roundedNow;
  }

  // sinh slots
  let cur = new Date(startTime);
  while (cur <= endTime) {
    const formatted = cur.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    slots.push(formatted);
    cur.setMinutes(cur.getMinutes() + interval);
  }

  return slots;
}

export function getTotalDuration(selected) {
  const base = selected?.itemService?.duration || 0;
  const addon = (selected?.itemService?.optionals || []).reduce(
    (sum, opt) => sum + (opt.timedura || 0),
    0
  );
  return base + addon;
}
export async function getTimeTechFrame(
  dataBooking,
  selectedTech,
  listDataService
) {
  try {
    const userChoosing = dataBooking.users.find((u) => u.isChoosing);
    const selectedDate = userChoosing.selectedDate || new Date();
    const dateSer = formatDateMMDDYYYY(selectedDate);
    const duration = getTotalDuration(selectedTech);
    const empID = selectedTech?.staff?.employeeID ?? selectedTech?.id;
    const res = await fetchAPI.get(
      `/api/appointment/gettimebookonline?date=${dateSer}&duration=${duration}&rvcno=336&empID=${empID}`
    );

    renderTimeSlotsForTech(
      dataBooking,
      selectedTech,
      selectedDate,
      listDataService,
      res.data
    );
  } catch (e) {
    console.error("[getTimeTechFrame]", {
      message: e.message,
      stack: e.stack,
      name: e.name,
    });
  }
}

export function createTabTech({
  dataBooking,
  data,
  callback,
  listDataService,
  itemWidth = "200px",
  index = null,
}) {
  const container = document.getElementById("comboBox");
  container.classList.add("tab-tech");
  container.innerHTML = `
      <div class="tab-list">
        ${data
          .map(
            (item) => `
          <div
            class="tab-item ${item.staff.isChoosing ? "active" : ""}"
            data-id="${item.staff.employeeID}"
            style="width:${itemWidth}"
          >
            ${item.staff.nickName}

            <p class="icon-mark-staff">
              <i class="fa-solid fa-check"></i>
            </p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  const items = container.querySelectorAll(".tab-item");

  items.forEach((itemEl) => {
    itemEl.addEventListener("click", () => {
      // clear active
      items.forEach((el) => el.classList.remove("active"));
      data.forEach((d) => (d.staff.isChoosing = false));

      // set active
      itemEl.classList.add("active");

      const id = itemEl.dataset.id;
      const selected = data.find((d) => d.staff.employeeID == id);
      if (selected) {
        selected.staff.isChoosing = true;
        const newBooking = {
          ...dataBooking,
          users: dataBooking.users.map((u) => {
            return {
              ...u,
              services: u.services.map((svc) => ({
                ...svc,
                itemService: svc.itemService.map((item) => ({
                  ...item,
                  selectedStaff: {
                    ...item.selectedStaff,
                    isChoosing: item.selectedStaff.employeeID == id,
                  },
                })),
              })),
            };
          }),
        };
        templateStore.setState({ dataBooking: newBooking });
      }
      if (callback) callback(dataBooking, selected, listDataService);
    });
  });

  // kiểm tra tab đang active
  let activeEl = container.querySelector(".tab-item.active");

  // nếu chưa có tab nào active thì active tab đầu tiên
  // Trường hợp này chỉ xảy ra khi chọn tech đàu tiên
  if (!activeEl && items.length === 1) {
    const firstEl = items[0];
    firstEl.classList.add("active");

    const firstId = firstEl.dataset.id;
    const firstSelected = data.find((d) => d.staff.employeeID == firstId);

    data.forEach((d) => (d.staff.isChoosing = false));

    if (firstSelected) {
      const newBooking = {
        ...dataBooking,
        users: dataBooking.users.map((u) => ({
          ...u,
          services: u.services.map((svc) => ({
            ...svc,
            itemService: svc.itemService.map((item) => ({
              ...item,
              selectedStaff: {
                ...item.selectedStaff,
                isChoosing: item.selectedStaff.employeeID == firstId,
              },
            })),
          })),
        })),
      };

      templateStore.setState({ dataBooking: newBooking });
    }

    if (callback) callback(dataBooking, firstSelected, listDataService);
  }
}

export function buildTechDataFromBooking(user) {
  if (!user || !user.services) return [];
  JSON.stringify();
  let rows = [];
  user.services.forEach((svc) => {
    svc.itemService.forEach((item) => {
      rows.push({
        id: item.selectedStaff.employeeID, // key duy nhất
        staff: JSON.parse(JSON.stringify(item.selectedStaff)), // object thợ không copy địa chỉ thay đổi ảnh hưởng tới listStaffUser
        itemService: JSON.parse(JSON.stringify(item)), // object service
      });
    });
  });

  // lọc unique theo id
  const unique = [];
  const seen = new Set();

  rows.forEach((r) => {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      unique.push(r);
    }
  });

  return unique;
}

export function renderServiceTechCombo(
  dataBooking,
  listDataService,
  index = null
) {
  const user = dataBooking.users.find((u) => u.isChoosing); // lấy user đang chọn
  if (!user) return;
  const data = buildTechDataFromBooking(user);
  createTabTech({
    dataBooking,
    data,
    itemWidth: "200px",
    callback: getTimeTechFrame,
    listDataService,
    index: index,
  });

  // Sau khi render tab, check lại staff nào đã có chọn time
  user.services.forEach((svc) => {
    svc.itemService.forEach((item) => {
      if (item.selectedStaff) {
        const empID = item.selectedStaff.employeeID;
        const hasTime = !!item.selectedStaff.selectedTimeSlot;
        updateTabMark(empID, hasTime);
      }
    });
  });
}
export function renderTimeSlotsForDate(dataBooking, slotTimeForSelect = {}) {
  const container = $("#timeSlotsContainer");
  container.empty();
  //timeslot khi chưa chọn thợ
  const workingHoursByWeekday = {
    0: [], // Chủ nhật - không làm
    1: ["08:00", "20:00"], // Thứ 2
    2: ["08:00", "20:00"], // Thứ 3
    3: ["08:00", "20:00"], // Thứ 4
    4: ["08:00", "20:00"], // Thứ 5
    5: ["08:00", "20:00"], // Thứ 6
    6: ["08:00", "20:00"], // Thứ 7
  };
  let selectedDate =
    templateStore.getState().dataBooking.users.find((u) => u.isChoosing)
      .selectedDate || new Date();
  const weekday = selectedDate.getDay();
  const workingRange = workingHoursByWeekday[weekday];
  if (!workingRange || workingRange.length === 0) {
    container.append(
      `<div class="time-slot">Không có giờ làm việc hôm nay.</div>`
    );
    return;
  }
  let slots = generateTimeSlotsDynamic(
    selectedDate,
    workingRange[0],
    workingRange[1]
  );
  // khi đã chọn thợ
  if (Object.keys(slotTimeForSelect).length > 0) {
    slots = slotTimeForSelect.map((item) => item.time);
  }
  function removeAmPm(timeStr = "") {
    if (typeof timeStr !== "string") return timeStr;
    return timeStr.replace(/\s?(AM|PM)$/i, "").trim();
  }
  slots.forEach((slot) => {
    const div = $(`
        <div class="time-slot">
          <span>${removeAmPm(slot)}</span>
          <span>${getAMPM(slot)}</span>
          <div class="circle">
            <div class="dot"></div>
          </div>
        </div>
      `);
    container.append(div);
  });
  container.off("click", ".time-slot");

  // Nếu user đã có selectedTimeSlot thì đánh dấu slot tương ứng
  const user = dataBooking.users.find((u) => u.isChoosing);
  if (user && user.selectedTimeSlot) {
    const match = container.find(".time-slot").filter(function () {
      return (
        $(this).find("span").text().trim() ===
        String(user.selectedTimeSlot).trim()
      );
    });
    if (match.length) {
      container.find(".time-slot").removeClass("selected");
      match.first().addClass("selected");
      // scroll tới slot
      // container.animate({ scrollTop: match.first().position().top - 40 }, 300);
    } else {
    }
  }
}
import {
  showScrollToFinalBooking,
  updateScrollButton,
} from "../scroll-quickly/scroll-quickly.js";

import { renderSumary } from "../sumary/sumary.js";
import { formatDateMMDDYYYY } from "../helper/format-day.js";
import { fetchAPI } from "../site.js";
import { templateStore } from "../store/template-store.js";
$(function () {
  $(document).on("click", "#timeSlotsContainer .time-slot", async function () {
    const $slot = $(this);
    const $wrap = $slot.closest("#timeSlotsContainer");

    // UI update ngay lập tức
    $wrap.find(".time-slot.selected").removeClass("selected");
    $slot.addClass("selected");
    (async () => {
      const updateDataBooking = templateStore.getState().dataBooking;
      const { getListDataService } = templateStore.getState();
      const listDataService = await getListDataService();
      const userChoosing = updateDataBooking.users.find((u) => u.isChoosing);

      if (userChoosing) {
        userChoosing.selectedTimeSlot = $(this).find("span").text();
        const selectedDateCur = userChoosing.selectedDate;

        // Cập nhật trong staff
        userChoosing.services = userChoosing.services.map((svc) => {
          return {
            ...svc,
            itemService: svc.itemService.map((item) => {
              return {
                ...item,
                selectedStaff: {
                  ...item.selectedStaff,
                  selectedTimeSlot: $(this).find("span").text(),
                  selectedDate: selectedDateCur,
                },
              };
            }),
          };
        });
      }
      // Cập nhật store
      const newBooking = {
        ...updateDataBooking,
        users: updateDataBooking.users.map((u) =>
          u.id === userChoosing.id ? userChoosing : u
        ),
      };

      templateStore.setState({ dataBooking: newBooking });
      // Kiểm tra userChoosing đã được chọn time và service đầy đủ chưa, đã đủ thì ẩn btn scroll
      const isFinalBooking = showScrollToFinalBooking(userChoosing);
      isFinalBooking &&
        updateScrollButton({
          target: "#section-booking",
          trigger: "#trigger-booking",
          triggerBanner: "#triggerBlockSumary",
          text: "Continue Booking",
          icon: "fa fa-hand-pointer down",
          force: false,
        });

      // Cập nhật đã chọn cho staff
      // renderServiceTechCombo(newBooking, listDataService);
      // Cập nhật sumary
      renderSumary(newBooking, listDataService);
    })();
  });
});
