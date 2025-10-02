// store/salonStore.js
import { fetchAPI } from "../site.js";
import {
  typeBookingEnum,
  genderEnum,
  idStaffDefault,
} from "../constants/template-online.js";
import { dataRelease } from "../templateDetail.js";
export const salonStore = {
  _state: null,
  _listeners: [],

  async load() {
    if (this._state) return this._state;
    let RVCNo = 336; // khởi tạo lần đầu
    const path = window.location.pathname;
    const parts = path.split("/");
    const lastPart = parts[parts.length - 1];
    if (lastPart && !isNaN(lastPart)) {
      RVCNo = Number(lastPart);
    }
    let selectedDate = new Date();
    let currentMonth = selectedDate.getMonth();
    let currentYear = selectedDate.getFullYear();
    let telInput;

    // --- DATA BOOKING mặc định ---
    // --- DATA BOOKING mặc định ---
    const createDefaultDataBooking = () => ({
      type: typeBookingEnum.ME,
      users: [
        {
          id: 1,
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          gender: genderEnum.MALE,
          services: [],
          selectedDate: new Date(),
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: true,
        },
      ],
      cardNumber: [],
    });

    let dataBooking = createDefaultDataBooking();
    // --- API: All salon ---
    let allSalon = [];
    const getAllSalon = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;
      try {
        const resSalon = await fetchAPI.get(
          `/api/store/getliststorechain?RVCNo=${newRVCNo}`
        );
        // lọc isBooKOnline
        if (Array.isArray(resSalon)) {
          const filteredSalons = resSalon.filter((salon) => salon.isBookOnline);
          salonStore.setState({ ...store, allSalon: filteredSalons });
          return filteredSalons;
        }

        // Nếu resSalon không phải là mảng, trả về mảng rỗng hoặc xử lý lỗi
        salonStore.setState({ ...store, allSalon: [] });
        return [];
      } catch (e) {
        console.error("[getAllSalon]", e);
      }
    };
    let requestClient = [];
    let getRequestClient = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;
      try {
        const resData = await fetchAPI.get(
          `/api/client/getrequestclient?RVCNo=${newRVCNo}`
        );
        salonStore.setState((prev) => ({
          ...prev,
          requestClient: resData?.data || [],
        }));
      } catch (e) {
        console.log("[getliststorechain]", e);
      }
    };

    let dataCustomerSerOfTech = [];
    let getDataCustomerSerOfTech = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;
      try {
        const resData = await fetchAPI.get(
          `/api/tech/gettechcustommenu?rvcNo=${newRVCNo}`
        );
        salonStore.setState((prev) => ({
          ...prev,
          dataCustomerSerOfTech: resData?.data || [],
        }));
      } catch (e) {
        console.error("[getliststorechain", e);
      }
    };
    // --- API: Services ---
    let dataServices = [];
    const getListDataService = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;
      try {
        const dataCategories = await fetchAPI.get(
          `/api/category/getallcategories?RVCNo=${newRVCNo}`
        );
        const dataItemServices = await fetchAPI.get(
          `/api/category/getallitem?RVCNo=${newRVCNo}`
        );

        const resDataServices = [];
        dataCategories.forEach((itemCar) => {
          if (!itemCar.isShowOB) return; // không show ra categoies isShowOB false

          const objCar = { item: {} };
          const categoryID = itemCar.categoryID;

          objCar.item.id = categoryID;
          objCar.item.value = itemCar.categoryName;

          const listItem = [];
          dataItemServices.forEach((itemSer) => {
            if (
              itemSer.categoryID === categoryID &&
              itemSer.isActive &&
              itemSer.isShowOB
            ) {
              const ser = {
                id: itemSer.itemID,
                title: itemSer.itemName,
                basePrice: itemSer.basePrice,
                baseCashPrice: itemSer.baseCashPrice,
                timetext: itemSer.duration,
                description: itemSer.description,
                listOptionAddOn: itemSer.listAddOn.map((iAdd) => ({
                  id: iAdd.addOnID,
                  title: iAdd?.itemName,
                  price: iAdd?.price,
                  priceDiscount: iAdd?.priceDiscount,
                  priceCash: iAdd?.priceCash || 0,
                  timedura: iAdd.duration,
                })),
              };
              listItem.push(ser);
            }
          });
          objCar.item.listItem = listItem;
          resDataServices.push(objCar);
        });
        salonStore.setState({
          ...store,
          dataServices: resDataServices,
        });
        return resDataServices;
      } catch (e) {
        console.error("[getDataListDataService]", e);
      }
    };

    // --- API: time key slot
    let timeKeySlot;
    const getTimeKeySlot = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;
      try {
        const paramOB = "OB.TimeFrameDistance";
        const resTimeKey = await fetchAPI.get(
          `/api/setting/getbykey?RVCNo=${newRVCNo}&ParaName=${paramOB}`
        );
        salonStore.setState({ ...store, timeKeySlot: resTimeKey?.data });
        return resTimeKey.data;
      } catch (e) {
        console.error("[getTimeKeySlot]", e);
      }
    };
    // --- API: time begin - end
    let timeBeginCurDate = null;
    const getTimeBeginCurDate = async (date) => {
      const store = salonStore.getState();
      // date: aa/bb/cccc
      try {
        const url = `/api/store/getweeksalonschedule?rvcNo=${RVCNo}&date=${encodeURIComponent(
          date
        )}`;
        //  api trả ra cả tuần nên phải lọc ra ngày hôm nay

        const resWeek = await fetchAPI.get(url);
        const timeBegin = resWeek?.data.find((item) => item.dateString == date);
        if (timeBegin) {
          salonStore.setState({ ...store, timeBeginCurDate: timeBegin });
        }
        return resWeek;
      } catch (e) {
        console.error("[getTimeBeginCurDate]", e);
      }
    };

    // --- API: Staff ---
    let listStaffUser;
    const getListUserStaff = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;

      try {
        const resTechFull = await fetchAPI.get(
          `/api/tech/gettechinfoofsalon?rvcNo=${newRVCNo}`
        );
        const staffDefault = {
          employeeID: idStaffDefault,
          imageFileName: "/assets/images/listUser/userAvailable.png",
          nickName: "Next Available",
        };
        const dataTech = resTechFull.data.filter(
          (item) => item.allowBookingOnline
        );
        dataTech.unshift(staffDefault);
        salonStore.setState((prev) => ({
          ...prev,
          listStaffUser: dataTech || [],
        }));

        return dataTech || [];
      } catch (e) {
        console.error("[getlistUserStaff]", e);
      }
    };

    // --- CART ---
    let dataCart = {
      order: [],
      noneOrder: { image: "/assets/images/cart-user/img_bg.svg" },
      btnBack: {
        text: "Back",
        bgColor: "#E6EEE8",
        borderColor: dataRelease?.color?.bgPrimary || "#04972F",
      },
    };

    // --- Khách hàng ---
    let dataMe = [
      {
        id: 1,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: genderEnum.MALE,
        services: [],
        selectedDate: null,
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: true,
      },
    ];
    let dataGuest = [
      {
        id: 1,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        gender: null,
        services: [],
        selectedDate: new Date(),
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: false,
      },
      {
        id: 2,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        gender: null,
        services: [],
        selectedDate: new Date(),
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: false,
      },
    ];
    let dataFamily = [
      {
        id: 1,
        firstName: "Family",
        lastName: "own",
        phoneNumber: "092304923",
        email: "khacowner@gmail.com",
        gender: genderEnum.FEMALE,
        services: [
          {
            idService: 1,
            itemService: [
              {
                idItemService: 1,
                selectedStaff: {
                  employeeID: idStaffDefault,
                  imageFileName: "/assets/images/listUser/userAvailable.png",
                  nickName: "Next Available",
                },
              },
            ],
          },
        ],
        selectedDate: null,
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: false,
      },
      {
        id: 1,
        firstName: "Family",
        lastName: "1",
        phoneNumber: "092304923",
        email: "khac1@gmail.com",
        gender: genderEnum.FEMALE,
        services: [
          {
            idService: 1,
            itemService: [
              {
                idItemService: 1,
                selectedStaff: {
                  employeeID: idStaffDefault,
                  imageFileName: "/assets/images/listUser/userAvailable.png",
                  nickName: "Next Available",
                },
              },
            ],
          },
        ],
        selectedDate: null,
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: false,
      },
      {
        id: 2,
        firstName: "Family",
        lastName: "2",
        phoneNumber: "000012",
        email: "khac2@gmail.com",
        gender: genderEnum.FEMALE,
        services: [
          {
            idService: 1,
            itemService: [
              {
                idItemService: 1,
                selectedStaff: {
                  employeeID: idStaffDefault,
                  imageFileName: "/assets/images/listUser/userAvailable.png",
                  nickName: "Next Available",
                },
              },
            ],
          },
        ],
        selectedDate: null,
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: false,
      },
      {
        id: 1,
        firstName: "Family",
        lastName: "3",
        phoneNumber: "000003",
        email: "khac3@gmail.com",
        gender: genderEnum.FEMALE,
        services: [
          {
            idService: 1,
            itemService: [
              {
                idItemService: 2,
                selectedStaff: {
                  employeeID: idStaffDefault,
                  imageFileName: "/assets/images/listUser/userAvailable.png",
                  nickName: "Next Available",
                },
              },
            ],
          },
        ],
        selectedDate: null,
        selectedTimeSlot: null,
        isSelecting: false,
        isChoosing: false,
      },
    ];

    // --- API: Setting ---
    let dataSetting;
    let paymentDeposit;
    let isDualPrice;
    let isDeposit;
    let currencyDeposit;
    let policySetting;
    let isBookMultipleTech = true;
    let isHidePrice = false;
    let priceDisplay;
    let hideNoRequest = false;
    let loginWithPassword = false;
    let showCallSalon = false;
    let isConfirm = "0";
    let isPolicy = false;
    let storeInfo = null;
    let OBLogin = "";

    const getDataSetting = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;

      try {
        const resSetting = await fetchAPI.get(
          `/api/store/getsettingonlinebook?RVCNo=${newRVCNo}`
        );
        const DepositData = resSetting?.data?.Deposit;
        const parts = DepositData.split("|");
        let isDepositRes = parts[0] === "1";
        let currencyDepositRes = parts[1];
        let paymentDepositRes = parts[2];

        const DualPrice = resSetting?.data?.DualPrice;

        const partsPrice = DualPrice.split("|");
        isDualPrice = partsPrice[0] === "1";

        salonStore.setState({
          ...store,
          policySetting: resSetting?.data?.Policy,
          isDeposit: isDepositRes,
          currencyDeposit: currencyDepositRes,
          paymentDeposit: paymentDepositRes,
          isDualPrice: isDualPrice,
          isBookMultipleTech: resSetting?.data?.BookMultipleTech === "1",
          telInput: resSetting?.data?.TelInput || "+84",
          isHidePrice: resSetting?.data?.HidePrice === "1" || false,
          priceDisplay: resSetting?.data?.PriceDisplay || "0",
          hideNoRequest: resSetting?.data?.HideNoRequest === "1" || false,
          loginWithPassword:
            resSetting?.data?.LoginWithPassword === "1" || false,
          showCallSalon: resSetting?.data?.ShowCallSalon === "1" || false,
          isConfirm: resSetting?.data?.isConfirm == "0" ? "1" : "0",
          isPolicy: resSetting?.data?.isPolicy === "1" || false,
          storeInfo: resSetting?.data?.StoreInfo || null,
          OBLogin: resSetting?.data?.OBLogin || "2",
        });
        return resSetting;
      } catch (e) {
        console.error("[getDataSetting]", e);
      }
    };

    // --- countdown ---
    let popupFlowCountdownInterval = null;
    // biến lưu các slot-time và duration của tech
    let slotTimeMultiTech = {
      techs: [],
      durations: [],
    };
    let slotTimeForSelect = [];

    // ngày nghỉ của tiệm
    let daysOffNail = {};
    // salon choosing
    let salonChoosing = {};
    let itemServiceChoosing = {};
    let itemTechChoosing = {};
    let chooseStaffBefore = [];
    let flow;
    let pageCurrent;

    // --- SET STATE ---
    this._state = {
      RVCNo,
      selectedDate,
      currentMonth,
      currentYear,

      dataBooking,
      dataCart,
      dataMe,
      dataGuest,
      dataFamily,
      allSalon,
      getAllSalon,
      dataServices,
      getListDataService,
      getListUserStaff,
      listStaffUser,
      getDataSetting,
      requestClient,
      getRequestClient,
      dataCustomerSerOfTech,
      getDataCustomerSerOfTech,
      timeKeySlot,
      getTimeKeySlot,
      timeBeginCurDate,
      getTimeBeginCurDate,
      // setting
      dataSetting,
      paymentDeposit,
      isDualPrice,
      isDeposit,
      currencyDeposit,
      policySetting,
      isBookMultipleTech,
      telInput,
      isHidePrice,
      priceDisplay,
      hideNoRequest,
      loginWithPassword,
      showCallSalon,
      isConfirm,
      isPolicy,
      storeInfo,
      OBLogin,
      //
      popupFlowCountdownInterval,
      // slots time
      slotTimeMultiTech,
      slotTimeForSelect,

      // day off
      daysOffNail,
      salonChoosing,
      itemServiceChoosing,
      itemTechChoosing,
      // lưu staff khi chưa chọn service
      chooseStaffBefore,
      flow, // flow chọn tech hoặc chọn service trước
      pageCurrent, // lưu tên page hiện tại để xoá trong cart render lại phần cần thiết
    };

    // Lưu lại hàm tạo mặc định để dùng trong reset
    this._state.createDefaultDataBooking = createDefaultDataBooking;

    this._notify();
    return this._state;
  },

  // Hàm reset dataBooking khi cần
  resetDataBooking() {
    const state = this._state;
    if (!state?.dataBooking) return;

    const dataBooking = state.dataBooking;

    // giữ lại user[0] + clone để reset service, time...
    const firstUser = {
      ...dataBooking.users[0],
      services: [],
      selectedDate: new Date(),
      selectedTimeSlot: null,
      isSelecting: false,
      isChoosing: true,
    };

    // giữ các field khác trong dataBooking
    const resetBooking = {
      ...dataBooking,
      type: typeBookingEnum.ME, // đưa về mặc định
      users: [firstUser], // chỉ giữ lại user[0]
      cardNumber: [], // reset thẻ
    };

    this.setState({ dataBooking: resetBooking });
  },
  getState() {
    return this._state;
  },

  setState(partial) {
    const nextState =
      typeof partial === "function" ? partial(this._state) : partial;

    this._state = { ...this._state, ...nextState };
    this._notify();
  },

  subscribe(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter((cb) => cb !== callback);
    };
  },

  _notify() {
    this._listeners.forEach((cb) => cb(this._state));
  },
};

// Khởi động store ngay khi file được import
salonStore.init = (async () => {
  await salonStore.load();
})();
