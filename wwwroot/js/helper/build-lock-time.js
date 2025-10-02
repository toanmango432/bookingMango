// Build payload locktime
export function buildLocktimePayloadTemplate(user) {
  const RVCNo = templateStore.getState().RVCNo;
  const payloads = [];
  user.services.forEach((service) => {
    service.itemService.forEach((item) => {
      const staff = item.selectedStaff;
      if (!staff || !staff.employeeID) return;

      // start time
      const startMoment = moment(
        `${staff.selectedDate} ${staff.selectedTimeSlot}`,
        "MM/DD/YYYY HH:mm"
      );

      // tính tổng duration
      let totalDuration = item.duration || 0;
      if (item.optionals && item.optionals.length > 0) {
        totalDuration += item.optionals.reduce(
          (sum, opt) => sum + (opt.timedura || 0),
          0
        );
      }

      // end time
      const endMoment = startMoment.clone().add(totalDuration, "minutes");

      // build payload
      const payload = {
        EmployeeID: staff.employeeID.toString(),
        FromTime: startMoment.format("MM-DD-YYYY hh:mm A"),
        EndTime: endMoment.format("MM-DD-YYYY hh:mm A"),
        Key: `${user.id}|${moment().utc().format("MMDDYYYYhhmmss")}`,
        RVCNo: RVCNo,
      };

      payloads.push(payload);
    });
  });

  return payloads;
}
// Build payload locktime
export function buildLocktimePayloadOB(user) {
  console.log("user: ", user);
  const RVCNo = salonStore.getState().RVCNo;
  const payloads = [];
  user.services.forEach((service) => {
    service.itemService.forEach((item) => {
      const staff = item.selectedStaff;
      if (!staff || !staff.employeeID) return;

      // start time
      const startMoment = moment(
        `${moment(user.selectedDate).format("MM/DD/YYYY")} ${
          user.selectedTimeSlot
        }`,
        "MM/DD/YYYY HH:mm"
      );

      console.log("start: ", startMoment);

      // tính tổng duration
      let totalDuration = item.duration || 0;
      if (item.optionals && item.optionals.length > 0) {
        totalDuration += item.optionals.reduce(
          (sum, opt) => sum + (opt.timedura || 0),
          0
        );
      }

      // end time
      const endMoment = startMoment.clone().add(totalDuration, "minutes");

      // build payload
      const payload = {
        EmployeeID: staff.employeeID.toString(),
        FromTime: startMoment.format("MM-DD-YYYY hh:mm A"),
        EndTime: endMoment.format("MM-DD-YYYY hh:mm A"),
        Key: `${user.id}|${moment().utc().format("MMDDYYYYhhmmss")}`,
        RVCNo: RVCNo,
      };

      payloads.push(payload);
    });
  });

  return payloads;
}

import { salonStore } from "../store/new-online-store.js";
import { templateStore } from "../store/template-store.js";
