export default function FormInput(props: any)
{

    const
        {
            validation,
            invalid = "false",
            dirty = "false",
            onTurnDirty,
            ...inputProps
        } = props;

    function handleBlur()
    {
        onTurnDirty(props.name);
    }

    return (
        <input
            onBlur={handleBlur}
            {...inputProps}
            data-invalid={invalid}
            data-dirty={dirty}
        />
    );

}