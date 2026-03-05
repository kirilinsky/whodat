# 🕵️‍♂️ WhoDat?

A high-fidelity, daily AI-driven social deduction game built with **Next.js**.

## 💡 The Concept

Every 24 hours, a new historical or cultural figure goes "incognito." You take the role of an investigator with **7 attempts** to interrogate the subject and uncover their identity.

- **Daily Challenge:** One person, one chance per day.
- **Persona Engine:** Interrogate a dynamic AI that reflects the character's real personality without revealing their name.
- **XP & Dossier:** Successfully identify the target to earn XP and add their "case file" to your permanent collection.

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **AI Engine:** OpenAI `gpt-4o-mini`
- **Database:** PostgreSQL + [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Styling:** [Panda CSS](https://panda-css.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🚀 Key Features

- **Atomic Transactions:** Reliable XP calculation and session management.
- **Cyber-Terminal UI:** Motion-driven transitions, blurred-to-clear image crossfades, and "scanline" effects.
- **Adaptive Intelligence:** Custom system prompts that recognize identity reveals even with minor typos.
- **Global Access:** Full interrogation and UI support in **English**, **Russian**, and **German**.

## 🏗 Project Structure

- `/db` - Drizzle schema and database configuration.
- `/app/actions` - Server Actions for chat logic and session management.
- `/components` - Atomic UI components styled with Panda CSS.
