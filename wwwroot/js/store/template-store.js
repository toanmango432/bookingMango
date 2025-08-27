// store/templateStore.js
import { fetchAPI } from "../site.js";
import {
  typeBookingEnum,
  genderEnum,
  idStaffDefault,
} from "../constants/template-online.js";
import { dataRelease } from "../templateDetail.js";
export const templateStore = {
  _state: null,
  _listeners: [],

  async load() {
    // --- DATA BOOKING mặc định ---
    let dataBooking = {
      type: typeBookingEnum.ME,
      users: [
        {
          id: 1,
          firstName: "Shane",
          lastName: "Fox",
          phoneNumber: "0230203023",
          email: "jessica.hanson@gmail.com",
          gender: genderEnum.MALE,
          services: [],
          selectedDate: null,
          selectedTimeSlot: null,
          isSelecting: false,
          isChoosing: true,
        },
      ],
      cardNumber: [],
    };

    // --- API: Services ---
    const getListDataService = async () => {
      try {
        const dataCategories = await fetchAPI.get(
          "/api/category/getallcategories?RVCNo=336"
        );
        const dataItemServices = await fetchAPI.get(
          "/api/category/getallitem?RVCNo=336"
        );

        const dataServices = [];
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
                timetext: itemSer.duration,
                listOptionAddOn: itemSer.listAddOn.map((iAdd) => ({
                  id: iAdd.addOnID,
                  title: iAdd.itemName,
                  price: iAdd.price,
                  timedura: iAdd.duration,
                })),
              };
              listItem.push(ser);
            }
          });
          objCar.item.listItem = listItem;
          dataServices.push(objCar);
        });
        return dataServices;
      } catch (e) {
        console.error("[getDataListDataService]", e);
      }
    };

    // --- API: Staff ---
    const getListUserStaff = async () => {
      try {
        const resTechFull = await fetchAPI.get(
          "/api/tech/gettechinfoofsalon?rvcNo=336"
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
        firstName: "Shane",
        lastName: "Fox",
        phoneNumber: "0230203023",
        email: "jessica.hanson@gmail.com",
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
        selectedDate: null,
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
        selectedDate: null,
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
      try {
        const resSetting = await fetchAPI.get(
          `/api/store/getsettingonlinebook?RVCNo=336`
        );
        // dataSetting = resSetting?.data;

        const DepositData = resSetting?.data?.Deposit;
        const parts = DepositData.split("|");
        let isDepositRes = parts[0] === "1";
        let currencyDepositRes = parts[1];
        let paymentDepositRes = parts[2];

        templateStore.setState({
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
    let selectedDate = new Date();
    // biến lưu các slot-time và duration của tech
    let slotTimeMultiTech = {
      techs: [],
      durations: [],
    };
    let slotTimeForSelect = [];

    // --- SET STATE ---
    this._state = {
      dataBooking,
      dataCart,
      dataMe,
      dataGuest,
      dataFamily,
      getListDataService,
      getListUserStaff,
      getDataSetting,
      dataSetting,
      paymentDeposit,
      isDeposit,
      currencyDeposit,
      policySetting,
      isBookMultipleTech,
      popupFlowCountdownInterval,
      selectedDate,
      // slots time
      slotTimeMultiTech,
      slotTimeForSelect,
    };
    this._notify();
    return this._state;
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
