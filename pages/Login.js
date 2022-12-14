import React, { useState } from 'react';
import { View } from 'react-native';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

export default function Login() {

    const [loginComp, setLoginComp] = useState(true);

    const renderForm = () => {
        if (loginComp) {
            return <LoginForm switchForm={setLoginComp} />
        }
        else {
            return <SignupForm switchForm={setLoginComp} />
        }
    }

    return (
        <View>
            {renderForm()}
        </View>
    )
}