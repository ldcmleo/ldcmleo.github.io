import { Easing, Tween } from "@tweenjs/tween.js";
import { forwardRef } from "react";

const UpButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const scroll = () => {
    const actualScroll = window.scrollY;
    const coords = {
      x: 0,
      y: actualScroll,
    };

    const tween = new Tween(coords)
      .to({ x: 0, y: 0 }, 1000)
      .easing(Easing.Quadratic.InOut)
      .onUpdate(() => {
        window.scrollTo(coords.x, coords.y);
      })
      .start();

    function animate(time: any) {
      tween.update(time);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  };

  return (
    <button
      onClick={scroll}
      className="absolute bg-zinc-300 dark:bg-zinc-600 px-3 py-2 rounded-sm left-0 transition-all ease-in"
      style={{
        zIndex: -1,
      }}
      ref={ref}
    >
      <i className="nf nf-fa-angles_up"></i>
    </button>
  );
});

export default UpButton;
