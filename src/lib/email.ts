import nodemailer from 'nodemailer';
import prisma from '@/lib/db';

export async function sendOrderConfirmationEmail(orderId: number) {
  try {
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
      include: {
        OrderItem: {
          include: {
            Products: true,
          },
        },
      },
    });

    if (!order) {
      console.error(`Order ${orderId} not found for email confirmation.`);
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    let itemsHtml = ``;
    for (const item of order.OrderItem) {
      itemsHtml += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; font-family: Helvetica, Arial, sans-serif;">
            ${item.Products.name}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center; font-family: Helvetica, Arial, sans-serif;">
            <span style="display: inline-block; background-color: #e0e0e0; padding: 2px 8px; border-radius: 12px; font-weight: bold;">
              ${item.quantity}
            </span>
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; font-family: Helvetica, Arial, sans-serif;">
            SAR ${item.Products.price.toString()}
          </td>
        </tr>
      `;
    }

    const htmlContent = `
      <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 10px; background-color: #f4f4f4; width: 100%; box-sizing: border-box;">
        <div style="background-color: #000000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">📦 New Order Alert: #${order.id}</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
          
          <!-- Scannable Customer Details (Boxed Off) -->
          <div style="margin-bottom: 25px; background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #0056b3;">
            <h2 style="margin-top: 0; color: #333; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">👤 Customer Details</h2>
            <p style="margin: 5px 0; color: #555; line-height: 1.6; font-size: 15px;">
              <strong>Name:</strong> ${order.firstName} ${order.lastName}<br/>
              <strong>Email:</strong> <a href="mailto:${order.email}" style="color: #0056b3; text-decoration: none;">${order.email}</a><br/>
              <strong>Phone:</strong> <a href="tel:${order.phone}" style="color: #0056b3; text-decoration: none;">${order.phone}</a><br/>
              <strong>Payment Method:</strong> <span style="background-color: #d1ecf1; color: #0c5460; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${order.paymentMethod.toUpperCase()}</span><br/>
            </p>
          </div>

          <!-- Shipping Details (Boxed Off) -->
          <div style="margin-bottom: 25px; border: 1px solid #e0e0e0; padding: 15px; border-radius: 6px;">
            <h2 style="margin-top: 0; color: #333; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">📍 Shipping Address</h2>
            <p style="margin: 5px 0; color: #555; line-height: 1.6; font-size: 15px;">
              ${order.address}<br/>
              ${order.city}, ${order.postalCode}<br/>
              Saudi Arabia
            </p>
          </div>

          <!-- Items Table -->
          <h2 style="color: #333; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">🛒 Items to Pick</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 15px;">
            <thead>
              <tr style="background-color: #f1f1f1;">
                <th style="padding: 12px 10px; text-align: left; border-bottom: 1px solid #ccc; font-family: Helvetica, Arial, sans-serif; color: #333;">Product</th>
                <th style="padding: 12px 10px; text-align: center; border-bottom: 1px solid #ccc; font-family: Helvetica, Arial, sans-serif; color: #333;">Qty</th>
                <th style="padding: 12px 10px; text-align: right; border-bottom: 1px solid #ccc; font-family: Helvetica, Arial, sans-serif; color: #333;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 15px 10px; text-align: right; font-weight: bold; border-top: 2px solid #333; font-family: Helvetica, Arial, sans-serif; font-size: 16px;">
                  Total Amount:
                </td>
                <td style="padding: 15px 10px; text-align: right; font-weight: bold; border-top: 2px solid #333; color: #b30000; font-family: Helvetica, Arial, sans-serif; font-size: 16px;">
                  SAR ${order.totalPrice.toString()}
                </td>
              </tr>
            </tfoot>
          </table>
          <p style="font-size: 13px; color: #888; margin-top: 0; text-align: right;">(Total includes shipping & tax)</p>
        </div>

        <div style="background-color: #e9ecef; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px;">
          This is an automated notification from the FoneHouse Webapp.<br/>
          Order placed at: ${order.created_at.toLocaleString()}
        </div>
      </div>
    `;

    // Only set recipient to the store owner's email address
    const recipient = process.env.GMAIL_USER || "fonehouseofficial.fh@gmail.com";

    await transporter.sendMail({
      from: `"FoneHouse Store" <${recipient}>`,
      to: recipient, // sending to staff/store owner
      subject: `🚨 New Order #${order.id} (${order.firstName} ${order.lastName})`,
      html: htmlContent,
      replyTo: order.email // allows staff to 'reply' directly to the customer
    });

    console.log(`Order confirmation email sent successfully for order #${order.id}`);
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}
