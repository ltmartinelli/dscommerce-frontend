import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
    id: number,
    message: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onDialogAnswer: Function,

}

export default function DialogConfirmation({ message, onDialogAnswer, id }: Props)
{
    return (
        <div onClick={() => onDialogAnswer(false, id)} className="dsc-dialog-bg">
            <div onClick={(e) => e.stopPropagation()} className="dsc-dialog-box">
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container">
                    <div onClick={() => onDialogAnswer(false, id)} >
                        <ButtonInverse text="Não" />
                    </div>
                    <div onClick={() => onDialogAnswer(true, id)}>
                        <ButtonPrimary text="Sim" />
                    </div>
                </div>
            </div>
        </div>
    )
}