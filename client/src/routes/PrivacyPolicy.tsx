import "@styles/routes/blog/BlogPost.scss";
import { Link } from "react-router-dom";

const lastUpdated = "June 13, 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <title>Privacy Policy | Maher Mahmoud</title>
      <div id="blog-post" className="privacy-policy-post">
        <article id="post-container">
          <section id="title-and-date">
            <h1>Privacy Policy</h1>
            <p>
              <em>Last updated: {lastUpdated}</em>
            </p>
          </section>

          <p>
            This policy explains what information this website collects, why it
            is used, and the choices you have when visiting mahermah.com,
            portfolio pages, and related blog pages operated by Maher Mahmoud.
          </p>

          <h2>Information You Provide</h2>
          <p>
            If you use the contact form, this website collects the name, email
            address, and message you submit. That information is used only to
            read your inquiry, reply to you, prevent abuse, and keep a record of
            professional communication when needed.
          </p>

          <h2>Analytics</h2>
          <p>
            This website uses Umami Analytics to understand aggregate site
            usage, such as visited pages, referral sources, approximate
            location, device type, browser, operating system, and visit counts.
            Umami is used for privacy-conscious analytics and does not require
            advertising trackers or cross-site profiling.
          </p>
          <p>
            Analytics data is reviewed in aggregate to improve page performance,
            content, navigation, and reliability. It is not used to identify
            individual visitors.
          </p>

          <h2>Technical Data and Security</h2>
          <p>
            Hosting providers, server software, security tools, and rate
            limiting systems may process technical details such as IP address,
            request time, requested URL, browser user agent, and error logs.
            This information is used to operate the website, troubleshoot
            issues, block spam or abuse, and protect the service.
          </p>

          <h2>Cookies and Local Storage</h2>
          <p>
            This website does not use advertising cookies. Browser storage may
            be used only when necessary for normal website functionality,
            preferences, analytics configuration, or security. You can restrict
            cookies and site storage through your browser settings, although
            some functionality may be affected.
          </p>

          <h2>How Information Is Shared</h2>
          <p>
            Personal information is not sold. Information may be processed by
            service providers that help run the website, including hosting,
            email delivery, analytics, security, and infrastructure providers.
            Information may also be disclosed if required by law or to protect
            the rights, safety, and integrity of the website and its users.
          </p>

          <h2>Retention</h2>
          <p>
            Contact messages are kept only as long as reasonably necessary to
            respond, maintain professional records, resolve disputes, or meet
            legal and security obligations. Analytics and technical logs are
            kept for operational, security, and reporting purposes and may be
            deleted or aggregated over time.
          </p>

          <h2>Your Choices and Rights</h2>
          <p>
            You may request access, correction, or deletion of personal
            information you have submitted through the contact form. You may
            also opt out of certain browser-based tracking by using browser
            privacy controls, tracker-blocking tools, or settings that limit
            cookies and scripts.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            This website links to external services such as GitHub, project
            pages, certificates, and other third-party websites. Their privacy
            practices are controlled by their own policies, not this one.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            This website is not intended to collect personal information from
            children. If you believe a child has submitted personal information
            through the website, contact me so it can be reviewed and deleted
            where appropriate.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            This policy may be updated when the website, analytics setup, legal
            requirements, or data practices change. The updated date at the top
            of this page shows when the current version took effect.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy questions or requests, send a message through the{" "}
            <Link to="/contact" className="cta-button">
              contact page
            </Link>
            .
          </p>
        </article>
      </div>
    </>
  );
}
