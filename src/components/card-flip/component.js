import { tick } from "../../utils/tick";

const DURATION = 350;
const DELAY = 2000;

export default class CardFlip {
  onCreate() {
    this.state = {
      images: [
        "/image-1.avif",
        "/image-2.avif",
        "/image-3.avif",
        "/image-4.avif",
      ],
      activeImage: 0,
      timeout: null,
    };
  }

  onMount() {
    const target = this.getEl("content");

    // Exit animation definition
    const flipOutKeys = [
      { transform: "rotateY(0deg)" },
      { transform: "rotateY(90deg)" },
    ];

    const flipOutOpts = {
      duration: DURATION,
      easing: "cubic-bezier(.8,-0.6,.95,.65)",
    };

    const keyframeEffectOut = new KeyframeEffect(
      target,
      flipOutKeys,
      flipOutOpts
    );
    const animationOut = new Animation(keyframeEffectOut);

    // Entrance animation definition
    const flipInKeys = [
      { transform: "rotateY(-90deg)" },
      { transform: "rotateY(0deg)" },
    ];

    const flipInOpts = {
      duration: DURATION,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    };

    const keyframeEffectIn = new KeyframeEffect(target, flipInKeys, flipInOpts);
    const animationIn = new Animation(keyframeEffectIn);

    // Animation callbacks
    const handlePlay = () => {
      this.state.timeout = setTimeout(() => {
        requestAnimationFrame(() => loop());
      }, DELAY);
    };

    const loop = () => {
      animationOut.play();
      animationOut.finished.then(() => {
        this.state.activeImage =
          (this.state.activeImage + 1) % this.state.images.length;
        animationIn.play();
        animationIn.finished.then(handlePlay);
      });
    };

    handlePlay();
  }

  onDestroy() {
    if (this.state.timeout) clearTimeout(this.state.timeout);
  }
}
