/* eslint-disable no-console */
window.addEventListener('load', () => {
  let insertCount = 1;

  /**
   * Add MutualObserver for Pokebox select to add event listeners when pokemon
   * is selected for insertion.
   */
  const logPksAnalysisInserts = () => {
    const pkmInsertObserver = new MutationObserver((_mutationList, observer) => {
      const portal = document.getElementById('headlessui-portal-root');
      const grid = portal?.getElementsByClassName('grid w-full grid-cols-1 gap-1.5 lg:grid-cols-2');
      const buttons = grid?.[0]?.getElementsByClassName('button-clickable-bg group p-1');
      if (buttons) {
        Array.from(buttons).forEach((button) => {
          button.addEventListener('click', () => console.info(`Pokémon ${insertCount++}: Pokemon Selected`));
          observer.disconnect();
        });
      }
    });
    pkmInsertObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  /**
   * Add Click events when insert button from pokebox is selected.
   *
   * @param {Element} item The Insert Pokemon Row for from pokebox (first button)
   */
  const logItemSelect = (item) => {
    const insertPkmBtn = item.firstElementChild;
    insertPkmBtn?.addEventListener('click', () => {
      logPksAnalysisInserts();
      console.info(`Pokémon ${insertCount}: Insert Selected`);
    });
  };

  // eslint-disable-next-line max-len
  const items = document.getElementsByClassName('flex flex-row place-content-center place-items-center items-center text-center w-full gap-1.5');
  Array.from(items).forEach((item) => {
    logItemSelect(item);
  });
});
