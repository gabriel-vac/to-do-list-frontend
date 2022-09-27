import sweetalert2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const swal = withReactContent(sweetalert2);

type T = {
  title: string;
  text?: string;
  html?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string | JSX.Element;
  confirmButtonText?: string | JSX.Element;
  deleteFunction: () => void;
};

export function useAlert() {
  return {
    success: ({ ...rest }: T) => {
      return swal.fire({
        ...rest,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonColor: '#69e469',
      });
    },
    error: ({ ...rest }: T) => {
      return swal.fire({
        ...rest,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: '#e70015',
      });
    },
    warning: ({ ...rest }: T) => {
      return swal.fire({
        ...rest,
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonColor: '#f9cd4a',
      });
    },
    confirm: ({ deleteFunction, ...rest }: T) => {
      return swal
        .fire({
          ...rest,
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonColor: '#3BB3BD',
          showCancelButton: true,
          cancelButtonColor: '#f9cd4a',
        })
        .then(result => {
          if (result.isConfirmed) {
            deleteFunction();
          }
        });
    },
  };
}
