import Select from "react-select";

export default function FormSelect(props: any)
{

    const
        {
            className,
            validation,
            invalid = "false",
            dirty = "false",
            onTurnDirty,
            ...selectProps
        } = props;

    function handleBlur()
    {
        onTurnDirty(props.name);
    }

    return (
        <div
            data-invalid={invalid}
            data-dirty={dirty}
            className={className}
        >
            <Select
                onBlur={handleBlur}
                {...selectProps}
            />
        </div>


    );

}