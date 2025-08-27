export function renderCopyServiceOption(containerSelector, optionCopyService) {
  const {
    dataUser,
    bgColor = "",
    border = "#E28B01",
    color = "#E28B01",
    icon = `<i class="fa-solid fa-chevron-up rotate-transition"></i>`,
  } = optionCopyService;

  const userSelecting = dataUser.find((x) => x.isSelecting === true);

  const availableUsers = dataUser.filter(
    (item) => !item.isSelecting && !item.isChoosing && item.firstName
  );
  const isSelected =
    !$("btn-option-copy-user").hasClass("selected") && userSelecting;
  const html = `
        <button class="btn-option-copy-user ${isSelected ? "selected" : ""}"
          style="
            --color-user-copy: ${color};
            --bg-user-copy: ${bgColor};
            --border-user-copy: ${border};
          "
        >
          <span class="text-selected-option">
            ${
              userSelecting
                ? userSelecting.firstName
                : "Choose guest copy service"
            }
          </span>
          ${icon}
        </button>
        <div class="list-option-copy">
          ${
            availableUsers.length === 0
              ? `<div class="option-item-none">
              None Option
            </div>`
              : dataUser
                  .map((item) => {
                    if (
                      item.isSelecting === true ||
                      item.isChoosing ||
                      !item.firstName ||
                      item.services.length === 0
                    )
                      return "";
                    return `
              <button class="option-item-copy" data-id="${item.id}"
                style="
                  --color-user-copy: ${color};
                  --bg-user-copy: ${bgColor};
                  --border-user-copy: ${border};
                "
              >
                ${item.firstName}
              </button>
            `;
                  })
                  .join("")
          }
        </div>
      `;

  $(containerSelector).html(html);
}
