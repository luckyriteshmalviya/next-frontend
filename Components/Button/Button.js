function Button({ active = true, nameone, isCommmon = false, ...props }) {
  return (
    <div
      className={` ${
        isCommmon ? "button-component" : "button-component-parent"
      }`}
    >
      <div
        onClick={props.activeStateHandler}
        className={`select-button button ${active ? "next" : "prev"} ${
          props.width
        }`}
      >
        {nameone}
      </div>
    </div>
  );
}
export default Button;
