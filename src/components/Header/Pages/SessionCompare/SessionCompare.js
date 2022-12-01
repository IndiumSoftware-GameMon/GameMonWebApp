import React, { useMemo, useState, useEffect, useContext } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Paper from "@mui/material/Paper";
import axios from "../../../../axios/index"
import AuthContext from "../../../../hooks/useAuth"
import "./SessionCompare.css"

function SessionCompare() {
    const [allSession, setAllSession] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.id
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


    const onSelectionChanged = (e) => {
        console.log(e.api.getSelectedRows());
    };
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
                        <p style={{ backgroundColor: "#278EF1", padding: "7px 15px 5px 15px", borderRadius: "16px", color: "white", fontSize: "14px", fontWeight: "600" }}>Compare Sessions</p>
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