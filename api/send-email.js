export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientEmail, clientName, refCode, vehicleReg, date, time, total } = req.body;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'V8 Power Garage <onboarding@resend.dev>',
        to: [clientEmail],
        subject: `Booking Confirmed: ${refCode} - V8 Power Garage`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 30px; border-radius: 14px; max-width: 450px; margin: 0 auto;">
                <h2 style="color: #ff3333; text-transform: uppercase; font-size: 18px; margin-bottom: 15px;">V8 POWER GARAGE</h2>
                <p style="color: #ccc; font-size: 13px;">Hello <strong>${clientName}</strong>,</p>
                <p style="color: #ccc; font-size: 13px; margin-bottom: 20px;">Your workshop appointment has been secured successfully.</p>
                
                <div style="background: #141414; border: 1px solid #333; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                    <p style="color: #ff3333; font-size: 13px; font-weight: bold; margin-bottom: 8px;">Booking Ref: ${refCode}</p>
                    <p style="color: #fff; font-size: 12px; margin-bottom: 4px;">Vehicle Reg: <strong>${vehicleReg}</strong></p>
                    <p style="color: #fff; font-size: 12px; margin-bottom: 4px;">Date: <strong>${date}</strong></p>
                    <p style="color: #fff; font-size: 12px; margin-bottom: 4px;">Time Slot: <strong>${time}</strong></p>
                    <p style="color: #fff; font-size: 12px;">Estimate: <strong style="color: #22c55e;">${total}</strong></p>
                </div>
                
                <p style="color: #aaa; font-size: 11px; line-height: 1.4;">Please arrive at the workshop at ${time}. Payment is settled on completion.</p>
                <hr style="border: none; border-top: 1px solid #222; margin: 20px 0;">
                <p style="font-size: 10px; color: #666; text-align: center;">Powered by V8 Power Garage System</p>
            </div>
        `
      })
    });

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ error: data });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
