import React, { useContext, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { AppContext } from "../context/AppContext";
import DownloadIcon from '@mui/icons-material/Download';

const DownloadSlipt = ({ id }) => {
    const [loading, setLoading] = useState(false);

    const {downloadSlipt} = useContext(AppContext);

    const generatePDF = async () => {
        try {
            setLoading(true);
            const { data } = await downloadSlipt(id);


            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text("Appointment Slip", 70, 20);

            doc.setFontSize(12);
            doc.text(`Appointment No: ${data?.data?.appointmentNo}`, 20, 40);
            doc.text(`Patient Name: ${data?.data?.userData.name}`, 20, 50);
            doc.text(`Doctor Name: ${data?.data?.docData.name}`, 20, 60);
            doc.text(`Date: ${data?.data?.slotDate.replace(/_/g, "/")}`, 20, 70);
            doc.text(`Time: ${data?.data?.slotTime}`, 20, 80);
            doc.text(`Amount Paid: $${data?.data?.amount}`, 20, 90);
            doc.text(`Appointment Status: ${data?.data?.isCompleted ? "Completed" : "Not Completed"}`, 20, 100);

            // Table
            doc.autoTable({
                startY: 120,
                head: [["Field", "Value"]],
                body: [
                    ["Appointment No", data?.data?.appointmentNo],
                    ["Patient", data?.data?.userData.name],
                    ["Doctor", data?.data?.docData.name],
                    ["Date", data?.data?.slotDate.replace(/_/g, "/")],
                    ["Time", data?.data?.slotTime],
                    ["Amount Paid", `$${data?.data?.amount}`],
                    ["Appointment Status", data?.data?.isCompleted ? "Completed" : "Not Completed"]
                ]
            });

            // Save PDF
            doc.save(`Appointment_Slip_${id}.pdf`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        // <button  style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
        //     {loading ? "Generating..." : "Download PDF"}
        // </button>

        <button onClick={generatePDF} disabled={loading} className="border border-primary text-primary px-2 py-1 rounded text-sm flex items-center gap-1">
        <DownloadIcon />  {loading ? "Generating..." : "Download Slipt"}
        </button>
    );
};

export default DownloadSlipt;
