'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addMoneyToUserBalance, getLoggedInUser, getUserInfo, signIn, signUp, signUp2 } from '@/lib/actions/user.actions';
import DonughtChart from './DonughtChart';
import { Router } from 'next/router';

// Define the schema using zod
const formSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least 1'),
});

// Define the TypeScript type for the form data
type FormData = z.infer<typeof formSchema>;

const AddDepositFloat: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await getLoggedInUser();
      setLoggedIn(loggedInUser);
      const userInfoData = await getUserInfo({ userId: loggedInUser.targets[0].userId });
      setUserInfo(userInfoData);
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    if (loggedIn) {
      console.log(data)
      addMoneyToUserBalance({ amount: data.amount, userId: loggedIn.targets[0].userId });
      // Redirect to the dashboard page
      router.push('/');
    }
  };

  return (
    <section className='total-balance'>
      <div className='total-balance-chart'>
        <DonughtChart />
      </div>
      <div className='flex flex-col gap-6'>
        <h2 className='header-2'></h2>
        <div className='flex flex-col gap-2'>
          <p className='total-balance-label'>
            Enter the money you want to add 😀 -
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(e.target.valueAsNumber)} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddDepositFloat;