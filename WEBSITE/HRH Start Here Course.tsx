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

  CATEGORY_2_EMOJI: "🙏",
  CATEGORY_2_NAME: "Claim it",
  CATEGORY_2_DESC: "Introduce yourself and post what you are calling in",

  CATEGORY_3_EMOJI: "🏆",
  CATEGORY_3_NAME: "Wins!",
  CATEGORY_3_DESC: "Post your wins and shifts as they land",

  CATEGORY_4_EMOJI: "❓",
  CATEGORY_4_NAME: "Ask Questions",
  CATEGORY_4_DESC: "Stuck on anything? Ask here, you are never alone",

  CATEGORY_5_EMOJI: "🪩",
  CATEGORY_5_NAME: "Downloads from Jac",
  CATEGORY_5_DESC: "Your freebies and resources, all in one place",

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
      desc: "Welcome in. Today is your tour, so nothing in here ever feels confusing. By the end you know exactly what this space is, where everything lives, and what is waiting for you at every level. Three short days and you are fully set up. Press play and let us go. 🤍",
      hero: "You are not a bystander in your life. You are the one creating it. We are just gonna make having it all feel SO normal your body stops fighting it.",
      showTierComparison: true,
    },
    concepts: [
      { type: "accordion", headline: "What this space actually is", icon: "🤍",
        body: "Hotter Richer Happier is a press-play manifestation membership, not another course you fall behind on. No live calls, no homework, no pressure. You open something, you feel it, your life starts moving. Everything in here runs on one idea, what you normalize will materialize. So we make your dream life feel so normal, so of-course, that it has no choice but to show up." },
      { type: "accordion", headline: "How to get around in here", icon: "🧭",
        body: "Two tabs are your home base. Community is the feed where you post, claim your desires, and hype up other women. Classroom is everything you press play on, your challenges, The Mirror, the rituals, the vault. Calendar has the live drops, Members and Leaderboards are where the room comes alive. You will basically live in Community and Classroom, that is it!" },
    ],
    actions: [
      "Download the Skool app on your phone so every drop, ritual, and win lands right in your pocket. 📲",
      "Take the quick tour: tap into Community to see the feed, then Classroom to see everything you get to press play on.",
      "Press play on the Quantum Manifestation Blueprint in the Classroom. It is your full walk through of how all of this actually works, and it is free.",
      "Post your intro in Claim it 🙏 and say what you are calling in like it is already on its way. Then go hype up 2 or 3 other women to start your 🔥 streak!!",
    ],
    promptHeader: "Your intro post ✨",
    promptIntro: "Copy this, paste it as your first post in Claim it 🙏, fill in the arrows. That is it!",
    promptBadge: "Copy-paste into Skool →",
    prompt: "Drop a hello in the community\nKeep it simple:\n→ Your name and where you are from\n→ What you are here to call in first (money, love, your glow-up)\n→ The one number, person, or feeling you want most right now\n→ One thing you are ready to stop believing about yourself\n\nThen hit post and let the room welcome you in. 🤍",
  },

  // ============== DAY 2 ==============
  {
    id: 1, title: "Manifestation In A Nutshell", accent: "In A Nutshell", dur: "8 min", emoji: "🪞",
    overview: {
      desc: "Here is the ENTIRE philosophy in one screen, then you go use it. Manifestation is not complicated, everyone just makes it complicated. Once you see the three pieces you are gonna open The Mirror, let it write your askformations in your own words, then post your claim so the room witnesses HER. This is the day you stop reading about it and actually start feeling it!! 🪞",
      hero: "You are already manifesting every single day, you have just been doing it by accident. Today you do it on purpose.",
    },
    concepts: [
      { type: "accordion", headline: "Manifestation is only three things", icon: "🌙",
        list: [
          "Awareness. You are already manifesting every single day, mostly without knowing it, your subconscious has been running the whole show.",
          "Clarity. Get dead clear on what YOU actually want, not what you were trained to settle for.",
          "Living as if it is already yours.",
        ],
        body: "Everything you are living right now is your subconscious playing back what you were told for years, about money, about love, about what someone like you gets to have. That is manifestation too, it is just on autopilot. The power move is realizing you get to rewrite it. You get clear on what you want, then you live as if it is already yours. The catch is your subconscious will fight you on that third one, hard, because the old programming feels safer than the new life. That fight is the exact thing we clear in here. 💫" },
      { type: "accordion", headline: "So this is where The Mirror comes in", icon: "🪞",
        body: "You just saw the catch. Your subconscious fights you on living as if, so I am not leaving you to white-knuckle it alone. The Mirror is your free tool right here in the classroom, and it does the hard part with you. You talk it out, what you want and what has been in the way, and it gets you clear and hands you the exact lines that start rewriting the old programming. It is the fastest way to go from reading this to actually feeling it in your body. Open it one time and you will get it." },
      { type: "accordion", headline: "What an askformation is, and why it hits", icon: "✍️",
        body: "A flat affirmation your body does not believe yet just bounces right off. An askformation is a question your brain literally cannot help but answer, like why is it SO easy for me to hold this much money, or how did I become the woman who books the trip without checking the account first. Your mind goes hunting for the evidence, and that is exactly how the rewrite starts. The Mirror writes these from YOUR exact words so they actually fit your life." },
      { type: "accordion", headline: "Then you claim it where the room can see", icon: "🙏",
        body: "When you post your claim out loud, you are saying this IS happening, no question mark on the end. When you catch yourself going no, I do not want to claim it yet, that is you quietly leaving the door open for it to not happen, so you do not feel stupid if it does not. That right there is the bullshit you have to give up. Drop your claim in Claim it 🙏 and say it like it already happened." },
    ],
    actions: [
      { text: "Open The Mirror. It walks you through everything, you just answer honestly and it hands you your askformations and your claim.", button: { label: "🪞 Open The Mirror", href: "https://manifestwithjac.netlify.app/hrh-mirror" } },
      "Take the claim it gives you, post it in Claim it 🙏, and say it like it already happened. Let the room witness her!!",
    ],
  },

  // ============== DAY 3 ==============
  {
    id: 2, title: "Your Win + Free For Life", accent: "Free For Life", dur: "5 min", emoji: "💚",
    overview: {
      desc: "Last day, let us GO!! 💚 We are closing by locking in your first win, then I am showing you the fun part. You can make this whole membership free for life, and actually make money on top of it, just by sharing the room with women who would already love it. Every member earns 40% commission for life on everyone they bring in, at any tier. Skool handles all of it, you literally just share your link.",
      hero: "Invite a few women who are ready for this and your membership pays for itself. Everything after that is pure overflow landing in your account.",
      showReferralMath: true,
    },
    concepts: [
      { type: "accordion", headline: "First, lock in your win, even a tiny one", icon: "🏆",
        body: "Before anything else, check in with your body. Did something shift after The Mirror, even a little? Found money, a random text, your shoulders just dropped two inches. Post it in Wins! 🏆. Naming the win out loud is how you normalize it, and while you are in the feed go hype up 2 or 3 other women, because witnessing other women receive comes right back to you. 💕" },
      { type: "invite-walkthrough" },
      { type: "accordion", headline: "How the 40% actually works", icon: "💰",
        body: "You get 40% of whatever tier someone joins at, Member, Premium, or VIP, for the entire life of their membership. It pays out automatically through Skool, usually within 14 days of their payment. Nothing to track, no links to build, no follow up. Skool runs all of it, you just share your link and let it work. 🤑" },
    ],
    actions: [
      "Post your first win or first shift in Wins! 🏆. Even a tiny one counts!!",
      "Go hype up at least 3 other women today. Real comments, not just love this. 💕",
      "Grab your affiliate link: Community tab, right sidebar, the button that says Invite People.",
      "Open the Prompt tab, drop in your win and your link, and post it where your people hang out. One post is all it takes!",
    ],
    promptHeader: "Your share templates 💸",
    promptIntro: "Pick one, fill in the 2 brackets with your real win and your link, and post it. That is the whole task!!",
    promptBadge: "Copy-paste into your socials →",
    prompt: "Two copy-paste templates. Pick one, fill in the 2 brackets with your real experience and your link, post it.\n\n--------------------\nTEMPLATE 1: SOCIAL POST\n--------------------\n\nokay I have to talk about something. I have been inside a manifestation community called Hotter Richer Happier and it is nothing like the surface level stuff.\n\nIt is press-play. Tapping vaults for money, love, the body. Subliminals you run while you sleep. A fresh ritual every month. Run by Jac, who actually lived this, six figures of debt to a completely different life.\n\n[ONE SENTENCE ABOUT THE SPECIFIC SHIFT YOU FELT IN HERE]\n\nif you have been waiting for a sign to go all in on your fuck yes life, this is it.\n\ncome in here with me [YOUR LINK]\n\n--------------------\nTEMPLATE 2: STORY / CLOSE FRIENDS\n--------------------\n\nnot me being fully delusional in the best way lately. I joined this manifestation room called Hotter Richer Happier and [ONE SENTENCE ABOUT WHAT SHIFTED].\n\nif you want to be delulu with me, come manifest right next to me. link is here [YOUR LINK]\n\n--------------------\nHow to use: pick one, fill the 2 brackets, post. That is it.",
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
    tagline: "$7 a month.",
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
    tagline: "$27 a month. The crown. You plus the tool.",
    desc: "The entire vault, my AI app, and my eyes on your work.",
    items: [
      { icon: "🎧", text: "Every tapping vault, subliminal, and rampage across all 5 lanes" },
      { icon: "💎", text: "Money Multiverse inside Manifesting Money, fully unlocked" },
      { icon: "✨", text: "Venus, my manifestation story generator, coming soon" },
      { icon: "🎙️", text: "Submit to the monthly Q&A and I record real feedback" },
      { icon: "👑", text: "Everything in Free and Premium, always" },
    ],
    cta: "$27 / month ✦",
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
  { emoji: CONFIG.CATEGORY_2_EMOJI, name: CONFIG.CATEGORY_2_NAME, desc: CONFIG.CATEGORY_2_DESC, color: "purple" },
  { emoji: CONFIG.CATEGORY_3_EMOJI, name: CONFIG.CATEGORY_3_NAME, desc: CONFIG.CATEGORY_3_DESC, color: "pink" },
  { emoji: CONFIG.CATEGORY_1_EMOJI, name: CONFIG.CATEGORY_1_NAME, desc: CONFIG.CATEGORY_1_DESC, color: "lime" },
  { emoji: CONFIG.CATEGORY_4_EMOJI, name: CONFIG.CATEGORY_4_NAME, desc: CONFIG.CATEGORY_4_DESC, color: "cyan" },
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

  // Deep-link: open straight to a day via URL hash (#day3, #3, etc.)
  useEffect(() => {
    const applyHash = () => {
      const h = (window.location.hash || "").replace("#", "").toLowerCase().replace("day", "").trim();
      const n = parseInt(h, 10);
      if (!isNaN(n) && n >= 1 && n <= lessons.length) setActive(n - 1);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

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
                      {c.type === "accordion" && <Accordion item={c} />}
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
                      These are the tiny moves that compound into everything. Do not skip them, this is literally where the momentum starts!!
                    </div>
                  </div>
                  {lesson.actions.map((a, i) => (
                    <div
                      key={i}
                      className="action-card reveal"
                      style={{ animationDelay: `${120 + i * 90}ms` }}
                    >
                      <div className="action-num">{String(i + 1).padStart(2, "0")}</div>
                      <div className="action-text">
                        {typeof a === "string" ? a : a.text}
                        {typeof a !== "string" && a.button && (
                          <a className="action-btn" href={a.button.href} target="_blank" rel="noopener noreferrer">
                            {a.button.label}
                          </a>
                        )}
                      </div>
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
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "14px", fontFamily: "DM Sans, sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.3px", color: "#a07f30", textDecoration: "none", position: "relative", zIndex: 1 }}
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

function Accordion({ item }) {
  return (
    <div className="accordion open static">
      <div className="accordion-head">
        {item.icon && <span className="accordion-icon">{item.icon}</span>}
        <span className="accordion-headline">{item.headline}</span>
      </div>
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
          <text x="30" y="22" fill="rgba(10,10,10,0.55)" fontSize="11" fontFamily="DM Sans, sans-serif" letterSpacing="1.5">ALL THE IDEAS</text>
          <text x="670" y="22" fill="#ff8ad1" fontSize="11" fontFamily="DM Sans, sans-serif" letterSpacing="1.5">YOUR PATH →</text>
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
          <text x="250" y="95" textAnchor="middle" fill="#0a0a0a" fontSize="12" fontFamily="DM Sans, sans-serif" letterSpacing="1">1 RESOURCE</text>
          {/* left branch to FREE */}
          <path d="M 200 90 Q 130 90 60 50" stroke="url(#sttpLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="60" cy="50" r="6" fill="#8effd5" />
          {/* right branch to PAID */}
          <path d="M 300 90 Q 370 90 440 50" stroke="url(#sttpLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="440" cy="50" r="6" fill="#ff8ad1" />
          {/* labels */}
          <text x="60" y="35" textAnchor="middle" fill="#8effd5" fontSize="11" fontFamily="DM Sans, sans-serif" letterSpacing="1.5">🎁 FREE</text>
          <text x="60" y="20" textAnchor="middle" fill="rgba(10,10,10,0.6)" fontSize="9" fontFamily="DM Sans, sans-serif">LEAD MAGNET</text>
          <text x="440" y="35" textAnchor="middle" fill="#ff8ad1" fontSize="11" fontFamily="DM Sans, sans-serif" letterSpacing="1.5">💎 PAID</text>
          <text x="440" y="20" textAnchor="middle" fill="rgba(10,10,10,0.6)" fontSize="9" fontFamily="DM Sans, sans-serif">MINI OFFER</text>
          {/* bottom labels */}
          <text x="60" y="80" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="DM Sans, sans-serif">grow audience</text>
          <text x="60" y="95" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="DM Sans, sans-serif">fill community</text>
          <text x="440" y="80" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="DM Sans, sans-serif">monetize</text>
          <text x="440" y="95" textAnchor="middle" fill="rgba(10,10,10,0.5)" fontSize="10" fontFamily="DM Sans, sans-serif">qualify leads</text>
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
          <text x="60" y="115" textAnchor="middle" fill="rgba(10,10,10,0.55)" fontSize="10" fontFamily="DM Sans, sans-serif" letterSpacing="1">CURRENT WINDOW</text>
          <text x="60" y="130" textAnchor="middle" fill="rgba(10,10,10,0.4)" fontSize="9" fontFamily="DM Sans">where you can hold today</text>
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
          <text x="245" y="58" textAnchor="middle" fill="#c78fff" fontSize="10" fontFamily="DM Sans, sans-serif" letterSpacing="2">EXPANDING CAPACITY →</text>
          {/* destination (bright) */}
          <circle cx="440" cy="70" r="28" fill="none" stroke="#8effd5" strokeWidth="2" filter="url(#naGlow)" />
          <circle cx="440" cy="70" r="4" fill="#8effd5" />
          <text x="440" y="76" textAnchor="middle" fill="#0a0a0a" fontSize="18">✦</text>
          <text x="440" y="115" textAnchor="middle" fill="#8effd5" fontSize="10" fontFamily="DM Sans, sans-serif" letterSpacing="1">EXPANDED WINDOW</text>
          <text x="440" y="130" textAnchor="middle" fill="rgba(10,10,10,0.6)" fontSize="9" fontFamily="DM Sans">what you'll regulate inside next</text>
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
        <div className="iw-title">3 clicks and it is yours.</div>
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
              That link is yours for life. Every person who joins any tier through it earns you 40% automatically. No tracking, no setup, no follow-up. Skool handles all of it on their end.
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
@font-face{font-family:'Seriously Nostalgic';src:url(data:font/otf;base64,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AAEECQAFABoCOQADAAEECQAGADQCUwADAAEECQAIABYChwADAAEECQAJABYCnQADAAEECQAKAG4CswADAAEECQAQACQDIUNvcHlyaWdodCBOaWNreSBMYWF0ei4gQWxsIHJpZ2h0cyByZXNlcnZlZC5TZXJpb3VzbHkgTm9zdGFsZ2ljIFZhclJlZ3VsYXJWZXJzaW9uIDEuMDAwOztTZXJpb3VzbHlOb3N0YWxnaWMtUmVndWxhcjsyMDIyO0ZMNzEyU2VyaW91c2x5Tm9zdGFsZ2ljIFJlZ3VsYXJWZXJzaW9uIDEuMDAwU2VyaW91c2x5Tm9zdGFsZ2ljLVJlZ3VsYXJOaWNreSBMYWF0ek5pY2t5IExhYXR6Q29weXJpZ2h0IChjKSAyMDIyIGJ5IE5pY2t5IExhYXR6LiBBbGwgcmlnaHRzIHJlc2VydmVkLgBDAG8AcAB5AHIAaQBnAGgAdAAgAE4AaQBjAGsAeQAgAEwAYQBhAHQAegAuACAAQQBsAGwAIAByAGkAZwBoAHQAcwAgAHIAZQBzAGUAcgB2AGUAZAAuAFMAZQByAGkAbwB1AHMAbAB5ACAATgBvAHMAdABhAGwAZwBpAGMAIABWAGEAcgBSAGUAZwB1AGwAYQByAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAwADAAOwA7AFMAZQByAGkAbwB1AHMAbAB5AE4AbwBzAHQAYQBsAGcAaQBjAC0AUgBlAGcAdQBsAGEAcgA7ADIAMAAyADIAOwBGAEwANwAxADIAUwBlAHIAaQBvAHUAcwBsAHkATgBvAHMAdABhAGwAZwBpAGMALQBSAGUAZwB1AGwAYQByAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAwADAAUwBlAHIAaQBvAHUAcwBsAHkATgBvAHMAdABhAGwAZwBpAGMALQBSAGUAZwB1AGwAYQByAE4AaQBjAGsAeQAgAEwAYQBhAHQAegBOAGkAYwBrAHkAIABMAGEAYQB0AHoAQwBvAHAAeQByAGkAZwBoAHQAIAAoAGMAKQAgADIAMAAyADIAIABiAHkAIABOAGkAYwBrAHkAIABMAGEAYQB0AHoALgAgAEEAbABsACAAcgBpAGcAaAB0AHMAIAByAGUAcwBlAHIAdgBlAGQALgBTAGUAcgBpAG8AdQBzAGwAeQBOAG8AcwB0AGEA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AJr/uACb/7gAnP/JAJ7/yQCf/8kAoP/JAKH/rACi/6wAqP/IAKn/yACq/8gAq//IAK3/owCv/8gAsf/IAAsAHf/mACb/5wAp/80AKv/iACv/5wAs/+sALf/iAC//3gAw/+8AMf/iADP/0gBBAAb/3QAO/90AEP/dABr/kgAc/5sAHf/BAB7/pwAi/+IAJv+0ACf/yQAo/5YAKf/WACr/pwAr/7wALP+sAC7/1gAx/80AMv/SADP/nwBf/90AYP+QAGgAKgBqACoAcP/dAHX/kgB2/5YAhv/iAIr/kgCL/5IAjP+SAI3/kgCO/5IAj/+SAJD/mwCR/6cAkv+nAJP/lgCU/5YAlf+WAJb/lgCX/5YAmP/WAJn/1gCa/9YAm//WAJz/4gCd/8kAnv/iAJ//4gCg/+IAof+nAKL/pwCj/90Ap//dAKj/kACp/5AAqv+QAKv/kACs/90Arf/SAK//kACx/5AAuP/dALn/3QC9/90APQAG/+0ADv/tABD/7QAa/8kAHP+4AB3/xQAe/8EAIv/RACP/2gAm/9IAJ//eACj/uAAp/+IAKv+nACv/4gAs/80AMf/eADL/6wAz/8kAX//mAGD/pABoAEgAagAmAHD/7QB1/8kAdv+4AIb/0QCK/8kAi//JAIz/yQCN/8kAjv/JAI//yQCQ/7gAkf/BAJL/wQCT/7gAlP+4AJX/uACW/7gAl/+4AJz/0QCd/94Anv/RAJ//0QCg/9EAof/BAKL/wQCj/+0Ap//mAKj/pACp/6QAqv+kAKv/pACs/+0Arf/rAK//pACx/6QAuP/tALn/7QC9/+0AHAAG/8sADv/LABD/ywAc/+IAHv/iACj/4gAq/+sAMv+rAF//0ABw/8sAdv/iAJD/4gCR/+IAkv/iAJP/4gCU/+IAlf/iAJb/4gCX/+IAof/iAKL/4gCj/8sAp//QAKz/ywCt/6sAuP/LALn/ywC9/8sACQAG/8sAEP/KACn/rAAq/58ALP+sAFD/owBS/5cAaAA3AGoANwAgAB7/8wAi/+sAKP/rAC7/1QAy/8UAYP/iAHb/6wCG/+sAkf/zAJL/8wCT/+sAlP/rAJX/6wCW/+sAl//rAJj/1QCZ/9UAmv/VAJv/1QCc/+sAnv/rAJ//6wCg/+sAof/zAKL/8wCo/+IAqf/iAKr/4gCr/+IArf/FAK//4gCx/+IAAwAsABUAL//6ADD/7wAXACL/9AAm/94AJ//rACgABgAp/+8AK//4AC//7wAw/+8AMv/nADP/8gB2AAYAhv/0AJMABgCUAAYAlQAGAJYABgCXAAYAnP/0AJ3/6wCe//QAn//0AKD/9ACt/+cAAQAtAA4ADwAc/+8AHv/vACj/7wAq//gAdv/vAJD/7wCR/+8Akv/vAJP/7wCU/+8Alf/vAJb/7wCX/+8Aof/vAKL/7wAGACX/8wAm/+IAKf/eACv/9gAv/+cAMP/nABIAGwBUABz/2gAd/+8AHv/iACEASAAlAEwAKP/SAHb/0gCQ/9oAkf/iAJL/4gCT/9IAlP/SAJX/0gCW/9IAl//SAKH/4gCi/+IADwAb/+sAHP/0AB3/9AAo//QAL//yADD/3wAy/+kAdv/0AJD/9ACT//QAlP/0AJX/9ACW//QAl//0AK3/6QAHACj/5wB2/+cAk//nAJT/5wCV/+cAlv/nAJf/5wAMACj/+AAp/+cAL//aADD/4gAy/8oAdv/4AJP/+ACU//gAlf/4AJb/+ACX//gArf/KAAYAHf/rACP/5AAm/9EAKf/rAC//zQAw/9IACgAb/+sAHQAGACX/7wAm/+EAKf/aACv/9gAv//AAMP/dADH/4wAz//IAGAAb/+8AHgAIACH/8QAi//QAJf/hACb/1gAn/+sAKf/nACv/8AAv/+cAMP/nADL/4gAz//IAhv/0AJEACACSAAgAnP/0AJ3/6wCe//QAn//0AKD/9AChAAgAogAIAK3/4gAFACb/9AAn//YAUP+jAFL/hgCd//YAAgAh/+sAJv/oAAgAKP/rADMACQB2/+sAk//rAJT/6wCV/+sAlv/rAJf/6wACAFD/yQBS/80AAgBQ/8EAUv/JAAoAHP/yAB3/9gAo//cAdv/3AJD/8gCT//cAlP/3AJX/9wCW//cAl//3AAMAGwAVACUAFQAtAC8AAQAtACIALwAE/+gABgAUAAf/7AAI//MACv/sAAv/6wAM/+YADf/gAA4AFAAP/+wAEf/sABX/4AAW/+AAGP/NACgADQBe/+wAXwAUAGD/1ABwABQAdgANAJMADQCUAA0AlQANAJYADQCXAA0AowAUAKX/4ACm/+gApwAUAKj/1ACp/9QAqv/UAKv/1ACsABQArv/NAK//1ACw/+gAsf/UALL/6ACz/+gAtP/zALX/8wC2//MAt//zALgAFAC5ABQAvQAUABMAEf/tABX/7QAW/+MAHAAVAB0AEgAeAA4AKAAPACoAEgB2AA8AkAAVAJEADgCSAA4AkwAPAJQADwCVAA8AlgAPAJcADwChAA4AogAOAAMAEwASABUAGAAWABcACQAG/+IACQBQABD/4gAT/9AAFf+kABb/owAZABgAaP+jAGr/wQAUABD/zQAT/6wAFP/FABX/cQAW/4YAGP9xAF//1gBgACYApP/FAKf/1gCoACYAqQAmAKoAJgCrACYArv9xAK8AJgCxACYAuv/FALv/xQC8/8UADQAJAB4AE/+sABX/nwAW/6cAGP+0AGAAJgCoACYAqQAmAKoAJgCrACYArv+0AK8AJgCxACYAAgAPAAQAHwAAACEAIQAcACQAJAAdACYAKQAeACsALQAiAC8AMwAlAEUARQAqAF4AYAArAGcAZwAuAGkAaQAvAG8AcQAwAHUAdgAzAIoAlwA1AJ0AnQBDAKEAvQBEAAIBkAAEAAAB/ALAAAwAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4v/u/7//yQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAA0AEQAIAAAAAAAAAAAAAAAAAAAAAAAAAA4AFP/MAAAAAAAAAA3/5P/w/+YAAAAAAAAAAAAAAAAAAAAAAAD/2gAA/+v/2v/eAAAAAP/iAAAAAAAAAAAAAAAAAAAAAP/qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+cAAAAAAAAAAAAAAAD/9AAAAAAAAAAAAAAAAAAAAAD/2wAAAAYABgAAAAAAAP/xAAb/9P/rAAAAAP/P/8sAAAAA/6P/l/+b/8MAAAAAAAD/o//FAAD/owAAAAAAAAAA/8oAAP/r/+cAAAAAAAAAAP/nAAAAAP/eAAD/7//zAAAAAAAAAAD/8AAAAAAAAAAA/+0AAAAAAAAAAP/t/+oAAAAA/+v/5//eAAAAAAAAAAAAAAAAAAAAAAABADQACAANAA4AFAAYABoAHgAnACgAXwBgAHAAdQB2AIoAiwCMAI0AjgCPAJEAkgCTAJQAlQCWAJcAnQChAKIAowCkAKUApwCoAKkAqgCrAKwArgCvALEAtAC1ALYAtwC4ALkAugC7ALwAvQACACAACAAIAAoADQANAAsADgAOAAMAFAAUAAQAGAAYAAgAGgAaAAUAHgAeAAYAJwAnAAkAKAAoAAcAXwBfAAIAYABgAAEAcABwAAMAdQB1AAUAdgB2AAcAigCPAAUAkQCSAAYAkwCXAAcAnQCdAAkAoQCiAAYAowCjAAMApACkAAQApQClAAsApwCnAAIAqACrAAEArACsAAMArgCuAAgArwCvAAEAsQCxAAEAtAC3AAoAuAC5AAMAugC8AAQAvQC9AAMAAgArAAQABAAJAA0ADQAKAA4ADgACABgAGAADABoAGgAFABwAHAAMAB4AHgAGAB8AHwAOACIAIgANACcAJwALACgAKAAHAC4ALgAPADIAMgAEAF8AXwABAGAAYAAIAHAAcAACAHUAdQAFAHYAdgAHAIQAhQAOAIYAhgANAIoAjwAFAJAAkAAMAJEAkgAGAJMAlwAHAJgAmwAPAJwAnAANAJ0AnQALAJ4AoAANAKEAogAGAKMAowACAKUApQAKAKYApgAJAKcApwABAKgAqwAIAKwArAACAK0ArQAEAK4ArgADAK8ArwAIALAAsAAJALEAsQAIALIAswAJALgAuQACAL0AvQACAAEAAAAKADAASgACREZMVAAObGF0bgAaAAQAAAAA//8AAQAAAAQAAAAA//8AAQABAAJsaWdhAA5saWdhABQAAAABAAAAAAABAAAAAQAEAAQAAAABAAgAAQASAAEACAABAAQAhAACACIAAQABAB8AAAAAAAEAAAAA) format('opentype');font-weight:400;font-style:normal;font-display:swap}
*{font-synthesis:none}


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
  font-family:'DM Sans',sans-serif;
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
.topbar-title{font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:700;font-size:19px;color:var(--ink);letter-spacing:0.2px}
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
  font-family:'DM Sans',sans-serif;
  font-size:9px;letter-spacing:2.5px;text-transform:uppercase;
  color:var(--pink);margin-bottom:8px;font-weight:500;
}
.side-title{font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:700;font-size:17px;color:var(--ink);margin-bottom:16px;line-height:1.35}
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
.side-prog-pct{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:var(--ink-soft);min-width:34px;text-align:right}

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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  font-weight:500;text-transform:uppercase;
}
.lesson-mode-chip{
  font-family:'DM Sans',sans-serif;font-size:9.5px;letter-spacing:1.6px;
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
  font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.3px;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:800;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:1.5px;font-weight:500;
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
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-size:80px;line-height:1;
  color:var(--purple);opacity:0.22;font-weight:900;pointer-events:none;
}
.hero-text{
  position:relative;z-index:1;
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-weight:600;
  font-size:clamp(18px,2.2vw,24px);line-height:1.45;
  color:#141414;
}

/* ======== Tier Comparison ======== */
.tier-wrap{margin-top:28px}
.tier-intro{text-align:center;margin-bottom:20px}
.tier-intro-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:8px;
}
.tier-intro-title{
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:800;font-size:27px;color:var(--ink);margin-bottom:6px;letter-spacing:-0.2px;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:800;font-size:26px;
  letter-spacing:-0.3px;margin-bottom:4px;
}
.tier-tagline{
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-weight:500;
  font-size:17px;color:var(--ink-soft);margin-bottom:10px;line-height:1.3;
}
.tier-desc{font-size:12.5px;color:var(--ink-faint);line-height:1.5;margin-bottom:14px}
.tier-divider{height:1px;margin-bottom:14px;background:rgba(201,164,73,0.25)}
.tier-items{display:flex;flex-direction:column;gap:9px;flex:1;margin-bottom:14px}
.tier-item{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;line-height:1.4}
.tier-item-icon{flex-shrink:0;font-size:14px;margin-top:1px}
.tier-item-text{color:var(--ink-soft);flex:1}

.tier-cta{
  padding-top:12px;
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:1.5px;
  text-transform:uppercase;font-weight:500;
}

/* Clickable tier link */
a.tier-link{
  color:var(--cyan);font-weight:600;text-decoration:none;
  font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:1.2px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  text-transform:uppercase;font-weight:500;margin-bottom:8px;
}
.vip-ready-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:22px;
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
  font-family:'DM Sans',sans-serif;font-weight:500;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
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
  font-family:'DM Sans',sans-serif;font-weight:900;font-size:18px;
  color:var(--ink-dark);letter-spacing:-0.2px;margin-bottom:4px;
}
.triad-sub{font-size:12.5px;color:#5d5280;line-height:1.45;font-weight:500}
.triad-ring{display:none}

/* ======== Chart Focus (Day 5) ======== */
.cf-wrap{margin-top:18px;position:relative}
.cf-intro{text-align:center;margin-bottom:20px}
.cf-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.cf-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:20px;color:var(--ink);
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
  font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:2px;
  color:var(--pink-2);margin-bottom:6px;font-weight:500;
  position:relative;z-index:1;
}
.cf-focus-label{
  font-family:'DM Sans',sans-serif;font-weight:900;font-size:22px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--mint);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.iw-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:22px;
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
  font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:2px;
  color:var(--mint);font-weight:500;
}
.iw-step-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:17px;
  color:var(--ink);letter-spacing:-0.2px;line-height:1.25;
}
.iw-step-desc{font-size:13.5px;line-height:1.65;color:var(--ink-soft)}
.iw-step-visual{display:flex;align-items:center;justify-content:center;min-height:180px}

/* ---- Mock Skool sidebar (Step 1) ---- */
.mock-sidebar{
  width:100%;max-width:260px;
  background:#fff;border-radius:14px;padding:12px;
  box-shadow:0 8px 28px rgba(0,0,0,0.25);
  font-family:'DM Sans',sans-serif;
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
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:10px;
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
.mock-sb-stat-num{font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#0a0a0a;line-height:1}
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
  text-align:center;font-family:'DM Sans',sans-serif;font-weight:700;
  font-size:11px;color:#8a7355;letter-spacing:0.5px;
  animation:iw-pulse 2s ease-in-out infinite;
}
@keyframes iw-pulse{
  0%,100%{box-shadow:0 0 0 0 rgba(232,168,77,0.4)}
  50%{box-shadow:0 0 0 8px rgba(232,168,77,0)}
}
.mock-sb-arrow{
  position:absolute;top:50%;right:-90px;transform:translateY(-50%);
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-size:12px;
  color:var(--mint);white-space:nowrap;font-weight:600;
}

/* ---- Mock popup (Step 2) ---- */
.mock-popup{
  width:100%;max-width:300px;
  background:#fff;border-radius:14px;padding:20px 18px;
  box-shadow:0 12px 40px rgba(0,0,0,0.35);
  font-family:'DM Sans',sans-serif;color:#0a0a0a;
}
.mock-pop-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:14px;
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
  font-family:'DM Sans',sans-serif;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-size:12px;
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
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:14px;
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
  font-family:'DM Sans',sans-serif;
}
.accordion-left{display:flex;align-items:center;gap:12px;flex:1}
.accordion-head{display:flex;align-items:center;gap:12px;padding:18px 22px 10px}
.accordion-icon{font-size:22px;flex-shrink:0}
.accordion-headline{
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:700;font-size:26px;
  line-height:1.2;color:var(--ink);letter-spacing:-0.1px;
}
.accordion-chev{
  font-family:'DM Sans',sans-serif;font-size:22px;line-height:1;
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
  font-family:'DM Sans',sans-serif;
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
  font-family:'DM Sans',sans-serif;font-size:12px;font-weight:800;color:#a07f30;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-size:72px;line-height:1;
  color:var(--pink);opacity:0.5;font-weight:900;pointer-events:none;
}
.pullquote-text{
  position:relative;z-index:1;
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-weight:600;
  font-size:clamp(16px,2vw,20px);line-height:1.5;
  color:var(--ink);
}

/* ======== Callout ======== */
.callout{border-radius:16px;padding:22px 24px;margin:4px 0;position:relative;overflow:hidden}
.callout-white{
  background:var(--cream-2);color:var(--ink-dark);
  box-shadow:0 8px 28px rgba(201,164,73,0.15), 0 0 0 1px rgba(255,255,255,0.5) inset;
}
.callout-white .callout-headline{color:var(--ink-dark);font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:700;font-size:18px;margin-bottom:8px;letter-spacing:-0.2px}
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
.callout-gradient .callout-headline{color:var(--ink);font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:700;font-size:18px;margin-bottom:8px;letter-spacing:-0.2px}
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.pp-q-text{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);letter-spacing:-0.3px;
}
.pp-options{display:flex;flex-direction:column;gap:10px;position:relative;z-index:1}
.pp-option{
  width:100%;padding:18px 22px;
  background:var(--cream-2);color:var(--ink-dark);
  border:2px solid transparent;border-radius:14px;
  cursor:pointer;transition:all .25s cubic-bezier(.34,1.56,.64,1);
  display:flex;align-items:center;justify-content:space-between;gap:14px;
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:15px;text-align:left;
  box-shadow:0 4px 16px rgba(201,164,73,0.12);
}
.pp-option:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,164,73,0.2)}
.pp-option.picked{
  background:var(--holo);color:#0a0a0a;border-color:#0a0a0a;
  box-shadow:0 8px 28px rgba(201,164,73,0.4);
}
.pp-option.dim{opacity:0.45;transform:scale(0.98)}
.pp-option-arrow{
  font-family:'DM Sans',sans-serif;font-size:18px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--mint);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.pp-result-name{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:20px;
  background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  margin-bottom:6px;letter-spacing:-0.2px;
}
.pp-result-tier{font-size:12.5px;color:var(--ink-soft);margin-bottom:16px}
.pp-result-tier strong{color:var(--pink-2)}
.pp-result-points{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.pp-result-point{display:flex;gap:10px;font-size:13.5px;color:var(--ink-soft);line-height:1.5}
.pp-point-dot{color:var(--pink);flex-shrink:0;margin-top:1px;font-size:11px}
.pp-result-cta{
  font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:1.5px;
  color:var(--mint);text-transform:uppercase;font-weight:500;
  padding-top:12px;border-top:1px dashed rgba(201,164,73,0.3);
}

/* ======== Philosophy Triad (Day 1) ======== */
.triad-wrap{margin-top:22px}
.triad-intro{text-align:center;margin-bottom:16px}
.triad-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
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
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:16px;
  color:var(--ink-dark);letter-spacing:-0.2px;margin-bottom:4px;
}
.triad-sub{
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-weight:500;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  color:var(--cyan);text-transform:uppercase;font-weight:500;margin-bottom:6px;
}
.cf-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:19px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:1.5px;
  color:var(--purple);margin-bottom:6px;font-weight:500;
}
.cf-focus-label{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:17px;
  color:var(--ink-dark);letter-spacing:-0.2px;margin-bottom:4px;
}
.cf-focus-desc{
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-weight:500;
  font-size:12px;color:rgba(10,10,10,0.6);line-height:1.35;
}
.cf-skip-row{
  display:flex;align-items:center;gap:8px;flex-wrap:wrap;
  padding:14px 16px;border-radius:12px;
  background:rgba(0,0,0,0.2);border:1px dashed rgba(201,164,73,0.25);
  position:relative;z-index:1;
}
.cf-skip-label{
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:1.5px;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-size:23px;font-weight:700;
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
  font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;
  color:var(--purple);
  min-width:32px;padding-top:2px;
  letter-spacing:1px;
}
.action-text{
  font-size:14.5px;line-height:1.65;color:var(--ink-dark);
  flex:1;font-family:'DM Sans',sans-serif;font-weight:500;
  display:flex;flex-direction:column;align-items:flex-start;
}
.action-btn{
  display:inline-flex;align-items:center;gap:8px;margin-top:14px;
  padding:12px 22px;border-radius:999px;
  background:#0a0a0a;color:#fefcf7;
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:13.5px;letter-spacing:0.2px;
  text-decoration:none;border:1px solid rgba(201,164,73,0.55);
  box-shadow:0 4px 14px rgba(10,10,10,0.18);transition:transform .15s, box-shadow .15s;
}
.action-btn:hover{transform:translateY(-1px);box-shadow:0 7px 20px rgba(10,10,10,0.28)}

/* ======== Prompt pane ======== */
.prompt-intro{font-size:14px;line-height:1.65;color:var(--ink-soft);padding:0 4px}
.page-label{font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-size:23px;font-weight:700;color:#0a0a0a;letter-spacing:-0.3px;margin:40px 0 16px;padding-top:26px;border-top:1px solid rgba(10,10,10,0.08)}
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
  font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--cyan);font-weight:500;
}
.prompt-copy-btn{
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.5px;
  font-weight:600;color:#0a0a0a;background:var(--holo);
  padding:8px 16px;border-radius:8px;border:none;cursor:pointer;transition:all .15s;
  box-shadow:0 2px 12px rgba(201,164,73,0.4);
}
.prompt-copy-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(201,164,73,0.55)}
.prompt-text{
  font-family:'DM Sans',sans-serif;font-size:12px;line-height:1.9;
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
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:14px;
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
  background:none;border:none;font-family:'DM Sans',sans-serif;font-weight:600;
}
.bottom-next:hover{color:var(--cyan)}

.lesson-footer{margin-top:52px;padding-top:28px;border-top:1px solid var(--border);text-align:center}
.lf-brand{font-family:'DM Sans',sans-serif;font-weight:700;font-size:15px;color:var(--ink);margin-bottom:6px}
.lf-brand em{font-style:italic;background:var(--holo);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.lf-details{font-size:11px;color:var(--ink-faint);margin-bottom:4px}
.lf-links{font-size:11px;color:var(--ink-faint)}
.lf-links a{color:var(--purple-2);text-decoration:none}
.lf-links a:hover{color:var(--pink)}
.lf-credit{font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);margin-top:10px;opacity:0.7}

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
  .accordion-headline{font-size:22px}
  .hero-text{font-size:17px}
  .pullquote{padding:24px 22px 24px 60px}
}


/* ======================================================================
   NEW COMPONENTS FOR V9
   ====================================================================== */

/* ===== MISSION CARD (Day 1) ===== */
.mission-wrap{margin-top:32px}
.mission-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:600;font-style:italic;
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
  font-family:'DM Sans',sans-serif;
}
.mission-punch{
  font-family:'DM Sans',sans-serif;font-weight:900;font-style:italic;
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
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:700;font-style:italic;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2.5px;
  text-transform:uppercase;font-weight:500;
  color:#b26bff;margin-bottom:10px;
}
.aa-bio{
  font-size:14.5px;line-height:1.7;color:var(--ink-dark);
  font-family:'DM Sans',sans-serif;font-weight:500;
}
.aa-bio strong{
  font-weight:800;color:#b26bff;
}
.aa-sig{
  margin-top:10px;
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:400;font-style:italic;
  font-size:13px;color:var(--ink-dark);opacity:0.7;letter-spacing:0.2px;
}

/* ===== OLD BARGAIN CARD (Day 1) ===== */
.bargain-wrap{margin-top:30px}
.bargain-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-weight:500;font-size:11px;letter-spacing:3px;
  color:#ff6bc1;border:2px solid #ff6bc1;border-radius:4px;
  padding:4px 10px;transform:rotate(-8deg);opacity:0.75;
}
.bargain-title{
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:700;font-size:30px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2px;
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
  font-family:'DM Sans',sans-serif;font-weight:800;font-style:italic;
  font-size:20px;
  background:var(--holo);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  letter-spacing:-0.3px;
}

/* ===== VALUES TRIAD (Day 1) ===== */
.values-wrap{margin-top:32px}
.values-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--mint);margin-bottom:8px;
}
.values-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:20px;
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
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);letter-spacing:-0.3px;line-height:1.1;
}
.value-over-sep{
  font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--ink-faint);font-weight:500;
  margin:2px 0;
}
.value-under{
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-weight:400;font-style:italic;
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
  font-family:'DM Sans',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--purple-2);margin-bottom:8px;
}
.catmap-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:20px;
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
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;font-weight:500;
  color:var(--pink);margin-bottom:6px;
}
.fire-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:18px;
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
  font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:2px;
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
  font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:2px;
  text-transform:uppercase;color:var(--purple-2);font-weight:500;margin-bottom:3px;
}
.recguide-title{
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:14.5px;
  color:var(--ink);letter-spacing:-0.2px;
}
.recguide-chev{
  font-family:'DM Sans',sans-serif;font-weight:400;font-size:24px;color:var(--ink-soft);
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
  font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;
  color:var(--purple-2);text-align:center;padding-top:2px;letter-spacing:0.5px;
}
.recguide-beat-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:5px}
.recguide-beat{
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:14px;
  color:var(--ink);letter-spacing:-0.2px;
}
.recguide-time{
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:1.5px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ink-faint);font-weight:500;margin-bottom:8px;
}
.ps-card-title{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:22px;
  color:var(--ink);margin-bottom:10px;letter-spacing:-0.3px;
}
.ps-card-body{
  font-size:13.5px;line-height:1.65;color:var(--ink-soft);
}
.ps-connector{display:flex;align-items:center;justify-content:center}
.ps-plus{
  font-family:'DM Sans',sans-serif;font-weight:300;font-size:36px;
  color:var(--purple-2);opacity:0.7;
}
.ps-footer{
  margin-top:16px;text-align:center;
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-size:15px;
  color:var(--ink-soft);
}

/* ===== INFINITE VS FINITE (Day 3) ===== */
.ivf-wrap{margin-top:30px}
.ivf-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ink-faint);font-weight:500;margin-bottom:4px;
}
.ivf-offer{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:18px;
  color:var(--ink);margin-bottom:10px;letter-spacing:-0.3px;
}
.ivf-body{
  font-size:13px;line-height:1.7;color:var(--ink-soft);
}
.ivf-footer{
  margin-top:16px;text-align:center;
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-size:15px;
  color:var(--ink-soft);
}

/* ===== SAME TOOL TWO POSITIONS (Day 4) ===== */
.sttp-wrap{margin-top:30px}
.sttp-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-weight:700;font-size:10.5px;
  color:var(--ink);line-height:1.2;letter-spacing:-0.1px;
}
.tg-caption{
  margin-top:14px;font-size:13.5px;line-height:1.7;color:var(--ink-soft);
  font-style:italic;text-align:center;
}

/* ===== NODE ARROW (Day 5) ===== */
.na-wrap{margin-top:30px}
.na-badge{
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2px;
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
  font-family:'DM Sans',sans-serif;font-size:10px;
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
  font-family:'DM Sans',sans-serif;font-weight:900;font-size:40px;
  background:var(--holo);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  text-align:center;line-height:1;
}
.rm-label{
  font-size:14px;color:var(--ink-soft);line-height:1.4;
}
.rm-label strong{color:var(--ink);font-weight:700}
.rm-equal{
  font-family:'DM Sans',sans-serif;font-size:22px;color:var(--ink-faint);text-align:center;
}
.rm-result{
  font-family:'DM Sans',sans-serif;font-weight:800;font-size:16px;
  color:var(--ink);letter-spacing:-0.2px;line-height:1.3;
}
.rm-footer{
  margin-top:16px;text-align:center;
  font-family:'Seriously Nostalgic','Cormorant Garamond',serif;font-style:italic;font-size:15px;
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
