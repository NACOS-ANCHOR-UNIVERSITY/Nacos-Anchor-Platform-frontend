import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import adminService from "../../services/adminService";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function RestoreTransactions() {
  const [logs, setLogs] = useState([]);
  const [isRestoring, setIsRestoring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [users, setUsers] = useState([]);

  // CSV Data hardcoded from file
  const transactions = [
    {
      ref: "T228867464663355",
      date: "Jan 28th, 2026 01:28:35 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 200,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T825461352153469",
      date: "Jan 28th, 2026 01:30:16 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Approved",
      desc: "Departmental Dues",
    },
    {
      ref: "T383402660219895",
      date: "Jan 28th, 2026 01:31:22 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T196937859608027",
      date: "Jan 28th, 2026 01:31:54 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "The transaction was not completed",
      desc: "Departmental Dues",
    },
    {
      ref: "T692749702586336",
      date: "Jan 28th, 2026 01:41:34 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T909457296976679",
      date: "Jan 28th, 2026 01:46:57 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T855700779469720",
      date: "Jan 28th, 2026 01:48:52 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T703327897397573",
      date: "Jan 28th, 2026 01:49:41 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T202639835673412",
      date: "Jan 28th, 2026 01:53:04 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T998494347135103",
      date: "Jan 28th, 2026 01:54:15 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T983125042947323",
      date: "Jan 28th, 2026 02:06:50 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T939567201507723",
      date: "Jan 28th, 2026 02:07:10 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T924629277379340",
      date: "Jan 28th, 2026 02:07:56 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T995193413639748",
      date: "Jan 28th, 2026 02:35:46 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T223981267675156",
      date: "Jan 28th, 2026 02:46:36 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T828792936096073",
      date: "Jan 28th, 2026 02:46:56 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T084189561073942",
      date: "Jan 28th, 2026 02:48:18 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 5000,
      status: "Successful",
      desc: "Dinner Night Ticket",
    },
    {
      ref: "T248146907142689",
      date: "Jan 28th, 2026 02:48:34 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 4500,
      status: "Successful",
      desc: "Departmental T-Shirt",
    },
    {
      ref: "T498976729791357",
      date: "Jan 28th, 2026 03:02:06 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T495778663314635",
      date: "Jan 28th, 2026 04:06:37 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "[Test] Approved",
      desc: "Departmental Dues",
    },
    {
      ref: "T968227567637423",
      date: "Jan 28th, 2026 06:47:25 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T552999537702328",
      date: "Jan 28th, 2026 06:49:59 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T906358723873088",
      date: "Jan 28th, 2026 06:50:46 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T416709276446075",
      date: "Jan 28th, 2026 07:08:57 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T147732950180091",
      date: "Jan 28th, 2026 07:09:45 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T533036849763525",
      date: "Jan 28th, 2026 07:10:18 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T713842446604351",
      date: "Jan 28th, 2026 07:17:02 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T980209637434319",
      date: "Jan 28th, 2026 07:19:29 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 500,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T472804501223554",
      date: "Jan 28th, 2026 07:27:59 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 1500,
      status: "The transaction was not completed",
      desc: "Departmental Dues",
    },
    {
      ref: "T726448349210947",
      date: "Jan 28th, 2026 07:28:32 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 15000,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T100313553609086",
      date: "Jan 28th, 2026 10:12:18 PM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 15000,
      status: "Successful",
      desc: "Departmental Dues",
    },
    {
      ref: "T970729399756486",
      date: "Jan 29th, 2026 12:15:14 AM",
      email: "chukwuebuka.ezirim@student.aul.edu.ng",
      amount: 15000,
      status: "Successful",
      desc: "Departmental Dues",
    },
  ];

  const addLog = (msg, type = "info") => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const fetchUsers = async () => {
    addLog("Fetching users...");
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const headers = { Authorization: `Bearer ${token}` };
      const usersRes = await fetch(
        `/api/proxy/admin/users/list?page=1&limit=100`,
        { headers },
      );
      const usersData = await usersRes.json();
      if (usersData.status === "success") {
        setUsers(usersData.data);
        addLog(`Found ${usersData.data.length} users.`);
      } else {
        addLog("Failed to fetch users", "error");
      }
    } catch (e) {
      addLog(`Error fetching users: ${e.message}`, "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const restore = async () => {
    setIsRestoring(true);
    setProgress(0);

    // Process each transaction
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      const percent = Math.round(((i + 1) / transactions.length) * 100);
      setProgress(percent);

      const user = users.find((u) => u.email === tx.email);
      if (!user) {
        addLog(`Skipping ${tx.ref}: User ${tx.email} not found`, "error");
        continue;
      }

      const matric = user.matric_no;
      if (!matric) {
        addLog(`Skipping ${tx.ref}: No matric for ${tx.email}`, "error");
        continue;
      }

      try {
        addLog(`Processing ${tx.ref} (${matric})...`);
        const formData = new FormData();
        formData.append("matric_no", matric);
        formData.append("amount", tx.amount);
        formData.append("type", tx.desc);
        formData.append("reference", tx.ref);

        // 1. Record
        await adminService.recordPayment(formData);

        // 2. Determine if verify needed
        let targetStatus = "Pending";
        if (tx.status.includes("Successful") || tx.status.includes("Approved"))
          targetStatus = "Successful";
        else if (
          tx.status.includes("not completed") ||
          tx.status.includes("abandoned")
        )
          targetStatus = "Failed";

        if (targetStatus !== "Pending") {
          // Find the payment we just made to verify it
          const allPayments = await adminService.getPayments();
          const payments = allPayments.data || []; // check structure
          const myPayment = payments.find((p) => p.reference_id === tx.ref);

          if (myPayment) {
            await adminService.verifyPayment({
              id: myPayment.id,
              status: targetStatus,
            });
            addLog(`Verified ${tx.ref} as ${targetStatus}`, "success");
          } else {
            addLog(`Could not find ${tx.ref} to verify`, "warning");
          }
        } else {
          addLog(`Recorded ${tx.ref} as Pending`, "success");
        }
      } catch (e) {
        addLog(`Failed ${tx.ref}: ${e.message}`, "error");
      }
      // Small delay to be nice
      await new Promise((r) => setTimeout(r, 500));
    }

    setIsRestoring(false);
    toast.success("Restoration completed");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Transaction Restoration Tool</h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm mb-6">
        <p className="mb-4 text-gray-600">
          Found {transactions.length} transactions in CSV to restore.
          <br />
          Users loaded: {users.length}
        </p>

        <button
          onClick={restore}
          disabled={isRestoring || users.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
        >
          {isRestoring && <Loader2 className="animate-spin" />}
          {isRestoring ? `Restoring... ${progress}%` : "Start Restoration"}
        </button>
      </div>

      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs h-96 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}
