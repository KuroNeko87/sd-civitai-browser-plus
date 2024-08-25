function updateCardSize() {
    const civModelCards = document.querySelectorAll(".civmodelcard img, .civmodelcard .video-bg");
    civModelCards.forEach((card) => {
        card.style.width = "100%";
        card.style.height = "auto";
    });

    const figCaptions = document.querySelectorAll(".civmodelcard figcaption");
    figCaptions.forEach((caption) => {
        caption.style.height = "auto";
    });
}

function toggleNSFWContent(event, button) {
    const nsfwElements = document.querySelectorAll(".civcardnsfw, .civnsfw img");
    nsfwElements.forEach((element) => {
        if (element.classList.contains("blur")) {
            element.classList.remove("blur");
        } else {
            element.classList.add("blur");
        }
    });

    if (button) {
        const showNSFW = button.getAttribute("data-show-nsfw") === "true";
        button.setAttribute("data-show-nsfw", !showNSFW);
        button.textContent = showNSFW ? "Show NSFW" : "Hide NSFW";
    }
}

function updateSVGIcons(isLightTheme) {
    const svgIcons = document.querySelectorAll("svg");
    svgIcons.forEach((icon) => {
        icon.classList.remove("svg-light", "svg-dark");
        icon.classList.add(isLightTheme ? "svg-light" : "svg-dark");
    });
}

function adjustFilterBoxAndButtons() {
    const filterBox = document.querySelector("#filterBox");
    const filterBoxL = document.querySelector("#filterBoxL");

    if (filterBox && filterBoxL) {
        const filterBoxParent = filterBox.parentElement;
        const filterBoxLParent = filterBoxL.parentElement;

        filterBoxParent.style.display = "flex";
        filterBoxParent.style.justifyContent = "center";
        filterBoxLParent.style.display = "flex";
        filterBoxLParent.style.justifyContent = "center";

        filterBox.style.maxWidth = "100%";
        filterBoxL.style.maxWidth = "100%";

        const labels = document.querySelectorAll("#filterBox .label-wrap.open, #filterBoxL .label-wrap.open");
        labels.forEach((label) => {
            label.style.borderBottom = "none";
            label.style.borderRadius = "7px";
            label.style.height = "40px";
        });

        const filterContents = document.querySelectorAll("#filterBox > div:nth-child(3), #filterBoxL > div:nth-child(3)");
        filterContents.forEach((content) => {
            content.style.padding = "20px";
            content.style.position = "absolute";
            content.style.borderRadius = "10px";
            content.style.width = "300px";
            content.style.zIndex = "100";
            content.style.marginTop = "55px";
        });
    }
}

function initPage() {
    updateCardSize();
    adjustFilterBoxAndButtons();
    const isLightTheme = document.documentElement.classList.contains("light-theme");
    updateSVGIcons(isLightTheme);
}

document.addEventListener("DOMContentLoaded", () => {
    initPage();
    
    // Add event listeners for NSFW toggle buttons
    const nsfwButtons = document.querySelectorAll(".toggle-nsfw");
    nsfwButtons.forEach((button) => {
        button.addEventListener("click", (event) => toggleNSFWContent(event, button));
    });
    
    // Listen for theme change to update SVG icons
    const observer = new MutationObserver(() => {
        const isLightTheme = document.documentElement.classList.contains("light-theme");
        updateSVGIcons(isLightTheme);
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
});
