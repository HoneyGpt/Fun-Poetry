# 📜 Medieval Poetry Generator

A beautifully crafted web application that generates authentic medieval-style poetry using AI. Create personalized verses in English or Classical Chinese with custom emotions, characters, and settings.

## ✨ Features

### 🎭 **Poetry Generation**
- **Dual Language Support**: Generate poems in archaic English or Classical Chinese
- **Custom Emotions**: Input personalized feelings or choose from preset emotions
- **Character Selection**: Hero, Noble, or Commoner perspectives
- **Medieval Settings**: Castle, Forest, or Village environments
- **Story Events**: Battle, Love, or Treachery narratives

### 🎨 **Authentic Medieval Design**
- **Parchment Background**: Textured medieval manuscript aesthetic
- **Gothic Typography**: Period-appropriate font styling
- **Illuminated Capitals**: Decorated first letters with vine scrollwork
- **Ink Bleed Animation**: Realistic text reveal effects
- **Scroll Unfold**: Smooth parchment unrolling animations

### 🛠️ **Technical Features**
- **Responsive Design**: Works beautifully on all devices
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **AI-Powered**: Uses Pollinations API for text generation
- **No API Keys**: Free to use without authentication
- **Production Ready**: Optimized for deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/HoneyGpt/Fun-Poetry.git
cd Fun-Poetry

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [https://fun-poetry.vercel.app/](https://fun-poetry.vercel.app/) to view the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎯 How to Use

1. **Select Language**: Choose between English (Archaic) or Classical Chinese
2. **Choose Character**: Pick Hero, Noble, or Commoner as your protagonist
3. **Select Setting**: Choose Castle, Forest, or Village as the location
4. **Pick Event**: Select Battle, Love, or Treachery as the main event
5. **Set Emotion**: 
   - Use preset emotions (Joy, Sorrow, Rage)
   - Or write custom emotions for personalized poetry
6. **Generate**: Click "Generate Medieval Verse" to create your poem
7. **Enjoy**: Watch the medieval animations and read your authentic verse!

## 🏗️ Technology Stack

### Frontend
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling
- **🧩 shadcn/ui** - High-quality UI components
- **🎯 Lucide React** - Beautiful icons
- **🌈 Framer Motion** - Smooth animations

### Backend & API
- **🔄 Pollinations API** - AI text generation
- **📡 Next.js API Routes** - Serverless functions
- **🔥 No Authentication Required** - Free to use

### Development Tools
- **📝 ESLint** - Code quality
- **🎨 Tailwind** - Styling framework
- **📦 npm** - Package management

## 🎨 Design Features

### Medieval Aesthetics
- **Parchment Texture**: Authentic manuscript appearance
- **Gothic Elements**: Period-appropriate design language
- **Color Scheme**: Warm browns, ambers, and deep crimsons
- **Typography**: Serif fonts with medieval styling

### Interactive Elements
- **Toggle Buttons**: Smooth preset/custom emotion switching
- **Loading States**: Medieval-themed loading indicators
- **Toast Notifications**: Period-appropriate success/error messages
- **Hover Effects**: Interactive feedback on all elements

### Animations
- **Ink Bleed Effect**: Realistic text spreading animation
- **Scroll Unfold**: Parchment rolling animation
- **Fade Transitions**: Smooth content reveals
- **Micro-interactions**: Subtle hover and focus states

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-poem/    # Poetry generation API
│   ├── layout.tsx            # Root layout component
│   ├── page.tsx              # Main poetry generator
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # shadcn/ui components
├── hooks/
│   ├── use-toast.ts          # Toast notifications
│   └── use-mobile.ts         # Mobile detection
└── lib/
    ├── utils.ts              # Utility functions
    ├── db.ts                 # Database configuration
    └── socket.ts             # WebSocket setup
```

## 🔧 API Integration

### Pollinations API
The application uses Pollinations for AI text generation:

```javascript
// POST method (primary)
const response = await fetch('https://text.pollinations.ai/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: yourPrompt,
    model: 'openai',
    temperature: 0.8,
    max_tokens: 500,
  }),
})

// GET method (fallback)
const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`)
```

### Features
- **No API Keys Required**: Completely free to use
- **Fallback Mechanism**: Automatic GET method fallback
- **Error Handling**: Robust error management
- **Fast Response**: Optimized for poetry generation

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build and deploy
npm run build
# Deploy the dist/ folder to Netlify
```

### Other Platforms
- **Railway**: Works with Node.js runtime
- **Render**: Compatible with Render's web services
- **DigitalOcean**: Can be deployed as a Node.js app
- **Heroku**: Supports Heroku's dynos

## 🎭 Poetry Examples

### English (Archaic)
```
Upon the castle walls so high,
Where banners dance in morning light,
A hero stands beneath the sky,
His sword prepared for deadly fight.
```

### Classical Chinese
```
青山古堡立云间，
英雄独立望烽烟。
宝剑出鞘寒光闪，
誓守家园保平安。
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pollinations** - For providing the AI text generation API
- **shadcn/ui** - For the beautiful UI components
- **Next.js Team** - For the amazing React framework
- **Medieval Poetry** - For inspiration from classic verse forms

## 📞 Support

If you have any questions or suggestions, please:
- Open an issue on GitHub
- Reach out via discussions
- Share your generated poetry!

---

Built with ❤️ for poetry lovers and medieval enthusiasts everywhere.
