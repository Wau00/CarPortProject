import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { lightColors, Card, Input, Button, SocialIcon, SocialIconProps } from '@rneui/themed';


export default function LoginForm({ switchForm }) {

    return (
        <>
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }} >
                <Card>
                    <Card.Title style={{ fontSize: '30px' }}>CARPORT</Card.Title>
                    <Card.Divider />
                    <Text>Email</Text>
                    <Input placeholder="Email" secureTextEntry={false} />
                    <Text>Password</Text>
                    <Input placeholder="Password" secureTextEntry={true} />
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
                        onPress={() => console.log('Hello There!')}
                    />
                    <Card.Title onPress={() => console.log('Forget Password!')}> Forgot Password? </Card.Title>
                    <Card.Divider />
                    <Text style={{ textAlign: 'center' }}>Need an account? <Text onPress={() => console.log('SignUp!')} style={{ color: 'red' }}>SIGN UP</Text></Text>
                </Card>
            </View >
        </>
    );
}