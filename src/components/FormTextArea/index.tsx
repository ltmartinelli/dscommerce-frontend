export default function FormTextArea(props: any)
{
    const
        {
            validation,
            invalid = "false",
            dirty = "false",
            onTurnDirty,
            ...textAreaProps
        } = props;

    function handleBlur()
    {
        onTurnDirty(props.name);
    }

    return (
        <textarea
            onBlur={handleBlur}
            {...textAreaProps}
            data-invalid={invalid}
            data-dirty={dirty}
        />
    );

}