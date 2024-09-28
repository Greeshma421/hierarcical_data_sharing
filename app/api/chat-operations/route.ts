import { createSupabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createSupabaseServer()
  const { action, data } = await request.json()

  switch (action) {
    case 'fetchConversations':
      return await fetchConversations(supabase)
    case 'fetchMessages':
      return await fetchMessages(supabase, data.conversationId)
    case 'createConversation':
      return await createConversation(supabase, data.title, data.user_id)
    case 'insertMessage':
      return await insertMessage(supabase, data.message, data.conversationId)
    case 'updateConversationTimestamp':
      return await updateConversationTimestamp(supabase, data.conversationId)
    case 'renameConversation':
      return await renameConversation(supabase, data.conversationId, data.title)
    case 'deleteConversation':
      return await deleteConversation(supabase, data.conversationId)
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }
}

async function fetchConversations(supabase: any) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

async function fetchMessages(supabase: any, conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

async function createConversation(supabase: any, title: string, user_id: string) {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ title, user_id })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data[0])
}

async function insertMessage(supabase: any, message: any, conversationId: string) {
  const { error } = await supabase.from('messages').insert({
    conversation_id: conversationId,
    role: message.role,
    content: message.content
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

async function updateConversationTimestamp(supabase: any, conversationId: string) {
  const { error } = await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

async function renameConversation(supabase: any, conversationId: string, title: string) {
  const { error } = await supabase
    .from('conversations')
    .update({ title, updated_at: new Date().toISOString() })
    .eq('id', conversationId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

async function deleteConversation(supabase: any, conversationId: string) {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}