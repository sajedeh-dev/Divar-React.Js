import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import {setCookie} from "utils/cookie";
import styles from "./CheckOtpForm.module.css";


function CheckOtpForm({ code, setCode, setStep, mobile }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);

  const submitHandler = async (event) =>{
    event.preventDefault()
    
    if(code.length !==5 ) return;

    const {response ,error} = await checkOtp(mobile, code);
    // console.log({ response, error });

    if(response){
      setCookie(response.data);
      navigate("/");
      refetch();
      console.log(response);
    }
    if(error)  console.log(error.response.data.message);
   
    
  }
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span>را وارد کنید*{mobile}*کد پیامک شده به شماره </span>
      <label htmlFor="input">کد تایید را وارد کنید </label>
      <input type="text"
        id="input"
        placeholder="کدتایید"
        value={code}
        onChange={(e) => setCode(e.target.value)} />

        <button type="submit">ورود</button>
        <button onClick={() => setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>

    </form>
  )
}
export default  CheckOtpForm