import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Hero";
import Link from "next/link";
import { notFound } from "next/navigation";

const PAGE_DATA: Record<string, { title: string; content: string }> = {
  "how-it-works": {
    title: "How It Works",
    content: "Our AI asks for your body type, height, and style preferences. It then analyzes millions of fashion combinations to recommend outfits that flatter your unique proportions perfectly."
  },
  "style-guide": {
    title: "Style Guide",
    content: "Explore our comprehensive manual on dressing your best. We break down the differences between casual, formal, and streetwear, giving you the foundation to elevate your wardrobe."
  },
  "categories": {
    title: "Categories",
    content: "Browse outfits by style category. Whether you're dressing for a weekend getaway (Casual), an important meeting (Formal), or a night out (Party), we have you covered."
  },
  "premium": {
    title: "Premium",
    content: "Unlock unlimited AI styling, detailed fit recommendations, and exclusive early access to the newest trends by upgrading to our Premium subscription."
  },
  "about": {
    title: "About Us",
    content: "StyleAi was built by a team of fashion enthusiasts and engineers who believe that dressing well should be effortless. Our mission is to democratize high-end personal styling."
  },
  "blog": {
    title: "Blog",
    content: "Read our latest articles on seasonal trends, the psychology of colors, and interviews with leading fashion designers shaping the industry today."
  },
  "careers": {
    title: "Careers",
    content: "We're always looking for talented stylists, designers, and software engineers. Join us in building the future of automated personal fashion."
  },
  "press": {
    title: "Press",
    content: "For media inquiries, press kits, and recent coverage of StyleAi in the broader fashion technology space."
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: "Your privacy matters to us. We securely store only the data necessary (like your chosen body type) to provide accurate style recommendations. We never sell your personal database."
  },
  "terms": {
    title: "Terms of Service",
    content: "These terms govern your use of the StyleAi platform. By using our service, you agree to fair usage of our AI generation tools and respect our intellectual property rights."
  },
  "cookie-policy": {
    title: "Cookie Policy",
    content: "We use strictly necessary cookies to keep you logged in and to remember your theme preferences. These minimal functional cookies strictly enhance your website experience."
  },
  "contact": {
    title: "Contact",
    content: "Have a question? Reach out to our customer support team anytime at support@styleai.com, and we'll get back to you within 24 hours."
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GenericContentPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = PAGE_DATA[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      <Nav />
      <div style={{
        minHeight: "75vh",
        padding: "160px 20px 80px",
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center"
      }}>
        <div style={{ marginBottom: "24px" }}>
          <span style={{
            display: "inline-block",
            padding: "8px 16px",
            background: "rgba(13, 92, 75, 0.1)",
            color: "var(--emerald)",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "0.9rem"
          }}>
            StyleAi Info
          </span>
        </div>
        <h1 style={{
          fontSize: "3.5rem",
          marginBottom: "24px",
          color: "var(--ink)",
          fontFamily: "var(--font-display)",
          lineHeight: 1.1
        }}>
          {data.title}
        </h1>
        <p style={{
          fontSize: "1.2rem",
          lineHeight: "1.8",
          color: "var(--slate)",
          marginBottom: "48px"
        }}>
          {data.content}
        </p>

        {slug === "contact" && (
          <form
            action="https://formsubmit.co/abuu10syd@gmail.com"
            method="POST"
            style={{
              maxWidth: "500px",
              margin: "0 auto 48px",
              textAlign: "left",
              background: "var(--surface)",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid var(--border)"
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--ink)", fontSize: "0.9rem" }}>Name</label>
              <input type="text" name="name" required placeholder="kupu swamy" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--page-bg)", color: "var(--ink)", outline: "none" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--ink)", fontSize: "0.9rem" }}>Email</label>
              <input type="email" name="email" required placeholder="kupuswamy@email.com" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--page-bg)", color: "var(--ink)", outline: "none" }} />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--ink)", fontSize: "0.9rem" }}>Message</label>
              <textarea name="message" rows={4} required placeholder="How can we help you?" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--page-bg)", color: "var(--ink)", resize: "vertical", outline: "none" }}></textarea>
            </div>

            {/* Optional FormSubmit configs */}
            <input type="hidden" name="_subject" value="New submission from StyleAi Contact Form!" />
            <input type="hidden" name="_captcha" value="false" />

            <button type="submit" style={{ width: "100%", padding: "14px", background: "var(--emerald)", color: "white", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", transition: "opacity 0.2s" }}>
              Send Message
            </button>
          </form>
        )}
        <Link href="/" style={{
          display: "inline-block",
          padding: "14px 28px",
          background: "var(--emerald)",
          color: "white",
          borderRadius: "100px",
          textDecoration: "none",
          fontWeight: 600,
          transition: "transform 0.2s ease",
        }}>
          ← Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
