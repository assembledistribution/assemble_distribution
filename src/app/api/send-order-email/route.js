import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const userEmail = process.env.GMAIL_USER;
    const userPass = process.env.GMAIL_APP_PASSWORD;

    if (!userEmail || !userPass) {
      console.error('GMAIL_USER or GMAIL_APP_PASSWORD is missing in .env.local');
      return NextResponse.json({ 
        error: 'Gmail credentials not configured in .env.local' 
      }, { status: 500 });
    }

    const body = await req.json();
    const {
      orderId,
      orderDate,
      billing,
      shipping,
      items = [],
      subtotal,
      discount,
      total,
      paymentMethod
    } = body;

    const recipientEmail = process.env.ADMIN_RECEIVE_EMAIL || userEmail;

    // Nodemailer transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: userPass,
      },
    });

    const itemsRows = items.map(item => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 10px; font-size: 14px; color: #1a202c;">
          <strong>${item.title || 'Product'}</strong> ${item.size ? `<span style="color:#718096;">(${item.size})</span>` : ''}
        </td>
        <td style="padding: 12px 10px; font-size: 14px; color: #4a5568; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 10px; font-size: 14px; color: #1a202c; text-align: right;">$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f7fafc; margin: 0; padding: 20px; color: #2d3748; }
          .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background-color: #1C5C53; color: #ffffff; padding: 20px; text-align: center; }
          .body { padding: 24px; }
          .meta-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 20px; }
          .section-title { font-size: 15px; font-weight: bold; color: #1a202c; margin: 18px 0 10px 0; border-bottom: 2px solid #1C5C53; padding-bottom: 4px; }
          .address-grid { display: table; width: 100%; margin-bottom: 20px; }
          .address-col { display: table-cell; width: 50%; vertical-align: top; background: #f8fafc; padding: 14px; border-radius: 6px; border: 1px solid #edf2f7; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .items-table th { background: #edf2f7; text-align: left; padding: 10px; font-size: 12px; color: #4a5568; text-transform: uppercase; }
          .summary-row { text-align: right; font-size: 14px; padding: 5px 10px; }
          .total-row { font-size: 17px; font-weight: bold; color: #1C5C53; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2 style="margin: 0;">🎉 New Order Received!</h2>
            <p style="margin: 6px 0 0 0; font-size: 14px;">Order ID: ${orderId}</p>
          </div>
          <div class="body">
            <div class="meta-box">
              <p style="margin: 4px 0;"><strong>Date:</strong> ${orderDate}</p>
              <p style="margin: 4px 0;"><strong>Payment Method:</strong> ${paymentMethod || 'N/A'}</p>
              <p style="margin: 4px 0;"><strong>Total Amount:</strong> <span style="color: #1C5C53; font-weight: bold; font-size: 16px;">$${Number(total || 0).toFixed(2)}</span></p>
            </div>

            <div class="address-grid">
              <div class="address-col">
                <strong style="color: #1C5C53;">Customer Details:</strong>
                <p style="margin: 6px 0 2px 0;"><strong>${billing?.firstName || ''} ${billing?.lastName || ''}</strong></p>
                ${billing?.company ? `<p style="margin: 2px 0; color: #718096; font-size: 13px;">${billing.company}</p>` : ''}
                <p style="margin: 2px 0; font-size: 13px;">Email: <strong>${billing?.email || 'N/A'}</strong></p>
                <p style="margin: 2px 0; font-size: 13px;">Phone: <strong>${billing?.phone || 'N/A'}</strong></p>
              </div>
              <div class="address-col" style="padding-left: 14px;">
                <strong style="color: #1C5C53;">Shipping Address:</strong>
                <p style="margin: 6px 0 2px 0;"><strong>${shipping?.firstName || ''} ${shipping?.lastName || ''}</strong></p>
                <p style="margin: 2px 0; font-size: 13px; color: #4a5568;">
                  ${shipping?.streetAddress1 || ''} ${shipping?.streetAddress2 || ''}<br/>
                  ${shipping?.city || ''}, ${shipping?.state || ''} ${shipping?.zip || ''}<br/>
                  ${shipping?.country || ''}
                </p>
              </div>
            </div>

            <div class="section-title">Ordered Items</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>

            <table style="width: 100%; border-top: 1px solid #e2e8f0; padding-top: 10px;">
              <tr>
                <td class="summary-row" style="color: #718096;">Subtotal:</td>
                <td class="summary-row" style="width: 110px;"><strong>$${Number(subtotal || 0).toFixed(2)}</strong></td>
              </tr>
              ${Number(discount || 0) > 0 ? `
              <tr>
                <td class="summary-row" style="color: #059669;">Discount:</td>
                <td class="summary-row" style="color: #059669; width: 110px;"><strong>-$${Number(discount).toFixed(2)}</strong></td>
              </tr>` : ''}
              <tr>
                <td class="summary-row" style="color: #718096;">Shipping:</td>
                <td class="summary-row" style="width: 110px;"><strong>Free</strong></td>
              </tr>
              <tr>
                <td class="summary-row total-row">Grand Total:</td>
                <td class="summary-row total-row" style="width: 110px;">$${Number(total || 0).toFixed(2)}</td>
              </tr>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"Assemble Orders" <${userEmail}>`,
      to: recipientEmail,
      subject: `🚨 New Order Received: ${orderId} ($${Number(total || 0).toFixed(2)})`,
      html: htmlContent,
      replyTo: billing?.email || undefined,
    });

    console.log('Order notification email sent to Gmail:', info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId }, { status: 200 });

  } catch (err) {
    console.error('Nodemailer Gmail Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send email via Gmail' }, { status: 500 });
  }
}
