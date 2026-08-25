# AI Article Writer UI Prompt

Create a modern SaaS-style AI Article Writer dashboard page for a blog CMS.

## Layout Requirements

The page must use a horizontal stepper workflow at the top.

Workflow Steps:

[✓ Step 1 Research] → [✓ Step 2 Outline] → [✓ Step 3 Content] → [✓ Step 4 Images] → [○ Step 5 Preview & Publish]

Rules:

- Current active step should be highlighted.
- Completed steps show a green check icon.
- Future steps show a gray circle.
- Users cannot jump ahead until the current step is completed.
- When a step is completed, automatically move to the next step.
- Show smooth progress animations.
- Show overall completion percentage.
- 5 steps 5 react components reuseable.
- temparay full workflow working need.

---

# Step 1 — Keyword Research

Top Section:

Keyword Input

[________________________________]

[ Search Keyword ]

When Search Keyword is clicked:

Show keyword research results in a responsive table.

Columns:

- Keyword
- Search Intent
- Search Volume
- KD
- CPC Low
- CPC High

Example:

| Keyword | Intent | Volume | KD | CPC Low | CPC High |
|----------|----------|----------|----------|----------|----------|

Below the table show:

- Related Keywords
- Long Tail Keywords

Actions:

[ Continue To Outline ]

After successful completion:

Mark Step 1 as:

✓ Completed

Automatically activate Step 2.

---

# Step 2 — Outline Generator

Auto-fill researched keyword from Step 1.

Top Controls:

Category Dropdown

Tone Dropdown

Word Count Input

[ Generate Outline ]

When Generate Outline is clicked:

Display generated outline inside a modern card.

Example:

Introduction

What Is AI Development

Top AI Tools

Comparison Table

FAQs

Conclusion

Actions:

[ Edit Outline ]

[ Regenerate Outline ]

[ Continue To Content ]

After completion:

✓ Step 2 Completed

Automatically activate Step 3.

---

# Step 3 — Content Generator

Top Section:

Display selected outline summary.

Action:

[ Generate Full Article ]

When clicked:

Generate complete article content.

Layout:

Two-column layout.

Left Card:

Full Article Content

- Title
- Excerpt
- Introduction
- Sections
- Lists
- Tables
- FAQs
- Conclusion

Right Card:

Image Prompts

- Featured Image Prompt
- Section 1 Prompt
- Section 2 Prompt
- Section 3 Prompt
- Section 4 Prompt
- Section 5 Prompt

Actions:

[ Edit Content ]

[ Regenerate Content ]

[ Continue To Images ]

After completion:

✓ Step 3 Completed

Automatically activate Step 4.

---

# Step 4 — Images URL Upload

Purpose:

Upload Cloudinary image URLs.

Inputs:

Featured Image URL

Section Image URL 1

Section Image URL 2

Section Image URL 3

Section Image URL 4

Section Image URL 5

Action:

[ Upload Images ]

Validation:

- URL required
- Valid image URL
- No duplicate URLs

After upload:

Display image thumbnails.

Actions:

[ Replace Image ]

[ Continue To Preview ]

After completion:

✓ Step 4 Completed

Automatically activate Step 5.

---

# Step 5 — Preview & Publish

Top Metrics Section:

SEO Score

Readability Score

Word Count

Reading Time

Display as modern statistic cards.

Example:

SEO Score: 92/100

Readability: 95/100

Word Count: 3000

Reading Time: 12 min

---

Preview Section

Render a mini version of the live article page.

Include:

- Featured Image
- Category Badge
- Title
- Author
- Publish Date
- Table Of Contents
- Content Sections
- Uploaded Images
- Tables
- FAQs
- Conclusion
- Related Articles

The preview must visually match the actual blog article detail page.

---

Bottom Actions

[ Save Draft ]

[ Publish Article ]

After publishing:

Show:

✓ Research Completed
✓ Outline Completed
✓ Content Completed
✓ Images Uploaded
✓ Article Published

Display success state:

🎉 Article Successfully Published

---

Design Requirements

- Clean spacing
- Responsive design
- Sticky horizontal stepper
- Progress animation
- Professional admin panel appearance
- Similar quality to Notion AI, Jasper AI, Writesonic, and Surfer SEO dashboards