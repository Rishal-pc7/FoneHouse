"use client"

import { Button } from "@/components/ui/button"
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ScrollAnimation } from "../Template"
import { Success } from "./AfterSubmit"
import { useState } from "react"

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string()
  .min(8, {message:"Phone number is too short"})
  .max(15, {message:"Phone number is too long"})
  .regex(/^[0-9()+-\s]+$/, {message:"Invalid phone number"}),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }),
})
const forms=[
    {
        name:"fullname",
        label:"Full Name",
        placeholder:"Full Name",
        type:"text",
        key:"username",
    },
    {
        name:"email",
        label:"Email Address",
        placeholder:"Email Address",
        type:"email",
        key:"email",
    },
    {
        name:"phone",
        label:"Phone Number",
        placeholder:"Phone Number",
        type:"text",
        key:"phone",
    },
    {
        name:"message",
        label:"Message",
        placeholder:"Your Message",
        type:"text",
        key:"message",

    }

]
function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);
  async function onSubmit(values: z.infer<typeof formSchema>) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  
  const result = await response.json();
  if(result.success){
    setShowDialog(true);
    setError(null);
    form.reset();
  }else{
    setShowDialog(true)
    setError(result.error || "An error occurred. Please try again.");
  }
  console.log(result);
}
  
  return (
    <div className="p-10 md:p-20 max-w-3xl mx-auto">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {
            forms.map((f)=>(
              <ScrollAnimation key={f.key} initialOptions={{y:40}} animatedOptions={{y:0}}>
                <FormField
                 control={form.control}
                 name={f.name as keyof z.infer<typeof formSchema>}
                 render={({ field }) => (
                <FormItem>
                   <FormLabel className="font-semibold font-urbanist text-[#1C4177] text-lg">{f.label}</FormLabel>
                   <FormControl>
                       {f.name==="message" ? <Textarea key={f.key} placeholder={f.placeholder} {...field} /> :
                       <Input key={f.key+5555} placeholder={f.placeholder} type={f.type} {...field} />
                 }
                    </FormControl>
                    <FormMessage />
                </FormItem>
               )}/>
                </ScrollAnimation>


            ))
        }
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    <Success isOpen={showDialog} setIsOpen={setShowDialog} error={error}/> 
    </div>
  )
}
export default ContactForm