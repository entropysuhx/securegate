import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'SecureGate <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your SecureGate account',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f1117; color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Verify your email address</h1>
          <p style="color: #94a3b8; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
            Click the button below to verify your account. This link expires in 15 minutes.
          </p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Verify Account
          </a>
          <hr style="border: none; border-top: 1px solid #334155; margin: 40px 0 20px 0;" />
          <p style="color: #64748b; font-size: 14px;">
            If you didn't create a SecureGate account, ignore this email.
          </p>
        </div>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'SecureGate <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your SecureGate password',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f1117; color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Reset your password</h1>
          <p style="color: #94a3b8; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
            Click the button below to reset your password. This link expires in 1 hour.
          </p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
          <hr style="border: none; border-top: 1px solid #334155; margin: 40px 0 20px 0;" />
          <p style="color: #64748b; font-size: 14px;">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send reset email:", error);
    return { success: false, error };
  }
}
