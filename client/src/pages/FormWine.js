import React from "react";
import AddWine from "../components/WineForm/AddWine";
// import AdvanceEntry from "../components/WineForm/AdvanceEntry";
import Auth from "../utils/auth";

const FormWine = () => {

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <AddWine/>
                </>
                ) : (
                <p>
                You Need to be logged in to use this amazing app.
                </p>
                )}
        </div>
    )
}

export default FormWine;