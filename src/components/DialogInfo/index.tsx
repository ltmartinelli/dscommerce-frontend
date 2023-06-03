import ButtonPrimary from "../ButtonPrimary";

type Props = {
    message: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onDialogClose: Function,
}

export default function DialogInfo({ message, onDialogClose }: Props)
{
    return (
        <div onClick={() => onDialogClose()} className="dsc-dialog-bg">
            <div onClick={(e) => e.stopPropagation()} className="dsc-dialog-box">
                <h2>{message}</h2>
                <div onClick={() => onDialogClose()} className="dsc-dialog-btn-container">
                    <ButtonPrimary text="OK" />
                </div>
            </div>
        </div>
    )
}