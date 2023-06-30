import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


function BMImodal(props) {

    const [selectedValue, setSelectedValue] = useState('metric');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [status, setStatus] = useState('');


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    }
    

    //     {/* // Underweight = <18.5
    // // Normal weight = 18.5–24.9
    // // Overweight = 25–29.9
    // // Obesity = BMI of 30 or greater */}



    const handleCalculate = () =>{
        if (selectedValue === 'metric'){
            const meter = eval(height/100);
            console.log(meter);
            const result = eval(weight / Math.pow(meter,2));
            console.log(result);
            setBmi(result);
            if (bmi <= 18.5){
                setStatus("Underweight");
            } else if (bmi > 18.5 && bmi <= 24.9){
                setStatus("Normal Weight");
            } else if (bmi > 25 && bmi < 29.9){
                setStatus("Overweight");
            } else if (30 <= bmi){
                setStatus("Obesity");
            }
        } else{
            console.log(selectedValue);
            const inch = eval(height*12);
            // const pound = eval(weight / 2.20462);
            console.log(weight);
            console.log(inch);
            const result = eval((weight / Math.pow(inch,2)) * 703);
            console.log(result);
            setBmi(result);
            if (bmi <= 18.5){
                setStatus("Underweight");
            } else if (bmi > 18.5 && bmi <= 24.9){
                setStatus("Normal Weight");
            } else if (bmi > 25 && bmi < 29.9){
                setStatus("Overweight");
            } else if (30 <= bmi){
                setStatus("Obesity");
            }
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>Calculate your Body Mass Index (BMI)</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>

                    <div class="form-floating">
                        <input type="number" class="form-control top" name="weight" placeholder="first" value = {weight} onChange={(e) => setWeight(e.target.value)}/>
                        <label for="floatingInput">Weight</label>
                    </div>

                    <div class="form-floating">
                        <input type="number" class="form-control middle" name="height" placeholder="last" value = {height} onChange={(e) => setHeight(e.target.value)} />
                        <label for="floatingInput">Height</label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-3">
                        <div className="d-flex align-items-center me-4">
                            <input type="radio" value="metric" name="gender" className="me-2" checked="checked" onChange={handleChange} />
                            <span>Metric: (Centimeters / Killogram)</span>
                        </div>

                        <div className="d-flex align-items-center">
                            <input type="radio" value="imperial" name="gender" className="me-2"  onChange={handleChange}  />
                            <span>Imperial: (Feet / Pounds)</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <button type="submit"
                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100" onClick={handleCalculate}>Calculate</button>
                    </div>
                </form>
    {/* // Underweight = <18.5
    // Normal weight = 18.5–24.9
    // Overweight = 25–29.9
    // Obesity = BMI of 30 or greater */}

                <hr />
                <p>result: {bmi}</p>
                <p>you are {status}</p>


            </Modal.Body>
        </Modal>
    );
}

export default BMImodal;