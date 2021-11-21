import React, { Fragment, useRef, useEffect, useContext } from 'react'
import Arrow from '../assets/icon-arrow.svg'
import AppContext from '../context/app-context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Homepage = () => {
    const { getMyIP, myIP, isFecthing, searchIP, clearIp, IPError, position } = useContext(AppContext)
    const ipAddress = useRef();
    useEffect(() => {
        getMyIP();
        // eslint-disable-next-line
    }, [])



    const searchIpAddress = () => {
        if (ipAddress.current.value)
            clearIp();
        searchIP(ipAddress.current.value);
    }

    return (
        <Fragment>
            <div className="container-fluid pattern mx-auto">
                <div className="row">
                    <div className="col-md-4 col-10 inp mx-auto">
                        <div className="pb-4 text-center">
                            <span className="text-white fs-4 fw-bold text-center">IP Address Tracker</span>
                        </div>
                        <div className="input-group">

                            <input className="col-md-4 col-12 form-control" type="text" ref={ipAddress} placeholder="Type in IP Address" />
                            <div className="bg-dark p-3  input-group-addon" style={{ borderRadius: '0px 20px 20px 0px' }} onClick={searchIpAddress}>
                                <span className="p-3">
                                    <img src={Arrow} alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row pt-2 det mx-auto">
                    <div className="col-12 mx-auto rounded bg-white p-5">
                        <div className="row mx-auto">
                            <small className="text-danger text-center mb-3"><strong>{IPError}</strong></small>
                            <div className="col-md-3 dark">
                                <span style={{ fontSize: "1px" }} className="fs-6 text-muted text-uppercase">Ip Address</span>
                                <div className="fs-5 fw-bold">
                                    {isFecthing ? <Skeleton count={2} /> : <>{!IPError ? myIP.ip : 'No Data'}</>}
                                </div>
                            </div>

                            <div className="col-md-3  dark">
                                <span style={{ fontSize: "1px" }} className=" fs-6 text-muted text-uppercase">Location</span>
                                <div className="fs-5 fw-bold">
                                    {isFecthing ? <Skeleton count={2} /> : `${!IPError ? myIP.location.city : 'No Data'}, ${!IPError ? myIP.location.region : 'No Data'}`}
                                </div>
                            </div>

                            <div className="col-md-3  dark">
                                <span style={{ fontSize: "1px" }} className=" fs-6 text-muted text-uppercase">Time Zone</span>
                                <div className="fs-5 fw-bold">
                                    {isFecthing ? <Skeleton count={2} /> : <>{!IPError ? myIP.location.timezone : 'No Data'}</>}
                                </div>
                            </div>

                            <div className="col-md-3 dark">
                                <span style={{ fontSize: "1px" }} className=" fs-6 text-muted text-uppercase">ISP</span>
                                <div className="fs-5 fw-bold">
                                    {isFecthing ? <Skeleton count={2} /> : <>{!IPError ? myIP.isp : 'No Data'}</>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!isFecthing && !IPError ? <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: "100%", zIndex: '10', position: 'absolute' }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer> : ''}
        </Fragment>
    )
}

export default Homepage
