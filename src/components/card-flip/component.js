const DURATION = 350;
const DELAY = 3000;

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
      easing: "ease-in",
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
      easing: "ease-out",
    };

    const keyframeEffectIn = new KeyframeEffect(target, flipInKeys, flipInOpts);
    const animationIn = new Animation(keyframeEffectIn);

    // Animation callback
    const handlePlay = () => {
      animationOut.play();
      animationOut.finished.then(() => {
        this.state.activeImage =
          (this.state.activeImage + 1) % this.state.images.length;
        animationIn.play();
        animationIn.finished.then(() => {
          this.state.timeout = setTimeout(() => {
            requestAnimationFrame(() => handlePlay());
          }, DELAY);
        });
      });
    };

    this.state.timeout = setTimeout(() => {
      requestAnimationFrame(() => handlePlay());
    }, DELAY);
  }

  onDestroy() {
    if (this.state.timeout) clearTimeout(this.state.timeout);
  }
}
