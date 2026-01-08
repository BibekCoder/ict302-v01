const brandName = "Sortem NDIS Wear";

const emailTemplates = {
  orderConfirmation: ({ customerName, orderId }) => ({
    subject: `Order confirmation — #${orderId}`,
    body: `Hi ${customerName},

Thank you for choosing ${brandName}. We’ve received your order (#${orderId}).

If you need assistance with sizing, accessibility requirements, or delivery details, please reply to this email and our team will be happy to help.

Kind regards,
${brandName} Team`,
  }),

  orderShipped: ({ customerName, orderId, trackingNumber }) => ({
    subject: `Your order has been shipped — #${orderId}`,
    body: `Hi ${customerName},

Your order (#${orderId}) has been shipped.

Tracking number: ${trackingNumber}

If you require any delivery adjustments or support, please let us know.

Warm regards,
${brandName} Team`,
  }),

  orderUpdated: ({ customerName, orderId, status }) => ({
    subject: `Order update — #${orderId}`,
    body: `Hi ${customerName},

We wanted to let you know that the status of your order (#${orderId}) has been updated.

Current status: ${status}

If you have any questions or need further assistance, please reply to this email.

Regards,
${brandName} Team`,
  }),

  supportMessage: ({ message }) => ({
    subject: `Support message from ${brandName}`,
    body: `Hello,

${message}

Please reply to this email if you require further support.

${brandName} Support Team`,
  }),

  followUpMessage: ({ customerName, orderId }) => ({
    subject: `Checking in — Order #${orderId}`,
    body: `Hi ${customerName},

We’re just checking in to ensure everything with your order (#${orderId}) arrived as expected.

If you need an exchange, adjustment, or additional support, please reply to this email and we’ll assist you.

Kind regards,
${brandName} Team`,
  }),
};

export default emailTemplates;