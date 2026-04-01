import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (username === "admin" && password === "tiffin123") {
      localStorage.setItem("adminLoggedIn", "true");
      router.navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-card mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground mt-1">Tiffin Box Dashboard</p>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-card rounded-3xl p-8 shadow-card space-y-5"
          data-ocid="admin.modal"
        >
          <div className="space-y-1.5">
            <Label htmlFor="username" className="font-semibold">
              Username
            </Label>
            <Input
              id="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-xl"
              data-ocid="admin.input"
              autoComplete="username"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p
              className="text-sm text-destructive font-medium"
              data-ocid="admin.error_state"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            data-ocid="admin.submit_button"
            className="w-full bg-primary text-primary-foreground font-bold text-base py-5 rounded-full shadow-card hover:shadow-card-hover transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Demo: username <strong>admin</strong> / password{" "}
            <strong>tiffin123</strong>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
