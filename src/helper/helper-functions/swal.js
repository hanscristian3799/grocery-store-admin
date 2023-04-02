import Swal from "sweetalert2";

export const fireSwal = (
  {
    icon = "",
    text = "",
    showConfirmButton = false,
    timer = 0,
    willClose = () => {},
  },
  otherProps
) => {
  Swal.fire({
    position: "top-end",
    width: 300,
    icon: icon,
    text: text,
    showConfirmButton: showConfirmButton,
    timer: timer,
    willClose,
    ...otherProps,
  });
};

export const closeSwal = () => {
  Swal.close();
};
