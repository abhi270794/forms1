import React from 'react';
import {Form1 } from './Form1';
import { fireEvent, render,screen} from '@testing-library/react';
import { waitFor } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect';

// it("should call api",async()=>{
//     render(<Form1/>)
//     // global.fetch = jest.fn(()=>
//     // Promise.resolve({json: ()=> Promise.resolve({message:"LoggedIn"})}))
//     const mock = jest.spyOn(global,"fetch")
//     mock.mockImplementation(()=>Promise.resolve({json: ()=> Promise.resolve({message:"LoggedIn"})}))
//     const emailElement = screen.getByTestId('email');
//     const passwordElement = screen.getByTestId('password');
//     await fireEvent.change(emailElement,{target:{value:'kuchbhi@gmail.com'}});
//     await fireEvent.change(passwordElement,{target:{value:"kuchBhi123@"}});
//     const loginBtn = screen.getByTestId('input');
    
//     await fireEvent.click(loginBtn);
//     await waitFor(()=> expect(mock).toBeCalledTimes(1));
//     screen.debug();
// })
describe("it should make an mocked api call",()=>{
    it("it should make a api call",async()=>{
        render(<Form1/>)
       
  
        const mock = jest.spyOn(global,"fetch");
        mock.mockImplementation(()=>Promise.resolve({json: ()=> Promise.resolve({message: "LoggedIn"})}))
        const email = screen.getByTestId("email");
        const password = screen.getByTestId("password");
        const submit = screen.getByTestId("input");
        await fireEvent.change(email, {target:{value: "kuchhBhi123@gmail.com"}})
        await fireEvent.change(password,{target:{value: "Meenakshi1@"}})
        await fireEvent.click(submit);
        await waitFor(()=> expect(mock).toBeCalledTimes(1));
        screen.debug();
    
    })
})