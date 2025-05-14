import Popup from "../..";
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
export default function SaveProjectPopup({ isOpen, onClose, onConfirm }: Props) {
    return (
        <Popup isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} color={"bg-emerald-600 hover:bg-emerald-800 focus:ring-emerald-300"}>
            Tem certeza que deseja salvar este projeto? Todas as informações antigas serão perdidas.
        </Popup>
    );
}
