import { useState } from 'react';
import SaveProjectPopup from '@/components/Popup/components/SaveProjectPopup';

interface SaveButtonProps {
    onSave: () => void;
}

export default function SaveButton({ onSave }: SaveButtonProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSaveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmSave = () => {
        onSave();
        setIsPopupOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleSaveClick}
                className="text-sm bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded">
                Salvar
            </button>
            <SaveProjectPopup isOpen={isPopupOpen} onClose={handleClosePopup} onConfirm={handleConfirmSave} />
        </>
    );
}
