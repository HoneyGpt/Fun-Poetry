import { NextRequest, NextResponse } from 'next/server'

interface PoemRequest {
  character: string
  location: string
  event: string
  emotion: string
  customEmotion: string
  language: 'english' | 'chinese'
}

interface GeneratedPoem {
  poem: string
  title: string
}

const characterMap: Record<string, string> = {
  'hero': 'brave hero',
  'noble': 'noble lord or lady',
  'commoner': 'humble commoner'
}

const locationMap: Record<string, string> = {
  'castle': 'mighty castle',
  'forest': 'enchanted forest',
  'village': 'peaceful village'
}

const eventMap: Record<string, string> = {
  'battle': 'epic battle',
  'love': 'forbidden love',
  'treachery': 'dark treachery'
}

const emotionMap: Record<string, string> = {
  'joy': 'boundless joy',
  'sorrow': 'deep sorrow',
  'rage': 'righteous rage'
}

async function generateTextWithPollinations(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        model: 'openai',
        temperature: 0.8,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status}`)
    }

    const text = await response.text()
    return text.trim()
  } catch (error) {
    console.error('Error calling Pollinations API:', error)
    throw error
  }
}

async function generateTextWithPollinationsGET(prompt: string): Promise<string> {
  try {
    const encodedPrompt = encodeURIComponent(prompt)
    const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`)
    
    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status}`)
    }

    const text = await response.text()
    return text.trim()
  } catch (error) {
    console.error('Error calling Pollinations API (GET):', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PoemRequest = await request.json()
    const { character, location, event, emotion, customEmotion, language } = body

    if (!character || !location || !event || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!emotion && !customEmotion) {
      return NextResponse.json(
        { error: 'Either emotion or customEmotion must be provided' },
        { status: 400 }
      )
    }

    // Determine which emotion to use
    const selectedEmotion = customEmotion.trim() || emotionMap[emotion] || 'deep feeling'

    let prompt: string

    if (language === 'chinese') {
      prompt = `你是一位中世纪古典中文诗人。请根据以下元素创作一首具有古典韵味的中文诗：

角色：${characterMap[character]}
地点：${locationMap[location]}
事件：${eventMap[event]}
情感：${selectedEmotion}

要求：
1. 使用七言绝句或律诗的形式
2. 采用古典中文词汇和表达方式
3. 每句7个字，共4句（绝句）或8句（律诗）
4. 押韵符合古典诗词格律
5. 意境深远，富有画面感
6. 体现中世纪古典韵味
7. 深刻表达"${selectedEmotion}"这种情感

请直接输出诗歌内容，不要包含任何解释。`
    } else {
      prompt = `You are a medieval poet skilled in the art of verse. Create an authentic medieval-style poem based on these elements:

Character: ${characterMap[character]}
Location: ${locationMap[location]}
Event: ${eventMap[event]}
Emotion: ${selectedEmotion}

Requirements:
1. Write in archaic English with medieval diction (use words like "thy," "thou," "ere," "hath," "doth," etc.)
2. Create 4-line stanzas with cross-rhyme (ABAB or ABCB rhyme scheme)
3. Use iambic meter where possible
4. Include medieval imagery and symbolism
5. Maintain authentic medieval tone and atmosphere
6. Each line should have similar rhythm and meter
7. Generate 3-4 stanzas (12-16 lines total)
8. Deeply express the emotion of "${selectedEmotion}" throughout the verse

Example style:
"Upon the castle walls so high,
Where banners dance in morning light,
A hero stands beneath the sky,
His sword prepared for deadly fight."

Please write the complete poem without any explanations or modern commentary.`
    }

    // Generate poem using Pollinations API
    let poemContent: string
    try {
      poemContent = await generateTextWithPollinations(prompt)
    } catch (error) {
      // Fallback to GET method if POST fails
      console.log('POST method failed, trying GET method as fallback')
      poemContent = await generateTextWithPollinationsGET(prompt)
    }

    if (!poemContent) {
      throw new Error('Failed to generate poem content')
    }

    // Generate a title based on the elements
    const titlePrompt = language === 'chinese'
      ? `为这首关于${characterMap[character]}在${locationMap[location]}经历${eventMap[event]}，表达"${selectedEmotion}"情感的诗，创作一个4个字的古典标题。只返回标题，不要其他内容。`
      : `Create a short, poetic medieval title (2-4 words) for a verse about a ${characterMap[character]} in a ${locationMap[location]} experiencing ${eventMap[event]} with the emotion of "${selectedEmotion}". Return only the title.`

    let title: string
    try {
      title = await generateTextWithPollinations(titlePrompt)
    } catch (error) {
      // Fallback to GET method if POST fails
      console.log('Title POST method failed, trying GET method as fallback')
      title = await generateTextWithPollinationsGET(titlePrompt)
    }

    // Clean up the title and provide fallback
    title = title.trim() || (language === 'chinese' ? '古风诗篇' : 'Medieval Verse')

    const result: GeneratedPoem = {
      poem: poemContent.trim(),
      title: title
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error generating poem:', error)
    return NextResponse.json(
      { error: 'Failed to generate poem. Please try again.' },
      { status: 500 }
    )
  }
}