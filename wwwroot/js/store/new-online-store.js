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
    let RVCNoInit = parseInt(window.location.pathname.split("/")[2], 10);
    let RVCNo = RVCNoInit; // khởi tạo lần đầu
    let selectedDate = new Date();
    let currentMonth = selectedDate.getMonth();
    let currentYear = selectedDate.getFullYear();

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
        salonStore.setState({ allSalon: resSalon });
        return resSalon;
      } catch (e) {
        console.error("[getAllSalon]", e);
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
                priceRental: itemSer.basePrice,
                priceCash: itemSer.baseCashPrice,
                timetext: itemSer.duration,
                listOptionAddOn: itemSer.listAddOn.map((iAdd) => ({
                  id: iAdd.addOnID,
                  title: iAdd.itemName,
                  price: iAdd.price,
                  priceDiscount: iAdd.priceDiscount,
                  timedura: iAdd.duration,
                })),
              };
              listItem.push(ser);
            }
          });
          objCar.item.listItem = listItem;
          resDataServices.push(objCar);
        });
        salonStore.setState({ dataServices: resDataServices });
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
        salonStore.setState({ timeKeySlot: resTimeKey?.data });
        return resTimeKey.data;
      } catch (e) {
        console.error("[getTimeKeySlot]", e);
      }
    };
    // --- API: time begin - end
    let timeBeginCurDate = null;
    const getTimeBeginCurDate = async (date) => {
      // date: aa/bb/cccc
      try {
        const url = `/api/store/getweeksalonschedule?rvcNo=${RVCNo}&date=${encodeURIComponent(
          date
        )}`;
        //  api trả ra cả tuần nên phải lọc ra ngày hôm nay

        const resWeek = await fetchAPI.get(url);
        const timeBegin = resWeek?.data.find((item) => item.dateString == date);
        if (timeBegin) {
          salonStore.setState({ timeBeginCurDate: timeBegin });
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
        salonStore.setState({ listStaffUser: dataTech || [] });
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
    let isDeposit;
    let currencyDeposit;
    let policySetting;
    let isBookMultipleTech = true;

    const getDataSetting = async () => {
      const store = salonStore.getState();
      const newRVCNo = store.RVCNo;

      try {
        const resSetting = await fetchAPI.get(
          `/api/store/getsettingonlinebook?RVCNo=${newRVCNo}`
        );
        // dataSetting = resSetting?.data;

        const DepositData = resSetting?.data?.Deposit;
        const parts = DepositData.split("|");
        let isDepositRes = parts[0] === "1";
        let currencyDepositRes = parts[1];
        let paymentDepositRes = parts[2];

        salonStore.setState({
          policySetting: resSetting?.data?.Policy,
          isDeposit: isDepositRes,
          currencyDeposit: currencyDepositRes,
          paymentDeposit: paymentDepositRes,
          isBookMultipleTech: resSetting?.data?.BookMultipleTech === "1",
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
    let daysOffNail = {
      8: [8, 9, 10, 12, 20, 22], // August: non-working days
    };
    // salon choosing
    let salonChoosing = {};
    let itemServiceChoosing = {};
    let itemTechChoosing = {};
    // start same time
    let isSameTime = false;
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
      timeKeySlot,
      getTimeKeySlot,
      timeBeginCurDate,
      getTimeBeginCurDate,
      dataSetting,
      paymentDeposit,
      isDeposit,
      currencyDeposit,
      policySetting,
      isBookMultipleTech,
      popupFlowCountdownInterval,
      // slots time
      slotTimeMultiTech,
      slotTimeForSelect,

      // day off
      daysOffNail,
      salonChoosing,
      itemServiceChoosing,
      // copy same time
      isSameTime,
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
    if (!this._state?.createDefaultDataBooking) return;
    const freshDataBooking = this._state.createDefaultDataBooking();
    this.setState({ dataBooking: freshDataBooking });
  },

  getState() {
    return this._state;
  },

  setState(partial) {
    this._state = { ...this._state, ...partial };
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
