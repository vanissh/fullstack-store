import React from 'react';
import { useSelector } from 'react-redux'
import DeviceCard from './DeviceCard';

const DeviceList = () => {

    const {devices} = useSelector(state => state.deviceReducer)

    return (
        <>
        {devices && devices.map((device, i) => 
            <DeviceCard key={i} device={device}/>
        )}
        </>
    )
}

export default DeviceList