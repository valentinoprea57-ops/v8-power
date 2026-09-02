// Trimite cererea către serverless-ul nostru de pe Vercel
fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        clientEmail: email,
        clientName: name,
        refCode: randomRef,
        vehicleReg: document.getElementById("summaryReg").innerText,
        date: selectedDayText,
        time: selectedTimeText,
        total: "£" + currentTotal.toFixed(2)
    })
}).catch(err => console.error("Email error:", err));
