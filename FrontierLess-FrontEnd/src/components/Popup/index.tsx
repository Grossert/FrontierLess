interface Props {
    children: React.ReactNode
    isOpen: boolean;
    color?: string
    onClose: () => void;
    onConfirm: () => void;
}

export default function Popup({ isOpen, onClose, onConfirm, color, children }: Props) {
    if (!isOpen) return null; // Não renderiza se não estiver aberto

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {children}
                        </h3>
                        <button
                            onClick={onConfirm}
                            type="button"
                            className={`text-white ${color}focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
                            Sim, tenho certeza
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none">
                            Não, cancele
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
