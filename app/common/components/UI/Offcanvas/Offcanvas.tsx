import type { FC, ReactNode } from "react";
import { classNames } from "@/common/utils/class-names";

type OffCanvasProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const OffCanvas: FC<OffCanvasProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/30 z-40" />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 w-100 h-full bg-white shadow-lg p-6 flex flex-col overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={classNames(
            "flex  items-center mb-4",
            title ? "justify-between" : "justify-end"
          )}
        >
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        {children}
      </aside>
    </>
  );
};

export default OffCanvas;
