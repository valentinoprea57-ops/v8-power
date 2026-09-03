const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { clientEmail, clientName, refCode, vehicleReg, date, time, total } = req.body;

    const data = await resend.emails.send({
      from: 'V8 Power Garage <onboarding@resend.dev>',
      to: [clientEmail],
      subject: `Booking Confirmed: ${refCode} - V8 Power Garage`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #ff3333; text-transform: uppercase;">V8 Power Garage</h2>
          <p>Hello <strong>${clientName}</strong>,</p>
          <p>Your workshop appointment has been secured successfully.</p>
          <div style="background-color: #1e1e1e; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #333;">
            <p><strong>Booking Ref:</strong> <span style="color: #ff3333;">${refCode}</span></p>
            <p><strong>Vehicle Reg:</strong> ${vehicleReg}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time Slot:</strong> ${time}</p>
            <p><strong>Estimate:</strong> ${total}</p>
          </div>
          <p>Please arrive at the workshop at <strong>${time}</strong>. Payment is settled on completion.</p>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">Powered by AutoTouch Sistem Ltd</p>
        </div>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
