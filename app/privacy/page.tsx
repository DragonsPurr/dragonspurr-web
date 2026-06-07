import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { siteInfo } from '@/app/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteInfo.name}`,
  description: `How ${siteInfo.name} collects, uses, and protects personal information on this website and shop.`,
};

const LAST_UPDATED = 'May 21, 2026';

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="dp-section-header text-xl">{title}</h2>
      <div className="dp-body-text space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl pb-12">
      <div className="dp-page-header">
        <strong>Privacy Policy</strong>
      </div>
      <p className="dp-body-text text-gray-400 mb-8">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="space-y-10">
        <PolicySection title="Who we are">
          <p>
            This policy explains how <strong>{siteInfo.name}</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) handles your personal information when you visit{' '}
            <a href={siteInfo.url} className="dp-link">
              {siteInfo.url}
            </a>{' '}
            and our{' '}
            <Link href="/shop" className="dp-link">
              online shop
            </Link>
            . We are a Canadian business. If you have questions about privacy, email us at{' '}
            <a href={`mailto:${siteInfo.generalInquiryEmail}`} className="dp-link">
              {siteInfo.generalInquiryEmail}
            </a>
            .
          </p>
        </PolicySection>

        <PolicySection title="Information we collect">
          <p>
            <strong>When you contact us.</strong> If you use our{' '}
            <Link href="/contact" className="dp-link">
              contact form
            </Link>
            , we receive your name, email address, subject, and message so we can read and reply to you.
          </p>
          <p>
            <strong>When you shop with us.</strong> If you create an account, we collect your email address, password,
            and any name you choose to provide. When you check out, we collect the information needed to complete your
            order, such as your email, shipping name and address, phone number if you provide one, what you ordered,
            and how you want it shipped. Payment details are handled by our payment partners; we do not store your full
            card number on this website.
          </p>
          <p>
            You can look around the shop without signing in. If you add items to your cart, we save your cart on your
            device so it is still there when you come back.
          </p>
          <p>
            <strong>When you browse the site.</strong> Like most websites, we may receive basic technical information
            when you visit, such as which pages you viewed, when you visited, and what type of browser you use. This
            helps us keep the site running safely.
          </p>
          <p>
            <strong>Website statistics.</strong> We may use simple, privacy-friendly statistics to see how many people
            visit the site and which pages are popular. We do not use this information to advertise to you on other
            websites.
          </p>
        </PolicySection>

        <PolicySection title="Cookies">
          <p>
            Cookies are small files stored on your device. We use cookies so your shopping cart and sign-in status work
            from page to page. You can remove cookies in your browser settings; if you do, you may need to sign in again
            or your cart may be cleared.
          </p>
          <p>
            If we use website statistics, those tools may also store a small amount of information on your device.
          </p>
        </PolicySection>

        <PolicySection title="How we use your information">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Answer your messages and help you as a customer;</li>
            <li>Process orders, take payment, and arrange delivery;</li>
            <li>Keep your account and order history if you shop with us;</li>
            <li>Improve and protect our website;</li>
            <li>Meet legal and tax requirements for our business.</li>
          </ul>
          <p>We do not sell your personal information.</p>
        </PolicySection>

        <PolicySection title="Who we share information with">
          <p>
            We share information only when needed to run our business. That includes companies that help us send email,
            run our online shop, process payments, deliver web pages and images, host the website, and understand general
            traffic to the site. These partners are expected to protect your information and use it only for the work
            they do for us.
          </p>
          <p>
            Some pages link to social media or other websites. If you leave our site by following those links, those
            websites have their own privacy rules.
          </p>
        </PolicySection>

        <PolicySection title="How long we keep information">
          <p>
            We keep information only as long as we need it for the reasons above. Order records may be kept longer when
            the law requires it, for taxes, or to resolve disputes. Messages you send us are kept according to our usual
            email practices.
          </p>
        </PolicySection>

        <PolicySection title="How we protect your information">
          <p>
            We take reasonable steps to protect your information, including secure connections when you use the site
            and careful handling of account sign-in. No website can promise perfect security, but we work to reduce risk.
          </p>
        </PolicySection>

        <PolicySection title="Your choices">
          <p>
            You can ask us what information we have about you, ask us to correct it, or ask us to delete it where the
            law allows. Canadian privacy law may give you additional rights depending on where you live.
          </p>
          <p>
            To make a request, email{' '}
            <a href={`mailto:${siteInfo.generalInquiryEmail}`} className="dp-link">
              {siteInfo.generalInquiryEmail}
            </a>
            . If you need to change your shop password or account details and cannot do it yourself, contact us and we
            will help.
          </p>
        </PolicySection>

        <PolicySection title="Children">
          <p>
            Our website and shop are not meant for children under 13. We do not knowingly collect personal information
            from children. If you think a child sent us information, please contact us and we will remove it.
          </p>
        </PolicySection>

        <PolicySection title="Changes to this policy">
          <p>
            We may update this policy from time to time. When we do, we will change the date at the top of this page.
            If you keep using the site after an update, that means you accept the revised policy.
          </p>
        </PolicySection>

        <PolicySection title="Contact us">
          <p>
            <strong>{siteInfo.name}</strong>
            <br />
            {siteInfo.address}
            <br />
            Email:{' '}
            <a href={`mailto:${siteInfo.generalInquiryEmail}`} className="dp-link">
              {siteInfo.generalInquiryEmail}
            </a>
          </p>
        </PolicySection>
      </div>
    </div>
  );
}
