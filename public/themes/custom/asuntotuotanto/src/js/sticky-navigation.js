(($, Drupal) => {
  Drupal.behaviors.stickyNavigation = {
    attach: function attach() {
      const stickyNavigationElement = document.getElementById(
        "sticky_navigation"
      );
      const headerElement = document.getElementsByTagName("header")[0];
      const apartmentHeaderElement = document.getElementsByClassName(
        "apartment__header"
      )[0];
      const apartmentAnchorNavigationElement = document.getElementsByClassName(
        "apartment__anchor-navigation--desktop"
      )[0];

      let currentWindowWidth = window.innerWidth;

      const handleWindowWidthUpdate = () => {
        currentWindowWidth = window.innerWidth;
      };

      const toggleStickyNavigation = () => {
        const headerElementOffsetTop =
          headerElement.offsetTop + headerElement.offsetHeight;
        const apartmentHeaderElementHeight =
          apartmentHeaderElement.offsetHeight;
        const apartmentHeaderElementOffsetTop =
          apartmentHeaderElement.offsetTop + apartmentHeaderElementHeight;

        const apartmentAnchorNavigationElementHeight =
          apartmentAnchorNavigationElement.offsetHeight;
        const apartmentAnchorNavigationElementOffsetTop =
          apartmentAnchorNavigationElement.offsetTop +
          apartmentAnchorNavigationElementHeight;

        // Mobile & Tablet functionality.
        if (currentWindowWidth < 992) {
          if (
            window.scrollY >
            apartmentHeaderElementOffsetTop - apartmentHeaderElementHeight / 2
          ) {
            if (stickyNavigationElement.classList.contains("is-hidden")) {
              stickyNavigationElement.classList.remove("is-hidden");
              stickyNavigationElement.setAttribute("aria-hidden", false);
            }
          }

          if (window.scrollY < headerElementOffsetTop) {
            if (!stickyNavigationElement.classList.contains("is-hidden")) {
              stickyNavigationElement.classList.add("is-hidden");
              stickyNavigationElement.setAttribute("aria-hidden", true);
            }
          }
        }

        // Desktop functionality.
        if (currentWindowWidth > 992) {
          if (window.scrollY > apartmentAnchorNavigationElementOffsetTop) {
            if (stickyNavigationElement.classList.contains("is-hidden")) {
              stickyNavigationElement.classList.remove("is-hidden");
              stickyNavigationElement.setAttribute("aria-hidden", false);
            }
          }

          if (window.scrollY < apartmentAnchorNavigationElementOffsetTop) {
            if (!stickyNavigationElement.classList.contains("is-hidden")) {
              stickyNavigationElement.classList.add("is-hidden");
              stickyNavigationElement.setAttribute("aria-hidden", true);
            }
          }
        }
      };

      let previousActiveAnchorId;

      const stickyNavigationAnchorItems = stickyNavigationElement.getElementsByTagName(
        "a"
      );
      const pageAnchorSections = [...stickyNavigationAnchorItems].map(
        (anchor) => {
          const anchorHref = anchor.getAttribute("href");

          if (anchorHref) {
            return document.getElementById(anchorHref.substring(1));
          }

          return [];
        }
      );

      const handleAnchorLinkActiveState = () => {
        const stickyNavigationElementHeight =
          stickyNavigationElement.offsetHeight;
        const offsetTop = window.scrollY + stickyNavigationElementHeight - 24;
        const currentPageAnchorSection = [];

        pageAnchorSections.map((anchor) => {
          if (anchor && anchor.offsetTop < offsetTop)
            currentPageAnchorSection[0] = anchor;

          return [];
        });

        const currentPageAnchorSectionId =
          currentPageAnchorSection && currentPageAnchorSection.length
            ? currentPageAnchorSection[0].id
            : "";

        if (previousActiveAnchorId !== currentPageAnchorSectionId) {
          previousActiveAnchorId = currentPageAnchorSectionId;

          [...stickyNavigationAnchorItems].forEach((anchor) =>
            anchor.classList.remove("is-active")
          );

          const currentStickyNavigationAnchorItem = [
            ...stickyNavigationAnchorItems,
          ].find(
            (anchor) =>
              anchor.getAttribute("href").substring(1) ===
              currentPageAnchorSectionId
          );

          if (currentStickyNavigationAnchorItem)
            currentStickyNavigationAnchorItem.classList.add("is-active");
        }
      };

      window.addEventListener("resize", () => handleWindowWidthUpdate());
      window.addEventListener("scroll", () => {
        toggleStickyNavigation();
        handleAnchorLinkActiveState();
      });
    },
  };
})(jQuery, Drupal);
