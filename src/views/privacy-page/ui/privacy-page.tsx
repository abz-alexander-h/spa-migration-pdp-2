import clsx from 'clsx';
import Head from 'next/head';

import styles from './privacy-page.module.css';

export function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy policy</title>
        <meta
          name="description"
          content="Privacy Policy of Grand Drive with details about collected and processed data."
        />
      </Head>

      <div className={clsx('container', styles.privacy)}>
        <h1>Privacy policy</h1>
        <p>
          This Privacy Policy describes how Grand Drive (&quot;we,&quot; &quot;us,&quot; or the
          Showroom) collects, uses, and protects your information when you visit our website or use
          our services.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect only the information necessary to provide high-quality service:</p>
        <ul>
          <li>
            Personal Data: Name, phone number, and email address provided by you through test drive
            or consultation forms.
          </li>
          <li>
            Technical Data: IP address, browser type, visit duration, and pages viewed (collected
            automatically via cookies).
          </li>
          <li>
            Vehicle Data: If you use Trade-in service, we collect information about your current
            vehicle (VIN, mileage, condition).
          </li>
        </ul>

        <h2>Data Sharing with Third Parties</h2>
        <p>
          We do not sell your data. We may share information with trusted partners only in the
          following cases:
        </p>
        <ul>
          <li>Banks and Financial Institutions: To process your credit or leasing applications.</li>
          <li>Insurance Companies: To issue insurance policies for your vehicle.</li>
          <li>Legal Requirements: If required by applicable law.</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We use modern encryption methods (SSL certificates) and secure servers to prevent
          unauthorized access to your personal information.
        </p>

        <h2>Your Rights</h2>
        <p>At any time, you have the right to:</p>
        <ul>
          <li>Request a copy of the personal data we hold about you.</li>
          <li>Request correction or deletion of your data from our database.</li>
          <li>Opt out of marketing communications.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Our website uses cookies for analytics and to enhance user experience. You can disable
          cookies in your browser settings; however, this may affect the functionality of certain
          sections of the site.
        </p>
      </div>
    </>
  );
}
