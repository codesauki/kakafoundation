# EmailJS Configuration Guide

This document walks you through setting up EmailJS for the contact form on the Kowa Namu Ne Foundation website.

## 1. Create an EmailJS Account

1. Visit [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for a free account.
2. Once logged in, go to the **Email Services** section and add the email service provider you will use (Gmail, Outlook, etc.).
   - Follow the provider-specific instructions to complete the setup.

## 2. Create an Email Template

1. Navigate to **Email Templates** in the dashboard.
2. Click **Create New Template** and give it a descriptive name (e.g. `contact_form`).
3. Replace the body with the following HTML structure (you can customize styling as needed):

```html
<!-- EmailJS template: contact_form -->
<table cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif;">
  <tr>
    <td style="padding: 20px;">
      <h2>New message from website contact form</h2>
      <p><strong>From:</strong> {{from_name}} &lt;{{from_email}}&gt;</p>
      <p><strong>Subject:</strong> {{subject}}</p>
      <hr />
      <p>{{message}}</p>
    </td>
  </tr>
</table>
```

4. Make sure the template fields (`from_name`, `from_email`, `subject`, `message`) match those used in the code.
5. Save the template and note the **Template ID** (e.g. `template_xxx`).

## 3. Get Your Public Key and Service ID

1. In the EmailJS dashboard, go to **Integration** → **API Keys**.
2. Copy the **Public Key** shown there.
3. In **Email Services** section, locate the service you configured and copy its **Service ID** (e.g. `service_xxx`).

## 4. Add Environment Variables

Add the following variables to your `.env.local` (and to production environment settings):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

> **Note:** `NEXT_PUBLIC_` prefix is required so the values are exposed to client-side code.

## 5. Update the Contact Page (Already Done)

The React contact page (`app/contact/page.tsx`) has been prepared to use EmailJS. It reads the environment variables and sends the message using `emailjs.send(...)`.

If you need to modify the form fields or parameters, adjust both the page and the EmailJS template accordingly.

## 6. Test the Configuration

1. Run the development server: `npm run dev`.
2. Fill and submit the contact form at `/contact`.
3. Check the email inbox of the destination address configured in EmailJS.
4. Review the EmailJS dashboard **Email Logs** for any transmission errors.

## 7. HTML Snippet for Other Uses

If you ever need to embed a plain HTML contact form (outside React), you can use this template (the form will still submit via EmailJS using JavaScript):

```html
<form id="contact-form">
  <input type="text" name="from_name" placeholder="Your name" required />
  <input type="email" name="from_email" placeholder="Your email" required />
  <input type="text" name="subject" placeholder="Subject" required />
  <textarea name="message" placeholder="Message" required></textarea>
  <button type="submit">Send</button>
</form>

<script type="text/javascript">
  (function(){
    emailjs.init('YOUR_PUBLIC_KEY');
  })();

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(function() {
        alert('Message sent successfully');
      }, function(error) {
        alert('Failed to send message: ' + JSON.stringify(error));
      });
  });
</script>
```

## 8. Security Considerations

- EmailJS uses a public key; it does not expose your private API credentials.
- Do **not** store any sensitive information (like service secret) in the client code.
- Rate-limit the form in code if necessary (already handled via server/other mechanisms).

## 9. Going to Production

- Ensure the same environment variables are set on Vercel/your host.
- Verify emails are being delivered from your chosen service provider.
- Consider adding CAPTCHA (e.g., Google reCAPTCHA) to the form if spam becomes an issue.

With this setup, your contact form will send messages directly through EmailJS, removing the need for a custom API endpoint. 👍
