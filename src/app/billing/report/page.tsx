// "use client";

// import React, { useEffect, useMemo, useState } from "react";

// interface Bill {
//   id: string;
//   createdAt: string;
//   customer?: {
//     id: string;
//     name?: string;
//   } | null;
// }

// interface Row {
//   customerName: string;
//   date: string;
//   totalBills: number;
// }

// export default function BillingReportPage() {
//   const [rows, setRows] = useState<Row[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await fetch("/api/billing/list", {
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch bills");
//         }

//         const data = await res.json();
//         const bills: Bill[] = data.bills || [];

//         // ---- GROUPING LOGIC ----
//         const map = new Map<string, Row>();

//         bills.forEach((bill) => {
//           const date = new Date(bill.createdAt)
//             .toISOString()
//             .slice(0, 10);

//           const customerName =
//             bill.customer?.name || "Walk-in Customer";

//           const key = `${customerName}_${date}`;

//           if (!map.has(key)) {
//             map.set(key, {
//               customerName,
//               date,
//               totalBills: 1,
//             });
//           } else {
//             map.get(key)!.totalBills += 1;
//           }
//         });

//         setRows(Array.from(map.values()));
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, []);

//   if (loading) {
//     return <div className="p-6">Loading report…</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">
//         📊 Customer Billing Report
//       </h1>

//       <div className="overflow-x-auto border rounded-lg">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">
//                 Customer Name
//               </th>
//               <th className="border px-4 py-2 text-left">
//                 Date
//               </th>
//               <th className="border px-4 py-2 text-right">
//                 Bills Printed
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {rows.map((row, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2">
//                   {row.customerName}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {row.date}
//                 </td>
//                 <td className="border px-4 py-2 text-right font-medium">
//                   {row.totalBills}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }















// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@clerk/nextjs";

// type Bill = {
//   id: string;
//   createdAt: string;
//   customer?: {
//     id: string;
//     name: string;
//   } | null;
// };

// type ReportRow = {
//   customerName: string;
//   date: string;
//   totalBills: number;
// };

// export default function BillingReportPage() {
//   const { getToken, isLoaded } = useAuth();
//   const [rows, setRows] = useState<ReportRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!isLoaded) return;

//     const fetchBills = async () => {
//       try {
//         const token = await getToken();

//         const res = await fetch("/api/billing/list", {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch bills");
//         }

//         const data = await res.json();
//         const bills: Bill[] = data.bills || [];

//         /**
//          * GROUP:
//          * Customer Name + Date → Count bills
//          */
//         const map = new Map<string, ReportRow>();

//         bills.forEach((bill) => {
//           const dateKey = new Date(bill.createdAt)
//             .toISOString()
//             .split("T")[0];

//           const customerName =
//             bill.customer?.name || "Walk-in Customer";

//           const key = `${customerName}_${dateKey}`;

//           if (!map.has(key)) {
//             map.set(key, {
//               customerName,
//               date: dateKey,
//               totalBills: 0,
//             });
//           }

//           map.get(key)!.totalBills += 1;
//         });

//         setRows(
//           Array.from(map.values()).sort(
//             (a, b) => a.date.localeCompare(b.date)
//           )
//         );
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBills();
//   }, [isLoaded, getToken]);

//   if (loading) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         Loading report…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-10 text-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         📊 Billing Report
//       </h1>

//       <div className="overflow-x-auto border rounded-lg">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">
//                 Customer Name
//               </th>
//               <th className="border px-4 py-2 text-left">
//                 Date
//               </th>
//               <th className="border px-4 py-2 text-right">
//                 Number of Bills
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={3}
//                   className="text-center py-6 text-gray-500"
//                 >
//                   No data found
//                 </td>
//               </tr>
//             )}

//             {rows.map((row, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2">
//                   {row.customerName}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {row.date}
//                 </td>
//                 <td className="border px-4 py-2 text-right font-semibold">
//                   {row.totalBills}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@clerk/nextjs";

// type Bill = {
//   id: string;
//   createdAt: string;
//   grandTotal: number;
//   ownerName?: string | null;
// };

// type ReportRow = {
//   ownerName: string;
//   date: string;
//   totalBills: number;
//   totalAmount: number;
// };

// export default function BillingReportPage() {
//   const { getToken, isLoaded } = useAuth();

//   const [rows, setRows] = useState<ReportRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!isLoaded) return;

//     const fetchBills = async () => {
//       try {
//         const token = await getToken();

//         const res = await fetch("/api/billing/list", {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch bills");
//         }

//         const data = await res.json();
//         const bills: Bill[] = data.bills || [];

//         const map = new Map<string, ReportRow>();

//         bills.forEach((bill) => {
//           if (!bill.createdAt) return;

//           const date = new Date(bill.createdAt);
//           if (isNaN(date.getTime())) return;

//           const dateKey = date.toISOString().split("T")[0];

//           const ownerName =
//             bill.ownerName?.trim() || "Unknown Restaurant";

//           const key = `${ownerName}__${dateKey}`;

//           if (!map.has(key)) {
//             map.set(key, {
//               ownerName,
//               date: dateKey,
//               totalBills: 0,
//               totalAmount: 0,
//             });
//           }

//           const row = map.get(key)!;
//           row.totalBills += 1;
//           row.totalAmount += bill.grandTotal ?? 0;
//         });

//         setRows(
//           Array.from(map.values()).sort((a, b) => {
//             if (a.date === b.date) {
//               return a.ownerName.localeCompare(b.ownerName);
//             }
//             return a.date.localeCompare(b.date);
//           })
//         );
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBills();
//   }, [isLoaded, getToken]);

//   if (loading) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         Loading report…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-10 text-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         📊 Billing Report (All Users)
//       </h1>

//       <div className="overflow-x-auto border rounded-lg">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">
//                 Restaurant / Owner
//               </th>
//               <th className="border px-4 py-2 text-left">
//                 Date
//               </th>
//               <th className="border px-4 py-2 text-right">
//                 Total Bills
//               </th>
//               <th className="border px-4 py-2 text-right">
//                 Total Amount (₹)
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="text-center py-6 text-gray-500"
//                 >
//                   No data found
//                 </td>
//               </tr>
//             )}

//             {rows.map((row, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2 font-medium">
//                   {row.ownerName}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {row.date}
//                 </td>
//                 <td className="border px-4 py-2 text-right">
//                   {row.totalBills}
//                 </td>
//                 <td className="border px-4 py-2 text-right font-semibold">
//                   ₹{row.totalAmount.toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Bill = {
  id: string;
  createdAt: string;
  grandTotal: number;
  ownerName?: string | null;
};

type OwnerGroup = {
  ownerName: string;
  rows: {
    date: string;
    totalBills: number;
    totalAmount: number;
  }[];
};

export default function BillingReportPage() {
  const { getToken, isLoaded } = useAuth();

  const [groups, setGroups] = useState<OwnerGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    const fetchBills = async () => {
      try {
        const token = await getToken();

        const res = await fetch("/api/billing/list", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch bills");

        const data = await res.json();
        const bills: Bill[] = data.bills || [];

        /**
         * STEP 1: owner → date → aggregation
         */
        const ownerMap = new Map<
          string,
          Map<string, { totalBills: number; totalAmount: number }>
        >();

        bills.forEach((bill) => {
          if (!bill.createdAt) return;

          const dateKey = new Date(bill.createdAt)
            .toISOString()
            .split("T")[0];

          const ownerName =
            bill.ownerName?.trim() || "Unknown Restaurant";

          if (!ownerMap.has(ownerName)) {
            ownerMap.set(ownerName, new Map());
          }

          const dateMap = ownerMap.get(ownerName)!;

          if (!dateMap.has(dateKey)) {
            dateMap.set(dateKey, {
              totalBills: 0,
              totalAmount: 0,
            });
          }

          const row = dateMap.get(dateKey)!;
          row.totalBills += 1;
          row.totalAmount += bill.grandTotal ?? 0;
        });

        /**
         * STEP 2: convert to render-friendly structure
         */
        const result: OwnerGroup[] = Array.from(ownerMap.entries()).map(
          ([ownerName, dateMap]) => ({
            ownerName,
            rows: Array.from(dateMap.entries())
              .map(([date, values]) => ({
                date,
                ...values,
              }))
              .sort((a, b) => a.date.localeCompare(b.date)),
          })
        );

        // sort owners alphabetically
        result.sort((a, b) =>
          a.ownerName.localeCompare(b.ownerName)
        );

        setGroups(result);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [isLoaded, getToken]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading report…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        📊 Billing Report – All Restaurants
      </h1>

      {groups.length === 0 && (
        <div className="text-center text-gray-500">
          No data found
        </div>
      )}

      {groups.map((group, idx) => (
        <div key={idx} className="border rounded-lg overflow-hidden">
          {/* OWNER HEADER */}
          <div className="bg-gray-900 text-white px-4 py-2 font-semibold">
            🏪 {group.ownerName}
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">
                  Date
                </th>
                <th className="border px-4 py-2 text-right">
                  Total Bills
                </th>
                <th className="border px-4 py-2 text-right">
                  Total Amount (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {row.date}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {row.totalBills}
                  </td>
                  <td className="border px-4 py-2 text-right font-semibold">
                    ₹{row.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
