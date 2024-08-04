/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { apis } from 'api/apis';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [representative, setRepresentative] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    if (!representative) {
      alert('Please specify a representative');
      return;
    }

    try {
      // Fetch data for the specified representative
      const response = await axios.get(`${apis.generateReportUrl}?query=${representative}`, { responseType: 'blob' });
      console.log('Data: ', response.data);
      setReportData(response.data);

      // Generate and download the report
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `report_${representative}.pdf`);

    } catch (error) {
      console.error('Error generating report', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Reports</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Generate New Monthly Report</h2>
        <label className="block mb-2 text-lg font-medium">
          Representative:
          <input
            type="text"
            value={representative}
            onChange={(e) => setRepresentative(e.target.value)}
            placeholder='Enter the email of the representative'
            className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button
          onClick={handleGenerateReport}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
