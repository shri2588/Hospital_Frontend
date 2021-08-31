import React, { useState } from "react";
import UserForm from './UserForm';
function OtpVerify() {
    const HosTokenById = localStorage.getItem('hospitalIdByToken')
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [otpValid, setOtpValid] = useState(false);
    const [otpNotValid, setOtpNotValid] = useState();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    
  function fetchOtpData() {
    const requestOtpBody = {
      query: `
            query 
            {
                otpVerify(hospitalId:"${HosTokenById}",otp:"${otp.join("")}"){
                    _id
                    UserName
                    PatientName
                    UserContect
                    UserAadhar
                    otp
                  }
              }
            `
    };



    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestOtpBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        const fetchOtp = resData;
        if(resData.errors){
            setOtpNotValid('Otp is Not Valid or Expired!!!')
        }else{
            setOtpValid(true);
            console.log("OTP",fetchOtp)
        }

      })
      .catch(err => {
        console.log(err);
      });
  }
if(otpValid){
    return <UserForm />
}
    return (
        <div className="row">
        <div className="col text-center">
            <h2>Verify Patient's OTP</h2>
            <h4 style={{color:'red'}}>{otpNotValid}</h4>

            {otp.map((data, index) => {
                return (
                    <input
                        className="otp-field"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onFocus={e => e.target.select()}
                    />
                );
            })}

            <p>OTP Entered - {otp.join("")}</p>
            <p>
                <button
                    className="btn btn-secondary mr-2"
                    onClick={e => setOtp([...otp.map(v => "")])}
                >
                    Clear
                </button>
                <button
                    className="btn btn-primary"
                    onClick={e =>
                        {//alert("Entered OTP is " + otp.join(""))
                        fetchOtpData(e)}
                    }
                >
                    Verify OTP
                </button>
            </p>
        </div>
    </div>
    )
}

export default OtpVerify;