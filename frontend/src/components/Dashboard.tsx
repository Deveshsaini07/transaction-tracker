import { useState, useEffect } from "react";
import axios from "axios";
import Row from "./Row";

function Dashboard() {
    const [currentBalance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [username, setUsername] = useState("");

    // modal & form state
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [upiId, setUpiId] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"credit" | "debit">("credit");

    async function getUserInfo() {
        const res = await axios.get(
            "http://localhost:3000/api/v1/user/getUser",
            { withCredentials: true }
        );
        return res.data.data;
    }

    async function getAllTransactions() {
        const res = await axios.get(
            "http://localhost:3000/api/v1/user/getAllTransactions",
            { withCredentials: true }
        );
        return res.data.data;
    }

    async function handleAddTransaction() {
        if (loading) return; // 🚫 prevent double submit

        setLoading(true);

        try {
            const finalAmount =
                type === "debit" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));

            await axios.post(
                "http://localhost:3000/api/v1/user/addTransaction",
                {
                    name,
                    upiId,
                    amount: finalAmount,
                },
                { withCredentials: true }
            );

            // refresh data
            const userInfo = await getUserInfo();
            const txns = await getAllTransactions();

            setBalance(userInfo.balance);
            setTransactions(txns);

            // reset & close
            setName("");
            setUpiId("");
            setAmount("");
            setType("credit");
            setShowModal(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const userInfo = await getUserInfo();
            const transactionDetail = await getAllTransactions();

            const sortedTransactions = transactionDetail.sort(
                (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            setBalance(userInfo.balance);
            setUsername(userInfo.username);
            setTransactions(sortedTransactions);
        }

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full flex justify-center bg-gradient-to-r from-amber-600 to-orange-500 shadow-lg">
                <div className="w-full max-w-5xl flex justify-between items-center px-8 py-5 text-white">
                    <h1 className="text-2xl font-extrabold">💳 Transaction Tracker</h1>
                    <span className="font-medium">Hello, {username}</span>
                </div>
            </div>

            {/* Balance */}
            <div className="w-full flex justify-center py-8">
                <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-6 w-full max-w-sm text-center">
                    <h2 className="text-gray-600 font-semibold">Your Balance</h2>
                    <p className="text-4xl font-extrabold text-amber-600">
                        ₹{currentBalance}
                    </p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl font-semibold transition"
                    >
                        ➕ Add Transaction
                    </button>
                </div>
            </div>

            {/* Transactions */}
            <div className="w-full flex justify-center px-4 pb-10">
                <div className="w-full max-w-sm">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Recent Transactions
                    </h2>

                    <div className="bg-white rounded-xl shadow divide-y">
                        {transactions.map((item, i) => (
                            <Row key={i} items={item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">
                        <h3 className="text-xl font-bold mb-4">
                            Add Transaction
                        </h3>

                        <input
                            placeholder="Name"
                            className="w-full mb-3 px-3 py-2 border rounded-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            placeholder="UPI ID"
                            className="w-full mb-3 px-3 py-2 border rounded-lg"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            className="w-full mb-3 px-3 py-2 border rounded-lg"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        {/* Credit / Debit */}
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => setType("credit")}
                                className={`flex-1 py-2 rounded-lg font-semibold ${
                                    type === "credit"
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                Credit
                            </button>
                            <button
                                onClick={() => setType("debit")}
                                className={`flex-1 py-2 rounded-lg font-semibold ${
                                    type === "debit"
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                Debit
                            </button>
                        </div>

                        <button
                            disabled={loading}
                            onClick={handleAddTransaction}
                            className={`w-full py-2 rounded-xl text-white font-semibold ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-amber-600 hover:bg-amber-700"
                            }`}
                        >
                            {loading ? "Adding..." : "Add Transaction"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
