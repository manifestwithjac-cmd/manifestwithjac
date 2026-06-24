import { useState, useEffect } from "react";

// ======================================================================
// ✦ HOTTER RICHER HAPPIER , START HERE ✦
// Built for Hotter Richer Happier (Manifest With Jac). Swap CONFIG + lessons,
// rewrite the copy, keep the engine. This is the HRH build.
// Cosmic dark theme kept as-is; retheme to black-gold later if wanted.
// ======================================================================

const CONFIG = {
  COMMUNITY_NAME: "Hotter Richer Happier",
  COMMUNITY_TAGLINE: "What you normalize will materialize",
  FOUNDER_NAME: "Jac",
  FOUNDER_FIRST_NAME: "Jac",
  FOUNDER_INITIALS: "J",
  SKOOL_HANDLE: "hotter-richer-happier",
  FOUNDER_LOCATION: "Florida",

  IG_HANDLE: "manifestwithjac",
  TIKTOK_HANDLE: "manifestwithjac",
  YOUTUBE_HANDLE: "manifestwithjac",

  TIER_1_NAME: "Free",
  TIER_2_NAME: "Premium",
  TIER_3_NAME: "VIP",

  CLASSROOM_FLAGSHIP: "Manifesting Money",
  CLASSROOM_SETUP: "Foundations",
  CLASSROOM_TREASURE: "The Vaults",
  CLASSROOM_MODALITY: "Foundations",
  CLASSROOM_HIGHTICKET: "Money Multiverse",

  CATEGORY_1_EMOJI: "✨",
  CATEGORY_1_NAME: "Announcements",
  CATEGORY_1_DESC: "Updates from Jac and what is new this week",

  CATEGORY_2_EMOJI: "💰",
  CATEGORY_2_NAME: "Fast Cash Challenge",
  CATEGORY_2_DESC: "The free 7-day money challenge, your quick win",

  CATEGORY_3_EMOJI: "⚡",
  CATEGORY_3_NAME: "Quantum Jump Challenge",
  CATEGORY_3_DESC: "The 28-night identity jump",

  CATEGORY_4_EMOJI: "🙏",
  CATEGORY_4_NAME: "Claim It",
  CATEGORY_4_DESC: "Introduce yourself, post your claims and wins, comment 444",

  CATEGORY_5_EMOJI: "❓",
  CATEGORY_5_NAME: "Ask Questions",
  CATEGORY_5_DESC: "Stuck on anything? Ask here, you are never alone",

  VALUE_1_ICON: "🌙",
  VALUE_1_OVER: "Identity",
  VALUE_1_UNDER: "tactics",
  VALUE_1_BODY: "We change who you are, not just what you think. The money, the love, the body all follow the identity, never the other way around. What you normalize will materialize.",

  VALUE_2_ICON: "💸",
  VALUE_2_OVER: "Simplicity",
  VALUE_2_UNDER: "complexity",
  VALUE_2_BODY: "No schmorgasbord of 47 methods. You do not need a million rituals or three hours a day. You need a body that treats your dream life as normal. We keep it simple so you actually do it.",

  VALUE_3_ICON: "👑",
  VALUE_3_OVER: "Delusional",
  VALUE_3_UNDER: "realistic",
  VALUE_3_BODY: "Delusional is a compliment in here. The women who decide it is already done, before they can see one shred of proof, are the exact ones it happens for. You get to be one of them.",
};
// ======================================================================
// LESSON DATA
// ======================================================================

const lessons = [

  // ============== DAY 1 ==============
  {
    id: 0, title: "Welcome In", accent: "In", dur: "6 min", emoji: "🤍",
    overview: {
      desc: "I built Hotter Richer Happier because I was so tired of manifestation feeling complicated. Affirmations that fizzled, vision boards collecting dust, a little hit of hope and then the doubt creeping right back in. This first week is how you skip all of that. By the end of it you will know exactly where to start, which room to open first, and how to make your dream life feel so normal your body stops fighting it. Press play and go.",
      hero: "You are not a bystander in your life. You are the one creating it. We are just going to make the having feel normal.",
      showCategoryMap: true,
    },
    concepts: [
      { type: "pullquote",
        text: "What you normalize will materialize. The faster your dream life feels like an of-course, the faster it shows up in the 3D." },
    ],
    actions: [
      "Before you do a single other thing, open the Classroom and press play on Day 1 of the Fast Cash Challenge, or your first activation in Foundations. Even three minutes. You start by feeling it, not by reading about it. This is the whole method in motion.",
      "Download the Skool app on your phone (iOS or Android) so the rituals, drops, and wins land right in your pocket.",
      "Take a quick tour of the top nav: Community (the feed), Classroom (everything you press play on), Calendar, Members, Leaderboards.",
      "Post your intro in Claim It 🙏 and comment 444 to lock in what you are calling in. Start earning your 🔥 streak by commenting on 2 or 3 other posts right now.",
    ],
    promptHeader: "Your intro post",
    promptIntro: "Copy this and paste it as your first post in Claim It 🙏. Fill in the arrows, that is it.",
    promptBadge: "Copy-paste into Skool →",
    prompt: "Drop a hello in the community\nKeep it simple:\n→ Your name and where you are from\n→ What you are here to call in first (money, love, your glow-up)\n→ The one number, person, or feeling you want most right now\n→ One thing you are ready to stop believing about yourself\n\nThen drop 444 in the comments to lock it in. 🤍",
  },

  // ============== DAY 2 ==============
  {
    id: 1, title: "The Foundation", accent: "Foundation", dur: "8 min", emoji: "🌙",
    overview: {
      desc: "Here is the whole philosophy in one screen, and that is all Start Here gives you. The deep version, the full EFT walkthroughs and the nervous system work, lives in the Foundations classroom. That is your next stop after this welcome week.",
      hero: "Your body is not the obstacle to your manifestation. Your body is the entire mechanism. Everything happens through it.",
    },
    concepts: [
      { type: "accordion", headline: "Manifestation is only three things", icon: "🌙",
        list: [
          "Awareness that you are actively creating your reality, not waiting for it.",
          "Clarity on what you actually desire, specific enough that the universe is not guessing.",
          "Living as if it is already yours, until your body believes it.",
        ],
        body: "That is the whole engine. Everyone overcomplicates it. We do not." },
      { type: "callout", style: "white", headline: "The deep work lives in Foundations",
        body: "This is the short version on purpose. The full teaching, the EFT walkthroughs, the nervous system work, and the why behind all of it, lives in the Foundations classroom. That is where you go after this week to actually do the clearing. Start Here just walks you to the door." },
    ],
    actions: [
      "Open the Foundations classroom next and watch the Intro to EFT Tapping lesson.",
      "New to tapping? The 2-minute points guide is at manifestwithjac.netlify.app/eft-tapping-points-guide",
      "When doubt or money panic shows up this week, come back to one line: everything is always working out for me.",
    ],
  },

  // ============== DAY 3 ==============
  {
    id: 2, title: "What Are You Actually Calling In?", accent: "Actually Calling In", dur: "5 min", emoji: "🔮",
    overview: {
      desc: "Now that you know how this works, the next move is getting honest about what you actually want, then picking the one room you walk into first. Most women stall right here, not because manifestation fails, but because everything looks equally important and they try to do all of it at once. Today you name the specific desire and you commit to one lane. Desire, then door.",
      hero: "One clear desire beats seventeen vague ones. Your body already knows the answer. We are just naming it out loud and choosing where you start.",
    },
    concepts: [
      { type: "path-picker" },
      { type: "callout", style: "gradient", headline: "Commit to one lane for 28 days",
        body: "This is the part most people skip, and it is the part that actually works. Twenty-eight days, four full weeks, is the runway your subconscious needs to accept a new normal and let it hold. Bouncing between all five lanes is exactly how women quit before anything lands. Stay in one room for 28 days, then your body will tell you when it is time to move to the next one." },
      { type: "pullquote",
        text: "You do not need a new method. You need to finish the one in front of you while your nervous system catches up to the woman you already are." },
    ],
    actions: [
      "Sit for two minutes and feel into the five lanes. Which one makes your stomach flip? That is your lane.",
      "Get specific on the desire inside it. Not more money, the actual number. Not a relationship, the actual feeling.",
      "Commit to that one lane for the next 28 days. Write it where your body sees it daily, your lock screen or a sticky on your mirror.",
      "Open that classroom and do the first thing fully before you open anything else.",
      "Post your lane and your specific claim in the community, and drop 444 to anchor it. Let the room witness it with you.",
    ],
    prompt: "I am calling in [YOUR LANE: money / love / confidence / body / business] and the specific thing I want most is [GET SPECIFIC: the number, the person, the feeling, the milestone].\n\nHelp me sharpen this into one clear, present-tense claim I can say out loud every day like it is already mine. Keep it specific, keep it in my own voice, no fluff, no toxic positivity. Make it feel like something I would actually say.",
  },

  // ============== DAY 4 ==============
  {
    id: 3, title: "Your Vault Tour", accent: "Vault Tour", dur: "7 min", emoji: "🎧",
    overview: {
      desc: "Now I show you what you actually have access to in here, because these are the tools that do the rewiring while you barely lift a finger. Press-play audios, interactive tapping vaults, rituals, the deep containers. You are not building anything from scratch. You press play, you let it work on you, you live your life. That is the press-play factory.",
      hero: "You are using one of these right now. This welcome, the Fast Cash dashboard, that is the method already working on you.",
    },
    concepts: [
      { type: "accordion", headline: "The tapping vaults", icon: "💧",
        body: "Interactive EFT vaults, one for every lane. You open it, it asks how you are feeling right now, you tap the answer, and it walks you straight into the round for exactly that. There is a before-and-after slider so you literally watch the charge drop. That little drop is your proof it is working." },
      { type: "accordion", headline: "Subliminals and rampages", icon: "🎧",
        body: "Subliminals run the new beliefs underneath the music so your subconscious soaks them in, day or while you sleep. Rampages are the high-frequency hype audios you blast in the car when you need an instant state shift. Money is obsessed with me. I always get paid. You play them on repeat until they feel boring, and boring is the goal." },
      { type: "accordion", headline: "Rituals and activations", icon: "🌙",
        body: "A ritual is a guided experience you press play and follow, usually a visualization or meditation around 20 to 30 minutes, themed to that month energy. You do not have to know anything or prepare anything, you sit back, follow my voice, and let it move you. Every month I drop a fresh one to set the tone, plus activations for the in-between moments when you need to drop into the receiving state fast. One ritual a month is plenty. We are not here to do a thousand things, we are here to do the few that actually move you." },
      { type: "accordion", headline: "The deep containers", icon: "💎",
        body: "When you want to go all the way in on a desire, the deep containers are waiting. Money Multiverse lives right inside the Manifesting Money classroom and walks you through clearing the money story across every version of you, Past, Present, Shadow, and Multiverse Self. These are the full immersive journeys, not quick fixes, and they unlock with the full vault." },
      { type: "pullquote",
        text: "One person loves the subliminals, another lives for the rampages, another only taps. You do not need all of it. You need the few that work on your body." },
    ],
    actions: [
      "Open one audio or one tapping vault in your lane right now. Do not open all of them, pick one.",
      "Use it today. Tap one round, or play one subliminal as you fall asleep tonight.",
      "Post in Claim It 🙏 with how your body felt after. Naming the shift out loud makes it land deeper.",
    ],
  },

  // ============== DAY 5 ==============
  {
    id: 4, title: "Your First Win", accent: "First Win", dur: "6 min", emoji: "🏆",
    overview: {
      desc: "Days 1 through 5 were orientation and clearing. Today is the doing. You do not need to open ten things. You need ONE press-play this week that gives your body a real shift, and you let the room witness it. That first felt win is what makes you believe, and belief is the whole game.",
      hero: "You do not manifest from the couch waiting to feel ready. You move as her now, in the smallest real way, and your body catches up.",
      showTierComparison: true,
    },
    concepts: [
      { type: "pullquote",
        text: "It does not count as a shift until your body feels it. Reading about receiving is not receiving. Press play and let it land." },
      { type: "accordion", headline: "Your first week, one real thing", icon: "🚀",
        body: "Pick one. Do Day 1 of the free Fast Cash Challenge. Or one full tapping round in your lane. Or one activation tonight before bed. Not all of it, not perfectly, just one thing actually done. The women who get results are not the ones who consumed the most, they are the ones who pressed play and let it work." },
      { type: "accordion", headline: "Claiming it out loud is part of the work", icon: "🙏",
        body: "Posting your win in the feed is not just social. Saying it out loud, having the audacity to claim it where people can see, that is how you normalize it in your body. Drop your win and your 444 in Claim It. The more you treat your desire like it is already real, the faster it arrives." },
      { type: "accordion", headline: "Receiving is a two-way street", icon: "💜",
        body: "The fastest way to get the most out of this room is to show up for the other women in it. Leave a real comment on a few posts today. Cheer on someone calling in the same thing as you. The energy you put into witnessing other women receiving comes right back to you." },
      { type: "callout", style: "gradient", headline: "When you want the whole vault",
        body: "Free gets you the full community, the 7-Day Fast Cash Challenge, and your first wins, no card needed. Premium is $7 a month with a 7-day free trial and adds a brand new ritual every month plus every past ritual, the 28-Day Quantum Jump, and the rotating challenges. VIP is $47 and unlocks the entire vault, every tapping vault, subliminal, and rampage across all 5 lanes, Money Multiverse inside Manifesting Money, Venus my manifestation story generator you can actually use, and the monthly Q&A where I record feedback on your work. No calls, ever. Just press play." },
    ],
    actions: [
      "Pick your ONE press-play for this week and actually do it today.",
      "Post your first win or first shift in Claim It 🙏 and drop 444 to lock it in.",
      "Comment on at least 3 other women posts today. Real comments, not just love this. Witnessing compounds.",
      "Come back tomorrow and do the next one. One a day. Let it work on you.",
    ],
  },

  // ============== DAY 6 ==============
  {
    id: 5, title: "Make It Free For Life", accent: "Free For Life", dur: "3 min", emoji: "💚",
    overview: {
      desc: "Fun one to close on. You can make your whole membership free for life, and actually make money on top of it, just by sharing this room with women who would already love it. Every member earns 40% commission for life on everyone they bring in, at whatever tier they join. Skool handles all of it. You copy, you paste, you share. That is the whole job.",
      hero: "Invite a few women who are ready for this and your membership pays for itself. Everything after that is overflow landing in your account.",
      showReferralMath: true,
    },
    concepts: [
      { type: "invite-walkthrough" },
      { type: "accordion", headline: "How the 40% actually works", icon: "💰",
        body: "You get 40% of whatever tier someone joins at, Member, Premium, or VIP, for the entire lifetime of their membership. It pays out automatically through Skool, usually within 14 days of their payment. Nothing to track, no links to build, no follow up. Skool runs the whole thing. You just share your link and let it work." },
      { type: "pullquote",
        text: "This is not a side hustle. This is you getting paid to send your friends the room that is already changing your life." },
      { type: "accordion", headline: "Who to send it to", icon: "💜",
        body: "Think of the friend always in your DMs about manifestation, the one who is so over surface level, the one calling in the exact thing you are. The women who would be gloriously delusional right next to you. You are not selling anything, you are telling the truth about what is working for you. Manifesting next to other believers makes the whole thing move faster anyway." },
      { type: "accordion", headline: "Do not overthink it, use the template", icon: "📝",
        body: "There are two copy-paste templates in the Prompt tab, one social post and one story. Both written in real voice, no cheesy bro-marketing. Swap in your own win and your link, and post it. That is the entire task." },
    ],
    actions: [
      "Grab your affiliate link: Community tab, right sidebar, the button that says Invite People. Copy the link that pops up.",
      "Save it somewhere you will actually find it again, phone notes or a pinned message to yourself.",
      "Pick the one platform where your people actually hang out.",
      "Open the Prompt tab, fill in the two brackets, and post it. Even a small audience works. Every member who has earned from this started with one post.",
      "Come post in Claim It when someone joins through your link so we can celebrate you.",
    ],
    promptHeader: "Your share templates",
    prompt: "Two copy-paste templates. Pick one, fill in the 2 brackets with your real experience and your link, post it.\n\n--------------------\nTEMPLATE 1: SOCIAL POST\n--------------------\n\nokay I have to talk about something. I have been inside a manifestation community called Hotter Richer Happier and it is nothing like the surface level stuff.\n\nIt is press-play. Tapping vaults for money, love, the body. Subliminals you run while you sleep. A fresh ritual every month. Run by Jac, who actually lived this, six figures of debt to a completely different life.\n\n[ONE SENTENCE ABOUT THE SPECIFIC SHIFT YOU FELT IN HERE]\n\nif you have been waiting for a sign to go all in on your fuck yes life, this is it. 444\n\ncome in here with me [YOUR LINK]\n\n--------------------\nTEMPLATE 2: STORY / CLOSE FRIENDS\n--------------------\n\nnot me being fully delusional in the best way lately. I joined this manifestation room called Hotter Richer Happier and [ONE SENTENCE ABOUT WHAT SHIFTED].\n\nif you want to be delulu with me, come manifest right next to me. link is here [YOUR LINK] 444\n\n--------------------\nHow to use: pick one, fill the 2 brackets, post. That is it.",
  },
];

// ====================== TIER COMPARISON DATA ======================
const tiers = [
  {
    name: CONFIG.TIER_1_NAME,
    style: "light",
    tagline: "Free forever. Your way in.",
    desc: "The room, the challenge, and your first wins. No card needed.",
    items: [
      { icon: "💸", text: "The 7-Day Fast Cash Challenge, free for life" },
      { icon: "💜", text: "The full community feed, wins, and claim threads" },
      { icon: "✨", text: "The Quantum Manifestation Blueprint to start" },
      { icon: "🌙", text: "Every monthly theme announced so you never miss" },
    ],
    cta: "Free ✦",
  },
  {
    name: CONFIG.TIER_2_NAME,
    style: "dark",
    tagline: "$7 a month, 7-day free trial.",
    desc: "Everything free, plus the monthly ritual and the deeper challenges.",
    items: [
      { icon: "🌙", text: "A brand new ritual every single month, plus every past ritual" },
      { icon: "🚀", text: "The 28-Day Quantum Jump and rotating challenges" },
      { icon: "♾️", text: "Everything in Free, always" },
    ],
    cta: "$7 / month ✦",
  },
  {
    name: CONFIG.TIER_3_NAME,
    style: "holo",
    tagline: "$47 a month. The crown. You plus the tool.",
    desc: "The entire vault, my AI app, and my eyes on your work.",
    items: [
      { icon: "🎧", text: "Every tapping vault, subliminal, and rampage across all 5 lanes" },
      { icon: "💎", text: "Money Multiverse inside Manifesting Money, fully unlocked" },
      { icon: "✨", text: "Venus, my manifestation story generator, to use on demand" },
      { icon: "🎙️", text: "Submit to the monthly Q&A and I record real feedback" },
      { icon: "👑", text: "Everything in Free and Premium, always" },
    ],
    cta: "$47 / month ✦",
  },
];

// ====================== PATH PICKER DATA ======================
const pathOptions = [
  {
    id: "path_money",
    question: "Money, receiving, and overflow",
    path: "Fast Cash, then Manifesting Money",
    tier: CONFIG.TIER_1_NAME,
    whyPoints: [
      "Start with the free 7-Day Fast Cash Challenge for a quick, real win",
      "Then the Manifesting Money vault clears the money story for good",
      "Money is the lane most women feel the fastest shift in",
    ],
    cta: "Fast Cash, then Manifesting Money",
  },
  {
    id: "path_love",
    question: "Love, your person, and being chosen",
    path: "Manifesting Love",
    tier: CONFIG.TIER_3_NAME,
    whyPoints: [
      "Self-concept first, because you attract from who you believe you are",
      "The Love vault and the SP work all live here",
      "You stop chasing it and become the one it moves toward",
    ],
    cta: "Manifesting Love",
  },
  {
    id: "path_confidence",
    question: "Confidence and your self-concept",
    path: "Foundations, then Confidence",
    tier: CONFIG.TIER_3_NAME,
    whyPoints: [
      "Foundations locks in the identity everything else stands on",
      "The Confidence vault clears the old story about who you are",
      "This is the woman who already knows it is all hers",
    ],
    cta: "Foundations, then Confidence",
  },
  {
    id: "path_body",
    question: "Your body and your vitality",
    path: "Body & Vitality",
    tier: CONFIG.TIER_3_NAME,
    whyPoints: [
      "You stop fighting your body and start living in it like home",
      "The Body vault rewires the way you talk to and about yourself",
      "Vitality becomes an identity, not a punishment",
    ],
    cta: "Body & Vitality",
  },
  {
    id: "path_business",
    question: "Business and being seen",
    path: "Business & Being Seen",
    tier: CONFIG.TIER_3_NAME,
    whyPoints: [
      "You become the woman who is meant to be seen and paid for it",
      "The Business vault clears the fear of visibility and of charging",
      "Aligned action lands different when the identity is already there",
    ],
    cta: "Business & Being Seen",
  },
];

// ====================== VALUES TRIAD ======================
const values = [
  {
    icon: CONFIG.VALUE_1_ICON,
    over: CONFIG.VALUE_1_OVER,
    under: CONFIG.VALUE_1_UNDER,
    body: CONFIG.VALUE_1_BODY,
    accent: "pink",
  },
  {
    icon: CONFIG.VALUE_2_ICON,
    over: CONFIG.VALUE_2_OVER,
    under: CONFIG.VALUE_2_UNDER,
    body: CONFIG.VALUE_2_BODY,
    accent: "mint",
  },
  {
    icon: CONFIG.VALUE_3_ICON,
    over: CONFIG.VALUE_3_OVER,
    under: CONFIG.VALUE_3_UNDER,
    body: CONFIG.VALUE_3_BODY,
    accent: "cyan",
  },
];

// ====================== COMMUNITY CATEGORY MAP ======================
const categories = [
  { emoji: CONFIG.CATEGORY_4_EMOJI, name: CONFIG.CATEGORY_4_NAME, desc: CONFIG.CATEGORY_4_DESC, color: "purple" },
  { emoji: CONFIG.CATEGORY_1_EMOJI, name: CONFIG.CATEGORY_1_NAME, desc: CONFIG.CATEGORY_1_DESC, color: "pink" },
  { emoji: CONFIG.CATEGORY_2_EMOJI, name: CONFIG.CATEGORY_2_NAME, desc: CONFIG.CATEGORY_2_DESC, color: "lime" },
  { emoji: CONFIG.CATEGORY_3_EMOJI, name: CONFIG.CATEGORY_3_NAME, desc: CONFIG.CATEGORY_3_DESC, color: "cyan" },
  { emoji: CONFIG.CATEGORY_5_EMOJI, name: CONFIG.CATEGORY_5_NAME, desc: CONFIG.CATEGORY_5_DESC, color: "mint" },
];

// ======================================================================
// MAIN COMPONENT
// ======================================================================

export default function StartHereCourse() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState({});
  const [pickedPath, setPickedPath] = useState(null);
  const [copied, setCopied] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    setActiveTab("overview");
    setExpanded({});
    setPickedPath(null);
    setReveal((n) => n + 1);
  }, [active]);

  useEffect(() => {
    setReveal((n) => n + 1);
  }, [activeTab]);

  const lesson = lessons[active];
  const doneCount = Object.values(done).filter(Boolean).length;
  const progress = Math.round((doneCount / lessons.length) * 100);

  const toggleDone = (i) => {
    const wasDone = done[i];
    setDone((p) => ({ ...p, [i]: !p[i] }));
    if (!wasDone) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 1800);
    }
  };

  const toggleAccordion = (key) => {
    setExpanded((p) => ({ ...p, [key]: !p[key] }));
  };

  const copyText = (text) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "✦" },
    { id: "concepts", label: "Key Concepts", icon: "💎" },
    { id: "actions", label: "Do This", icon: "🌟" },
    ...(lesson.prompt ? [{ id: "prompt", label: "Prompt", icon: "✨" }] : []),
  ];

  return (
    <div className="app">
      <style>{styles}</style>

      {/* Glitter starfield */}
      <div className="stars-bg">
        {[...Array(16)].map((_, i) => {
          const variants = ["", "lg", "pink", "cyan", "mint"];
          const v = variants[i % variants.length];
          return (
            <div
              key={i}
              className={`s-star ${v}`}
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                animationDelay: `${(i * 0.17) % 4}s`,
                animationDuration: `${3 + (i % 4)}s`,
              }}
            />
          );
        })}
      </div>

      {celebrating && (
        <div className="celebration">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="celeb-spark"
              style={{
                left: `${45 + Math.random() * 10}%`,
                top: `${40 + Math.random() * 10}%`,
                animationDelay: `${i * 30}ms`,
                transform: `rotate(${i * 15}deg) translateY(-${80 + Math.random() * 80}px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar-left">
          <button className="mobile-toggle" onClick={() => setMobileNav(!mobileNav)}>☰</button>
          <div className="topbar-icon">✦</div>
          <div className="topbar-title">{CONFIG.COMMUNITY_NAME} · <em>Start Here</em></div>
        </div>
        <div className="topbar-nav">
          <span className="topbar-link active">Classroom</span>
        </div>
      </div>

      <div className="layout">
        <div className={`sidebar-overlay ${mobileNav ? "show" : ""}`} onClick={() => setMobileNav(false)} />

        {/* Sidebar */}
        <div className={`sidebar ${mobileNav ? "open" : ""}`}>
          <div className="side-header">
            <div className="side-eyebrow">✦ Start Here</div>
            <div className="side-title">{CONFIG.COMMUNITY_NAME} · Start Here</div>
            <div className="side-prog-row">
              <div className="side-prog-bg">
                <div className={`side-prog-fill ${celebrating ? "shimmer" : ""}`} style={{ width: `${progress}%` }} />
              </div>
              <div className="side-prog-pct">{progress}%</div>
            </div>
          </div>
          <div className="side-list">
            {lessons.map((l, i) => (
              <div
                key={i}
                className={`side-item ${active === i ? "active" : ""}`}
                onClick={() => { setActive(i); setMobileNav(false); }}
              >
                <div className={`side-check ${done[i] ? "done" : "pending"}`}>
                  {done[i] && (
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="side-item-emoji">{l.emoji}</div>
                <div className="side-item-title">{l.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="main" key={`${active}-${reveal}`}>
          <div className="main-inner">
            <div className="day-nav reveal" style={{ animationDelay: "20ms" }}>
              {lessons.map((l, i) => (
                <button
                  key={l.id}
                  className={`day-pill ${i === active ? "active" : ""} ${done[i] ? "done" : ""}`}
                  onClick={() => setActive(i)}
                >
                  {done[i] ? "✦ " : ""}Day {i + 1}
                </button>
              ))}
            </div>
            <div className="lesson-meta-row reveal" style={{ animationDelay: "40ms" }}>
              <div className="lesson-num-badge">
                Day {lesson.id + 1} of {lessons.length} · {lesson.dur}
              </div>
              <div className={`lesson-mode-chip ${lesson.hasVideo ? "has-video" : "quick-day"}`}>
                {lesson.hasVideo ? "🎬 Video lesson" : "⚡ Quick day · take action"}
              </div>
            </div>
            <div className="lesson-top reveal" style={{ animationDelay: "120ms" }}>
              <div className="lesson-title">
                <span className="lesson-emoji">{lesson.emoji}</span>{" "}
                {lesson.accent && lesson.title.includes(lesson.accent) ? (
                  <>
                    {lesson.title.split(lesson.accent)[0]}
                    <span className="accent-gradient">{lesson.accent}</span>
                    {lesson.title.split(lesson.accent)[1]}
                  </>
                ) : (
                  lesson.title
                )}
              </div>
              <div className="lesson-top-actions">
                <button
                  className={`lesson-done-top ${done[active] ? "complete" : "pending"}`}
                  onClick={() => toggleDone(active)}
                >
                  {done[active] ? "✦ Completed" : "○ Mark Complete"}
                </button>
              </div>
            </div>

            <div className="tab-content" key={active}>
              {(
                <div className="pane">
                  <div className="lesson-desc reveal" style={{ animationDelay: "80ms" }}>
                    {lesson.overview.desc}
                  </div>
                  {lesson.overview.hero && (
                    <div className="hero-callout reveal" style={{ animationDelay: "200ms" }}>
                      <div className="hero-mark">"</div>
                      <div className="hero-text">{lesson.overview.hero}</div>
                    </div>
                  )}
                  {lesson.overview.showAboutFounder && <AboutFounder />}
                  {lesson.overview.showMissionCard && <MissionCard />}
                  {lesson.overview.showCommonEnemy && <CommonEnemyCard />}
                  {lesson.overview.showValuesTriad && <ValuesTriad />}
                  {lesson.overview.showCategoryMap && <CategoryMap />}
                  {lesson.overview.showFireStreak && <FireStreakCard />}
                  {lesson.overview.showPathConvergence && <PathConvergence />}
                  {lesson.overview.showPrimarySupporting && <PrimarySupporting />}
                  {lesson.overview.showInfiniteVsFinite && <InfiniteVsFinite />}
                  {lesson.overview.showSameToolTwoPositions && <SameToolTwoPositions />}
                  {lesson.overview.showResourceGrid && <ResourceGrid />}
                  {lesson.overview.showFocusPoints && <FocusPoints />}
                  {lesson.overview.showGrowthTrajectory && <GrowthTrajectory />}
                  {lesson.overview.showHalfStartedVsShipped && <HalfStartedVsShipped />}
                  {lesson.overview.showReferralMath && <ReferralMathHero />}
                  {lesson.overview.showTierComparison && <TierComparison />}
                  {lesson.overview.showVipReadiness && <VipReadiness />}
                </div>
              )}

              {lesson.concepts && lesson.concepts.length > 0 && (
                <div className="pane">
                  <div className="page-label">The idea</div>
                  {lesson.concepts.map((c, i) => (
                    <div
                      key={i}
                      className="concept-wrap reveal"
                      style={{ animationDelay: `${80 + i * 70}ms` }}
                    >
                      {c.type === "accordion" && (
                        <Accordion
                          item={c}
                          isOpen={!!expanded[`${active}-${i}`]}
                          onToggle={() => toggleAccordion(`${active}-${i}`)}
                        />
                      )}
                      {c.type === "pullquote" && <PullQuote text={c.text} />}
                      {c.type === "callout" && <Callout item={c} />}
                      {c.type === "path-picker" && (
                        <PathPicker picked={pickedPath} setPicked={setPickedPath} />
                      )}
                      {c.type === "invite-walkthrough" && <InviteWalkthrough />}
                    </div>
                  ))}
                </div>
              )}

              {lesson.actions && lesson.actions.length > 0 && (
                <div className="pane actions-pane">
                  <div className="actions-lead reveal" style={{ animationDelay: "60ms" }}>
                    <div className="actions-lead-badge">Do this today</div>
                    <div className="actions-lead-text">
                      These are the small moves that compound. Don't skip. This is where momentum starts.
                    </div>
                  </div>
                  {lesson.actions.map((a, i) => (
                    <div
                      key={i}
                      className="action-card reveal"
                      style={{ animationDelay: `${120 + i * 90}ms` }}
                    >
                      <div className="action-num">{String(i + 1).padStart(2, "0")}</div>
                      <div className="action-text">{a}</div>
                    </div>
                  ))}
                </div>
              )}

              {lesson.prompt && (
                <div className="pane">
                  <div className="page-label">{lesson.promptHeader || "Your Claude prompt"}</div>
                  <div className="prompt-intro reveal" style={{ animationDelay: "60ms" }}>
                    {lesson.promptIntro || "Paste this into Claude and fill in the brackets. You'll get your custom output in under a minute."}
                  </div>
                  <div className="prompt-box reveal" style={{ animationDelay: "160ms" }}>
                    <div className="prompt-hdr">
                      <span className="prompt-badge">{lesson.promptBadge || "Copy-paste into Claude →"}</span>
                      <button className="prompt-copy-btn" onClick={() => copyText(lesson.prompt)}>
                        {copied ? "✦ Copied!" : "📋 Copy Prompt"}
                      </button>
                    </div>
                    <div className="prompt-text">{lesson.prompt}</div>
                    <a
                      className="prompt-paste-link"
                      href={`https://www.skool.com/${CONFIG.SKOOL_HANDLE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "14px", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.3px", color: "#a07f30", textDecoration: "none", position: "relative", zIndex: 1 }}
                    >
                      Paste it straight into the community →
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="lesson-bottom reveal" style={{ animationDelay: "600ms" }}>
              <button
                className={`bottom-done-btn ${done[active] ? "complete" : "pending"}`}
                onClick={() => toggleDone(active)}
              >
                {done[active] ? "✦ Lesson Complete" : "✎ Mark Lesson Complete"}
              </button>
              {active < lessons.length - 1 && (
                <button className="bottom-next" onClick={() => setActive(active + 1)}>
                  Next: {lessons[active + 1].title} →
                </button>
              )}
            </div>

            <div className="lesson-footer">
              <div className="lf-brand">✦ {CONFIG.COMMUNITY_NAME} ✦</div>
              <div className="lf-links">
                <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Disclaimer</a> · <a href="#">Contact</a>
              </div>
              <div className="lf-credit">{CONFIG.COMMUNITY_NAME} · Start Here · {CONFIG.COMMUNITY_TAGLINE}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// SHARED TEXT-BASED COMPONENTS (unchanged from v8)
// ======================================================================

function Accordion({ item, isOpen, onToggle }) {
  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <button className="accordion-btn" onClick={onToggle}>
        <div className="accordion-left">
          {item.icon && <span className="accordion-icon">{item.icon}</span>}
          <span className="accordion-headline">{item.headline}</span>
        </div>
        <div className="accordion-chev">{isOpen ? "−" : "+"}</div>
      </button>
      <div className="accordion-panel" style={{ maxHeight: isOpen ? "620px" : "0" }}>
        <div className="accordion-body">
          {item.list ? (
            <>
              <ol className="accordion-list">
                {item.list.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ol>
              {item.body && <p className="accordion-after">{item.body}</p>}
            </>
          ) : (
            item.body
          )}
        </div>
      </div>
    </div>
  );
}

function PullQuote({ text }) {
  return (
    <div className="pullquote">
      <div className="pullquote-mark">❝</div>
      <div className="pullquote-text">{text}</div>
    </div>
  );
}

function Callout({ item }) {
  return (
    <div className={`callout callout-${item.style}`}>
      <div className="callout-headline">{item.headline}</div>
      <div className="callout-body">{item.body}</div>
    </div>
  );
}

// ======================================================================
// DAY 1 , ABOUT FOUNDER (who I am card)
// ======================================================================

function AboutFounder() {
  return (
    <div className="aa-wrap reveal" style={{ animationDelay: "280ms" }}>
      <div className="aa-card">
        <div className="aa-avatar">
          <div className="aa-avatar-inner">
            <div className="aa-initials">{CONFIG.FOUNDER_INITIALS}</div>
          </div>
          <div className="aa-sparkle" aria-hidden="true">✦</div>
        </div>
        <div className="aa-body">
          <div className="aa-eyebrow">✦ Who I am</div>
          <div className="aa-bio">
            Hey, I'm <strong>Jac</strong>. I built Hotter Richer Happier from Florida, and I built it because I lived the surface level version first. I was an entrepreneur since 16 doing manifestation the shallow way, affirmations on my phone, vision boards, staying positive, while I quietly went six figures into debt with no real connection to my highest self. Nothing was landing. So I stopped doing the surface level stuff and rebuilt everything from my body, my nervous system, my identity. I came from nothing, no trust fund, no safety net, and I multiplied my income, lost the weight, and stopped chasing money. This is the room I wish I'd had back then. I am certified in EFT and breathwork, and I have lived every bit of this. Not your guru. Just the woman who found the simple version and is handing it to you.
          </div>
          <div className="aa-sig">{CONFIG.FOUNDER_NAME} · Founder</div>
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// DAY 1 , MISSION CARD (generic version)
// Shows the shared mission of your community. The flame + crown visual is preserved
// as an aspirational transformation metaphor , customize the copy to match your mission.
// ======================================================================

function MissionCard() {
  return (
    <div className="mission-wrap reveal" style={{ animationDelay: "340ms" }}>
      <div className="mission-badge">✦ Our Shared Mission</div>
      <div className="mission-card">
        <div className="mission-flame-bg" aria-hidden="true">
          <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="missionFlame" cx="50%" cy="75%" r="65%">
                <stop offset="0%" stopColor="#ff8ad1" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#b26bff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6bd5ff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="crownGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c78fff" />
                <stop offset="50%" stopColor="#ff8ad1" />
                <stop offset="100%" stopColor="#8effd5" />
              </linearGradient>
            </defs>
            {/* flame shape (bottom) */}
            <path
              d="M 100 220 Q 60 180 70 130 Q 78 95 100 80 Q 122 95 130 130 Q 140 180 100 220 Z"
              fill="url(#missionFlame)"
              opacity="0.7"
            />
            {/* inner flame */}
            <path
              d="M 100 200 Q 80 175 85 145 Q 92 120 100 110 Q 108 120 115 145 Q 120 175 100 200 Z"
              fill="#ff8ad1"
              opacity="0.4"
            />
            {/* crown (top, becoming) */}
            <g transform="translate(100 45)" opacity="0.95">
              <path
                d="M -28 8 L -22 -12 L -14 4 L -8 -18 L 0 0 L 8 -18 L 14 4 L 22 -12 L 28 8 Z"
                fill="url(#crownGrad)"
              />
              <circle cx="-22" cy="-12" r="2" fill="#8effd5" />
              <circle cx="0" cy="-22" r="2.5" fill="#fff" />
              <circle cx="22" cy="-12" r="2" fill="#8effd5" />
              <rect x="-28" y="8" width="56" height="3" rx="1" fill="url(#crownGrad)" />
            </g>
            {/* arrow/spark between flame and crown */}
            <path
              d="M 100 90 L 100 65"
              stroke="#f5f0ff"
              strokeWidth="1.5"
              strokeDasharray="2 3"
              opacity="0.6"
            />
          </svg>
        </div>
        <div className="mission-body">
          <div className="mission-line-1">
            We're here to turn <span className="mission-hl">the woman who has tried every surface level manifestation trick</span> into the woman money, love, and her fuck yes life all move toward.
          </div>
          <div className="mission-line-2">
            Because the more women who know they are the ones creating their reality, the more of them stop waiting for permission to want what they want.
          </div>
          <div className="mission-divider" />
          <div className="mission-line-3">
            We're in the era where 'maybe this is just my life' finally dies. <span className="mission-hl-alt">Good. Let it.</span>
          </div>
          <div className="mission-punch">You are the one creating your reality.</div>
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// DAY 1 , COMMON ENEMY CARD (what we're fighting against)
// This is the cultural pattern / bad bargain / limiting belief system
// that your community rejects. Define YOUR version of "The Old Bargain."
// ======================================================================

function CommonEnemyCard() {
  const enemyForms = [
    "whisper this 5 times",
    "vision boards collecting dust",
    "just stay positive",
    "affirmations with zero feeling",
    "manifesting from the conscious mind",
    "waiting for the 3D to change first",
  ];
  return (
    <div className="bargain-wrap reveal" style={{ animationDelay: "420ms" }}>
      <div className="bargain-badge">⚔️ Our Common Enemy</div>
      <div className="bargain-card">
        <div className="bargain-header">
          <div className="bargain-stamp">VOID</div>
          <div className="bargain-title">Surface-Level Manifestation</div>
        </div>
        <div className="bargain-body">
          Surface level manifestation is the lie that you can whisper an affirmation five times, make a vision board, stay positive, and that is enough. It only ever touches your conscious mind. Meanwhile 95% of you, your body, your subconscious, the money and love programming you absorbed before you had words for it, still treats what you want as unfamiliar. So you keep recreating the same ceiling and blaming yourself for it. It was never you. It was the layer no one ever taught you to work.
        </div>
        <div className="bargain-forms">
          <div className="bargain-form-label">It shows up as:</div>
          <div className="bargain-form-tags">
            {enemyForms.map((form, i) => (
              <span key={i} className="b-tag">{form}</span>
            ))}
          </div>
        </div>
        <div className="bargain-break">
          <span className="bargain-break-line">We do not manifest from the surface.</span>
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// NEW: DAY 1 , VALUES TRIAD (Simplicity / Freedom / Momentum)
// ======================================================================

function ValuesTriad() {
  return (
    <div className="values-wrap reveal" style={{ animationDelay: "500ms" }}>
      <div className="values-badge">✦ How we win the fight</div>
      <div className="values-title">Our three values</div>
      <div className="values-grid">
        {values.map((v, i) => (
          <div
            key={v.over}
            className={`value-card value-${v.accent} reveal`}
            style={{ animationDelay: `${580 + i * 120}ms` }}
          >
            <div className="value-icon">{v.icon}</div>
            <div className="value-headline">
              <span className="value-over">{v.over}</span>
              <span className="value-over-sep">over</span>
              <span className="value-under">{v.under}</span>
            </div>
            <div className="value-body">{v.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================================================
// NEW: DAY 1 , COMMUNITY CATEGORY MAP
// ======================================================================

function CategoryMap() {
  return (
    <div className="catmap-wrap reveal" style={{ animationDelay: "300ms" }}>
      <div className="catmap-badge">✦ Where to post what</div>
      <div className="catmap-title">The 5 community categories</div>
      <div className="catmap-grid">
        {categories.map((c, i) => (
          <div
            key={c.name}
            className={`catmap-card catmap-${c.color} reveal`}
            style={{ animationDelay: `${380 + i * 90}ms` }}
          >
            <div className="catmap-emoji">{c.emoji}</div>
            <div className="catmap-name">{c.name}</div>
            <div className="catmap-desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================================================
// NEW: DAY 1 , FIRE STREAK VISUAL
// ======================================================================

function FireStreakCard() {
  return (
    <div className="fire-wrap reveal" style={{ animationDelay: "340ms" }}>
      <div className="fire-card">
        <div className="fire-left">
          <div className="fire-badge">🔥 The Fire Streak</div>
          <div className="fire-title">10 actions a day · 30 days · you get the 🔥</div>
          <div className="fire-body">
            Skool gives you a fire emoji next to your name when you take 10 community actions per day for 30 days straight. Every post, comment, and like you receive counts. If you're a Skool owner yourself, it's instant social proof that you're active on the platform. Easiest trust-builder out there.
          </div>
        </div>
        <div className="fire-visual">
          <div className="fire-bars">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="fire-bar"
                style={{
                  animationDelay: `${i * 40}ms`,
                  height: `${30 + (i % 5) * 10}%`,
                }}
              />
            ))}
          </div>
          <div className="fire-streak-label">30-day streak</div>
          <div className="fire-emoji-float">🔥</div>
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// NEW: DAY 2 , PATH CONVERGENCE VISUAL
// ======================================================================

function PathConvergence() {
  return (
    <div className="pc-wrap reveal" style={{ animationDelay: "300ms" }}>
      <div className="pc-badge">✦ Too many ideas, not enough follow-through</div>
      <div className="pc-visual">
        <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pcBright" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6bc1" />
              <stop offset="50%" stopColor="#b26bff" />
              <stop offset="100%" stopColor="#8effd5" />
            </linearGradient>
            <filter id="pcGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* faded tangled paths */}
          <path d="M 30 40 Q 200 80 380 90 T 770 110" stroke="rgba(10,10,10,0.14)" strokeWidth="1.5" fill="none" />
          <path d="M 30 70 Q 220 30 400 120 T 770 130" stroke="rgba(10,10,10,0.12)" strokeWidth="1.5" fill="none" />
          <path d="M 30 100 Q 180 160 380 100 T 770 120" stroke="rgba(10,10,10,0.14)" strokeWidth="1.5" fill="none" />
          <path d="M 30 130 Q 240 90 410 140 T 770 125" stroke="rgba(10,10,10,0.1)" strokeWidth="1.5" fill="none" />
          <path d="M 30 160 Q 200 200 380 130 T 770 125" stroke="rgba(10,10,10,0.12)" strokeWidth="1.5" fill="none" />
          <path d="M 30 190 Q 220 140 400 150 T 770 130" stroke="rgba(10,10,10,0.1)" strokeWidth="1.5" fill="none" />
          <path d="M 30 220 Q 180 180 390 140 T 770 130" stroke="rgba(10,10,10,0.12)" strokeWidth="1.5" fill="none" />
          {/* bright convergence line */}
          <path
            d="M 30 130 Q 250 130 430 128 T 770 125"
            stroke="url(#pcBright)"
            strokeWidth="4"
            fill="none"
            filter="url(#pcGlow)"
            strokeLinecap="round"
          />
          {/* end dot */}
          <circle cx="770" cy="125" r="10" fill="#ff8ad1" filter="url(#pcGlow)" />
          <circle cx="770" cy="125" r="4" fill="#fff" />
          {/* labels */}
          <text x="30" y="22" fill="rgba(10,10,10,0.55)" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="1.5">ALL THE IDEAS</text>
          <text x="670" y="22" fill="#ff8ad1" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="1.5">YOUR PATH →</text>
        </svg>
      </div>
      <div className="pc-caption">
        The quiz doesn't give you a new idea. It picks the right one from the ones you already have, so you stop opening tabs and start finishing things.
      </div>
    </div>
  );
}

// ======================================================================
// NEW: DAY 2 , PRIMARY + SUPPORTING PAIR
// ======================================================================

function PrimarySupporting() {
  return (
    <div className="ps-wrap reveal" style={{ animationDelay: "420ms" }}>
      <div className="ps-badge">✦ What you get from the quiz</div>
      <div className="ps-cards">
        <div className="ps-card ps-primary">
          <div className="ps-card-label">01 · PRIMARY PATH</div>
          <div className="ps-card-title">The ONE thing</div>
          <div className="ps-card-body">A challenge, course, or system to focus on first. Most live in Standard. A few live in Premium.</div>
        </div>
        <div className="ps-connector">
          <div className="ps-plus">+</div>
        </div>
        <div className="ps-card ps-support">
          <div className="ps-card-label">02 · SUPPORTING RESOURCE</div>
          <div className="ps-card-title">The complement</div>
          <div className="ps-card-body">A tool or course that reinforces the primary. It's the layer that makes the first one stick.</div>
        </div>
      </div>
      <div className="ps-footer">That's it. Two things. Not seventeen.</div>
    </div>
  );
}

// ======================================================================
// DAY 3 , INFINITE VS FINITE GAME (generic)
// ======================================================================

function InfiniteVsFinite() {
  return (
    <div className="ivf-wrap reveal" style={{ animationDelay: "300ms" }}>
      <div className="ivf-badge">✦ The game you're inviting people into</div>
      <div className="ivf-grid">
        {/* Infinite side */}
        <div className="ivf-card ivf-infinite">
          <div className="ivf-svg">
            <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ivfInf" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#b26bff" />
                  <stop offset="100%" stopColor="#8effd5" />
                </linearGradient>
              </defs>
              <path
                d="M 30 40 C 30 20 50 20 60 40 C 70 60 90 60 90 40 C 90 20 70 20 60 40 C 50 60 30 60 30 40 Z"
                stroke="url(#ivfInf)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="ivf-label">Infinite game</div>
          <div className="ivf-offer">Recurring practice</div>
          <div className="ivf-body">Ongoing client relationships. No end date. Entry point = an ongoing visibility system (The Regulated Visibility Method) because that's the work you'd already be doing to find resonant clients on repeat.</div>
        </div>
        {/* Finite side */}
        <div className="ivf-card ivf-finite">
          <div className="ivf-svg">
            <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ivfFin" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff6bc1" />
                  <stop offset="100%" stopColor="#6bd5ff" />
                </linearGradient>
              </defs>
              <circle cx="22" cy="40" r="5" fill="#ff6bc1" />
              <line x1="22" y1="40" x2="95" y2="40" stroke="url(#ivfFin)" strokeWidth="3" strokeLinecap="round" />
              <polygon points="95,33 107,40 95,47" fill="#6bd5ff" />
            </svg>
          </div>
          <div className="ivf-label">Finite game</div>
          <div className="ivf-offer">High-touch container</div>
          <div className="ivf-body">Clear start, clear end, deep transformation. The Aligned Client Method is built for this. 5 days of depth, 30-90 min/day, one client at a time, a transformation that pre-qualifies your high-touch offer.</div>
        </div>
      </div>
      <div className="ivf-footer">Match the entry point to the game.</div>
    </div>
  );
}

// ======================================================================
// DAY 5 , SAME RESOURCE, TWO POSITIONS
// Shows how a single resource/asset can be deployed as FREE or PAID.
// ======================================================================

function SameToolTwoPositions() {
  return (
    <div className="sttp-wrap reveal" style={{ animationDelay: "300ms" }}>
      <div className="sttp-badge">✦ The positioning changes. The resource doesn't.</div>
      <div className="sttp-diagram">
        <svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sttpLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b26bff" />
              <stop offset="100%" stopColor="#ff8ad1" />
            </linearGradient>
          </defs>
          {/* center tool */}
          <rect x="200" y="70" width="100" height="40" rx="10" fill="#f7edeb" stroke="url(#sttpLine)" strokeWidth="2" />
          <text x="250" y="95" textAnchor="middle" fill="#0a0a0a" fontSize="12" fontFamily="Inter, sans-serif" letterSpacing="1">1 RESOURCE</text>
          {/* left branch to FREE */}
          <path d="M 200 90 Q 130 90 60 50" stroke="url(#sttpLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="60" cy="50" r="6" fill="#8effd5" />
          {/* right branch to PAID */}
          <path d="M 300 90 Q 370 90 440 50" stroke="url(#sttpLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="440" cy="50" r="6" fill="#ff8ad1" />
          {/* labels */}
          <text x="60" y="35" textAnchor="middle" fill="#8effd5" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="1.5">🎁 FREE</text>
          <text x="60" y="20" textAnchor="middle" fill="rgba(10,10,10,0.6)" fontSize="9" fontFamily="Inter, sans-serif">LEAD MAGNET</text>
          <text x="440" y="35" textAnchor="middle" fill="#ff8ad1" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="1.5">💎 PAID</text>
          <text x="440" y="20" textAnchor="middle" fill="rgba(10,10,10,0.6)" fontSize="9" fontFamily="Inter, sans-serif">MINI OFFER</text>
          {/* bottom labels */}
          <text x="60" y="80" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="Inter, sans-serif">grow audience</text>
          <text x="60" y="95" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="Inter, sans-serif">fill community</text>
          <text x="440" y="80" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="Inter, sans-serif">monetize</text>
          <text x="440" y="95" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="Inter, sans-serif">qualify leads</text>
        </svg>
      </div>
      <div className="sttp-caption">Every asset in The Practice Library can go either direction. You pick based on what your practice needs this month.</div>
    </div>
  );
}

// ======================================================================
// DAY 5 , RESOURCE GRID (visual preview of what's inside the community)
// that matches the vibe. Name the resource in 2–3 words (short is better).
// YOU actually have inside YOUR Skool. If you have fewer than 14, duplicate
// ======================================================================

function ResourceGrid() {
  const tiles = [
    { e: "🌊", n: "Window Map" },
    { e: "📋", n: "Intake Forms" },
    { e: "🤝", n: "Scope Scripts" },
    { e: "💰", n: "Pricing Kit" },
    { e: "🪞", n: "Session Templates" },
    { e: "📞", n: "Inquiry Replies" },
    { e: "🌿", n: "Welcome Sequence" },
    { e: "⚖️", n: "Contracts Pack" },
    { e: "🎁", n: "Lead Magnet Builder" },
    { e: "🌬️", n: "Breath Practice Lib" },
    { e: "📊", n: "Capacity Tracker" },
    { e: "✉️", n: "Termination Templates" },
    { e: "🔔", n: "Boundary Scripts" },
    { e: "🌱", n: "Onboarding Flow" },
    { e: "➕", n: "8+ more" },
  ];
  return (
    <div className="tg-wrap reveal" style={{ animationDelay: "420ms" }}>
      <div className="tg-badge">✦ Inside The Practice Library (a sample)</div>
      <div className="tg-grid">
        {tiles.map((t, i) => (
          <div
            key={i}
            className={`tg-tile ${i === tiles.length - 1 ? "tg-more" : ""}`}
            style={{ animationDelay: `${500 + i * 40}ms` }}
          >
            <div className="tg-e">{t.e}</div>
            <div className="tg-n">{t.n}</div>
          </div>
        ))}
      </div>
      <div className="tg-caption">22+ Practice Library assets and growing. You're not building from scratch. You're customizing tools written by a practitioner, for practitioners.</div>
    </div>
  );
}

// ======================================================================
// DAY 4 , GROWTH TRAJECTORY (before → after arrow)
// Generic "where you started → where you're going" visual. This replaces
// Amanda's South Node → North Node visual. Customize the labels to your modality.
// ======================================================================

function GrowthTrajectory() {
  return (
    <div className="na-wrap reveal" style={{ animationDelay: "420ms" }}>
      
      <div className="na-badge">✦ Your growth trajectory</div>
      <div className="na-diagram">
        <svg viewBox="0 0 500 140" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="naLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(10,10,10,0.35)" />
              <stop offset="70%" stopColor="#b26bff" />
              <stop offset="100%" stopColor="#8effd5" />
            </linearGradient>
            <filter id="naGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* starting point (faded) */}
          <circle cx="60" cy="70" r="24" fill="none" stroke="rgba(10,10,10,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="60" y="76" textAnchor="middle" fill="rgba(10,10,10,0.6)" fontSize="16">◦</text>
          <text x="60" y="115" textAnchor="middle" fill="rgba(10,10,10,0.55)" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="1">CURRENT WINDOW</text>
          <text x="60" y="130" textAnchor="middle" fill="rgba(10,10,10,0.4)" fontSize="9" fontFamily="Inter">where you can hold today</text>
          {/* arrow */}
          <path
            d="M 90 70 L 400 70"
            stroke="url(#naLine)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#naGlow)"
          />
          <polygon points="400,63 415,70 400,77" fill="#8effd5" filter="url(#naGlow)" />
          {/* growth label on arrow */}
          <text x="245" y="58" textAnchor="middle" fill="#c78fff" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="2">EXPANDING CAPACITY →</text>
          {/* destination (bright) */}
          <circle cx="440" cy="70" r="28" fill="none" stroke="#8effd5" strokeWidth="2" filter="url(#naGlow)" />
          <circle cx="440" cy="70" r="4" fill="#8effd5" />
          <text x="440" y="76" textAnchor="middle" fill="#0a0a0a" fontSize="18">✦</text>
          <text x="440" y="115" textAnchor="middle" fill="#8effd5" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="1">EXPANDED WINDOW</text>
          <text x="440" y="130" textAnchor="middle" fill="rgba(10,10,10,0.6)" fontSize="9" fontFamily="Inter">what you'll regulate inside next</text>
        </svg>
      </div>
      <div className="na-caption">The first time I doubled my rates, my body could not hold it. Six months of capacity work later, the same number didn't even register. Same number, different nervous system.</div>
    </div>
  );
}

// ======================================================================
// NEW: DAY 6 , 10 HALF-STARTED VS 1 SHIPPED
// ======================================================================

function HalfStartedVsShipped() {
  return (
    <div className="hss-wrap reveal" style={{ animationDelay: "300ms" }}>
      <div className="hss-badge">✦ Pick one. Ship one.</div>
      <div className="hss-grid">
        <div className="hss-side hss-half">
          <div className="hss-side-label">10 half-started things</div>
          <div className="hss-tiles">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="hss-tile-half"
                style={{
                  opacity: 0.25 + (i % 3) * 0.1,
                  transform: `rotate(${(i % 5) * 2 - 4}deg)`,
                }}
              >
                <div className="hss-tile-bar" style={{ width: `${20 + (i * 13) % 60}%` }} />
              </div>
            ))}
          </div>
          <div className="hss-side-caption">Still in drafts. Still "almost ready". Still invisible.</div>
        </div>
        <div className="hss-arrow">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hssArrow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff6bc1" />
                <stop offset="100%" stopColor="#8effd5" />
              </linearGradient>
            </defs>
            <path d="M 5 20 L 30 20" stroke="url(#hssArrow)" strokeWidth="3" strokeLinecap="round" fill="none" />
            <polygon points="28,14 38,20 28,26" fill="#8effd5" />
          </svg>
        </div>
        <div className="hss-side hss-ship">
          <div className="hss-side-label">1 shipped thing</div>
          <div className="hss-shipped">
            <div className="hss-shipped-check">✓</div>
            <div className="hss-shipped-bar" />
            <div className="hss-shipped-bar full" />
            <div className="hss-shipped-bar" />
          </div>
          <div className="hss-side-caption">Live. Public. Gaining momentum. Already building the next one on top of it.</div>
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// NEW: DAY 7 , REFERRAL MATH HERO
// ======================================================================

function ReferralMathHero() {
  const rows = [
    { n: "3", tier: "Premium", result: "your $7 is fully covered", color: "mint" },
    { n: "3", tier: "VIP", result: "about $56 a month coming back", color: "pink" },
    { n: "10", tier: "any tier", result: "real monthly income", color: "purple" },
  ];
  return (
    <div className="rm-wrap reveal" style={{ animationDelay: "300ms" }}>
      <div className="rm-badge">✦ The math (kind of wild)</div>
      <div className="rm-rows">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`rm-row rm-${r.color} reveal`}
            style={{ animationDelay: `${400 + i * 140}ms` }}
          >
            <div className="rm-num">{r.n}</div>
            <div className="rm-label">referrals to <strong>{r.tier}</strong></div>
            <div className="rm-equal">=</div>
            <div className="rm-result">{r.result}</div>
          </div>
        ))}
      </div>
      <div className="rm-footer">Your audience doesn't have to be huge. It just has to be the right people.</div>
    </div>
  );
}

// ======================================================================
// EXISTING COMPONENTS (preserved from v8)
// ======================================================================

function TierComparison() {
  return (
    <div className="tier-wrap">
      <div className="tier-intro">
        <div className="tier-intro-badge">✦ What's inside</div>
        <div className="tier-intro-title">Three levels, one community</div>
        <div className="tier-intro-sub">
          <a href={`https://skool.com/${CONFIG.SKOOL_HANDLE}/plans`} target="_blank" rel="noopener noreferrer" className="tier-link">Click here to see current availability ✦</a>
        </div>
      </div>
      <div className="tier-cards">
        {tiers.map((t, i) => (
          <div
            key={t.name}
            className={`tier-card tier-${t.style} reveal`}
            style={{ animationDelay: `${250 + i * 150}ms` }}
          >
            <div className="tier-name">{t.name}</div>
            <div className="tier-tagline">{t.tagline}</div>
            <div className="tier-desc">{t.desc}</div>
            <div className="tier-divider" />
            <div className="tier-items">
              {t.items.map((it, j) => (
                <div key={j} className="tier-item">
                  <span className="tier-item-icon">{it.icon}</span>
                  <span className="tier-item-text">{it.text}</span>
                </div>
              ))}
            </div>
            <div className="tier-cta">{t.cta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VipReadiness() {
  const signals = [
    { icon: "🌊", text: "Your practice is full or close to it, and you're hitting the ceiling of what your current capacity can hold" },
    { icon: "💎", text: "You're ready to raise your rates significantly and need someone in the room as your nervous system adjusts" },
    { icon: "🎯", text: "You're building (or rebuilding) a high-touch container, intensive, or retreat and want it dialed in 1:1" },
    { icon: "🤝", text: "You're done DIY-ing every business decision and want a regulated practitioner-mentor in the foxhole with you" },
  ];
  return (
    <div className="vip-ready-wrap">
      <div className="vip-ready-intro">
        <div className="vip-ready-badge">💎 Curious about {CONFIG.TIER_3_NAME}?</div>
        <div className="vip-ready-title">How to know you're ready</div>
        <div className="vip-ready-sub">
          {CONFIG.TIER_3_NAME} is bi-weekly 1:1 with {CONFIG.FOUNDER_FIRST_NAME}, designed to meet you where you're at. Most practitioners are good with {CONFIG.TIER_2_NAME} until one (or more) of these starts feeling true:
        </div>
      </div>
      <div className="vip-ready-grid">
        {signals.map((s, i) => (
          <div
            key={i}
            className="vip-ready-card reveal"
            style={{ animationDelay: `${220 + i * 110}ms` }}
          >
            <div className="vip-ready-icon">{s.icon}</div>
            <div className="vip-ready-text">{s.text}</div>
          </div>
        ))}
      </div>
      <div className="vip-ready-footer reveal" style={{ animationDelay: "700ms" }}>
        <span className="vip-ready-dot">✦</span>
        If that's you, <a href={`https://skool.com/${CONFIG.SKOOL_HANDLE}/plans`} target="_blank" rel="noopener noreferrer" className="vip-ready-link">click here to see current {CONFIG.TIER_3_NAME} availability</a>. If the tier is off and you're feeling the pull, feel free to DM me to see if I have space.
      </div>
    </div>
  );
}

function PathPicker({ picked, setPicked }) {
  const chosen = pathOptions.find((p) => p.id === picked);
  return (
    <div className="pathpicker">
      <div className="pp-question">
        <div className="pp-q-badge">✦ One question</div>
        <div className="pp-q-text">What do you actually want to call in?</div>
      </div>
      <div className="pp-options">
        {pathOptions.map((opt, i) => (
          <button
            key={opt.id}
            className={`pp-option reveal ${picked === opt.id ? "picked" : ""} ${picked && picked !== opt.id ? "dim" : ""}`}
            style={{ animationDelay: `${150 + i * 120}ms` }}
            onClick={() => setPicked(picked === opt.id ? null : opt.id)}
          >
            <div className="pp-option-text">{opt.question}</div>
            <div className="pp-option-arrow">→</div>
          </button>
        ))}
      </div>
      {chosen && (
        <div className="pp-result">
          <div className="pp-result-eyebrow">Your path →</div>
          <div className="pp-result-name">{chosen.path}</div>
          <div className="pp-result-tier">Lives in <strong>{chosen.tier}</strong></div>
          <div className="pp-result-points">
            {chosen.whyPoints.map((pt, i) => (
              <div key={i} className="pp-result-point">
                <span className="pp-point-dot">✦</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
          <div className="pp-result-cta">{chosen.cta}</div>
        </div>
      )}
    </div>
  );
}

function ChartFocus_Legacy_Deleted() { return null; } // PhilosophyTriad removed , was dead code, replaced with no-op to keep file stable

function FocusPoints() {
  const focus = [
    { label: "Window", desc: "Where regulation lives for you" },
    { label: "Activation", desc: "Which way you go when you leave it" },
    { label: "Return", desc: "Your 60-second move back" },
  ];
  const skip = ["Polyvagal Ladder", "Dorsal/Ventral Mapping", "Neuroception Drills", "Co-regulation Theory"];
  return (
    <div className="cf-wrap">
      <div className="cf-intro">
        <div className="cf-badge">✦ Polyvagal, simplified</div>
        <div className="cf-title">Focus here. Skip the rest for now.</div>
      </div>
      <div className="cf-grid">
        {focus.map((f, i) => (
          <div
            key={f.label}
            className="cf-focus-card reveal"
            style={{ animationDelay: `${260 + i * 130}ms` }}
          >
            <div className="cf-focus-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="cf-focus-label">{f.label}</div>
            <div className="cf-focus-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="cf-skip-row reveal" style={{ animationDelay: "700ms" }}>
        <span className="cf-skip-label">Skip for now:</span>
        {skip.map((s) => (
          <span key={s} className="cf-skip-chip">{s}</span>
        ))}
      </div>
    </div>
  );
}

function InviteWalkthrough() {
  return (
    <div className="iw-wrap">
      <div className="iw-intro">
        <div className="iw-badge">✦ How to grab your affiliate link</div>
        <div className="iw-title">3 clicks. That's the whole thing.</div>
      </div>
      <div className="iw-steps">
        <div className="iw-step reveal" style={{ animationDelay: "200ms" }}>
          <div className="iw-step-left">
            <div className="iw-step-num">01</div>
            <div className="iw-step-title">Find the sidebar</div>
            <div className="iw-step-desc">
              On the {CONFIG.COMMUNITY_NAME} community page, look to the right side, just below the group description and member count.
            </div>
          </div>
          <div className="iw-step-visual">
            <div className="mock-sidebar">
              <div className="mock-sb-banner">
                <div className="mock-sb-banner-title">✨ {CONFIG.COMMUNITY_NAME} ✨</div>
              </div>
              <div className="mock-sb-url">skool.com/{CONFIG.SKOOL_HANDLE}</div>
              <div className="mock-sb-desc">
                <div className="mock-sb-line" style={{ width: "85%" }} />
                <div className="mock-sb-line" style={{ width: "95%" }} />
                <div className="mock-sb-line" style={{ width: "60%" }} />
              </div>
              <div className="mock-sb-stats">
                {/* Fake-realistic member counts for the visual , these don't have to match your real numbers. */}
                <div className="mock-sb-stat"><div className="mock-sb-stat-num">281</div><div className="mock-sb-stat-lbl">Members</div></div>
                <div className="mock-sb-stat"><div className="mock-sb-stat-num">9</div><div className="mock-sb-stat-lbl">Online</div></div>
                <div className="mock-sb-stat"><div className="mock-sb-stat-num">2</div><div className="mock-sb-stat-lbl">Admins</div></div>
              </div>
              <div className="mock-sb-avatars">
                {[...Array(6)].map((_, i) => <div key={i} className="mock-sb-avatar" style={{ background: ["#ffb3d9","#b3d9ff","#d9b3ff","#b3ffd9","#ffd9b3","#d9ffb3"][i] }} />)}
              </div>
              <div className="mock-sb-btn-wrap">
                <div className="mock-sb-btn">INVITE PEOPLE</div>
                <div className="mock-sb-arrow">👈 click here</div>
              </div>
            </div>
          </div>
        </div>
        <div className="iw-step reveal" style={{ animationDelay: "380ms" }}>
          <div className="iw-step-left">
            <div className="iw-step-num">02</div>
            <div className="iw-step-title">Hit the INVITE PEOPLE button</div>
            <div className="iw-step-desc">
              A popup opens showing your personal affiliate link. (It's unique to you. Skool generates it automatically.)
            </div>
          </div>
          <div className="iw-step-visual">
            <div className="mock-popup">
              <div className="mock-pop-title">Invite people</div>
              <div className="mock-pop-body">
                Earn <span className="mock-pop-pct">40% commission for life</span> when you invite a friend to ✨ {CONFIG.COMMUNITY_NAME} ✨.
              </div>
              <div className="mock-pop-link-row">
                <div className="mock-pop-link">https://www.skool.com/{CONFIG.SKOOL_HANDLE}/about?ref=YOU</div>
                <div className="mock-pop-copy">COPY</div>
                <div className="mock-pop-arrow">👈 tap this</div>
              </div>
            </div>
          </div>
        </div>
        <div className="iw-step reveal" style={{ animationDelay: "560ms" }}>
          <div className="iw-step-left">
            <div className="iw-step-num">03</div>
            <div className="iw-step-title">Click COPY, and you're done 💚</div>
            <div className="iw-step-desc">
              That link is yours for life. Every person who joins any tier through it earns you 40% automatically. No tracking, no setup, no follow-up. Skool handles the whole thing on their end.
            </div>
          </div>
          <div className="iw-step-visual">
            <div className="mock-saved">
              <div className="mock-saved-check">✓</div>
              <div className="mock-saved-text">
                <div className="mock-saved-title">Link copied</div>
                <div className="mock-saved-sub">Paste it into a post, a DM, an email, wherever your people are.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="iw-outro reveal" style={{ animationDelay: "760ms" }}>
        <span className="iw-outro-dot">✦</span>
        Pro tip: save your link somewhere you'll actually find it again (phone notes, a pinned message to yourself, Notion). You'll use it more than you think. 💚
      </div>
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@400;500;600;700;800;900&display=swap');

*{margin:0;padding:0;box-sizing:border-box}

:root {
  --bg: #fbf2f1;
  --bg-2: #ffffff;
  --bg-3: #f6e8e6;
  --ink: #0a0a0a;
  --ink-soft: rgba(10,10,10,0.68);
  --ink-faint: rgba(10,10,10,0.42);
  --pink: #c58a9c;
  --pink-2: #ecccd4;
  --purple: #c9a449;
  --purple-2: #a07f30;
  --cyan: #c9a449;
  --mint: #c9a449;
  --lime: #c9a449;
  --cream: #ffffff;
  --cream-2: #ffffff;
  --ink-dark: #0a0a0a;
  --holo: linear-gradient(135deg,#e3c878 0%,#c9a449 50%,#a07f30 100%);
  --holo-2: linear-gradient(135deg,#c9a449,#a07f30);
  --card: #ffffff;
  --card-2: #faf0ef;
  --border: rgba(10,10,10,0.10);
  --border-strong: rgba(201,164,73,0.40);
}

.app{
  font-family:'Inter',sans-serif;
  height:100vh;
  display:flex;
  flex-direction:column;
  background:var(--bg);
  color:var(--ink);
  overflow:hidden;
  position:relative;
}

.app::before{
  content:'';
  position:fixed;
  inset:0;
  background:
    radial-gradient(ellipse at 15% 0%, rgba(201,164,73,0.05) 0%, transparent 45%),
    radial-gradient(ellipse at 85% 0%, rgba(201,164,73,0.035) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 100%, rgba(207,154,178,0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(201,164,73,0.03) 0%, transparent 45%);
  pointer-events:none;
  z-index:0;
  animation:aurora 25s ease-in-out infinite alternate;
}

.app::after{
  content:'';
  position:fixed;
  inset:0;
  background-image:
    linear-gradient(rgba(201,164,73,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,164,73,0.02) 1px, transparent 1px);
  background-size:60px 60px;
  pointer-events:none;
  z-index:0;
}
@keyframes aurora{
  0%{transform:translate(0,0) scale(1)}
  50%{transform:translate(-8px,12px) scale(1.03)}
  100%{transform:translate(8px,-8px) scale(1)}
}

.stars-bg{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}
.s-star{position:absolute;width:2px;height:2px;background:#c9a449;border-radius:50%;box-shadow:0 0 6px 1px rgba(201,164,73,0.6);animation:twinkle 4s ease-in-out infinite}
.s-star.lg{width:3px;height:3px;box-shadow:0 0 10px 2px rgba(201,164,73,0.6)}

.s-star.pink{background:#c9a449;box-shadow:0 0 8px 2px rgba(201,164,73,0.6)}
.s-star.cyan{background:#e3c878;box-shadow:0 0 8px 2px rgba(201,164,73,0.55)}
.s-star.mint{background:#c9a449;box-shadow:0 0 8px 2px rgba(201,164,73,0.5)}
@keyframes twinkle{
  0%,100%{opacity:0.06;transform:scale(0.8)}
  50%{opacity:0.35;transform:scale(1.1)}
}

/* ======== Celebration sparkles ======== */
.celebration{position:fixed;inset:0;pointer-events:none;z-index:200}
.celeb-spark{
  position:absolute;width:6px;height:6px;border-radius:50%;
  background:var(--holo);
  box-shadow:0 0 16px 4px rgba(201,164,73,0.9);
  animation:celeb-burst 1.5s cubic-bezier(.25,.9,.3,1) forwards;
}
@keyframes celeb-burst{
  0%{opacity:0;transform:scale(0) rotate(0) translateY(0)}
  20%{opacity:1;transform:scale(1.4) rotate(180deg) translateY(-40px)}
  100%{opacity:0;transform:scale(0.5) rotate(720deg) translateY(-220px)}
}

/* ======== Reveal animation ======== */
.reveal{
  opacity:0;
  animation:fadeup 0.55s cubic-bezier(.25,.9,.3,1) forwards;
}
@keyframes fadeup{
  from{opacity:0;transform:translateY(14px)}
  to{opacity:1;transform:translateY(0)}
}

/* ======== Top Bar ======== */
.topbar{
  background:linear-gradient(135deg, rgba(201,164,73,0.12) 0%, rgba(201,164,73,0.15) 50%, rgba(201,164,73,0.12) 100%);
  backdrop-filter:blur(12px);
  padding:0 24px;
  height:62px;
  display:flex;align-items:center;justify-content:space-between;
  flex-shrink:0;
  border-bottom:1px solid var(--border);
  position:relative;z-index:10;
}
.topbar::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%);pointer-events:none}
.topbar-left{display:flex;align-items:center;gap:12px;position:relative;z-index:1}
.topbar-icon{
  width:38px;height:38px;border-radius:12px;background:var(--holo);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;color:#0a0a0a;
  box-shadow:0 4px 16px rgba(201,164,73,0.4),inset 0 1px 0 rgba(255,255,255,0.3);
}
.topbar-title{font-family:'Playfair Display',serif;font-weight:700;font-size:19px;color:var(--ink);letter-spacing:0.2px}
.topbar-title em{font-style:italic;background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.topbar-nav{display:flex;gap:28px;position:relative;z-index:1}
.topbar-link{font-size:12px;color:var(--ink-faint);text-decoration:none;padding:20px 0;border-bottom:2px solid transparent;transition:all .15s;cursor:default;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.topbar-link.active{color:var(--ink);border-bottom-color:var(--pink)}
.mobile-toggle{display:none;background:none;border:none;color:var(--ink);font-size:22px;cursor:pointer;padding:4px}

/* ======== Layout ======== */
.layout{flex:1;display:flex;overflow:hidden;position:relative;z-index:2}

/* ======== Sidebar ======== */
.sidebar{
  width:300px;min-width:300px;
  background:rgba(255,255,255,0.82);
  backdrop-filter:blur(14px);
  border-right:1px solid var(--border);
  display:flex;flex-direction:column;overflow:hidden;
}
.side-header{
  padding:24px 22px 20px;
  background:linear-gradient(180deg, rgba(201,164,73,0.08) 0%, transparent 100%);
  border-bottom:1px solid var(--border);
}
.side-eyebrow{
  font-family:'Inter',sans-serif;
  font-size:9px;letter-spacing:2.5px;text-transform:uppercase;
  color:var(--pink);margin-bottom:8px;font-weight:500;
}
.side-title{font-family:'Playfair Display',serif;font-weight:700;font-size:17px;color:var(--ink);margin-bottom:16px;line-height:1.35}
.side-prog-row{display:flex;align-items:center;gap:10px}
.side-prog-bg{flex:1;height:6px;background:rgba(10,10,10,0.08);border-radius:100px;overflow:hidden;position:relative}
.side-prog-fill{
  height:100%;
  background:var(--holo);
  border-radius:100px;
  transition:width .5s cubic-bezier(.34,1.56,.64,1);
  box-shadow:0 0 12px rgba(201,164,73,0.5);
  position:relative;
}
.side-prog-fill.shimmer::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent);
  animation:shimmer-pass 1.4s ease;
}
@keyframes shimmer-pass{
  0%{transform:translateX(-100%)}
  100%{transform:translateX(100%)}
}
.side-prog-pct{font-family:'Inter',sans-serif;font-size:11px;font-weight:500;color:var(--ink-soft);min-width:34px;text-align:right}

.side-list{flex:1;overflow-y:auto;padding:12px 12px 24px}
.side-item{
  display:flex;align-items:center;gap:10px;
  padding:12px 14px;border-radius:12px;
  cursor:pointer;transition:all .15s;margin-bottom:3px;position:relative;
}
.side-item:hover{background:rgba(255,255,255,0.04)}
.side-item.active{
  background:linear-gradient(135deg, rgba(201,164,73,0.12), rgba(201,164,73,0.12));
  border:1px solid var(--border);
}
.side-item-emoji{font-size:14px;flex-shrink:0;opacity:0.85}
.side-item-title{flex:1;font-size:13px;color:var(--ink-soft);font-weight:500;line-height:1.35}
.side-item.active .side-item-title{color:var(--ink);font-weight:700}
.side-check{
  width:22px;height:22px;min-width:22px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  transition:all .25s;
}
.side-check.pending{border:2px solid rgba(201,164,73,0.35)}
.side-check.done{
  background:var(--holo);border:none;
  box-shadow:0 2px 12px rgba(201,164,73,0.5), 0 0 20px rgba(201,164,73,0.3);
  animation:check-pop .4s cubic-bezier(.34,1.56,.64,1);
}
@keyframes check-pop{
  0%{transform:scale(0.7)}
  60%{transform:scale(1.2)}
  100%{transform:scale(1)}
}

/* ======== Main ======== */
.main{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
.main-inner{max-width:820px;padding:36px 44px 80px}

.lesson-meta-row{
  display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;
}
.lesson-num-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  font-weight:500;text-transform:uppercase;
}
.lesson-mode-chip{
  font-family:'Inter',sans-serif;font-size:9.5px;letter-spacing:1.6px;
  text-transform:uppercase;font-weight:500;
  padding:5px 11px;border-radius:50px;
  border:1px solid;
}
.lesson-mode-chip.has-video{
  color:var(--mint);border-color:rgba(201,164,73,0.35);
  background:rgba(201,164,73,0.06);
}
.lesson-mode-chip.quick-day{
  color:var(--pink-2);border-color:rgba(201,164,73,0.35);
  background:rgba(201,164,73,0.06);
}
.lesson-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:24px}
.day-nav{
  display:flex;gap:8px;overflow-x:auto;padding:2px 2px 16px;
  -webkit-overflow-scrolling:touch;scrollbar-width:none;
}
.day-nav::-webkit-scrollbar{display:none}
.day-pill{
  flex-shrink:0;cursor:pointer;white-space:nowrap;
  font-family:'Inter',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.3px;
  padding:9px 16px;border-radius:100px;
  background:#ffffff;color:var(--ink-soft);
  border:1px solid rgba(10,10,10,0.12);
  transition:all .2s;
}
.day-pill:hover{border-color:rgba(201,164,73,0.5);color:#0a0a0a}
.day-pill.done{color:#a07f30}
.day-pill.active{
  background:var(--holo);color:#0a0a0a;border-color:transparent;font-weight:800;
  box-shadow:0 4px 14px rgba(201,164,73,0.3);
}
.lesson-title{
  font-family:'Playfair Display',serif;font-weight:800;
  font-size:clamp(26px,3.2vw,38px);line-height:1.12;
  color:var(--ink);letter-spacing:-0.4px;
}
.lesson-emoji{font-size:0.85em;margin-right:4px;display:inline-block;filter:drop-shadow(0 2px 10px rgba(201,164,73,0.4))}
.accent-gradient{
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  font-style:italic;font-weight:900;
}
.lesson-top-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;margin-top:6px}
.lesson-done-top{
  display:inline-flex;align-items:center;gap:6px;
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:1.5px;font-weight:500;
  padding:9px 16px;border-radius:50px;border:none;cursor:pointer;transition:all .2s;
}
.lesson-done-top.pending{background:rgba(255,255,255,0.04);color:var(--ink-soft);border:1px solid var(--border)}
.lesson-done-top.pending:hover{background:rgba(255,255,255,0.08);border-color:var(--border-strong)}
.lesson-done-top.complete{background:var(--holo);color:#0a0a0a;box-shadow:0 4px 16px rgba(201,164,73,0.4)}

/* ======== Tabs ======== */
.tabs{
  display:flex;gap:6px;padding:4px;
  background:rgba(201,164,73,0.10);
  border:1px solid var(--border);
  border-radius:14px;margin-bottom:32px;
  backdrop-filter:blur(10px);
  overflow-x:auto;
}
.tab{
  display:flex;align-items:center;gap:6px;
  padding:10px 18px;border:none;background:transparent;
  color:var(--ink-faint);cursor:pointer;
  font-family:'Inter',sans-serif;font-weight:700;font-size:13px;
  border-radius:10px;transition:all .2s;
  letter-spacing:0.2px;white-space:nowrap;
}
.tab:hover{color:var(--ink-soft);background:rgba(255,255,255,0.03)}
.tab.active{
  background:var(--holo);color:#0a0a0a;
  box-shadow:0 3px 14px rgba(201,164,73,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
}
.tab-icon{font-size:13px}
.tab-label{font-size:13px}

/* ======== Tab content ======== */
.tab-content{animation:tab-fade .35s ease}
@keyframes tab-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.pane{display:flex;flex-direction:column;gap:16px}

/* ======== Overview: description + hero callout ======== */
.lesson-desc{
  font-size:16px;line-height:1.85;color:var(--ink-soft);
  padding:20px 22px;
  background:rgba(255,255,255,0.035);
  border-left:3px solid var(--purple);
  border-radius:0 14px 14px 0;
}

.hero-callout{
  position:relative;padding:32px 28px;margin:10px 0;
  background:var(--cream);
  color:var(--ink-dark);
  border-radius:20px;
  box-shadow:0 12px 48px rgba(201,164,73,0.25), 0 0 0 1px rgba(255,255,255,0.4) inset;
  overflow:hidden;
}
.hero-callout::before{
  content:'';position:absolute;top:-50%;right:-30%;
  width:70%;height:200%;
  background:radial-gradient(ellipse,rgba(201,164,73,0.15),transparent 70%);
  pointer-events:none;
}
.hero-mark{
  position:absolute;top:8px;left:18px;
  font-family:'Playfair Display',serif;font-size:80px;line-height:1;
  color:var(--purple);opacity:0.22;font-weight:900;pointer-events:none;
}
.hero-text{
  position:relative;z-index:1;
  font-family:'Playfair Display',serif;font-style:italic;font-weight:600;
  font-size:clamp(18px,2.2vw,24px);line-height:1.45;
  color:#141414;
}

/* ======== Tier Comparison ======== */
.tier-wrap{margin-top:28px}
.tier-intro{text-align:center;margin-bottom:20px}
.tier-intro-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:8px;
}
.tier-intro-title{
  font-family:'Playfair Display',serif;font-weight:800;font-size:27px;color:var(--ink);margin-bottom:6px;letter-spacing:-0.2px;
}
.tier-intro-sub{font-size:13px;color:var(--ink-faint)}
.tier-link{color:var(--cyan);font-weight:600}

.tier-cards{
  display:grid;grid-template-columns:repeat(3,1fr);gap:14px;
  margin-top:8px;
}
.tier-card{
  border-radius:18px;padding:22px 20px;
  position:relative;overflow:hidden;
  transition:all .35s cubic-bezier(.34,1.56,.64,1);
  display:flex;flex-direction:column;
}
.tier-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(201,164,73,0.3)}

.tier-light{
  background:var(--cream);
  color:var(--ink-dark);
  box-shadow:0 8px 32px rgba(201,164,73,0.15), 0 0 0 1px rgba(255,255,255,0.4) inset;
}
.tier-light .tier-name{color:var(--ink-dark)}
.tier-light .tier-tagline{color:rgba(10,10,10,0.6)}
.tier-light .tier-desc{color:rgba(10,10,10,0.7)}
.tier-light .tier-item-text{color:rgba(10,10,10,0.82)}
.tier-light .tier-cta{color:var(--purple);border-top:1px dashed rgba(201,164,73,0.3)}
.tier-light .tier-divider{background:rgba(201,164,73,0.2)}

.tier-dark{
  background:linear-gradient(160deg, #ffffff 0%, #faf0ee 100%);
  border:1px solid rgba(201,164,73,0.45);
  color:var(--ink);
  box-shadow:0 8px 28px rgba(201,164,73,0.14);
}
.tier-dark .tier-cta{color:#a07f30;border-top:1px dashed rgba(201,164,73,0.4)}
.tier-dark .tier-divider{background:rgba(10,10,10,0.12)}

.tier-holo{
  background:
    linear-gradient(160deg, rgba(201,164,73,0.14), rgba(201,164,73,0.10)),
    #ffffff;
  border:1px solid rgba(201,164,73,0.45);
  color:var(--ink);
  box-shadow:0 10px 36px rgba(201,164,73,0.18);
  position:relative;
}
.tier-holo::before{
  content:'';position:absolute;inset:0;border-radius:18px;padding:1px;
  background:var(--holo);
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  pointer-events:none;opacity:0.6;
}
.tier-holo .tier-name{background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.tier-holo .tier-cta{color:#a07f30;border-top:1px dashed rgba(201,164,73,0.4)}
.tier-holo .tier-divider{background:rgba(201,164,73,0.25)}

.tier-name{
  font-family:'Playfair Display',serif;font-weight:800;font-size:26px;
  letter-spacing:-0.3px;margin-bottom:4px;
}
.tier-tagline{
  font-family:'Playfair Display',serif;font-style:italic;font-weight:500;
  font-size:13px;color:var(--ink-soft);margin-bottom:10px;line-height:1.3;
}
.tier-desc{font-size:12.5px;color:var(--ink-faint);line-height:1.5;margin-bottom:14px}
.tier-divider{height:1px;margin-bottom:14px;background:rgba(201,164,73,0.25)}
.tier-items{display:flex;flex-direction:column;gap:9px;flex:1;margin-bottom:14px}
.tier-item{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;line-height:1.4}
.tier-item-icon{flex-shrink:0;font-size:14px;margin-top:1px}
.tier-item-text{color:var(--ink-soft);flex:1}

.tier-cta{
  padding-top:12px;
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:1.5px;
  text-transform:uppercase;font-weight:500;
}

/* Clickable tier link */
a.tier-link{
  color:var(--cyan);font-weight:600;text-decoration:none;
  font-family:'Inter',sans-serif;font-size:12px;letter-spacing:1.2px;
  text-transform:uppercase;
  padding:6px 14px;border-radius:50px;
  border:1px solid rgba(201,164,73,0.35);
  background:rgba(201,164,73,0.06);
  display:inline-block;
  transition:all .2s;
}
a.tier-link:hover{
  background:rgba(201,164,73,0.15);border-color:rgba(201,164,73,0.55);
  transform:translateY(-1px);
}

/* ======== VIP Readiness (Day 6) ======== */
.vip-ready-wrap{
  margin-top:28px;padding:28px 26px;
  border-radius:22px;
  background:
    linear-gradient(160deg, rgba(201,164,73,0.12), rgba(201,164,73,0.07)),
    linear-gradient(160deg, #ffffff 0%, #faf0ee 100%);
  border:1px solid rgba(201,164,73,0.35);
  position:relative;overflow:hidden;
}
.vip-ready-wrap::before{
  content:'';position:absolute;top:-80px;left:-40px;
  width:220px;height:220px;
  background:radial-gradient(circle,rgba(201,164,73,0.18),transparent 70%);
  pointer-events:none;
}
.vip-ready-wrap::after{
  content:'';position:absolute;bottom:-60px;right:-30px;
  width:180px;height:180px;
  background:radial-gradient(circle,rgba(201,164,73,0.12),transparent 70%);
  pointer-events:none;
}
.vip-ready-intro{text-align:center;margin-bottom:22px;position:relative;z-index:1}
.vip-ready-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  text-transform:uppercase;font-weight:500;margin-bottom:8px;
}
.vip-ready-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);letter-spacing:-0.3px;margin-bottom:8px;
}
.vip-ready-sub{
  font-size:13.5px;line-height:1.65;color:var(--ink-soft);
  max-width:520px;margin:0 auto;
}
.vip-ready-grid{
  display:grid;grid-template-columns:repeat(2,1fr);gap:12px;
  position:relative;z-index:1;
}
.vip-ready-card{
  display:flex;gap:14px;align-items:flex-start;
  padding:16px 18px;border-radius:14px;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--border);
  transition:all .25s;
}
.vip-ready-card:hover{
  transform:translateY(-2px);
  background:rgba(255,255,255,0.06);
  border-color:var(--border-strong);
  box-shadow:0 8px 24px rgba(201,164,73,0.18);
}
.vip-ready-icon{
  font-size:22px;line-height:1;flex-shrink:0;margin-top:2px;
  filter:drop-shadow(0 3px 10px rgba(201,164,73,0.3));
}
.vip-ready-text{
  font-size:13.5px;line-height:1.55;color:var(--ink);
  font-family:'Inter',sans-serif;font-weight:500;
}
.vip-ready-footer{
  margin-top:18px;padding:14px 18px;border-radius:12px;
  background:rgba(255,255,255,0.035);
  border:1px dashed rgba(201,164,73,0.3);
  font-size:13px;line-height:1.65;color:var(--ink-soft);
  position:relative;z-index:1;
}
.vip-ready-dot{color:var(--pink);margin-right:6px;font-weight:700}
a.vip-ready-link{
  color:var(--mint);font-weight:700;text-decoration:none;
  border-bottom:1px dashed rgba(201,164,73,0.4);
  transition:all .2s;
}
a.vip-ready-link:hover{color:var(--cyan);border-bottom-color:var(--cyan)}

/* ======== Philosophy Triad (Day 1) ======== */
.triad-wrap{margin-top:24px;position:relative}
.triad-intro{text-align:center;margin-bottom:22px}
.triad-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;
}
.triad-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:14px;
  position:relative;z-index:1;
}
.triad-card{
  position:relative;
  padding:28px 20px 24px;border-radius:20px;
  background:linear-gradient(160deg,var(--cream) 0%,var(--cream-2) 100%);
  color:var(--ink-dark);text-align:center;
  box-shadow:0 8px 28px rgba(201,164,73,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset;
  transition:all .35s cubic-bezier(.34,1.56,.64,1);
  overflow:hidden;
}
.triad-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:var(--holo);opacity:0.85;
}
.triad-card:hover{transform:translateY(-5px) scale(1.02);box-shadow:0 14px 38px rgba(201,164,73,0.28)}
.triad-emoji{
  font-size:36px;line-height:1;margin-bottom:10px;
  filter:drop-shadow(0 4px 12px rgba(201,164,73,0.3));
  animation:triad-float 4s ease-in-out infinite;
}
.triad-card:nth-child(2) .triad-emoji{animation-delay:.8s}
.triad-card:nth-child(3) .triad-emoji{animation-delay:1.6s}
@keyframes triad-float{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
}
.triad-label{
  font-family:'Inter',sans-serif;font-weight:900;font-size:18px;
  color:var(--ink-dark);letter-spacing:-0.2px;margin-bottom:4px;
}
.triad-sub{font-size:12.5px;color:#5d5280;line-height:1.45;font-weight:500}
.triad-ring{display:none}

/* ======== Chart Focus (Day 5) ======== */
.cf-wrap{margin-top:18px;position:relative}
.cf-intro{text-align:center;margin-bottom:20px}
.cf-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.cf-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:20px;color:var(--ink);
  letter-spacing:-0.2px;
}
.cf-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;
}
.cf-focus-card{
  position:relative;
  padding:24px 18px 22px;border-radius:18px;
  background:linear-gradient(160deg,#ffffff 0%,#faf0ee 100%);
  border:1px solid rgba(201,164,73,0.35);
  text-align:center;
  transition:all .3s cubic-bezier(.34,1.56,.64,1);
  overflow:hidden;
}
.cf-focus-card::before{
  content:'';position:absolute;inset:0;border-radius:18px;padding:1px;
  background:var(--holo);opacity:0.5;
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  pointer-events:none;
}
.cf-focus-card::after{
  content:'';position:absolute;top:-40px;left:50%;transform:translateX(-50%);
  width:110px;height:110px;border-radius:50%;
  background:radial-gradient(circle,rgba(201,164,73,0.22),transparent 70%);
  pointer-events:none;
}
.cf-focus-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(201,164,73,0.3)}
.cf-focus-num{
  font-family:'Inter',sans-serif;font-size:11px;letter-spacing:2px;
  color:var(--pink-2);margin-bottom:6px;font-weight:500;
  position:relative;z-index:1;
}
.cf-focus-label{
  font-family:'Inter',sans-serif;font-weight:900;font-size:22px;
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  letter-spacing:-0.3px;margin-bottom:4px;
  position:relative;z-index:1;
}
.cf-focus-desc{
  font-size:12.5px;color:var(--ink-soft);line-height:1.45;
  position:relative;z-index:1;
}
.cf-skip-row{
  display:flex;flex-wrap:wrap;align-items:center;gap:8px;
  padding:14px 18px;border-radius:14px;
  background:rgba(255,255,255,0.03);
  border:1px dashed rgba(201,164,73,0.25);
}
.cf-skip-label{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;
  color:var(--ink-faint);text-transform:uppercase;font-weight:500;
  margin-right:4px;
}
.cf-skip-chip{
  padding:4px 11px;border-radius:50px;
  background:rgba(255,255,255,0.04);
  font-size:11.5px;color:var(--ink-faint);font-weight:600;
  letter-spacing:0.2px;
  text-decoration:line-through;
  text-decoration-color:rgba(201,164,73,0.5);
  text-decoration-thickness:1.5px;
}

/* ======== Invite Walkthrough (Day 7) ======== */
.iw-wrap{
  padding:26px 22px;border-radius:22px;
  background:linear-gradient(160deg, rgba(201,164,73,0.08), rgba(201,164,73,0.08));
  border:1px solid rgba(201,164,73,0.25);
  position:relative;overflow:hidden;
}
.iw-wrap::before{
  content:'';position:absolute;top:-80px;right:-40px;
  width:220px;height:220px;
  background:radial-gradient(circle,rgba(201,164,73,0.15),transparent 70%);
  pointer-events:none;
}
.iw-intro{text-align:center;margin-bottom:22px;position:relative;z-index:1}
.iw-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--mint);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.iw-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);letter-spacing:-0.3px;
}
.iw-steps{display:flex;flex-direction:column;gap:14px;position:relative;z-index:1}
.iw-step{
  display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center;
  padding:20px 22px;border-radius:16px;
  background:rgba(255,255,255,0.035);
  border:1px solid var(--border);
}
.iw-step-left{display:flex;flex-direction:column;gap:6px}
.iw-step-num{
  font-family:'Inter',sans-serif;font-size:12px;letter-spacing:2px;
  color:var(--mint);font-weight:500;
}
.iw-step-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:17px;
  color:var(--ink);letter-spacing:-0.2px;line-height:1.25;
}
.iw-step-desc{font-size:13.5px;line-height:1.65;color:var(--ink-soft)}
.iw-step-visual{display:flex;align-items:center;justify-content:center;min-height:180px}

/* ---- Mock Skool sidebar (Step 1) ---- */
.mock-sidebar{
  width:100%;max-width:260px;
  background:#fff;border-radius:14px;padding:12px;
  box-shadow:0 8px 28px rgba(0,0,0,0.25);
  font-family:'Inter',sans-serif;
  color:#0a0a0a;
}
.mock-sb-banner{
  height:70px;border-radius:10px;margin-bottom:10px;
  background:linear-gradient(135deg,#e3c878 0%,#c9a449 50%,#a07f30 100%);
  display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.mock-sb-banner::before{
  content:'';position:absolute;top:20%;right:10%;width:20px;height:20px;
  background:radial-gradient(circle,#fff,transparent 70%);opacity:0.6;
}
.mock-sb-banner-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:10px;
  color:#0a0a0a;text-align:center;line-height:1.2;font-weight:800;
}
.mock-sb-url{font-size:10px;color:#888;margin-bottom:8px}
.mock-sb-desc{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
.mock-sb-line{height:6px;background:#e8e3f0;border-radius:3px}
.mock-sb-stats{
  display:flex;justify-content:space-around;padding:8px 0;
  border-top:1px solid #eee;border-bottom:1px solid #eee;margin-bottom:8px;
}
.mock-sb-stat{text-align:center}
.mock-sb-stat-num{font-family:'Inter',sans-serif;font-weight:700;font-size:13px;color:#0a0a0a;line-height:1}
.mock-sb-stat-lbl{font-size:8px;color:#888;margin-top:2px}
.mock-sb-avatars{display:flex;gap:-4px;margin-bottom:10px;justify-content:center}
.mock-sb-avatar{
  width:20px;height:20px;border-radius:50%;border:2px solid #fff;
  margin-left:-4px;
}
.mock-sb-avatar:first-child{margin-left:0}
.mock-sb-btn-wrap{position:relative}
.mock-sb-btn{
  padding:10px 14px;border:2px solid #e8a84d;border-radius:8px;
  text-align:center;font-family:'Inter',sans-serif;font-weight:700;
  font-size:11px;color:#8a7355;letter-spacing:0.5px;
  animation:iw-pulse 2s ease-in-out infinite;
}
@keyframes iw-pulse{
  0%,100%{box-shadow:0 0 0 0 rgba(232,168,77,0.4)}
  50%{box-shadow:0 0 0 8px rgba(232,168,77,0)}
}
.mock-sb-arrow{
  position:absolute;top:50%;right:-90px;transform:translateY(-50%);
  font-family:'Playfair Display',serif;font-style:italic;font-size:12px;
  color:var(--mint);white-space:nowrap;font-weight:600;
}

/* ---- Mock popup (Step 2) ---- */
.mock-popup{
  width:100%;max-width:300px;
  background:#fff;border-radius:14px;padding:20px 18px;
  box-shadow:0 12px 40px rgba(0,0,0,0.35);
  font-family:'Inter',sans-serif;color:#0a0a0a;
}
.mock-pop-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:14px;
  color:#0a0a0a;margin-bottom:10px;
}
.mock-pop-body{
  font-size:11px;line-height:1.5;color:#444;margin-bottom:14px;
}
.mock-pop-pct{color:#22a566;font-weight:700}
.mock-pop-link-row{
  display:flex;gap:0;border:1px solid #e8e3f0;border-radius:6px;
  overflow:hidden;position:relative;align-items:stretch;
}
.mock-pop-link{
  flex:1;padding:8px 10px;font-size:9.5px;color:#5e8fd4;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  font-family:'Inter',sans-serif;
  display:flex;align-items:center;
}
.mock-pop-copy{
  padding:8px 14px;background:#f4d98a;color:#8a7355;
  font-weight:700;font-size:10px;letter-spacing:0.5px;
  display:flex;align-items:center;justify-content:center;
  animation:iw-pulse-gold 2s ease-in-out infinite;
}
@keyframes iw-pulse-gold{
  0%,100%{background:#f4d98a}
  50%{background:#ffd560}
}
.mock-pop-arrow{
  position:absolute;top:50%;right:-90px;transform:translateY(-50%);
  font-family:'Playfair Display',serif;font-style:italic;font-size:12px;
  color:var(--mint);white-space:nowrap;font-weight:600;
}

/* ---- Mock "saved" confirmation (Step 3) ---- */
.mock-saved{
  display:flex;gap:14px;align-items:flex-start;
  width:100%;max-width:300px;
  padding:18px 20px;border-radius:14px;
  background:linear-gradient(135deg, rgba(201,164,73,0.2), rgba(201,164,73,0.08));
  border:1px solid rgba(201,164,73,0.4);
}
.mock-saved-check{
  width:32px;height:32px;border-radius:50%;
  background:var(--mint);color:#f7edeb;
  display:flex;align-items:center;justify-content:center;
  font-weight:900;font-size:16px;flex-shrink:0;
  box-shadow:0 0 20px rgba(201,164,73,0.5);
}
.mock-saved-text{flex:1}
.mock-saved-title{
  font-family:'Inter',sans-serif;font-weight:700;font-size:14px;
  color:var(--mint);margin-bottom:3px;
}
.mock-saved-sub{font-size:12.5px;color:var(--ink-soft);line-height:1.5}

.iw-outro{
  margin-top:16px;padding:14px 18px;border-radius:12px;
  background:rgba(201,164,73,0.08);
  border:1px dashed rgba(201,164,73,0.35);
  font-size:13px;line-height:1.6;color:var(--ink-soft);
  position:relative;z-index:1;
}
.iw-outro-dot{color:var(--mint);margin-right:6px;font-weight:700}

/* ======== Accordion ======== */
.concept-wrap{width:100%}
.accordion{
  border-radius:14px;overflow:hidden;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--border);
  transition:all .25s;
}
.accordion:hover{background:rgba(255,255,255,0.06);border-color:var(--border-strong)}
.accordion.open{
  background:rgba(255,255,255,0.07);
  border-color:rgba(201,164,73,0.45);
  box-shadow:0 8px 24px rgba(201,164,73,0.12);
}
.accordion-btn{
  width:100%;display:flex;align-items:center;justify-content:space-between;
  gap:16px;padding:16px 20px;
  background:transparent;border:none;cursor:pointer;
  color:var(--ink);text-align:left;
  font-family:'Inter',sans-serif;
}
.accordion-left{display:flex;align-items:center;gap:12px;flex:1}
.accordion-icon{font-size:18px;flex-shrink:0}
.accordion-headline{
  font-family:'Playfair Display',serif;font-weight:700;font-size:17px;
  line-height:1.35;color:var(--ink);letter-spacing:-0.1px;
}
.accordion-chev{
  font-family:'Inter',sans-serif;font-size:22px;line-height:1;
  color:var(--purple-2);font-weight:400;
  transition:transform .25s;width:24px;text-align:center;
}
.accordion.open .accordion-chev{color:var(--pink)}
.accordion-panel{
  overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1);
}
.accordion-body{
  padding:0 20px 18px;
  font-size:14.5px;line-height:1.75;color:var(--ink-soft);
  font-family:'Inter',sans-serif;
}
.accordion-list{
  list-style:none;counter-reset:acc;margin:0;padding:0;
  display:flex;flex-direction:column;gap:11px;
}
.accordion-list li{
  counter-increment:acc;position:relative;padding-left:38px;
  font-size:14.5px;line-height:1.6;color:var(--ink-soft);
}
.accordion-list li::before{
  content:counter(acc);position:absolute;left:0;top:1px;
  width:24px;height:24px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-family:'Inter',sans-serif;font-size:12px;font-weight:800;color:#a07f30;
  background:rgba(201,164,73,0.14);border:1px solid rgba(201,164,73,0.4);
}
.accordion-after{margin-top:14px;font-size:14.5px;line-height:1.7;color:var(--ink-soft);font-weight:600}

/* ======== Pull Quote ======== */
.pullquote{
  position:relative;padding:28px 32px 28px 70px;
  background:linear-gradient(135deg, #fdf6f4, #f7ece9, #fdf6f4);
  border-radius:18px;
  border:1px solid var(--border-strong);
  overflow:hidden;margin:4px 0;
}
.pullquote::before{
  content:'';position:absolute;top:-40px;right:-40px;
  width:140px;height:140px;
  background:radial-gradient(circle, rgba(201,164,73,0.2) 0%, transparent 70%);
  pointer-events:none;
}
.pullquote-mark{
  position:absolute;top:10px;left:18px;
  font-family:'Playfair Display',serif;font-size:72px;line-height:1;
  color:var(--pink);opacity:0.5;font-weight:900;pointer-events:none;
}
.pullquote-text{
  position:relative;z-index:1;
  font-family:'Playfair Display',serif;font-style:italic;font-weight:600;
  font-size:clamp(16px,2vw,20px);line-height:1.5;
  color:var(--ink);
}

/* ======== Callout ======== */
.callout{border-radius:16px;padding:22px 24px;margin:4px 0;position:relative;overflow:hidden}
.callout-white{
  background:var(--cream-2);color:var(--ink-dark);
  box-shadow:0 8px 28px rgba(201,164,73,0.15), 0 0 0 1px rgba(255,255,255,0.5) inset;
}
.callout-white .callout-headline{color:var(--ink-dark);font-family:'Playfair Display',serif;font-weight:700;font-size:18px;margin-bottom:8px;letter-spacing:-0.2px}
.callout-white .callout-body{color:rgba(10,10,10,0.7);font-size:14px;line-height:1.7}
.callout-white::before{
  content:'';position:absolute;top:0;left:0;width:4px;height:100%;
  background:var(--holo);
}
.callout-gradient{
  background:linear-gradient(135deg, rgba(201,164,73,0.18), rgba(201,164,73,0.18));
  border:1px solid var(--border-strong);
  color:var(--ink);
}
.callout-gradient .callout-headline{color:var(--ink);font-family:'Playfair Display',serif;font-weight:700;font-size:18px;margin-bottom:8px;letter-spacing:-0.2px}
.callout-gradient .callout-body{color:var(--ink-soft);font-size:14px;line-height:1.7}
.callout-gradient::before{
  content:'✦';position:absolute;top:14px;right:16px;
  color:var(--pink);opacity:0.5;font-size:16px;
}

/* ======== Path Picker ======== */
.pathpicker{
  padding:28px;border-radius:22px;
  background:linear-gradient(145deg, rgba(201,164,73,0.08), rgba(201,164,73,0.06));
  border:1px solid var(--border);
  position:relative;overflow:hidden;
}
.pathpicker::before{
  content:'';position:absolute;top:-60px;left:-30px;
  width:180px;height:180px;
  background:radial-gradient(circle,rgba(201,164,73,0.15),transparent 70%);
  pointer-events:none;
}
.pp-question{text-align:center;margin-bottom:22px;position:relative;z-index:1}
.pp-q-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.pp-q-text{
  font-family:'Inter',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);letter-spacing:-0.3px;
}
.pp-options{display:flex;flex-direction:column;gap:10px;position:relative;z-index:1}
.pp-option{
  width:100%;padding:18px 22px;
  background:var(--cream-2);color:var(--ink-dark);
  border:2px solid transparent;border-radius:14px;
  cursor:pointer;transition:all .25s cubic-bezier(.34,1.56,.64,1);
  display:flex;align-items:center;justify-content:space-between;gap:14px;
  font-family:'Inter',sans-serif;font-weight:700;font-size:15px;text-align:left;
  box-shadow:0 4px 16px rgba(201,164,73,0.12);
}
.pp-option:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,164,73,0.2)}
.pp-option.picked{
  background:var(--holo);color:#0a0a0a;border-color:#0a0a0a;
  box-shadow:0 8px 28px rgba(201,164,73,0.4);
}
.pp-option.dim{opacity:0.45;transform:scale(0.98)}
.pp-option-arrow{
  font-family:'Inter',sans-serif;font-size:18px;
  color:var(--purple);transition:transform .2s;
}
.pp-option.picked .pp-option-arrow{color:#0a0a0a;transform:translateX(4px)}

.pp-result{
  margin-top:20px;padding:22px 24px;
  background:linear-gradient(160deg, #ffffff 0%, #faf0ee 100%);
  border:1px solid var(--border-strong);
  border-radius:16px;
  animation:fadeup .45s cubic-bezier(.25,.9,.3,1);
  position:relative;z-index:1;
}
.pp-result-eyebrow{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--mint);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.pp-result-name{
  font-family:'Inter',sans-serif;font-weight:800;font-size:20px;
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  margin-bottom:6px;letter-spacing:-0.2px;
}
.pp-result-tier{font-size:12.5px;color:var(--ink-soft);margin-bottom:16px}
.pp-result-tier strong{color:var(--pink-2)}
.pp-result-points{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.pp-result-point{display:flex;gap:10px;font-size:13.5px;color:var(--ink-soft);line-height:1.5}
.pp-point-dot{color:var(--pink);flex-shrink:0;margin-top:1px;font-size:11px}
.pp-result-cta{
  font-family:'Inter',sans-serif;font-size:11px;letter-spacing:1.5px;
  color:var(--mint);text-transform:uppercase;font-weight:500;
  padding-top:12px;border-top:1px dashed rgba(201,164,73,0.3);
}

/* ======== Philosophy Triad (Day 1) ======== */
.triad-wrap{margin-top:22px}
.triad-intro{text-align:center;margin-bottom:16px}
.triad-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--mint);text-transform:uppercase;font-weight:500;
}
.triad-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:14px;
  position:relative;padding:8px 0;
}
.triad-ring{
  position:absolute;inset:10% 12%;
  border-radius:50%;
  background:radial-gradient(ellipse, rgba(201,164,73,0.15), transparent 60%);
  pointer-events:none;z-index:0;
  animation:triad-pulse 4s ease-in-out infinite alternate;
}
@keyframes triad-pulse{
  0%{opacity:0.4;transform:scale(0.95)}
  100%{opacity:0.8;transform:scale(1.05)}
}
.triad-card{
  position:relative;z-index:1;
  background:var(--cream-2);color:var(--ink-dark);
  border-radius:18px;padding:22px 18px;text-align:center;
  box-shadow:0 8px 24px rgba(201,164,73,0.15), 0 0 0 1px rgba(255,255,255,0.5) inset;
  transition:all .3s cubic-bezier(.34,1.56,.64,1);
}
.triad-card:hover{transform:translateY(-4px) rotate(-1deg);box-shadow:0 14px 32px rgba(201,164,73,0.25)}
.triad-card:nth-child(2):hover{transform:translateY(-4px) rotate(0deg)}
.triad-card:nth-child(3):hover{transform:translateY(-4px) rotate(1deg)}
.triad-emoji{font-size:34px;line-height:1;margin-bottom:10px;filter:drop-shadow(0 2px 10px rgba(201,164,73,0.3))}
.triad-label{
  font-family:'Inter',sans-serif;font-weight:800;font-size:16px;
  color:var(--ink-dark);letter-spacing:-0.2px;margin-bottom:4px;
}
.triad-sub{
  font-family:'Playfair Display',serif;font-style:italic;font-weight:500;
  font-size:12.5px;color:rgba(10,10,10,0.6);line-height:1.35;
}

/* ======== Chart Focus (Day 5) ======== */
.cf-wrap{margin-top:22px;padding:26px;border-radius:22px;
  background:linear-gradient(145deg, rgba(201,164,73,0.08), rgba(201,164,73,0.08));
  border:1px solid var(--border);position:relative;overflow:hidden;
}
.cf-wrap::before{
  content:'';position:absolute;top:-50px;right:-50px;
  width:160px;height:160px;
  background:radial-gradient(circle,rgba(201,164,73,0.12),transparent 70%);
  pointer-events:none;
}
.cf-intro{text-align:center;margin-bottom:16px;position:relative;z-index:1}
.cf-badge{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.cf-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:19px;
  color:var(--ink);letter-spacing:-0.3px;
}
.cf-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:10px;
  position:relative;z-index:1;margin-bottom:18px;
}
.cf-focus-card{
  background:var(--cream-2);color:var(--ink-dark);
  border-radius:14px;padding:18px 14px;text-align:center;
  box-shadow:0 6px 18px rgba(201,164,73,0.15), 0 0 0 1px rgba(255,255,255,0.4) inset;
  transition:all .25s;position:relative;
}
.cf-focus-card::before{
  content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:30%;height:3px;
  background:var(--holo);border-radius:0 0 6px 6px;
}
.cf-focus-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(201,164,73,0.22)}
.cf-focus-num{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:1.5px;
  color:var(--purple);margin-bottom:6px;font-weight:500;
}
.cf-focus-label{
  font-family:'Inter',sans-serif;font-weight:800;font-size:17px;
  color:var(--ink-dark);letter-spacing:-0.2px;margin-bottom:4px;
}
.cf-focus-desc{
  font-family:'Playfair Display',serif;font-style:italic;font-weight:500;
  font-size:12px;color:rgba(10,10,10,0.6);line-height:1.35;
}
.cf-skip-row{
  display:flex;align-items:center;gap:8px;flex-wrap:wrap;
  padding:14px 16px;border-radius:12px;
  background:rgba(0,0,0,0.2);border:1px dashed rgba(201,164,73,0.25);
  position:relative;z-index:1;
}
.cf-skip-label{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:1.5px;
  color:var(--ink-faint);text-transform:uppercase;font-weight:500;margin-right:4px;
}
.cf-skip-chip{
  font-size:11.5px;color:var(--ink-faint);
  padding:4px 10px;border-radius:50px;
  background:rgba(255,255,255,0.04);
  text-decoration:line-through;text-decoration-color:rgba(201,164,73,0.5);
  text-decoration-thickness:1.5px;
}

/* ======== Actions pane ======== */
.actions-pane{gap:12px}
.actions-lead{
  margin:40px 0 16px;padding-top:26px;
  border-top:1px solid rgba(10,10,10,0.08);
}
.actions-lead-badge{
  font-family:'Playfair Display',serif;font-size:23px;font-weight:700;
  color:#0a0a0a;letter-spacing:-0.3px;margin-bottom:6px;
}
.actions-lead-text{font-size:13.5px;line-height:1.6;color:var(--ink-soft)}

.action-card{
  display:flex;gap:16px;padding:18px 22px;
  background:var(--cream-2);
  border-radius:14px;
  box-shadow:0 4px 18px rgba(201,164,73,0.1), 0 0 0 1px rgba(255,255,255,0.4) inset;
  transition:all .25s;
}
.action-card:hover{transform:translateX(4px);box-shadow:0 6px 24px rgba(201,164,73,0.18)}
.action-num{
  font-family:'Inter',sans-serif;font-size:14px;font-weight:500;
  color:var(--purple);
  min-width:32px;padding-top:2px;
  letter-spacing:1px;
}
.action-text{
  font-size:14.5px;line-height:1.65;color:var(--ink-dark);
  flex:1;font-family:'Inter',sans-serif;font-weight:500;
}

/* ======== Prompt pane ======== */
.prompt-intro{font-size:14px;line-height:1.65;color:var(--ink-soft);padding:0 4px}
.page-label{font-family:'Playfair Display',serif;font-size:23px;font-weight:700;color:#0a0a0a;letter-spacing:-0.3px;margin:40px 0 16px;padding-top:26px;border-top:1px solid rgba(10,10,10,0.08)}
.prompt-box{
  background:linear-gradient(135deg, #fdf6f4, #f7ece9, #fdf6f4);
  border-radius:18px;padding:26px;position:relative;
  border:1px solid var(--border-strong);overflow:hidden;
}
.prompt-box::before{
  content:'';position:absolute;top:-60px;right:-60px;
  width:180px;height:180px;
  background:radial-gradient(circle, rgba(201,164,73,0.18) 0%, transparent 70%);
  pointer-events:none;
}
.prompt-box::after{
  content:'';position:absolute;bottom:-40px;left:-40px;
  width:140px;height:140px;
  background:radial-gradient(circle, rgba(201,164,73,0.12) 0%, transparent 70%);
  pointer-events:none;
}
.prompt-hdr{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:18px;position:relative;z-index:1;
}
.prompt-badge{
  font-family:'Inter',sans-serif;font-size:9px;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--cyan);font-weight:500;
}
.prompt-copy-btn{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:0.5px;
  font-weight:600;color:#0a0a0a;background:var(--holo);
  padding:8px 16px;border-radius:8px;border:none;cursor:pointer;transition:all .15s;
  box-shadow:0 2px 12px rgba(201,164,73,0.4);
}
.prompt-copy-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(201,164,73,0.55)}
.prompt-text{
  font-family:'Inter',sans-serif;font-size:12px;line-height:1.9;
  color:rgba(10,10,10,0.78);white-space:pre-wrap;
  position:relative;z-index:1;
}

/* ======== Bottom + footer ======== */
.lesson-bottom{
  margin-top:40px;padding-top:28px;
  border-top:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;gap:16px;
}
.bottom-done-btn{
  display:inline-flex;align-items:center;gap:8px;
  font-family:'Inter',sans-serif;font-weight:800;font-size:14px;
  padding:14px 30px;border-radius:50px;border:none;cursor:pointer;transition:all .2s;
  letter-spacing:0.3px;
}
.bottom-done-btn.pending{
  background:var(--holo);color:#0a0a0a;
  box-shadow:0 6px 24px rgba(201,164,73,0.4),inset 0 1px 0 rgba(255,255,255,0.25);
}
.bottom-done-btn.pending:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(201,164,73,0.55)}
.bottom-done-btn.complete{background:rgba(201,164,73,0.15);color:var(--pink);border:1px solid var(--border-strong)}
.bottom-next{
  display:inline-flex;align-items:center;gap:6px;
  font-size:13px;color:var(--ink-soft);cursor:pointer;transition:color .15s;
  background:none;border:none;font-family:'Inter',sans-serif;font-weight:600;
}
.bottom-next:hover{color:var(--cyan)}

.lesson-footer{margin-top:52px;padding-top:28px;border-top:1px solid var(--border);text-align:center}
.lf-brand{font-family:'Inter',sans-serif;font-weight:700;font-size:15px;color:var(--ink);margin-bottom:6px}
.lf-brand em{font-style:italic;background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.lf-details{font-size:11px;color:var(--ink-faint);margin-bottom:4px}
.lf-links{font-size:11px;color:var(--ink-faint)}
.lf-links a{color:var(--purple-2);text-decoration:none}
.lf-links a:hover{color:var(--pink)}
.lf-credit{font-family:'Inter',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);margin-top:10px;opacity:0.7}

/* ======== Scrollbars ======== */
.side-list::-webkit-scrollbar,.main::-webkit-scrollbar{width:4px}
.side-list::-webkit-scrollbar-thumb,.main::-webkit-scrollbar-thumb{background:rgba(201,164,73,0.3);border-radius:2px}
.side-list::-webkit-scrollbar-track,.main::-webkit-scrollbar-track{background:transparent}

/* ======== Mobile ======== */
@media(max-width:900px){
  .tier-cards{grid-template-columns:1fr;gap:14px}
  .triad-grid{grid-template-columns:1fr;gap:12px}
  .cf-grid{grid-template-columns:1fr;gap:10px}
  .vip-ready-grid{grid-template-columns:1fr;gap:10px}
  .iw-step{grid-template-columns:1fr;gap:18px}
  .mock-sb-arrow,.mock-pop-arrow{position:static;transform:none;margin-top:8px;text-align:center;display:block}
}
@media(max-width:768px){
  .topbar-nav{display:none}
  .mobile-toggle{display:block}
  .layout{position:relative}
  .sidebar{position:absolute;left:0;top:0;bottom:0;z-index:100;transform:translateX(-100%);transition:transform .25s ease;box-shadow:4px 0 24px rgba(0,0,0,0.5)}
  .sidebar.open{transform:translateX(0)}
  .sidebar-overlay{display:none;position:absolute;inset:0;background:rgba(0,0,0,0.6);z-index:99}
  .sidebar-overlay.show{display:block}
  .main-inner{padding:28px 22px 80px}
  .lesson-top{flex-direction:column;gap:10px}
  .lesson-bottom{flex-direction:column;gap:12px;align-items:stretch}
  .bottom-done-btn{justify-content:center}
  .bottom-next{justify-content:center}
  .tabs{margin-left:-6px;margin-right:-6px;padding-left:4px;padding-right:4px}
  .tab{padding:9px 14px;font-size:12px}
  .accordion-headline{font-size:14.5px}
  .hero-text{font-size:17px}
  .pullquote{padding:24px 22px 24px 60px}
}


/* ======================================================================
   NEW COMPONENTS FOR V9
   ====================================================================== */

/* ===== MISSION CARD (Day 1) ===== */
.mission-wrap{margin-top:32px}
.mission-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--pink);margin-bottom:12px;display:flex;align-items:center;gap:6px;
}
.mission-card{
  position:relative;
  background:linear-gradient(135deg, #ffffff 0%, #faf0ee 60%, #ffffff 100%);
  border:1px solid var(--border-strong);
  border-radius:24px;
  padding:38px 40px 42px;
  overflow:hidden;
  display:grid;grid-template-columns:120px 1fr;gap:28px;align-items:center;
}
.mission-card::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse at 30% 120%, rgba(201,164,73,0.28) 0%, transparent 55%),
    radial-gradient(ellipse at 70% -10%, rgba(201,164,73,0.12) 0%, transparent 50%);
  pointer-events:none;
}
.mission-flame-bg{position:relative;z-index:1;display:flex;align-items:center;justify-content:center}
.mission-flame-bg svg{width:100%;max-width:120px;height:auto;filter:drop-shadow(0 0 24px rgba(201,164,73,0.4))}
.mission-body{position:relative;z-index:1}
.mission-line-1{
  font-family:'Playfair Display',serif;font-weight:600;font-style:italic;
  font-size:22px;line-height:1.3;color:var(--ink);margin-bottom:10px;
  letter-spacing:-0.3px;
}
.mission-hl{
  background:var(--holo);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  font-weight:700;font-style:normal;
}
.mission-hl-alt{
  color:var(--mint);font-weight:700;font-style:normal;
}
.mission-line-2{
  font-size:14.5px;line-height:1.7;color:var(--ink-soft);margin-bottom:22px;
}
.mission-divider{
  height:1px;background:linear-gradient(90deg, transparent, var(--border-strong), transparent);
  margin:4px 0 18px;
}
.mission-line-3{
  font-size:13.5px;line-height:1.7;color:var(--ink-soft);margin-bottom:14px;
  font-family:'Inter',sans-serif;
}
.mission-punch{
  font-family:'Inter',sans-serif;font-weight:900;font-style:italic;
  font-size:24px;letter-spacing:-0.3px;
  background:var(--holo);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  line-height:1.2;
}

/* ===== ABOUT FOUNDER CARD (Day 1) ===== */
.aa-wrap{margin-top:30px}
.aa-card{
  position:relative;
  background:linear-gradient(135deg, var(--cream-2) 0%, var(--cream) 100%);
  border-radius:20px;
  padding:26px 30px 26px 26px;
  display:grid;grid-template-columns:88px 1fr;gap:22px;align-items:center;
  box-shadow:0 12px 40px rgba(201,164,73,0.18), 0 2px 6px rgba(0,0,0,0.2);
  overflow:hidden;
}
.aa-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:var(--holo);
}
.aa-avatar{
  position:relative;
  width:88px;height:88px;
  border-radius:50%;
  padding:3px;
  background:var(--holo);
  flex-shrink:0;
}
.aa-avatar-inner{
  width:100%;height:100%;border-radius:50%;
  background:linear-gradient(135deg, #e3c878 0%, #c9a449 100%);
  display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.aa-avatar-inner::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(circle at 30% 30%, rgba(201,164,73,0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(201,164,73,0.2) 0%, transparent 50%);
}
.aa-initials{
  position:relative;z-index:1;
  font-family:'Playfair Display',serif;font-weight:700;font-style:italic;
  font-size:30px;
  background:var(--holo);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  letter-spacing:-1px;
}
.aa-sparkle{
  position:absolute;top:-2px;right:-4px;
  font-size:18px;color:var(--pink);
  filter:drop-shadow(0 0 6px rgba(201,164,73,0.6));
  animation:aaSparkle 2.5s ease-in-out infinite;
}
@keyframes aaSparkle{
  0%,100%{transform:scale(1) rotate(0deg);opacity:0.9}
  50%{transform:scale(1.15) rotate(15deg);opacity:1}
}
.aa-body{min-width:0}
.aa-eyebrow{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2.5px;
  text-transform:uppercase;font-weight:500;
  color:#b26bff;margin-bottom:10px;
}
.aa-bio{
  font-size:14.5px;line-height:1.7;color:var(--ink-dark);
  font-family:'Inter',sans-serif;font-weight:500;
}
.aa-bio strong{
  font-weight:800;color:#b26bff;
}
.aa-sig{
  margin-top:10px;
  font-family:'Playfair Display',serif;font-weight:400;font-style:italic;
  font-size:13px;color:var(--ink-dark);opacity:0.7;letter-spacing:0.2px;
}

/* ===== OLD BARGAIN CARD (Day 1) ===== */
.bargain-wrap{margin-top:30px}
.bargain-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--cyan);margin-bottom:12px;
}
.bargain-card{
  position:relative;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%),
    linear-gradient(135deg, #faf0ee, #ffffff);
  border:1px solid var(--border);
  border-radius:20px;
  padding:36px 40px;
  overflow:hidden;
}
.bargain-card::before{
  content:'';position:absolute;inset:0;
  background-image:
    repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201,164,73,0.025) 20px, rgba(201,164,73,0.025) 21px);
  pointer-events:none;
}
.bargain-header{position:relative;z-index:1;display:flex;align-items:center;gap:16px;margin-bottom:16px}
.bargain-stamp{
  font-family:'Inter',sans-serif;font-weight:500;font-size:11px;letter-spacing:3px;
  color:#ff6bc1;border:2px solid #ff6bc1;border-radius:4px;
  padding:4px 10px;transform:rotate(-8deg);opacity:0.75;
}
.bargain-title{
  font-family:'Playfair Display',serif;font-weight:700;font-size:30px;
  color:var(--ink);letter-spacing:-0.5px;
  text-decoration:line-through;
  text-decoration-color:rgba(201,164,73,0.55);
  text-decoration-thickness:2px;
}
.bargain-body{
  position:relative;z-index:1;
  font-size:15.5px;line-height:1.75;color:var(--ink-soft);margin-bottom:22px;
}
.bargain-forms{position:relative;z-index:1;margin-bottom:22px}
.bargain-form-label{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ink-faint);margin-bottom:10px;font-weight:500;
}
.bargain-form-tags{display:flex;flex-wrap:wrap;gap:7px}
.b-tag{
  font-size:12px;font-weight:600;
  padding:6px 12px;border-radius:100px;
  background:rgba(201,164,73,0.08);
  border:1px solid rgba(201,164,73,0.25);
  color:var(--pink-2);
  letter-spacing:0.2px;
}
.bargain-break{
  position:relative;z-index:1;
  padding-top:18px;border-top:1px solid var(--border);
  display:flex;justify-content:center;
}
.bargain-break-line{
  font-family:'Inter',sans-serif;font-weight:800;font-style:italic;
  font-size:20px;
  background:var(--holo);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  letter-spacing:-0.3px;
}

/* ===== VALUES TRIAD (Day 1) ===== */
.values-wrap{margin-top:32px}
.values-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--mint);margin-bottom:8px;
}
.values-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:20px;
  color:var(--ink);margin-bottom:18px;letter-spacing:-0.3px;
}
.values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.value-card{
  position:relative;
  background:var(--card-2);
  border:1px solid var(--border);
  border-radius:18px;
  padding:24px 22px;
  overflow:hidden;
  transition:all .2s;
}
.value-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--holo);
}
.value-card.value-pink::before{background:linear-gradient(90deg,#ff6bc1,#ff8ad1)}
.value-card.value-mint::before{background:linear-gradient(90deg,#8effd5,#6bd5ff)}
.value-card.value-cyan::before{background:linear-gradient(90deg,#6bd5ff,#b26bff)}
.value-card:hover{transform:translateY(-2px);border-color:var(--border-strong)}
.value-icon{font-size:28px;margin-bottom:14px}
.value-headline{display:flex;flex-direction:column;gap:2px;margin-bottom:14px}
.value-over{
  font-family:'Inter',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);letter-spacing:-0.3px;line-height:1.1;
}
.value-over-sep{
  font-family:'Inter',sans-serif;font-size:9px;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--ink-faint);font-weight:500;
  margin:2px 0;
}
.value-under{
  font-family:'Playfair Display',serif;font-weight:400;font-style:italic;
  font-size:16px;color:var(--ink-soft);opacity:0.7;
  text-decoration:line-through;text-decoration-thickness:1px;
  text-decoration-color:rgba(10,10,10,0.35);
}
.value-body{
  font-size:13px;line-height:1.7;color:var(--ink-soft);
}

/* ===== CATEGORY MAP (Day 1) ===== */
.catmap-wrap{margin-top:30px}
.catmap-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--purple-2);margin-bottom:8px;
}
.catmap-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:20px;
  color:var(--ink);margin-bottom:16px;letter-spacing:-0.3px;
}
.catmap-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.catmap-card{
  background:var(--card-2);
  border:1px solid var(--border);
  border-radius:14px;
  padding:18px 14px;
  text-align:center;
  transition:all .2s;
  position:relative;
  overflow:hidden;
}
.catmap-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
}
.catmap-purple::before{background:linear-gradient(90deg,#b26bff,#c78fff)}
.catmap-pink::before{background:linear-gradient(90deg,#ff6bc1,#ff8ad1)}
.catmap-lime::before{background:linear-gradient(90deg,#d4ff00,#8effd5)}
.catmap-cyan::before{background:linear-gradient(90deg,#6bd5ff,#b26bff)}
.catmap-mint::before{background:linear-gradient(90deg,#8effd5,#d4ff00)}
.catmap-card:hover{transform:translateY(-2px);border-color:var(--border-strong)}
.catmap-emoji{font-size:26px;margin-bottom:8px}
.catmap-name{
  font-family:'Inter',sans-serif;font-weight:700;font-size:13px;
  color:var(--ink);margin-bottom:6px;letter-spacing:-0.2px;line-height:1.2;
}
.catmap-desc{
  font-size:11.5px;line-height:1.5;color:var(--ink-soft);
}

/* ===== FIRE STREAK CARD (Day 1) ===== */
.fire-wrap{margin-top:30px}
.fire-card{
  background:linear-gradient(135deg, rgba(201,164,73,0.08) 0%, rgba(201,164,73,0.08) 100%);
  border:1px solid var(--border);
  border-radius:20px;
  padding:28px 32px;
  display:grid;grid-template-columns:1fr auto;gap:32px;align-items:center;
  overflow:hidden;position:relative;
}
.fire-left{position:relative;z-index:1}
.fire-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--pink);margin-bottom:6px;
}
.fire-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:18px;
  color:var(--ink);margin-bottom:10px;letter-spacing:-0.3px;
}
.fire-body{
  font-size:13.5px;line-height:1.7;color:var(--ink-soft);
}
.fire-visual{
  position:relative;width:220px;min-width:220px;
  display:flex;flex-direction:column;align-items:center;
}
.fire-bars{
  display:flex;align-items:flex-end;gap:3px;
  width:220px;height:70px;padding:6px;
  background:rgba(0,0,0,0.15);border-radius:10px;
  border:1px solid var(--border);
}
.fire-bar{
  flex:1;background:linear-gradient(180deg, #ff6bc1, #b26bff);
  border-radius:2px;opacity:0;
  animation:fireBarUp .5s ease forwards;
  box-shadow:0 0 6px rgba(201,164,73,0.4);
}
@keyframes fireBarUp{
  from{opacity:0;transform:scaleY(0.3);transform-origin:bottom}
  to{opacity:1;transform:scaleY(1);transform-origin:bottom}
}
.fire-streak-label{
  font-family:'Inter',sans-serif;font-size:9px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ink-faint);margin-top:6px;font-weight:500;
}
.fire-emoji-float{
  position:absolute;top:-4px;right:-6px;
  font-size:28px;
  animation:fireFloat 2.4s ease-in-out infinite;
  filter:drop-shadow(0 0 10px rgba(201,164,73,0.6));
}
@keyframes fireFloat{
  0%,100%{transform:translateY(0) rotate(-3deg)}
  50%{transform:translateY(-6px) rotate(3deg)}
}

/* ===== ABOUT PAGE RECORDING GUIDE (Day 1) ===== */
.recguide-wrap{margin-top:32px;border:1px dashed rgba(201,164,73,0.4);border-radius:16px;overflow:hidden}
.recguide-banner{
  display:flex;align-items:center;justify-content:space-between;gap:14px;
  padding:18px 22px;cursor:pointer;
  background:linear-gradient(135deg, rgba(199,143,255,0.08), rgba(201,164,73,0.06));
  transition:background .2s;
}
.recguide-banner:hover{background:linear-gradient(135deg, rgba(199,143,255,0.14), rgba(201,164,73,0.1))}
.recguide-banner-left{display:flex;align-items:center;gap:14px;flex:1}
.recguide-icon{
  width:42px;height:42px;border-radius:12px;
  background:var(--holo);display:flex;align-items:center;justify-content:center;font-size:20px;
  box-shadow:0 4px 14px rgba(201,164,73,0.4);
}
.recguide-eyebrow{
  font-family:'Inter',sans-serif;font-size:9px;letter-spacing:2px;
  text-transform:uppercase;color:var(--purple-2);font-weight:500;margin-bottom:3px;
}
.recguide-title{
  font-family:'Inter',sans-serif;font-weight:700;font-size:14.5px;
  color:var(--ink);letter-spacing:-0.2px;
}
.recguide-chev{
  font-family:'Inter',sans-serif;font-weight:400;font-size:24px;color:var(--ink-soft);
  width:32px;height:32px;display:flex;align-items:center;justify-content:center;
  border-radius:50%;background:rgba(255,255,255,0.04);
}
.recguide-body{
  padding:22px 28px 28px;
  background:rgba(15,9,34,0.5);
  border-top:1px solid var(--border);
}
.recguide-intro{
  font-size:14px;line-height:1.7;color:var(--ink-soft);margin-bottom:22px;
  padding:14px 18px;background:rgba(255,255,255,0.02);border-radius:10px;
  border-left:3px solid var(--purple);
}
.recguide-timeline{display:flex;flex-direction:column;gap:10px}
.recguide-row{
  display:grid;grid-template-columns:44px 1fr;gap:14px;
  padding:14px 16px;background:rgba(255,255,255,0.02);border-radius:10px;
  border:1px solid var(--border);
}
.recguide-n{
  font-family:'Inter',sans-serif;font-weight:600;font-size:14px;
  color:var(--purple-2);text-align:center;padding-top:2px;letter-spacing:0.5px;
}
.recguide-beat-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:5px}
.recguide-beat{
  font-family:'Inter',sans-serif;font-weight:700;font-size:14px;
  color:var(--ink);letter-spacing:-0.2px;
}
.recguide-time{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:1.5px;
  color:var(--cyan);font-weight:500;text-transform:uppercase;flex-shrink:0;
}
.recguide-note{
  font-size:13px;line-height:1.65;color:var(--ink-soft);
}
.recguide-outro{
  margin-top:18px;padding:14px 18px;
  background:linear-gradient(135deg, rgba(201,164,73,0.06), rgba(201,164,73,0.04));
  border-radius:10px;font-size:13px;line-height:1.65;color:var(--ink-soft);
  border:1px solid var(--border);
}

/* ===== PATH CONVERGENCE (Day 2) ===== */
.pc-wrap{margin-top:30px}
.pc-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--pink);margin-bottom:12px;
}
.pc-visual{
  background:linear-gradient(135deg, #ffffff 0%, #f7edeb 100%);
  border:1px solid var(--border);
  border-radius:18px;
  padding:26px 30px;
  overflow:hidden;
}
.pc-visual svg{width:100%;height:auto;display:block}
.pc-caption{
  margin-top:14px;font-size:13.5px;line-height:1.7;color:var(--ink-soft);
  font-style:italic;text-align:center;padding:0 18px;
}

/* ===== PRIMARY + SUPPORTING (Day 2) ===== */
.ps-wrap{margin-top:30px}
.ps-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--cyan);margin-bottom:14px;
}
.ps-cards{
  display:grid;grid-template-columns:1fr 50px 1fr;gap:14px;align-items:stretch;
}
.ps-card{
  background:var(--card-2);
  border:1px solid var(--border);
  border-radius:18px;
  padding:22px 24px;
  position:relative;overflow:hidden;
  transition:all .2s;
}
.ps-card.ps-primary{border-color:rgba(201,164,73,0.4)}
.ps-card.ps-primary::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#ff6bc1,#b26bff)}
.ps-card.ps-support{border-color:rgba(201,164,73,0.4)}
.ps-card.ps-support::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#6bd5ff,#8effd5)}
.ps-card-label{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ink-faint);font-weight:500;margin-bottom:8px;
}
.ps-card-title{
  font-family:'Inter',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);margin-bottom:10px;letter-spacing:-0.3px;
}
.ps-card-body{
  font-size:13.5px;line-height:1.65;color:var(--ink-soft);
}
.ps-connector{display:flex;align-items:center;justify-content:center}
.ps-plus{
  font-family:'Inter',sans-serif;font-weight:300;font-size:36px;
  color:var(--purple-2);opacity:0.7;
}
.ps-footer{
  margin-top:16px;text-align:center;
  font-family:'Playfair Display',serif;font-style:italic;font-size:15px;
  color:var(--ink-soft);
}

/* ===== INFINITE VS FINITE (Day 3) ===== */
.ivf-wrap{margin-top:30px}
.ivf-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--mint);margin-bottom:14px;
}
.ivf-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ivf-card{
  background:var(--card-2);
  border:1px solid var(--border);
  border-radius:18px;
  padding:26px 26px 24px;
  text-align:center;position:relative;overflow:hidden;
}
.ivf-card.ivf-infinite{border-top:3px solid #b26bff}
.ivf-card.ivf-finite{border-top:3px solid #ff6bc1}
.ivf-svg{margin-bottom:14px}
.ivf-svg svg{width:120px;height:80px}
.ivf-label{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ink-faint);font-weight:500;margin-bottom:4px;
}
.ivf-offer{
  font-family:'Inter',sans-serif;font-weight:800;font-size:18px;
  color:var(--ink);margin-bottom:10px;letter-spacing:-0.3px;
}
.ivf-body{
  font-size:13px;line-height:1.7;color:var(--ink-soft);
}
.ivf-footer{
  margin-top:16px;text-align:center;
  font-family:'Playfair Display',serif;font-style:italic;font-size:15px;
  color:var(--ink-soft);
}

/* ===== SAME TOOL TWO POSITIONS (Day 4) ===== */
.sttp-wrap{margin-top:30px}
.sttp-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--cyan);margin-bottom:14px;
}
.sttp-diagram{
  background:linear-gradient(135deg, #ffffff, #f7edeb);
  border:1px solid var(--border);border-radius:18px;
  padding:28px 24px;
}
.sttp-diagram svg{width:100%;height:auto;max-height:180px;display:block}
.sttp-caption{
  margin-top:14px;font-size:13.5px;line-height:1.7;color:var(--ink-soft);
  font-style:italic;text-align:center;padding:0 18px;
}

/* ===== TREASURE GRID (Day 4) ===== */
.tg-wrap{margin-top:30px}
.tg-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--purple-2);margin-bottom:14px;
}
.tg-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.tg-tile{
  aspect-ratio:1;
  background:var(--card-2);
  border:1px solid var(--border);
  border-radius:12px;
  padding:10px 6px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  text-align:center;
  transition:all .2s;
  opacity:0;
  animation:tgIn .4s ease forwards;
}
@keyframes tgIn{
  from{opacity:0;transform:scale(0.85)}
  to{opacity:1;transform:scale(1)}
}
.tg-tile:hover{transform:translateY(-2px);border-color:var(--border-strong)}
.tg-tile.tg-more{
  background:linear-gradient(135deg, rgba(201,164,73,0.12), rgba(201,164,73,0.12));
  border-color:var(--border-strong);
}
.tg-e{font-size:20px}
.tg-n{
  font-family:'Inter',sans-serif;font-weight:700;font-size:10.5px;
  color:var(--ink);line-height:1.2;letter-spacing:-0.1px;
}
.tg-caption{
  margin-top:14px;font-size:13.5px;line-height:1.7;color:var(--ink-soft);
  font-style:italic;text-align:center;
}

/* ===== NODE ARROW (Day 5) ===== */
.na-wrap{margin-top:30px}
.na-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--mint);margin-bottom:14px;
}
.na-diagram{
  background:linear-gradient(135deg, #ffffff, #f7edeb);
  border:1px solid var(--border);border-radius:18px;
  padding:24px 20px;
}
.na-diagram svg{width:100%;height:auto;max-height:150px;display:block}
.na-caption{
  margin-top:14px;font-size:13.5px;line-height:1.7;color:var(--ink-soft);
  font-style:italic;text-align:center;padding:0 18px;
}

/* ===== HALF-STARTED VS SHIPPED (Day 6) ===== */
.hss-wrap{margin-top:30px}
.hss-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--pink);margin-bottom:14px;
}
.hss-grid{
  display:grid;grid-template-columns:1fr 60px 1fr;gap:14px;align-items:center;
  background:linear-gradient(135deg, #ffffff, #f7edeb);
  border:1px solid var(--border);border-radius:18px;
  padding:28px 24px;
}
.hss-side{display:flex;flex-direction:column;gap:14px;align-items:center}
.hss-side-label{
  font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ink-faint);font-weight:500;
}
.hss-tiles{
  display:grid;grid-template-columns:repeat(5,1fr);gap:6px;width:100%;
}
.hss-tile-half{
  background:rgba(10,10,10,0.04);
  border:1px dashed rgba(10,10,10,0.15);
  border-radius:6px;
  height:38px;padding:6px;
  display:flex;align-items:center;
}
.hss-tile-bar{
  height:4px;background:rgba(10,10,10,0.25);border-radius:100px;
}
.hss-side-caption{
  font-size:12px;line-height:1.6;color:var(--ink-faint);
  text-align:center;font-style:italic;
}
.hss-arrow{display:flex;align-items:center;justify-content:center}
.hss-arrow svg{width:44px;height:44px;filter:drop-shadow(0 0 8px rgba(201,164,73,0.4))}
.hss-shipped{
  background:linear-gradient(135deg, rgba(201,164,73,0.12), rgba(201,164,73,0.08));
  border:1px solid var(--border-strong);
  border-radius:12px;
  padding:20px 18px;width:100%;
  display:flex;flex-direction:column;gap:7px;align-items:center;
  box-shadow:0 8px 24px rgba(201,164,73,0.15);
  position:relative;
}
.hss-shipped-check{
  position:absolute;top:-10px;right:-10px;
  width:28px;height:28px;border-radius:50%;
  background:var(--holo);color:#0a0a0a;
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:700;
  box-shadow:0 4px 12px rgba(201,164,73,0.5);
}
.hss-shipped-bar{
  width:100%;height:6px;background:rgba(10,10,10,0.25);border-radius:100px;
}
.hss-shipped-bar.full{background:var(--holo);box-shadow:0 0 10px rgba(201,164,73,0.4)}
.hss-ship .hss-side-caption{color:var(--mint);font-style:normal;font-weight:600}

/* ===== REFERRAL MATH HERO (Day 7) ===== */
.rm-wrap{margin-top:30px}
.rm-badge{
  font-family:'Inter',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--mint);margin-bottom:14px;
}
.rm-rows{display:flex;flex-direction:column;gap:10px}
.rm-row{
  display:grid;grid-template-columns:60px 1fr 30px 1.4fr;gap:14px;align-items:center;
  padding:18px 22px;
  background:var(--card-2);
  border:1px solid var(--border);
  border-radius:14px;
  position:relative;overflow:hidden;
}
.rm-row::before{content:'';position:absolute;top:0;bottom:0;left:0;width:4px}
.rm-mint::before{background:linear-gradient(180deg,#8effd5,#6bd5ff)}
.rm-pink::before{background:linear-gradient(180deg,#ff6bc1,#ff8ad1)}
.rm-purple::before{background:linear-gradient(180deg,#b26bff,#c78fff)}
.rm-num{
  font-family:'Inter',sans-serif;font-weight:900;font-size:40px;
  background:var(--holo);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  text-align:center;line-height:1;
}
.rm-label{
  font-size:14px;color:var(--ink-soft);line-height:1.4;
}
.rm-label strong{color:var(--ink);font-weight:700}
.rm-equal{
  font-family:'Inter',sans-serif;font-size:22px;color:var(--ink-faint);text-align:center;
}
.rm-result{
  font-family:'Inter',sans-serif;font-weight:800;font-size:16px;
  color:var(--ink);letter-spacing:-0.2px;line-height:1.3;
}
.rm-footer{
  margin-top:16px;text-align:center;
  font-family:'Playfair Display',serif;font-style:italic;font-size:15px;
  color:var(--ink-soft);
}

/* ===== MOBILE RESPONSIVE FOR NEW COMPONENTS ===== */
@media(max-width:900px){
  .mission-card{grid-template-columns:1fr;gap:18px;padding:28px 24px;text-align:center}
  .mission-flame-bg{max-width:90px;margin:0 auto}
  .mission-line-1{font-size:18px}
  .mission-punch{font-size:20px}
  .aa-card{grid-template-columns:72px 1fr;gap:16px;padding:22px 22px 22px 20px}
  .aa-avatar{width:72px;height:72px}
  .aa-initials{font-size:26px}
  .aa-bio{font-size:13.5px;line-height:1.65}
  .values-grid{grid-template-columns:1fr;gap:12px}
  .catmap-grid{grid-template-columns:repeat(2,1fr)}
  .fire-card{grid-template-columns:1fr;gap:20px;padding:24px}
  .fire-visual{width:100%;max-width:280px;margin:0 auto}
  .fire-bars{width:100%;max-width:260px}
  .ps-cards{grid-template-columns:1fr;gap:12px}
  .ps-connector{padding:6px 0}
  .ps-plus{transform:rotate(90deg)}
  .ivf-grid{grid-template-columns:1fr;gap:12px}
  .tg-grid{grid-template-columns:repeat(3,1fr)}
  .hss-grid{grid-template-columns:1fr;gap:18px;padding:24px 20px}
  .hss-arrow{transform:rotate(90deg)}
  .rm-row{grid-template-columns:50px 1fr;grid-template-rows:auto auto;gap:8px 12px;padding:16px 18px}
  .rm-num{grid-row:span 2;font-size:32px}
  .rm-equal{display:none}
  .rm-result{font-size:14px}
  .bargain-card{padding:28px 24px}
  .bargain-title{font-size:24px}
  .bargain-header{flex-wrap:wrap}
  .recguide-body{padding:20px}
  .recguide-row{grid-template-columns:34px 1fr;padding:12px 14px}
}
@media(max-width:600px){
  .catmap-grid{grid-template-columns:1fr}
  .tg-grid{grid-template-columns:repeat(2,1fr)}
  .bargain-stamp{font-size:10px;padding:3px 8px}
  .aa-card{grid-template-columns:1fr;text-align:center;padding:24px 22px 22px;gap:14px}
  .aa-avatar{margin:0 auto}
}

`;
