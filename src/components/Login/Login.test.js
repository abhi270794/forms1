import React from 'react';
import {Login} from './Login'
import {render,screen,fireEvent,debug, waitFor} from '@testing-library/react'
import mockAxios from 'jest-mock-axios';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});


describe('Login',()=>{
    it('should create a new Login',()=>{
      render(<Login/>);
      const signIn = screen.getByTestId("input");
      expect(signIn).toBeInTheDocument();
      screen.debug()
    })
    it('should render a input email and password',()=>{
    render(<Login/>);
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    screen.debug()
    })
    it('should render alert message on valid email and password',async()=>{
       
        render(<Login/>);
        const user={
          email: "abhishek1@gmail.com",
          passsword: "Meenakshisoni1@"
        }
      const mock = jest.spyOn(mockAxios,"post");
      mock.mockImplementation(()=> Promise.resolve({message: user }))
        const email = screen.getByTestId("email");
        const password = screen.getByTestId("password");
       await fireEvent.change(email,{target:{value: "abc@gmail.com"}})
       await fireEvent.change(password,{target:{value: "Meenaks11@"}})
        const signIn = screen.getByTestId("input");
      expect(signIn).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
       await fireEvent.click(signIn);
       await waitFor(()=> expect(mock).toBeCalledTimes(1));
       await screen.findByText("loginSuccessMessage")
        screen.debug();
    })
    })
    export default mockAxios;