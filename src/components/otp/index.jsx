import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react'
import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast } from 'react-toastify';

function OPTChecker({ name }) {
    const [phone, setPhone] = useState("");
    const [appVerifier, setAppVerifier] = useState();
    const [code, setCode] = useState("");
    const [confirmationResult, setConfirmationResult] = useState();
    const [otpSuccess, setOtpSuccess] = useState(false);

    function convertToInternationalFormat(phoneNumber) {
        // Check if the input is a valid Vietnamese phone number (10 or 11 digits)
        const phonePattern = /^(0[3589]|84[3589])(\d{8,9})$/;

        if (!phonePattern.test(phoneNumber)) {
            // Invalid phone number, return as is
            return phoneNumber;
        }

        // Convert to international format
        if (phoneNumber.startsWith('0')) {
            // 10-digit number
            return '+84' + phoneNumber.slice(1);
        } else if (phoneNumber.startsWith('84')) {
            // 11-digit number
            return '+' + phoneNumber;
        }

        // Return the input as is if it doesn't match the expected formats
        return phoneNumber;
    }

    const sendOtp = () => {
        if (!appVerifier) {
            setAppVerifier(
                new RecaptchaVerifier(
                    "sign-in-button",
                    {
                        size: "invisible",
                        callback: (response) => {
                            // reCAPTCHA solved, allow signInWithPhoneNumber.
                            // onSignInSubmit();
                        },
                    },
                    auth
                )
            );
        }
        signInWithPhoneNumber(auth, convertToInternationalFormat(phone), appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                setConfirmationResult(confirmationResult);
                console.log("success");

                toast.success("OTP sent successfully!");
                // ...
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                console.log();
                toast.error(error.message);
            });
    };

    const verify = () => {
        confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(user);
                toast.success("OTP verified successfully!");
                setOtpSuccess(true);
                setConfirmationResult(null)
                // ...
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error);
                toast.error("OTP verified failed!");
            });
    };
    const validatePhoneNumber = (value) => {
        const phonePattern = /^(0[3589]|84[3589])(\d{8,9})$/;

        if (!phonePattern.test(value)) {
            return false;
        } else {
            return true;
        }
    };

    function checkOTP(rule, value, callback) {
        if (otpSuccess) {
            callback();
        } else {
            callback('Please verify your phone number!');
        }
    }

    return (
        <>
            <Form.Item rules={[{
                required: true,
                message: 'Please input your phone number!'
            }, {
                validator: checkOTP
            }]} label="Phone" name={name}>
                <Row gutter={[12, 12]} align={'middle'}>
                    <Col span={otpSuccess ? 24 : 18}>
                        <Input value={phone} onChange={(e) => {
                            setPhone(e.target.value);
                        }} />
                    </Col>

                    {
                        !otpSuccess && <Col span={6}>
                            <Button disabled={!validatePhoneNumber(phone)} onClick={() => {
                                sendOtp();
                            }}>Sent OTP</Button>
                        </Col>
                    }
                </Row>

                {
                    confirmationResult && <div style={{
                        marginTop: 20
                    }}>
                        <Row gutter={[12, 12]} align={'middle'}>
                            <Col span={18}>
                                <Input placeholder='OTP' onChange={(e) => {
                                    setCode(e.target.value);
                                }} />
                            </Col>

                            <Col span={6}>
                                <Button onClick={() => {
                                    verify();
                                }}>Verify</Button>
                            </Col>
                        </Row>
                    </div>
                }


            </Form.Item>
            <div id="sign-in-button" style={{ display: "none" }}></div>
        </>
    )
}

export default OPTChecker