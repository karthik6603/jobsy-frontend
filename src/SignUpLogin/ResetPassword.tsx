import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons-react";
import { useState } from "react";
import { changePassword, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { errorNotification, successNotification } from "../Services/NotoficationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props:any) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [passErr, setPassErr] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [otpSending, setOtpSending] = useState(false)
    const [verified, setverified] = useState(false)
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const interval = useInterval(()=>{
        if(seconds===0){
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        }else setSeconds((s)=> s - 1)
    },1000);

    const handleSendOtp = ()=>{
        setOtpSending(true);
        sendOtp(email).then((res)=>{
            console.log(res);
            successNotification("OTP sent successfully", "Enter OTP to reset.")
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start()
        }).catch((err)=>{
            console.log(err);
            setOtpSending(false);
            errorNotification("OTP sending Failed", err.response.data.errrorMessage);
        })
    }

    const handleVerifyOTP = (otp:string) =>{
        verifyOtp(email, otp).then((res)=>{
            console.log(res);
            successNotification("OTP Verified", "Enter new Password.")
            setverified(true);
            // setResendLoader(true);   
        }).catch((err)=>{
            console.log(err);
            errorNotification("OTP Verification Failed", err.response.data.errrorMessage)
        })
    }

    const resendOtp = () =>{
        if(resendLoader)return
        handleSendOtp();
    }

    const changeEmail = () =>{
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setverified(false);
        interval.stop();
    }

    const handleResetPassword = ()=>{
        changePassword(email, password).then((res)=>{
            console.log(res);
            successNotification("password Changed", "Login with the new Password.")
            props.close();
        }).catch((err)=>{
            console.log(err);
            errorNotification("Password reset Failed", err.response.data.errrorMessage)
        })
    }

    return(
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div className="flex flex-col gap-6">
                <TextInput value={email} onChange={(e)=>setEmail(e.target.value)} 
                    leftSection={<IconMail size={16}/> } 
                    label="Email" 
                    withAsterisk
                    placeholder="Your Email"
                    rightSection={<Button size="xs" className="mr-1" loading={otpSending && !otpSent} onClick={handleSendOtp}  variant="filled" disabled={email==="" || otpSent} >Login</Button>}
                    rightSectionWidth="xl"
                    />
                {
                    otpSent && <PinInput onComplete={handleVerifyOTP} length={6} className="mx-auto" size="md" gap="lg" type="number" />
                }
                
                {
                    otpSent && !verified &&
                    <div className="flex gap-2">
                        <Button fullWidth color="bright-sun.4" loading={otpSending} onClick={resendOtp}  variant="light" >{resendLoader?seconds:"Resend"}</Button>
                        <Button fullWidth color="bright-sun.4" onClick={changeEmail}  variant="filled" >Change Email</Button>
                    </div>
                }
                {verified && (
                  <PasswordInput
                    value={password}
                    error={passErr}
                    name="password"
                    onChange={(e)=>{setPassword(e.target.value); setPassErr(signupValidation("password", e.target.value))}}
                    leftSection={<IconLock size={16} />}
                    label="Password"
                    withAsterisk
                    placeholder="Password"
                  />
                )}
                {
                    verified && <Button onClick={handleResetPassword}  variant="filled" >Change Password</Button>
                }

            </div>
        </Modal>
    )
}
export default ResetPassword;