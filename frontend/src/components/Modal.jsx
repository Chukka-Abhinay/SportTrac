const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="fixed inset-0 bg-[#1e1e2f] opacity-70"></div>
          <div className="absolute bg-[#1e1e2f] p-4 rounded-lg z-10 text-right shadow-lg shadow-emerald-300">
            <button
              className="text-white font-semibold  focus:outline-none mr-2 cursor-pointer"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
