'use client'
import React, { useRef } from 'react'
import {motion,useInView, useMotionValue, useSpring, useTransform} from 'framer-motion'
export function Template({children,className}:{children: React.ReactNode,className?:string}) {
  return (
    <motion.div
        initial={{opacity: 0,y:40}}
        animate={{opacity: 1,y:0}}
        transition={{duration:0.5}}
        className={className}>
            {children}
        </motion.div>
  )
}

export function ScrollAnimation({children,className,initialOptions,animatedOptions}:{children:React.ReactNode,className?:string,initialOptions?:object,animatedOptions?:object}) {
  const ref=useRef(null)
  const isInView=useInView(ref,{once:true})
  return (
    <motion.div
        ref={ref}
        initial={{opacity: 0 ,...initialOptions}}
        animate={isInView ? {opacity: 1,...animatedOptions} : {opacity: 0,...initialOptions}}
        transition={{duration:1}}
        className={className}>
          {children}
        </motion.div>

  )
}

// ...existing code...

export function AnimatedCounter({ to,className,suffix}:{to:number,className?:string,suffix?:string}) {
  const from:number=0
  const duration:number=3
  const ref=useRef(null)
  const isInView=useInView(ref,{once:false})
  const count = useMotionValue(from);
  const spring = useSpring(count, {
    duration: duration * 1000,
    bounce: 0,
    damping: 35,
    stiffness: 100
  });

  const display = useTransform(spring, (latest) => 
    `${Math.round(latest).toLocaleString()}${suffix ? suffix : ''}`
  );

  React.useEffect(() => {
    if(isInView){

      count.set(from);
      requestAnimationFrame(()=>{

        count.set(to);
      })
    }else{
      count.set(from);
    }
  }, [isInView,count, from, to]);

  return (
    <motion.h1
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView?{ opacity: 1 }:{opacity:0}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.span>{display}</motion.span>
    </motion.h1>
  );
}