import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

// Set longer timeout for streaming responses
export const maxDuration = 30

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a professional healthcare report writer. Create clear, well-structured reports using markdown formatting.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    stream: true,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
} 