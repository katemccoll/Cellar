import React from "react";
import AddWine from "../components/AddWine/AddWine";
import Auth from "../utils/auth";
// import ErrorPage from "../components/ErrorPage/ErrorPage";

const FormWine = () => {
    return (
        <div>
            {Auth.loggedIn() ? (
            <>
                <div className="image-wine-glasses">
                    <div className="padding-top">
                        <h1>
                            Add Wine
                        </h1>
                    </div>
                </div>
                <AddWine/>
            </>
            ) : (
                <p>Looks Like you need to log in</p>
            // <ErrorPage />
            )}
        </div>
    )
};

export default FormWine;