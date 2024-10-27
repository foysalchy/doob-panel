import Swal from 'sweetalert2';

const showAlert = (title, text = "", icon = "success", timer = 2000) => {
      Swal.fire({
            title,
            text,
            icon,
            timer,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
            toast: true,
            customClass: {
                  container: 'swal2-container-top-end'
            }
      });
};

export default showAlert;
