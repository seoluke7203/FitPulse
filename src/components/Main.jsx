import React, { useState, useEffect } from 'react';

function Main() {

    const query = new URLSearchParams(window.location.search);
    const fName = query.get('fName');
    const lName = query.get('lName');
    const email = query.get('email');
    console.log(fName, lName);

    return (
        <div> Welcome, {fName} {lName}!!
            <form method="POST">
                <input type="hidden" name="id" value={email}></input>



                <div class="form-floating">
                    <input type="text" class="form-control top" name="weight" placeholder="first" />
                    <label for="floatingInput">your weight</label>
                </div>

                <div class="d-flex justify-content-center align-items-center card-body">
                    <button type="submit" id="btn-register"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100">Save</button>
                </div>


            </form>
        </div>
    )
}
export default Main;