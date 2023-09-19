import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { Provider } from "react-redux";
import { store } from "app/store";
import { BrowserRouter } from "react-router-dom";

test("username input should be rendered", () => {
    render(<Provider store={store}>
        <BrowserRouter>
            <LoginForm modaltypehandler={"login"} />
        </BrowserRouter>
    </Provider>);
    const userInputEl = screen.getByPlaceholderText(/Email/i);
    expect(userInputEl).toBeInTheDocument();
})
test("button is should be disabled", () => {
    render(<Provider store={store}>
        <BrowserRouter>
            <LoginForm modaltypehandler={"login"} />
        </BrowserRouter>
    </Provider>);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeEnabled();
})
test("Dont show error message", () => {
    render(<Provider store={store}>
        <BrowserRouter>
            <LoginForm modaltypehandler={"login"} />
        </BrowserRouter>
    </Provider>);
    const errorEl = screen.getByTestId("errormessage");
    expect(errorEl).not.toBeVisible();
})
test("Change the email field", () => {

   
        render(<Provider store={store}>
            <BrowserRouter>
                <LoginForm modaltypehandler={"login"} />
            </BrowserRouter>
        </Provider>);
    
    const emailEl = screen.getByPlaceholderText(/Email/i)
    const testValue = "test";
    fireEvent.change(emailEl, { target: { value: testValue}});
    const buttonEl = screen.getByRole("button");
    fireEvent.click(buttonEl)
   
    expect(emailEl).not.toHaveTextContent(/Please wait.../i)
    
})