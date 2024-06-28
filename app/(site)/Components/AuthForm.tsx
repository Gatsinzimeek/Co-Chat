'use client'

import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/Components/input/Input";
import Button from "@/app/Components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, SetLoading] = useState(false);
    
    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/users')
        }
    }, [session?.status, router])
    const  toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {
            setVariant('REGISTER')
        }else{
            setVariant('LOGIN')
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
         SetLoading(true);


         if(variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => {
                toast.success('User Registered Successfuly')
                signIn('credentials', data);
            }
            )
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {  
                SetLoading(false)
            })
         }

         if(variant === 'LOGIN') {
            signIn('credentials', {...data,redirect: false})
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Invalid crediantials');
                }
                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                    router.push('/users')
                }
            }).finally(() => SetLoading(false))
         }

    }
    const socialAction = (action:string) => {
        SetLoading(true);
        signIn(action, {redirect: false})
        .then((callback) => {
                if(callback?.error) {
                    toast.error('Invalid crediantials');
                }
                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                }
            }).finally(() => SetLoading(false))
     }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
            <form
                className="space-y-6" onSubmit={handleSubmit(onSubmit)}
                
            >
                {
                    variant === 'REGISTER' && (
                        <Input errors={errors} label="Name" register={register} disabled={isLoading} type="text" id="name"></Input>
                    )
                }
                <Input errors={errors} label="Email Address"  disabled={isLoading} register={register} type="email" id="email"></Input>
                <Input errors={errors} label="Password"  disabled={isLoading} register={register} type="password" id="password"></Input>
                <Button type="submit" fullWidth disabled={isLoading}>
                    {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                </Button>
               </form>
               <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                    or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
                    </div>
                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>
                            {variant === 'LOGIN' ? 'New to Messanger?': 'Already Have Account?'}

                        </div>
                        <div onClick={toggleVariant} className=" underline cursor-pointer ">
                            {
                                variant === 'LOGIN' ? 'Create an Account': 'Login'
                            }
                        </div>
                    </div>
               </div>
        </div>
    </div>
  )
}

export default AuthForm
