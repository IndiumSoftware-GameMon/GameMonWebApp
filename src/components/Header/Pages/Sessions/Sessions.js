import React from "react";
import { Routes, Route } from "react-router-dom";
import MetricPeakMemory from "./MetricPeakMemory.js";
import MetricCpuMain from "./MetricCpuMain.js";
import MetricGpuMain from "./MetricGpuMain.js";
import MetricFpsMain from "./MetricFpsMain.js";
import MetricMemory from "./MetricMemory";
import MetricUploadData from "./MetricUploadData";
import MetricDownloadData from "./MetricDownloadData";
import MetricAppPower from "./MetricAppPower";
import auth from "../../../../hooks/useAuth";




export default function Sessionmain() {
  const [open, setOpen] = React.useState(false);


  return (
    <div>
      <Routes>
       <Route path="/:id/fps" element={[<MetricFpsMain open={open} />]} />
        <Route path="/:id/power" element={[<MetricPeakMemory open={open} />]} />
        <Route path="/:id/cpu" element={[<MetricCpuMain open={open} />]} />
        <Route path="/:id/gpu" element={[<MetricGpuMain open={open} />]} />
        <Route path="/:id/memory" element={[<MetricMemory open={open} />]} />
        <Route path="/:id/MetricUploadData" element={[<MetricUploadData open={open} />]} />
        <Route path="/:id/MetricDownloadData" element={[<MetricDownloadData open={open} />]} />
        <Route path="/:id/MetricAppPower" element={[<MetricAppPower open={open} />]} />
      </Routes>
    </div>
  );
}
