export const emailTemplate = {
  Auth: {
    verify: {
      text: `Hi {{name}},

Thanks for signing up to Freelaflow!

Please verify your email by clicking the link below:
{{verificationLink}}

If you did not sign up, please ignore this email.

– Freelaflow by Micheal Okereke
`,

      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: sans-serif;">
    <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; padding: 32px;">
      <tr>
        <td align="center">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 16px;">Welcome to FreelaFlow, {{name}}!</h2>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
            Thank you for signing up. To get started, please verify your email address by clicking the button below:
          </p>

          <a href="{{verificationLink}}" target="_blank"
            style="display: inline-block; margin-top: 24px; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Verify Email
          </a>

          <p style="font-size: 14px; color: #9ca3af; margin-top: 32px;">
            If you did not sign up for Freelaflow, you can safely ignore this email.
          </p>

          <p style="font-size: 14px; color: #9ca3af;">
            – Freelaflow by Micheal Okereke
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    },

    forgotPassword: {
      text: `Hi {{name}},

You requested to reset your password for your Freelaflow account.

Click the link below to reset it:
{{resetLink}}

If you did not request this, please ignore this email.

– Freelaflow by Micheal Okereke
`,
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: sans-serif;">
    <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; padding: 32px;">
      <tr>
        <td align="center">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 16px;">Reset your password</h2>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
            Hello {{name}},<br><br>
            You recently requested to reset your Freelaflow password.<br>
            Click the button below to reset it:
          </p>

          <a href="{{resetLink}}" target="_blank"
            style="display: inline-block; margin-top: 24px; padding: 12px 24px; background-color: #f97316; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Reset Password
          </a>

          <p style="font-size: 14px; color: #9ca3af; margin-top: 32px;">
            If you didn’t request a password reset, you can safely ignore this email.
          </p>

          <p style="font-size: 14px; color: #9ca3af;">
            – Freelaflow by Micheal Okereke
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    },

    resetPassword: {
      text: `Hi {{name}},

Your password was successfully reset.

If you did not make this change, please secure your account immediately.

– Freelaflow by Micheal Okereke
`,
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Changed</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: sans-serif;">
    <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; padding: 32px;">
      <tr>
        <td align="center">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 16px;">Your password was changed</h2>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
            Hello {{name}},<br><br>
            Your password was successfully updated.<br>
            If this wasn’t you, please secure your account immediately.
          </p>

          <p style="font-size: 14px; color: #9ca3af; margin-top: 32px;">
            – Freelaflow by Micheal Okereke
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    },

    orgInvite: {
      text: `Hi {{name}},

You have been invited to join the organization "{{organization}}" on Freelaflow by {{inviterName}}.

Click the link below to accept the invitation and set up your account:
{{invitationLink}}

If you weren't expecting this invitation, you can ignore this email.

– Freelaflow by Micheal Okereke
`,

      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>You've Been Invited</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: sans-serif;">
    <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; padding: 32px;">
      <tr>
        <td align="center">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 16px;">You're invited to join {{organization}}</h2>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
            Hello {{name}},<br><br>
            {{inviterName}} has invited you to join their organization <strong>{{organization}}</strong> on Freelaflow.
          </p>

          <a href="{{invitationLink}}" target="_blank"
            style="display: inline-block; margin-top: 24px; padding: 12px 24px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Accept Invitation
          </a>

          <p style="font-size: 14px; color: #9ca3af; margin-top: 32px;">
            If you weren’t expecting this invitation, feel free to ignore this email.
          </p>

          <p style="font-size: 14px; color: #9ca3af;">
            – Freelaflow by Micheal Okereke
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    },
  },
};

// await sendEmail(
//   invitee.email,
//   `${inviter.name} invited you to join ${org.name} – Freelaflow`,
//   htmlStaffInvite
//     .replace("{{name}}", invitee.name)
//     .replace("{{organization}}", org.name)
//     .replace("{{inviterName}}", inviter.name)
//     .replace("{{invitationLink}}", invitationUrl),
//   textStaffInvite
//     .replace("{{name}}", invitee.name)
//     .replace("{{organization}}", org.name)
//     .replace("{{inviterName}}", inviter.name)
//     .replace("{{invitationLink}}", invitationUrl)
// );

// await sendEmail(
//   user.email,
//   "Reset Your Password – Freelaflow",
//   htmlForgotPassword
//     .replace("{{name}}", user.name)
//     .replace("{{resetLink}}", resetUrl),
//   textForgotPassword
//     .replace("{{name}}", user.name)
//     .replace("{{resetLink}}", resetUrl)
// );

// await sendEmail(
//   user.email,
//   "Your Password Has Been Changed – Freelaflow",
//   htmlPasswordResetSuccess.replace("{{name}}", user.name),
//   textPasswordResetSuccess.replace("{{name}}", user.name)
// );

// await sendEmail(
//   user.email,
//   "Verify your email – Freelaflow",
//   html
//     .replace("{{name}}", user.name)
//     .replace("{{verificationLink}}", verificationUrl),
//   text
//     .replace("{{name}}", user.name)
//     .replace("{{verificationLink}}", verificationUrl)
// );
