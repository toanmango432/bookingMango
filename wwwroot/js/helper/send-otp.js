import { fetchAPI } from "../site.js";
import { buildLocktimePayload } from "./build-lock-time.js";
import { unFormatPhoneNumber } from "./format-phone.js";
import { renderPoliciesForm } from "../popup/content/policies.js";
import { updateGuestSection } from "../layout-template/layout.js";
import { renderBasePopup } from "../popup/base.js";
import { startPopupFlowCountdown } from "./count-down.js";
// import constant
import { typeInput, typeBookingEnum } from "../constants/template-online.js";
import { colorPrimary } from "../templateDetail.js";
// import store
import { templateStore } from "../store/template-store.js";
import { nextFormRegister } from "../templateDetail.js";
// Hàm dùng để gửi OTP (email hoặc phone)
export async function sendOTP(inputValue, type) {
  const RVCNo = templateStore.getState().RVCNo;

  const isMobile = $(window).width() <= 768;
  const $wrapNewOnline = $(".wrap-newonline");

  await templateStore.getState().getDataSetting();

  let popupFlowCountdownInterval =
    templateStore.getState().popupFlowCountdownInterval;
  const dataBooking = templateStore.getState().dataBooking;
  const policySetting = templateStore.getState().policySetting;
  const currencyDeposit = templateStore.getState().currencyDeposit;
  const paymentDeposit = templateStore.getState().paymentDeposit;

  const newDataBooking = {
    ...dataBooking,
    currencyDeposit: currencyDeposit,
    paymentDeposit: paymentDeposit,
  };

  templateStore.setState({
    dataBooking: newDataBooking,
  });

  if (type == typeInput.PHONE) {
    const phoneFormatVerify = inputValue;
    dataBooking.users[0].phoneNumber = phoneFormatVerify;
    dataBooking.users[0].email = "";
    try {
      const phoneUnformat = unFormatPhoneNumber(phoneFormatVerify);
      const resVerifyAccount = await fetchAPI.get(
        `/api/client/getcustomerfamily?RVCNo=${RVCNo}&key=${phoneUnformat}&ismail=false`
      );
      if (resVerifyAccount.status === 201 || resVerifyAccount.status === 200) {
        // check exit authorized accout
        const resExitAccount = await fetchAPI.get(
          `/api/card/checkexistaccountauthorize?CustomerID=${resVerifyAccount?.data[0]?.customerID}&RVCNo=${RVCNo}&TypeAuthorize=0`
        );
        // Nếu chưa exits create bằng form register
        if (resExitAccount.data === false) {
          // create authorized
          const zipCode = "84101";
          const FirstName = resVerifyAccount.data[0].firstName;
          const LastName = resVerifyAccount.data[0].lastName;
          const Email = resVerifyAccount.data[0].email;
          const Phone = resVerifyAccount.data[0].contactPhone;
          const CustomerID = resVerifyAccount.data[0].customerID;
          const TypeAuthorize = 0; // default

          const url = `/api/card/createauthorize?RVCNo=${RVCNo}&ZipCode=${encodeURIComponent(
            zipCode
          )}&FirstName=${encodeURIComponent(
            FirstName
          )}&LastName=${encodeURIComponent(
            LastName
          )}&Email=${encodeURIComponent(Email)}&Phone=${encodeURIComponent(
            Phone
          )}&CustomerID=${CustomerID}&TypeAuthorize=${TypeAuthorize}`;

          const resCreateAuth = await fetchAPI.get(url);
          if (resCreateAuth.status !== 200) {
            console.log(
              "Tạo mới authorized thất bại, vui lòng liên hệ dev T:)"
            );
            return;
          }
        }
      }
      if (resVerifyAccount.status === 201) {
        // lưu lại customerID
        dataBooking.users[0].id = resVerifyAccount?.data?.customerID;
        templateStore.setState({ dataBooking });
        // chưa verify, cần gửi OTP
        return await fetchAPI.get(
          `/api/user/verifycode?phone=${phoneUnformat}&portalCode=${encodeURIComponent(
            "+84"
          )}&isMail=false`
        );
      } else if (resVerifyAccount.status === 202) {
        // chưa đăng ký account
        try {
          return await fetchAPI.get(
            `/api/user/sendotplogin?RVCNo=${RVCNo}&phone=${phoneUnformat}&isMail=false`
          );
        } catch (e) {
          console.error("[sendOTP]", {
            message: e.message,
            stack: e.stack,
            name: e.name,
          });
        }
      } else if (resVerifyAccount.status === 200) {
        // tồn tại và verified
        // Xử lý khi typeBooking đang là GUEST hay FAMILY
        // Chưa có data FAMILY, tạm thời xử lý GUEST
        const typeBooking = newDataBooking.type;

        newDataBooking.users[0] = {
          ...newDataBooking.users[0],
          email: resVerifyAccount?.data[0]?.email,
          phoneNumber: resVerifyAccount?.data[0]?.contactPhone,
          firstName: resVerifyAccount?.data[0]?.firstName,
          lastName: resVerifyAccount?.data[0]?.lastName,
          id: resVerifyAccount?.data[0]?.customerID,
          rcpCustomer: resVerifyAccount?.data[0]?.rcpCustomer,
          isChoosing: true,
          isVerify: true,
        };

        // update store
        templateStore.setState({
          dataBooking: newDataBooking,
        });

        if (typeBooking === typeBookingEnum.GUESTS) {
          // Add thêm 1 Guest rỗng
          $(".btn-increase").trigger("click");
        }

        // lấy listcard authorized tại đây
        const owner = newDataBooking.users[0];
        const customerID = owner.id;
        const rcpCustomer = owner.rcpCustomer;

        // locktime thợ đã chọn
        for (const user of newDataBooking.users) {
          const listPayload = buildLocktimePayload(user);
          for (const payload of listPayload) {
            try {
              await fetchAPI.post("/api/appointment/createlocktime", payload);
            } catch (e) {
              console.error("[sendOTP - locktime tech]", payload, e);
            }
          }
        }

        // get list card authorized
        try {
          const listCardAuthorized = await fetchAPI.post(
            `/api/card/getlistcardauthorize?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=${RVCNo}&TypeAuthorize=1`
          );
          if (listCardAuthorized.data)
            newDataBooking.cardNumber = listCardAuthorized.data;
          else return;
        } catch (e) {
          console.error("[sendOTP - list card authorized]", e.error);
        }
        const contentPolicies = renderPoliciesForm(policySetting);
        let height = 768;
        let width = 886;
        if (isMobile) {
          height = "fit-content";
          width = "100%";
        }
        const persistent = true;
        const html = renderBasePopup(
          contentPolicies,
          persistent,
          height,
          width
        );

        $wrapNewOnline.append(html);
        // count downtime
        if (!popupFlowCountdownInterval) {
          startPopupFlowCountdown(1800);
        }

        setTimeout(() => {
          $(".overlay-screen").addClass("show");
        }, 10);

        if (newDataBooking.type !== typeBookingEnum.ME) {
          $(".wrap-input-guests").removeClass("hidden");
          updateGuestSection(newDataBooking);
        }

        $(".wrap-advertise-page").css({ display: "none" });
        return null; // Không cần OTP nữa
      }
    } catch (e) {
      console.error("[sendOTP]: error", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    }
  } else if (type == typeInput.EMAIL) {
    const emailVerify = inputValue;
    dataBooking.users[0].phoneNumber = "";
    dataBooking.users[0].email = emailVerify;
    try {
      const resVerifyAccount = await fetchAPI.get(
        `/api/client/getcustomerfamily?RVCNo=${RVCNo}&key=${emailVerify}&ismail=true`
      );
      if (resVerifyAccount.status === 201 || resVerifyAccount.status === 200) {
        // check exit accout
        const resExitAccount = await fetchAPI.get(
          `/api/card/checkexistaccountauthorize?CustomerID=${resVerifyAccount?.data[0]?.customerID}&RVCNo=${RVCNo}&TypeAuthorize=0`
        );
        // Nếu chưa exits create authorized
        if (resExitAccount.data === false) {
          // create authorized
          const zipCode = "84101";
          const FirstName = resVerifyAccount.data[0].firstName;
          const LastName = resVerifyAccount.data[0].lastName;
          const Email = resVerifyAccount.data[0].email;
          const Phone = resVerifyAccount.data[0].contactPhone;
          const CustomerID = resVerifyAccount.data[0].customerID;
          const TypeAuthorize = 0; // default

          const url = `/api/card/createauthorize?RVCNo=${RVCNo}&ZipCode=${encodeURIComponent(
            zipCode
          )}&FirstName=${encodeURIComponent(
            FirstName
          )}&LastName=${encodeURIComponent(
            LastName
          )}&Email=${encodeURIComponent(Email)}&Phone=${encodeURIComponent(
            Phone
          )}&CustomerID=${CustomerID}&TypeAuthorize=${TypeAuthorize}`;

          const resCreateAuth = await fetchAPI.get(url);
          if (resCreateAuth.status !== 200) {
            console.log(
              "Tạo mới authorized thất bại, vui lòng liên hệ dev T:)"
            );
            return;
          }
        }
      }

      // Nếu chưa exits create
      if (resVerifyAccount.status === 201) {
        dataBooking.users[0].id = resVerifyAccount?.data[0]?.customerID;
        templateStore.setState({ dataBooking });
        // chưa verify, cần gửi OTP
        return await fetchAPI.get(
          `/api/user/verifycode?phone=${emailVerify}&portalCode=${encodeURIComponent(
            "+84"
          )}&isMail=true`
        );
      } else if (resVerifyAccount.status === 202) {
        // chưa đăng ký account
        try {
          return await fetchAPI.get(
            `/api/user/sendotplogin?RVCNo=${RVCNo}&phone=${emailVerify}&isMail=true`
          );
        } catch (e) {
          console.error("[sendOTP]", {
            message: e.message,
            stack: e.stack,
            name: e.name,
          });
        }
      } else if (resVerifyAccount.status === 200) {
        // tồn tại và verified
        // Xử lý khi typeBooking đang là GUEST hay FAMILY
        // Chưa có data FAMILY, tạm thời xử lý GUEST
        const typeBooking = newDataBooking.type;

        newDataBooking.users[0] = {
          ...newDataBooking.users[0],
          email: resVerifyAccount?.data[0]?.email,
          phoneNumber: resVerifyAccount?.data[0]?.contactPhone,
          firstName: resVerifyAccount?.data[0]?.firstName,
          lastName: resVerifyAccount?.data[0]?.lastName,
          id: resVerifyAccount?.data[0]?.customerID,
          rcpCustomer: resVerifyAccount?.data[0]?.rcpCustomer,
          isChoosing: true,
          isVerify: true,
        };

        // update store
        templateStore.setState({
          dataBooking: newDataBooking,
        });

        if (typeBooking === typeBookingEnum.GUESTS) {
          // Add thêm 1 Guest rỗng
          $(".btn-increase").trigger("click");
        }

        // lấy listcard authorized tại đây
        const owner = newDataBooking.users[0];
        const customerID = owner.id;
        const rcpCustomer = owner.rcpCustomer;

        // locktime thợ đã chọn
        for (const user of newDataBooking.users) {
          const listPayload = buildLocktimePayload(user);
          for (const payload of listPayload) {
            try {
              await fetchAPI.post("/api/appointment/createlocktime", payload);
            } catch (e) {
              console.error("[sendOTP - locktime tech]", payload, e);
            }
          }
        }

        // get list card authorized
        try {
          const listCardAuthorized = await fetchAPI.post(
            `/api/card/getlistcardauthorize?RCPCustomer=${rcpCustomer}&CustomerID=${customerID}&RVCNo=${RVCNo}&TypeAuthorize=1`
          );
          if (listCardAuthorized.data)
            newDataBooking.cardNumber = listCardAuthorized.data;
          else {
            console.log("Lỗi lấy danh sách thẻ thanh toán");
          }
        } catch (e) {
          console.error("[sendOTP - list card authorized]", e.error);
        }
        const contentPolicies = renderPoliciesForm(policySetting, colorPrimary);
        let height = 768;
        let width = 886;
        if (isMobile) {
          height = "fit-content";
          width = "100%";
        }
        const persistent = true;
        const html = renderBasePopup(
          contentPolicies,
          persistent,
          height,
          width
        );

        $wrapNewOnline.append(html);
        // count downtime
        if (!popupFlowCountdownInterval) {
          startPopupFlowCountdown(1800);
        }

        setTimeout(() => {
          $(".overlay-screen").addClass("show");
        }, 10);

        if (newDataBooking.type !== typeBookingEnum.ME) {
          $(".wrap-input-guests").removeClass("hidden");
          updateGuestSection(newDataBooking);
        }

        $(".wrap-advertise-page").css({ display: "none" });
        return null; // Không cần OTP nữa
      }
    } catch (e) {
      console.error("[sendOTP]: error", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
    }
  }
}
