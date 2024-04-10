import React, { useState, useEffect } from 'react';

export const OtherDataComp = (props) => {

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        async function getData() {
            if (props.userData.address) {
                setStreet(props.userData.address.street || '');
                setCity(props.userData.address.city || '');
                setZip(props.userData.address.zipcode || '');
            } else {
                setStreet('');
                setCity('');
                setZip('');
            }
        }
        getData();
    }, [props.userData.address]);

    return (
        <div style={{ width: "250px", border: "solid 2px black", borderRadius: "10px", margin: "10px", padding: "6px", background: "#f2f2f2" }}>
            Street: <input type='text' defaultValue={street} /><br />
            City: <input type='text' defaultValue={city} /><br />
            Zip Code: <input type='text' defaultValue={zip} />
        </div>
    )
}

export default OtherDataComp;
