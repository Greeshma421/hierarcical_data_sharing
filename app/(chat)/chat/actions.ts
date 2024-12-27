'use server'

import { Message } from './types'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateChatName(messages: Message[]): Promise<string> {
  // Get the first user message, or use a default if none exists
  const firstUserMessage = messages.find(msg => msg.role === 'user')?.content || ''
  
  // If message is too short, return a default name
  if (firstUserMessage.length < 3) {
    return 'New Chat'
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Generate a short, concise title (max 6 words) for a chat conversation based on the user\'s first message. Respond with only the title, no quotes or punctuation.'
        },
        {
          role: 'user',
          content: firstUserMessage
        }
      ],
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 20,
    })

    const title = completion.choices[0].message.content?.trim() || ''
    console.log(title)
    return title || 'New Chat'

  } catch (error) {
    // Fallback: Create a simple name from the first few words
    const words = firstUserMessage.split(' ').slice(0, 3).join(' ')
    return words.length > 25 ? `${words.slice(0, 25)}...` : words
  }
} 