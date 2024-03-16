import React, {useState} from 'react';
import FormSection from "../shared/FormSection";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import "../../styles/pages/LoginSignUp.css";
import Login from "../api/Login";
import ErrorMessage from '../shared/ErrorMessage';
import LoadingMessage from '../shared/LoadingMessage';
import ForgotPassword from './ForgotPassword';
import Header from "../shared/Header";

const LoginSignUp = ({setUserId}) => {
	const [loginEmail, setLoginEmail] = useState('');
	const [emailFieldColor, setEmailFieldColor] = useState('gray');
	const [loginPassword, setLoginPassword] = useState('');
	const [PasswordFieldColor, setPasswordFieldColor] = useState('gray');
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [loginTempEmail, setLoginTempEmail] = useState('');

    const [showLoadingMessage, setShowLoadingMessage] = useState(false); 

	const handleLoginEmail = (e) => {
        setLoginTempEmail(e.target.value);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailRegex.test(e.target.value)) {
			console.log(e.target.value);
			setLoginEmail(e.target.value);
			setEmailFieldColor('gray')
		} else {
			console.log('Empty');
			setLoginEmail('');
			setEmailFieldColor('red')
		}
    };

	const handleLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    };

	const handleShowForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);

    };

	return (
		<div>
		<Header></Header>
		<div className="relative z-50">
			{showErrorMessage && (
				<ErrorMessage
					setShowErrorMessage={setShowErrorMessage}
					message={errorMessage}
				/>
			)}
			{showLoadingMessage && (
				<LoadingMessage
					message={"Loading"}
				/>
			)}
			{showForgotPassword && (
				<ForgotPassword
					handleShowForgotPassword={handleShowForgotPassword}
				/>
			)}
		</div>
		<div class="min-h-screen bg-indigo-500">
			<h6 class="mb-0 pb-3 text-l font-bold"><span class="mr-5">Log In </span><span>Sign Up</span></h6>
			
				
			<input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			<label for="reg-log"></label>
			<div class="card-3d-wrap mx-auto">
				<div class="card-3d-wrapper">
					{/* Login page */}
					<div class="card-front">
						<div class="center-wrap">
						<div className="grid grid-cols-1 gap-4 mb-4">
						
						<h1 class="mb-0 pb-3 text-xl text-left font-bold text-indigo-500">Welcome Back</h1>
						<FormSection col="1">
							<FormLabel
								label={"Email"}
							/>
							<FormInput
								id = {"loginEmail"}
								placeholder = {"Email"}
								type = {"text"}
								value={loginTempEmail}
								onChange={handleLoginEmail}
								fieldColour = {emailFieldColor}
							/>
						</FormSection>
						<FormSection col="1">
							<FormLabel
								label={"Password"}
							/>
							<FormInput
								id = {"loginPassword"}
								placeholder = {"Password"}
								type = {"password"}
								value={loginPassword}
								onChange={handleLoginPassword}
								fieldColour = {PasswordFieldColor}
							/>
						</FormSection>
						<FormSection col="1">
						<div className="text-indigo-600 underline" onClick={handleShowForgotPassword}>
							<FormLabel label={"Forgot password?"} />
						</div>
						</FormSection>
						
						<Login class="min-h-screen bg-indigo-600"
							email = {loginEmail}
							password = {loginPassword}
							setShowErrorMessage = {setShowErrorMessage}
							setShowLoadingMessage = {setShowLoadingMessage}
							setErrorMessage = {setErrorMessage}
							setUserId = {setUserId}
						/>
						
						</div>

						</div>
					</div>
					{/* Sign Up page */}
					<div class="card-back">
						<div class="center-wrap">
							<h4 class="mb-3 pb-3">Sign Up</h4>
								
						</div>
					</div>
				</div>
			</div>  	
		</div>
	</div>
	);
};

export default LoginSignUp;
    