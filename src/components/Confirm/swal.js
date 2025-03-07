import Swal from "sweetalert2";

export const swalConfirm = (yn, func) => {
  Swal.fire({
    icon: yn.icon, //"info",
    title: yn.title, // "저장"
    text: yn.description, //"로그아웃 하시겠습니까?",
    showCancelButton: true,
    confirmButtonText: yn.okBtn, // "확인",
    cancelButtonText: yn.cancelBtn, //"닫기",
    confirmButtonColor: "#F8623A",
    cancelButtonColor: "#fff",
  }).then((res) => {
    if (res.isConfirmed) {
      func();
    }
  });
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
