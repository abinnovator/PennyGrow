import React from 'react'
import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"
import { authFormSchema } from '@/lib/utils'
const formSchema = authFormSchema('sign-up');
interface CustomInterface{
    control?: Control<z.infer<typeof formSchema>>,
    placeholder: string;
    name: FieldPath<z.infer<typeof formSchema>>,
    label?: string;
}
const CustomInput = ({control, name,label,placeholder}: CustomInterface) => {
    return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>
                    {label}
                </FormLabel> 
                <div className='flex w-full flex-col'>
                    <FormControl>
                        <Input placeholder={placeholder} className='input-class'{...field} type={name==='password' ? 'password': 'text'}/>
                    </FormControl>
                    <FormMessage className='form-message mt-2' />
                </div> 
            </div>
            )}
    />
  )
}

export default CustomInput