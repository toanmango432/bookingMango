// import component
import { fetchAPI } from "../../site.js";
import { salonStore } from "../../store/new-online-store.js";
import { HeaderSalon } from "../header/header-salon.js";
import { formatDateMMDDYYYY } from "../../helper/format-day.js";
import { jsonToXml } from "../../helper/xlm-to-json.js";
import { maskCardNumber } from "../../helper/format-card.js";
import { renderPaymentConfirmationForm } from "../../popup/content/payment-confirm.js";
import { renderBasePopup } from "../popup/base.js";
import { startConfirmAnimation } from "../../helper/confirm-animation.js";
import { closePopupContainerTemplate } from "../../popup/close-popup.js";

function buildServiceSummary(data, listDataService) {
  const dataService = data.services;

  const images = data.images ? data.images : [];
  if (!Array.isArray(dataService)) return [];

  const listServiceUser = dataService
    .map((service) => {
      const foundService = listDataService.find(
        (s) => s.item.id === service.idService
      );
      if (!foundService) return null;

      const serviceInfo = {
        services: {
          id: foundService.item.id,
          nameService: foundService.item.value,
        },
        itemService: service.itemService
          .map((item) => {
            const matchedItem = foundService.item.listItem.find(
              (i) => i.id === item.idItemService
            );
            if (!matchedItem) return null;

            return {
              title: matchedItem.title,
              subTitle: matchedItem.subTitle,
              priceRental: matchedItem.priceRental,
              timetext: matchedItem.timetext,
              selectedStaff: item.selectedStaff,
              optionals: item.optionals ?? [],
              idItemService: item.idItemService,
            };
          })
          .filter(Boolean),
      };

      return serviceInfo;
    })
    .filter(Boolean);

  return {
    listServiceUser,
    images,
  };
}
export function renderSumary(dataBooking, listDataService) {
  const store = salonStore.getState();
  const $wrapNewOnline = $(".wrap-newonline");
  $wrapNewOnline.empty();
  const salonChoosing = store.salonChoosing;

  const htmlHeaderSalon = HeaderSalon(salonChoosing);

  // Kiểm tra có user tất cả user chọn xong servce và timming
  const allSelected = dataBooking.users.every((user) => {
    return (
      Array.isArray(user.services) &&
      user.services.length > 0 &&
      user.services.every(
        (service) =>
          Array.isArray(service.itemService) &&
          service.itemService.length > 0 &&
          service.itemService.every(
            (item) => item.selectedStaff,
            user.selectedDate && user.selectedTimeSlot
          )
      )
    );
  });
  if (!allSelected) {
    $wrapNewOnline.append("");
    return;
  }

  const owner = dataBooking.users[0];

  // Kiểm tra mảng users
  const hasUserWithService = dataBooking.users.some(
    (user) => Array.isArray(user.services) && user.services.length > 0
  );

  if (!Array.isArray(dataBooking.users) || !hasUserWithService) {
    return ``;
  }

  // hàm tính tiền tạm thời, do data chưa chuẩn
  function parsePrice(priceStr) {
    // Bỏ ký tự $ và chuyển sang số
    if (typeof priceStr === "number") return priceStr;
    return parseFloat(priceStr.replace("$", "")) || 0;
  }

  function parseTime(timeStr) {
    if (!timeStr) return 0;
    if (typeof timeStr === "number") return timeStr;
    return parseInt(timeStr.replace(/[^0-9]/g, "")) || 0;
  }

  function getTotalPrice(service) {
    const basePrice = parsePrice(service.priceRental);

    const optionalTotal = (service.optionals || []).reduce((sum, opt) => {
      return sum + parsePrice(opt.price);
    }, 0);

    const total = basePrice + optionalTotal;

    return total.toFixed(2);
  }

  let totalPayment = 0;

  const htmlSumary = `
    <div class="wrap-content-salon bg-choose-time">
        <div class="header-sertech">
            ${htmlHeaderSalon}
        </div>
        <div class="wrap-sumary">
            <div id="section-booking" class="container-sumary">
                <div class="header-sumary">
                    <h2 class="title-header-sumary text-uppercase">Booking sumary</h2>
                    <p class="sub-time-sumary">14:00, Thu, May 14 2025</p>
                </div>
                <div class="wrap-list-sumary">
                    ${dataBooking.users
                      .map((userBooking) => {
                        const dataRefact = buildServiceSummary(
                          userBooking,
                          listDataService
                        );
                        // tính tổng bản ghi, tổng tiền và tổng time
                        let totalServices = 0;
                        let totalMinutes = 0;
                        let userTotalPayment = 0;

                        if (
                          dataRefact.listServiceUser &&
                          Array.isArray(dataRefact.listServiceUser)
                        ) {
                          dataRefact.listServiceUser.forEach((item) => {
                            item.itemService.forEach((is) => {
                              totalServices += 1;

                              // Tính thời gian chính
                              totalMinutes += parseTime(is.timetext);

                              // Cộng thêm thời gian optional nếu có
                              const optionalMins = (is.optionals || []).reduce(
                                (sum, opt) => {
                                  return sum + parseTime(opt.timedura);
                                },
                                0
                              );
                              totalMinutes += optionalMins;

                              // cộng tiền service + optionals
                              userTotalPayment += Number(
                                getTotalPrice(is) || 0
                              );
                            });
                          });
                        }
                        // save total amount
                        // cộng dồn vào tổng của cả booking
                        totalPayment += userTotalPayment;
                        return `
                        <div class="item-sumary" data-id="${userBooking.id}">
                        <div class="top-item-sumary">
                            <div class="left-top-item-sumary">
                            <div class="user-book">
                                <h2>${
                                  userBooking.firstName
                                    ? userBooking.firstName
                                    : "Not Name"
                                }</h2>
                            </div>
                            <button class="edit-sumary">
                                <i class="fa-solid fa-pen-to-square"></i>
                                <span>Edit</span>
                            </button>
                            ${
                              owner.id !== userBooking.id
                                ? `
                                <button class="delete-sumary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M14.8359 10.7598V17.7598M10.8359 10.7598V17.7598M6.83594 6.75977V18.5598C6.83594 19.6799 6.83594 20.2395 7.05392 20.6674C7.24567 21.0437 7.55141 21.3502 7.92773 21.542C8.35514 21.7598 8.91493 21.7598 10.0328 21.7598H15.639C16.7569 21.7598 17.3159 21.7598 17.7433 21.542C18.1197 21.3502 18.4264 21.0437 18.6182 20.6674C18.8359 20.24 18.8359 19.6808 18.8359 18.5629V6.75977M6.83594 6.75977H8.83594M6.83594 6.75977H4.83594M8.83594 6.75977H16.8359M8.83594 6.75977C8.83594 5.82788 8.83594 5.36217 8.98818 4.99463C9.19117 4.50457 9.58026 4.11499 10.0703 3.91201C10.4379 3.75977 10.9041 3.75977 11.8359 3.75977H13.8359C14.7678 3.75977 15.2338 3.75977 15.6013 3.91201C16.0914 4.11499 16.4806 4.50457 16.6836 4.99463C16.8358 5.36217 16.8359 5.82788 16.8359 6.75977M16.8359 6.75977H18.8359M18.8359 6.75977H20.8359" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Delete
                                </button>
                                `
                                : ""
                            }
                            </div>
                            <div class="right-top-item-sumary">
                            <button class="btn-upload-image">Upload Image ${
                              dataRefact.images.length !== 0
                                ? `(${dataRefact.images.length})`
                                : ""
                            }</button>
                            </div>
                        </div>
                        <div class="body-item-sumary">
                            ${
                              dataRefact.listServiceUser &&
                              dataRefact.listServiceUser
                                .map((item) => {
                                  const services = item.services;
                                  const itemService = item.itemService;
                                  return itemService
                                    .map((is) => {
                                      return `
                                <div class="wrap-item-content" data-id=${
                                  services.id
                                } data-id-item=${is.idItemService}>
                                    <div class="item-content">
                                    <div class="p-wrap">
                                    <p class="text-name-service">${
                                      is?.title
                                    }</p>
                                    <p class="text-name-tech">${
                                      is.selectedStaff?.nickName
                                    }</p>
                                    <p class="text-time-dura">${
                                      is?.timetext
                                    }</p>
                                    <p class="text-price-serice">$ ${getTotalPrice(
                                      is
                                    )}</p>
                                    <div class="action-item-ser">
                                        ${
                                          /*
                                        <p class="edit-item-ser">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        </p>
                                        */ ""
                                        }
                                        <p class="delete-item-ser">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M14.8359 10.7598V17.7598M10.8359 10.7598V17.7598M6.83594 6.75977V18.5598C6.83594 19.6799 6.83594 20.2395 7.05392 20.6674C7.24567 21.0437 7.55141 21.3502 7.92773 21.542C8.35514 21.7598 8.91493 21.7598 10.0328 21.7598H15.639C16.7569 21.7598 17.3159 21.7598 17.7433 21.542C18.1197 21.3502 18.4264 21.0437 18.6182 20.6674C18.8359 20.24 18.8359 19.6808 18.8359 18.5629V6.75977M6.83594 6.75977H8.83594M6.83594 6.75977H4.83594M8.83594 6.75977H16.8359M8.83594 6.75977C8.83594 5.82788 8.83594 5.36217 8.98818 4.99463C9.19117 4.50457 9.58026 4.11499 10.0703 3.91201C10.4379 3.75977 10.9041 3.75977 11.8359 3.75977H13.8359C14.7678 3.75977 15.2338 3.75977 15.6013 3.91201C16.0914 4.11499 16.4806 4.50457 16.6836 4.99463C16.8358 5.36217 16.8359 5.82788 16.8359 6.75977M16.8359 6.75977H18.8359M18.8359 6.75977H20.8359" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        </p>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                `;
                                    })
                                    .join("");
                                })
                                .join("")
                            }
                        </div>
                        <div class="total-pay">
                            <p class="text-total-amount">Total (${totalServices})</p>
                            <p class="text-total-times">${totalMinutes} min</p>
                            <p class="text-total-price">$ ${userTotalPayment.toFixed(
                              2
                            )}</p>
                            <div class="action-item-ser"></div>
                        </div>
                        </div>
                    `;
                      })
                      .join("")}
                </div>
                <div class="confirm-booking">
                    <button class="btn-confirm-booking">
                        Confirm
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

  // gán totalPayment cho dataBooking
  dataBooking.totalAmount = totalPayment;
  $wrapNewOnline.append(htmlSumary);
}

$(document).ready(async function () {
  // Confirm payment final
  $(document).on("click", ".btn-next-payment-1", async function () {
    const store = salonStore.getState();
    const isMobile = $(window).width() <= 768;

    const $wrapNewOnline = $(".wrap-newonline");
    const $btn = $(this);
    // Tránh bấm nhiều lần
    if ($btn.hasClass("loading")) return;

    // Set trạng thái loading
    $btn.addClass("loading").prop("disabled", true);

    // Thêm loader (nếu chưa có)
    if ($btn.find(".btn-loader").length === 0) {
      $btn.prepend('<span class="btn-loader"></span>');
    }

    const dataBooking = store.dataBooking;
    console.log("dataBooking: ", dataBooking);

    // Chọn thẻ
    const cardChoosing = dataBooking.cardNumber.find((card) => card.isChoosing);

    // Tìm user0 (user có phone hoặc email)
    const user0 = dataBooking.users.find(
      (user) => user.phoneNumber || user.email
    );
    if (!user0) {
      console.error("Không tìm thấy user có phone hoặc email");
      $btn.removeClass("loading").prop("disabled", false);
      $btn.find(".btn-loader").remove();
      return;
    }

    const rcpCustomer = user0.rcpCustomer;
    const appointmentID = 0;
    const customerID = user0.id;
    const cardAuthorize = cardChoosing.cardAuthorize;
    const totalAmount = dataBooking.totalAmount || 0; // để tính remaining cho bill
    const rcvNo = store.RVCNo;
    const typeAuth = 1;
    const idCard = cardChoosing.id;

    let dataAddDeposit;
    try {
      const urlAddDeposit =
        `/api/card/adddeposit?RCPCustomer=${rcpCustomer}&AppointmentID=${appointmentID}&CustomerID=${customerID}&AuthorizeCardID=${cardAuthorize}&Amount=${totalAmount}&RVCNo=${rcvNo}&TypeAuthorize=${typeAuth}&ID=${idCard}`.replace(
          /\s+/g,
          ""
        );
      dataAddDeposit = await fetchAPI.get(urlAddDeposit);
    } catch (e) {
      console.error("[on.btn-next-payment]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
      $btn.removeClass("loading").prop("disabled", false);
      $btn.find(".btn-loader").remove();
      return;
    }

    // Tạo danh sách AppointmentSubject
    const list_appointmentSubject = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          list_appointmentSubject.add(item.title);
        });
      });
    });
    const result_list_appointmentSubject = Array.from(
      list_appointmentSubject
    ).join(", ");

    // Tạo danh sách thời gian đặt dịch vụ
    // nếu
    const serviceDateTimeSet = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          const staff = item.selectedStaff;
          if (staff && user.selectedDate && user.selectedTimeSlot) {
            let timeStr = user.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr = timeStr.slice(0, -2);
            }
            const dateTime = `${formatDateMMDDYYYY(
              user.selectedDate
            )} ${timeStr}:00`;
            serviceDateTimeSet.add(dateTime);
          }
        });
      });
    });

    const uniqueSelectedDates = Array.from(serviceDateTimeSet);
    const parsedDates = uniqueSelectedDates.map((dt) => new Date(dt));
    const minDate = new Date(Math.min(...parsedDates));
    const minDateStr = `${formatDateMMDDYYYY(minDate)} ${String(
      minDate.getHours()
    ).padStart(2, "0")}:${String(minDate.getMinutes()).padStart(2, "0")}:00`;

    // Hàm tính EndTime cho mỗi user
    function buildUserEndTimes(dataBooking) {
      const results = [];
      dataBooking.users.forEach((user) => {
        let earliestStart = null;
        let totalDuration = 0;

        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            const staff = item.selectedStaff;
            if (!user?.selectedDate || !user?.selectedTimeSlot) return;

            const [month, day, year] = formatDateMMDDYYYY(
              user.selectedDate
            ).split("/");
            let timeStr = user.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr = timeStr.slice(0, -2);
            }
            let [hour, minute] = timeStr.split(":");

            const start = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day),
              parseInt(hour),
              parseInt(minute),
              0
            );

            if (!earliestStart || start < earliestStart) {
              earliestStart = start;
            }

            let itemDuration = item.duration || 0;
            if (item.optionals?.length > 0) {
              itemDuration += item.optionals.reduce(
                (sum, opt) => sum + (opt.timedura || 0),
                0
              );
            }
            totalDuration += itemDuration;
          });
        });

        if (earliestStart) {
          const end = new Date(earliestStart.getTime() + totalDuration * 60000);
          const formatted = `${String(end.getMonth() + 1).padStart(
            2,
            "0"
          )}/${String(end.getDate()).padStart(
            2,
            "0"
          )}/${end.getFullYear()} ${String(end.getHours()).padStart(
            2,
            "0"
          )}:${String(end.getMinutes()).padStart(2, "0")}:${String(
            end.getSeconds()
          ).padStart(2, "0")}`;
          results.push(formatted);
        } else {
          results.push(minDateStr); // Dự phòng nếu không có thời gian
        }
      });
      return results;
    }

    const endTimes = buildUserEndTimes(dataBooking);

    // Tạo danh sách nickName thợ
    const uniqueNicknames = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          if (item.selectedStaff && item.selectedStaff.nickName) {
            uniqueNicknames.add(item.selectedStaff.nickName);
          }
        });
      });
    });
    const staffNickNames = Array.from(uniqueNicknames);

    // Tạo danh sách ID thợ
    const uniqueEmployeeID = new Set();
    dataBooking.users.forEach((user) => {
      user.services.forEach((service) => {
        service.itemService.forEach((item) => {
          if (item.selectedStaff && item.selectedStaff.employeeID) {
            uniqueEmployeeID.add(item.selectedStaff.employeeID);
          }
        });
      });
    });
    const listUniqueEmID = Array.from(uniqueEmployeeID);

    // Tính tổng duration
    function calcTotalDuration(dataBooking) {
      let totalDuration = 0;
      dataBooking.users.forEach((user) => {
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            let itemDuration = item.duration || 0;
            if (item.optionals && item.optionals.length > 0) {
              item.optionals.forEach((opt) => {
                itemDuration += opt.timedura || 0;
              });
            }
            totalDuration += itemDuration;
          });
        });
      });
      return totalDuration;
    }
    const totalTimeDuration = calcTotalDuration(dataBooking);

    // Hàm tính EndTime
    function calcEndTime(startDateTime, duration) {
      const [date, time] = startDateTime.split(" ");
      const [month, day, year] = date.includes("/")
        ? date.split("/").map(Number)
        : date.split("-").map(Number);
      const [h, m, s] = time.split(":").map(Number);

      const dt = new Date(year, month - 1, day, h, m, s || 0);
      dt.setMinutes(dt.getMinutes() + duration);

      const MM = String(dt.getMonth() + 1).padStart(2, "0");
      const DD = String(dt.getDate()).padStart(2, "0");
      const YYYY = dt.getFullYear();
      const HH = String(dt.getHours()).padStart(2, "0");
      const mm = String(dt.getMinutes()).padStart(2, "0");
      const SS = String(dt.getSeconds()).padStart(2, "0");

      return `${MM}-${DD}-${YYYY} ${HH}:${mm}:${SS}`;
    }

    // Hàm tạo danh sách Item cho mỗi user
    function buildItemListForUser(user, apptIndex) {
      let index = 0;
      const listItemDetail = [];
      let prevEndTime = null;

      user.services.forEach((service) => {
        service.itemService.forEach((itemService) => {
          const staff = itemService.selectedStaff;

          let totalPrice = parseFloat(itemService.price) || 0;
          let totalDuration = parseInt(itemService.duration) || 0;

          if (itemService.optionals && Array.isArray(itemService.optionals)) {
            itemService.optionals.forEach((opt) => {
              totalPrice += parseFloat(opt.price) || 0;
              totalDuration += parseInt(opt.timedura) || 0;
            });
          }

          let startTime;
          if (prevEndTime) {
            startTime = prevEndTime;
          } else {
            let timeStr = user.selectedTimeSlot.trim();
            if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
              timeStr = timeStr.slice(0, -2);
            }
            startTime = `${formatDateMMDDYYYY(
              user.selectedDate
            )} ${timeStr}:00`;
          }

          const endTime = calcEndTime(startTime, totalDuration);
          prevEndTime = endTime;

          listItemDetail.push({
            Index: index++,
            ParentAddon: -1,
            ItemID: itemService.idItemService,
            ItemName: itemService.title,
            ItemPrice: totalPrice.toFixed(2),
            Duration: totalDuration,
            EmployeeID: staff.employeeID,
            EmployeeName: staff.nickName,
            Type: 1,
            IsCategory: 0,
            IsRequestTech: 1,
            StartTime: startTime,
            EndTime: endTime,
            DurationItem: totalDuration,
            IsChangeTime: 0,
            ProductCharge: 0,
            Turn: 0,
            Comission: 0,
            IDCombo: 0,
            AddonId: 0,
          });
        });
      });

      return listItemDetail;
    }

    // Hàm tạo danh sách Appointment
    function buildAppointments(dataBooking, user0) {
      const appointments = [];
      let apptIndex = 0;

      const customerName = `${user0.firstName || ""} ${
        user0.lastName || ""
      }`.trim();
      const customerPhone = user0.phoneNumber ? user0.phoneNumber.slice(1) : "";

      dataBooking.users.forEach((user, userIndex) => {
        const listItemDetail = buildItemListForUser(user, apptIndex);

        // Tính TotalAmount cho user này
        let userTotalAmount = 0;
        listItemDetail.forEach((item) => {
          userTotalAmount += parseFloat(item.ItemPrice) || 0;
        });

        // Tạo danh sách EmployeeID và GroupEmployeeName cho user này
        const userEmployeeIDs = new Set();
        const userNickNames = new Set();
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            if (item.selectedStaff && item.selectedStaff.employeeID) {
              userEmployeeIDs.add(item.selectedStaff.employeeID);
            }
            if (item.selectedStaff && item.selectedStaff.nickName) {
              userNickNames.add(item.selectedStaff.nickName);
            }
          });
        });

        // Tạo AppointmentSubject cho user này
        const userAppointmentSubject = new Set();
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            userAppointmentSubject.add(item.title);
          });
        });
        const userAppointmentSubjectStr = Array.from(
          userAppointmentSubject
        ).join(", ");

        // Tính ServiceDate và StartTime cho user này
        const userServiceDateTimeSet = new Set();
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            const staff = item.selectedStaff;
            if (staff && user.selectedDate && user.selectedTimeSlot) {
              let timeStr = user.selectedTimeSlot.trim();
              if (timeStr.endsWith("AM") || timeStr.endsWith("PM")) {
                timeStr = timeStr.slice(0, -2);
              }
              const dateTime = `${formatDateMMDDYYYY(
                user.selectedDate
              )} ${timeStr}:00`;
              userServiceDateTimeSet.add(dateTime);
            }
          });
        });
        const userSelectedDates = Array.from(userServiceDateTimeSet);
        const userParsedDates = userSelectedDates.map((dt) => new Date(dt));
        const userMinDate =
          userParsedDates.length > 0
            ? new Date(Math.min(...userParsedDates))
            : minDate;
        const userMinDateStr = `${formatDateMMDDYYYY(userMinDate)} ${String(
          userMinDate.getHours()
        ).padStart(2, "0")}:${String(userMinDate.getMinutes()).padStart(
          2,
          "0"
        )}:00`;

        // Tính tổng duration cho user này
        let userTotalDuration = 0;
        user.services.forEach((service) => {
          service.itemService.forEach((item) => {
            let itemDuration = item.duration || 0;
            if (item.optionals && item.optionals.length > 0) {
              item.optionals.forEach((opt) => {
                itemDuration += opt.timedura || 0;
              });
            }
            userTotalDuration += itemDuration;
          });
        });

        const appointment = {
          AppointmentID: "0",
          CustomerID: customerID,
          CustomerName: customerName,
          CustomerPhone: customerPhone,
          AppointmentSubject: userAppointmentSubjectStr,
          ServiceDate: userMinDateStr,
          StartTime: userMinDateStr,
          EndTime: endTimes[userIndex] || userMinDateStr,
          AppointmentStatusID: "1",
          EmployeeID: Array.from(userEmployeeIDs),
          GroupEmployeeName: Array.from(userNickNames),
          AptComment: "",
          TotalAmount: userTotalAmount.toFixed(2), // Tổng tiền của user này
          DepositAmount: dataBooking.paymentDeposit || 0,
          CrearteBy: "0",
          IsBookOnline: "1",
          IsConfirmOB: "0",
          BarcodeTicket: "",
          TotalDuration: userTotalDuration,
          IDParty: "0",
          IsStartAllSameTime: "0",
          ApptIndex: String(apptIndex),
          Detail: {
            ApptIndex: String(apptIndex),
            Item: listItemDetail,
          },
        };

        appointments.push(appointment);
        apptIndex++;
      });

      return appointments;
    }

    // Tạo bookXLM
    const appointments = buildAppointments(dataBooking, user0);
    const bookXLM = {
      Appointment: appointments.length > 1 ? appointments : appointments[0],
    };
    const xmlString = jsonToXml(bookXLM, "root");

    const payloadBookXLM = {
      RVCNo: store.RVCNo,
      xml: xmlString,
      isConfirm: "0",
      CustomerID: customerID.toString(),
    };

    // Book now
    let dataBookXLM;
    try {
      dataBookXLM = await fetchAPI.post(
        "/api/appointment/bookAptXML",
        payloadBookXLM
      );
    } catch (e) {
      console.error("[dataBookXLM]", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    } finally {
      $btn.removeClass("loading").prop("disabled", false);
      $btn.find(".btn-loader").remove();
    }

    if (dataBookXLM.appointmentID) {
      const RVCNo = store.RVCNo;
      const keyOnline = "OnlineBookingConfirm";
      const keyTech = "OB.NotifyTech";
      const type = "sms";
      const appointmentID = dataBookXLM.appointmentID;

      let resManualNotiOnline;
      try {
        resManualNotiOnline = await fetchAPI.get(
          `/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyOnline}&type=${type}&appointmentID=${appointmentID}`
        );
      } catch (e) {
        console.error("[resManualNotiOnline]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      if (resManualNotiOnline.status !== 200) return;

      let resManualNotiTech;
      try {
        resManualNotiTech = await fetchAPI.get(
          `/api/appointment/SendManualNotify?RVCNo=${RVCNo}&key=${keyTech}&type=${type}&appointmentID=${appointmentID}`
        );
      } catch (e) {
        console.error("[resManualNotiTech]", {
          message: e.message,
          stack: e.stack,
          name: e.name,
        });
      }
      if (resManualNotiTech.status !== 200) return;
    } else {
      console.log("Not res appointmentID");
    }

    const findCardChoosing = dataBooking.cardNumber.find((c) => c.isChoosing);
    const dataBill = {
      image: "/assets/images/payment-success/img-succes-payment.png",
      ticketNumber: dataBookXLM.appointmentID,
      dateTime: dataBookXLM.bookedDate,
      paymentMethodLabel: findCardChoosing.cardType,
      paymentMethodMasked: maskCardNumber(findCardChoosing.last4),
      deposit: dataBooking.paymentDeposit,
      remaining:
        dataBooking.totalAmount - parseFloat(dataBooking.paymentDeposit),
      requestAnotherCount: 5,
      currencyDeposit: dataBooking.currencyDeposit,
    };

    const contentSuccessPayment = renderPaymentConfirmationForm(dataBill);
    let height = 976;
    let width = 886;
    if (isMobile) {
      height = 676;
      width = "100%";
    }
    const html = renderBasePopup(contentSuccessPayment, false, height, width);

    $wrapNewOnline.append(html);
    setTimeout(() => {
      $(".overlay-screen").addClass("show");
    }, 10);

    setTimeout(() => {
      startConfirmAnimation(1, {
        selector: ".wrap-popup-payment-confirmation .check-circle",
        buttonSelector: ".wrap-popup-payment-confirmation .btn-request-another",
      });
      // Thêm đếm ngược 5 giây
      let countdownSeconds = 10;
      const countdownElement = $(
        ".wrap-popup-payment-confirmation .countdown-seconds"
      );
      console.log("countdownElement: ", countdownElement);
      const countdownInterval = setInterval(() => {
        countdownSeconds -= 1;
        countdownElement.text(countdownSeconds);

        if (countdownSeconds <= 0) {
          clearInterval(countdownInterval);
          // Đóng popup
          closePopupContainerTemplate();
          // Reload trang
          window.location.reload();
        }
      }, 1000);
    }, 100);
  });
});
