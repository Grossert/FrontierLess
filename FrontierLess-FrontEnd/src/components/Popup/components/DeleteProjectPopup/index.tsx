import Popup from "../..";
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
export default function DeleteProjectPopup({ isOpen, onClose, onConfirm }: Props) {
    return (
        <Popup isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} color={"bg-red-600 hover:bg-red-800 focus:ring-red-300"}>
            Tem certeza que deseja deletar este projeto? Todas as informações serão perdidas.
        </Popup>
    );
}
