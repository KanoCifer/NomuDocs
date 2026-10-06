---
title: "Terms of service"
description: "The Nomu terms of service: accounts and what the service covers, your content and the licence you grant, AI credits and billing, acceptable use, how third-party platforms fit in, disclaimers, liability limits, changes to these terms and dispute resolution."
---

# Nomu terms of service

> **Note: this English version is a machine translation for reference. The authoritative version is the Chinese one at [/terms/](/terms/).** Last updated: 2026-10-03

This document explains what you may do with Nomu, how Nomu handles your content, what you must not do, and what happens when something goes wrong. **The [privacy policy](/en/privacy/) is an integral part of these terms** — read it as well to see where data lives and when it leaves your device.

In this document, "Nomu" and "we" refer to the Nomu extension and its publisher; "you" refers to the individual or entity using Nomu.

## 1. Acceptance of these terms

1. By registering a Nomu account on the website, installing the extension, or otherwise using Nomu, you confirm that you have read, understood and accepted these terms and the privacy policy. Do not use Nomu if you do not accept them.
2. These terms take effect when you register an account, and every later use of Nomu is treated as continued acceptance.
3. You may not register using the identity information of a third party without authorisation.
4. **Minors**: anyone under 18 may use Nomu only with the knowledge and consent of a parent or guardian. Use through a guardian is treated as the guardian accepting these terms.

## 2. Accounts

1. **Registration details must be accurate**: the username and email should belong to you, and the email must be able to receive verification codes and sign-in links. If inaccurate details prevent you from signing in or recovering your account, you bear the consequences.
2. **You are responsible for your credentials**: custody and use of the password, email verification codes and email sign-in links is your responsibility. Anyone who signs in with those credentials without your knowledge is treated as acting for you.
3. **Device limit**: one account can stay signed in on up to 5 devices. Signing in on a new device does not push out an existing one, and signing out on a device clears only that device's session. Log out on old devices before exceeding the limit.
4. **No lending or transfer**: accounts may not be shared, sold or transferred, nor used to bypass credits, rate limits or any other risk control. We may suspend features or terminate the account if you do.
5. **Account deletion**: "Sign out" in the extension only clears the session on that machine; it does not delete the account. To delete your account entirely, email us. Afterwards, account data, credits and cloud pool items are handled as described in the [privacy policy](/en/privacy/).
6. **Report anything unusual**: if you think your account is being used by someone else, change your password and email us immediately.

## 3. What Nomu provides

Nomu is an extension that runs in your browser. Its main capabilities are:

- Capturing product information from 1688, Taobao / Tmall, JD.com and noon.com product pages; the right-click "Parse product draft with AI" action can also parse any page you are entitled to access
- AI translation (Chinese → English / Arabic) and local white-background image processing for product images
- Publishing to Noon sites (UAE, Saudi) one product at a time, through your existing signed-in Noon session
- Store management, product duplication, catalogue browsing, barcode label printing and the task panel
- The Nomu assistant, NomuDesign image generation and prompt optimisation

Nomu performs operations you could perform by hand in the Noon seller back office, but **it does not thereby become authorised by Noon or by any source platform**.

### 3.1 The service depends on third parties

- Nomu depends on the page structure and interfaces of Noon and of 1688 / Taobao / Tmall / JD.com. Redesigns, rate limits, bans or rule changes on those sites affect Nomu's availability, and we do not promise continuous availability of the service.
- Any action a source site or Noon takes against you (rate limiting, account ban, delisting, frozen funds) is handled between you and that platform. Nomu takes no responsibility and does not appeal on your behalf.
- Currency conversion relies on a third-party exchange-rate service, and its result is a pricing reference only.

### 3.2 No promise of results

Nomu's output is produced by rules and models, and **is not guaranteed to be entirely accurate, complete or compliant**:

- AI translation, prompt optimisation and product parsing may mistranslate, omit information or misjudge product attributes;
- A batch publish stops as soon as the first item fails; failed items are marked in the list and can be retried individually;
- Whether a product passes Noon's review is decided by Noon. **Compliance of the title, description, category, attributes, price and images is your responsibility** — spot-check before publishing.

### 3.3 Third-party model providers

Nomu does not run its own models. The AI capabilities are provided by third-party model providers: translation, prompt optimisation, assistant Q&A and product parsing are run by **DeepSeek**, while NomuDesign image generation is run by **Volcengine Ark (Doubao Seedream)** or **apiyi** depending on the model you pick. Your account token, store configuration and batch drafts are not sent to these providers.

Using a third-party model means the input for that call leaves Nomu and is processed by the provider: product parsing includes the body text and viewport screenshot of the page you right-clicked, assistant Q&A includes your question and the context of that session, and image generation includes the prompt and any reference image. **Do not submit sensitive information through those entry points.** We do not control the log retention or training practices of the upstream providers, and their terms are whatever their own published policies say; the per-call mapping is set out in the [privacy policy](/en/privacy/).

The availability, uptime and model line-up of third-party providers is not guaranteed by us. We may change providers, announcing it under section 11.

## 4. Your content and the licence you grant

1. **You keep ownership**: the product information, images, store settings and AI output you capture, edit, translate, generate and publish remain yours or belong to the third party you are entitled to use them from. Nothing in these terms transfers ownership.
2. **You must have the right to use what you submit**: you warrant that the content you submit and publish does not infringe anyone's copyright, trademark, portrait right or other lawful interest, contains nothing unlawful, and does not breach the rules of the source sites. Disputes, platform penalties and claims arising from infringement or unlawful content are yours to bear; where necessary we may suspend the related features and your account.
3. **A limited processing licence**: so that the service can be delivered, you grant us a **non-exclusive, revocable at any time, no-further-permission-required licence to process the content you submit, strictly to the extent necessary to provide the service** — including: storing your store configuration and batch drafts, performing AI calls, generating and saving images, writing the results of your AI parsing into your own cloud pool, and, when **you actively submit**, sending product data to Noon through your signed-in Noon session. The anonymous diagnostic events reported when the extension crashes are processed to diagnose and fix defects. Each item is spelled out in the [privacy policy](/en/privacy/).
4. **Capturing comes with obligations**: a page parsed with the right-click "Parse product draft with AI" action must be one you are entitled to access and use; it may not be used to circumvent the source site's technical protections, paywalls or access controls.

## 5. Acceptable use

You may not use Nomu to do any of the following:

1. Breach applicable law or regulation, or use Nomu for any unlawful purpose;
2. Infringe another's intellectual property, privacy or reputation, or submit infringing, fraudulent, false or misleading product information;
3. Circumvent the technical measures, access controls, rate limits or anti-scraping mechanisms of a source site or Noon, or place unreasonable load on them;
4. Register accounts in bulk, farm or steal credits, fake transactions, bypass credit billing, or abuse AI calls via scripts;
5. Reverse engineer, decompile or crack the extension, or remove or circumvent its licence and technical protection measures (asking us for help in order to troubleshoot is not a breach of this clause);
6. Resell, rent or share the account or the extension's features, or provide unauthorised services in Nomu's name.

If you do any of the above, we may suspend features, limit calls or terminate the account as appropriate, and reserve the right to pursue liability.

## 6. AI features and credits

1. **The extension itself is free** and is not billed per feature. AI translation, NomuDesign image generation, prompt optimisation, product parsing and assistant Q&A are billed in credits on top of signing in. See [Account & AI credits](/en/guide/account) for the cost of each.
2. **Credits do not expire.** The balance and every consumption record (source / time / amount) can be checked on the extension's Account page.
3. **Retries are not charged twice**: AI requests carry an idempotency key, and timeouts are de-duplicated by that key, so retrying does not deduct again.
4. When the balance is insufficient the corresponding AI call is refused; the main flows (capture, editing, publishing) are unaffected. Contact the administrator to top up.
5. **Credits are not redeemable for cash**, are non-transferable, cannot be given to third parties and earn no interest.
6. **Billing rates may change**: changes are announced on the [announcements page](https://nomu.kanocifer.chat/announcements) and in the extension before they take effect on the date stated; **credits you already hold are unaffected** and continue to be deducted at the original rate until used up.
7. **Consumed credits are generally not refundable**, except where a failure on our side means the call did not actually deliver a result — in that case we refund the corresponding credits or make them good.
8. **AI output is your responsibility**: AI-generated titles, descriptions, attributes, category suggestions and images are machine-generated content and must be reviewed by a human before publishing. Platform penalties, delisting or third-party claims caused by publishing without that review are yours.

## 7. Intellectual property

1. Copyright and other rights in the Nomu extension's source code, interface, the brand name "Nomu" and related marks, documentation and materials belong to us and are protected by copyright law.
2. Without written permission you may not copy, modify, rent, sell, distribute or reverse engineer the Nomu extension, or otherwise infringe those rights.
3. Nothing in these terms grants you any right to use our trademarks or marks.
4. Trademarks, service marks and product names belong to their respective owners. Noon, 1688, Taobao, Tmall, JD.com and Chrome are trademarks of their respective owners; Nomu has no affiliation with, agency relationship to, or partnership with any of them.
5. Feedback or suggestions you send us are treated as a perpetual, worldwide, royalty-free, non-exclusive licence to use.

## 8. Changes to, interruption of and termination of the service

1. **Feature changes**: we may add, change or remove features as needed. Removals are announced in advance where possible on the [announcements page](https://nomu.kanocifer.chat/announcements) and in the extension.
2. **Maintenance and failures**: the service may be interrupted by maintenance, upgrades, failures or force majeure. We announce in advance where possible, but do not promise that the service is never interrupted or never in error.
3. **Termination**: you may stop using Nomu and delete your account at any time; we may also stop providing the service to you under these terms or applicable law. After termination, account data is handled as described in the [privacy policy](/en/privacy/), and any remaining credit balance is not refunded (except as provided in clause 6.7).
4. **Long-term maintenance risk**: Nomu is maintained by an independent developer and may stop being updated at some point in the future. Back up important data; do not use Nomu as the only store of your product information and store configuration.

## 9. Disclaimer of warranties

1. Nomu is provided **as is**. To the maximum extent permitted by law, we give no express or implied warranty, including but not limited to any warranty of merchantability, fitness for a particular purpose, non-infringement, non-interference with business, or freedom from errors.
2. We do not promise that the service will be permanently available, nor that its results will meet your particular business purposes.
3. We are not liable for: rule changes, rate limits, bans or review rejections on a source site or on Noon; loss of data caused by causes not attributable to us; or loss arising from your failure to review AI output or verify publishing results.
4. Your use of Nomu, and everything you submit to third-party platforms through it, is judged by you and borne by you.

## 10. Limitation of liability

1. To the maximum extent permitted by law, we are not liable for any indirect, incidental, consequential or punitive loss, or any loss of profit, data or goodwill, arising from these terms or your use of the service, even if we have been advised that such loss may occur.
2. Our liability directly connected with the service is **capped at the consideration you actually paid for using Nomu in the 12 months before the event giving rise to the claim**; if you have never paid any consideration, the cap is 【liability cap amount, to be filled in】.
3. These limits do not apply where the law prohibits limiting or excluding liability, including for loss caused by our wilful misconduct or gross negligence.

## 11. Changes to these terms

1. We may update these terms from time to time. Updates are marked with a new "Last updated" date on this page, and material changes are also described on the [announcements page](https://nomu.kanocifer.chat/announcements).
2. **Material changes** (such as to the liability limits, billing rules or dispute resolution) are announced at least 7 days in advance in the extension and on this page.
3. Continuing to use Nomu after a change takes effect means you accept it; if you do not accept, stop using Nomu and delete your account.

## 12. Governing law and disputes

1. The formation, validity, interpretation, performance of and disputes arising from these terms are governed by 【governing law, to be filled in】.
2. You and we should first try to resolve any dispute amicably. If that fails, either party may bring proceedings before 【court with jurisdiction, to be filled in】.
3. If any provision of these terms is found invalid or unenforceable, the remaining provisions remain in effect.

## 13. Contact

For questions about these terms, or to discuss a clause, email us: `dethe3255@gmail.com`. We will verify your identity before replying.

## Change log

- 2026-10-03: First published.
