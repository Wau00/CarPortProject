import React from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { lightColors, Card, Input, Button, SocialIcon, SocialIconProps } from '@rneui/themed';
import { Formik, Field, Form } from 'formik';


export default function SignupForm({ switchForm }) {


    return (
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(props) => (
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                        <Card>
                            <Card.Title style={{ fontSize: '30px' }}>CARPORT</Card.Title>
                            <Card.Divider />
                            <Text>First Name</Text>
                            <Input placeholder="First Name"
                                secureTextEntry={false}
                                onChangeText={props.handleChange('firstName')}
                                value={props.values.firstName}
                            />
                            <Text>Last Name</Text>
                            <Input placeholder="Last Name" secureTextEntry={false}
                                onChangeText={props.handleChange('lastName')}
                                value={props.values.lastName}
                            />
                            <Text>Email</Text>
                            <Input placeholder="Email" secureTextEntry={false}
                                onChangeText={props.handleChange('email')}
                                value={props.values.email} />
                            <Text>Password</Text>
                            <Input placeholder="Password" secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password} />
                            <Text>Repeat Password</Text>
                            <Input placeholder="Repeat Password" secureTextEntry={true} />
                            <Button
                                title="Sign Up"
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
                                onPress={props.handleSubmit}
                            />

                            <Card.Divider />
                            <Text style={{ textAlign: 'center' }}>Already have an account? <Text onPress={() => console.log('SignUp!')} style={{ color: 'red' }}>LOG IN</Text></Text>
                        </Card>
                    </View>
                )}
            </Formik>
        </>
    );
}