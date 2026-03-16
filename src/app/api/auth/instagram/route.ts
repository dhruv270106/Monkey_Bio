import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// These should be in environment variables
const APP_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || 'YOUR_APP_ID'
const APP_SECRET = process.env.INSTAGRAM_APP_SECRET || 'YOUR_APP_SECRET'
const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || 'http://localhost:3000/auth/instagram/callback'

export async function POST(req: Request) {
  try {
    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }

    // 1. Exchange code for short-lived token
    const tokenResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${APP_SECRET}&code=${code}`)
    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error('Meta Token Exchange Error:', tokenData.error)
      return NextResponse.json({ error: tokenData.error.message }, { status: 400 })
    }

    const shortLivedToken = tokenData.access_token

    // 2. Exchange for long-lived token (60 days)
    const longLivedResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${shortLivedToken}`)
    const longLivedData = await longLivedResponse.json()
    
    const accessToken = longLivedData.access_token

    // 3. Get User's Facebook Pages to find linked Instagram account
    const accountsResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`)
    const accountsData = await accountsResponse.json()

    if (!accountsData.data || accountsData.data.length === 0) {
      return NextResponse.json({ error: 'No Facebook Pages found linked to this account.' }, { status: 400 })
    }

    // 4. Find valid Instagram Business Account
    let igAccount = null
    for (const page of accountsData.data) {
      const pageId = page.id
      const igResponse = await fetch(`https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`)
      const igData = await igResponse.json()
      
      if (igData.instagram_business_account) {
        const igId = igData.instagram_business_account.id
        // Get IG profile details
        const profileResponse = await fetch(`https://graph.facebook.com/v18.0/${igId}?fields=username,name,profile_picture_url&access_token=${accessToken}`)
        igAccount = await profileResponse.json()
        if (igAccount) break
      }
    }

    if (!igAccount) {
      return NextResponse.json({ error: 'No Instagram Business Account linked to your Facebook Pages. Please ensure you have an IG Business/Creator account connected to a FB Page.' }, { status: 400 })
    }

    // 5. Store in Supabase
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
       // We'll store it as a JSON object in the metadata or a dedicated column if we could.
       // For now, let's update the monkey_bio table.
       const { error: dbError } = await supabase
         .from('monkey_bio')
         .update({
           instagram_connection: {
             access_token: accessToken,
             ig_id: igAccount.id,
             username: igAccount.username,
             full_name: igAccount.name,
             profile_pic: igAccount.profile_picture_url,
             connected_at: new Date().toISOString()
           }
         })
         .eq('id', session.user.id)

       if (dbError) {
         console.warn('DB Update Error (possibly column missing):', dbError.message)
         // Fallback: if update fails, we still return the data to the client to store in LocalStorage
       }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: igAccount.id,
        username: igAccount.username,
        full_name: igAccount.name,
        profile_pic: igAccount.profile_picture_url
      }
    })

  } catch (error: any) {
    console.error('Instagram Auth Internal Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
