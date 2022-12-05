import React, { useMemo, useState, useEffect, useContext } from 'react'
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import Paper from "@mui/material/Paper";
import axios from "../../../../axios/index"
import AuthContext from "../../../../hooks/useAuth"
import "./SessionCompare.css"
import { useNavigate } from 'react-router-dom';

function CompareDetails() {
    const navigate = useNavigate();


    const [allSession, setAllSession] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.id
    const compData = auth.compData
    console.log(compData, "compData")
    console.log(userId, "session userid")

    const gridStyle = useMemo(
        () => ({ height: "100%", width: "100%", marginTop: "0px" }),
        []
    );
    const containerStyle = useMemo(
        () => ({ width: "100%", height: "410px" }),
        []
    );
    const defaultColDef = useMemo(() => {
        return {

            sortable: true,
            cellStyle: { fontSize: '12px' },
            maxWidth: 160,
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


    const rowData = compData?.map(session => {
        return {
            app_name: session?.app_name,
            average_fps_value: session?.average_fps_value,
            cpu_average_usage: session?.cpu_average_usage,
            device_name: session?.device_name,
            download_data_usage_average: session?.download_data_usage_average,
            fps_stability: session?.fps_stability,
            gpu_average_usage: session?.gpu_average_usage,
            memory_average_usage: session?.memory_average_usage,

            peak_memory_value: session?.peak_memory_value,
            upload_data_usage_average: session?.upload_data_usage_average,
            created_at: session?.created_at

        }
    });
    const [columnDefs, setColumnDefs] = useState([

        { field: "app_name", headerName: "Application", unSortIcon: true },
        { field: "device_name", headerName: "Device", unSortIcon: true },
        { field: "cpu_average_usage", headerName: "CPU", unSortIcon: true },
        { field: "gpu_average_usage", headerName: "GPU", unSortIcon: true },

        { field: "average_fps_value", headerName: "FPS", unSortIcon: true },


        { field: "fps_stability", headerName: "FPS Stability", unSortIcon: true },
        { field: "memory_average_usage", headerName: "Memory", unSortIcon: true },
        { field: "peak_memory_value", headerName: "Peak Memory", unSortIcon: true },
        { field: "download_data_usage_average", headerName: "DownloadData", unSortIcon: true },
        { field: "upload_data_usage_average", headerName: "Upload Data", unSortIcon: true },
        { field: "created_at", headerName: "Date", unSortIcon: true },




    ]);







    return (
        <>




            <div style={{ display: "flex", marginTop: "130px" }}>
                <Paper elevation={2}

                    style={{
                        padding: "1.3%",
                        borderRadius: "14px",
                        // display: "flex",


                        width: "90%",
                        marginLeft: "5%",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4 style={{ color: "#278EF1" }}>Session Comparison</h4>
                        <p style={{ backgroundColor: "#278EF1", padding: "7px 15px 5px 15px", borderRadius: "16px", color: "white", fontSize: "14px", fontWeight: "600", cursor: "pointer" }} onClick={() => navigate(-1)} >Back to Full sessions</p>
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

                                    rowMultiSelectWithClick={true}
                                ></AgGridReact>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div >
        </>
    )
}

export default CompareDetails