'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Feather, Scroll, Heart, Pen } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

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

export default function MedievalPoetryGenerator() {
  const [request, setRequest] = useState<PoemRequest>({
    character: '',
    location: '',
    event: '',
    emotion: '',
    customEmotion: '',
    language: 'english'
  })
  const [generatedPoem, setGeneratedPoem] = useState<GeneratedPoem | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [useCustomEmotion, setUseCustomEmotion] = useState(false)

  const generatePoem = async () => {
    if (!request.character || !request.location || !request.event) {
      toast({
        title: "Missing Information",
        description: "Please fill in character, location, and event to generate your medieval poem.",
        variant: "destructive"
      })
      return
    }

    if (!useCustomEmotion && !request.emotion) {
      toast({
        title: "Missing Emotion",
        description: "Please select an emotion or write your own custom feeling.",
        variant: "destructive"
      })
      return
    }

    if (useCustomEmotion && !request.customEmotion.trim()) {
      toast({
        title: "Missing Custom Emotion",
        description: "Please describe your custom feeling in the text field.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    setIsRevealing(false)
    setGeneratedPoem(null)

    try {
      const response = await fetch('/api/generate-poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error('Failed to generate poem')
      }

      const data = await response.json()
      setGeneratedPoem(data)
      
      // Trigger reveal animation
      setTimeout(() => setIsRevealing(true), 100)
      
      toast({
        title: "Poem Generated",
        description: "Your medieval verse has been crafted with quill and ink.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "The medieval scribes encountered an error. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const formatPoemWithIlluminatedCapitals = (poem: string) => {
    const lines = poem.split('\n').filter(line => line.trim())
    return lines.map((line, index) => {
      if (index === 0 && line.length > 0) {
        const firstLetter = line[0]
        const restOfLine = line.slice(1)
        return (
          <div key={index} className="relative">
            <span className="illuminated-capital inline-block float-left mr-2">
              {firstLetter}
            </span>
            <span className="inline-block">{restOfLine}</span>
          </div>
        )
      }
      return <div key={index}>{line}</div>
    })
  }

  return (
    <div className="min-h-screen parchment-bg">
      {/* Medieval-style background with texture */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B4513' fill-opacity='0.03'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with medieval styling */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Feather className="w-8 h-8 text-amber-900" />
            <h1 className="text-5xl md:text-6xl font-gothic text-amber-900" style={{
              textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)',
              fontFamily: 'serif'
            }}>
              Medieval Poetry Generator
            </h1>
            <Scroll className="w-8 h-8 text-amber-900" />
          </div>
          <p className="text-xl text-amber-800 font-serif italic">
            "Where quill meets parchment, and verses of old are born anew"
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card className="border-4 border-amber-900 shadow-2xl bg-amber-50/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50">
              <CardTitle className="text-2xl font-gothic flex items-center gap-2">
                <Feather className="w-6 h-6" />
                Craft Thy Verse
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-amber-900 font-serif font-semibold">
                  Tongue of Verse
                </Label>
                <Select value={request.language} onValueChange={(value: 'english' | 'chinese') => 
                  setRequest(prev => ({ ...prev, language: value }))
                }>
                  <SelectTrigger className="border-2 border-amber-700 bg-amber-100 text-amber-900">
                    <SelectValue placeholder="Choose language" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-amber-700 bg-amber-50">
                    <SelectItem value="english">English (Archaic)</SelectItem>
                    <SelectItem value="chinese">Classical Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Character Selection */}
              <div className="space-y-2">
                <Label htmlFor="character" className="text-amber-900 font-serif font-semibold">
                  Thy Character
                </Label>
                <Select value={request.character} onValueChange={(value) => 
                  setRequest(prev => ({ ...prev, character: value }))
                }>
                  <SelectTrigger className="border-2 border-amber-700 bg-amber-100 text-amber-900">
                    <SelectValue placeholder="Choose thy character" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-amber-700 bg-amber-50">
                    <SelectItem value="hero">Hero of Legend</SelectItem>
                    <SelectItem value="noble">Noble Lord/Lady</SelectItem>
                    <SelectItem value="commoner">Humble Commoner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Selection */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-amber-900 font-serif font-semibold">
                  The Setting
                </Label>
                <Select value={request.location} onValueChange={(value) => 
                  setRequest(prev => ({ ...prev, location: value }))
                }>
                  <SelectTrigger className="border-2 border-amber-700 bg-amber-100 text-amber-900">
                    <SelectValue placeholder="Choose thy realm" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-amber-700 bg-amber-50">
                    <SelectItem value="castle">Mighty Castle</SelectItem>
                    <SelectItem value="forest">Enchanted Forest</SelectItem>
                    <SelectItem value="village">Peaceful Village</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Event Selection */}
              <div className="space-y-2">
                <Label htmlFor="event" className="text-amber-900 font-serif font-semibold">
                  The Event
                </Label>
                <Select value={request.event} onValueChange={(value) => 
                  setRequest(prev => ({ ...prev, event: value }))
                }>
                  <SelectTrigger className="border-2 border-amber-700 bg-amber-100 text-amber-900">
                    <SelectValue placeholder="Choose thy tale" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-amber-700 bg-amber-50">
                    <SelectItem value="battle">Epic Battle</SelectItem>
                    <SelectItem value="love">Forbidden Love</SelectItem>
                    <SelectItem value="treachery">Dark Treachery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Emotion Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-amber-900 font-serif font-semibold">
                    The Heart's Feeling
                  </Label>
                  <div className="flex items-center gap-2 ml-auto">
                    <Button
                      type="button"
                      variant={!useCustomEmotion ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setUseCustomEmotion(false)
                        setRequest(prev => ({ ...prev, customEmotion: '' }))
                      }}
                      className={`text-xs ${!useCustomEmotion ? 'bg-amber-700 text-amber-50 border-amber-900' : 'border-amber-700 text-amber-900'}`}
                    >
                      <Heart className="w-3 h-3 mr-1" />
                      Preset
                    </Button>
                    <Button
                      type="button"
                      variant={useCustomEmotion ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setUseCustomEmotion(true)
                        setRequest(prev => ({ ...prev, emotion: '' }))
                      }}
                      className={`text-xs ${useCustomEmotion ? 'bg-amber-700 text-amber-50 border-amber-900' : 'border-amber-700 text-amber-900'}`}
                    >
                      <Pen className="w-3 h-3 mr-1" />
                      Custom
                    </Button>
                  </div>
                </div>

                {!useCustomEmotion ? (
                  <Select value={request.emotion} onValueChange={(value) => 
                    setRequest(prev => ({ ...prev, emotion: value }))
                  }>
                    <SelectTrigger className="border-2 border-amber-700 bg-amber-100 text-amber-900">
                      <SelectValue placeholder="Choose thy emotion" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-amber-700 bg-amber-50">
                      <SelectItem value="joy">Boundless Joy</SelectItem>
                      <SelectItem value="sorrow">Deep Sorrow</SelectItem>
                      <SelectItem value="rage">Righteous Rage</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="space-y-2">
                    <Textarea
                      value={request.customEmotion}
                      onChange={(e) => setRequest(prev => ({ ...prev, customEmotion: e.target.value }))}
                      placeholder="Describe thy custom feeling... (e.g., melancholic longing, quiet contemplation, fierce determination, bittersweet nostalgia)"
                      className="border-2 border-amber-700 bg-amber-100 text-amber-900 placeholder-amber-600 min-h-[80px] resize-none"
                    />
                    <p className="text-xs text-amber-700 italic font-serif">
                      "Let thy heart speak freely, and the verse shall capture its essence"
                    </p>
                  </div>
                )}
              </div>

              <Button 
                onClick={generatePoem}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-serif text-lg py-3 border-2 border-amber-900 transition-all duration-300 transform hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    The Scribe Writes...
                  </>
                ) : (
                  <>
                    <Feather className="mr-2 h-5 w-5" />
                    Generate Medieval Verse
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Poem Display */}
          <Card className="border-4 border-amber-900 shadow-2xl bg-amber-50/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50">
              <CardTitle className="text-2xl font-gothic flex items-center gap-2">
                <Scroll className="w-6 h-6" />
                Thy Illuminated Verse
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 min-h-[400px]">
              {generatedPoem ? (
                <div className={`poem-container ${isRevealing ? 'reveal-animation' : 'opacity-0'}`}>
                  <h2 className="text-2xl font-serif text-amber-900 mb-6 text-center font-bold italic">
                    {generatedPoem.title}
                  </h2>
                  <div className="poem-content text-amber-900 leading-relaxed space-y-4 font-serif">
                    {formatPoemWithIlluminatedCapitals(generatedPoem.poem)}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-amber-700">
                  <Scroll className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-serif italic text-center">
                    "Fill the form, and watch as the medieval scribe<br />
                    crafts thy tale in verse of old,<br />
                    with quill dipped in ink and heart full of story..."
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .parchment-bg {
          background: linear-gradient(135deg, #f4e4c1 0%, #e8d4a1 50%, #f4e4c1 100%);
        }

        .illuminated-capital {
          font-size: 3rem;
          line-height: 1;
          color: #8B4513;
          text-shadow: 
            2px 2px 4px rgba(139, 69, 19, 0.3),
            -1px -1px 2px rgba(255, 215, 0, 0.5);
          background: linear-gradient(45deg, #8B4513, #CD853F, #8B4513);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .illuminated-capital::after {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,10 Q30,5 50,10 Q55,30 50,50 Q30,55 10,50 Q5,30 10,10' stroke='%238B4513' stroke-width='1' fill='none' opacity='0.3'/%3E%3C/svg%3E") no-repeat center;
          background-size: contain;
          z-index: -1;
        }

        .poem-container {
          animation: inkBleed 2s ease-out, scrollUnfold 3s ease-out;
        }

        @keyframes inkBleed {
          0% {
            filter: blur(3px);
            opacity: 0;
          }
          50% {
            filter: blur(1px);
            opacity: 0.7;
          }
          100% {
            filter: blur(0);
            opacity: 1;
          }
        }

        @keyframes scrollUnfold {
          0% {
            transform: translateY(20px) scaleY(0.8);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scaleY(1);
            opacity: 1;
          }
        }

        .reveal-animation {
          animation: inkBleed 2s ease-out, scrollUnfold 3s ease-out;
        }

        .font-gothic {
          font-family: 'Georgia', 'Times New Roman', serif;
          letter-spacing: 0.05em;
        }

        .poem-content > div {
          text-indent: 2rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .poem-content > div:first-child {
          text-indent: 0;
        }
      `}</style>
    </div>
  )
}