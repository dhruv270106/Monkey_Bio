import { supabase } from './supabase'

/**
 * Analytics Utility
 * Records user activity, IP and Device information
 */

export const trackActivity = async (eventType: string, description: string, userId?: string) => {
  try {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : 'Server/Unknown'
    
    // Simple way to get browser/OS from user agent
    const device = userAgent.includes('Windows') ? 'Windows' : 
                   userAgent.includes('Mac') ? 'MacOS' : 
                   userAgent.includes('Android') ? 'Android' : 
                   userAgent.includes('iPhone') ? 'iOS' : 'Web'

    const { data: { session } } = await supabase.auth.getSession()
    const finalUserId = userId || session?.user?.id

    // Insert into activity logs
    await supabase.from('activity_logs').insert({
      user_id: finalUserId,
      event_type: eventType,
      description: description,
      device_info: userAgent.substring(0, 100),
      // IP is handled better by Supabase backend, but we can log basic device too
    })

    // Update user's last seen info in monkey_bio
    if (finalUserId) {
        await supabase.from('monkey_bio').update({
            last_login: new Date().toISOString(),
            device_info: `${device} / ${userAgent.split(') ')[0].split(' (')[1]}`,
            // Potentially update IP if you have a public IP service
        }).eq('id', finalUserId)
    }
  } catch (err) {
    console.error("Activity tracking failed:", err)
  }
}
