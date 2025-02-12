import { tick } from "../../utils/tick";

const images = [
  "/image-1.avif",
  "/image-2.avif",
  "/image-3.avif",
  "/image-4.avif",
];

export default class Lightbox {
  onCreate() {
    this.state = {
      images: images,
      activeIndex: null,
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
      async (e) => {
        e.preventDefault();
        this.state.isAnimating = true;

        await tick();

        const transition = document.startViewTransition(() => {
          this.state.isOpen = false;
          requestAnimationFrame(() => dialog.close());
        });

        transition.finished.then(() => (this.state.isAnimating = false));
      },
      { signal }
    );
  }

  async toggleModal() {
    const dialog = this.getEl("lightbox");
    this.state.isAnimating = true;

    await tick();

    const transition = document.startViewTransition(() => {
      this.state.isOpen = true;
      dialog.showModal();
    });

    transition.finished.then(() => (this.state.isAnimating = false));
  }

  onRender() {
    console.log("rendering");
  }

  onDestroy() {
    this.state.controller.abort();
  }
}
