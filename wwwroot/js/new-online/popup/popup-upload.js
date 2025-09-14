// Content popup upload image
export function renderPopupUpload(dataImages, colorPrimary, isMobile) {
  const maxImages = 3;

  const imageSlots = Array.from({ length: maxImages }).map((_, index) => {
    const img = dataImages[index];
    const hasImg = !!img?.link;

    return `
          <div class="cover-input-img">
            <label class="upload-box">
              <i class="fa-solid fa-cloud-arrow-down"></i>
              <span class="text">
              ${
                hasImg
                  ? "Change image"
                  : `
                  ${
                    isMobile
                      ? `
                      <p class="text-click-to-upload">Image</p>
                    `
                      : `
                      <p class="text-click-to-upload">Click to upload<p/>
                      <p> Or Drag and drop</p>
                    `
                  }
                `
              }</span>
              <img
                class="preview"
                src="${hasImg ? img.link : ""}"
                style="display: ${hasImg ? "block" : "none"};"
              />
              <div class="error-msg" style="display: none;">Error</div>
              <input type="file" accept=".png,.jpg,.jpeg,.svg">
            </label>
            ${
              hasImg
                ? `
              <div class="btn-action-img">
                <button class="remove-img">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>`
                : ""
            }
          </div>
        `;
  });

  return `
        <div class="popup-wrap-upload"
          style="
            --color-cur-primary: ${colorPrimary};
          "
        >
          <div class="title-upload">
            <h2>Upload photos</h2>
          </div>
          <div class="center-upload">
            <div class="wrap-img-represent">
              <img src="/assets/images/upload-represent/image-represent-upload.png" alt="Image represent upload"/>
            </div>
            <div class="desc-how-up">
              ${
                isMobile
                  ? `
                <span>Choose your image</span>
                `
                  : `
                  <span class="click-upload">
                    Click To Upload
                  </span>
                  <span class="drag-upload">
                    Or Drag And Drop
                  </span>
                `
              }
            </div>
            <div class="condi-img">
              <span class="name">
                <p>Png, </p>
                <p>Svg, </p>
                <p>Jpg </p>
              </span>
              <span class="max-size">
                Max File Size: 6Mb
              </span>
            </div>
          </div>
          <div class="wrap-list-img">
            <div class="container-list-img">
              ${imageSlots.join("")}
            </div>
          </div>
          <div class="wrap-action-btn">
            <div class="container-action-btn">
              <button class="cancel-upload">
                Cancel
              </button>
              <button class="save-upload">
                Save
              </button>
            </div>
          </div>
        </div>
      `;
}
