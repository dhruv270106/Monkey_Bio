import { supabase } from './supabase'

/**
 * System Notification Utility
 * Handles Slack, Email (Resend), and Database Activity Logs
 */

type OS = 'Slack' | 'Email' | 'Audit'

interface NotificationOptions {
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  channels: OS[]
  metadata?: any
}

export const sendNotification = async (options: NotificationOptions) => {
  const { title, message, type, channels, metadata } = options

  // 1. Audit Log (Database) - Always enabled for important actions
  if (channels.includes('Audit')) {
    try {
      await supabase.from('activity_logs').insert({
        event_type: metadata?.event_type || 'system_notification',
        description: `${title}: ${message}`,
        user_id: metadata?.user_id,
        metadata: metadata
      })
    } catch (err) {
      console.error("Audit log failed:", err)
    }
  }

  // 2. Slack Webhook
  if (channels.includes('Slack')) {
    // We use a public property or env for the webhook URL
    const SLACK_WEBHOOK = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || (await getSystemSetting('slack_webhook'))

    if (SLACK_WEBHOOK) {
      const emoji = type === 'success' ? '✅' : type === 'error' ? '🚨' : 'ℹ️'
      try {
        await fetch(SLACK_WEBHOOK, {
          method: 'POST',
          body: JSON.stringify({
            text: `${emoji} *${title}*\n${message}`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `${emoji} *${title}*\n${message}`
                }
              },
              metadata ? {
                type: "context",
                elements: [{ type: "mrkdwn", text: `\`\`\`${JSON.stringify(metadata, null, 2)}\`\`\`` }]
              } : null
            ].filter(Boolean)
          })
        })
      } catch (err) {
        console.error("Slack notification failed:", err)
      }
    }
  }

  // 3. Email (Placeholder for Resend/Nodemailer)
  if (channels.includes('Email')) {
    console.log(`[Email Notification] To: Admin | Subject: ${title} | Body: ${message}`)
    // Implementation would go here:
    // await resend.emails.send({ ... })
  }
}

// Helper to get settings from a (future) settings table or localstorage/env
async function getSystemSetting(key: string): Promise<string | null> {
    // In a real app, you might fetch this from a 'settings' table in Supabase
    // const { data } = await supabase.from('system_settings').select('value').eq('key', key).single()
    // return data?.value || null
    return null 
}
