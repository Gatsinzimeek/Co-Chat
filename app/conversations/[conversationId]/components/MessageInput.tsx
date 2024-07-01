import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors
  required: boolean
}

const MessageInput: React.FC<MessageInputProps> = ({required,placeholder,id,type,register,errors}) => {
  return (
    <div className="relative w-full">
        <input id={id} type={type} required autoComplete={id} placeholder={placeholder} {...register(id, {required})} className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"/>
    </div>
  )
}

export default MessageInput
