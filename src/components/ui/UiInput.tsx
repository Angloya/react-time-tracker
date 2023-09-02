interface UiInputProps {
    name: string
    placeholder?: string
    label?: string
    type?: string
    value: string | number
    changeEvent: (e?: React.ChangeEvent<HTMLInputElement>) => void
}

export default function UiInput({ name, placeholder='Type...', label, type='text', value, changeEvent }: UiInputProps): JSX.Element {
    return (
        <div>
            {
                label  && 
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
                    {label}
                </label>
            }
            <input onChange={changeEvent} value={value} type={type} name={name} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
    );
}