
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Layout } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-4 border-b md:px-6">
        <div className="flex items-center gap-2">
          <Layout className="h-6 w-6" />
          <h1 className="text-xl font-bold text-primary">InvestTracker</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
          Track and Manage Your Investments in One Place
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl">
          InvestTracker helps you monitor performance, vote on proposals, and grow your investment portfolio together.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Login to Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Investment Management Made Easy</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-card border rounded-lg p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Layout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Investments</h3>
              <p className="text-muted-foreground">
                Monitor the performance of your investments across multiple categories in real-time.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-card border rounded-lg p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Layout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vote on Proposals</h3>
              <p className="text-muted-foreground">
                Have your say in new investment opportunities through our democratic voting system.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-card border rounded-lg p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Layout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Analytics</h3>
              <p className="text-muted-foreground">
                Get detailed insights and reports on your investment performance and portfolio distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Investing Smarter?</h2>
          <p className="text-muted-foreground mb-8">
            Join our community of investors today and take control of your financial future.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Layout className="h-5 w-5" />
            <span className="font-semibold">InvestTracker</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InvestTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
