const Card = {
  baseStyle: {
    p: "22px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: "white",
    backgroundClip: "border-box",
    borderRadius: "20px",
  },
  variants: {
    panel: {
      bg: "white",
      width: "100%",
      boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)",
      borderRadius: "30px",
    },
  },
  defaultProps: {
    variant: "panel",
  },
};

export default Card; 