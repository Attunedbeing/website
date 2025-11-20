# Attuned Being Website

Welcome to the codebase for the **Attuned Being** website. 
This guide explains how to get this website running on your own computer in simple steps.

## 🚀 Quick Start (Explain Like I'm 5)

Imagine this folder is a kit for a model house. To build it and see it, you need a special tool called **Node.js**.

### Step 1: Install the Tool (Node.js)
1.  Go to [nodejs.org](https://nodejs.org).
2.  Download the **LTS** version (Recommended for Most Users).
3.  Install it just like any other program on your computer.

### Step 2: Prepare the Project
1.  Download or unzip this project folder to your computer.
2.  Open your **Terminal** (on Mac) or **Command Prompt** (on Windows).
3.  Type `cd` followed by a space.
4.  **Drag and drop** the project folder from your file manager into the terminal window. It will auto-fill the folder address.
5.  Press **Enter**.

### Step 3: Install Parts
Type the following command and press **Enter**. This downloads the "lego pieces" (software libraries) the site needs to work.
```bash
npm install
```
*(You will see a lot of text scrolling. This is normal!)*

### Step 4: Turn It On
Type this command and press **Enter**:
```bash
npm run dev
```

You should see a message like `Local: http://localhost:5173`. 
**Open that link in your web browser** to see the site!

---

## 🛠 How to Edit Content

If you want to change text or prices, you don't need to be a coder. Just open these files in a text editor (like VS Code or Notepad):

- **Top Section**: Open `components/Hero.tsx`
- **Services List**: Open `components/Services.tsx`
- **Pricing**: Open `components/Pricing.tsx`
- **About/Bio**: Open `components/About.tsx`

Just change the text inside the quotes, save the file, and the website will update instantly!

## 📦 How to Publish (Go Live)

When you are ready to put this on the real internet:
1.  Upload this folder to **GitHub**.
2.  Create an account on **Netlify** or **Vercel**.
3.  Connect your GitHub.
4.  They will automatically detect the settings and publish it for free!
