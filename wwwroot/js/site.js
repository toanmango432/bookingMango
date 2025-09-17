// Write your JavaScript code.
// Override the global moment function
// Save a reference to the original moment function and its methods
const originalMoment = moment;

// List of formats to handle different cases, including 'MM/DD/YYYY', 'MM-DD-YYYY', etc.
// List of formats to handle different cases, including ISO-like strings and various custom formats
const validFormats = [
  "MM-DD-YYYY hh:mm A",
  "MM/DD/YYYY HH:mm:ss",
  "MM-DD-YYYY HH:mm:ss",
  "YYYY-MM-DDTHH:mm:ss",
  "YYYY-MM-DDTHH:mm:ss.SSS", // Added case for ISO-like string with milliseconds
  "YYYY-MM-DD HH:mm:ss",
  "YYYY/MM/DD HH:mm:ss",
  "MM-DD-YYYY",
  "YYYY-MM-DD",
];

const methodsToPreserve = [
  "utc",
  "add",
  "diff",
  "format",
  "isValid",
  "startOf",
  "endOf",
  "subtract",
  "toDate",
  "toISOString",
  "year",
  "month",
  "date",
  "hour",
  "minute",
  "second",
  "millisecond",
  "day",
  "dayOfYear",
  "week",
  "weekYear",
  "isoWeek",
  "isoWeekYear",
  "quarter",
  "isLeapYear",
  "isSame",
  "isBefore",
  "isAfter",
  "isBetween",
  "isSameOrAfter",
  "isSameOrBefore",
  "toObject",
  "toJSON",
  "fromNow",
  "toNow",
  "calendar",
  "from",
  "to",
  "locale",
  "set",
  "clone",
];

// Create a wrapper function around the original moment function
function customMoment(date, format) {
  // Check for null or undefined date and return today's date in default format
  if (date === null || date === undefined) {
    date = originalMoment().format("MM-DD-YYYY hh:mm A"); // Return today's date as a moment instance
  }
  // Handle string date input
  if (typeof date === "string") {
    // If a format is not provided, try parsing the date with valid formats
    if (!format) {
      for (let fmt of validFormats) {
        const parsed = originalMoment(date, fmt, true);
        if (parsed.isValid()) {
          return wrapMomentInstance(parsed);
        }
      }
      // If no valid format is found, return today's date
      return wrapMomentInstance(originalMoment());
    }
  }

  // Use originalMoment to parse the date with or without format
  const parsedDate = format
    ? originalMoment(date, format)
    : originalMoment(date);

  // Return a moment instance directly if it's valid; otherwise, return today's date
  return wrapMomentInstance(
    parsedDate.isValid() ? parsedDate : originalMoment()
  );
}

// Helper function to wrap the moment instance and preserve methods
function wrapMomentInstance(validDate) {
  // Create an object to wrap the moment instance
  const wrappedInstance = Object.create(validDate);

  // Attach all Moment.js methods to the wrapped instance
  methodsToPreserve.forEach((method) => {
    if (typeof validDate[method] === "function") {
      wrappedInstance[method] = function (...args) {
        return validDate[method](...args);
      };
    }
  });

  return wrappedInstance;
}

// Override the global moment function with customMoment
moment = customMoment;

// Call api
export const fetchAPI = {
  get: (url, data) => {
    return fetchAPI.request("GET", url, data);
  },

  post: (url, data, queryParams) => {
    return fetchAPI.request("POST", url, data, queryParams);
  },

  put: (url, data, queryParams) => {
    return fetchAPI.request("PUT", url, data, queryParams);
  },

  delete: (url, data, queryParams) => {
    return fetchAPI.request("DELETE", url, data, queryParams);
  },

  patch: (url, data, queryParams) => {
    return fetchAPI.request("PATCH", url, data, queryParams);
  },

  request: async (method, url, data, queryParams) => {
    const domain_api = "https://uat-clientapp.enrichcous.com:4443";
    try {
      let headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-type, X-Auth-Token, Origin, Authorization",
        "Content-Type": "application/json; charset=utf-8",
      };

      let fullUrl = domain_api + url;
      if (queryParams) {
        const query = new URLSearchParams(queryParams);
        fullUrl += `?${query.toString()}`;
      }

      if (method === "GET" && data) {
        const query = new URLSearchParams(data);
        fullUrl += `?${query.toString()}`;
      }

      let bodyData;

      if (
        method === "POST" ||
        method === "PUT" ||
        method === "PATCH" ||
        method === "DELETE"
      ) {
        if (data instanceof FormData) {
          bodyData = data;
          headers = {
            "Access-Control-Allow-Origin": "*",
          };
        } else if (
          headers["Content-Type"] === "application/x-www-form-urlencoded"
        ) {
          const formData = new URLSearchParams();
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
          });
          bodyData = formData;
        } else {
          bodyData = JSON.stringify(data);
        }
      }

      const response = await fetch(fullUrl, {
        method,
        headers,
        body: bodyData,
      });
      try {
        if (response.ok) {
          // Handle the successful response here
          const resData = await response.json();
          return resData;
        } else {
          // Handle non-successful responses with an appropriate error message
          return response.status;
        }
      } catch (error) {
        // Handle other errors (e.g., network issues)
        console.error("Error occurred:", error);

        // Make sure to rethrow the error to propagate it further if needed
        throw error;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

// Apis name
const apis = {
  setting: {},
};

// Tracking img load
const imgTrack = {
  error: (e) => {
    let $this = $(e);

    $this.parent().find("i").removeClass("dis-none");

    $this.addClass("dis-none");
  },
};

// Sweetalert2 Customizable Alert
export const alertCustom = (options = {}, callback) => {
  // Default options for notification and actions
  const defaultOptions = {
    isNoti: true,
    notify: {
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      showConfirmButton: false,
      customClass: { container: "is-notify" },
    },
    action: {
      title: "",
      text: "",
      icon: "",
      showCloseButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "var(--bs-main)",
      cancelButtonText: "Cancel",
      cancelButtonColor: "unset",
      onBeforeOpen: () => console.log("Dialog is about to open"),
      onOpen: () => console.log("Dialog is now open"),
      onClose: () => console.log("Dialog is closed"),
    },
    classCustom: {},
  };

  // Check if the type is success or error, and adjust the configuration
  const alertType = options.type || "success"; // Default is success
  const isSuccess = alertType === "success";

  // Dynamically build the title with icon and text based on success/error
  const dynamicTitle = `
        <div class="alert-custom-icon-text ${isSuccess ? "success" : "error"}">
            <i class="fa-duotone fa-solid ${
              isSuccess ? "fa-circle-check" : "fa-circle-xmark"
            }" style="--fa-primary-color: ${
    isSuccess ? "#45c65a" : "#e74c3c"
  }; --fa-secondary-color: ${isSuccess ? "#45c65a" : "#e74c3c"};"></i>
            <span>${
              options.notify.title ||
              (isSuccess ? "Save changes successfully" : "An error occurred")
            }</span>
        </div>
    `;

  // Merge the options for notification or action
  const mergedOptions = options.isNoti
    ? {
        ...defaultOptions.notify,
        ...options.notify,
        title: dynamicTitle, // Use the dynamically created title
        icon: isSuccess ? "success" : "error", // Set the icon based on type
        customClass: { ...defaultOptions.classCustom, ...options.classCustom },
      }
    : {
        ...defaultOptions.action,
        ...options.action,
        customClass: { ...defaultOptions.classCustom, ...options.classCustom },
      };

  // Display the alert
  Swal.fire(mergedOptions).then((result) => {
    if (callback && typeof callback === "function") {
      callback(result);
    }
  });
};

// Format something
const formatJS = {
  phone: (phoneNumber, replace = false, hiddenPhone = false) => {
    if (phoneNumber !== null) {
      // Remove any non-numeric characters from the phone number
      phoneNumber = phoneNumber.replace(/[^\d]/g, "");

      if (replace) return phoneNumber;

      if (!hiddenPhone && (isNaN(phoneNumber) || phoneNumber == "")) return "";

      const zip = phoneNumber.substring(0, 3);
      const middle = phoneNumber.substring(3, 6);
      const last = phoneNumber.substring(6, 10);

      if (hiddenPhone == 0) {
        if (phoneNumber.length > 6) {
          phoneNumber = `(${zip}) ${middle} - ${last}`;
        } else if (phoneNumber.length > 3) {
          phoneNumber = `(${zip}) ${middle}`;
        } else if (phoneNumber.length > 0) {
          phoneNumber = `(${zip})`;
        }
      } else phoneNumber = `(XXX) XXX - ${last || "XXXX"}`;

      return phoneNumber;
    } else phoneNumber = "Phone number is not available";
    return phoneNumber;
  },

  phoneHidden: (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const remainingDigits = cleanedPhoneNumber.slice(3);
    const formattedPhoneNumber = `(XXX) XXX - ${remainingDigits.slice(3)}`;
    return formattedPhoneNumber;
  },

  currency: (amount) => {
    // Format the amount as currency
    const localeName = "vi-VN";
    const currencyCode = "VND";

    amount = amount == "" ? 0 : amount;

    return new Intl.NumberFormat(localeName, {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  },

  currencyReplace: (amount) => {
    return amount.replace("₫", "").replaceAll(".", "").trim();
  },

  currencyFloat: (amount) => {
    return parseFloat(amount.replace(".", ""));
  },

  formatNameAvt: (name) => {
    if (name && name.trim() !== "") {
      const nameParts = name.trim().split(" ");
      const firstNameInitial = nameParts[0]?.[0] || " ";
      const lastNameInitial = nameParts[1]?.[0] || " ";
      return `${firstNameInitial}${lastNameInitial}`;
    }
    return "NA"; // or any other default value you prefer
  },

  ticketNo: (apptId) => {
    apptId = apptId.toString();

    const lastIndex = apptId.lastIndexOf("000");

    if (lastIndex === -1) {
      // Pattern not found
      return "#" + apptId;
    }

    return "#" + apptId.substring(lastIndex + 3);
  },

  isValidUrl: (url) => {
    if (!url) {
      return false; // Return false if URL is empty or undefined
    }

    // Regular expression pattern to validate URL
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // Protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // Fragment locator

    return urlPattern.test(url);
  },

  keyup: ($this) => {
    let value = $this.val();

    let phone = formatJS.phone(value, false, false);

    $this.val(phone);

    if (value.length >= 16) {
      $this.parent().find("button.send").removeClass("disable");
    } else {
      $this.parent().find("button.send").addClass("disable");
    }
  },
};

// Popover handle
var popupCustom = (
  $element,
  contentHtml,
  quantity = 1,
  callback = null,
  addClass = "",
  position = "right", // or 'bottom'
  spaceX = 0,
  spaceY = 0,
  widthRatio = 1 // độ rộng popup so với đối tượng click
) => {
  if (quantity === 1) {
    $(".popup-container").remove();
  }

  var $popupContainer = $(
    `<div class="popup-container ${addClass}" id="popup-container-custom-id"></div>`
  );

  var $popupContent = $('<div class="popup-content"></div>').html(contentHtml);
  $popupContainer.append($popupContent);
  $("body").append($popupContainer);

  $popupContainer.css({
    top: "-9999px",
    left: "-9999px",
    display: "block",
    position: "absolute",
    width: $element.outerWidth() * widthRatio, // ✅ set width theo tỷ lệ
  });

  var popupWidth = $popupContainer.outerWidth();
  var popupHeight = $popupContainer.outerHeight();

  var elementOffset = $element.offset();
  var elementWidth = $element.outerWidth();
  var elementHeight = $element.outerHeight();

  let popupLeft = 0;
  let popupTop = 0;

  if (position === "right") {
    popupLeft = elementOffset.left + elementWidth + spaceX;
    popupTop = elementOffset.top + spaceY;
  } else if (position === "bottom") {
    popupLeft = elementOffset.left + spaceX;
    popupTop = elementOffset.top + elementHeight + spaceY;
  }

  var screenWidth = $(window).width();
  var screenHeight = $(window).height();

  if (popupLeft + popupWidth > screenWidth) {
    popupLeft = Math.max(screenWidth - popupWidth - 10, 0);
  }
  if (popupTop + popupHeight > screenHeight) {
    popupTop = Math.max(screenHeight - popupHeight - 10, 0);
  }

  $popupContainer.css({
    left: popupLeft,
    top: popupTop,
    position: "absolute",
    display: "none",
    opacity: 1,
  });

  $popupContainer.fadeIn();

  $(document).on("click.popupCustom", function (event) {
    if (
      !$(event.target).closest(".popup-container").length &&
      !$(event.target).closest(".toggle-select").length
    ) {
      $popupContainer.remove();
      if (typeof callback === "function") callback("hidden");
      $(document).off("click.popupCustom");
    }
  });
};

// Main
const onlineStore = {
  load: () => {
    const dataTemplates = [
      {
        id: 1,
        imageLink: "/assets/images/retro.png",
        titleItem: "Restro",
        subTitleItem: "Classic and modern style",
      },
      {
        id: 2,
        imageLink: "/assets/images/pastel.png",
        titleItem: "Pastel",
        subTitleItem: "Popular style",
      },
      {
        id: 1,
        imageLink: "/assets/images/neon.jpg",
        titleItem: "Neon",
        subTitleItem: "Classic and modern style",
      },
      {
        id: 1,
        imageLink: "/assets/images/vintage.png",
        titleItem: "Vintage",
        subTitleItem: "Classic and modern style",
      },
      {
        id: 5,
        imageLink: "/assets/images/retro.png",
        titleItem: "Restro",
        subTitleItem: "Classic and modern style",
      },
      {
        id: 6,
        imageLink: "/assets/images/pastel.png",
        titleItem: "Pastel",
        subTitleItem: "Popular style",
      },
      {
        id: 7,
        imageLink: "/assets/images/neon.jpg",
        titleItem: "Neon",
        subTitleItem: "Classic and modern style",
      },
      {
        id: 8,
        imageLink: "/assets/images/vintage.png",
        titleItem: "Vintage",
        subTitleItem: "Classic and modern style",
      },
    ];
    const dataTable = {
      header: [
        {
          label: "Name",
          key: "name",
          sort: false,
          type: "STRING",
          icon: null,
          style: {
            color: null,
            background: null,
          },
        },
        {
          label: "Domain",
          key: "domain",
          sort: false,
          type: "LINK",
          color: null,
          style: {
            color: null,
            background: null,
          },
          class: "",
        },
        {
          label: "Create date",
          key: "createDate",
          sort: true,
          type: "DATE",
          icon: `
                            <svg class="icon-sort-date" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" >
                                <path class="sort-up-1" d="M9.37188 5.66052L6.27185 2.56055L3.17188 5.66052" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path class="sort-up-2" d="M6.27344 17.5605V2.56055" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path class="sort-down-1" d="M11.9531 14.4609L15.0532 17.5609L18.1531 14.4609" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path class="sort-down-2" d="M15.0547 2.56055V17.5605" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          `,
          style: {
            color: null,
            background: null,
          },
          class: "header-date",
        },
        {
          label: "Status",
          key: "status",
          sort: false,
          type: "STATUS",
          icon: null,
          style: {
            color: null,
            background: null,
          },
          class: "",
        },
      ],
      body: [
        {
          id: "1",
          name: {
            text: "Retro",
            class: "name-item",
          },
          domain: {
            text: "http://www.websiteretro.com",
            class: "domain-item",
          },
          createDate: {
            text: "May 15, 2025",
            class: "date-item",
          },
          status: {
            text: "Public",
            class: "status-item public",
            style: {
              color: "white",
              background: "#45C65A",
            },
            icon: `<i class="fa-solid fa-ellipsis-vertical"></i>`,
          },
        },
        {
          id: "2",
          name: {
            text: "Pastel",
            class: "name-item",
          },
          domain: {
            text: "http://www.websiteretro.com",
            class: "domain-item",
          },
          createDate: {
            text: "May 20, 2025",
            class: "date-item",
          },
          status: {
            text: "Draft",
            class: "status-item draft",
            style: {
              color: "white",
              background: "#45C65A",
            },
            icon: `<i class="fa-solid fa-ellipsis-vertical"></i>`,
          },
        },
      ],
    };
    let configThemeColor = {
      config: {
        width: "36",
        height: "36",
        borderRadius: "6",
      },
      colorTheme: [
        {
          color: "#4D0000",
          active: false,
        },
        {
          color: "#520000",
          active: false,
        },
        { color: "#5C0000", active: false },
        { color: "#660000", active: false },
        { color: "#D0B0B0", active: false },
        { color: "#E8D9D9", active: false },
        { color: "#F0E6E6", active: false },
        { color: "#E2CAC1", active: false },

        { color: "#565656", active: false },
        { color: "#6F6F6F", active: false },
        { color: "#949494", active: false },
        { color: "#B7AA9B", active: false },
        { color: "#C3B6A6", active: false },
        { color: "#DCCCBA", active: false },
        { color: "#F4E3CF", active: false },
        { color: "#FEFCFA", active: false },

        { color: "#023D13", active: false },
        { color: "#024114", active: false },
        { color: "#024917", active: false },
        { color: "#0C7E2D", active: true, selected: true, type: "PRIMARY" },
        { color: "#B1C9B8", active: false },
        { color: "#B1C9B8", active: false },
        { color: "#D9E5DD", active: false },
        { color: "#E6EEE8", active: false },

        { color: "#AA5602", active: false },
        { color: "#B55C02", active: false },
        { color: "#CB6803", active: false },
        { color: "#E27303", active: true, selected: true, type: "SECONDARY" },
        { color: "#F6D4B1", active: false },
        { color: "#FBEAD9", active: false },
        { color: "#FCF1E6", active: false },
        { color: "#FCF1E6", active: false },
      ],
      iconActive: `<i class="fa-solid fa-check"></i>`,
      colorIconPrimary: "#00bed6",
      colorIconSecondary: "#061315",
    };

    const info = [
      {
        value: "Nailvibe It is time to relax !",
        style: [],
        type: "INPUT",
      },
      {
        value: `We hope that your visit will be a relaxing and wonderful experience. Please do not hesitate to share your opinions with the salon manager so that your next visit at MIA will be an even better experience.`,
        style: [],
        type: "TEXTAREA",
      },
    ];

    const sideInfo = [
      {
        id: "si-show-all",
        idt: "sit-show-all",
        content: "Show All",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        // style: {
        //   justify: "space-between",
        // },
      },
      {
        id: "si-promotion",
        idt: "sit-promotion",
        content: "Promotion",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      {
        id: "si-store-info",
        idt: "sit-store-info",
        content: "Store Info",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      {
        id: "si-policy",
        idt: "sit-policy",
        content: "Policy",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      {
        id: "si-social-link",
        idt: "sit-social-link",
        content: "Social Link",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
    ];

    const bannerPromotion = [
      {
        id: "bp-flash",
        content: "Flash.png",
        img: "/assets/images/bannerPromotion/banner-promotion-1.jpg",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      {
        id: "bp-giftcard",
        content: "GiftCard.png",
        img: "/assets/images/bannerPromotion/banner-promotion-2.jpg",

        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      {
        id: "bp-egift",
        content: "E-Gift.png",
        img: "/assets/images/bannerPromotion/banner-promotion-3.jpg",

        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      {
        id: "bp-unllock",
        content: "Unlock.png",
        img: "/assets/images/bannerPromotion/banner-promotion-4.jpg",

        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
    ];

    const giftCard = {
      item: {
        id: "toggle-gift-card",
        content: "Active Gift Card",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      body: {
        title: "Link:",
        content:
          "https://manage2.mangoforsalon.com/nextview/membership-settings?salon_id=abc",
        iconBody: `<i class="fa-solid fa-eye-slash toggle-visibility"></i>`,
        icon: {
          value: `<i class="fa-regular fa-copy"></i>`,
          style: "",
        },
        style: "",
      },
      button: {
        content: "Custom Gift Card",
        style: "",
      },
    };

    const membership = {
      item: {
        id: "toggle-membership",
        content: "Active Membership",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      body: {
        title: "Link:",
        content:
          "https://manage2.mangoforsalon.com/nextview/membership-settings?salon_id=abc",
        iconBody: `<i class="fa-solid fa-eye-slash toggle-visibility"></i>`,
        icon: {
          value: `<i class="fa-regular fa-copy"></i>`,
          style: "",
        },
        style: "",
      },
      button: {
        content: "Custom Membership",
        style: "",
      },
    };

    const dataSocialPage = [
      {
        id: "so-facebook",
        img: "/assets/images/social-icon/Facebook.png",
        content: "Facebook",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
      {
        id: "so-google",
        img: "/assets/images/social-icon/google.png",
        content: "Google",
        action: {
          type: "TOGGLE",
          defaultValue: "",
        },
        style: {
          justify: "space-between",
        },
      },
    ];

    let listDataService = [
      {
        item: {
          iconLeft: `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
          </svg>
          `,
          value: "Manicure 1",
          iconRight: `
            <i class="fa-solid fa-chevron-down rotate-transition"></i>
          `,
          listItem: [
            {
              title: "Essential Pedicure 1",
              subTitle: "Hydrating Pedi Salt Soak 1",
              priceRental: "$45",
              timetext: "40min",
              userSelected: {},
            },
            {
              title: "Essential Pedicure 2",
              subTitle: "Hydrating Pedi Salt Soak 1",
              priceRental: "$45",
              timetext: "40min",
              userSelected: {},
            },
          ],
        },
      },
      {
        item: {
          iconLeft: `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
          </svg>
          `,
          value: "Manicure 2",
          iconRight: `
          <i class="fa-solid fa-chevron-down rotate-transition"></i>
          `,
          listItem: [
            {
              title: "Essential Pedicure 1",
              subTitle: "Hydrating Pedi Salt Soak 1",
              priceRental: "$45",
              timetext: "40min",
              userSelected: {},
            },
            {
              title: "Essential Pedicure 2",
              subTitle: "Hydrating Pedi Salt Soak 1",
              priceRental: "$45",
              timetext: "40min",
              userSelected: {},
            },
          ],
        },
      },
    ];
    const listUser = [
      {
        id: "default",
        avatar: "/assets/images/listUser/userAvailable.png",
        name: "Next Available",
      },
      {
        id: "1",
        avatar: "/assets/images/listUser/avatar1.png",
        name: "Lily",
      },
      {
        id: "2",
        avatar: "/assets/images/listUser/avatar1.png",
        name: "Savananah",
      },
    ];

    let dataHeaderNav = {
      logo: "/assets/images/templates/logo-template.png",
      itemNav: [
        {
          id: "page-fag",
          name: "Fag",
        },
        {
          id: "page-membership",
          name: "Membership",
        },
        {
          id: "page-service",
          name: "Service",
        },
        {
          id: "page-giftcard",
          name: "Gift Card",
        },
        {
          id: "page-about",
          name: "About",
          icon: '<i class="fa-solid fa-chevron-down"></i>',
        },
        {
          id: "page-contact-us",
          name: "Contact Us",
        },
      ],
      colorActiveNav: "#04972f",
      iconUser: `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
          <path d="M15 15.8066C15 13.7356 12.3137 12.0566 9 12.0566C5.68629 12.0566 3 13.7356 3 15.8066M9 9.80664C6.92893 9.80664 5.25 8.12771 5.25 6.05664C5.25 3.98557 6.92893 2.30664 9 2.30664C11.0711 2.30664 12.75 3.98557 12.75 6.05664C12.75 8.12771 11.0711 9.80664 9 9.80664Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `,
      buttonBooking: {
        content: "Book",
        bgBtn: "#0c7e2d",
        color: "white",
        border: "1px solid #04972f",
        bgColorHover: "#b1c9b8",
      },
      cart: {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M5.625 5.81269V5.08519C5.625 3.39769 6.9825 1.74019 8.67 1.58269C10.68 1.38769 12.375 2.97019 12.375 4.94269V5.97769" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.7506 16.5605H11.2506C14.2656 16.5605 14.8056 15.353 14.9631 13.883L15.5256 9.38305C15.7281 7.55305 15.2031 6.06055 12.0006 6.06055H6.0006C2.7981 6.06055 2.2731 7.55305 2.4756 9.38305L3.0381 13.883C3.1956 15.353 3.7356 16.5605 6.7506 16.5605Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.6209 9.06055H11.6276" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.37088 9.06055H6.37762" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        `,
        quatity: "0",
        bgColor: "#ea001e",
        color: "white",
      },
    };

    let dataAdvertise = {
      bgAdvertise1: {
        bgColor: "#0c7e2d",
        transformRotate: "-4.479deg",
      },
      bgAdvertise2: {
        bgColor: "#e27303",
        colorContent: "white",
        content: [
          {
            text: "Hi Guest! Sign in to access",
            fontWeight: 400,
          },
          {
            text: "Past Appointment History",
            fontWeight: 700,
          },
          {
            text: "and",
            fontWeight: 400,
          },
          {
            text: "view upcoming appointments, or Cancel upcoming appointments",
            fontWeight: 700,
          },
        ],
      },
      buttonSignIn: {
        content: "Sign In",
        bgColor: "#0c7e2d",
        color: "white",
        border: "1px solid #04972f",
        bgColorHover: "#b1c9b8",
      },
    };

    let dataBannerPage = {
      greeting: "Welcome to !",
      brand: "Nailvibe",
      title: `It is time to relax !`,
      desc: `We hope that your visit will be a relaxing and wonderful experience.
Please do not hesitate to share your opinions with the salon manager so that your next visit at MIA will be an even better experience.`,
      bookFor: "Book Appointment for",
      optionBooked: "ME",
      btnOptionBook: {
        content: [
          { text: "Just me", type: "ME" },
          { text: "2 - 6 Guests", type: "GUESTS" },
          // { text: "Family", type: "FAMILY" }, // chưa handle
        ],
        icon: `<i class="fa-solid fa-chevron-down rotate-transition"></i>`,
        color: "white",
        bgColor: "#04972f",
        border: "1px solid #04972f",
      },
      image: {
        imgBooking1: "/assets/images/templates/image-banner-booking.png",
        imgBooking2: "/assets/images/templates/image-banner-booking-2.png",
        imgBooking3: "/assets/images/templates/image-cloud.png",
      },
    };

    const listPromotion = {
      title: "Select Promotion",
      item: [
        {
          id: "id-promotion-1",
          img: "/assets/images/promotions/promotion1.png",
          title: {
            content: "Flash Deal Frenzy! 🌟",
            icon: "",
          },
          percent: {
            number: 15,
            content: "All service",
            bgColor: "#00bed6",
            color: "white",
          },
          dateTime: {
            startTime: "",
            endTime: "Jan 25, 11:59 PM",
          },
        },
        {
          id: "id-promotion-2",
          img: "/assets/images/promotions/promotion2.jpg",
          title: {
            content: "Coupon after buy a gift card",
            icon: "",
          },
          percent: {
            number: 1,
            content: "All service",
            bgColor: "#00bed6",
            color: "white",
          },
          dateTime: {
            startTime: "",
            endTime: "Jan 25, 11:59 PM",
          },
        },
        {
          id: "id-promotion-3",
          img: "/assets/images/promotions/promotion3.jpg",
          title: {
            content: "Coupon For Buy E-GIFT",
            icon: "",
          },
          percent: {
            number: 5,
            content: "All service",
            bgColor: "#00bed6",
            color: "white",
          },
          dateTime: {
            startTime: "",
            endTime: "Jan 25, 11:59 PM",
          },
        },
        {
          id: "id-promotion-4",
          img: "/assets/images/promotions/promotion4.jpg",
          title: {
            content: "Unlock Exclusive",
            icon: "",
          },
          percent: {
            number: 5,
            content: "All service",
            bgColor: "#00bed6",
            color: "white",
          },
          dateTime: {
            startTime: "",
            endTime: "Jan 25, 11:59 PM",
          },
        },
      ],
    };

    const dataStoreInfo = {
      brand: "Nailvibe",
      iconLocation: '<i class="fa-solid fa-location-dot"></i>',
      phoneNumber: "(615) 326-6652",
      address: "15537 Old Hickory Blvd, Nashvile, TN 37211",
      timeWork: [
        {
          weekday: "Monday",
          time: "10:00AM-7:30PM",
        },
        {
          weekday: "Tuesday",
          time: "10:00AM-7:30PM",
        },
        {
          weekday: "Wednesday",
          time: "10:00AM-7:30PM",
        },
        {
          weekday: "Thursday",
          time: "10:00AM-7:30PM",
        },
        {
          weekday: "Friday",
          time: "10:00AM-7:30PM",
        },
        {
          weekday: "Saturday",
          time: "9:30AM-7:00PM",
        },
        {
          weekday: "Sunday",
          time: "11:00AM-6:00PM",
        },
      ],
    };

    let dataPolicyPage = {
      title: "Need to knows:",
      styleTitle: {
        color: "#660000",
      },
      listItem: [
        {
          content: [
            {
              text: "- Changes and reschedules must be made at least 1 hour prior to your scheduled visit.",
            },
          ],
        },
        {
          content: [
            {
              text: "- Late cancellations, late reschedules, and no-shows will be subject to a $25 fee.",
            },
          ],
        },
        {
          content: [
            {
              text: "- We do not offer or remove dip powder, acrylics, or UV hard gels.",
            },
          ],
        },
        {
          content: [
            { text: "- See our full" },
            {
              text: "Terms Of Use Here",
              style: {
                color: "#660000",
              },
            },
          ],
        },
      ],
    };

    const dataSocialLink = {
      mapLocation: {
        address: "15537 Old Hickory Blvd, Nashville, TN 37211",
      },
    };

    const dataPageMembership = {
      intro: {
        stepCur: 1,
        stepEnd: 3,
        title: "Choose the plan that’s right for you",
      },
      style: {
        background:
          "linear-gradient(161deg, rgba(255, 106, 0, 0.04) 0.54%, rgba(255, 106, 0, 0.10) 112.23%);",
        border: "1px solid var(--Membership-Bronze, #B64D2F);",
        textColorRank:
          "linear-gradient(90deg, #B64D2F 0%, #FFCFBB 50%, #B64D2F 100%)",
        textColorTitle: "#B64D2F",
        textPrice: "#B64D2F",
        bgColorBtnMore: "",
        borderBtnMore: "1px solid var(--Membership-Bronze, #B64D2F);",
        colorBtnMore: "#B64D2F",
        bgColorBtnBuyNow:
          "linear-gradient(90deg, #B64D2F 0%, #FFCFBB 50%, #B64D2F 100%)",
        colorBtnBuyNow: "#181818E5",
      },
      itemPlan: {
        id: 1,
        rank: "Bronze",
        title: "Save Every Time You Visit",
        subtitle:
          "Perfect For: Regular clients who want quick, affordable services with solid savings.",
        price: "$79",
        timeDura: "3 Month",
        iconPolicy: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M11.4382 2.92495L12.9048 5.85828C13.1048 6.26662 13.6382 6.65828 14.0882 6.73328L16.7465 7.17495C18.4465 7.45828 18.8465 8.69162 17.6215 9.90828L15.5548 11.975C15.2048 12.325 15.0132 13 15.1215 13.4833L15.7132 16.0416C16.1798 18.0666 15.1048 18.85 13.3132 17.7916L10.8215 16.3166C10.3715 16.05 9.62984 16.05 9.17151 16.3166L6.67984 17.7916C4.89651 18.85 3.81317 18.0583 4.27984 16.0416L4.87151 13.4833C4.97984 13 4.78817 12.325 4.43817 11.975L2.37151 9.90828C1.15484 8.69162 1.54651 7.45828 3.24651 7.17495L5.90484 6.73328C6.34651 6.65828 6.87984 6.26662 7.07984 5.85828L8.54651 2.92495C9.34651 1.33328 10.6465 1.33328 11.4382 2.92495Z" fill="url(#paint0_linear_1973_42991)"/>
          <defs>
            <linearGradient id="paint0_linear_1973_42991" x1="1.99609" y1="1.99976" x2="17.9961" y2="17.9998" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFF158"/>
              <stop offset="1" stop-color="#FF8000"/>
            </linearGradient>
          </defs>
        </svg>
        `,
        itemPolicy: [
          { content: "$10 off every visit (No minimum spend required)" },
          { content: "Unlimited free soak-offs with every nail service" },
          { content: "$10 gel add-on (regular price: $20) for every visit" },
          {
            content:
              "Free Essential Pedi after every 5th visit (No restrictions)",
          },
          {
            content:
              "Referral Bonus: Get $20 credit for every friend who signs up (No limits)",
          },
        ],
        subEnd: "Requires Treatment Package ($99/year)",
      },
    };
    const dataPageGiftCard = [
      {
        id: "birthday",
        title: "Birthday",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-1",
        title: "Birthday-1",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-2",
        title: "Birthday-2",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-3",
        title: "Birthday-3",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-4",
        title: "Birthday-4",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-5",
        title: "Birthday-5",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-6",
        title: "Birthday-6",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-7",
        title: "Birthday-7",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
      {
        id: "birthday-8",
        title: "Birthday-8",
        buttonAll: "See All",
        listCard: Array.from({ length: 8 }, (_, i) => ({
          id: (i + 1).toString(),
          image: "/assets/images/templates/image-banner-booking-2.png",
          title: `Arlene McCoy ${i + 1}`,
        })),
      },
    ];

    // data fake local storage
    let dataWeb = {
      dataHeaderNav: {
        logo: "/assets/images/templates/logo-template.png",
        itemNav: [
          {
            id: "page-fag",
            name: "Fag",
          },
          {
            id: "page-membership",
            name: "Membership",
          },
          {
            id: "page-service",
            name: "Service",
          },
          {
            id: "page-giftcard",
            name: "Gift Card",
          },
          {
            id: "page-about",
            name: "About",
            icon: '<i class="fa-solid fa-chevron-down"></i>',
          },
          {
            id: "page-contact-us",
            name: "Contact Us",
          },
        ],
        colorActiveNav: "#04972f",
        iconUser: `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
          <path d="M15 15.8066C15 13.7356 12.3137 12.0566 9 12.0566C5.68629 12.0566 3 13.7356 3 15.8066M9 9.80664C6.92893 9.80664 5.25 8.12771 5.25 6.05664C5.25 3.98557 6.92893 2.30664 9 2.30664C11.0711 2.30664 12.75 3.98557 12.75 6.05664C12.75 8.12771 11.0711 9.80664 9 9.80664Z" stroke="#061315" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `,
        buttonBooking: {
          content: "Book",
          bgBtn: "#0c7e2d",
          color: "white",
          border: "1px solid #04972f",
          bgColorHover: "#b1c9b8",
        },
        cart: {
          icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M5.625 5.81269V5.08519C5.625 3.39769 6.9825 1.74019 8.67 1.58269C10.68 1.38769 12.375 2.97019 12.375 4.94269V5.97769" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.7506 16.5605H11.2506C14.2656 16.5605 14.8056 15.353 14.9631 13.883L15.5256 9.38305C15.7281 7.55305 15.2031 6.06055 12.0006 6.06055H6.0006C2.7981 6.06055 2.2731 7.55305 2.4756 9.38305L3.0381 13.883C3.1956 15.353 3.7356 16.5605 6.7506 16.5605Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.6209 9.06055H11.6276" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.37088 9.06055H6.37762" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        `,
          quatity: "1",
          bgColor: "#ea001e",
          color: "white",
        },
      },
      color: {
        bgPrimary: "#0C7E2D",
        bgSecondary: "#E27303",
      },
      advertises: {
        bgAdvertise1: {
          bgColor: "#0c7e2d",
          transformRotate: "-4.479deg",
        },
        bgAdvertise2: {
          bgColor: "#e27303",
          colorContent: "white",
          content: [
            {
              text: "Hi Guest! Sign in to access",
              fontWeight: 400,
            },
            {
              text: "Past Appointment History",
              fontWeight: 700,
            },
            {
              text: "and",
              fontWeight: 400,
            },
            {
              text: "view upcoming appointments, or Cancel upcoming appointments",
              fontWeight: 700,
            },
          ],
        },
        buttonSignIn: {
          content: "Sign In",
          bgColor: "#0c7e2d",
          color: "white",
          border: "1px solid #04972f",
          bgColorHover: "#b1c9b8",
        },
      },
      banner: {
        greeting: "Welcome to !",
        brand: "Nailvibe",
        title: `It is time to relax !`,
        desc: `We hope that your visit will be a relaxing and wonderful experience.
Please do not hesitate to share your opinions with the salon manager so that your next visit at MIA will be an even better experience.`,
        bookFor: "Book Appointment for",
        optionBooked: "ME",
        btnOptionBook: {
          content: [
            { id: "option-me", text: "Just me", type: "ME" },
            { id: "option-guests", text: "2 - 6 Guests", type: "GUESTS" },
            // { id: "option-family", text: "Family", type: "FAMILY" }, // chưa handle
          ],
          icon: `<i class="fa-solid fa-chevron-down rotate-transition"></i>`,
          color: "white",
          bgColor: "#04972f",
          border: "1px solid #04972f",
        },
        image: {
          imgBooking1: "/assets/images/templates/image-banner-booking.png",
          imgBooking2: "/assets/images/templates/image-banner-booking-2.png",
          imgBooking3: "/assets/images/templates/image-cloud.png",
        },
      },
      sideInfo: {
        promotion: {},
        storeInfo: {},
        policy: {},
        socialLink: {},
        socialIcon: [],
      },
      bannerProSelected: {},
    };

    return {
      dataTemplates,
      dataTable,
      configThemeColor,
      sideInfo,
      info,
      bannerPromotion,
      giftCard,
      membership,
      dataSocialPage,

      listDataService,
      listUser,

      dataHeaderNav,
      dataAdvertise,
      dataBannerPage,

      //promotion
      listPromotion,
      dataStoreInfo,
      dataPolicyPage,
      dataSocialLink,

      dataPageMembership,
      dataPageGiftCard,
      // data web
      dataWeb,
    };
  },
};
// * Function runder
// ===== *BEGIN templates home render
function renderTemplates($wrapList, dataTemplates, limit = null) {
  $wrapList.empty();

  const listToRender = limit ? dataTemplates.slice(0, limit) : dataTemplates;

  listToRender.forEach((item) => {
    $wrapList.append(renderItemTemplate(item));
  });
}
function renderItemTemplate(item) {
  return `
          <div class="wrap-item-templates" data-id="${item.id}">
              <div class="image-templates">
                  <img src="${item.imageLink}" alt="Image ${item.titleItem}" class="img-original" />
              </div>
              <div class="info-templates">
                  <p class="title-item-templates mb-0">${item.titleItem}</p>
                  <span class="subtitle-item-templates">${item.subTitleItem}</span>
              </div>
            </div>
      `;
}
const renderHeader = (header) => {
  return `
                 <thead>
                    <tr>
                        ${header
                          .map((col) => {
                            const icon = col.icon
                              ? `<span class="mr-2">${col.icon}</span>`
                              : "";
                            return `
                                                    <th class="${
                                                      col.class ? col.class : ""
                                                    } text-uppercase px-4 py-3 ${
                              col.type === "STATUS" ? "col-small" : "col-large"
                            }">
                                    <span>${col.label}</span>
                                    ${icon}
                                </th>
                            `;
                          })
                          .join("")}
                    </tr>
                </thead>
        `;
};

const renderBody = (body) => {
  return `

            <tbody>
                    ${body
                      .map((row) => {
                        return `
                            <tr>
                                    <td class="px-4 py-3 ${row.name?.class}">
                                        <span>${row.name.text}</span>
                                    </td>
                                    <td class="${row.domain?.class} px-4 py-3">
                                        <span>${row.domain.text}</span>
                                    </td>
                                    <td class="${row.createDate.class} px-4 py-3">
                                        <span>${row.createDate.text}</span>
                                    </td>
                                    <td class="${row.status.class} d-flex align-items-center justify-content-between pa-3">
                                        <span class="py-1 px-6">${row.status.text}</span>
                                        ${row.status.icon}
                                    </td>
                            </tr>
                        `;
                      })
                      .join("")}
           </tbody>
        `;
};

const renderItemTable = (header, body) => {
  return `
        <table class="custom-table">
                <div class="wrap-list-deploy">
                    <div class="wrap-search-recent d-flex justify-content-between">
                        <h4 class="text-uppercase header-templates-left mb-0">Recent</h4>
                        <div class="search-filter-recent">
                            <div class="left-search-filter">
                                <div class="search-recent">
                                    <input placeholder="Search item" class="input-search"/>
                                    <div class="btn-search">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                           <path d="M11.5 21.0605C16.7467 21.0605 21 16.8073 21 11.5605C21 6.31384 16.7467 2.06055 11.5 2.06055C6.25329 2.06055 2 6.31384 2 11.5605C2 16.8073 6.25329 21.0605 11.5 21.0605Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                           <path d="M22 22.0605L20 20.0605" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                       </svg>
                                    </div>
                                </div>
                                <div class="filter-recent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M5.39844 2.16016H18.5984C19.6984 2.16016 20.5984 3.06016 20.5984 4.16016V6.36016C20.5984 7.16016 20.0984 8.16016 19.5984 8.66016L15.2984 12.4602C14.6984 12.9602 14.2984 13.9602 14.2984 14.7602V19.0602C14.2984 19.6602 13.8984 20.4602 13.3984 20.7602L11.9984 21.6602C10.6984 22.4602 8.89844 21.5602 8.89844 19.9602V14.6602C8.89844 13.9602 8.49844 13.0602 8.09844 12.5602L4.29844 8.56016C3.79844 8.06016 3.39844 7.16016 3.39844 6.56016V4.26016C3.39844 3.06016 4.29844 2.16016 5.39844 2.16016Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10.93 2.16016L6 10.0602" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="item-filter">
                                        <ul class="pl-0 mb-0">
                                            <li class="text-end py-2 px-4 ">Templates</li>
                                            <li class="text-end py-2 px-4">Create Dates</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               ${renderHeader(header)}
               ${renderBody(body)}
        </table>
    `;
};

// ===== *END templates home render

const renderColorTheme = (configThemeColor) => {
  const {
    config,
    colorTheme,
    iconActive,
    colorIconPrimary,
    colorIconSecondary,
  } = configThemeColor;
  return `
    <div class="grid-8 grid-gap-y-2 grid-gap-x-2">
      ${
        colorTheme &&
        colorTheme
          .map((item, i) => {
            const { color, selected, active } = item;
            const { width, height, borderRadius } = config;
            const displayChecked = selected ? iconActive : "";

            return `
          <div class="item-theme"
            data-index="${i}"
            style="
              background-color: ${color};
              height: ${height}px;
              width: ${width}px;
              border-radius: ${borderRadius}px;
            ">

            ${
              active
                ? `<p class="color-icon-selected"
                style="
                  --color-icon-checked: ${
                    item.type === "PRIMARY"
                      ? colorIconPrimary
                      : colorIconSecondary
                  }
                "
              >${displayChecked}</p>`
                : ""
            }
          </div>
        `;
          })
          .join("")
      }
    </div>
  `;
};

const renderInfo = (info) => {
  if (!info || !Array.isArray(info)) return "";

  return info
    .map((item, index) => {
      const type = item.type || "INPUT";
      const value = item.value || "";
      const maxLengthInput = 52;
      const maxLengthText = 1000;

      const id =
        type === "TEXTAREA" ? `textarea-info-${index}` : `input-info-${index}`;
      const maxLength = type === "TEXTAREA" ? maxLengthText : maxLengthInput;

      return `
        <div class="option-item px-0">
          <div class="char-count-message text-danger mb-1" id="char-msg-${index}" style="display:none; font-size: 13px;"></div>
          ${
            type === "TEXTAREA"
              ? `<textarea id="${id}" class="textarea-info" maxlength="${maxLength}">${value}</textarea>`
              : `<input id="${id}" class="input-info" value="${value}" maxlength="${maxLength}" />`
          }
        </div>
      `;
    })
    .join("");
};

const renderSideInfor = (sideInfo) => {
  if (!sideInfo || !Array.isArray(sideInfo)) return "";

  return sideInfo
    .map((item) => {
      const id = item.id;
      const idt = item.idt;
      const justify = item.style?.justify || "";
      const hasToggle = item.action?.type === "TOGGLE";
      const isChecked =
        item.action?.defaultValue === true ||
        item.action?.defaultValue === "true";

      return `
        <div id="${id}">
          <div class="option-item" style="justify-content: ${justify}">
          <span>${item.content}</span>
            ${
              hasToggle
                ? `<input id="${idt}" type='checkbox' class='toggle-switch' ${
                    isChecked ? "checked" : ""
                  }/>`
                : ""
            }
          </div>
        </div>
      `;
    })
    .join("");
};

const renderBanner = (bannerPromotion) => {
  if (!bannerPromotion || !Array.isArray(bannerPromotion)) return "";

  return bannerPromotion.map((item) => {
    const justify = item.style.justify || "";
    const hasToggle = item.action?.type === "TOGGLE";
    const id = item.id;

    const isChecked =
      item.action?.defaultValue === true ||
      item.action?.defaultValue === "true";

    return `
      <div class="option-item" style="justify-content: ${justify}">
        <span>${item.content}</span>
        ${
          hasToggle &&
          `<input id="select-banner-pm" data-index="${id}" type='checkbox' class='toggle-switch' ${
            isChecked ? "checked" : ""
          } />`
        }
      </div>
    `;
  });
};

const renderGiftCardAndMembership = (dataCard) => {
  const item = dataCard.item;
  const justify = item.style?.justify || "";
  const hasToggle = item.action?.type === "TOGGLE";

  const isChecked =
    item.action?.defaultValue === true || item.action?.defaultValue === "true";

  const body = dataCard.body;
  const button = dataCard.button;

  return `
      <div class="option-content-item">
         <div class="option-item" style="justify-content: ${justify}">
        <span>${item.content || "NAN"}</span>
          ${
            hasToggle
              ? `<input id=${item.id} type='checkbox' class='toggle-switch' ${
                  isChecked ? "checked" : ""
                }/>`
              : ""
          }
        </div>
        <div class="wrap-link mt-3">
          <div class="label-link">
            <span class="mr-1">${body.title || "NAN"}</span>
            ${body.iconBody || ""}
          </div>

          <div class="link-container">
            <textarea class="item-link" readonly>
${body.content}
            </textarea>
            <button class="btn-copy" title="Copy here" data-tooltip="Copy">
              ${body.icon.value || ""}
            </button>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn-custom-membership mt-3">${
              button.content
            }</button>
          </div>

        </div>
      </div>
  `;
};

function renderSocial(dataSocialPage) {
  if (!dataSocialPage || !Array.isArray(dataSocialPage)) return "";

  return dataSocialPage.map((item) => {
    const justify = item.style.justify || "";
    const hasToggle = item.action?.type === "TOGGLE";

    const isChecked =
      item.action?.defaultValue === true ||
      item.action?.defaultValue === "true";

    return `
      <div class="option-item" style="justify-content: ${justify}">
        <span>${item.content}</span>
        ${
          hasToggle &&
          `<input id="toggle-social" data-index="${
            item.id
          }" type='checkbox' class='toggle-switch' ${
            isChecked ? "checked" : ""
          } />`
        }
      </div>
    `;
  });
}

// PAGE MEMBERSHIP
function renderPageMembership(dataPageMembership) {
  return `
    <div class="page-membership">
      <div class="container-membership">
        <div class="step-header">
          <span class="text-step">Step 1 of 3</span>
          <h2 class="title-step">Choose the plan that's right for you</h2>
        </div>
        <div class="slider-membership">
          <div class="slider-track">
            <div class="wrap-card-membership">
              <div class="attrac">
                <img src="/assets/images/page-membership/attractBuy.png" alt="image attract" class="image-attrac"/>
              </div>
              <div class="card-buy-membership">
                <div class="wrap-rank">
                  <h2 class="text-rank text-uppercase">Brone</h2>
                </div>
                <div class="title-cardbuy">
                  <h2 class="title">Save Every Time You Visit</h2>
                  <span class="sub-title-cardbuy">
                    Perfect For: Regular clients who want quick, affordable services with solid savings.
                  </span>
                </div>
                <div class="info-price">
                  <span class="price-per">$79</span>
                  <span class="text-per text-uppercase">Per 3 Month</span>
                </div>
              </div>
              <div class="policy-card">
                <div class="item-policy">
                  <i class="fa-solid fa-star"></i>
                  <span class="text-policy">
                    $10 off every visit (No minimum spend required)
                  </span>
                </div>
              </div>
              <div class="wrap-button-buy">
                <div class="more-detail">
                  <button class="btn-more-detail text-uppercase">More detail</button>
                </div>
                <div class="buy-now">
                  <button class="btn-buy-now text-uppercase">Buy now</button>
                </div>
              </div>
            </div>
            <div class="wrap-card-membership">
              <div class="attrac">
                <img src="/assets/images/page-membership/attractBuy.png" alt="image attract" class="image-attrac"/>
              </div>
              <div class="card-buy-membership">
                <div class="wrap-rank">
                  <h2 class="text-rank text-uppercase">Brone</h2>
                </div>
                <div class="title-cardbuy">
                  <h2 class="title">Save Every Time You Visit</h2>
                  <span class="sub-title-cardbuy">
                    Perfect For: Regular clients who want quick, affordable services with solid savings.
                  </span>
                </div>
                <div class="info-price">
                  <span class="price-per">$79</span>
                  <span class="text-per text-uppercase">Per 3 Month</span>
                </div>
              </div>
              <div class="policy-card">
                <div class="item-policy">
                  <i class="fa-solid fa-star"></i>
                  <span class="text-policy">
                    $10 off every visit (No minimum spend required)
                  </span>
                </div>
              </div>
              <div class="wrap-button-buy">
                <div class="more-detail">
                  <button class="btn-more-detail text-uppercase">More detail</button>
                </div>
                <div class="buy-now">
                  <button class="btn-buy-now text-uppercase">Buy now</button>
                </div>
              </div>
            </div>
            <div class="wrap-card-membership">
              <div class="attrac">
                <img src="/assets/images/page-membership/attractBuy.png" alt="image attract" class="image-attrac"/>
              </div>
              <div class="card-buy-membership">
                <div class="wrap-rank">
                  <h2 class="text-rank text-uppercase">Brone</h2>
                </div>
                <div class="title-cardbuy">
                  <h2 class="title">Save Every Time You Visit</h2>
                  <span class="sub-title-cardbuy">
                    Perfect For: Regular clients who want quick, affordable services with solid savings.
                  </span>
                </div>
                <div class="info-price">
                  <span class="price-per">$79</span>
                  <span class="text-per text-uppercase">Per 3 Month</span>
                </div>
              </div>
              <div class="policy-card">
                <div class="item-policy">
                  <i class="fa-solid fa-star"></i>
                  <span class="text-policy">
                    $10 off every visit (No minimum spend required)
                  </span>
                </div>
              </div>
              <div class="wrap-button-buy">
                <div class="more-detail">
                  <button class="btn-more-detail text-uppercase">More detail</button>
                </div>
                <div class="buy-now">
                  <button class="btn-buy-now text-uppercase">Buy now</button>
                </div>
              </div>
            </div>
          </div>
          <button class="slider-btn prev">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="slider-btn next">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderPageGiftCard(dataPageGiftCard) {
  return `
    <div class="page-giftcard">
      ${dataPageGiftCard
        .map(
          (section) => `
        <div class="row-giftcard">
          <div class="top-row-giftcard">
            <h2 class="title-giftcard text-uppercase mb-0">${section.title}</h2>
            <span class="see-all">${section.buttonAll}</span>
          </div>
          <div class="slider-giftcard">
            <div class="slider-track">
              ${section.listCard
                .map(
                  (card) => `
                <div class="wrap-card-gift">
                  <div class="wrap-card-image">
                    <img src="${card.image}" alt="image-card" class="img-cardgift"/>
                  </div>
                  <div class="title-gift-card">
                    <h2 class="text-title">${card.title}</h2>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
            <button class="slider-btn prev"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="slider-btn next"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function initSliderFromElement(containerEl, cardSelector) {
  const track = containerEl.querySelector(".slider-track");
  const cards = containerEl.querySelectorAll(cardSelector);
  const prevBtn = containerEl.querySelector(".slider-btn.prev");
  const nextBtn = containerEl.querySelector(".slider-btn.next");

  if (!cards.length || !track) return;

  const cardWidth = cards[0].offsetWidth + 16;
  const visibleWidth = containerEl.offsetWidth;
  let currentOffset = 0;

  function updateButtons() {
    const maxOffset = track.scrollWidth - visibleWidth;
    prevBtn.style.display = currentOffset <= 0 ? "none" : "block";
    nextBtn.style.display = currentOffset >= maxOffset ? "none" : "block";
  }

  function moveSlider(direction) {
    const maxOffset = track.scrollWidth - visibleWidth;
    if (direction === "next") {
      currentOffset = Math.min(currentOffset + cardWidth, maxOffset);
    } else {
      currentOffset = Math.max(currentOffset - cardWidth, 0);
    }
    track.style.transform = `translateX(-${currentOffset}px)`;
    updateButtons();
  }

  prevBtn.addEventListener("click", () => moveSlider("prev"));
  nextBtn.addEventListener("click", () => moveSlider("next"));
  updateButtons();
}

function renderSettingsPopup() {
  const $overlay = $('<div class="settings-overlay"></div>');
  const onlineBookingTabContent = `
      <div class="online-booking-settings">
        <div class="toggle-group px-3">
          <label class="">
            <span class="bold-medium-16">Active Online Booking</span>
          </label>
          <input type="checkbox" class="toggle-switch" checked />
        </div>

        <div class="setting-block px-3">
          <label class="custom-checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Confirm Online Booking
          </label>
          <div class="setting-sub">
            <label>Min.(Hour) <input class="number-input bold-mid-14" type="number" value="1" /></label>
          </div>
        </div>

        <div class="setting-block px-3">
          <label class="custom-checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Confirm Online Booking
          </label>
          <div class="setting-sub">
            <label class="w-100 d-flex justify-content-between align-items-center">
              <label class="custom-checkbox">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                  Online Booking Auto Confirm After (Minutes):
              </label>
              <input class="number-input bold-mid-14" type="number" value="1" />
            </label>
            <span class="time-frame-distance">
              <span class="mr-1">- Time Frame Distance (Minutes)</span>
              <input class="number-input bold-mid-14" type="number" value="15" />
            </span>
          </div>
        </div>

        <div class="setting-block px-3">
          <label class="custom-checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Hide Price
          </label>
        </div>

        <div class="setting-block px-3">
          <label class="custom-checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Show Salon Phone When Don’t See Time
          </label>
        </div>

        <div class="setting-block px-3">
          <label class="custom-checkbox">
                <input type="checkbox" checked/>
                <span class="checkmark"></span>
                Auto Assign No Request Appointment To Tech
          </label>
          <div class="setting-sub">
            <label class="custom-checkbox">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Exclude Salon Appt When Auto Assign
            </label>
          </div>
        </div>

        <div class="setting-block px-3">
          <label class="custom-checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Don’t Show Next Available
          </label>
        </div>

        <div class="setting-block px-3">
          <label class="custom-checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Required Client To Create Account To Book
          </label>
        </div>
        <div class="deposit-section pb-3">
          <div class="toggle-group pa-3">
            <label>
              <span class="bold-medium-16"  >Deposit</span>
            </label>
            <input type="checkbox" class="toggle-switch" checked />
          </div>

          <div class="radio-group px-3">
            <label class="custom-radio">
              <input type="radio" name="deposit" />
              <span class="radio-circle"></span> $
            </label>
            <label class="custom-radio">
              <input type="radio" name="deposit" checked />
              <span class="radio-circle"></span> $
            </label>
            <input class="number-input bold-mid-14" type="number" value="10" />
          </div>

          <div class="setting-block px-3">
            <label class="custom-checkbox">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Next Available Online Booking Appointments Allowed Within 1 Hour
            </label>
          </div>

          <div class="tickets-sub">
            <label>#Tickets <input class="number-input bold-mid-14" type="number" value="2" /></label>
          </div>
        </div>
      </div>
    `;

  const membershipTabContent = `
      <div class="membership-settings">
        <div class="toggle-group px-3">
          <label class="bold-medium-16">Active Membership</label>
          <input type="checkbox" class="toggle-switch" checked />
        </div>

        <div class="wrap-link px-3 mt-3">
          <div class="label-link">
            <span class="mr-1">Link:</span>
            <i class="fa-solid fa-eye-slash toggle-visibility"></i>
          </div>

          <div class="link-container">
            <input class="membership-link" value="https://manage2.mangoforsalon.com/nextview/membership-settings?salon_id=abc" readonly >
            </input>
            <button class="btn-copy" title="Copy here" data-tooltip="Copy">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn-custom-membership mt-3">Custom Membership</button>
          </div>

        </div>
      </div>
    `;

  const giftCardTabContent = `
      <div class="gift-card-settings">
        <div class="setting-gift border-thin-bottom px-3 pt-2 pb-3">
          <label class="bold-medium-16">Use Mango Gift Card System</label>
          <input type="checkbox" class="toggle-switch" checked />
        </div>

        <div class="setting-gift border-thin-bottom px-3 pb-3">
          <label class="bold-medium-14">Min Digit Re  quired For Gift Card</label>
          <input type="number" class="number-input" value="05" />
        </div>

        <div class="setting-gift border-thin-bottom px-3 pb-3">
          <label class="bold-medium-14">Giftcard will have default date before expired at (Month):</label>
          <input type="number" class="number-input" value="0" />
        </div>

        <div class="setting-gift px-3 ">
          <label class="bold-medium-16">Online Gift Card</label>
          <input type="checkbox" class="toggle-switch" checked />
        </div>
        <div class="min-amount px-3">
            <label class="bold-mid-14">Min Amount <input class="number-input bold-mid-14" type="number" value="2" /></label>
          </div>

        <div class="setting-block px-3">
          <div class="d-flex gap-3 justify-content-center align-items-center mb-2">
            <label class="custom-checkbox w-50">
              <input type="checkbox" checked />
              <span class="checkmark"></span>
              Discount
            </label>
            <label class="custom-checkbox w-50">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Coupon
            </label>
          </div>

          <div class="gift-card-pricing d-flex">
            <div class="w-50 d-flex gap-24px pl-4">
              <div class="pricing-box d-flex">
                <div class="price-tag active">$</div>
                <div class="percent-tag">10</div>
              </div>
              <div class="pricing-box d-flex">
                <div class="price-tag">%</div>
                <div class="percent-tag">0</div>
              </div>
            </div>
            <div class="w-50 d-flex gap-24px pl-4">
              <div class="pricing-box d-flex">
                <div class="price-tag active">$</div>
                <div class="percent-tag">10</div>
              </div>
              <div class="pricing-box d-flex">
                <div class="price-tag">%</div>
                <div class="percent-tag">15</div>
              </div>
            </div>
          </div>

          <label class="d-flex align-items-center justify-content-between">
            Duration (day)
            <input type="number" class="number-input ms-2" value="30" />
          </label>

          <div class="link-container">
            <input class="membership-link" value="https://manage2.mangoforsalon.com/nextview/membership-settings?salon_id=abc" readonly ></input>
            <button class="btn-copy" title="Copy here" data-tooltip="Copy"><i class="fa-regular fa-copy"></i></button>
          </div>

          <div class="d-flex justify-content-center align-items-center gap-4">
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=https://manage2.mangoforsalon.com/nextview/membership-settings?salon_id=abc&size=100x100" alt="QR" width="104" height="104"/>
            <div class="download-gift d-flex flex-column align-items-center">
                <i class="fa-solid fa-download"></i>
                <span>Download</span>
              </div>
          </div>
        </div>
      </div>
    `;

  const $popup = $(`
      <div class="popup-settings">
        <div class="container-popup-settings">
          <div class="settings-tabs">
            <div class="btn-closepopup-setting">
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="settings-tab thin-bold-18 active" data-tab="tab1">Online booking</div>
            <div class="settings-tab thin-bold-18" data-tab="tab2">Membership</div>
            <div class="settings-tab thin-bold-18" data-tab="tab3">Gift card</div>
          </div>
          <div class="settings-tab-content active" data-tab="tab1">
            ${onlineBookingTabContent}
          </div>
          <div class="settings-tab-content" data-tab="tab2">
            ${membershipTabContent}
          </div>
          <div class="settings-tab-content" data-tab="tab3">
            ${giftCardTabContent}
          </div>
        </div>
      </div>
    `);

  $("body").append($overlay).append($popup);

  $overlay.addClass("active");
  $popup.addClass("active");

  // Handle tab switching
  $(".settings-tab").on("click", function () {
    const tab = $(this).data("tab");
    $(".settings-tab").removeClass("active");
    $(".settings-tab-content").removeClass("active");
    $(this).addClass("active");
    $(`.settings-tab-content[data-tab="${tab}"]`).addClass("active");
  });
  // Close popup when clicking close button
  $(".btn-closepopup-setting").on("click", function () {
    $overlay.remove();
    $popup.remove();
  });

  // Close popup when clicking overlay
  $overlay.on("click", function () {
    $overlay.remove();
    $popup.remove();
  });

  // ======== Sự kiện trên tab Online Booking
  // Sự kiện trên tab Membership
  // copy trên popup setting
  // --- membership
  $(document).on("click", ".membership-settings .btn-copy", function () {
    const linkInput = $(this).siblings(".membership-link")[0];
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    // Optional: Show tooltip
    $(this).attr("title", "Copied!").tooltip("show");

    // Reset tooltip after 1s
    setTimeout(() => {
      $(this).attr("title", "Copy");
    }, 1000);
  });
  // --- gift card
  $(document).on("click", ".setting-block .btn-copy", function () {
    const linkInput = $(this).siblings(".membership-link")[0];
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    // Optional: Show tooltip
    $(this).attr("title", "Copied!").tooltip("show");

    // Reset tooltip after 1s
    setTimeout(() => {
      $(this).attr("title", "Copy");
    }, 1000);
  });
  $(document).on("click", ".toggle-visibility", function () {
    const $icon = $(this);
    const $input = $icon.closest(".wrap-link").find(".membership-link");

    // Toggle input type: text <-> password
    const isHidden = $input.attr("type") === "password";
    $input.attr("type", isHidden ? "text" : "password");

    // Toggle icon class
    $icon
      .toggleClass("fa-eye fa-eye-slash")
      .attr("title", isHidden ? "Hide Link" : "Show Link");
  });
}

// tính chiều cao templates
function animateHeight($el, isExpand) {
  if (!isExpand) {
    const $firstRowHeight = $el.children().first().outerHeight(true);
    $el.css("height", $firstRowHeight + "px");
  } else {
    $el.css("height", "auto");
  }
}

// render timming
function renderTimeBooking(dataBooking, isCopySameTime) {
  // const userCopyTime = dataBooking.users.find((u) => u.isSelecting && !u.isChoosing);
  return `
      <div class="calendar-timeslot">
        <div class="wrap-calendar-time"
        >
          <div class="top-cal-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16625 11.4688H13.4263V2.46875H1.90625V21.9688H13.4263V12.9688H7.16625V11.4688Z" fill="#E27303" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8448 11.4691C19.8328 11.4681 18.0008 9.63605 18.0008 7.62305V6.87305H16.5008V7.62305C16.5008 9.10005 17.1758 10.4801 18.2198 11.4691L13.4219 11.469V12.969L18.2198 12.9691C17.1758 13.9581 16.5008 15.3371 16.5008 16.8141V17.5641H18.0008V16.8141C18.0008 14.8021 19.8338 12.9691 21.8458 12.9691H22.5958V11.4691H21.8448Z" fill="#E27303" />
            </svg>
            <h2 class="title-copy-time text-uppercase mb-0">SELECT DATE AND TIME</h2>
            <div class="copy-time">
              <input
                id="select-banner-pm"
                type='checkbox'
                class='toggle-switch'
                checked
              />
              <span class="text-same-time">Start on same time</span>
            </div>
          </div>
          <div class="container-cal-time">
            <div class="calendar">
              <div class="calendar-header">
                <button id="prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.0547 12.752H10.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.0547 9.75195L9.05469 12.752L12.0547 15.752" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div id="monthYear"></div>
                <button id="next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M12.5547 22.752C18.0775 22.752 22.5547 18.2748 22.5547 12.752C22.5547 7.22911 18.0775 2.75195 12.5547 2.75195C7.03184 2.75195 2.55469 7.22911 2.55469 12.752C2.55469 18.2748 7.03184 22.752 12.5547 22.752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.05469 12.752H15.0547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.0547 15.752L16.0547 12.752L13.0547 9.75195" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="calendar-grid" id="days">
              </div>
            </div>
            <div class="timeslot">
              <h2 id="selectedDateTitle">August 14, 2025</h2>
              <div id="timeSlotsContainer" class="time-slots"></div>
              <div class="text-scroll-more">
                <h2>Scroll to see more time slots</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

// render container time-booking && select time
function renderContainerTiming(
  dataBooking,
  currentDate,
  monthNames,
  dayNames,
  currentMonth,
  currentYear,
  fakeDataCalender,
  selectedDateParam,
  currentUserId,
  listDataService,
  isCopySameTime
) {
  const $wrapCalendarTimeslot = $(".calendar-timeslot");
  const htmlTimeBooking = renderTimeBooking(dataBooking, isCopySameTime);
  $wrapCalendarTimeslot.replaceWith(htmlTimeBooking);

  // Lấy user hiện tại
  const user = dataBooking.users.find((u) => u.id === currentUserId);

  // 1. Lấy selectedDate ưu tiên từ user, nếu là string -> new Date()
  let userSelected = user ? normalizeToDate(user.selectedDate) : null;

  // 2. Nếu không có userSelected => chọn selectedDateParam hoặc today
  let useDate =
    userSelected || normalizeToDate(selectedDateParam) || new Date();

  // 3. Không để date ở quá khứ (so với today) — nếu quá khứ dùng today
  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  if (useDate < todayOnly) useDate = todayOnly;

  // 4. Nếu ngày rơi vào non-working, tìm ngày làm việc tiếp theo
  useDate = findNextWorkingDate(useDate, fakeDataCalender);

  // 5. đồng bộ month/year với useDate
  currentMonth = useDate.getMonth();
  currentYear = useDate.getFullYear();

  // Render calendar + time slots với ngày đã chọn
  renderCalendar(
    monthNames,
    dayNames,
    currentMonth,
    currentYear,
    fakeDataCalender,
    useDate,
    dataBooking,
    currentUserId,
    listDataService
  );

  // Cập nhật tiêu đề ngày
  const titleEl = document.getElementById("selectedDateTitle");
  if (titleEl) titleEl.textContent = useDate.toDateString();

  // Render time slots cho ngày này (và sẽ chọn time slot nếu user.selectedTimeSlot tồn tại)
  renderTimeSlotsForDate(useDate, dataBooking, currentUserId, listDataService);
}
// render calender
function renderCalendar(
  monthNames,
  dayNames,
  currentMonth,
  currentYear,
  fakeDataCalender,
  selectedDate,
  dataBooking,
  currentUserId,
  listDataService
) {
  const daysEl = document.getElementById("days");
  const monthYearEl = document.getElementById("monthYear");
  daysEl.innerHTML = "";
  monthYearEl.textContent = `${monthNames[currentMonth]}, ${currentYear}`;

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const hasSelectedDate = !!selectedDate;

  // Render day names
  dayNames.forEach((day) => {
    const dayName = document.createElement("div");
    dayName.className = "day-name";
    dayName.textContent = day;
    daysEl.appendChild(dayName);
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    daysEl.appendChild(empty);
  }

  let nearestWorkingDate = null;

  for (let date = 1; date <= daysInMonth; date++) {
    const day = document.createElement("div");
    day.className = "day";
    day.textContent = date;

    const isToday =
      date === todayDate &&
      currentMonth === todayMonth &&
      currentYear === todayYear;
    const isSelected =
      selectedDate &&
      date === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear();
    const nonWorking = fakeDataCalender[currentMonth + 1]?.includes(date);

    const isPast =
      currentYear < todayYear ||
      (currentYear === todayYear && currentMonth < todayMonth) ||
      (currentYear === todayYear &&
        currentMonth === todayMonth &&
        date < todayDate);

    if (nonWorking) {
      day.classList.add("inactive");
    } else if (isPast) {
      day.classList.add("past");
    } else {
      // Nếu chưa có selectedDate và chưa tìm nearestWorkingDate
      if (!hasSelectedDate && !nearestWorkingDate) {
        nearestWorkingDate = date;
      }

      if (isSelected) {
        day.classList.add("active");
      } else if (!hasSelectedDate && nearestWorkingDate === date) {
        day.classList.add("active");
      }
    }

    // Gán select
    if (!isPast && !nonWorking) {
      day.addEventListener("click", () => {
        selectedDate = new Date(currentYear, currentMonth, date);
        document
          .querySelectorAll(".day")
          .forEach((d) => d.classList.remove("active", "today"));

        day.classList.add("active");
        document.getElementById("selectedDateTitle").textContent =
          selectedDate.toDateString();
        renderTimeSlotsForDate(
          selectedDate,
          dataBooking,
          currentUserId,
          listDataService
        );
      });
    }

    daysEl.appendChild(day);
  }

  // Nếu chưa có selectedDate, set selectedDate = nearestWorkingDate
  if (!hasSelectedDate && nearestWorkingDate) {
    selectedDate = new Date(currentYear, currentMonth, nearestWorkingDate);
    document.getElementById("selectedDateTitle").textContent =
      selectedDate.toDateString();
    renderTimeSlotsForDate(
      selectedDate,
      dataBooking,
      currentUserId,
      listDataService
    );
  }
}
//render timeslot
function generateTimeSlots(start, end, interval = 30) {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    const formatted = new Date(0, 0, 0, h, m).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    slots.push(formatted);

    m += interval;
    if (m >= 60) {
      m -= 60;
      h++;
    }
  }

  return slots;
}

function formatAMPM(timeStr) {
  const [hourStr, minute] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour}:${minute} ${ampm}`;
}
function renderTimeSlotsForDate(
  selectedDate,
  dataBooking,
  currentUserId,
  listDataService
) {
  const container = $("#timeSlotsContainer");
  container.empty();
  //timeslot
  const workingHoursByWeekday = {
    0: [], // Chủ nhật - không làm
    1: ["09:00", "15:00"], // Thứ 2
    2: ["08:30", "16:00"], // Thứ 3
    3: ["08:00", "17:00"], // Thứ 4
    4: ["09:15", "17:30"], // Thứ 5
    5: ["10:00", "15:30"], // Thứ 6
    6: ["08:00", "12:00"], // Thứ 7
  };

  const weekday = selectedDate.getDay();
  const workingRange = workingHoursByWeekday[weekday];

  if (!workingRange || workingRange.length === 0) {
    container.append(
      `<div class="time-slot">Không có giờ làm việc hôm nay.</div>`
    );
    return;
  }

  const slots = generateTimeSlots(workingRange[0], workingRange[1]);

  // slots.forEach(slot => {
  //   const div = $(`
  //     <div class="time-slot">
  //       <span>${slot}</span>
  //       <div class="circle">
  //         <div class="dot"></div>
  //       </div>
  //     </div>
  //   `);
  //   container.append(div);
  // });

  slots.forEach((slot) => {
    const div = $(`
        <div class="time-slot">
          <span>${formatAMPM(slot)}</span>
          <div class="circle">
            <div class="dot"></div>
          </div>
        </div>
      `);
    container.append(div);
  });

  container.off("click", ".time-slot");
  container.on("click", ".time-slot", function () {
    container.find(".time-slot").removeClass("selected");
    $(this).addClass("selected");
  });

  // Nếu user đã có selectedTimeSlot thì đánh dấu slot tương ứng
}

// ============= *BEGIN function template popup detail
function showTemplatePopup(
  id,
  dataTemplates,
  dataHeaderNav,
  dataAdvertise,
  dataBannerPage,
  listDataService,
  colorPrimary,
  dataTimming
) {
  // Lấy dữ liệu template từ dataTemplates dựa trên id
  const template = dataTemplates.find((item) => item.id === id);
  const titleBanner = dataBannerPage.title;
  const descBanner = dataBannerPage.desc;

  // Tạo nội dung popup dựa trên template chi tiết
  const popupContent = `
        <div class="popup-overlay">
            <div class="popup-content">
                <div class="popup-body">
                    <div class="container-detail-templates">
                        <div class="header-custom-booking w-100 px-8">
                          <div class="left-header-detail">
                            <i class="fa-solid fa-arrow-left icon-left-booking"></i>
                            <h3 class="text-uppercase title-booking mb-0">Custom online booking</h3>
                          </div>
                          <div class="right-header-detail">
                            <button id="save-template" class="save-bg">
                                <h4 class="text-uppercase text-save mb-0">Save</h4>
                            </button>
                            <button class="publish-bg">
                                <h4 class="text-uppercase text-publish mb-0">Publish</h4>
                            </button>
                            <button class="btn-setting">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <path d="M3 9.1709V14.9409C3 17.0609 3 17.0609 5 18.4109L10.5 21.5909C11.33 22.0709 12.68 22.0709 13.5 21.5909L19 18.4109C21 17.0609 21 17.0609 21 14.9509V9.1709C21 7.0609 21 7.0609 19 5.7109L13.5 2.5309C12.68 2.0509 11.33 2.0509 10.5 2.5309L5 5.7109C3 7.0609 3 7.0609 3 9.1709Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 15.0605C13.6569 15.0605 15 13.7174 15 12.0605C15 10.4037 13.6569 9.06055 12 9.06055C10.3431 9.06055 9 10.4037 9 12.0605C9 13.7174 10.3431 15.0605 12 15.0605Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                          </div>
                        </div>
                        <div class="body-detail-template w-100 px-8">
                            <div class="left-body-detail">
                              <div class="change-logo">
                                <div class="wrap-logo-choosed">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <path d="M12 16.0605V10.0605M12 10.0605L9 12.0605M12 10.0605L15 12.0605M23 15.0605C23 12.8514 21.2091 11.0605 19 11.0605C18.9764 11.0605 18.9532 11.0608 18.9297 11.0612C18.4447 7.66857 15.5267 5.06055 12 5.06055C9.20335 5.06055 6.79019 6.70059 5.66895 9.07136C3.06206 9.24199 1 11.4104 1 14.0604C1 16.8218 3.23858 19.0606 6 19.0606L19 19.0605C21.2091 19.0605 23 17.2697 23 15.0605Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                </div>
                                <div class="title-change-logo">
                                  <span class="btn-upload-logo">Change your logo here</span>
                                  <input type="file" id="input-change-logo" accept="image/*" hidden />
                                </div>
                                <div class="subtitle-change-logo">
                                  <span>Supports: PNG</span>
                                </div>
                              </div>
                                <div class="list-option-change">
                                  <div class="wrap-item-option">
                                    <div class="item-option-change">
                                      <h4 class="text-option text-uppercase mb-0">Color</h4>
                                      <button
                                        id="open-option-theme"
                                        class="btn-option plus"
                                      >
                                        <i class="fa-solid fa-plus white"></i>
                                      </button>
                                    </div>
                                    <div
                                      id="option-theme-color" class="option-content"
                                    >

                                    </div>
                                  </div>
                                  <div class="wrap-item-option">
                                    <div class="item-option-change">
                                      <h4
                                        class="text-option
                                        text-uppercase mb-0"
                                      >
                                        Info
                                      </h4>
                                      <button class="btn-option plus">
                                        <i class="fa-solid fa-plus white"></i>
                                      </button>
                                    </div>
                                    <div id="option-info" class="option-content">
                                    </div>
                                  </div>
                                  <div class="wrap-item-option">
                                    <div class="item-option-change">
                                        <h4 class="text-option text-uppercase mb-0">Side info</h4>
                                        <button #id="side-infor" class="btn-option plus">
                                            <i class="fa-solid fa-plus white"></i>
                                        </button>
                                        </div>
                                      <div id="option-side-info" class="option-content">
                                      </div>
                                  </div>
                                  <div class="wrap-item-option">
                                    <div class="item-option-change">
                                        <h4 class="text-option text-uppercase mb-0">Banner</h4>
                                        <button class="btn-option plus">
                                            <i class="fa-solid fa-plus white"></i>
                                        </button>
                                        </div>
                                      <div
                                        id="option-banner"
                                        class="option-content"
                                      >
                                      </div>
                                  </div>
                                  <div class="wrap-item-option">
                                    <div class="item-option-change">
                                      <h4 class="text-option text-uppercase mb-0">Gift card</h4>
                                      <button class="btn-option plus">
                                          <i class="fa-solid fa-plus white"></i>
                                      </button>
                                    </div>
                                    <div id="option-gift-card" class="option-content">
                                    </div>
                                  </div>
                                  <div class="wrap-item-option">
                                    <div class="item-option-change">
                                      <h4 class="text-option text-uppercase mb-0">Membership</h4>
                                      <button class="btn-option plus">
                                          <i class="fa-solid fa-plus white"></i>
                                      </button>
                                    </div>
                                    <div id="option-membership" class="option-content">
                                    </div>
                                  </div>
                                  <div class="wrap-item-option">
                                    <div class="item-option-change">
                                      <h4 class="text-option text-uppercase mb-0">Social</h4>
                                      <button class="btn-option plus">
                                          <i class="fa-solid fa-plus white"></i>
                                      </button>
                                    </div>
                                    <div id="option-social" class="option-content">
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div class="right-body-detail">
                                <div class="body-header-right">
                                    <div class="view-device">
                                        <button>
                                            View
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div class="wrap-option-device">
                                        <button class="device-option">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <path d="M13.7474 18.3942H8.2474M6.59456 15.6442C5.56981 15.6442 5.05666 15.6442 4.66488 15.4446C4.31991 15.2688 4.03965 14.9876 3.86388 14.6427C3.75296 14.425 3.70362 14.1701 3.68166 13.8109M6.59456 15.6442H15.4002M6.59456 15.6442H5.13037C4.61699 15.6442 4.36056 15.6439 4.16447 15.5439C3.99199 15.4561 3.85186 15.3169 3.76397 15.1444C3.66406 14.9483 3.66406 14.6909 3.66406 14.1775V13.8109H3.68166M3.68166 13.8109C3.66406 13.5229 3.66406 13.1679 3.66406 12.7111V6.66105C3.66406 5.63429 3.66406 5.12052 3.86388 4.72835C4.03965 4.38339 4.31991 4.10313 4.66488 3.92736C5.05705 3.72754 5.57081 3.72754 6.59757 3.72754H15.3976C16.4243 3.72754 16.937 3.72754 17.3292 3.92736C17.6741 4.10313 17.9553 4.38339 18.1311 4.72835C18.3307 5.12014 18.3307 5.63328 18.3307 6.65804V12.7137C18.3307 13.1692 18.3307 13.5234 18.3132 13.8109M3.68166 13.8109H18.3132M18.3132 13.8109C18.2913 14.1701 18.242 14.425 18.1311 14.6427C17.9553 14.9876 17.6741 15.2688 17.3292 15.4446C16.9374 15.6442 16.425 15.6442 15.4002 15.6442M18.3132 13.8109H18.3307V14.1775C18.3307 14.6909 18.3304 14.9483 18.2305 15.1444C18.1426 15.3169 18.0029 15.4561 17.8304 15.5439C17.6343 15.6439 17.3771 15.6442 16.8637 15.6442H15.4002" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button class="device-option active">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <path d="M3.66406 5.74406V16.3774C3.66406 17.4042 3.66406 17.9173 3.86388 18.3094C4.03965 18.6544 4.31991 18.9352 4.66488 19.1109C5.05666 19.3105 5.56981 19.3105 6.59456 19.3105H15.4002C16.425 19.3105 16.9374 19.3105 17.3292 19.1109C17.6741 18.9352 17.9553 18.6544 18.1311 18.3094C18.3307 17.9177 18.3307 17.4052 18.3307 16.3805V5.74105C18.3307 4.71629 18.3307 4.20315 18.1311 3.81136C17.9553 3.4664 17.6741 3.18614 17.3292 3.01037C16.937 2.81055 16.4243 2.81055 15.3976 2.81055H6.59757C5.57081 2.81055 5.05705 2.81055 4.66488 3.01037C4.31991 3.18614 4.03965 3.4664 3.86388 3.81136C3.66406 4.20353 3.66406 4.7173 3.66406 5.74406Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button class="device-option">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <path d="M6.41406 5.74406V16.3774C6.41406 17.4042 6.41406 17.9173 6.61388 18.3094C6.78965 18.6544 7.06991 18.9352 7.41488 19.1109C7.80666 19.3105 8.31981 19.3105 9.34456 19.3105H12.6502C13.675 19.3105 14.1874 19.3105 14.5792 19.1109C14.9241 18.9352 15.2053 18.6544 15.3811 18.3094C15.5807 17.9177 15.5807 17.4052 15.5807 16.3805V5.74105C15.5807 4.71629 15.5807 4.20315 15.3811 3.81136C15.2053 3.4664 14.9241 3.18614 14.5792 3.01037C14.187 2.81055 13.6743 2.81055 12.6476 2.81055H9.34757C8.32081 2.81055 7.80705 2.81055 7.41488 3.01037C7.06991 3.18614 6.78965 3.4664 6.61388 3.81136C6.41406 4.20353 6.41406 4.7173 6.41406 5.74406Z" stroke="#747474" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="wrap-web">
                                  <div id="list-info" class="show-list-info">
                                    <div id="item-promotion-page"></div>
                                    <div id="store-info-page"></div>
                                    <div id="policy-page"></div>
                                    <div id="social-link-page">
                                    </div>
                                    <div id="social-icon-page">
                                      <div class="wrap-list-social">
                                        <div class="list-social"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="list-more">
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Thêm popup vào body
  $("body").append(popupContent);

  // Xử lý sự kiện đóng popup
  $(".icon-left-booking").on("click", function () {
    $(".popup-overlay").remove();
  });

  // Đóng popup khi click bên ngoài
  $(".popup-overlay").on("click", function (e) {
    if (e.target === this) {
      $(".popup-overlay").remove();
    }
  });

  const $wrapWeb = $(".wrap-web");
  const htmlHeaderNav = renderNavHeaderTemplates(dataHeaderNav);
  const htmlAdvertise = renderAdvertisePage(dataAdvertise);
  const htmlBannerPage = renderBannerPage(dataBannerPage);
  const htmlTimeBooking = renderTimeBooking({}, false);

  $wrapWeb.prepend(
    `<div class="wrap-header">${htmlHeaderNav}</div>`,
    `<div class="wrap-advertise-page">${htmlAdvertise}</div>`,
    `<div class="wrap-banner-page">${htmlBannerPage}</div>`
  );
  $wrapWeb.append(
    `<div id="section-date-time" class="wrap-calendar-timeslot"
      style="
        --color-cur-primary: ${colorPrimary.color}
      "
    >${htmlTimeBooking}</div>`
  );

  renderCalendar(
    dataTimming.monthNames,
    dataTimming.dayNames,
    dataTimming.currentMonth,
    dataTimming.currentYear,
    dataTimming.fakeDataCalender,
    dataTimming.selectedDate,
    {},
    "",
    {}
  );
  // Khởi tạo ngày hôm nay làm selectedDate và gán ngày hôm nay cho selectedDate user nếu selectedDate chưa có
  dataTimming.selectedDate = new Date(
    dataTimming.currentYear,
    dataTimming.currentMonth,
    dataTimming.currentDate.getDate()
  );
  // Cập nhật tiêu đề ngày được chọn
  document.getElementById("selectedDateTitle").textContent =
    dataTimming.selectedDate.toDateString();
  // Hiển thị time slots cho ngày hôm nay
  renderTimeSlotsForDate(dataTimming.selectedDate, {}, "", {});

  //render service list
  renderListService(listDataService);
}

// =============== * BEGIN template servive
function renderListService(dataList, containerSelector = ".list-more") {
  const $container = $(containerSelector);
  $container.empty();

  dataList.forEach(({ item }, i) => {
    const $moreItem = $(
      `<div class="more-item" style="z-index: ${
        100 + item.listItem.length - i
      }"></div>`
    );

    const $expandTitle = renderExpandTitle(item);
    $moreItem.append($expandTitle);

    const $listCards = item.listItem.map(renderServiceCard);
    const $wrapper = $(`<div class="wrap-list-more"></div>`).append($listCards);
    $moreItem.append($wrapper);

    $container.append($moreItem);
  });
}
function renderNavHeaderTemplates(dataHeaderNav) {
  const {
    logo: logoWeb,
    itemNav,
    colorActiveNav,
    iconUser,
    buttonBooking,
    cart,
  } = dataHeaderNav;

  return `
    <div class="nav-header-web" style="--color-active: ${colorActiveNav}">
      <div class="wrap-logo-nav-web">
        <img src=${logoWeb} alt="logo" class="img-logo" />
      </div>
      <div class="left-nav-web">
        <div class="list-option">
          ${itemNav
            .map((item) => {
              const iconItemNav = item.icon ? item.icon : "";
              return `
              <button id="${item.id}" class="text-uppercase option">
                ${item.name}
                ${iconItemNav}
              </button>
            `;
            })
            .join("")}
        </div>
        <div class="cart-profile">
          <button class="user">
            ${iconUser}
          </button>
          <button class="booking text-uppercase"
            style="
              --btn-bg: ${buttonBooking.bgBtn};
              --btn-color: ${buttonBooking.color};
              --btn-border: ${buttonBooking.border};
              --btn-bg-hover: ${buttonBooking.bgColorHover}
            "
          >
            ${buttonBooking.content}
          </button>
          <div class="cart-user">
            <button>
              ${cart.icon}
            </button>
            <span class="quantity-prod"
              style="
                --bgColorQa: ${cart.bgColor};
                --colorQua: ${cart.color};
              "
            >
              ${cart.quatity}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdvertisePage(dataAdvertise) {
  const { bgAdvertise1, bgAdvertise2, buttonSignIn } = dataAdvertise;

  return `
    <div class="advertise">
      <div class="advertise-bg-1"
        style="
          --bg-advertise1: ${bgAdvertise1.bgColor};
          --rotate-bg-advertise1: ${bgAdvertise1.transformRotate};
        "
      ></div>
      <div class="advertise-bg-2"
        style="
          --bg-adverstise2: ${bgAdvertise2.bgColor};
          --color-content: ${bgAdvertise2.colorContent};
        "
      >
        <div class="w-72">
          <p>
            ${bgAdvertise2.content.map((item) => {
              return `
                <span class="text-advertise"
                  style="
                    --text-weight-ad: ${item.fontWeight}
                  "
                >
                  ${item.text}
                </span>
              `;
            })}
          </p>
        </div>
        <div class="wrap-signin">
          <div class="text-uppercase sign-in"
              style="
                --bgColor-signin: ${buttonSignIn.bgColor};
                --text-color-signin: ${buttonSignIn.color};
                --bgColor-signin-hover: ${buttonSignIn.bgColorHover};
                --border-signin: ${buttonSignIn.border};
              "
          >
            ${buttonSignIn.content}
          </div>
        </div>
      </div>
    </div>
  `;
}
function renderBannerPage(dataBannerPage) {
  const { greeting, brand, title, desc, bookFor, btnOptionBook, image } =
    dataBannerPage;
  return `
    <div class="banner">
      <div class="content-banner">
        <div class="wrap-content-left-banner">
          <div class="hight-text-banner">
            <div class="welcome-to">${greeting}</div>
            <p>
              <span class="text-uppercase text-mountains-christmas">${brand}</span>
              <br />
              <span id="banner-title" class="time-relax">${title}</span>
            </p>
            <p id="banner-desc" class="text-content-banner">
              ${desc}
            </p>
          </div>
          <div class="book-appoint">
            <p class="book-for">${bookFor}</p>
            <button class="btn-just-me"
              style="
                --color-book-for: ${btnOptionBook.color};
                --bg-book-for: ${btnOptionBook.bgColor};
                --border-book-for: ${btnOptionBook.border};
              "
            >
              ${btnOptionBook.content[0].text}
              ${btnOptionBook.icon}
            </button>
          </div>
        </div>
        <div class="img-banner-booking">
          <img class="img-booking-2" src="${image.imgBooking2} ">
          <img class="img-booking-1" src="${image.imgBooking1}" />
          <img class="img-booking-3" src="${image.imgBooking3}" />
        </div>
      </div>
    </div>
  `;
}
function renderPromotion() {}
function showPopupSelectPromotion(listPromotion) {
  const titleSelectPromotion = listPromotion.title;
  const listItem = listPromotion.item;

  return `
    <div class="over-promotion">
      <div class="popup-container-promotion">
        <div class="popup-wrap-promotion">
          <div class="title-select-promotion">
            <h2>${titleSelectPromotion}</h2>
          </div>
          <div class="wrap-list-promotion">
            ${listItem
              .map((item, index) => {
                const { img, title, percent, dateTime, id } = item;

                return `
                  <div id="${id}" data-index="${index}" class="item-promotion">
                    <div class="right-promotion-item">
                      <img src="${img}" alt="image promotion" class="img-promotion"/>
                    </div>
                    <div class="left-promotion-item">
                      <div class="title-icon">
                        <h2 class="title mb-0">${title.content}</h2>
                      </div>
                      <div class="percent-promotion">
                        <span class="percent"
                          style="
                            --bgColor-percent: ${percent.bgColor};
                            --textColor-percent: ${percent.color};
                          "
                        >
                          ${percent.number}%
                        </span>
                        <h2 class="title-percent mb-0">${percent.content}</h2>
                      </div>
                      <div class="date-time">
                        <p>Valid until ${dateTime.endTime}</p>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
        <div class="btn-closepopup-promotion">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  `;
}

const renderStoreInfo = (dataStoreInfo, color = "") => {
  const $container = $('<div class="store-info"></div>');

  const $left = $(`
    <div class="store-left">
      <h3 style="
        --colorTextStoreInfo: ${color};"
      >
        ${dataStoreInfo.brand.toUpperCase()}
      </h3>
      <p>${dataStoreInfo.iconLocation} ${dataStoreInfo.phoneNumber}</p>
      <p>${dataStoreInfo.address}</p>
    </div>
  `);

  const $right = $('<div class="store-right"></div>');
  $right.append("<h4>HOURS</h4>");

  dataStoreInfo.timeWork.forEach((item) => {
    const $row = $(`
      <div class="store-hour-row">
        <span class="weekday">${item.weekday}</span>
        <span class="time">${item.time}</span>
      </div>
    `);
    $right.append($row);
  });

  $container.append($left).append($right);
  return $container;
};

const renderPolicyPage = (dataPolicyPage, color = "") => {
  const { title, styleTitle, listItem } = dataPolicyPage;

  const titleHtml = `
    <h3
      class="title-policy"
      style="
        --colorTextTitlePolicy: ${color}
      "
    >
      ${title.toUpperCase()}
    </h3>
  `;

  const itemsHtml = listItem
    .map((item) => {
      const contentHtml = item.content
        .map((part) => {
          if (part.style) {
            // Nếu có style riêng
            return `<span style="color: ${part.style.color}">${part.text}</span>`;
          } else {
            return `<span>${part.text}</span>`;
          }
        })
        .join(" ");

      return `<p class="item-policy">${contentHtml}</p>`;
    })
    .join("");

  return `
    <div class="policy-page">
      ${titleHtml}
      <div class="policy-list">
        ${itemsHtml}
      </div>
    </div>
  `;
};

const renderSocialLink = (data, color = "") => {
  const address = encodeURIComponent(data.mapLocation.address);
  return `
    <div class="map-wrapper"
      style="
        --colorBorderMap: ${color}
      "
    >
      <iframe
        width="100%"
        height="300"
        style="border:0; border-radius: 8px;"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed">
      </iframe>
    </div>
  `;
};

function renderPromotionItemSide(dataProm) {
  return `
    <div class="item-promotion-selected">
      <div class="right-promotion-item">
        <img src="${dataProm.img}" alt="image promotion" class="img-promotion"/>
      </div>
      <div class="left-promotion-item">
        <div class="title-icon">
          <h2 class="title mb-0">${dataProm.title.content}</h2>
        </div>
        <div class="percent-promotion">
          <span class="percent"
            style="--bgColor-percent: ${dataProm.percent.bgColor}; --textColor-percent: ${dataProm.percent.color};"
          >
            ${dataProm.percent.number}%
          </span>
          <h2 class="title-percent mb-0">${dataProm.percent.content}</h2>
        </div>
        <div class="date-time">
          <p>Valid until ${dataProm.dateTime.endTime}</p>
        </div>
      </div>
      <div class="change-promotion">
        <h2 class="text-change-promotion mb-0">Change</h2>
      </div>
    </div>`;
}
const renderPromotionItemPage = (dataProm, extraClass = "") => {
  return `
    <div class="item-promotion-page ${extraClass}">
      <div class="right-promotion-item">
        <img src="${dataProm.img}" alt="image promotion" class="img-promotion"/>
      </div>
      <div class="left-promotion-item">
        <div class="title-icon">
          <h2 class="title mb-0">${dataProm.title.content}</h2>
        </div>
        <div class="percent-promotion">
          <span class="percent"
            style="--bgColor-percent: ${dataProm.percent.bgColor}; --textColor-percent: ${dataProm.percent.color};"
          >
            ${dataProm.percent.number}%
          </span>
          <h2 class="title-percent mb-0">${dataProm.percent.content}</h2>
        </div>
        <div class="date-time">
          <p>Valid until ${dataProm.dateTime.endTime}</p>
        </div>
      </div>
    </div>
  `;
};

function renderSocialItemPage(item) {
  return `
    <div class="wrap-image-social" data-id="${item.id}">
      <img src="${item.img}" alt="image social" class="img-social"/>
    </div>
  `;
}

function renderExpandTitle(item) {
  const $title = $('<div class="expend-title"></div>');

  $title.append(item.iconLeft);
  $title.append(
    `<p class="text-uppercase bold-medium-14 mb-0">${item.value}</p>`
  );
  $title.append(item.iconRight);

  return $title;
}

function renderServiceCard(item) {
  const $card = $('<div class="card-more"></div>');

  const $top = $(`
    <div class="top-card">
      <div class="left-card">
        <p class="bold-medium-14">${item.title}</p>
        <p class="thin-mid-14">${item.subTitle}</p>
      </div>
      <div class="right-card">
        <p class="bold-medium-20">${item.priceRental}</p>
        <p class="bold-mid-12">${item.timetext}</p>
      </div>
    </div>
  `);

  const $listUser = $(
    `
      <div class="option-select-user">
        ${renderSelectedUsers(item.userSelected)}
      </div>
    `
  );

  const $actions = renderActionButtons(item);
  $card.append($top, $actions, $listUser);
  return $card;
}

function renderActionButtons(item) {
  const $wrap = $('<div class="add-more"></div>');

  const $add = $(`
    <button class="btn-add-more">
      <i class="fa-solid fa-plus"></i>
    </button>
  `);

  const $wrapSelect = $(`
    <div class="wrap-select-user">
      <div class="icon-checked">
        <i class="fa-solid fa-check"></i>
      </div>
      <div class="toggle-select">
        <span id="full-name-selected">Next Available</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
  `);

  const $del = $(`
    <button class="btn-delete">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M14 10.0605V17.0605M10 10.0605V17.0605M6 6.06055V17.8605C6 18.9807 6 19.5403 6.21799 19.9681C6.40973 20.3445 6.71547 20.651 7.0918 20.8428C7.5192 21.0605 8.07899 21.0605 9.19691 21.0605H14.8031C15.921 21.0605 16.48 21.0605 16.9074 20.8428C17.2837 20.651 17.5905 20.3445 17.7822 19.9681C18 19.5407 18 18.9816 18 17.8636V6.06055M6 6.06055H8M6 6.06055H4M8 6.06055H16M8 6.06055C8 5.12866 8 4.66295 8.15224 4.29541C8.35523 3.80535 8.74432 3.41578 9.23438 3.21279C9.60192 3.06055 10.0681 3.06055 11 3.06055H13C13.9319 3.06055 14.3978 3.06055 14.7654 3.21279C15.2554 3.41578 15.6447 3.80535 15.8477 4.29541C15.9999 4.66295 16 5.12867 16 6.06055M16 6.06055H18M18 6.06055H20" stroke="#ECB155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `);

  $wrap.append($add, $wrapSelect, $del);
  return $wrap;
}

function renderBtnMoreInfo(bgColor) {
  return `
    <div class="wrap-btn-more-sideinfo">
      <button
        style="
          --bgColorBtnMoreSI: ${bgColor}
        "
        class="btn-show-more-sideinfo">
          Show More Info
        </button>
    </div>
  `;
}

// Render danh sách user để chọn
function renderUserOptions(users) {
  return `
    <div class="wrap-user">
      ${users
        .map(
          (user) => `
        <div class="item-user" data-id="${user.id}">
          <div class="avatar-user">
            <img src="${user.avatar}" alt="image ${user.name}" class="img-user" />
          </div>
          <span class="full-name">${user.name}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderSelectedUsers(userSelected) {
  // Chưa có user thì return rỗng
  if (!userSelected || Object.keys(userSelected).length === 0) return "";

  const { name = "Name user", image = "" } = userSelected;

  return `
    <div class="item-user">
      <div class="avatar-user">
        <img src="${image}" alt="image user" class="img-user"/>
      </div>
      <span>${name}</span>
    </div>
  `;
}

// =============== * END template servive

$(document).ready(function () {
  let isCollapsed = false;
  const {
    dataTemplates,
    dataTable,
    //data left template detail
    configThemeColor,
    info,
    sideInfo,
    bannerPromotion,
    giftCard,
    membership,
    dataSocialPage,
    // == data right template detail
    listDataService,
    listUser,
    //
    dataHeaderNav,
    dataAdvertise,
    dataBannerPage,
    //==
    listPromotion,
    dataStoreInfo,
    dataPolicyPage,
    dataSocialLink,
    // ==
    dataPageMembership,
    dataPageGiftCard,

    dataWeb,
  } = onlineStore.load();
  // variable local
  let colorPrimary = configThemeColor.colorTheme.find(
    (item) => item.type === "PRIMARY"
  );
  let colorSecondary = configThemeColor.colorTheme.find(
    (item) => item.type === "SECONDARY"
  );

  // Biến xử lý chọn ngày đặt lịch
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();

  let selectedDate = null;
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const fakeDataCalender = {
    8: [8, 9, 10, 12, 20, 22], // August: non-working days
  };

  const dataTimming = {
    monthNames,
    dayNames,
    currentDate,
    selectedDate,
    fakeDataCalender,
    currentMonth,
    currentYear,
  };

  const $wrapList = $(".wrap-list-templates");
  const $wrapContainerDeploy = $(".container-deploy");
  $wrapContainerDeploy.empty();

  // ======= *BEGIN POPUP templates detail
  $(document).on("click", ".image-templates", function () {
    const id = $(this).closest(".wrap-item-templates").data("id");
    if (id) {
      showTemplatePopup(
        id,
        dataTemplates,
        dataHeaderNav,
        dataAdvertise,
        dataBannerPage,
        listDataService,
        colorPrimary,
        dataTimming
      );
    }
  });

  // **** BEGIN Sự kiện bên trái template
  $(document).on("click", ".item-option-change .btn-option", function () {
    const $clickedBtn = $(this);
    const $wrapItemOption = $clickedBtn.closest(".wrap-item-option");
    const $optionContent = $wrapItemOption.find(".option-content");
    const $icon = $clickedBtn.find("i");
    const $itemOptionChange = $clickedBtn.parent(".item-option-change");

    const isSelfOpen = $clickedBtn.hasClass("active");

    const clickedId = $optionContent.attr("id");

    // ⚠️ Check nếu option đang mở là gift-card hoặc membership
    const currentlyOpened = $(".option-content.expanded");
    const currentlyOpenedId = currentlyOpened.attr("id");

    const commonOptionIds = [
      "option-theme-color",
      "option-info",
      "option-side-info",
      "option-banner",
      "option-social",
    ];
    const isClickedCommonOption = commonOptionIds.includes(clickedId);
    const isCurrentlyMembershipOrGiftCard = [
      "option-gift-card",
      "option-membership",
    ].includes(currentlyOpenedId);

    if (isClickedCommonOption && isCurrentlyMembershipOrGiftCard) {
      if (currentlyOpenedId === "option-gift-card") {
        $("#toggle-gift-card").prop("checked", false).trigger("change");
      } else if (currentlyOpenedId === "option-membership") {
        $("#toggle-membership").prop("checked", false).trigger("change");
      }
    }

    // Đóng tất cả trước
    $(".item-option-change.active").removeClass("active");
    $(".option-content.expanded").removeClass("expanded");
    $(".btn-option.active")
      .removeClass("active sub")
      .addClass("plus")
      .find("i")
      .removeClass("fa-minus")
      .addClass("fa-plus");

    if (!isSelfOpen) {
      // Nếu click vào button khác, mở cái mới
      $optionContent.addClass("expanded");
      $icon.removeClass("fa-plus").addClass("fa-minus");
      $itemOptionChange.addClass("active");
      $clickedBtn.removeClass("plus").addClass("active sub");

      // Render nếu content rỗng
      const renderMap = {
        "option-theme-color": () => renderColorTheme(configThemeColor),
        "option-info": () => renderInfo(info),
        "option-side-info": () => renderSideInfor(sideInfo),
        "option-banner": () => renderBanner(bannerPromotion),
        "option-gift-card": () => renderGiftCardAndMembership(giftCard),
        "option-membership": () => renderGiftCardAndMembership(membership),
        "option-social": () => renderSocial(dataSocialPage),
      };

      const renderFn = renderMap[clickedId];
      const isEmpty =
        $optionContent.children().length === 0 &&
        $optionContent.text().trim() === "";
      if (renderFn && isEmpty) {
        const html = renderFn();
        $optionContent.html(html);
      }
    }
  });

  // -- CHANGE LOGO * xử lý chọn logo
  // Gán sự kiện khi bấm nút upload
  $(document).on("click", ".btn-upload-logo", function () {
    $("#input-change-logo").click();
  });
  // Xử lý khi người dùng chọn logo
  $(document).on("change", "#input-change-logo", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    // Chỉ cho phép PNG
    if (!file.type.startsWith("image/")) {
      alert("Chỉ hỗ trợ ảnh PNG!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const imgUrl = event.target.result;

      // Hiển thị background logo
      $(".wrap-logo-choosed")
        .css({
          "background-image": `url(${imgUrl})`,
          width: "100px",
          height: "48px",
        })
        .find("svg")
        .remove();
      // Gán tên ảnh vào subtitle
      $(".subtitle-change-logo span").text(`Selected: ${file.name}`);

      // Cập nhật logo trong data và render lại header
      dataHeaderNav.logo = imgUrl;

      const htmlHeader = renderNavHeaderTemplates(dataHeaderNav);
      $(".wrap-header").html(htmlHeader);
    };

    reader.readAsDataURL(file); // đọc file thành base64 URL
  });
  // -- * CHANGE COLOR * Sử lý chọn màu
  // func đổi màu
  const updateColorPrimary = (item) => {
    //header
    dataHeaderNav.colorActiveNav = item.color;
    dataHeaderNav.buttonBooking.bgBtn = item.color;
    dataHeaderNav.buttonBooking.border = `1px solid ${item.color}`;
    const htmlHeaderNav = renderNavHeaderTemplates(dataHeaderNav);
    $(".wrap-header").html(htmlHeaderNav);
    //advertise
    dataAdvertise.bgAdvertise1.bgColor = item.color;
    dataAdvertise.buttonSignIn.bgColor = item.color;
    dataAdvertise.buttonSignIn.border = `1px solid ${item.color}`;

    const htmlAdvertise = renderAdvertisePage(dataAdvertise);
    $(".wrap-advertise-page").html(htmlAdvertise);

    //banner
    dataBannerPage.btnOptionBook.bgColor = item.color;
    dataBannerPage.btnOptionBook.border = `1px solid ${item.color}`;

    const htmlBannerPage = renderBannerPage(dataBannerPage);
    $(".wrap-banner-page").html(htmlBannerPage);

    //btn more info
    const $wrapBtnMore = $(".wrap-btn-more-sideinfo");
    if ($wrapBtnMore.length > 0) {
      const htmlBtnMoreInfo = renderBtnMoreInfo(colorPrimary.color);
      $wrapBtnMore.replaceWith(htmlBtnMoreInfo);
    }

    //store info
    const $storeInfo = $(".store-info");
    if ($storeInfo.length > 0) {
      const htmlStoreInfoPage = renderStoreInfo(
        dataStoreInfo,
        colorPrimary.color
      );

      $storeInfo.replaceWith(htmlStoreInfoPage);
    }

    //policy
    const $policy = $(".policy-page");
    if ($policy.length > 0) {
      //xử lý màu trong dataPolicy
      dataPolicyPage.listItem.forEach((item) => {
        item.content.forEach((child) => {
          if (child.style && child.style.color) {
            child.style.color = colorPrimary.color;
          }
        });
      });
      const htmlSPolicyPage = renderPolicyPage(
        dataPolicyPage,
        colorPrimary.color
      );

      $policy.replaceWith(htmlSPolicyPage);
    }

    //social link
    const $socialLink = $(".map-wrapper");
    if ($socialLink.length > 0) {
      const htmlSocialLinkPage = renderSocialLink(
        dataSocialLink,
        colorPrimary.color
      );

      $socialLink.replaceWith(htmlSocialLinkPage);
    }
  };
  const updateColorSecondary = (item) => {
    //advertise
    dataAdvertise.bgAdvertise2.bgColor = item.color;

    const htmlAdvertisePage = renderAdvertisePage(dataAdvertise);
    $(".wrap-advertise-page").html(htmlAdvertisePage);
  };
  $(document).on("click", ".item-theme", function () {
    const index = $(this).data("index");
    const item = configThemeColor.colorTheme[index];
    if (item.active && !item.selected) {
      const removedType = getRemovedType();
      item.selected = true;
      item.type = removedType;

      if (removedType === "PRIMARY") {
        updateColorPrimary(item);
      } else {
        updateColorSecondary(item);
      }
    } else if (item.selected || item.active) {
      // Bỏ chọn khi click lại vào item đã chọn
      delete item.type;
      item.selected = !item.selected;
      const removedType = getRemovedType();
      if (removedType === "PRIMARY") {
        colorPrimary = "#00bed6";
        const itemDefaultPrimary = {
          color: "#00bed6",
        };
        updateColorPrimary(itemDefaultPrimary);
      } else {
        colorSecondary = "#E27303";
        const itemDefaultSecond = {
          color: "#E27303",
        };
        updateColorSecondary(itemDefaultSecond);
      }
    } else if (!item.active) {
      const removedType = getRemovedType();
      if (removedType) {
        // Cập nhật item mới
        item.selected = true;
        item.active = true;
        item.type = removedType;

        // Xử lý đổi màu
        if (removedType === "PRIMARY") {
          // CẬP NHẬT MÀU
          colorPrimary = configThemeColor.colorTheme.find(
            (item) => item.type === "PRIMARY"
          );
          updateColorPrimary(item);
        } else if (removedType === "SECONDARY") {
          // Cập nhật màu
          colorSecondary = configThemeColor.colorTheme.find(
            (item) => item.type === "SECONDARY"
          );
          updateColorSecondary(item);
        }

        // Tìm item cũ đang giữ loại đó (PRIMARY hoặc SECONDARY)
        const oldItem = configThemeColor.colorTheme.find(
          (i) => i !== item && i.selected === false
        );
        if (oldItem) {
          oldItem.active = false;
          delete oldItem.selected;
        }
      }
    }

    // Render lại
    $("#option-theme-color").html(renderColorTheme(configThemeColor));
  });
  // -- * CHANGE COLOR * Hàm kiểm tra isPrimary hay isSecondary đang thiếu
  function getRemovedType() {
    const currentPrimary = configThemeColor.colorTheme.find(
      (i) => i.type === "PRIMARY"
    );
    const currentSecondary = configThemeColor.colorTheme.find(
      (i) => i.type === "SECONDARY"
    );

    if (!currentPrimary) return "PRIMARY";
    if (!currentSecondary) return "SECONDARY";

    return null;
  }
  // -- * INPUT, TEXTAREA: title, desc banner;
  $(document).on("input", "#input-info", function () {
    const value = $(this).val();
    dataBannerPage.title = value;
    $("#banner-title").text(value);
  });
  $(document).on("input", "#textarea-info", function () {
    const value = $(this).val();
    dataBannerPage.desc = value;
    $("#banner-desc").text(value);
  });

  // --- START xử lý focus hiển thị ký tự còn lại
  $(document).on("focus", ".input-info, .textarea-info", function () {
    const id = $(this).attr("id");
    const index = id.split("-").pop();
    const $msg = $(`#char-msg-${index}`);
    const maxLength = $(this).attr("maxlength");
    const currentLength = $(this).val().length;

    $msg.text(`Bạn còn có thể nhập ${maxLength - currentLength} ký tự`);
    $msg.show();
  });

  $(document).on("input", ".input-info, .textarea-info", function () {
    const id = $(this).attr("id");
    const index = id.split("-").pop();
    const $msg = $(`#char-msg-${index}`);
    const maxLength = $(this).attr("maxlength");
    const currentLength = $(this).val().length;

    $msg.text(`Bạn còn có thể nhập ${maxLength - currentLength} ký tự`);
  });

  $(document).on("blur", ".input-info, .textarea-info", function () {
    const index = $(this).attr("id").split("-").pop();
    $(`#char-msg-${index}`).hide();
  });
  // ---END xử lý focus hiển thị ký tự còn lại

  // -- * SIDE INFO *
  // ---- show all
  // === Helpers chung ===

  function updateToggleState() {
    const sections = [
      "#sit-promotion",
      "#sit-store-info",
      "#sit-policy",
      "#sit-social-link",
    ];

    const anyChecked = sections.some((id) => {
      return $(id).is(":checked");
    });
    const allChecked = sections.every((id) => $(id).is(":checked"));

    $("#sit-show-all").prop("checked", allChecked);

    // show btn more info
    const $wrapBtnMoreSideinfo = $(".wrap-btn-more-sideinfo");
    if (anyChecked && $wrapBtnMoreSideinfo.length === 0) {
      const $listInfo = $("#list-info");
      const htmlBtnMoreInfo = renderBtnMoreInfo(colorPrimary.color);
      $listInfo.prepend(htmlBtnMoreInfo);
    } else if (!anyChecked) {
      $wrapBtnMoreSideinfo.remove();
    }
  }
  function toggleAllSideInfo(enable) {
    $("#sit-promotion, #sit-store-info, #sit-policy, #sit-social-link")
      .prop("checked", enable)
      .trigger("change");
  }
  // Show all
  $(document).on("change", "#sit-show-all", function () {
    toggleAllSideInfo($(this).is(":checked"));
  });
  // Promotion
  $(document).on("change", "#sit-promotion", function () {
    const isChecked = $(this).is(":checked");
    const $sideWrap = $("#si-promotion");
    const $pageWrap = $("#item-promotion-page");
    const $itemPromotionSelected = $("#si-promotion .item-promotion-selected");
    const $overPromotion = $(".over-promotion");

    if (isChecked) {
      // mở popup để chọn
      const html = showPopupSelectPromotion(listPromotion);
      $(".wrap-web").append(html);
      requestAnimationFrame(() =>
        $(".popup-container-promotion").addClass("move-right")
      );
    } else {
      // delete dataWeb
      dataWeb.sideInfo.promotion = {};

      $pageWrap.empty().hide();
      $overPromotion.empty().hide();
      $itemPromotionSelected.empty().hide();
    }
    updateToggleState();
  });

  // Store Info
  $(document).on("change", "#sit-store-info", function () {
    const $container = $("#store-info-page");
    if ($(this).is(":checked")) {
      // save dataWeb
      dataWeb.sideInfo.storeInfo = dataStoreInfo;

      $container
        .html(renderStoreInfo(dataStoreInfo, colorPrimary.color))
        .show();
    } else {
      // Delete dataWeb
      dataWeb.sideInfo.storeInfo = {};

      $container.empty().hide();
    }
    updateToggleState();
  });

  // Policy
  $(document).on("change", "#sit-policy", function () {
    //xử lý màu trong dataPolicy
    dataPolicyPage.listItem.forEach((item) => {
      item.content.forEach((child) => {
        if (child.style && child.style.color) {
          child.style.color = colorPrimary.color;
        }
      });
    });
    const $container = $("#policy-page");
    if ($(this).is(":checked")) {
      // save dataWeb
      dataWeb.sideInfo.policy = dataPolicyPage;

      $container
        .html(renderPolicyPage(dataPolicyPage, colorPrimary.color))
        .show();
    } else {
      // delete dataWeb
      dataWeb.sideInfo.policy = {};
      $container.empty().hide();
    }
    updateToggleState();
  });

  // Social Link (Map)
  $(document).on("change", "#sit-social-link", function () {
    const $container = $("#social-link-page");
    if ($(this).is(":checked")) {
      // save dataWeb
      dataWeb.sideInfo.socialLink = dataSocialLink;

      $container
        .html(renderSocialLink(dataSocialLink, colorPrimary.color))
        .show();
    } else {
      // delete dataWeb
      dataWeb.sideInfo.socialLink = {};
      $container.empty().hide();
    }
    updateToggleState();
  });

  // ------- change promotion
  $(document).on("click", ".text-change-promotion", function () {
    const html = showPopupSelectPromotion(listPromotion);
    $(".wrap-web").append(html);
    requestAnimationFrame(() =>
      $(".popup-container-promotion").addClass("move-right")
    );
  });
  // ------- Select promotion
  $(document).on("click", ".item-promotion", function () {
    const id = $(this).attr("id");
    const dataPromSelected = listPromotion.item.find((i) => i.id === id);

    // save dataWeb
    dataWeb.sideInfo.promotion = dataPromSelected;

    const $sideWrap = $("#si-promotion");
    const $itemPromotionSelected = $("#si-promotion .item-promotion-selected");

    if ($itemPromotionSelected.length !== 0) {
      $itemPromotionSelected.remove();
      $sideWrap.append(renderPromotionItemSide(dataPromSelected));
    } else {
      $sideWrap.append(renderPromotionItemSide(dataPromSelected)).show();
    }

    if ($(".item-promotion-page").length > 0) {
      $(".item-promotion-page").remove();
      let classEx = "";
      if ($("#item-promotion-page").find(".overlay-dark").length > 0) {
        classEx = "transparent";
      }

      const htmlProPage = renderPromotionItemPage(dataPromSelected, classEx);
      $(".wrap-item-promotion-page").append(htmlProPage);
    } else {
      $("#item-promotion-page")
        .html(
          `
            <div class="wrap-item-promotion-page">
              ${renderPromotionItemPage(dataPromSelected)}
            </div>
          `
        )
        .show();
    }
    $(".over-promotion").remove();
  });
  // close promotion
  $(document).on("click", ".btn-closepopup-promotion", function () {
    // nếu có item-promotion-selected thì khi tắt popup toggle promotion vẫn on
    const $itemPromotionSelected = $(".item-promotion-selected");
    if ($itemPromotionSelected.length > 0) {
      $(".over-promotion").remove();
    } else {
      $("#sit-promotion").prop("checked", false).trigger("change");
      $(".over-promotion").remove();
    }
    // ngược lại nếu chưa có item-promotion-selected thì toggle promotion off
  });
  // Cập nhật banner background cho wrap-item-promotion-page
  $(document).on("change", "#select-banner-pm", function () {
    const isChecked = $(this).is(":checked");
    const idItemSelect = $(this).data("index");
    const bgImgBp = bannerPromotion.find(
      (item) => item.id === idItemSelect
    )?.img;
    const $loShowbg = $(".wrap-item-promotion-page");
    const $itemPromotionPage = $loShowbg.find(".item-promotion-page");

    // bỏ chọn các toggle on khác
    $("input#select-banner-pm").not($(this)).prop("checked", false);
    if (isChecked) {
      // add overlay + backround + css + class
      if ($(".overlay-dark").length === 0) {
        $loShowbg.append(`<div class="overlay-dark"></div>`);
      }
      $itemPromotionPage.addClass("transparent");
      $loShowbg.css({
        "background-image": `url("${bgImgBp}")`,
        "justify-content": "flex-start",
        padding: "24px 12px",
      });
      // Thêm vào dataWeb
      dataWeb.bannerProSelected.image = bgImgBp;
    } else {
      $(".overlay-dark").remove();
      $itemPromotionPage.removeClass("transparent");
      $loShowbg.css({
        "background-image": "",
        "justify-content": "center",
        padding: "",
      });
      dataWeb.bannerProSelected = {};
    }
  });

  $(document).on("change", "#toggle-membership", function () {
    const isChecked = $(this).is(":checked");

    if (isChecked) {
      // Tắt gift card
      $("#toggle-gift-card").prop("checked", false).trigger("change");
      $(
        ".banner, .wrap-advertise-page, .list-more, .show-list-info, .wrap-calendar-time"
      ).addClass("hide");
      const $wrapWeb = $(".wrap-web");
      // append layout memmbership
      const $membership = renderPageMembership(dataPageMembership);
      const $giftCard = $("#toggle-gift-card");
      $wrapWeb.append($membership);

      $("#page-membership").addClass("active");

      setTimeout(() => {
        const sliderEl = document.querySelector(
          ".page-membership .slider-membership"
        );
        if (sliderEl) {
          initSliderFromElement(sliderEl, ".wrap-card-membership");
        }
      }, 0);
    } else {
      $(
        ".banner, .wrap-advertise-page, .list-more, .show-list-info, .wrap-calendar-time"
      ).removeClass("hide");
      $(".page-membership").remove();
      $("#page-membership").removeClass("active");
    }
  });
  // copy trên active membership và active gift card
  $(document).on("click", ".option-content-item .btn-copy", function () {
    const $button = $(this);
    const $textarea = $button.siblings("textarea.item-link");

    $textarea[0].select();
    $textarea[0].setSelectionRange(0, 99999);

    const successful = document.execCommand("copy");

    if (successful) {
      // Đổi tooltip
      $button.attr("data-tooltip", "Copied!").addClass("show-tooltip");

      setTimeout(() => {
        $button.attr("data-tooltip", "Copy").removeClass("show-tooltip");
      }, 1000);
    }
  });

  // toggle gift card
  $(document).on("change", "#toggle-gift-card", function () {
    const isChecked = $(this).is(":checked");

    if (isChecked) {
      // Tắt Membership
      $("#toggle-membership").prop("checked", false).trigger("change");

      $(
        ".banner, .wrap-advertise-page, .list-more, .show-list-info, .wrap-calendar-time"
      ).addClass("hide");
      const $wrapWeb = $(".wrap-web");
      const $giftCard = renderPageGiftCard(dataPageGiftCard);
      $wrapWeb.append($giftCard);
      $("#page-giftcard").addClass("active");
      // Gọi sau render
      setTimeout(() => {
        document
          .querySelectorAll(".row-giftcard .slider-giftcard")
          .forEach((sliderEl) => {
            initSliderFromElement(sliderEl, ".wrap-card-gift");
          });
      }, 0);
    } else {
      $(
        ".banner, .wrap-advertise-page, .list-more, .show-list-info, .wrap-calendar-time"
      ).removeClass("hide");
      $(".page-giftcard").remove();
      $("#page-giftcard").removeClass("active");
    }
  });
  // toggle select social
  let dataSocialPageSelected = [];
  $(document).on("change", "#toggle-social", function () {
    const $this = $(this);
    const isChecked = $this.is(":checked");
    const idSelected = $this.data("index");
    const $loShowSo = $("#social-icon-page");

    const itemSelected = dataSocialPage.find((item) => item.id === idSelected);
    if (!itemSelected) return;

    const indexInSelected = dataSocialPageSelected.findIndex(
      (item) => item.id === idSelected
    );

    if (isChecked && indexInSelected === -1) {
      // save dataWeb
      dataWeb.sideInfo.socialIcon.push(itemSelected);

      dataSocialPageSelected.push(itemSelected);
      const htmlSocialItem = renderSocialItemPage(itemSelected);
      $loShowSo.find(".list-social").append(htmlSocialItem);
    } else if (!isChecked && indexInSelected !== -1) {
      // delete dataWeb
      dataWeb.sideInfo.socialIcon.splice(indexInSelected, 1);

      dataSocialPageSelected.splice(indexInSelected, 1);
      $loShowSo.find(`.wrap-image-social[data-id="${idSelected}"`).remove();
    }
  });
  // ===== expend see more
  $(document).on("click", ".see-all", function () {
    const $btn = $(this);
    const $row = $btn.closest(".row-giftcard");

    const isExpanded = $row.hasClass("see-all-mode");

    if (isExpanded) {
      // Đang là "xem tất cả" → thu gọn về slider
      $row.removeClass("see-all-mode");
      $btn.text("See All");

      // Hiện nút slider
      $row.find(".slider-btn").show();

      // Reset transform nếu cần
      const $track = $row.find(".slider-track");
      $track.css({
        transform: "",
        transition: "",
      });

      // Gọi lại slider nếu cần (nếu initSliderFromElement cần chạy lại)
      initSliderFromElement(
        $row.find(".slider-giftcard")[0],
        ".wrap-card-gift"
      );
    } else {
      // Chuyển sang xem tất cả
      $row.addClass("see-all-mode");
      $btn.text("Collapse");

      $row.find(".slider-btn").hide();
      const $track = $row.find(".slider-track");
      $track.css({
        transform: "none",
        transition: "none",
      });
    }
  });
  // **** END Sự kiện bên trái template popup

  // POPUP SETTING
  //====== *BEGIN Settings Popup Logic
  $(document).on("click", ".btn-setting", function () {
    renderSettingsPopup();
  });
  // ==== *END POPUP templates detail

  // ===== *BEGIN Sự kiện trên page home template
  // toggle list service
  $(document).on("click", ".expend-title", function () {
    const $wrap = $(this).next(".wrap-list-more");
    const $iconDown = $(this).find(".fa-chevron-down");

    if ($iconDown.hasClass("rotate-180")) {
      $iconDown.removeClass("rotate-180");
    } else {
      $iconDown.addClass("rotate-180");
    }
    $wrap.toggleClass("collapsed");
  });

  // btn more

  $(document).on("click", ".add-more .btn-add-more", function () {
    const $parentBtn = $(this).closest(".add-more");
    $(this).hide();
    const $selectUser = $parentBtn.find(".wrap-select-user");
    const $btnDelete = $parentBtn.find(".btn-delete");

    $selectUser.css("display", "flex").hide().fadeIn();
    $btnDelete.show();
  });
  // remove option select user
  $(document).on("click", ".add-more .btn-delete", function () {
    const $parentBtn = $(this).closest(".add-more");
    $(this).hide();
    const $selectUser = $parentBtn.find(".wrap-select-user");
    const $btnAddmore = $parentBtn.find(".btn-add-more");

    $selectUser.hide();
    $btnAddmore.show();
  });
  // select option user
  $(document).on("click", ".wrap-select-user .toggle-select", function (e) {
    e.stopPropagation();

    const $toggle = $(this); // phần tử được click
    const $parentN = $toggle.closest(".wrap-select-user");

    const $wrap = $toggle.closest(".card-more");
    const $optionList = $wrap.find(".option-select-user");

    const $iconChecked = $parentN.find(".icon-checked");

    // Nếu chưa render
    if ($optionList.children().length === 0) {
      const html = renderUserOptions(listUser);
      $optionList.html(html);
    }

    // Xóa dropdown cũ
    $(".option-select-user").not($optionList).removeClass("show");

    // Lấy kích thước của toggle-select
    const toggleWidth = $toggle.outerWidth();
    // Lấy vị trí cho option-select-user
    const optionUserWidth = $iconChecked.outerWidth();
    const paddingCardMore = 20;
    const gapWrapSelectUser = 16;
    const leftPosOptionList =
      optionUserWidth + paddingCardMore + gapWrapSelectUser;

    // Gán lại CSS cho dropdown
    $optionList.css({
      position: "absolute",
      left: leftPosOptionList + "px",
      width: toggleWidth + "px",
      zIndex: 999,
    });

    // Toggle hiển thị
    $optionList.toggleClass("show");
  });

  // touch out close option user
  $(document).on("click", function () {
    const $optionList = $(this).find(".option-select-user");
    $optionList.empty();
    $(".option-select-user").removeClass("show");
  });

  // gắn user selected
  $(document).on("click", ".item-user", function (e) {
    e.stopPropagation();
    const name = $(this).find(".full-name").text();
    const $wrap = $(this).closest(".card-more");

    $wrap.find("#full-name-selected").text(name);
    $wrap.find(".option-select-user").removeClass("show");
  });

  // ===== *END Sự kiện trên page home template

  // ===== *BEGIN TEMPLATE NGOÀI

  function renderTableDeploy(limit = null) {
    $wrapContainerDeploy.empty();
    const $tableInfor = $('<div class="table-infor"></div>');
    $wrapContainerDeploy.append(
      $tableInfor.append(renderItemTable(dataTable.header, dataTable.body))
    );
  }

  renderTemplates($wrapList, dataTemplates, null);

  const $headerTemplatesRight = $(".header-templates-right");
  const $iconTemplatesGal = $("#icon-templates-gallery");

  $headerTemplatesRight.on("click", function () {
    isCollapsed = !isCollapsed;
    renderTemplates($wrapList, dataTemplates, null);
    $wrapList.toggleClass("collapsed", isCollapsed);
    // tính animation chiều cao templates
    animateHeight($wrapList, !isCollapsed);

    // render table
    if (isCollapsed) {
      renderTableDeploy();
      $iconTemplatesGal.addClass("rotate-180");
    } else {
      $wrapContainerDeploy.empty();
      $iconTemplatesGal.removeClass("rotate-180");
    }
  });

  // Search & filter
  $(document).on("click", ".search-recent", function (e) {
    e.stopPropagation();
    $(this).addClass("focus-search");
  });
  // -- lick ra ngoài ẩn input search
  $(document).on("click", ".left-search-filter", function (e) {
    const $searchRecent = $(this).find(".search-recent")[0];

    if (!$searchRecent.contains(e.target)) {
      $(`.search-recent`).removeClass("focus-search");
    }
  });

  // Toggle khi click vào filter-recent
  $(document).on("click", ".filter-recent", function (e) {
    e.stopPropagation(); // Ngăn lan ra ngoài document
    const $itemFilter = $(this).find(".item-filter");
    $itemFilter.toggle();
  });

  // Ngăn không ẩn nếu click vào chính .item-filter
  $(document).on("click", ".item-filter", function (e) {
    e.stopPropagation(); // Ngăn lan ra ngoài document
  });

  // Ẩn nếu click ra ngoài vùng filter-recent hoặc item-filter
  $(document).on("click", function () {
    $(".item-filter").hide();
  });

  // Sort table (colum header-date)
  let isAscending = true;

  function sortTableByDate(dataTable) {
    dataTable.body.sort((a, b) => {
      const dateA = new Date(a.createDate.text);
      const dateB = new Date(b.createDate.text);
      return isAscending ? dateA - dateB : dateB - dateA;
    });
  }

  $(document).on("click", ".header-date", function () {
    const store = onlineStore.load();
    const dataTable = store.dataTable;

    isAscending = !isAscending;

    sortTableByDate(dataTable);

    const newBodyTableSort = renderBody(dataTable.body);

    $("table.custom-table tbody").replaceWith(newBodyTableSort);

    // reset màu icon
    $(".icon-sort-date path").attr("stroke", "#747474");
    if (isAscending) {
      $(".icon-sort-date .sort-up-1, .icon-sort-date .sort-up-2").attr(
        "stroke",
        "var(--bs-main)"
      );
    } else {
      $(".icon-sort-date .sort-down-1, .icon-sort-date .sort-down-2").attr(
        "stroke",
        "var(--bs-main)"
      );
    }
  });
  // START: Xử lý option trên banner
  $(document).on("click", "#prev", function () {
    if (currentMonth > 0) {
      currentMonth--;
      // Khởi tạo ngày hôm nay làm selectedDate
      selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

      renderCalendar(
        monthNames,
        dayNames,
        currentMonth,
        currentYear,
        fakeDataCalender,
        selectedDate,
        {},
        "",
        {}
      );
      // Cập nhật tiêu đề ngày được chọn
      document.getElementById("selectedDateTitle").textContent =
        selectedDate.toDateString();
      // Hiển thị time slots cho ngày hôm nay
      renderTimeSlotsForDate(selectedDate, {}, "", {});
    }
  });
  $(document).on("click", "#next", function () {
    if (currentMonth < 11) {
      currentMonth++;
      // Khởi tạo ngày hôm nay làm selectedDate
      selectedDate = new Date(currentYear, currentMonth, currentDate.getDate());

      renderCalendar(
        monthNames,
        dayNames,
        currentMonth,
        currentYear,
        fakeDataCalender,
        selectedDate,
        {},
        "",
        {}
      );
      // Cập nhật tiêu đề ngày được chọn
      document.getElementById("selectedDateTitle").textContent =
        selectedDate.toDateString();
      // Hiển thị time slots cho ngày hôm nay
      renderTimeSlotsForDate(selectedDate, {}, "", {});
    }
  });

  // ===== *END TEMPLATE NGOÀI

  // Xử lý lưu dữ liệu templates
  $(document).on("click", "#save-template", function () {
    // header
    dataWeb.dataHeaderNav = dataHeaderNav;

    // color web
    dataWeb.color.bgPrimary = colorPrimary.color;
    dataWeb.color.bgSecondary = colorSecondary.color;
    //advertise
    dataWeb.advertises = dataAdvertise;
    //banner
    dataWeb.banner = dataBannerPage;

    localStorage.setItem("dataTemplate", JSON.stringify(dataWeb));
    console.log("win: ", window.location.origin);
    window.open(window.location.origin + "/templates/1");
  });
});
