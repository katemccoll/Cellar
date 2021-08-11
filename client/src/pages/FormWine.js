import React from "react";
import AddWine from "../components/WineForm/AddWine";
// import AdvanceEntry from "../components/WineForm/AdvanceEntry";
import Auth from "../utils/auth";

const FormWine = () => {

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                <div className="image-wine-glasses">
                    <div className="padding-top">
                        <h1>Add Wine</h1>
                    </div>
                </div>
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