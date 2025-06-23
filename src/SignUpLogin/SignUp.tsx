import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconMail, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isConditionalExpression } from "typescript";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { errorNotification, successNotification } from "../Services/NotoficationService";



const SignUp = () =>{

    const form = {
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType:"APPLICANT"
    
    }
    
    const [data, setData] = useState<{[key:string]:string}>(form);
    const [formError, setFormError] = useState<{[key:string]:string}>(form);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange=(event:any)=>{

        if(typeof(event)=="string"){
            setData({...data, accountType:event});
            return;
        }
        let name = event.target.name, value = event.target.value;
        setData({...data, [name]:value});
        setFormError({...formError, [name]:signupValidation(name, value)})
        if(name === "password" && data.confirmPassword!==""){
            let err="";
            if(data.confirmPassword!=value) err="Passwords donot match.";
            setFormError({...formError, [name]:signupValidation(name, value), confirmPassword:err})
        }
        if(name == "confirmPassword"){
            if(data.password != value) setFormError({...formError, [name]:"Passwords donot match."})
            else setFormError({...formError, confirmPassword:""})
        }
    }
    const handleSubmit = () =>{
        
        let valid = true, newFormError:{[key:string]:string}={};
        for(let key in data){
            if(key=="accountType")continue;
            if(key!=="confirmPassword") newFormError[key] = signupValidation(key, data[key]);
            else if(data[key]!=data["password"])newFormError[key]="passwords donot match."
            if(newFormError[key])valid= false;
        }
        setFormError(newFormError);
        
        if(valid===true){ 
            setLoading(true); 
            registerUser(data).then((res)=>{
                console.log(res);
                setData(form);
                successNotification('Registered Successfully','Redirecting to login page...')
                  setTimeout(()=>{
                    setLoading(false);
                    navigate("/login");
                  }, 4000)
                
            }).catch((err)=>{
                setLoading(false);
                console.log(err);
                errorNotification('Registeration faliled',err.response.data.errrorMessage)
            })
        }
    }

    return(<>
        <LoadingOverlay
            visible={loading}
            zIndex={1000}
            className="translate-x-1/2"
            overlayProps={{radius:'sm', blur:2}}
            loaderProps={{color:'bright-sun.4', type:'bars'}}
        />
        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">Create Account</div>
            <TextInput  
              value={data.name}
              error={formError.name}
              name="name"
              onChange={handleChange}
              label="Full Name" 
              placeholder="Your Name"
              withAsterisk
            />        
            <TextInput  
              value={data.email}
              error={formError.email}
              name="email"
              onChange={handleChange}
              leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />} 
              label="Email" 
              placeholder="Your email"
              withAsterisk
            />   
            <PasswordInput  
              value={data.password}
              error={formError.password}
              name="password"
              onChange={handleChange}
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                label="Password" 
                placeholder="Password"
                withAsterisk
            />     
            <PasswordInput  
              value={data.confirmPassword}
              name="confirmPassword"
              error={formError.confirmPassword}
              onChange={handleChange}
                leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                label="Confirm Password" 
                placeholder="Confirm Password"
                withAsterisk
            />  
            <Radio.Group
                value={data.accountType}
                
              onChange={handleChange}
                label="You are?"
                withAsterisk
                >
                <Group mt="xs">
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"  value="APPLICANT" label="Applicant" />
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"   value="EMPLOYER" label="Employer" />
                </Group>
            </Radio.Group>
            <Checkbox
                label={<>I accept{` `}<Anchor>terms and Conditions.</Anchor>  </>}
                
            />
            <Button loading={loading} onClick={handleSubmit} variant="filled" >SignUp</Button>
            <div className="mx-auto">have an Account? <span onClick={()=>{navigate("/login"); setFormError(form); setData(form)}} className="text-bright-sun-400 hover:underline cursor-pointer">Login</span></div>
            </div>
            </>
    )
}
export default SignUp;