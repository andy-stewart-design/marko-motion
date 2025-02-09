export default class Lightbox {
  onCreate() {
    this.state = {
      isOpen: false,
      isAnimating: false,
      controller: new AbortController(),
    };
  }

  onMount() {
    const dialog = this.getEl("lightbox");

    const { signal } = this.state.controller;
    dialog.addEventListener(
      "cancel",
      (e) => {
        e.preventDefault();
        document.startViewTransition(() => {
          this.state.isOpen = false;
          requestAnimationFrame(() => dialog.close());
        });
      },
      { signal }
    );
  }

  toggleModal() {
    const dialog = this.getEl("lightbox");
    this.state.isAnimating = true;

    setTimeout(() => {
      const transition = document.startViewTransition(() => {
        this.state.isOpen = true;
        dialog.showModal();
      });

      transition.finished.then(() => (this.state.isAnimating = false));
    }, 0);
  }

  onRender() {
    console.log("rendering");
  }

  onDestroy() {
    this.state.controller.abort();
  }
}
