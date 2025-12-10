async function copyItems() {
  const res = await fetch("/api/copy-items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fromUserId: "SOURCE_USER_ID",
      toUserId: "TARGET_USER_ID",
    }),
  });

  const data = await res.json();
  alert(data.message);
}

export default function Page() {
  return (
    <button onClick={copyItems}>
      Copy Items
    </button>
  );
}
