import { CareerPath, Diagnosis } from "@/context/SessionContext";

export interface SampleScenario {
  id: string;
  title: string;
  role: string;
  brainDump: string;
  diagnosisSummary: string;
  diagnoses: Diagnosis[];
  careerPaths: CareerPath[];
}

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: "staff-eng-churn",
    title: "Staff Engineer burned out by org churn",
    role: "Staff Software Engineer · 8 yrs experience",
    brainDump:
      "I've been a Staff Engineer at a mid-size B2B SaaS company for 4 years. Over the last 14 months we've had three re-orgs and two VP changes. Every architecture initiative I lead gets shelved halfway through when priorities pivot. I spend 25 hours a week in alignment meetings defending basic technical hygiene while still being paged for legacy incidents. I still love building systems, but I wake up dreading Slack.",
    diagnosisSummary:
      "You are experiencing classic high-agency futility: your exhaustion comes not from the technical craft itself, but from repeated context destruction, high coordination tax, and ownership without stable executive backing.",
    diagnoses: [
      {
        label: "Strategic whiplash & sunk-cost fatigue",
        description:
          "Repeated re-orgs have severed the feedback loop between your architectural effort and shipped outcomes.",
        intensity: 3,
      },
      {
        label: "Coordination tax overload",
        description:
          "Political alignment meetings and legacy on-call have crowded out deep, energizing builder time.",
        intensity: 3,
      },
      {
        label: "Intact craft motivation",
        description:
          "You still enjoy systems design when given clear problem boundaries and technical autonomy.",
        intensity: 2,
      },
    ],
    careerPaths: [
      {
        id: "1",
        name: "Carve Out an Insulated Principal IC Charter",
        description:
          "Renegotiate your scope around a single revenue-critical bottleneck with direct sponsor protection, shedding cross-org committee load.",
        timeHorizon: "1–3 months",
        risk: "Low",
        energy: "Low",
        narrative:
          "Before leaving equity and domain familiarity on the table, test whether you can trade broad glue-work for a narrow, high-leverage technical mandate with explicit air cover.",
        firstMoves: [
          "Audit your last 2 weeks of calendar time into 'shipped leverage' vs 'defensive glue'",
          "Draft a 1-page 90-day charter focused on one uncontroversial reliability or cost bottleneck",
        ],
        immediateActions: [
          "Decline or delegate 3 recurring cross-team syncs for the next two weeks as an experiment.",
          "Write a 6-bullet memo titled 'Where my time creates the highest ROI in Q2' for your skip-level.",
        ],
        phases: [
          {
            id: "p1",
            title: "Weeks 1–2: Calendar Triage & Boundary Reset",
            actions: [
              {
                id: "a1",
                title: "Eliminate unowned glue work",
                tag: "Scope Reset",
                context:
                  "Staff engineers often absorb invisible PM and EM coordination during re-orgs.",
                howTo: [
                  "List every recurring meeting and mark whether you are the decider, builder, or spectator",
                  "Send an async status note replacing your attendance in spectator meetings",
                  "Cap incident review follow-ups to a rotating roster instead of personal heroics",
                ],
                messageTemplate:
                  "To make sure we hit the Q2 reliability targets, I'm going heads-down on the ingestion bottleneck for the next 3 weeks. I'll read the async notes for this sync—tag me directly if a blocking architecture call comes up.",
              },
            ],
          },
          {
            id: "p2",
            title: "Weeks 3–6: Protected Technical Bet",
            actions: [
              {
                id: "a2",
                title: "Pitch a bounded 6-week technical deliverable",
                tag: "Executive Alignment",
                context:
                  "A concrete, measurable win restores agency faster than a 12-month platform vision.",
                howTo: [
                  "Pick a problem tied directly to COGS, latency, or enterprise churn",
                  "Agree in writing with your VP on what you will NOT work on during those 6 weeks",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Transition to a Founding / Early-Stage Infrastructure Role",
        description:
          "Move to a Series A/B technical product company where architecture and shipping are tightly coupled and politics are minimal.",
        timeHorizon: "3–6 months",
        risk: "Medium",
        energy: "Medium",
        narrative:
          "Your appetite for systems building is intact, but your tolerance for matrixed bureaucracy is depleted. A 25–60 person engineering org values direct execution over slide decks.",
        firstMoves: [
          "Define your anti-criteria (e.g., no more than 2 layers between IC and CTO)",
          "Reconnect with 5 respected former peers now at Series A/B infrastructure or dev-tools startups",
        ],
        immediateActions: [
          "Write down 3 concrete systems you built that you're proudest of—no org-chart jargon.",
          "Message two former colleagues for low-stakes 20-minute catch-ups.",
        ],
        phases: [
          {
            id: "p1",
            title: "Month 1: Quiet Signal & Network Warm-Up",
            actions: [
              {
                id: "a3",
                title: "Targeted backchannel conversations",
                tag: "Exploration",
                context:
                  "Senior IC roles at strong Series A/B companies are rarely filled via cold applications.",
                howTo: [
                  "Identify 8 technical companies with strong engineering cultures and <80 engineers",
                  "Ask trusted peers about actual engineering autonomy vs founder micromanagement",
                ],
                targetPeople: [
                  {
                    title: "Founding / Principal Engineer",
                    example: "Series A/B developer tools, data infrastructure, or applied AI startups",
                  },
                ],
                searchPrompt:
                  '("Founding Engineer" OR "Staff Engineer") AND ("distributed systems" OR "infrastructure") AND ("Series A" OR "Series B")',
                messageTemplate:
                  "Hey! Caught your recent post on your storage engine migration. I'm starting to quietly explore smaller, high-output engineering teams after 4 years scaling our platform here—would love to hear how engineering scope works at your team over a quick 15-min coffee.",
              },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "Structured Sabbatical & Advisory Bridge",
        description:
          "Take 8–12 weeks off to clear burnout residue while running 1–2 fractional architecture audits.",
        timeHorizon: "2–4 months",
        risk: "Medium",
        energy: "Low",
        narrative:
          "When burnout is physical and cognitive, jumping straight into an interview loop often leads to picking the same dysfunctional environment in a different logo.",
        firstMoves: [
          "Calculate your comfortable 6-month liquid runway",
          "Package a 2-week fixed-scope 'Architecture & Reliability Audit' offering for seed-stage CTOs",
        ],
        immediateActions: [
          "Review your vesting cliff, PTO payout rules, and healthcare continuation options.",
          "Block two full weekends with zero technical reading or work catch-up.",
        ],
        phases: [
          {
            id: "p1",
            title: "Month 1: Decompression & Financial Floor",
            actions: [
              {
                id: "a4",
                title: "Set a hard detachment window",
                tag: "Recovery",
                context:
                  "A break only works if you aren't guilt-scrolling job boards on day three.",
                howTo: [
                  "Commit to zero full-time interviews for the first 30 days",
                  "Keep a short notebook of what technical problems naturally pull your curiosity back",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "em-craft-pivot",
    title: "Engineering Manager torn between leadership and craft",
    role: "Engineering Manager · 10 yrs experience",
    brainDump:
      "I moved into engineering management 3 years ago because nobody else stepped up when our team doubled. I care deeply about my 9 reports, but my days are 100% performance calibrations, Jira hygiene, and resource horse-trading. I miss having tangible technical output, and with AI tooling making small IC teams so fast, I worry my middle-management layer is becoming fragile.",
    diagnosisSummary:
      "You stepped into management out of service rather than calling, and you are now caught in the 'middle-management squeeze'—carrying high emotional labor with low technical leverage.",
    diagnoses: [
      {
        label: "Accidental manager drift",
        description:
          "You took the role to stabilize the team, but administrative people-ops has replaced the craft that energizes you.",
        intensity: 3,
      },
      {
        label: "Player-coach compression",
        description:
          "Modern engineering orgs increasingly reward technical leaders who can stay close to architecture and AI-augmented execution.",
        intensity: 2,
      },
    ],
    careerPaths: [
      {
        id: "1",
        name: "Boomerang to Tech Lead / Staff IC in Current Org",
        description:
          "Partner with your Director to transition back to a hands-on Staff/Tech Lead role on a flagship product initiative.",
        timeHorizon: "2–4 months",
        risk: "Low",
        energy: "Medium",
        narrative:
          "Returning to IC inside a company where you already have trust is the lowest-friction way to rebuild your recent hands-on portfolio.",
        firstMoves: [
          "Identify a deputy or sister-team EM who can absorb people-management for your reports",
          "Take direct technical ownership of one architectural spike this sprint",
        ],
        immediateActions: [
          "Block 90 minutes tomorrow morning for uninterrupted code/design work before opening Slack.",
          "List 2 senior engineers on your team ready to take on sprint facilitation.",
        ],
        phases: [
          {
            id: "p1",
            title: "Weeks 1–4: Re-establish Technical Cadence",
            actions: [
              {
                id: "em-a1",
                title: "Delegate ritual ceremony ownership",
                tag: "Team Design",
                context:
                  "Freeing 6 hours a week proves both that your team is self-sufficient and that you can deliver technical artifacts.",
                howTo: [
                  "Rotate sprint planning and retro facilitation among senior ICs",
                  "Ship one meaningful PR or RFC every week for four weeks",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Pivot to AI-Native Product Engineer / Forward-Deployed Lead",
        description:
          "Combine your customer empathy, systems scoping, and technical fluency in a high-autonomy customer-facing engineering role.",
        timeHorizon: "3–6 months",
        risk: "Medium",
        energy: "High",
        narrative:
          "Ex-EMs who can code make exceptional Forward-Deployed Engineers and Technical Product Leads because they already know how to scope ambiguity with stakeholders.",
        firstMoves: [
          "Build and deploy one end-to-end reference project using modern agentic/eval workflows",
          "Reframe your resume around shipped systems and cross-functional outcomes rather than headcount size",
        ],
        immediateActions: [
          "Draft a 'Technical Builder' version of your CV that leads with architecture and product metrics.",
        ],
        phases: [
          {
            id: "p1",
            title: "Weeks 1–4: Portfolio & Narrative Refresh",
            actions: [
              {
                id: "em-a2",
                title: "Ship a public technical artifact",
                tag: "Craft Proof",
                context:
                  "A crisp repo and architecture write-up immediately answers the 'are they still hands-on?' question.",
                howTo: [
                  "Pick a real workflow pain point and build a clean, tested tool over two weekends",
                  "Write a 800-word engineering post mortem on the trade-offs",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "Step Up to Outcome-Focused Head of Engineering (Small Co)",
        description:
          "Move from middle-managing processes at a larger firm to owning the whole technical roadmap at a 15-person company.",
        timeHorizon: "4–8 months",
        risk: "High",
        energy: "High",
        narrative:
          "Sometimes the problem isn't leadership itself, but having responsibility without authority in the middle layer.",
        firstMoves: [
          "Audit whether you enjoy hiring, product strategy, and executive trade-offs when HR bureaucracy is removed",
        ],
        immediateActions: [
          "Write a 1-page reflection on the 3 management moments that gave you energy vs drained you.",
        ],
        phases: [
          {
            id: "p1",
            title: "Month 1: Executive Scope Calibration",
            actions: [
              {
                id: "em-a3",
                title: "Interview 3 VPs/Heads of Eng at 15–40 person startups",
                tag: "Discovery",
                context:
                  "Validate day-to-day reality before committing to a small-company leadership search.",
                howTo: [
                  "Ask how they split their week between architecture, recruiting, and customer calls",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "designer-wind-down",
    title: "Product Designer after a startup wind-down",
    role: "Senior Product Designer · 6 yrs experience",
    brainDump:
      "The startup where I was the lead designer for 2.5 years just wound down after failing to raise a Series B. We shipped great work, but because the company folded, I feel like my story looks like a failure. Half the job postings now ask for 'Design Engineer' who ships production React/Tailwind, and I'm torn between leveling up my code fluency or targeting established design-system teams.",
    diagnosisSummary:
      "You are conflating company macro-outcomes with personal craft value, while standing at a high-leverage fork between full-stack Design Engineering and deep Systems/Product Design.",
    diagnoses: [
      {
        label: "Post-shutdown narrative bruised confidence",
        description:
          "A startup wind-down often masks strong zero-to-one product judgment if you don't separate product craft from fundraising macro.",
        intensity: 3,
      },
      {
        label: "Design-Engineer skill adjacency",
        description:
          "Your startup breadth puts you closer to shipping code and interactive prototypes than you realize.",
        intensity: 2,
      },
    ],
    careerPaths: [
      {
        id: "1",
        name: "Position as a 0-to-1 Design Engineer",
        description:
          "Turn your startup versatility into a superpower by pairing case studies with live, interactive React/Tailwind prototypes.",
        timeHorizon: "4–8 weeks",
        risk: "Low",
        energy: "High",
        narrative:
          "Hiring managers at AI and modern SaaS companies overwhelmingly prefer a designer who can tune interaction details directly in the repo.",
        firstMoves: [
          "Rebuild 2 key flows from your startup as live interactive components on your personal site",
          "Lead every case study with the user problem, iteration speed, and measured adoption",
        ],
        immediateActions: [
          "Pick the single best interaction flow you designed in the last 2 years and outline a 3-minute Loom walkthrough.",
        ],
        phases: [
          {
            id: "p1",
            title: "Weeks 1–3: Live Artifact Portfolio",
            actions: [
              {
                id: "des-a1",
                title: "Publish 2 interactive code-backed case studies",
                tag: "Portfolio",
                context:
                  "Interactive components prove taste and velocity in 15 seconds, bypassing static Figma deck fatigue.",
                howTo: [
                  "Extract the core UI state machine of your best feature into a standalone route",
                  "Include a short 'What I'd change with hindsight' section to show senior judgment",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Target Senior Product Designer at Growth-Stage B2B",
        description:
          "Join a 150–500 person company with proven product-market fit where your 0-to-1 speed accelerates a new product line.",
        timeHorizon: "2–3 months",
        risk: "Low",
        energy: "Medium",
        narrative:
          "Growth-stage companies launching a second or third product specifically hunt for former startup lead designers who don't need hand-holding.",
        firstMoves: [
          "Shortlist 15 Series C/D companies launching new AI or workflow modules",
          "Reach out directly to Heads of Design with a 90-second video teardown",
        ],
        immediateActions: [
          "List 10 former teammates, PMs, and founders from your startup who can vouch for your speed and ownership.",
        ],
        phases: [
          {
            id: "p1",
            title: "Weeks 1–4: High-Signal Outreach",
            actions: [
              {
                id: "des-a2",
                title: "Direct hiring-manager outreach with artifact link",
                tag: "Outreach",
                context:
                  "A direct note with a live link converts 5x better than applicant-tracking queues.",
                howTo: [
                  "Send a concise note highlighting one zero-to-one workflow you shipped and its adoption metric",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
