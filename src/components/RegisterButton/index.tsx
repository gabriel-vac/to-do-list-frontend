import React from 'react';

interface IRegisterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

function RegisterButton({ title }: IRegisterButtonProps) {
  return (
    <button
      className="mt-3 bg-primary/70 px-2 py-2 md:px-4 md:py-2 md:text-md rounded-full hover:bg-primary/30 active:scale-95 transition duration-200 ease-out font-semibold text-white"
      type="button"
    >
      {title}
    </button>
  );
}

export default RegisterButton;
