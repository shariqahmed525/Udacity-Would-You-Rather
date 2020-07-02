import Swal from 'sweetalert2';

export const FailedDialog = (
  title = "Error",
  msg = "Sorry, something went wrong! Please try again.",
  swalType = "error"
) => {
  Swal.fire(
    title,
    msg,
    swalType
  )
}