import { Fragment, useState } from "react";
import { useForm } from "../hooks/hooks";
import { useHistory, Prompt } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { LOGIN_USER } from "../utils/graphql";

const Login = (props) => {
    const history = useHistory();
    const dispatchFn = useDispatch();
    const [errors, setErrors] = useState({});

    const {
        onChange: onChangeHandler,
        onSubmit: onSubmitHandler,
        setFormFocus,
        formFocus,
        values,
    } = useForm(login, {
        username: "",
        password: "",
    });

    const loginHandler = (userData) => {
        dispatchFn(authActions.login(userData));
    };

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            loginHandler(userData);
            history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0]?.extensions.errors);
        },
        variables: values,
    });

    function login() {
        loginUser();
    }

    return (
        <Fragment>
            <div className="form-container">
                <Form
                    onFocus={() => setFormFocus(true)}
                    onSubmit={onSubmitHandler}
                    noValidate
                    className={loading ? "loading" : ""}
                >
                    <h1>Login</h1>
                    <Form.Input
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        type="text"
                        error={errors?.username ? true : false}
                        value={values.username}
                        onChange={onChangeHandler}
                    />

                    <Form.Input
                        label="Password"
                        type="password"
                        placeholder="Password..."
                        name="password"
                        error={errors.password ? true : false}
                        value={values.password}
                        onChange={onChangeHandler}
                    />

                    <Button
                        onClick={() => setFormFocus(false)}
                        type="submit"
                        primary
                    >
                        Login
                    </Button>
                </Form>

                {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Prompt
                when={formFocus}
                message="Are you sure want to leave? All your data will be lost!"
            />
        </Fragment>
    );
};

export default Login;
