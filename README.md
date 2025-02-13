# Modern AI Chat Interface

A sleek, modern chat interface built with Next.js 14, TypeScript, and Shadcn UI components. Features a beautiful gradient design with sophisticated animations and interactions.

<img width="1106" alt="image" src="https://github.com/user-attachments/assets/b805ec0c-67e3-4cb4-97a7-84fab17db8e9" />


## Features

- 🎨 Modern UI with gradient design and glass morphism effects
- 💬 Real-time chat interface with user/AI message threading
- ⚡ Instant response handling with loading states
- 🕒 Message timestamps
- 📱 Fully responsive design
- ⌨️ Auto-focus input after responses
- 🔄 Smooth scrolling and animations
- 🎭 Beautiful message transitions
- 🌓 Clean, sophisticated color scheme

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Lucide Icons
- Radix UI Primitives

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
```

2. Install dependencies:
```bash
npm install
```

3. Install required Shadcn components:
```bash
npx shadcn-cli@latest add card
npx shadcn-cli@latest add input
npx shadcn-cli@latest add button
npx shadcn-cli@latest add scroll-area
```

4. Install additional dependencies:
```bash
npm install lucide-react
```

5. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── chat.tsx          # Main chat component
│   └── ui/               # Shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── scroll-area.tsx
└── lib/
    └── utils.ts          # Utility functions
```

## Customization

### Colors
The interface uses a sophisticated gradient color scheme that can be customized in the chat component:
- Primary gradients: violet-500 to purple-500
- Background: indigo-50 via purple-50 to pink-50
- Message bubbles: white with purple accents
- Input area: clean white with purple focus states

### Components
All UI components are built using Shadcn UI, making them highly customizable and maintainable.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the beautiful component library
- Lucide for the icons
- Radix UI for the accessible primitives

---

Built with ♥️ by Mitalee with Claude
