import { useEffect, useState } from "react";
import api from '../api/axios';
const OpenInvoices = () => {
    const [response, setResponse] = useState(null);
    const fetchInvoices = async () => {
        try {
            const res = await api.get('/api/invoices/all');
            if (res.status === 200) {
                setResponse(prev => ({ ...prev, invoices: res.data }));
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };
    useEffect(()=>{
        fetchInvoices();
    }, []);
    const renderInvoices = () => {
        if (!response?.invoices) return <p>No invoices available.</p>;

        return (
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Invoice List</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Invoice</th>
                            <th className="border px-4 py-2">Type of Business</th>
                            <th className="border px-4 py-2">Tenure of Invoice</th>
                            <th className="border px-4 py-2">Interest Rate</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.invoices
                            .filter((invoice) => invoice.verified === 1)
                            .map((invoice) => (
                                <tr key={invoice._id}>
                                    <td className="border text-blue-700 px-4 py-2">
                                        <a href={invoice.fileUpload} target="_blank" rel="noopener noreferrer">View File</a>
                                    </td>
                                    <td className="border px-4 py-2">{invoice.typeOfBusiness}</td>
                                    <td className="border px-4 py-2">{invoice.tenureOfInvoice}</td>
                                    <td className="border px-4 py-2">{invoice.interestRate}</td>
                                    <td className="border px-4 py-2">Accepted</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    };
    return (
        <div>
            {renderInvoices()}
        </div>
    );
}

export default OpenInvoices;