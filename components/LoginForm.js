import { useNavigation } from '@react-navigation/native';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Card, Input, Button, } from '@rneui/themed';
import { useState } from 'react';




export default function LoginForm({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignup = () => {
        auth
            .createUserwithEmailandPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email)
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
            .createUserwithEmailandPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email)
            })
            .catch(error => alert(error.message))
    }


    return (
        <>
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }} >
                <Card>
                    <Card.Title style={{ fontSize: '30px' }}>CARPORT</Card.Title>
                    <Card.Divider />
                    <Text>Email</Text>
                    <Input placeholder="Email" secureTextEntry={false}
                        value={email}
                        onChangeText={text => setEmail(text)} />
                    <Text>Password</Text>
                    <Input placeholder="Password" secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)} />
                    <Button
                        title="Log in"
                        loading={false}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            backgroundColor: 'rgba(111, 202, 186, 1)',
                            borderRadius: 5,
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                        containerStyle={{
                            marginHorizontal: 50,
                            height: 50,
                            width: 200,
                            marginVertical: 10,
                        }}
                        onPress={handleLogin}
                    />
                    <Card.Title onPress={() => console.log('Forget Password!')}> Forgot Password? </Card.Title>
                    <Card.Divider />
                    <Text style={{ textAlign: 'center' }}>Need an account? <Text onPress={() => navigation.push('SignupForm')} style={{ color: 'red' }}>SIGN UP</Text></Text>
                </Card>
            </View >

        </>
    );
}