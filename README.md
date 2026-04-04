# **PomoFlow 🍅🌀**

**An AI-powered Pomodoro timer designed to curate your atmosphere, generate motivation, and analyze your flow.**

PomoFlow is a focus companion that bridges the gap between productivity and environmental design. Utilizing the **Gemini AI API**, it dynamically evolves the app's aesthetic—colors, sounds, and quotes—to match the specific energy of your task.

## ---

**✨ Features**

* 🤖 **AI-Driven Atmosphere**: Real-time adjustment of background colors and ambient music based on task context.  
* 📊 **Deep Analytics**: Visualize focus patterns and session history using interactive charts.  
* ☁️ **Cloud Sync**: Seamlessly save and manage session presets and settings via **Firebase Firestore**.  
* 🎵 **Adaptive Soundscapes**: Built-in audio (Rain, Forest, Cafe, etc.) to minimize distractions.  
* ⏱️ **Smart Session Logging**: Accurate tracking that credits focus time even when sessions are ended prematurely.

## ---

**🛠️ Tech Stack**

| Category | Technology |
| :---- | :---- |
| **Frontend** | React, Vite, TypeScript |
| **Styling** | CSS3, Lucide-React (Icons) |
| **Backend/Auth** | Firebase (Firestore & Authentication) |
| **AI Integration** | Gemini 2.5 Flash |
| **Data Viz** | Recharts |
| **Deployment** | Vercel |

## ---

**🚀 Getting Started**

### **1\. Clone the repository**

Bash

git clone https://github.com/your-username/pomoflow.git  
cd pomoflow

### **2\. Install dependencies**

Bash

npm install

### **3\. Set up Environment Variables**

Create a .env file in the root directory and add your API keys:

Code snippet

VITE\_FIREBASE\_API\_KEY=your\_key  
VITE\_FIREBASE\_AUTH\_DOMAIN=your\_domain  
VITE\_FIREBASE\_PROJECT\_ID=your\_id  
VITE\_GEMINI\_API\_KEY=your\_gemini\_key

### **4\. Run locally**

Bash

npm run dev

## ---

**🔮 Future Enhancements**

The roadmap for PomoFlow includes several advanced features to further optimize the focus experience:

* 🤖 **AI-Powered Analytics Insights**: Integration of LLMs to analyze long-term focus trends and provide personalized suggestions for the best "Deep Work" windows.  
* 📈 **Expanded Data Visualizations**: Implementation of new chart types, including GitHub-style contribution heatmaps for consistency tracking and radar charts for task-type distribution.  
* 🎨 **Immersive Gradient Backgrounds**: Transitioning from solid background colors to smooth, AI-generated animated gradients that shift subtly as the timer progresses.

## ---

**📜 License**

Distributed under the MIT License. See LICENSE for more information.

