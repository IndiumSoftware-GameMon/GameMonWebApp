import React, { useMemo, useState, useEffect, useContext } from 'react'
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import Paper from "@mui/material/Paper";
import axios from "../../../../axios/index"
import AuthContext from "../../../../hooks/useAuth"
import "./SessionCompare.css"
import { Link } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import CompareDetails from "./CompareDetails.js"

function SessionCompare() {
    const [allSession, setAllSession] = useState([])
    const [compSession, setCompSession] = useState([])
    const [selectedSession, setSelectedSession] = useState([])
    var [arr, setArr] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.id
    const compData = auth.compData

    console.log(userId, "session userid")

    const gridStyle = useMemo(
        () => ({ height: "100%", width: "100%", marginTop: "0px" }),
        []
    );
    const containerStyle = useMemo(
        () => ({ width: "100%", height: "450px" }),
        []
    );
    const defaultColDef = useMemo(() => {
        return {

            sortable: true,
            cellStyle: { fontSize: '12px' }
        };
    }, []);
    useEffect(() => {
        axios.get("/mySessions", {
            params: {

                userId: userId
            },
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        }).then(res => {
            console.log(res.data.data, "all session")
            setAllSession(res.data.data)

        })
    }, [])


    const onSelectionChanged = (e) => {
        console.log(e.api.getSelectedRows());
        setSelectedSession(e.api.getSelectedRows())
        // console.log(selectedSession[0].session_id)

        // console.log(selectedSession.forEach((data) => data[0]), "selected")
        // console.log(Object.entries(selectedSession["session_id"]), "sdfg")

    };
    useEffect(() => {
        console.log(selectedSession, "selected session")

        setArr([])
        for (let i = 0; i < selectedSession.length; i++) {
            setArr((ps) => [...ps, selectedSession[i].session_id])
        }


        // const map1 = selectedSession.map(selectedSession[x => x.session_id]);
        // console.log(map1, "map1")
        console.log(arr, "arr")
        console.log(Boolean(arr[8]))
        console.log(typeof (arr[0]))
        console.log(arr[0] ? arr[0] : "")



    }, [selectedSession])

    console.log(arr, "new Arr")



    const compareSession = () => {
        console.log("clicked")
        console.log(userId)
        console.log(auth.token)
        axios.get("/compareSessions", {
            params: {
                userId: userId,
                s1: arr[0] ? arr[0] : "",
                s2: arr[1] ? arr[1] : "",
                s3: arr[2] ? arr[2] : "",
                s4: arr[3] ? arr[3] : "",
                s5: arr[4] ? arr[4] : "",
                s6: arr[5] ? arr[5] : "",
                s7: arr[6] ? arr[6] : "",
                s8: arr[7] ? arr[7] : "",



            }, headers: { Authorization: `Bearer ${auth.token}` }
        }).then(res => {
            console.log(res)
            auth.compDataHandler(res.data.data)
        })
    }

    const rowData = allSession?.map(session => {
        return {
            session_id: session?.session_id,
            device_id: session?.device_id,
            app_name: session?.app_name,
            device_name: session?.device_name,
            session_duration: session?.session_duration,
            session_date: session?.session_date,
            sessionname: session?.sessionname,
        }
    });
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "",
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            maxWidth: 50,
        },
        { field: "session_id", hide: true },
        { field: "device_id", hide: true },
        { field: "app_name", headerName: "Application", unSortIcon: true },
        { field: "device_name", headerName: "Device", unSortIcon: true },
        { field: "session_duration", headerName: "Duration", unSortIcon: true },
        { field: "session_date", headerName: "Date", unSortIcon: true },
        { field: "sessionname", headerName: "Session Name", unSortIcon: true },
    ]);




    return (

        <>




            <div style={{ display: "flex", marginTop: "130px" }}>
                <Paper elevation={2}

                    style={{
                        padding: "1.3%",
                        borderRadius: "14px",
                        // display: "flex",


                        width: "75%",
                        marginLeft: "12.5%",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4 style={{ color: "#278EF1" }}>Full sessions</h4>
                        <Link to="/SessionComparison/details" style={{ textDecoration: 'none' }}>
                            <p style={{ backgroundColor: "#278EF1", padding: "7px 15px 5px 15px", borderRadius: "16px", color: "white", fontSize: "14px", fontWeight: "600" }} onClick={compareSession} >Compare Sessions</p>
                        </Link>
                    </div>
                    <hr style={{ marginLeft: "-1.4%", marginRight: "-1.4%" }} />
                    <div style={containerStyle}>
                        <div style={{ height: "100%", boxSizing: "border-box" }}>
                            <div style={gridStyle} className="ag-theme-alpine">
                                <AgGridReact
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    rowSelection={"multiple"}
                                    defaultColDef={defaultColDef}
                                    pagination={true}
                                    paginationPageSize={8}
                                    rowMultiSelectWithClick={true}
                                    onSelectionChanged={onSelectionChanged}

                                ></AgGridReact>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        </>
    )
}

export default SessionCompare